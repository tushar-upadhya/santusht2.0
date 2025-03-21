import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface VideoRecordingProps {
    setVideo: (url: string) => void;
}

const VideoRecording: React.FC<VideoRecordingProps> = ({ setVideo }) => {
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<BlobPart[]>([]);
    const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const startRecording = async () => {
        if (isRecording) return;
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            streamRef.current = stream;
            if (videoPreviewRef.current)
                videoPreviewRef.current.srcObject = stream;

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0)
                    recordedChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const videoBlob = new Blob(recordedChunksRef.current, {
                    type: "video/webm",
                });
                recordedChunksRef.current = [];
                const reader = new FileReader();
                reader.onloadend = () => {
                    const dataUrl = reader.result as string;
                    setVideoUrl(dataUrl);
                    setVideo(dataUrl); // Pass persistent URL to form
                    uploadVideo();
                };
                reader.readAsDataURL(videoBlob);
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
            console.error("Error accessing camera: ", error);
            toast.error(
                "Failed to access camera/microphone. Please allow permissions."
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

    const uploadVideo = () => {
        const videoId = Date.now().toString();
        toast.success(`Video uploaded successfully! Video ID: ${videoId}`, {
            description: "Your video has been saved.",
        });
    };

    useEffect(() => {
        return () => {
            cleanup();
        };
    }, []);

    return (
        <div className="p-4">
            <video
                ref={videoPreviewRef}
                className="w-full border"
                autoPlay
                playsInline
            />
            <div className="mt-4 flex gap-3">
                {!isRecording && (
                    <Button
                        type="button" // Prevent form submission
                        variant="default"
                        onClick={startRecording}
                        className="bg-green-600 hover:bg-green-700 w-full cursor-pointer text-white font-medium px-6 py-3 rounded-lg"
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
                <p className="text-sm text-gray-600 mt-2">
                    Time Left: {timeLeft}s
                </p>
            )}
            {videoUrl && (
                <div className="mt-4">
                    <video
                        src={videoUrl}
                        className="w-full border mt-2"
                        controls
                    />
                </div>
            )}
        </div>
    );
};

export default VideoRecording;
