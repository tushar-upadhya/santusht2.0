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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useForm } from "react-hook-form";

const AddQrCodeForm: React.FC = () => {
    const form = useForm({
        defaultValues: {
            building: "",
            floor: "",
            location: "",
            qrType: "grievance",
        },
    });

    const onSubmit = (data: any) => {
        console.log("QR Code Data:", data);
    };

    return (
        <>
            <h1 className="text-[min(4vw,1rem)] leading-relaxed capitalize font-semibold text-center">
                Generate QR code
            </h1>
            <Separator className="w-full mb-4 dark:bg-gray-100 " />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {/* Building & Floor Side by Side */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Building Dropdown */}
                        <FormField
                            control={form.control}
                            name="building"
                            render={({ field }) => (
                                <FormItem className="w-full sm:w-1/2">
                                    <FormLabel>Building</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Building" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="building1">
                                                Building 1
                                            </SelectItem>
                                            <SelectItem value="building2">
                                                Building 2
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Floor Dropdown */}
                        <FormField
                            control={form.control}
                            name="floor"
                            render={({ field }) => (
                                <FormItem className="w-full sm:w-1/2">
                                    <FormLabel>Floor</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Floor" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {[...Array(10)].map((_, i) => (
                                                <SelectItem
                                                    key={i}
                                                    value={(i + 1).toString()}
                                                >
                                                    Floor {i + 1}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Location Input */}
                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Location / Landmark</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter location or landmark"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* QR Type Radio Group */}
                    <FormField
                        control={form.control}
                        name="qrType"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>QR Code Type</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                        className="flex gap-4"
                                    >
                                        <FormItem className="flex items-center space-x-2">
                                            <RadioGroupItem value="grievance" />
                                            <FormLabel>Grievance</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2">
                                            <RadioGroupItem value="feedback" />
                                            <FormLabel>Feedback</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit Button */}
                    <Button type="submit" className="w-full">
                        Generate QR Code
                    </Button>
                </form>
            </Form>
        </>
    );
};

export default AddQrCodeForm;
