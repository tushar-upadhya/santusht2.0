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

const authFormSchema = z.object({
    mobile: z
        .string()
        .min(10, "Invalid mobile number")
        .max(15, "Invalid mobile number"),
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
        defaultValues: { mobile: "", password: "" },
    });

    const onSubmit = (values: AuthFormValues) => {
        dispatch(loginUser(values));
    };

    // Redirect based on role after login
    useEffect(() => {
        if (isAuthenticated) {
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
                    name="mobile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your mobile number"
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
