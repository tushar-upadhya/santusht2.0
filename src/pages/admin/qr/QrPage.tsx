import { QrTableColumns } from "@/components/admin/Qr/QrTableColumns";
import { DataTable } from "@/components/data-table/data-table";
import AddQrCodeForm from "@/components/forms/add-qr/AddQrCodeForm";
import DialogForm from "@/components/forms/dialog-form/DialogForm";
import Logo from "@/components/header/logo/Logo";
import { Skeleton } from "@/components/ui/skeleton";
import { QRType } from "@/lib/types/qrType";
import React, { useEffect, useState } from "react";

const demoData: QRType[] = [
    {
        serialNumber: 1,
        qrFor: "grievance",
        building: "Mother And Child Block",
        floorNo: 5,
        location: "Toilet Near HDO Room",
        description: "grievance",
        lastUpdate: "2024-11-15",
    },
    {
        serialNumber: 2,
        qrFor: "grievance",
        building: "Mother And Child Block",
        floorNo: 5,
        location: "Toilet Near 555 Room",
        description: "grievance",
        lastUpdate: "2024-11-15",
    },
    {
        serialNumber: 3,
        qrFor: "grievance",
        building: "Mother And Child Block",
        floorNo: 5,
        location: "Toilet Near 510 Room",
        description: "grievance",
        lastUpdate: "2024-11-15",
    },
    {
        serialNumber: 4,
        qrFor: "grievance",
        building: "Mother And Child Block",
        floorNo: 6,
        location: "Toilet Near 628 Room",
        description: "grievance",
        lastUpdate: "2024-11-15",
    },
    {
        serialNumber: 5,
        qrFor: "grievance",
        building: "Mother And Child Block",
        floorNo: 6,
        location: "Toilet Near 622 Room",
        description: "grievance",
        lastUpdate: "2024-11-15",
    },
];

const QRPage: React.FC = () => {
    const [data, setData] = useState<QRType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setData(demoData);
            setLoading(false);
        }, 2000);
    }, []);

    const handleDelete = (serialNumber: number) => {
        setData((prevData) =>
            prevData.filter((item) => item.serialNumber !== serialNumber)
        );
    };

    return (
        <div className="py-12">
            <div className="container mx-auto">
                <div className="flex justify-start w-full px-4 sm:px-0">
                    <DialogForm
                        title="SANTUSHT"
                        description="Your well-being is our priority."
                        formComponent={<AddQrCodeForm />}
                        buttonLabel="Generate QR"
                        logo={<Logo />}
                        location="All India Institute Of Medical Sciences, Ansari Nagar New Delhi"
                    />
                </div>
                <div className="">
                    {loading ? (
                        <div className="space-y-2">
                            {Array(5)
                                .fill(0)
                                .map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        className="h-12 w-full rounded-md"
                                    />
                                ))}
                        </div>
                    ) : (
                        <DataTable columns={QrTableColumns} data={data} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRPage;
