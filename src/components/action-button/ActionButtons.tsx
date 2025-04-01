import { BASE_URL } from "@/api/axiosInstance";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LucideIcon } from "lucide-react";
import { ReactNode, useState } from "react";

interface ActionConfig<T> {
    label: string;
    icon: LucideIcon;
    onClick?: (data: T) => void;
    variant?: "outline" | "destructive" | "default";
    disabled?: (data: T) => boolean;
    renderDialogContent?: (data: T, closeDialog: () => void) => ReactNode;
    dialogTitle?: string;
}

interface ActionButtonsProps<T extends object> {
    data: T;
    actions: ActionConfig<T>[];
    viewDetails?: (data: T) => Record<string, string>;
}

export const ActionButtons = <T extends object>({
    data,
    actions,
    viewDetails,
}: ActionButtonsProps<T>) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");
    const [dialogContent, setDialogContent] = useState<ReactNode | null>(null);
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const token = sessionStorage.getItem("token");
            const endpoint =
                "role" in data &&
                (data as { role: string }).role === "Institute"
                    ? `${BASE_URL}/delete-institute/${
                          (data as unknown as { id: string }).id
                      }`
                    : `${BASE_URL}/delete-admin/${(data as { id: string }).id}`;
            const res = await fetch(endpoint, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["institutes"] });
            setIsDialogOpen(false);
        },
        onError: (error) => {
            console.error("Delete Error:", error);
            alert("Error deleting entry");
        },
    });

    const handleAction = (action: ActionConfig<T>) => {
        if (action.label === "View" && viewDetails) {
            setDialogTitle(
                `Details of ${
                    "refNo" in data
                        ? (data as { refNo: string }).refNo
                        : "fullname" in data
                        ? (data as { fullname: string }).fullname
                        : "adminName" in data
                        ? (data as { adminName: string }).adminName
                        : "Item"
                }`
            );
            setDialogContent(
                <div className="space-y-4">
                    {Object.entries(viewDetails(data)).map(([key, value]) => (
                        <p key={key}>
                            <strong>{key}:</strong> {value || "N/A"}
                        </p>
                    ))}
                </div>
            );
            setIsDialogOpen(true);
        } else if (action.renderDialogContent) {
            setDialogTitle(action.dialogTitle || `${action.label} Action`);
            setDialogContent(
                action.renderDialogContent(data, () => {
                    setIsDialogOpen(false);
                    if (action.label === "Delete") {
                        deleteMutation.mutate();
                    }
                })
            );
            setIsDialogOpen(true);
        } else if (action.onClick) {
            action.onClick(data);
        }
    };

    return (
        <>
            <div className="flex items-center gap-2">
                {actions.map((action, index) => (
                    <Button
                        key={index}
                        size="icon"
                        variant={action.variant || "outline"}
                        onClick={() => handleAction(action)}
                        disabled={
                            action.disabled
                                ? action.disabled(data)
                                : action.label === "Delete" &&
                                  deleteMutation.isPending
                        }
                        className={`border-none text-gray-900 cursor-pointer dark:text-white dark:bg-gray-800 hover:dark:bg-gray-700 ${
                            action.variant === "destructive"
                                ? "text-white bg-[#FA7275] hover:bg-[#FA7275]/80 cursor-pointer"
                                : ""
                        }`}
                        title={action.label}
                    >
                        <action.icon className="w-4 h-4 " />
                    </Button>
                ))}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                    </DialogHeader>
                    {dialogContent}
                </DialogContent>
            </Dialog>
        </>
    );
};
