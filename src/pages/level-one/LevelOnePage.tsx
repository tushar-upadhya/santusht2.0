import DynamicTabs from "@/components/dynamic-tabs/DynamicTabs";
import GrievanceNotification from "@/components/grievance-info/grievance-notification/GrievanceNotification";
import { LevelOneColumns } from "@/components/level-one/LevelOneColumns";
import { Skeleton } from "@/components/ui/skeleton";
import { Employee } from "@/lib/types/employeeType";
import { fetchNewGrievances } from "@/redux/features/grievanceSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
    const dispatch = useDispatch();
    const { newGrievanceCount, newGrievanceData, loadingCount, error } =
        useSelector((state: RootState) => state.grievance);

    useEffect(() => {
        dispatch(fetchNewGrievances() as any);
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-[#FA7275]/7">
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-6xl">
                <div className="mb-6">
                    {loadingCount ? (
                        <Skeleton className="h-12 w-full max-w-md mx-auto rounded-md" />
                    ) : (
                        <GrievanceNotification
                            count={newGrievanceCount}
                            loading={loadingCount}
                            error={error}
                        />
                    )}
                </div>
                <div>
                    {loadingCount ? (
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-full rounded-md bg-blue-100" />
                            <Skeleton className="h-64 w-full bg-blue-100 rounded-md" />
                        </div>
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
