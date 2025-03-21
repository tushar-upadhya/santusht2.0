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
    fullname: z.string().min(1, "Full Name is required."),
    mobileNumber: z
        .string()
        .min(10, "Mobile Number must be at least 10 digits."),
    status: z.string().min(1, "Status selection is required."),
    role: z.string().min(1, "Role selection is required."),
    designation: z.string().min(1, "Designation selection is required."),
});

const EditExistingUserForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: "",
            mobileNumber: "",
            status: "",
            role: "",
            designation: "",
        },
    });

    const onSubmit = (data: unknown) => {
        console.log("Form Data:", data);
        // Add your submission logic here (e.g., save to localStorage, API call)
    };

    return (
        <>
            <h1 className="text-[min(4vw,1rem)] leading-relaxed capitalize font-semibold text-center">
                Edit Existing User
            </h1>
            <Separator className="w-full mb-4 dark:bg-gray-100" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3 max-w-xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Full Name */}
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Full Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Full Name"
                                            className="h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Mobile Number */}
                        <FormField
                            control={form.control}
                            name="mobileNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Mobile Number
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Mobile Number"
                                            className="h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Category Assignment */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {/* Status Dropdown */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Status
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500">
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300">
                                                <SelectItem value="active">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="inactive">
                                                    Inactive
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Role Dropdown */}
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Role
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500">
                                                <SelectValue placeholder="Select Role" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300">
                                                <SelectItem value="level1">
                                                    Level 1
                                                </SelectItem>
                                                <SelectItem value="level2">
                                                    Level 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Designation Dropdown */}
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Designation
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500">
                                                <SelectValue placeholder="Select Designation" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300">
                                                <SelectItem value="designation1">
                                                    Designation 1
                                                </SelectItem>
                                                <SelectItem value="designation2">
                                                    Designation 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Add User Button */}
                    <div>
                        <Button
                            type="submit"
                            variant="default"
                            className="w-full h-10 cursor-pointer bg-[#FA7275] hover:bg-[#FA7275]/80 text-white transition-all duration-300"
                        >
                            Add User
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default EditExistingUserForm;
