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

// Define UserData Type
interface UserData {
    id: number;
    serialNumber: number;
    status: string;
    role: string;
    adminName: string;
    instituteName: string;
    mobile: number; // Ensure consistency with `db.json`
    location: string;
}

// Define Dialog State Type
interface DialogState {
    view: boolean;
    edit: boolean;
    delete: boolean;
}

// Define Columns for Table
export const SuperAdminListOfAdminTable: ColumnDef<UserData>[] = [
    {
        accessorKey: "serialNumber",
        header: "S.No",
        cell: ({ row }) => <div className="text-left">{row.getValue("serialNumber")}</div>,
    },
    {
        accessorKey: "adminName",
        header: "Admin Name",
        cell: ({ row }) => <div className="text-left">{row.getValue("adminName") || "N/A"}</div>,
    },
    {
        accessorKey: "mobile",
        header: "Mobile",
        cell: ({ row }) => <div className="text-left">{row.getValue("mobile")}</div>,
    },
    {
        accessorKey: "action",
        header: "Action",
        cell: ({ row }) => <ActionButtons user={row.original} />,
    },
];

// Action Buttons Component
const ActionButtons = ({ user }: { user: UserData }) => {
    const [dialogState, setDialogState] = useState<DialogState>({
        view: false,
        edit: false,
        delete: false,
    });

    const [editUser, setEditUser] = useState<UserData | null>(null);
    const queryClient = useQueryClient();
    const API_URL = "http://localhost:5000/users";

    // Mutation for Deleting User
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await fetch(`${API_URL}/${user.id}`, {
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

    // Mutation for Editing User
    const editMutation = useMutation({
        mutationFn: async (updatedUser: UserData) => {
            const res = await fetch(`${API_URL}/${updatedUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            });
            if (!res.ok) throw new Error("Failed to update user");
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
            setDialogState((prev) => ({ ...prev, edit: false }));
        },
        onError: (error) => {
            console.error("Edit Error:", error);
            alert("Error updating user");
        },
    });

    return (
        <>
            <div className="flex items-center gap-2">
                {/* View Button */}
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setDialogState((prev) => ({ ...prev, view: true }))}
                >
                    <Eye className="w-4 h-4" />
                </Button>

                {/* Edit Button */}
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() => {
                        setEditUser(user);
                        setDialogState((prev) => ({ ...prev, edit: true }));
                    }}
                >
                    <Pencil className="w-4 h-4" />
                </Button>

                {/* Delete Button */}
                <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => setDialogState((prev) => ({ ...prev, delete: true }))} 
                >
                    <Trash className="w-4 h-4" />
                </Button>
            </div>

            {/* View User Dialog */}
            <Dialog
                open={dialogState.view}
                onOpenChange={() => setDialogState((prev) => ({ ...prev, view: false }))}
            >
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>User Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        {Object.entries(user).map(([key, value]) =>
                            key !== "serialNumber" && key !== "action" ? (
                                <p key={key}>
                                    <strong>{key}:</strong> {value || "N/A"}
                                </p>
                            ) : null
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog
                open={dialogState.edit}
                onOpenChange={() => setDialogState((prev) => ({ ...prev, edit: false }))}
            >
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                    </DialogHeader>
                    <form
                        className="space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (editUser) {
                                editMutation.mutate(editUser);
                            }
                        }}
                    >
                        <div>
                            <label className="text-sm font-medium">Admin Name</label>
                            <Input
                                type="text"
                                value={editUser?.adminName || ""}
                                onChange={(e) =>
                                    setEditUser((prev) =>
                                        prev ? { ...prev, adminName: e.target.value } : null
                                    )
                                }
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium">Location</label>
                            <Input
                                type="text"
                                value={editUser?.location || ""}
                                onChange={(e) =>
                                    setEditUser((prev) =>
                                        prev ? { ...prev, location: e.target.value } : null
                                    )
                                }
                            />
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDialogState((prev) => ({ ...prev, edit: false }))}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {editMutation.isPending ? "Saving..." : "Save Changes"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={dialogState.delete}
                onOpenChange={() => setDialogState((prev) => ({ ...prev, delete: false }))} 
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to delete this user?</p>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDialogState((prev) => ({ ...prev, delete: false }))}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={() => deleteMutation.mutate()}>
                            {deleteMutation.isPending ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
