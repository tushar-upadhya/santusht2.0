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
import { ImageIcon, MicIcon, VideoIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
    mediaType: z.string().min(1, "Required"),
});

const RaiseGrievanceForm = () => {
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
            mediaType: "",
        },
    });

    const [mediaType, setMediaType] = useState<string | null>(null);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMediaChange = async (value: string) => {
        form.setValue("mediaType", value);
        setMediaType(value);

        if (mediaStream) {
            mediaStream.getTracks().forEach((track) => track.stop());
            setMediaStream(null);
        }

        try {
            if (value === "video") {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                });
                setMediaStream(stream);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }
        } catch (error) {
            console.error(`Error accessing ${value}:`, error);
        }
    };

    useEffect(() => {
        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [mediaStream]);

    const onSubmit = (data: unknown): void => {
        console.log(data);
    };

    return (
        <ScrollArea className="h-[38rem] bg-white">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3 p-4 max-w-xl mx-auto"
                >
                    {/* Institute & Category */}
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
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300">
                                                <SelectItem value="institute1">
                                                    Institute 1
                                                </SelectItem>
                                                <SelectItem value="institute2">
                                                    Institute 2
                                                </SelectItem>
                                                <SelectItem value="institute3">
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
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300">
                                                <SelectItem value="category1">
                                                    Category 1
                                                </SelectItem>
                                                <SelectItem value="category2">
                                                    Category 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Building & Floor */}
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
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300">
                                                <SelectItem value="building1">
                                                    Building 1
                                                </SelectItem>
                                                <SelectItem value="building2">
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
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500">
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300">
                                                <SelectItem value="floor1">
                                                    Floor 1
                                                </SelectItem>
                                                <SelectItem value="floor2">
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

                    {/* Landmark */}
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

                    {/* Briefing */}
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

                    {/* UHID & OTP */}
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
                                            variant="default"
                                            className="h-9 bg-green-600 text-white hover:bg-green-700 rounded-md px-3"
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

                    {/* Media */}
                    <FormField
                        control={form.control}
                        name="mediaType"
                        render={() => (
                            <FormItem>
                                <FormLabel className="text-sm text-gray-700">
                                    Media
                                </FormLabel>
                                <div className="flex gap-2">
                                    <Button
                                        variant={
                                            mediaType === "image"
                                                ? "default"
                                                : "outline"
                                        }
                                        size="icon"
                                        className={`h-9 w-9 rounded-md ${
                                            mediaType === "image"
                                                ? "bg-gray-800 text-white"
                                                : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                        }`}
                                        onClick={() =>
                                            handleMediaChange("image")
                                        }
                                    >
                                        <ImageIcon className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant={
                                            mediaType === "audio"
                                                ? "default"
                                                : "outline"
                                        }
                                        size="icon"
                                        className={`h-9 w-9 rounded-md ${
                                            mediaType === "audio"
                                                ? "bg-gray-800 text-white"
                                                : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                        }`}
                                        onClick={() =>
                                            handleMediaChange("audio")
                                        }
                                    >
                                        <MicIcon className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant={
                                            mediaType === "video"
                                                ? "default"
                                                : "outline"
                                        }
                                        size="icon"
                                        className={`h-9 w-9 rounded-md ${
                                            mediaType === "video"
                                                ? "bg-gray-800 text-white"
                                                : "border-gray-300 text-gray-700 hover:bg-gray-100"
                                        }`}
                                        onClick={() =>
                                            handleMediaChange("video")
                                        }
                                    >
                                        <VideoIcon className="w-4 h-4" />
                                    </Button>
                                </div>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />

                    {/* Media Display */}
                    {mediaType && (
                        <div className="p-2 bg-gray-50 rounded-md">
                            {mediaType === "video" && <VideoRecording />}
                            {mediaType === "audio" && <AudioRecording />}
                        </div>
                    )}

                    {/* Submit */}
                    <Button
                        type="submit"
                        variant="default"
                        className="w-full h-10 bg-gray-800 text-white hover:bg-gray-900 rounded-md"
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </ScrollArea>
    );
};

export default RaiseGrievanceForm;
