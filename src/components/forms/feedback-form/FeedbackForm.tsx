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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    institute: z.string().min(1, "Institute is required."),
    feedbackFor: z.string().min(1, "Institute is required."),
    landmark: z.string().min(1, "Landmark is required."),
    category: z.string().min(1, "Category is required."),
    briefing: z.string().min(1, "Briefing is required."),
    uhid: z.string().min(1, "UHID is required."),
    otp: z.string().min(1, "OTP is required."),
});

const FeedbackForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            institute: "",
            feedbackFor: "",
            landmark: "",
            category: "",
            briefing: "",
            uhid: "",
            otp: "",
        },
    });

    const onSubmit = (data: unknown): void => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3 max-w-xl mx-auto"
            >
                <div className="grid grid-cols-2 gap-2">
                    {/* Institute Dropdown */}
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
                                            <SelectValue placeholder="Select Institute" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white border-gray-300">
                                            <SelectItem value="building1">
                                                1
                                            </SelectItem>
                                            <SelectItem value="building2">
                                                2
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage className="text-red-500 text-xs" />
                            </FormItem>
                        )}
                    />

                    {/* Feedback For Dropdown */}
                    <FormField
                        control={form.control}
                        name="feedbackFor"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-sm text-gray-700">
                                    Feedback For
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500 capitalize">
                                            <SelectValue placeholder="Feedback For" />
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

                {/* UHID, OTP Input, Get OTP Button */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {/* UHID Input */}
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

                    {/* OTP Input */}
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

                {/* Submit Button */}
                <div className="justify-center max-w-full">
                    <Button
                        type="submit"
                        variant="default"
                        className="w-full h-10 cursor-pointer bg-[#FA7275] hover:bg-[#FA7275]/80 text-white transition-all duration-300"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default FeedbackForm;
