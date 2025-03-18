import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash } from "lucide-react";
import { useState } from "react";

// Define InstituteData Type
interface InstituteData {
    id: number;
    serialNumber: number;
    status: string;
    instituteName: string;
    instituteHindiName: string;
    assignAdmin: string;
}

// Define Dialog State Type
interface DialogState {
    view: boolean;
    edit: boolean;
    delete: boolean;
}

// Define Columns for Table
export const SuperAdminListOfInstituteTable: ColumnDef<InstituteData>[] = [
    {
        accessorKey: "serialNumber",
        header: "S.No",
        cell: ({ row }) => <div className="text-left">{row.getValue("serialNumber")}</div>,
    },
    {
        accessorKey: "instituteName",
        header: "Institute Name",
        cell: ({ row }) => <div className="text-left">{row.getValue("instituteName") || "N/A"}</div>,
    },
    {
        accessorKey: "instituteHindiName",
        header: "Institute Name (Hindi)",
        cell: ({ row }) => <div className="text-left">{row.getValue("instituteHindiName") || "N/A"}</div>,
    },
  
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className={`text-left font-bold ${row.getValue("status") === "Active" ? "text-green-600" : "text-red-600"}`}>
                {row.getValue("status")}
            </div>
        ),
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => <ActionButtons institute={row.original} />,
    },
];

// Action Buttons Component
const ActionButtons = ({ institute }: { institute: InstituteData }) => {
    const [dialogState, setDialogState] = useState<DialogState>({
        view: false,
        edit: false,
        delete: false,
    });

    const [editInstitute, setEditInstitute] = useState<InstituteData | null>(null);
    const queryClient = useQueryClient();
    const API_URL = "http://localhost:5000/users";

    // Mutation for Deleting Institute
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`${API_URL}/${institute.id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete institute");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["institutes"] });
            setDialogState((prev) => ({ ...prev, delete: false }));
        },
    });

    // Mutation for Editing Institute
    const editMutation = useMutation({
        mutationFn: async (updatedInstitute: InstituteData) => {
            const res = await fetch(`${API_URL}/${updatedInstitute.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedInstitute),
            });
            if (!res.ok) throw new Error("Failed to update institute");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["institutes"] });
            setDialogState((prev) => ({ ...prev, edit: false }));
        },
    });

    return (
        <>
            <div className="flex items-center gap-2">
                <Button size="icon" variant="outline" onClick={() => setDialogState((prev) => ({ ...prev, view: true }))}>
                    <Eye className="w-4 h-4" />
                </Button>

                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                        setEditInstitute(institute);
                        setDialogState((prev) => ({ ...prev, edit: true }));
                    }}
                >
                    <Pencil className="w-4 h-4" />
                </Button>

                <Button size="icon" variant="destructive" onClick={() => setDialogState((prev) => ({ ...prev, delete: true }))}>
                    <Trash className="w-4 h-4" />
                </Button>
            </div>

            {/* View Institute Dialog */}
            <Dialog open={dialogState.view} onOpenChange={() => setDialogState((prev) => ({ ...prev, view: false }))}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Institute Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        {Object.entries(institute).map(([key, value]) => (
                            key !== "serialNumber" && key !== "action" ? (
                                <p key={key}><strong>{key}:</strong> {value || "N/A"}</p>
                            ) : null
                        ))}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Institute Dialog */}
            <Dialog open={dialogState.edit} onOpenChange={() => setDialogState((prev) => ({ ...prev, edit: false }))}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Edit Institute</DialogTitle>
                    </DialogHeader>
                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (editInstitute) editMutation.mutate(editInstitute);
                        }}
                    >
                        <div>
                            <label className="text-sm font-medium">Institute Name</label>
                            <Input
                                type="text"
                                value={editInstitute?.instituteName || ""}
                                onChange={(e) =>
                                    setEditInstitute((prev) =>
                                        prev ? { ...prev, instituteName: e.target.value } : null
                                    )
                                }
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogState((prev) => ({ ...prev, edit: false }))}>Cancel</Button>
                            <Button type="submit">Save Changes</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};