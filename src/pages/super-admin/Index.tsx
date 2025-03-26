import { DataTable } from "@/components/data-table/data-table";
import DialogForm from "@/components/forms/dialog-form/DialogForm";
import SuperAdminAddAdminForm from "@/components/forms/super-admin-forms/super-admin-add-admin-form/SuperAdminAddAdminForm";
import SuperAdminAddInstituteForm from "@/components/forms/super-admin-forms/super-admin-add-institute-form/SuperAdminAddInstituteForm";
import Sidebar from "@/components/super-admin/sidebar/Sidebar";
import { SuperAdminTableColumns } from "@/components/super-admin/SuperAdminTableColumns";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

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

const fetchUsers = async (): Promise<UserData[]> => {
    const response = await fetch(
        "http://192.168.30.88:8080/santusht/superadmin/users",
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // Add any necessary authentication headers here
            },
        }
    );
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return response.json();
};

const SuperAdminPage = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 300000,
    });

    const admins = data?.filter((user) => user.role === "Admin") || [];

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-[300px] flex-shrink-0">
                <Sidebar users={data || []} />
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-6">
                {/* Forms Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DialogForm
                        title="SANTUSHT"
                        formComponent={
                            <SuperAdminAddAdminForm onAdminAdded={refetch} />
                        }
                        buttonLabel="Add Admin"
                        buttonClassName="px-4 py-2 sm:px-6 sm:py-3 bg-[#FA7275] hover:bg-[#FA7275]/80 text-white text-sm sm:text-base font-medium rounded-md transition-colors duration-300"
                    />

                    <DialogForm
                        title="SANTUSHT"
                        formComponent={
                            <SuperAdminAddInstituteForm
                                admins={admins}
                                onInstituteAdded={refetch}
                            />
                        }
                        buttonLabel="Add Institute"
                        buttonClassName="px-4 py-2 sm:px-6 sm:py-3 bg-[#FA7275] hover:bg-[#FA7275]/80 text-white text-sm sm:text-base font-medium rounded-md transition-colors duration-300"
                    />
                </div>

                {/* Table Section */}
                <div>
                    {isLoading ? (
                        <Skeleton className="h-10 w-full max-w-lg rounded-md" />
                    ) : isError ? (
                        <div className="text-red-500">
                            Error:{" "}
                            {error instanceof Error
                                ? error.message
                                : "Unknown error"}
                        </div>
                    ) : (
                        <DataTable
                            columns={SuperAdminTableColumns}
                            data={data || []}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default SuperAdminPage;
