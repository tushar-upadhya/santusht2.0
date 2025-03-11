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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Validation schema
const formSchema = z.object({
    categoryName: z.string().min(1, "Category Name is required."),
    categoryNameHindi: z.string().min(1, "Category Name Hindi is required."),
    building: z.string().min(1, "Building selection is required."),
    category: z.string().min(1, "Floor selection is required."),
});

const CategoryMasterForm = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryName: "",
            categoryNameHindi: "",
            building: "",
            category: "",
        },
    });

    const onSubmit = (data: unknown) => {
        console.log("Form Data:", data);
    };

    return (
        <>
            <h1 className="text-[min(4vw,1rem)] leading-relaxed capitalize font-semibold text-center">
                Category Master
            </h1>
            <Separator className="w-full mb-4 dark:bg-gray-100 " />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Category Name */}
                        <FormField
                            control={form.control}
                            name="categoryName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium">
                                        Category Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Category Name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Category Name Hindi */}
                        <FormField
                            control={form.control}
                            name="categoryNameHindi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium">
                                        Category Name Hindi
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Category Name Hindi"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* add button */}
                    <Button
                        type="submit"
                        variant="default"
                        className="w-full text-white font-semibold py-2 rounded-md transition duration-300"
                    >
                        Add
                    </Button>

                    {/* Category Assignment */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Building Dropdown */}
                        <FormField
                            control={form.control}
                            name="building"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Building Name</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Building" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="building1">
                                                    Building 1
                                                </SelectItem>
                                                <SelectItem value="building2">
                                                    Building 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* category Dropdown */}
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Floor" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="floor1">
                                                    Floor 1
                                                </SelectItem>
                                                <SelectItem value="floor2">
                                                    Floor 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* assign Button */}
                    <div>
                        <Button
                            type="submit"
                            variant="default"
                            className="w-full text-white font-semibold py-2 rounded-md transition duration-300"
                        >
                            Assign
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

export default CategoryMasterForm;
