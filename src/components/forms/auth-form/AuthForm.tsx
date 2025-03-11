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
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const authFormSchema = z.object({
    mobile: z
        .string()
        .min(10, "Invalid mobile number")
        .max(15, "Invalid mobile number"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormValues = z.infer<typeof authFormSchema>;

const AuthForm = () => {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<AuthFormValues>({
        resolver: zodResolver(authFormSchema),
        defaultValues: { mobile: "", password: "" },
    });

    const onSubmit = async (values: AuthFormValues) => {
        setIsLoggingIn(true);
        setError(null);

        const result = await signIn("credentials", {
            redirect: false,
            mobile: values.mobile,
            password: values.password,
        });

        setIsLoggingIn(false);

        if (result?.error) {
            setError("Invalid mobile number or password");
        } else {
            router.push("/dashboard");
        }
    };

    const handleGetOtp = () => {
        const mobile = form.getValues("mobile");
        if (!mobile || mobile.length < 10) {
            setError("Enter a valid mobile number to get OTP");
            return;
        }
        console.log("Sending OTP to:", mobile);
    };

    const handleForgotPassword = () => {
        router.push("/forgot-password");
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex max-h-[800px] w-full max-w-[580px] flex-col justify-center space-y-6 transition-all lg:h-full lg:space-y-8"
            >
                <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="ml-6 text-[min(4vw,1rem)] leading-relaxed">
                                Mobile Number
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your mobile number"
                                    {...field}
                                    className="rounded-full h-14 px-6 text-[min(4vw,1rem)] leading-relaxed placeholder:text-[min(4vw,1rem)] placeholder:leading-relaxed"
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
                            <FormLabel className="ml-6 text-[min(4vw,1rem)] leading-relaxed">
                                Password
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Enter your password"
                                    {...field}
                                    className="rounded-full h-14 px-6 text-[min(4vw,1rem)] leading-relaxed placeholder:text-[min(4vw,1rem)] placeholder:leading-relaxed"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <Button
                    type="submit"
                    variant="outline"
                    disabled={isLoggingIn}
                    className="rounded-full sm:h-14 h-10 text-[min(4vw,1rem)] leading-relaxed"
                >
                    {isLoggingIn ? "Logging in..." : "Log In"}
                </Button>

                <div className="flex w-full gap-4 ">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleGetOtp}
                        className="w-1/2 rounded-full text-[min(4vw,1rem)] leading-relaxed"
                    >
                        GET OTP
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleForgotPassword}
                        className="w-1/2 rounded-full text-[min(4vw,1rem)] leading-relaxed"
                    >
                        Forget Password
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default AuthForm;
