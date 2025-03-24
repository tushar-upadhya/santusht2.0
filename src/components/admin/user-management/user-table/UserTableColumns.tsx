import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, KeyRound, Trash } from "lucide-react";
import React, { useState } from "react";

export type Employee = {
    serialNumber: number;
    status: string;
    role: string;
    fullName: string;
    description: string;
    mobile: number;
    action?: React.ReactNode;
};

// const employeesData: Employee[] = [
//     {
//         serialNumber: 1,
//         fullName: "John Doe",
//         role: "Admin",
//         status: "Active",
//         description: "Manager",
//         mobile: 9876543210,
//     },
//     {
//         serialNumber: 2,
//         fullName: "Jane Smith",
//         role: "Developer",
//         status: "Inactive",
//         description: "Frontend Developer",
//         mobile: 9876543222,
//     },
// ];

export const UserTableColumns: ColumnDef<Employee>[] = [
    {
        accessorKey: "serialNumber",
        header: () => <div className="text-left">S.No</div>,
        cell: ({ row }) => <div className="text-left">{row.index + 1}</div>,
    },
    {
        accessorKey: "fullName",
        header: () => <div className="text-left">Full Name</div>,
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("fullName")}</div>
        ),
    },
    {
        accessorKey: "role",
        header: () => <div className="text-left">Role</div>,
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("role")}</div>
        ),
    },
    {
        accessorKey: "status",
        header: () => <div className="text-left">Status</div>,
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("status")}</div>
        ),
    },
    {
        accessorKey: "description",
        header: () => <div className="text-left">Description</div>,
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("description")}</div>
        ),
    },
    {
        accessorKey: "mobile",
        header: () => <div className="text-left">Mobile</div>,
        cell: ({ row }) => (
            <div className="text-left">{row.getValue("mobile")}</div>
        ),
    },
    {
        accessorKey: "action",
        header: () => <div className="text-left">Action</div>,
        cell: ({ row }) => <ActionButtons employee={row.original} />,
    },
];

const ActionButtons = ({ employee }: { employee: Employee }) => {
    const [dialogState, setDialogState] = useState({
        view: false,
        edit: false,
        delete: false,
        resetPassword: false,
    });
    const [editedEmployee, setEditedEmployee] = useState({ ...employee });

    // API Base URL
    const API_URL = "http://localhost:3000/users";

    // Function to update employee details (PUT request)
    const handleEdit = async () => {
        try {
            const response = await fetch(
                `${API_URL}/${editedEmployee.serialNumber}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(editedEmployee),
                }
            );

            if (!response.ok) throw new Error("Failed to update employee");

            alert("Employee updated successfully!");
            setDialogState({ ...dialogState, edit: false });
        } catch (error) {
            console.error(error);
            alert("Error updating employee");
        }
    };

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
                    variant="outline"
                    onClick={() =>
                        setDialogState({ ...dialogState, edit: true })
                    }
                >
                    <Edit className="w-4 h-4" />
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
                <Button
                    size="icon"
                    variant="outline"
                    onClick={() =>
                        setDialogState({ ...dialogState, resetPassword: true })
                    }
                >
                    <KeyRound className="w-4 h-4" />
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
                        <DialogTitle>
                            Employee Details - {employee.fullName}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {/* Building Selection */}
                        <div>
                            <Label>Select Building</Label>
                            <Select
                                onValueChange={(value) =>
                                    console.log("Building:", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose a building" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="building1">
                                        Building 1
                                    </SelectItem>
                                    <SelectItem value="building2">
                                        Building 2
                                    </SelectItem>
                                    <SelectItem value="building3">
                                        Building 3
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="flex-1">
                                <Label>Floors</Label>
                                <Input
                                    type="number"
                                    placeholder="Enter floor number"
                                />
                            </div>
                            <div className="flex mt-6">
                                <Button variant="outline">Add Floor</Button>
                            </div>
                        </div>

                        {/* Category Selection */}
                        <div>
                            <Label>Select Category</Label>
                            <Select
                                onValueChange={(value) =>
                                    console.log("Category:", value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="category1">
                                        Category 1
                                    </SelectItem>
                                    <SelectItem value="category2">
                                        Category 2
                                    </SelectItem>
                                    <SelectItem value="category3">
                                        Category 3
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Assign Work Button */}
                        <Button className="w-full">Assign Work</Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Edit Employee Dialog */}
            <Dialog
                open={dialogState.edit}
                onOpenChange={() =>
                    setDialogState({ ...dialogState, edit: false })
                }
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Employee</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        {Object.keys(editedEmployee).map((key) =>
                            key !== "serialNumber" && key !== "action" ? (
                                <div key={key}>
                                    <Label>{key}</Label>
                                    <Input
                                        value={
                                            editedEmployee[
                                                key as keyof Employee
                                            ] as string
                                        }
                                        onChange={(e) =>
                                            setEditedEmployee({
                                                ...editedEmployee,
                                                [key]: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            ) : null
                        )}
                        <Button onClick={handleEdit}>Save</Button>
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
                    <p>Are you sure you want to delete {employee.fullName}?</p>
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
