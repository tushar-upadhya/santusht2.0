import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
    mobileNumber: z
        .string()
        .regex(/^[6789]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
    status: z.enum(["Online", "Offline"]),
    adminName: z
        .string()
        .min(3, "Admin name must be at least 3 characters")
        .max(50, "Admin name cannot exceed 50 characters"),
    email: z.string().email("Invalid email address"),
    gender: z.enum(["Male", "Female", "Other"], {
        required_error: "Gender is required",
    }),
    dateOfBirth: z
        .string()
        .regex(
            /^\d{4}-\d{2}-\d{2}$/,
            "Date of Birth must be in YYYY-MM-DD format"
        ),
    role: z.string().min(2, "Role is required"),
});

const SuperAdminAddInstituteForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            adminName: "",
            mobileNumber: "",
            email: "",
            gender: undefined, // Ensures gender is selected
            dateOfBirth: "",
            role: "admin", // Default role
            status: "Offline", // Default to offline
        },
        mode: "onChange", // Ensures instant validation
    });

    const onSubmit = (data: unknown): void => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Admin Name & Mobile Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="adminName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Admin Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Admin Name"
                                        {...field}
                                        className="cursor-pointer border-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="mobileNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mobile Number (ID)</FormLabel>
                                <FormControl>
                                    <Input
                                        className="cursor-pointer border-none"
                                        placeholder="Enter Mobile Number"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Email & Role */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Email"
                                        {...field}
                                        className="cursor-pointer border-none"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="border-none cursor-pointer">
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-none ">
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                        <SelectItem value="manager">
                                            Manager
                                        </SelectItem>
                                        <SelectItem value="supervisor">
                                            Supervisor
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Gender & Status */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <SelectTrigger className="border-none cursor-pointer">
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white border-none ">
                                        <SelectItem
                                            value="Male"
                                            className="cursor-pointer"
                                        >
                                            Male
                                        </SelectItem>
                                        <SelectItem
                                            value="Female"
                                            className="cursor-pointer"
                                        >
                                            Female
                                        </SelectItem>
                                        <SelectItem
                                            value="Other"
                                            className="cursor-pointer"
                                        >
                                            Other
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Status Toggle */}
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <div className="flex items-center gap-3 ">
                                    <Switch
                                        checked={field.value === "Online"}
                                        onCheckedChange={(checked) =>
                                            field.onChange(
                                                checked ? "Online" : "Offline"
                                            )
                                        }
                                        className="border-2 bg-black w-12 h-6 rounded-full p-1"
                                    />
                                    <span
                                        className={
                                            field.value === "Online"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }
                                    >
                                        {field.value}
                                    </span>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                {/* Date of Birth */}
                <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Date of Birth</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        {field.value
                                            ? format(
                                                  parseISO(field.value),
                                                  "yyyy-MM-dd"
                                              )
                                            : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-2 bg-white">
                                    <Calendar
                                        mode="single"
                                        selected={
                                            field.value
                                                ? parseISO(field.value)
                                                : undefined
                                        }
                                        onSelect={(date) => {
                                            if (date) {
                                                field.onChange(
                                                    format(date, "yyyy-MM-dd")
                                                );
                                            }
                                        }}
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    className="w-full bg-green-400 hover:bg-green-200 cursor-pointer"
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default SuperAdminAddInstituteForm;
