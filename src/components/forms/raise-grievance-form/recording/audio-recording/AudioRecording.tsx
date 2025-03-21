import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface AudioRecordingProps {
    setAudio: (url: string) => void;
}

const AudioRecording: React.FC<AudioRecordingProps> = ({ setAudio }) => {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<BlobPart[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startRecording = async () => {
        if (isRecording) return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            streamRef.current = stream;
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0)
                    recordedChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(recordedChunksRef.current, {
                    type: "audio/webm",
                });
                recordedChunksRef.current = [];
                const reader = new FileReader();
                reader.onloadend = () => {
                    const dataUrl = reader.result as string;
                    setAudioUrl(dataUrl);
                    setAudio(dataUrl); // Pass persistent URL to form
                    uploadAudio();
                };
                reader.readAsDataURL(audioBlob);
                cleanup();
            };

            mediaRecorder.start();
            setIsRecording(true);
            setIsPaused(false);
            setTimeLeft(60);

            if (timerRef.current) clearInterval(timerRef.current);
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        stopRecording();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } catch (error) {
            console.error("Error accessing microphone: ", error);
            toast.error(
                "Failed to access microphone. Please allow permissions."
            );
            cleanup();
        }
    };

    const pauseRecording = () => {
        if (mediaRecorderRef.current && isRecording && !isPaused) {
            mediaRecorderRef.current.pause();
            setIsPaused(true);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    const resumeRecording = () => {
        if (mediaRecorderRef.current && isPaused) {
            mediaRecorderRef.current.resume();
            setIsPaused(false);
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        stopRecording();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            cleanup();
        }
    };

    const cleanup = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
        setIsRecording(false);
        setIsPaused(false);
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const uploadAudio = () => {
        const audioId = Date.now().toString();
        toast.success(`Audio uploaded successfully! Audio ID: ${audioId}`, {
            description: "Your audio has been saved.",
        });
    };

    useEffect(() => {
        return () => {
            cleanup();
        };
    }, []);

    return (
        <div className="p-4">
            <div className="mt-4 flex gap-3">
                {!isRecording && (
                    <Button
                        type="button" // Prevent form submission
                        variant="default"
                        onClick={startRecording}
                        className="h-9 bg-green-600 text-white w-full hover:bg-green-700 rounded-md px-3 cursor-pointer transition-all duration-300"
                    >
                        Start Recording
                    </Button>
                )}
                {isRecording && !isPaused && (
                    <Button
                        type="button" // Prevent form submission
                        variant="default"
                        onClick={pauseRecording}
                        className="bg-yellow-500/80 hover:bg-yellow-500 uppercase cursor-pointer w-full text-slate-700 px-6 py-3 rounded-lg"
                    >
                        Pause
                    </Button>
                )}
                {isPaused && (
                    <Button
                        type="button" // Prevent form submission
                        variant="default"
                        onClick={resumeRecording}
                        className="bg-green-500/80 hover:bg-green-500 uppercase cursor-pointer w-full text-slate-700 px-6 py-3 rounded-lg"
                    >
                        Resume
                    </Button>
                )}
                {isRecording && (
                    <Button
                        type="button" // Prevent form submission
                        variant="default"
                        onClick={stopRecording}
                        className="bg-rose-500/55 uppercase hover:bg-rose-500/45 cursor-pointer w-full text-slate-700 px-6 py-3 rounded-lg"
                    >
                        Stop
                    </Button>
                )}
            </div>
            {isRecording && (
                <p className="text-sm text-slate-700 mt-2 font-medium">
                    Time Left: {timeLeft}s
                </p>
            )}
            {audioUrl && (
                <div className="mt-4">
                    <audio
                        src={audioUrl}
                        className="max-w-full mt-2"
                        controls
                    />
                </div>
            )}
        </div>
    );
};

export default AudioRecording;
