// LevelOnePage.tsx
import DynamicTabs from "@/components/dynamic-tabs/DynamicTabs";
import GrievanceNotification from "@/components/grievance-info/grievance-notification/GrievanceNotification";
import { LevelOneColumns } from "@/components/level-one/LevelOneColumns";
import { Skeleton } from "@/components/ui/skeleton";
import { Employee } from "@/lib/types/employeeType";
import { useEffect, useState } from "react";

interface Grievance {
    id: string;
    title: string;
    raisedBy: string;
}

async function fetchEmployeeData(type: string): Promise<Employee[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = Array(Math.floor(Math.random() * 20) + 1)
                .fill({
                    refNo: `EMP-${type.toUpperCase()}-${Math.floor(
                        Math.random() * 1000
                    )}`,
                    location: "New York",
                    description: `${type} Task`,
                    lastUpdate: "2024-11-15",
                })
                .map((item, index) => ({
                    ...item,
                    serialNumber: index + 1,
                }));
            resolve(data);
        }, 1500);
    });
}

const LevelOnePage: React.FC = () => {
    const [newGrievanceCount, setNewGrievanceCount] = useState<number>(0);
    const [newGrievanceData, setNewGrievanceData] = useState<Employee[]>([]);
    const [loadingCount, setLoadingCount] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    useEffect(() => {
        const fetchNewGrievances = async () => {
            if (isFetching) return; // Prevent overlapping fetches
            setIsFetching(true);
            setLoadingCount(true);
            setError(null);

            try {
                const newGrievances = await fetchEmployeeData("new");
                setNewGrievanceCount(newGrievances.length);
                setNewGrievanceData(newGrievances);
            } catch (error) {
                console.error("Error fetching new grievances:", error);
                setNewGrievanceCount(0);
                setNewGrievanceData([]);
                setError("Failed to fetch new grievances. Please try again.");
            } finally {
                setLoadingCount(false);
                setIsFetching(false);
            }
        };

        fetchNewGrievances();
    }, []);

    return (
        <div className="min-h-screen bg-[#FA7275]/5">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-6xl">
                <div className="mb-6">
                    <GrievanceNotification
                        count={newGrievanceCount}
                        loading={loadingCount}
                        error={error}
                    />
                </div>
                <div>
                    {loadingCount ? (
                        <Skeleton />
                    ) : (
                        <DynamicTabs
                            tabOptions={["new", "active", "closed", "verified"]}
                            fetchData={fetchEmployeeData}
                            columns={LevelOneColumns}
                            initialNewData={{
                                count: newGrievanceCount,
                                data: newGrievanceData,
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default LevelOnePage;
