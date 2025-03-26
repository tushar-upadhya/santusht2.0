import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, MicIcon, Upload, VideoIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import AudioRecording from "./recording/audio-recording/AudioRecording";
import VideoRecording from "./recording/video-recording/VideoRecording";

const formSchema = z.object({
    institute: z.string().min(1, "Required"),
    building: z.string().min(1, "Required"),
    floor: z.string().min(1, "Required"),
    landmark: z.string().min(1, "Required"),
    category: z.string().min(1, "Required"),
    briefing: z.string().min(1, "Required"),
    uhid: z.string().min(1, "Required"),
    otp: z.string().min(1, "Required"),
    audio: z.string().optional(),
    video: z.string().optional(),
});

const RaiseGrievanceForm = () => {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            institute: "",
            building: "",
            floor: "",
            landmark: "",
            category: "",
            briefing: "",
            uhid: "",
            otp: "",
            audio: "",
            video: "",
        },
    });

    const [mediaTypes, setMediaTypes] = useState({
        image: false,
        audio: false,
        video: false,
    });
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [images, setImages] = useState<File[]>([]);
    const videoRef = useRef<HTMLVideoElement>(null);
    const imageInputRef = useRef<HTMLInputElement>(null);

    const handleMediaChange = async (type: "image" | "audio" | "video") => {
        setMediaTypes((prev) => ({
            ...prev,
            [type]: !prev[type], // Toggle the selected media type
        }));

        if (type === "video" && !mediaTypes.video && !mediaStream) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                setMediaStream(stream);
                if (videoRef.current) videoRef.current.srcObject = stream;
            } catch (error) {
                console.error(`Error accessing ${type}:`, error);
                toast.error(
                    "Failed to access camera/microphone. Please allow permissions."
                );
                setMediaTypes((prev) => ({ ...prev, video: false }));
            }
        } else if (type === "video" && mediaStream) {
            mediaStream.getTracks().forEach((track) => track.stop());
            setMediaStream(null);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            const newImages = Array.from(files).slice(0, 2 - images.length);
            setImages((prev) => [...prev, ...newImages].slice(0, 2));
            if (files.length > 2)
                toast.warning(
                    "Only 2 images are allowed. Extra images ignored."
                );
        }
    };

    const onSubmit = (data: any) => {
        const grievance = {
            id: Date.now(),
            userId: data.uhid,
            images: images.map((file) => URL.createObjectURL(file)),
            video: data.video || null,
            audio: data.audio || null,
            raisedDate: new Date().toISOString().split("T")[0],
            message: data.briefing,
            status: "raised",
            location: {
                institute: data.institute,
                building: data.building,
                floor: data.floor,
                landmark: data.landmark,
            },
            category: data.category,
            rating: 0,
        };

        try {
            const existingGrievances = JSON.parse(
                localStorage.getItem("grievances") || "[]"
            );
            localStorage.setItem(
                "grievances",
                JSON.stringify([...existingGrievances, grievance])
            );
            toast.success("Grievance Submitted!", {
                description: `Your grievance (ID: ${grievance.id}) has been successfully raised.`,
                action: {
                    label: "",
                    onClick: () => {},
                },
            });
            form.reset();
            setImages([]);
            setMediaTypes({ image: false, audio: false, video: false });
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => track.stop());
                setMediaStream(null);
            }
            if (imageInputRef.current) imageInputRef.current.value = ""; // Clear file input
            navigate(`/grievance-page/${data.uhid}`);
        } catch (error) {
            console.error("Error saving to localStorage:", error);
            toast.error("Submission Failed", {
                description:
                    "Failed to submit grievance. Storage might be full.",
            });
        }
    };

    useEffect(() => {
        return () => {
            if (mediaStream)
                mediaStream.getTracks().forEach((track) => track.stop());
        };
    }, [mediaStream]);

    return (
        <ScrollArea className="h-[33rem] bg-white">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3 max-w-xl mx-auto"
                >
                    <div className="grid grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name="institute"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Institute
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500 cursor-pointer">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300 ">
                                                <SelectItem
                                                    value="institute1"
                                                    className=" cursor-pointer"
                                                >
                                                    Institute 1
                                                </SelectItem>
                                                <SelectItem
                                                    value="institute2"
                                                    className=" cursor-pointer"
                                                >
                                                    Institute 2
                                                </SelectItem>
                                                <SelectItem
                                                    value="institute3"
                                                    className=" cursor-pointer"
                                                >
                                                    Institute 3
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Category
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500 cursor-pointer">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300">
                                                <SelectItem
                                                    value="Sanitation"
                                                    className=" cursor-pointer"
                                                >
                                                    Sanitation
                                                </SelectItem>
                                                <SelectItem
                                                    value="Civil"
                                                    className=" cursor-pointer"
                                                >
                                                    Civil
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name="building"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Building
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500 cursor-pointer">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300">
                                                <SelectItem
                                                    value="building1"
                                                    className=" cursor-pointer"
                                                >
                                                    Building 1
                                                </SelectItem>
                                                <SelectItem
                                                    value="building2"
                                                    className=" cursor-pointer"
                                                >
                                                    Building 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="floor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Floor
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500 cursor-pointer">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300">
                                                <SelectItem
                                                    value="floor1"
                                                    className=" cursor-pointer"
                                                >
                                                    Floor 1
                                                </SelectItem>
                                                <SelectItem
                                                    value="floor2"
                                                    className=" cursor-pointer"
                                                >
                                                    Floor 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="landmark"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm text-gray-700">
                                    Landmark
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter landmark"
                                        className="h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="briefing"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm text-gray-700">
                                    Briefing
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Brief description"
                                        className="h-16 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500 resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <FormField
                            control={form.control}
                            name="uhid"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        UHID
                                    </FormLabel>
                                    <div className="flex gap-2">
                                        <FormControl>
                                            <Input
                                                placeholder="Enter UHID"
                                                className="h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500 flex-1"
                                                {...field}
                                            />
                                        </FormControl>
                                        <Button
                                            type="button"
                                            variant="default"
                                            className="h-9 bg-green-600 text-white hover:bg-green-700 rounded-md px-3 cursor-pointer transition-all duration-300"
                                        >
                                            Get OTP
                                        </Button>
                                    </div>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        OTP
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter OTP"
                                            className="h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <FormLabel className="text-sm text-gray-700">
                            Media
                        </FormLabel>
                        <div className="flex gap-2">
                            <Button
                                type="button"
                                variant={
                                    mediaTypes.image ? "default" : "outline"
                                }
                                size="icon"
                                className={`h-9 w-9 rounded-md cursor-pointer transition-all duration-300 ${
                                    mediaTypes.image
                                        ? "bg-[#FA7275] hover:bg-[#FA7275]/80 text-white"
                                        : "border-[#FA7275] text-slate-700 hover:bg-gray-100"
                                }`}
                                onClick={() => handleMediaChange("image")}
                            >
                                <ImageIcon className="w-4 h-4" />
                            </Button>
                            <Button
                                type="button"
                                variant={
                                    mediaTypes.audio ? "default" : "outline"
                                }
                                size="icon"
                                className={`h-9 w-9 rounded-md cursor-pointer transition-all duration-300 ${
                                    mediaTypes.audio
                                        ? "bg-[#FA7275] hover:bg-[#FA7275]/80 text-white"
                                        : "border-[#FA7275] text-slate-700 hover:bg-gray-100"
                                }`}
                                onClick={() => handleMediaChange("audio")}
                            >
                                <MicIcon className="w-4 h-4" />
                            </Button>
                            <Button
                                type="button"
                                variant={
                                    mediaTypes.video ? "default" : "outline"
                                }
                                size="icon"
                                className={`h-9 w-9 rounded-md cursor-pointer transition-all duration-300 ${
                                    mediaTypes.video
                                        ? "bg-[#FA7275] hover:bg-[#FA7275]/80 text-white"
                                        : "border-[#FA7275] text-slate-700 hover:bg-gray-100"
                                }`}
                                onClick={() => handleMediaChange("video")}
                            >
                                <VideoIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                    {mediaTypes.image && (
                        <div className="p-2 bg-gray-50 rounded-md">
                            <div className="flex items-center gap-2 mb-2">
                                <label
                                    htmlFor="image-upload"
                                    className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition-all duration-300"
                                >
                                    <Upload className="w-4 h-4 text-[#FA7275]" />
                                    <span>Upload Images</span>
                                </label>
                                <Input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    ref={imageInputRef}
                                    onChange={handleImageUpload}
                                    className="hidden" // Hide the default input
                                />
                            </div>
                            <p className="text-xs text-gray-600">
                                Max 2 images
                            </p>
                            {images.length > 0 && (
                                <div className="flex gap-2">
                                    {images.map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={URL.createObjectURL(img)}
                                            alt={`Uploaded ${idx}`}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    {mediaTypes.audio && (
                        <div className="p-2 bg-gray-50 rounded-md">
                            <AudioRecording
                                setAudio={(url: string) =>
                                    form.setValue("audio", url)
                                }
                            />
                        </div>
                    )}
                    {mediaTypes.video && (
                        <div className="p-2 bg-gray-50 rounded-md">
                            <VideoRecording
                                setVideo={(url: string) =>
                                    form.setValue("video", url)
                                }
                            />
                        </div>
                    )}
                    <Button
                        type="submit"
                        variant="default"
                        className="w-full h-10 cursor-pointer bg-[#FA7275] hover:bg-[#FA7275]/80 text-white transition-all duration-300"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </ScrollArea>
    );
};

export default RaiseGrievanceForm;
