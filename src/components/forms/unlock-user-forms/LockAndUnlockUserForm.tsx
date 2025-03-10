"use client";

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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const formSchema = z.object({
    contactNumber: z
        .string()
        .min(10, "Contact Number must be at least 10 digits.")
        .max(15, "Contact Number must not exceed 15 digits."),
});

const LockAndUnlockUserForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            contactNumber: "",
        },
    });

    const onSubmit = (data: unknown) => {
        console.log("Form Data:", data);
    };

    return (
        <>
            <h1 className="text-[min(4vw,1rem)] leading-relaxed capitalize font-semibold text-center">
                Lock & Unlock User
            </h1>
            <Separator className="w-full mb-4 dark:bg-gray-100 " />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-10 gap-4 items-end">
                        <div className="col-span-7">
                            <FormField
                                control={form.control}
                                name="contactNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-medium">
                                            Enter Contact Number
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                                                placeholder="Enter Contact Number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="col-span-3 flex justify-end">
                            <Button
                                type="submit"
                                variant="default"
                                className="w-full "
                            >
                                Add
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default LockAndUnlockUserForm;
