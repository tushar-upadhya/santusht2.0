import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import { useState } from "react";

// Define UserData Type
interface UserData {
    id: number;
    serialNumber: number;
    status: string;
    role: string;
    adminName: string;
    instituteName: string;
    mobile: string;
    location: string;
}

// Define Dialog State Type
interface DialogState {
    view: boolean;
    delete: boolean;
}

// Define Columns for Table
export const SuperAdminTableColumns: ColumnDef<UserData>[] = [
    {
        accessorKey: "serialNumber",
        header: "S.No",
        cell: ({ row }) => <div className="text-left">{row.index + 1}</div>,
    },
    {
        accessorKey: "adminName",
        header: "Admin Name",
        cell: ({ row }) => (
            <div className="text-left">
                {row.getValue("adminName") || "N/A"}
            </div>
        ),
    },
    {
        accessorKey: "instituteName",
        header: "Institute Name",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("instituteName")}</div>
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("role")}</div>
        ),
    },
    {
        accessorKey: "location",
        header: "Location",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("location")}</div>
        ),
    },
    {
        accessorKey: "mobile",
        header: "Mobile",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("mobile")}</div>
        ),
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => <ActionButtons employee={row.original} />,
    },
];

// Action Buttons Component
const ActionButtons = ({ employee }: { employee: UserData }) => {
    const [dialogState, setDialogState] = useState<DialogState>({
        view: false,
        delete: false,
    });
    const queryClient = useQueryClient();
    const API_URL = "http://localhost:5000/users";

    // Mutation for Deleting User
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`${API_URL}/${employee.id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete user");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            setDialogState((prev) => ({ ...prev, delete: false }));
        },
        onError: (error) => {
            console.error("Delete Error:", error);
            alert("Error deleting user");
        },
    });

    return (
        <>
            <div className="flex items-center gap-2">
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                        setDialogState({ ...dialogState, view: true })
                    }
                >
                    <Eye className="w-4 h-4" />
                </Button>

                <Button
                    size="icon"
                    variant="destructive"
                    onClick={() =>
                        setDialogState({ ...dialogState, delete: true })
                    }
                >
                    <Trash className="w-4 h-4" />
                </Button>
            </div>

            {/* View Employee Dialog */}
            <Dialog
                open={dialogState.view}
                onOpenChange={() =>
                    setDialogState({ ...dialogState, view: false })
                }
            >
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Employee Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        {Object.entries(employee).map(([key, value]) =>
                            key !== "serialNumber" && key !== "action" ? (
                                <p key={key}>
                                    <strong>{key}:</strong> {value || "N/A"}
                                </p>
                            ) : null
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={dialogState.delete}
                onOpenChange={() =>
                    setDialogState({ ...dialogState, delete: false })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this user?</p>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() =>
                                setDialogState({
                                    ...dialogState,
                                    delete: false,
                                })
                            }
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => deleteMutation.mutate()}
                        >
                            {deleteMutation.isPending
                                ? "Deleting..."
                                : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
