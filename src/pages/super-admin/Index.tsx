import { DataTable } from "@/components/data-table/data-table";
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

        const data = await res.json();
        console.log("Fetched Users Data:", data);

        return data.map((user: any, index: number) => ({
            id: user.id || index,
            serialNumber: index + 1,
            status: user.status || "Unknown",
            role: user.role || "N/A",
            adminName: user.adminName || "N/A",
            instituteName: user.instituteName || "N/A",
            mobile: user.mobile || "N/A",
            location: user.location || "N/A",
        }));
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

const Index = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 300000,
    });

    return (
        <div className="flex">
            <Sidebar users={data || []} />
            <div className="p-6 flex-1">
                {isLoading ? (
                    <Skeleton className="h-10 w-full rounded-md" />
                ) : isError ? (
                    <div className="text-red-500">Error: {error.message}</div>
                ) : (
                    <DataTable
                        columns={SuperAdminTableColumns}
                        data={data || []}
                    />
                )}
            </div>
        </div>
    );
};

export default Index;
