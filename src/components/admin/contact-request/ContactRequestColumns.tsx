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
import { NotebookTabs, X } from "lucide-react";
import { useState } from "react";

export const ContactRequestColumns: ColumnDef<QRType>[] = [
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
        accessorKey: "userDetails",
        header: () => <div className="text-left">User Details</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("userDetails")}
            </div>
        ),
    },
    {
        accessorKey: "contact",
        header: () => <div className="text-left">Contact</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("contact")}
            </div>
        ),
    },
    {
        accessorKey: "requestedOn",
        header: () => <div className="text-left">Requested On</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("requestedOn")}
            </div>
        ),
    },
    {
        accessorKey: "concern",
        header: () => <div className="text-left">Concern</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("concern")}
            </div>
        ),
    },
    {
        accessorKey: "refNO",
        header: () => <div className="text-left">Ref No</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("refNO")}
            </div>
        ),
    },
    {
        accessorKey: "remarks",
        header: () => <div className="text-left">Remarks</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("remarks")}
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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [remarks, setRemarks] = useState(employee.remarks || "");

    return (
        <>
            <div className="flex items-center gap-2">
                <Button
                    size="icon"
                    variant="default"
                    onClick={() => setDialogOpen(true)}
                >
                    <NotebookTabs className="w-4 h-4" />
                </Button>
                <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => setDialogOpen(true)}
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Remarks</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                            Remarks:
                        </label>
                        <textarea
                            className="w-full border rounded-md p-2 text-sm"
                            rows={3}
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDialogOpen(false)}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};
