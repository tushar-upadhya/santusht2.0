import { ActionButtons } from "@/components/action-button/ActionButtons";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";

export type Employee = {
    serialNumber: number;
    refNo: string;
    location: string;
    description: string;
    lastUpdate: string;
};

export const columns: ColumnDef<Employee>[] = [
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
        accessorKey: "refNo",
        header: () => <div className="text-left">Ref No</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("refNo")}
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
        accessorKey: "description",
        header: () => <div className="text-left">Description</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("description")}
            </div>
        ),
    },
    {
        accessorKey: "lastUpdate",
        header: () => <div className="text-left">Last Update</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("lastUpdate")}
            </div>
        ),
    },
    {
        accessorKey: "action",
        header: () => <div className="text-left">Action</div>,
        cell: ({ row }) => (
            <ActionButtons<Employee>
                data={row.original}
                actions={[
                    {
                        label: "View",
                        icon: Eye,
                        onClick: () => {},
                    },
                    {
                        label: "Delete",
                        icon: Trash,
                        onClick: (employee: Employee) => {
                            console.log(
                                `Deleting employee with refNo: ${employee.refNo}`
                            );
                        },
                        variant: "destructive",
                    },
                ]}
                viewDetails={(employee: Employee) => ({
                    "Ref No": employee.refNo,
                    Location: employee.location,
                    Description: employee.description,
                    "Last Update": employee.lastUpdate,
                })}
            />
        ),
    },
];
