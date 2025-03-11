import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface Admin {
    id: string;
    adminName: string;
}

interface SuperAdminAddInstituteFormProps {
    admins: Admin[];
}

const SuperAdminAddInstituteForm: React.FC<SuperAdminAddInstituteFormProps> = ({
    admins,
}) => {
    const [instituteData, setInstituteData] = useState({
        instituteName: "",
        adminName: "",
        location: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        setInstituteData({ ...instituteData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/add-institute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(instituteData),
            });
            if (res.ok) {
                setInstituteData({
                    instituteName: "",
                    adminName: "",
                    location: "",
                });
            }
        } catch (error) {
            console.error("Failed to add institute:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Label>Institute Name</Label>
            <Input
                type="text"
                name="instituteName"
                placeholder="Institute Name"
                value={instituteData.instituteName}
                onChange={handleChange}
                required
            />

            <Label>Admin</Label>
            <Select
                onValueChange={(value) =>
                    setInstituteData({ ...instituteData, adminName: value })
                }
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select Admin" />
                </SelectTrigger>
                <SelectContent>
                    {admins.map((admin) => (
                        <SelectItem key={admin.id} value={admin.adminName}>
                            {admin.adminName}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Label>Location</Label>
            <Input
                type="text"
                name="location"
                placeholder="Location"
                value={instituteData.location}
                onChange={handleChange}
                required
            />

            <Button type="submit" className="bg-green-500 text-white">
                Add Institute
            </Button>
        </form>
    );
};

export default SuperAdminAddInstituteForm;
