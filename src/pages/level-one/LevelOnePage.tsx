import { columns } from "@/components/admin/table/columns";
import DynamicTabs from "@/components/dynamic-tabs/DynamicTabs";
import Notification from "@/components/grievance-info/grievance-notification/GrievanceNotice";
import { Employee } from "@/lib/types/employeeType";
import { useState } from "react";

// Define the grievance type
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
                    refNo: "EMP003",
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
    // Default grievance data
    const [grievances] = useState<{
        new: Grievance[];
        active: Grievance[];
        closed: Grievance[];
        verified: Grievance[];
    }>({
        new: [
            { id: "GRV001", title: "Issue with Login", raisedBy: "John Doe" },
            { id: "GRV002", title: "Payment Failure", raisedBy: "Alice Smith" },
        ],
        active: [
            { id: "GRV003", title: "Website Bug", raisedBy: "Mark Johnson" },
        ],
        closed: [
            { id: "GRV004", title: "Service Delay", raisedBy: "Sophia Lee" },
        ],
        verified: [
            { id: "GRV005", title: "Refund Request", raisedBy: "Emma Brown" },
        ],
    });

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-4">
            {/* Notification Component */}
            <Notification count={grievances.new.length} />

            {/* Tabs Component */}
            <div className="mt-6">
                <DynamicTabs
                    tabOptions={["new", "active", "closed", "verified"]}
                    fetchData={fetchEmployeeData}
                    columns={columns}
                />
            </div>
        </div>
    );
};

export default LevelOnePage;
