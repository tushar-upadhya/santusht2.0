import { DataTable } from "@/components/data-table/data-table";
import DialogForm from "@/components/forms/dialog-form/DialogForm";
import SuperAdminAddAdminForm from "@/components/forms/super-admin-forms/super-admin-add-admin-form/SuperAdminAddAdminForm";
import SuperAdminAddInstituteForm from "@/components/forms/super-admin-forms/super-admin-add-institute-form/SuperAdminAddInstituteForm";
import { SuperAdminTableColumns } from "@/components/super-admin/SuperAdminTableColumns";
import { Skeleton } from "@/components/ui/skeleton";
import {
    restoreAdmins,
    restoreInstitutes,
} from "@/redux/features/instituteSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UserData {
    id: number;
    serialNumber: number;
    status: string;
    role: string;
    instituteName: string;
    fullname?: string;
    mobile?: string;
}

const SuperAdminPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { institutes, admins, loading, error } = useSelector(
        (state: RootState) => state.institutes
    );

    useEffect(() => {
        try {
            const storedInstitutes = sessionStorage.getItem("institutes");
            if (storedInstitutes && institutes.length === 0) {
                const parsedInstitutes = JSON.parse(storedInstitutes);
                dispatch(restoreInstitutes(parsedInstitutes));
            }
            const storedAdmins = sessionStorage.getItem("admins");
            if (storedAdmins && admins.length === 0) {
                const parsedAdmins = JSON.parse(storedAdmins);
                dispatch(restoreAdmins(parsedAdmins));
            }
        } catch (err) {
            console.error("Failed to parse sessionStorage:", err);
            sessionStorage.removeItem("institutes");
            sessionStorage.removeItem("admins");
        }
    }, [dispatch, admins.length, institutes.length]);

    const tableData: UserData[] = [
        ...institutes.map((inst, index) => ({
            id: inst.id || index,
            serialNumber: index + 1,
            status: inst.status,
            role: "Institute",
            instituteName: inst.name,
        })),
        ...admins.map((admin, index) => {
            const instituteName =
                institutes.find((inst) => inst.id === admin.institute.id)
                    ?.name || "Unknown";
            return {
                id: admin.id || index + institutes.length,
                serialNumber: index + institutes.length + 1,
                status: admin.status,
                role: admin.role,
                instituteName,
                fullname: admin.fullname,
                mobile: "N/A",
            };
        }),
    ];

    const handleInstituteAdded = () => {
        sessionStorage.setItem("institutes", JSON.stringify(institutes));
    };

    const handleAdminAdded = () => {
        sessionStorage.setItem("admins", JSON.stringify(admins));
    };

    return (
        <div className="flex min-h-screen">
            <div className="flex-1 p-6 space-y-6 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DialogForm
                        title="SANTUSHT"
                        formComponent={
                            <SuperAdminAddAdminForm
                                onAdminAdded={handleAdminAdded}
                            />
                        }
                        buttonLabel="Add Admin"
                        buttonClassName="px-4 py-2 sm:px-6 sm:py-3 bg-[#FA7275] hover:bg-[#FA7275]/80 text-white text-sm sm:text-base font-medium rounded-md transition-colors duration-300"
                    />
                    <DialogForm
                        title="SANTUSHT"
                        formComponent={
                            <SuperAdminAddInstituteForm
                                onInstituteAdded={handleInstituteAdded}
                            />
                        }
                        buttonLabel="Add Institute"
                        buttonClassName="px-4 py-2 sm:px-6 sm:py-3 bg-[#FA7275] hover:bg-[#FA7275]/80 text-white text-sm sm:text-base font-medium rounded-md transition-colors duration-300"
                    />
                </div>
                <div>
                    {loading ? (
                        <Skeleton className="h-10 w-full max-w-lg rounded-md" />
                    ) : error && tableData.length === 0 ? (
                        <div className="text-red-500">Error: {error}</div>
                    ) : (
                        <DataTable
                            columns={SuperAdminTableColumns}
                            data={tableData}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminPage;
