import { columns, Employee } from "@/components/admin/table/columns";
import DynamicTabs from "@/components/dynamic-tabs/DynamicTabs";
import DialogForm from "@/components/forms/dialog-form/DialogForm";
import RaiseGrievanceForm from "@/components/forms/raise-grievance-form/RaiseGrievanceForm";
import Logo from "@/components/header/logo/Logo";

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

const AdminPage = () => {
    return (
        <div className="min-h-screen bg-[#FA7275]/7">
            {/* Main container */}
            <div className="container mx-auto px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                {/* Header section */}
                <div className="mb-8 flex flex-col items-center space-y-4 sm:items-start sm:space-y-6">
                    <DialogForm
                        title="SANTUSHT"
                        description="Your well-being is our priority."
                        formComponent={<RaiseGrievanceForm />}
                        buttonLabel="Raise Grievance"
                        logo={<Logo />}
                        location="All India Institute Of Medical Sciences, Ansari Nagar New Delhi"
                    />
                </div>

                {/* Tabs section */}
                <div className="w-full">
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

export default AdminPage;
