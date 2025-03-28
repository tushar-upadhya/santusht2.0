import { addInstituteThunk } from "@/api/instituteApi";
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
import { AppDispatch, RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
    instituteName: z
        .string()
        .min(3, "Institute name must be at least 3 characters"),
    instituteNameHindi: z.string().optional(),
    status: z.boolean().default(false),
});

interface SuperAdminAddInstituteFormProps {
    onInstituteAdded?: () => void;
}

const SuperAdminAddInstituteForm: React.FC<SuperAdminAddInstituteFormProps> = ({
    onInstituteAdded,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { loading, error } = useSelector(
        (state: RootState) => state.institutes
    );
    const { isAuthenticated, token } = useSelector(
        (state: RootState) => state.auth
    );

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            instituteName: "",
            instituteNameHindi: "",
            status: false,
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!isAuthenticated || !token) {
            console.warn("No authentication token available");
            navigate("/login");
            return;
        }

        console.log("Token before POST (add):", token);
        console.log(
            "SessionStorage token before POST (add):",
            sessionStorage.getItem("token")
        );

        try {
            const result = await dispatch(addInstituteThunk(values)).unwrap();
            console.log("Institute added successfully:", result);
            toast.success(`${values.instituteName} added successfully!`, {
                description: "The institute is now listed.",
            });
            form.reset();
            onInstituteAdded?.();
        } catch (err) {
            console.error("Request failed:", err);
            toast.error("Failed to add institute", {
                description: err instanceof Error ? err.message : String(err),
            });
            if (
                err ===
                "Full authentication is required to access this resource"
            ) {
                console.warn("Token may have expired or is invalid");
                navigate("/login");
            }
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-4 bg-white rounded-lg"
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
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-300 transition-colors duration-200"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {error && <p className="text-red-500">{error}</p>}
                <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    disabled={loading || !isAuthenticated}
                >
                    {loading ? "Adding..." : "Add Institute"}
                </Button>
            </form>
        </Form>
    );
};

export default SuperAdminAddInstituteForm;
