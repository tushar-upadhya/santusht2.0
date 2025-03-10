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
    buildingName: z.string().min(1, "Building Name is required."),
    buildingNameHindi: z.string().min(1, "Building Name Hindi is required."),
    minFloor: z.string().min(1, "Min Floor is required."),
    maxFloor: z.string().min(1, "Max Floor is required."),
});

const BuildingMasterForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            buildingName: "",
            buildingNameHindi: "",
            minFloor: "",
            maxFloor: "",
        },
    });

    const onSubmit = (data: unknown) => {
        console.log("Form Data:", data);
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-[min(4vw,1rem)] leading-relaxed capitalize font-semibold text-center">
                Building Master
            </h1>
            <Separator className="w-full mb-4 dark:bg-gray-100 " />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Building Name */}
                        <FormField
                            control={form.control}
                            name="buildingName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium">
                                        Building Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Building Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Building Name Hindi */}
                        <FormField
                            control={form.control}
                            name="buildingNameHindi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium">
                                        Building Name Hindi
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Building Name Hindi"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Min Floor */}
                        <FormField
                            control={form.control}
                            name="minFloor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium">
                                        Min Floor
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Min Floor"
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Max Floor */}
                        <FormField
                            control={form.control}
                            name="maxFloor"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium">
                                        Max Floor
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Max Floor"
                                            type="number"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <Button
                            type="submit"
                            variant="default"
                            className="w-full  text-white font-semibold py-2 rounded-md transition duration-300"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default BuildingMasterForm;
