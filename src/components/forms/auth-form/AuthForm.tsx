import { loginUser } from "@/api/authApi";
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
import { AppDispatch, RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { unwrapResult } from "@reduxjs/toolkit";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const authFormSchema = z.object({
    username: z.string().regex(USERNAME_REGEX, "Invalid mobile number"),
    password: z.string().regex(PASSWORD_REGEX, "Invalid password format"),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

const AuthForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { role, isAuthenticated } = useSelector(
        (state: RootState) => state.auth
    );

    const form = useForm<AuthFormValues>({
        resolver: zodResolver(authFormSchema),
        defaultValues: { username: "", password: "" },
    });

    const mutation = useMutation({
        mutationFn: async (values: AuthFormValues) => {
            const resultAction = await dispatch(loginUser(values));
            unwrapResult(resultAction);
        },
        onSuccess: () => {
            if (isAuthenticated) {
                navigate(
                    role === "ADMIN"
                        ? "/admin"
                        : role === "SUPER_ADMIN"
                        ? "/super-admin"
                        : "/"
                );
            }
        },
    });

    const handleForgotPassword = () => navigate("/forgot-password");

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) =>
                    mutation.mutate(values)
                )}
                className="w-full max-w-md mx-auto space-y-6 p-4 sm:p-6 bg-white rounded-lg"
            >
                {/* Mobile Number Field */}
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
                                    className="w-full h-12 sm:h-14 rounded-full border-none bg-gray-100 text-sm sm:text-base text-gray-800 placeholder:text-gray-500 px-5 sm:px-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </FormControl>
                            <FormMessage className="text-rose-600 text-xs sm:text-sm font-medium mt-1" />
                        </FormItem>
                    )}
                />

                {/* Password Field */}
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
                                    className="w-full h-12 sm:h-14 rounded-full border-none bg-gray-100 text-sm sm:text-base text-gray-800 placeholder:text-gray-500 px-5 sm:px-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                />
                            </FormControl>
                            <FormMessage className="text-rose-600 text-xs sm:text-sm font-medium mt-1" />
                        </FormItem>
                    )}
                />

                {/* Error Message */}
                {mutation.isError && (
                    <p className="text-red-500 text-xs sm:text-sm text-center">
                        {mutation.error?.message || "An error occurred"}
                    </p>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full h-12 sm:h-14 rounded-full bg-[#FA7275] cursor-pointer hover:bg-[#FA7275]/80 text-white text-sm sm:text-base font-semibold transition-colors"
                >
                    {mutation.isPending ? "Logging in..." : "Log In"}
                </Button>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                        type="button"
                        className="w-full rounded-full h-10 sm:h-12 cursor-pointer text-sm sm:text-base text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        GET OTP
                    </Button>
                    <Button
                        type="button"
                        onClick={handleForgotPassword}
                        className="w-full rounded-full h-10 cursor-pointer sm:h-12 text-sm sm:text-base text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                        Forgot Password
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AuthForm;
