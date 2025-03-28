import { DataTable } from "@/components/data-table/data-table";
import DialogForm from "@/components/forms/dialog-form/DialogForm";
import SuperAdminAddAdminForm from "@/components/forms/super-admin-forms/super-admin-add-admin-form/SuperAdminAddAdminForm";
import SuperAdminAddInstituteForm from "@/components/forms/super-admin-forms/super-admin-add-institute-form/SuperAdminAddInstituteForm";
import Sidebar from "@/components/super-admin/sidebar/Sidebar";
import { SuperAdminTableColumns } from "@/components/super-admin/SuperAdminTableColumns";
import { Skeleton } from "@/components/ui/skeleton";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

interface UserData {
    id: number;
    serialNumber: number;
    status: string;
    role: string;
    adminName: string;
    instituteName: string;
    mobile: string;
    location: string;
}

const SuperAdminPage = () => {
    const dispatch = useDispatch<AppDispatch>(); // Added useDispatch
    const { institutes, loading, error } = useSelector(
        (state: RootState) => state.institutes
    );
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    const tableData: UserData[] = institutes.map((inst, index) => ({
        id: inst.id || index,
        serialNumber: index + 1,
        status: inst.status,
        role: "Institute",
        adminName: "",
        instituteName: inst.name,
        mobile: "",
        location: "",
    }));

    // Temporarily disable fetch to avoid 500 error; rely on local state
    const handleInstituteAdded = () => {
        // Empty function; fetch skipped until backend provides correct payload
        // if (isAuthenticated) {
        //     try {
        //         await dispatch(fetchInstitutesThunk()).unwrap();
        //         console.log("Institutes refreshed after adding");
        //     } catch (err) {
        //         console.error("Refresh fetch failed:", err);
        //     }
        // }
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
