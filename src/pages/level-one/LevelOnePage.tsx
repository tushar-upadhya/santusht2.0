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
        <div className="min-h-screen bg-[#FA7275]/8">
            {/* Main container */}
            <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8 max-w-6xl">
                {/* Notification section */}
                <div className="mb-6">
                    <Notification count={grievances.new.length} />
                </div>

                {/* Tabs section */}
                <div className="">
                    <DynamicTabs
                        tabOptions={["new", "active", "closed", "verified"]}
                        fetchData={fetchEmployeeData}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    );
};

export default LevelOnePage;
