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
            <Separator className="w-full mb-4 dark:bg-gray-100 " />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Building Dropdown */}
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Roles</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Roles" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="building1">
                                                    level 1
                                                </SelectItem>
                                                <SelectItem value="building2">
                                                    level 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Designation Input */}
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium">
                                        Designation
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Designation"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Assign Button */}
                    <div>
                        <Button
                            type="submit"
                            variant="default"
                            className="w-full text-white font-semibold py-2 rounded-md transition duration-300"
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
