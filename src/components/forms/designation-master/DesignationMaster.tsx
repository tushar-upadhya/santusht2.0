"use client";

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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const formSchema = z.object({
    role: z.string().min(1, "Building selection is required."),
    designation: z.string().min(1, "Designation is required."),
});

const DesignationMaster: React.FC = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: "",
            designation: "",
        },
    });

    const onSubmit = (data: unknown) => {
        console.log("Form Data:", data);
    };

    return (
        <>
            <h1 className="text-[min(4vw,1rem)] leading-relaxed capitalize font-semibold text-center">
                Designation Master
            </h1>
            <Separator className="w-full mb-4 dark:bg-gray-100" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3 max-w-xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Role Dropdown */}
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Roles
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500">
                                                <SelectValue placeholder="Select Roles" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300">
                                                <SelectItem value="building1">
                                                    Level 1
                                                </SelectItem>
                                                <SelectItem value="building2">
                                                    Level 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Designation Input */}
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Designation
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Designation"
                                            className="h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Assign Button */}
                    <div>
                        <Button
                            type="submit"
                            variant="default"
                            className="w-full h-10 cursor-pointer bg-[#FA7275] hover:bg-[#FA7275]/80 text-white transition-all duration-300"
                        >
                            Assign
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default DesignationMaster;
