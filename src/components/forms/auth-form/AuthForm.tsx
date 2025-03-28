import { LoginResponse, loginUser } from "@/api/authApi";
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
import { PASSWORD_REGEX, USERNAME_REGEX } from "@/lib/regexs/regex";
import { setAuthData, setError, setLoading } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const authFormSchema = z.object({
    username: z.string().regex(USERNAME_REGEX, "Invalid mobile number"),
    password: z.string().regex(PASSWORD_REGEX, "Invalid password format"),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

const INPUT_CLASS =
    "w-full h-12 sm:h-14 rounded-full border-none bg-gray-100 text-sm sm:text-base text-gray-800 placeholder:text-gray-500 px-5 sm:px-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all";

const AuthForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state: RootState) => state.auth);

    const form = useForm<AuthFormValues>({
        resolver: zodResolver(authFormSchema),
        defaultValues: { username: "", password: "" },
    });

    const mutation = useMutation<LoginResponse, Error, AuthFormValues>({
        mutationFn: loginUser,
        onMutate: () => {
            dispatch(setLoading(true));
            dispatch(setError(null));
        },
        onSuccess: (data) => {
            dispatch(setAuthData(data));
            dispatch(setLoading(false));
            console.log(
                "Token stored in sessionStorage:",
                sessionStorage.getItem("token")
            ); // Debug token
            const redirectPath =
                data.role === "ADMIN"
                    ? "/admin"
                    : data.role === "SUPER_ADMIN"
                    ? "/super-admin"
                    : "/";
            navigate(redirectPath);
        },
        onError: (error) => {
            dispatch(setError(error.message || "Login failed"));
            dispatch(setLoading(false));
        },
        retry: 2,
        retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000),
    });

    const handleForgotPassword = useCallback(() => {
        navigate("/forgot-password");
    }, [navigate]);

    const onSubmit = useCallback(
        (values: AuthFormValues) => {
            mutation.mutate(values);
        },
        [mutation]
    );

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full max-w-md mx-auto space-y-6 p-4 sm:p-6 bg-white rounded-lg"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm sm:text-base font-medium text-gray-700">
                                Mobile Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter your mobile number"
                                    {...field}
                                    className={INPUT_CLASS}
                                />
                            </FormControl>
                            <FormMessage className="text-rose-600 text-xs sm:text-sm font-medium mt-1" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-sm sm:text-base font-medium text-gray-700">
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    {...field}
                                    className={INPUT_CLASS}
                                />
                            </FormControl>
                            <FormMessage className="text-rose-600 text-xs sm:text-sm font-medium mt-1" />
                        </FormItem>
                    )}
                />
                {error && (
                    <p className="text-red-500 text-xs sm:text-sm text-center">
                        {error}
                    </p>
                )}
                <Button
                    type="submit"
                    disabled={mutation.isPending || loading}
                    className="w-full h-12 sm:h-14 rounded-full bg-[#FA7275] hover:bg-[#FA7275]/80 text-white text-sm sm:text-base font-semibold transition-colors"
                >
                    {mutation.isPending || loading ? "Logging in..." : "Log In"}
                </Button>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                        type="button"
                        className="w-full rounded-full h-10 sm:h-12 text-sm sm:text-base text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        GET OTP
                    </Button>
                    <Button
                        type="button"
                        onClick={handleForgotPassword}
                        className="w-full rounded-full h-10 sm:h-12 text-sm sm:text-base text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        Forgot Password
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AuthForm;
