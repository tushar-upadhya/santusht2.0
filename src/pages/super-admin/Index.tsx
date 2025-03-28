import { DataTable } from "@/components/data-table/data-table";
import DialogForm from "@/components/forms/dialog-form/DialogForm";
import SuperAdminAddAdminForm from "@/components/forms/super-admin-forms/super-admin-add-admin-form/SuperAdminAddAdminForm";
import SuperAdminAddInstituteForm from "@/components/forms/super-admin-forms/super-admin-add-institute-form/SuperAdminAddInstituteForm";
import Sidebar from "@/components/super-admin/sidebar/Sidebar";
import { SuperAdminTableColumns } from "@/components/super-admin/SuperAdminTableColumns";
import { Skeleton } from "@/components/ui/skeleton";
import { restoreInstitutes } from "@/redux/features/instituteSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface UserData {
    id: number;
    serialNumber: number;
    status: string;
    role: string;
    instituteName: string;
}

const SuperAdminPage = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { institutes, loading, error } = useSelector(
        (state: RootState) => state.institutes
    );
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const storedInstitutes = sessionStorage.getItem("institutes");
        if (storedInstitutes && institutes.length === 0) {
            const parsedInstitutes = JSON.parse(storedInstitutes);
            dispatch(restoreInstitutes(parsedInstitutes));
            console.log("Restored institutes on mount:", parsedInstitutes);
        }
    }, [dispatch]);

    const tableData: UserData[] = institutes.map((inst, index) => ({
        id: inst.id || index,
        serialNumber: index + 1,
        status: inst.status,
        role: "Institute",
        instituteName: inst.name,
    }));

    const handleInstituteAdded = () => {
        console.log("Saving institutes to sessionStorage:", institutes);
        sessionStorage.setItem("institutes", JSON.stringify(institutes));
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-[300px] flex-shrink-0">
                <Sidebar users={tableData} />
            </div>
            <div className="flex-1 p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DialogForm
                        title="SANTUSHT"
                        formComponent={<SuperAdminAddAdminForm />}
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
                    ) : error && institutes.length === 0 ? (
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
