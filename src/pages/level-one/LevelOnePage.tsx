import DynamicTabs from "@/components/dynamic-tabs/DynamicTabs";
import GrievanceNotification from "@/components/grievance-info/grievance-notification/GrievanceNotification";
import { LevelOneColumns } from "@/components/level-one/LevelOneColumns";
import { Skeleton } from "@/components/ui/skeleton";
import {
    fetchEmployeeData,
    fetchNewGrievances,
    updateNewGrievanceCount,
} from "@/redux/features/grievanceSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LevelOnePage: React.FC = () => {
    const dispatch = useDispatch();
    const { newGrievanceCount, newGrievanceData, loadingCount, error } =
        useSelector((state: RootState) => state.grievance);

    useEffect(() => {
        dispatch(fetchNewGrievances() as any);
    }, [dispatch]);

    const handleFetchData = async (type: string) => {
        const data = await fetchEmployeeData(type);
        if (type === "new") {
            dispatch(updateNewGrievanceCount(data));
        }
        return data;
    };

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
                            fetchData={handleFetchData}
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
