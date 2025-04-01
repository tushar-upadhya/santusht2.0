import { ActionButtons } from "@/components/action-button/ActionButtons";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
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

export type Employee = {
    serialNumber: number;
    status: string;
    role: string;
    fullName: string;
    description: string;
    mobile: number;
};

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
        cell: ({ row }) => {
            const API_URL = "http://localhost:3000/users";

            const handleEdit = async (editedEmployee: Employee) => {
                try {
                    const response = await fetch(
                        `${API_URL}/${editedEmployee.serialNumber}`,
                        {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(editedEmployee),
                        }
                    );
                    if (!response.ok)
                        throw new Error("Failed to update employee");
                    alert("Employee updated successfully!");
                } catch (error) {
                    console.error(error);
                    alert("Error updating employee");
                }
            };

            const handleDelete = async () => {
                try {
                    const response = await fetch(
                        `${API_URL}/${row.original.serialNumber}`,
                        {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                        }
                    );
                    if (!response.ok)
                        throw new Error("Failed to delete employee");
                    alert("Employee deleted successfully!");
                } catch (error) {
                    console.error("Delete Error:", error);
                    alert("Error deleting employee");
                }
            };

            return (
                <ActionButtons<Employee>
                    data={row.original}
                    actions={[
                        {
                            label: "View",
                            icon: Eye,
                            variant: "outline",
                            renderDialogContent: () => (
                                <div className="space-y-4">
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
                                            <Button variant="outline">
                                                Add Floor
                                            </Button>
                                        </div>
                                    </div>
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
                                    <Button className="w-full">
                                        Assign Work
                                    </Button>
                                </div>
                            ),
                            dialogTitle: `Employee Details - ${row.original.fullName}`,
                        },
                        {
                            label: "Edit",
                            icon: Edit,
                            variant: "outline",
                            renderDialogContent: (_, closeDialog) => (
                                <>
                                    <div className="space-y-4">
                                        {Object.keys(row.original).map(
                                            (key) =>
                                                key !== "serialNumber" &&
                                                key !== "action" && (
                                                    <div key={key}>
                                                        <Label>{key}</Label>
                                                        <Input
                                                            defaultValue={
                                                                row.original[
                                                                    key as keyof Employee
                                                                ] as string
                                                            }
                                                            onChange={(e) =>
                                                                handleEdit({
                                                                    ...row.original,
                                                                    [key]: e
                                                                        .target
                                                                        .value,
                                                                })
                                                            }
                                                        />
                                                    </div>
                                                )
                                        )}
                                        <Button
                                            onClick={() => {
                                                closeDialog();
                                            }}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </>
                            ),
                            dialogTitle: "Edit Employee",
                        },
                        {
                            label: "Delete",
                            icon: Trash,
                            variant: "destructive",
                            renderDialogContent: (_, closeDialog) => (
                                <>
                                    <p>
                                        Are you sure you want to delete{" "}
                                        {row.original.fullName}?
                                    </p>
                                    <DialogFooter>
                                        <Button
                                            variant="outline"
                                            onClick={closeDialog}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => {
                                                handleDelete();
                                                closeDialog();
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </DialogFooter>
                                </>
                            ),
                            dialogTitle: "Confirm Deletion",
                        },
                        {
                            label: "Reset Password",
                            icon: KeyRound,
                            variant: "outline",
                            onClick: () =>
                                console.log(
                                    `Resetting password for ${row.original.fullName}`
                                ),
                        },
                    ]}
                />
            );
        },
    },
];
