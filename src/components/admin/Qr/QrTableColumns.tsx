import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { QRType } from "@/lib/types/qrType";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import { useState } from "react";

export const QrTableColumns: ColumnDef<QRType>[] = [
    {
        accessorKey: "serialNumber",
        header: () => <div className="text-left">S.No</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.index + 1}
            </div>
        ),
    },
    {
        accessorKey: "qrFor",
        header: () => <div className="text-left">QR For</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("qrFor")}
            </div>
        ),
    },
    {
        accessorKey: "location",
        header: () => <div className="text-left">Location</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("location")}
            </div>
        ),
    },
    {
        accessorKey: "building",
        header: () => <div className="text-left capitalize">building</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("building")}
            </div>
        ),
    },
    {
        accessorKey: "floorNo",
        header: () => <div className="text-left capitalize">Floor No</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("floorNo")}
            </div>
        ),
    },
    {
        accessorKey: "action",
        header: () => <div className="text-left">Action</div>,
        cell: ({ row }) => <ActionButtons employee={row.original} />,
    },
];

const ActionButtons = ({ employee }: { employee: QRType }) => {
    const [dialogState, setDialogState] = useState({
        view: false,
        edit: false,
        delete: false,
        resetPassword: false,
    });
    const [editedEmployee] = useState({ ...employee });

    // API Base URL
    const API_URL = "http://localhost:3000/users";

    // Function to update employee details (PUT request)
    // const handleEdit = async () => {
    //     try {
    //         const response = await fetch(
    //             `${API_URL}/${editedEmployee.serialNumber}`,
    //             {
    //                 method: "PUT",
    //                 headers: { "Content-Type": "application/json" },
    //                 body: JSON.stringify(editedEmployee),
    //             }
    //         );

    //         if (!response.ok) throw new Error("Failed to update employee");

    //         alert("Employee updated successfully!");
    //         setDialogState({ ...dialogState, edit: false });
    //     } catch (error) {
    //         console.error(error);
    //         alert("Error updating employee");
    //     }
    // };

    // Function to delete employee (DELETE request)
    const handleDelete = async () => {
        try {
            // console.log(`Deleting employee with ID: ${employee.serialNumber}`);

            const response = await fetch(
                `${API_URL}/${employee.serialNumber}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                }
            );

            const responseText = await response.text();
            // console.log("Response Status:", response.status);
            // console.log("Response Body:", responseText);

            if (!response.ok) {
                throw new Error(
                    `Failed to delete employee: ${response.status} - ${responseText}`
                );
            }

            alert("Employee deleted successfully!");
            setDialogState({ ...dialogState, delete: false });
        } catch (error) {
            console.error("Delete Error:", error);
            alert("Error deleting employee");
        }
    };

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
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Employee Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        {Object.entries(employee).map(([key, value]) =>
                            key !== "serialNumber" && key !== "action" ? (
                                <p key={key}>
                                    <strong>{key}:</strong> {value}
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
                    <p>Are you sure you want to delete ?</p>
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
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
