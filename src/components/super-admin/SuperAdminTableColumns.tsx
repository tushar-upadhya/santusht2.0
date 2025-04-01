import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import { ActionButtons } from "../action-button/ActionButtons";

interface UserData {
    id: number;
    serialNumber: number;
    status: string;
    role: string;
    instituteName: string;
    adminName?: string;
    mobile?: string;
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
        cell: ({ row }) => (
            <ActionButtons<UserData>
                data={row.original}
                actions={[
                    {
                        label: "View",
                        icon: Eye,
                        variant: "outline",
                    },
                    {
                        label: "Delete",
                        icon: Trash,
                        variant: "destructive",
                        renderDialogContent: (data, closeDialog) => (
                            <>
                                <p>
                                    Are you sure you want to delete this{" "}
                                    {data.role.toLowerCase()}?
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
                ]}
                viewDetails={(user: UserData) => ({
                    "Serial Number": String(user.serialNumber),
                    "Admin Name": user.adminName || "N/A",
                    "Institute Name": user.instituteName,
                    Role: user.role,
                    Mobile: user.mobile || "N/A",
                    Status: user.status,
                })}
            />
        ),
    },
];
