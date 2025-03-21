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
    try {
        const res = await fetch("http://localhost:5000/users");
        if (!res.ok)
            throw new Error(`Failed to fetch users: ${res.statusText}`);

        const rawData: any[] = await res.json();
        console.log("Fetched Users Data:", rawData);

        return rawData.map((user, index) => ({
            serialNumber: index + 1,
            status: user.status ?? "Unknown",
            role: user.role ?? "N/A",
            adminName: user.adminName ?? "N/A",
            instituteName: user.instituteName ?? "N/A",
            mobile: user.mobile ?? "N/A",
            location: user.location ?? "N/A",
        })) as UserData[];
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
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
                    />

                    <DialogForm
                        title="SANTUSHT"
                        formComponent={
                            <SuperAdminAddInstituteForm admins={admins} />
                        }
                        buttonLabel="Add Institute"
                        buttonClassName="hover:border-[#FA7275] hover:text-[#FA7275]"
                    />
                </div>

                {/* Table Section */}
                <div>
                    {isLoading ? (
                        <Skeleton className="h-10 w-full max-w-lg rounded-md" />
                    ) : isError ? (
                        <div className="text-red-500">
                            Error: {error.message}
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
