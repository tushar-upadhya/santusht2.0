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
import { useEffect } from "react";
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
            try {
                const resultAction = await dispatch(loginUser(values));
                unwrapResult(resultAction);
            } catch (error: any) {
                throw new Error(error.message || "Login failed");
            }
        },
    });

    const onSubmit = (values: AuthFormValues) => {
        mutation.mutate(values);
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate(
                role === "ADMIN"
                    ? "/admin"
                    : role === "SUPER_ADMIN"
                    ? "/super-admin"
                    : "/"
            );
        }
    }, [isAuthenticated, role, navigate]);

    //   const handleGetOtp = () => {
    //       const mobile = form.getValues("mobile");
    //       if (!mobile || mobile.length < 10) {
    //           setError("Enter a valid mobile number to get OTP");
    //           return;
    //       }
    //       console.log("Sending OTP to:", mobile);
    //   };

    const handleForgotPassword = () => {
        navigate("/forgot-password");
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex h-[78px] flex-col justify-center  px-4">
                            <FormLabel className="ml-6 text-[min(4vw,1rem)] leading-relaxed">
                                Mobile Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Enter your mobile number"
                                    {...field}
                                    className="rounded-full h-14 px-6 text-[min(4vw,1rem)] bg-gray-200 leading-relaxed placeholder:text-[min(4vw,1rem)] placeholder:leading-relaxed border-none"
                                />
                            </FormControl>
                            <FormMessage className="text-rose-600 font-semibold ml-4" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="flex h-[78px] flex-col justify-center  px-4">
                            <FormLabel className="ml-6 text-[min(4vw,1rem)] leading-relaxed">
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    {...field}
                                    className="rounded-full h-14 px-6 text-[min(4vw,1rem)] bg-gray-200 leading-relaxed placeholder:text-[min(4vw,1rem)] placeholder:leading-relaxed border-none"
                                />
                            </FormControl>
                            <FormMessage className="text-rose-600 font-semibold ml-4" />
                        </FormItem>
                    )}
                />
                {mutation.isError && (
                    <p className="text-red-500 text-sm">
                        {mutation.error?.message}
                    </p>
                )}
                <Button
                    type="submit"
                    disabled={mutation.isPending}
                    className="rounded-full sm:h-14 h-10 text-[min(4vw,1rem)] leading-relaxed cursor-pointer bg-[#FA7275] hover:bg-[#FA7275]/40 text-white"
                >
                    {mutation.isPending ? "Logging in..." : "Log In"}
                </Button>
                <div className="flex w-full gap-4 ">
                    <Button
                        type="button"
                        // onClick={handleGetOtp}
                        className="w-1/2 rounded-full text-[min(3vw,.8rem)] cursor-pointer leading-relaxed"
                    >
                        GET OTP
                    </Button>
                    <Button
                        type="button"
                        onClick={handleForgotPassword}
                        className="w-1/2 rounded-full text-[min(3vw,.8rem)] cursor-pointer leading-relaxed"
                    >
                        Forget Password
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AuthForm;
