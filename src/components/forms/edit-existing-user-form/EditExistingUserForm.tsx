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
    };

    return (
        <>
            <h1 className="text-[min(4vw,1rem)] leading-relaxed capitalize font-semibold text-center">
                Edit existing user
            </h1>
            <Separator className="w-full mb-4 dark:bg-gray-100 " />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium">
                                        Full Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Full Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Mobile Number */}
                        <FormField
                            control={form.control}
                            name="mobileNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium">
                                        Mobile Number
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Mobile Number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Category Assignment */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Status Dropdown */}
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="active">
                                                    Active
                                                </SelectItem>
                                                <SelectItem value="inactive">
                                                    Inactive
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Role Dropdown */}
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="level1">
                                                    Level 1
                                                </SelectItem>
                                                <SelectItem value="level2">
                                                    Level 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Designation Dropdown */}
                        <FormField
                            control={form.control}
                            name="designation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Designation</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Designation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="designation1">
                                                    Designation 1
                                                </SelectItem>
                                                <SelectItem value="designation2">
                                                    Designation 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Assign Button */}
                    <div>
                        <Button type="submit" className="w-full font-semibold ">
                            Add User
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default EditExistingUserForm;
