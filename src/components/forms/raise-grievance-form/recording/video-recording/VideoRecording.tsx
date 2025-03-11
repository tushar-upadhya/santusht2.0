import { Button } from "@/components/ui/button";
import React, { useEffect, useRef, useState } from "react";

interface VideoData {
    id: string;
    url: string;
}

const VideoRecording: React.FC = () => {
    const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [uploadedVideos, setUploadedVideos] = useState<VideoData[]>([]);
    const [uploadedVideoUrl, setUploadedVideoUrl] = useState<string | null>(
        null
    );
    const [isRecording, setIsRecording] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunksRef = useRef<BlobPart[]>([]);
    const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
    const currentVideoElement = useRef<HTMLVideoElement | null>(null);

    // Start recording
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            if (videoPreviewRef.current) {
                videoPreviewRef.current.srcObject = stream;
            }

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const videoBlob = new Blob(recordedChunksRef.current, {
                    type: "video/webm",
                });
                recordedChunksRef.current = [];
                setVideoBlob(videoBlob);
                setVideoUrl(URL.createObjectURL(videoBlob));
            };

            mediaRecorder.start();
            setIsRecording(true);
            setIsPaused(false);
        } catch (error) {
            console.error("Error accessing camera: ", error);
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

    // Upload video
    const uploadVideo = async () => {
        if (!videoBlob) {
            alert("No video recorded!");
            return;
        }

        const formData = new FormData();
        formData.append("videoFile", videoBlob, "recorded_video.webm");

        try {
            const response = await fetch("/api/video/upload", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                alert(`Video uploaded successfully! Video ID: ${data.id}`);
                loadAllVideos();
            } else {
                console.error("Upload failed");
            }
        } catch (error) {
            console.error("Upload error: ", error);
        }
    };

    // Load all videos
    const loadAllVideos = async () => {
        try {
            const response = await fetch("/api/video/videos");
            if (response.ok) {
                const data: VideoData[] = await response.json();
                setUploadedVideos(
                    data.map((video) => ({
                        id: video.id,
                        url: `/api/video/play/${video.id}`,
                    }))
                );
            }
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    // Play selected video
    const playSelectedVideo = (
        videoId: string,
        event: React.MouseEvent<HTMLVideoElement>
    ) => {
        if (currentVideoElement.current) {
            currentVideoElement.current.pause();
            currentVideoElement.current.currentTime = 0;
        }
        setUploadedVideoUrl(`/api/video/play/${videoId}`);
        currentVideoElement.current = event.currentTarget;
    };

    // Fetch videos on component mount
    useEffect(() => {
        loadAllVideos();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Video Recorder</h1>

            {/* Video Preview */}
            <video
                ref={videoPreviewRef}
                className="w-full border"
                autoPlay
                playsInline
            ></video>

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

            {/* Recorded Video */}
            {videoUrl && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Recorded Video</h2>
                    <video
                        src={videoUrl}
                        className="w-full border mt-2"
                        controls
                    ></video>
                    <button
                        onClick={uploadVideo}
                        className="bg-purple-500 text-white px-4 py-2 mt-2 rounded"
                    >
                        Upload Video
                    </button>
                </div>
            )}

            {/* Uploaded Videos */}
            <div className="mt-6">
                <h2 className="text-lg font-semibold">Uploaded Videos</h2>
                {uploadedVideos.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {uploadedVideos.map((video) => (
                            <video
                                key={video.id}
                                src={video.url}
                                className="w-full cursor-pointer border"
                                onClick={(e) => playSelectedVideo(video.id, e)}
                                controls
                            ></video>
                        ))}
                    </div>
                ) : (
                    <p>No videos uploaded yet.</p>
                )}
            </div>

            {/* Selected Video Playback */}
            {uploadedVideoUrl && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Playing Video</h2>
                    <video
                        src={uploadedVideoUrl}
                        className="w-full border"
                        controls
                        autoPlay
                    ></video>
                </div>
            )}
        </div>
    );
};

export default VideoRecording;
