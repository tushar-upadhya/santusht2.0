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
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AudioRecording from "./recording/audio-recording/AudioRecording";
import VideoRecording from "./recording/video-recording/VideoRecording";
import { ImageIcon, MicIcon, RefreshCcw, VideoIcon } from "lucide-react";

const formSchema = z.object({
  institute: z.string().min(1, "Institute is required."),
  building: z.string().min(1, "Building is required."),
  floor: z.string().min(1, "Floor is required."),
  landmark: z.string().min(1, "Landmark is required."),
  category: z.string().min(1, "Category is required."),
  briefing: z.string().min(1, "Briefing is required."),
  uhid: z.string().min(1, "UHID is required."),
  otp: z.string().min(1, "OTP is required."),
  mediaType: z.string().min(1, "media is required."),
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
    <ScrollArea className="h-[38rem] ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 -mr4">
          {/* Institute & Category Dropdown */}
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="institute"
              render={({ field }) => (
                <FormItem className="flex-1 -mr-1">
                  <FormLabel>Institute</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Institute" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-md">
                        <SelectItem value="institute1">Institute 1</SelectItem>
                        <SelectItem value="institute2">Institute 2</SelectItem>
                        <SelectItem value="institute3">Institute 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Category  */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-md">
                        <SelectItem value="category1">Category 1</SelectItem>
                        <SelectItem value="category2">Category 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          {/* Building and Floor  */}
          <div className="flex gap-2">
            {/* Building Dropdown */}
            <FormField
              control={form.control}
              name="building"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Building</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Building" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-md">
                        <SelectItem value="building1">Building 1</SelectItem>
                        <SelectItem value="building2">Building 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* Floor Dropdown */}
            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Floor</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Floor" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border shadow-md">
                        <SelectItem value="floor1">Floor 1</SelectItem>
                        <SelectItem value="floor2">Floor 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {/* Landmark Input */}
          <FormField
            control={form.control}
            name="landmark"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Landmark</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Landmark" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Briefing Textarea */}
          <FormField
            control={form.control}
            name="briefing"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Briefing</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Provide a brief description"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* UHID, OTP Input, Get OTP Button */}
          <div className="flex gap-2">
            {/* UHID Input */}
            <FormField
              control={form.control}
              name="uhid"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>UHID</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter UHID" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button variant="default" className="bg-green-400/50 mt-5">
              Get OTP
            </Button>
          </div>
          {/* OTP and Get OTP Button */}
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>OTP</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter OTP" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          {/* MEDIA  */}
          <div className="flex sm:flex-row gap-2"> 
            <div className="flex items-center gap-4">
          <Button
              variant={mediaType === "image" ? "default" : "outline"}
              size="icon"
              onClick={() => handleMediaChange("image")}
            >
              <ImageIcon className="w-5 h-5" />
            </Button>
            <Button
              variant={mediaType === "audio" ? "default" : "outline"}
              size="icon"
              onClick={() => handleMediaChange("audio")}
            >
              <MicIcon className="w-5 h-5" />
            </Button>
            <Button
              variant={mediaType === "video" ? "default" : "outline"}
              size="icon"
              onClick={() => handleMediaChange("video")}
            >
              <VideoIcon className="w-5 h-5" />
            </Button>
</div>
            <Button variant="default" className="bg-gray-200/50 mx-5">
            <RefreshCcw className="w-5 h-5" />
            Reset
            </Button>
</div>
          {/* Media Display */}
          <div className="flex flex-col gap-2">
            <ScrollArea className="h-[180px]">
              <div className="w-full">
                {mediaType === "video" && (
                  <div className="flex flex-row items-center">
                    <VideoRecording />
                  </div>
                )}

                {mediaType === "audio" && (
                  <div className="flex items-center justify-center h-auto bg-gray-100 rounded-md">
                    <AudioRecording />
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            className="w-full bg-red-400/50"
          >
            Submit
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default RaiseGrievanceForm;
