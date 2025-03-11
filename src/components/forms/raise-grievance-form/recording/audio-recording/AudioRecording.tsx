import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";

interface AudioData {
    id: string;
    url: string;
}

const AudioRecording: React.FC = () => {
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [uploadedAudios, setUploadedAudios] = useState<AudioData[]>([]);
    const [uploadedAudioUrl, setUploadedAudioUrl] = useState<string | null>(
        null
    );
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<BlobPart[]>([]);
    const currentAudioElement = useRef<HTMLAudioElement | null>(null);

    // Start recording
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(recordedChunksRef.current, {
                    type: "audio/webm",
                });
                recordedChunksRef.current = [];
                setAudioBlob(audioBlob);
                setAudioUrl(URL.createObjectURL(audioBlob));
            };

            mediaRecorder.start();
            setIsRecording(true);
            setIsPaused(false);
        } catch (error) {
            console.error("Error accessing microphone: ", error);
        }
    };

    // Pause recording
    const pauseRecording = () => {
        if (mediaRecorderRef.current && isRecording && !isPaused) {
            mediaRecorderRef.current.pause();
            setIsPaused(true);
        }
    };

    // Resume recording
    const resumeRecording = () => {
        if (mediaRecorderRef.current && isPaused) {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
        }
    };

    // Stop recording
    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setIsPaused(false);
        }
    };

    // Upload audio
    const uploadAudio = async () => {
        if (!audioBlob) {
            alert("No audio recorded!");
            return;
        }

        const formData = new FormData();
        formData.append("audioFile", audioBlob, "recorded_audio.webm");

        try {
            const response = await fetch("/api/audio/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Audio uploaded successfully! Audio ID: ${data.id}`);
                loadAllAudios();
            } else {
                console.error("Upload failed");
            }
        } catch (error) {
            console.error("Upload error: ", error);
        }
    };

    // Load all audios
    const loadAllAudios = async () => {
        try {
            const response = await fetch("/api/audio/audios");
            if (response.ok) {
                const data: AudioData[] = await response.json();
                setUploadedAudios(
                    data.map((audio) => ({
                        id: audio.id,
                        url: `/api/audio/play/${audio.id}`,
                    }))
                );
            }
        } catch (error) {
            console.error("Error fetching audios:", error);
        }
    };

    // Play selected audio
    const playSelectedAudio = (
        audioId: string,
        event: React.MouseEvent<HTMLAudioElement>
    ) => {
        if (currentAudioElement.current) {
            currentAudioElement.current.pause();
            currentAudioElement.current.currentTime = 0;
        }
        setUploadedAudioUrl(`/api/audio/play/${audioId}`);
        currentAudioElement.current = event.currentTarget;
    };

    // Fetch audios on component mount
    useEffect(() => {
        loadAllAudios();
    }, []);

    return (
        <div className="p-4">
            {/* Recording Controls */}
            <div className="mt-4 flex gap-3 ">
                {!isRecording && (
                    <Button
                        variant={"default"}
                        onClick={startRecording}
                        className="bg-green-500 flex-1 w-full text-white px-4 py-2 rounded"
                    >
                        Start Recording
                    </Button>
                )}
                {isRecording && !isPaused && (
                    <Button
                        variant={"outline"}
                        onClick={pauseRecording}
                        className="bg-yellow-500 flex-1 w-full text-white px-4 py-2 rounded"
                    >
                        Pause
                    </Button>
                )}
                {isPaused && (
                    <Button
                        variant={"default"}
                        onClick={resumeRecording}
                        className="flex-1 w-full text-white px-4 py-2 rounded"
                    >
                        Resume
                    </Button>
                )}
                {isRecording && (
                    <Button
                        variant={"destructive"}
                        onClick={stopRecording}
                        className="flex-1 w-full"
                    >
                        Stop
                    </Button>
                )}
            </div>

            {/* Recorded Audio */}
            {audioUrl && (
                <div className="mt-4">
                    {/* <h2 className="text-lg font-semibold">Recorded Audio</h2> */}
                    <audio
                        src={audioUrl}
                        className="max-w-full mt-2 "
                        controls
                    ></audio>
                    <Button
                        onClick={uploadAudio}
                        className=" text-white px-4 py-2 mt-2 rounded w-full"
                    >
                        Upload Audio
                    </Button>
                </div>
            )}

            {/* Uploaded Audios */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold">Uploaded Audios</h2>
                {uploadedAudios.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {uploadedAudios.map((audio) => (
                            <audio
                                key={audio.id}
                                src={audio.url}
                                className="w-full cursor-pointer border"
                                onClick={(e) => playSelectedAudio(audio.id, e)}
                                controls
                            ></audio>
                        ))}
                    </div>
                ) : (
                    <p>No audios uploaded yet.</p>
                )}
            </div>
        </div>
    );
};

export default AudioRecording;
