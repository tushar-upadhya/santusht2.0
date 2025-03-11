import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { useState } from "react";

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
        cell: ({ row }) => <ActionButtons employee={row.original} />,
    },
];

const ActionButtons = ({ employee }: { employee: Employee }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");

    const handleView = () => {
        setDialogTitle(`Details of ${employee.refNo}`);
        setIsDialogOpen(true);
    };

    return (
        <>
            <div className="flex items-center gap-2">
                <Button
                    size="icon"
                    variant="outline"
                    onClick={handleView}
                    className="border-none text-gray-900 dark:text-white dark:bg-gray-800 hover:dark:bg-gray-700"
                >
                    <Eye className="w-4 h-4" />
                </Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p>
                            <strong>Ref No:</strong> {employee.refNo}
                        </p>
                        <p>
                            <strong>Location:</strong> {employee.location}
                        </p>
                        <p>
                            <strong>Description:</strong> {employee.description}
                        </p>
                        <p>
                            <strong>Last Update:</strong> {employee.lastUpdate}
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
