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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

// ✅ Define Schema using zod
const adminSchema = z.object({
    adminName: z.string().min(2, "Admin Name is required"),
    username: z.string().min(2, "Username is required"),
    mobile: z.string().min(10, "Mobile number must be 10 digits"),
    email: z.string().email("Invalid email address"),
    gender: z.enum(["Male", "Female", "Other"]),
    dateOfBirth: z.date(),
    status: z.boolean(), // ✅ Updated to boolean
    role: z.enum(["admin", "manager", "supervisor"]),
});

type AdminFormValues = z.infer<typeof adminSchema>;

interface SuperAdminAddAdminFormProps {
    onAdminAdded: () => void;
}

const SuperAdminAddAdminForm: React.FC<SuperAdminAddAdminFormProps> = ({
    onAdminAdded,
}) => {
    const form = useForm<AdminFormValues>({
        resolver: zodResolver(adminSchema),
        defaultValues: {
            adminName: "",
            username: "",
            mobile: "",
            email: "",
            gender: "Male",
            dateOfBirth: new Date(),
            status: true, // ✅ Default: active
            role: "admin",
        },
    });

    const onSubmit = async (values: AdminFormValues) => {
        try {
            const res = await fetch("http://localhost:5000/add-admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (res.ok) {
                onAdminAdded();
                form.reset();
            }
        } catch (error) {
            console.error("Failed to add admin:", error);
        }
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
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="mobile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mobile Number (ID)</FormLabel>
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
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
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
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Male">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="Female">
                                            Female
                                        </SelectItem>
                                        <SelectItem value="Other">
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
                                <div className="flex items-center gap-3">
                                    <Switch
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <span
                                        className={cn(
                                            "text-xs font-semibold animate-pulse rounded-full px-2 py-1",
                                            field.value
                                                ? "text-green-700 bg-green-200"
                                                : "text-red-700 bg-red-200"
                                        )}
                                    >
                                        {field.value ? "active" : "inactive"}
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
                                            ? format(field.value, "yyyy-MM-dd")
                                            : "Pick a date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-2">
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={(date) =>
                                            field.onChange(date)
                                        }
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
                    className="w-full bg-green-400 hover:bg-green-200"
                >
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default SuperAdminAddAdminForm;
