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
            <Separator className="w-full mb-4 dark:bg-gray-100" />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-3 max-w-xl mx-auto"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Category Name */}
                        <FormField
                            control={form.control}
                            name="categoryName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Category Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Category Name"
                                            className="h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Category Name Hindi */}
                        <FormField
                            control={form.control}
                            name="categoryNameHindi"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Category Name Hindi
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter Category Name Hindi"
                                            className="h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Add Button */}
                    <div>
                        <Button
                            type="submit"
                            variant="default"
                            className="w-full h-10 cursor-pointer bg-[#FA7275] hover:bg-[#FA7275]/80 text-white transition-all duration-300"
                        >
                            Add
                        </Button>
                    </div>

                    {/* Category Assignment */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {/* Building Dropdown */}
                        <FormField
                            control={form.control}
                            name="building"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Building Name
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500">
                                                <SelectValue placeholder="Select Building" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300">
                                                <SelectItem value="building1">
                                                    Building 1
                                                </SelectItem>
                                                <SelectItem value="building2">
                                                    Building 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />

                        {/* Category Dropdown */}
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm text-gray-700">
                                        Category
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value}
                                        >
                                            <SelectTrigger className="w-full h-9 border-gray-300 rounded-md focus:ring-0 focus:border-gray-500">
                                                <SelectValue placeholder="Select Floor" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white border-gray-300">
                                                <SelectItem value="floor1">
                                                    Floor 1
                                                </SelectItem>
                                                <SelectItem value="floor2">
                                                    Floor 2
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    {/* Assign Button */}
                    <div>
                        <Button
                            type="submit"
                            variant="default"
                            className="w-full h-10 cursor-pointer bg-[#FA7275] hover:bg-[#FA7275]/80 text-white transition-all duration-300"
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
