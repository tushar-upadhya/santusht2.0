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
import { loginUser } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

// Zod validation schema
const authFormSchema = z.object({
    username: z
        .string()
        .min(10, "Invalid username number")
        .max(15, "Invalid username number"),
    password: z.string().min(4, "Password must be at least 6 characters"),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

const AuthForm = () => {
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { role, isAuthenticated, loading, error } = useSelector(
        (state: RootState) => state.auth
    );

    const form = useForm<AuthFormValues>({
        resolver: zodResolver(authFormSchema),
        defaultValues: { username: "", password: "" },
    });

    const onSubmit = async (values: AuthFormValues) => {
        console.log("Submitting:", values); // Debug log
        dispatch(loginUser(values));
    };

    // Redirect based on role after login
    useEffect(() => {
        if (isAuthenticated) {
            console.log("Redirecting Role:", role);
            if (role === "ADMIN") navigate("/admin");
            else if (role === "SUPER_ADMIN") navigate("/super-admin");
            else navigate("/");
        }
    }, [isAuthenticated, role, navigate]);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col space-y-6"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your username number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Log In"}
                </Button>
            </form>
        </Form>
    );
};

export default AuthForm;
