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
import { Switch } from "@/components/ui/switch";
import { addInstitute } from "@/redux/features/instituteSlice";
import { AppDispatch } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";

const formSchema = z.object({
    instituteName: z
        .string()
        .min(3, "Institute name must be at least 3 characters"),

    instituteNameHindi: z.string().optional(),
    status: z.boolean().default(false),
});

const SuperAdminAddInstituteForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            instituteName: "",
            instituteNameHindi: "",
            status: false,
        },
    });

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const payload = {
                name: values.instituteName,
                nameHindi: values.instituteNameHindi,
                status: values.status ? "ACTIVE" : "INACTIVE",
            };
            const response = await fetch(
                "http://192.168.30.88:8080/santusht/superadmin/add-update-institute",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to add institute");
            }
            return response.json();
        },
        onSuccess: (data) => {
            dispatch(addInstitute(data));
            form.reset();
        },
    });

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        mutation.mutate(values);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 bg-white p-6 rounded-lg shadow-md"
            >
                <FormField
                    control={form.control}
                    name="instituteName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Institute Name</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter Institute Name"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instituteNameHindi"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Institute Name Hindi</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="Enter Institute Name Hindi"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Status</FormLabel>
                            <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Adding..." : "Add Institute"}
                </Button>
            </form>
        </Form>
    );
};

export default SuperAdminAddInstituteForm;
