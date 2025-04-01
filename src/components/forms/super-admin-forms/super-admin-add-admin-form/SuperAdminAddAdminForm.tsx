import { addAdminThunk } from "@/api/instituteApi";
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
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { AppDispatch, RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const adminSchema = z.object({
    username: z.string().min(2, "Username is required"),
    fullname: z.string().min(2, "Full Name is required"),
    role: z.string().min(1, "Role is required"),
    email: z.string().email("Invalid email address"),
    status: z.boolean(),
    instituteId: z.string().min(1, "Institute is required"),
});

type AdminFormValues = z.infer<typeof adminSchema>;

interface SuperAdminAddAdminFormProps {
    onAdminAdded?: () => void;
}

const SuperAdminAddAdminForm: React.FC<SuperAdminAddAdminFormProps> = ({
    onAdminAdded,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { institutes, loading, error } = useSelector(
        (state: RootState) => state.institutes
    );
    const { isAuthenticated, token } = useSelector(
        (state: RootState) => state.auth
    );

    const form = useForm<AdminFormValues>({
        resolver: zodResolver(adminSchema),
        defaultValues: {
            username: "",
            fullname: "",
            role: "admin",
            email: "",
            status: true,
            instituteId: "",
        },
    });

    const onSubmit = async (values: AdminFormValues) => {
        if (!isAuthenticated || !token) {
            console.warn(
                "No authentication token available, redirecting to login"
            );
            navigate("/login");
            return;
        }

        try {
            const adminData = {
                username: values.username,
                fullname: values.fullname,
                role: values.role,
                status: values.status,
                email: values.email,
                instituteId: parseInt(values.instituteId),
            };
            const result = await dispatch(addAdminThunk(adminData)).unwrap();
            form.reset();
            onAdminAdded?.();
            sessionStorage.setItem(
                "admins",
                JSON.stringify([
                    ...JSON.parse(sessionStorage.getItem("admins") || "[]"),
                    result.data,
                ])
            );
        } catch (error) {
            console.error("Failed to add admin:", error);
            if (String(error).includes("Full authentication is required")) {
                console.warn("Token invalid or expired, redirecting to login");
                navigate("/login");
            }
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
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
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter Username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
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
                        name="instituteId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Institute</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="cursor-pointer">
                                            <SelectValue placeholder="Select Institute" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white cursor-pointer">
                                        {institutes.length > 0 ? (
                                            institutes.map((inst) => (
                                                <SelectItem
                                                    key={inst.id}
                                                    value={String(inst.id)}
                                                >
                                                    {inst.name}
                                                </SelectItem>
                                            ))
                                        ) : (
                                            <SelectItem value="none" disabled>
                                                No institutes available
                                            </SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Role</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger className="cursor-pointer">
                                            <SelectValue placeholder="Select Role" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="bg-white cursor-pointer">
                                        <SelectItem value="admin">
                                            Admin
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                                        {field.value ? "active" : "new"}
                                    </span>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <Button
                    type="submit"
                    className="w-full bg-green-400 hover:bg-green-200"
                    disabled={loading || !isAuthenticated}
                >
                    {loading ? "Adding..." : "Submit"}
                </Button>
            </form>
        </Form>
    );
};

export default SuperAdminAddAdminForm;
