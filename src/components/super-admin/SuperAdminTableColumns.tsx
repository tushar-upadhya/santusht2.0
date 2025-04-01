import { BASE_URL } from "@/api/instituteApi";
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

interface UserData {
    id: number;
    serialNumber: number;
    status: string;
    role: string;
    instituteName: string;
    fullname?: string;
    mobile?: string;
}

interface DialogState {
    view: boolean;
    delete: boolean;
}

export const SuperAdminTableColumns: ColumnDef<UserData>[] = [
    {
        accessorKey: "serialNumber",
        header: "S.No",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("serialNumber")}</div>
        ),
    },
    {
        accessorKey: "fullname",
        header: "Full Name",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("fullname") || "N/A"}</div>
        ),
    },
    {
        accessorKey: "instituteName",
        header: "Institute Name",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("instituteName")}</div> // Ensure this is a string
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
        accessorKey: "mobile",
        header: "Mobile",
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("mobile") || "N/A"}</div>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="text-left">
                <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        row.getValue("status") === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                >
                    {row.getValue("status")}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => <ActionButtons employee={row.original} />,
    },
];

const ActionButtons = ({ employee }: { employee: UserData }) => {
    const [dialogState, setDialogState] = useState<DialogState>({
        view: false,
        delete: false,
    });
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: async () => {
            const token = sessionStorage.getItem("token");
            const endpoint =
                employee.role === "Institute"
                    ? `${BASE_URL}/delete-institute/${employee.id}`
                    : `${BASE_URL}/delete-admin/${employee.id}`;
            const res = await fetch(endpoint, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error("Failed to delete");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["institutes"] });
            setDialogState((prev) => ({ ...prev, delete: false }));
        },
        onError: (error) => {
            console.error("Delete Error:", error);
            alert("Error deleting entry");
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

            <Dialog
                open={dialogState.view}
                onOpenChange={() =>
                    setDialogState({ ...dialogState, view: false })
                }
            >
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>{employee.role} Details</DialogTitle>
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
                    <p>
                        Are you sure you want to delete this{" "}
                        {employee.role.toLowerCase()}?
                    </p>
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
