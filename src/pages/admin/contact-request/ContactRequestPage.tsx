import { ContactRequestColumns } from "@/components/admin/contact-request/ContactRequestColumns";
import DynamicTabs from "@/components/dynamic-tabs/DynamicTabs";
import { QRType } from "@/lib/types/qrType";

async function fetchContactRequests(type: string): Promise<QRType[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = Array(Math.floor(Math.random() * 20) + 1)
                .fill({
                    userDetails: "John Doe",
                    contact: "john.doe@example.com",
                    requestedOn: "2024-11-15",
                    concern: `${type} Request`,
                    remarks: "Pending review",
                    refNO: "123456",
                })
                .map((item, index) => ({
                    ...item,
                    serialNumber: index + 1,
                }));
            resolve(data);
        }, 1500);
    });
}

const ContactRequestPage = () => {
    return (
        <DynamicTabs
            tabOptions={["new", "closed"]}
            fetchData={fetchContactRequests}
            columns={ContactRequestColumns}
        />
    );
};

export default ContactRequestPage;
