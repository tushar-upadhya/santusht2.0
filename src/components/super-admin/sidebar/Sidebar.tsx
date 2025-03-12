import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import { useState } from "react";

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

const Sidebar = ({ users }: { users: UserData[] }) => {
    const [editUser, setEditUser] = useState<UserData | null>(null);

    const handleEditClick = (user: UserData) => {
        setEditUser(user);
    };

    return (
        <div className="w-[300px] p-4 bg-white shadow-md h-screen">
            {/* Admins Section */}
            <div className="mb-6">
                <h3 className="text-md font-medium mb-2 text-center">Admins</h3>
                <ul className="space-y-2">
                    {users
                        .filter((user) => user.role === "Admin")
                        .map((admin) => (
                            <li
                                key={admin.id}
                                className="flex justify-between items-center py-2 px-3 bg-gray-100 rounded-md"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">
                                        {admin.adminName}
                                    </span>
                                    <span
                                        className={cn(
                                            "text-xs font-semibold rounded-full px-2 animate-pulse py-1",
                                            admin.status === "Active"
                                                ? "text-green-700 bg-green-200"
                                                : "text-red-700 bg-red-200"
                                        )}
                                    >
                                        {admin.status}
                                    </span>
                                </div>
                                <Edit
                                    className="w-4 h-4 cursor-pointer text-blue-500"
                                    onClick={() => handleEditClick(admin)}
                                />
                            </li>
                        ))}
                </ul>
            </div>

            {/* Institutes Section */}
            <div>
                <h3 className="text-md font-medium mb-2 text-center">
                    Institutes
                </h3>
                <ul className="space-y-2">
                    {users.map((user) => (
                        <li
                            key={user.id}
                            className="flex justify-between items-center py-2 px-3 bg-gray-100 rounded-md"
                        >
                            <div className="flex items-center gap-2">
                                <span className="font-medium">
                                    {user.location}
                                </span>
                                <span
                                    className={cn(
                                        "text-xs font-semibold rounded-full px-2 py-1 animate-pulse",
                                        user.status === "Active"
                                            ? "text-green-700 bg-green-200"
                                            : "text-red-700 bg-red-200"
                                    )}
                                >
                                    {user.status}
                                </span>
                            </div>
                            <Edit
                                className="w-4 h-4 cursor-pointer text-blue-500"
                                onClick={() => handleEditClick(user)}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Edit Dialog */}
            {editUser && (
                <Dialog
                    open={Boolean(editUser)}
                    onOpenChange={(isOpen) => {
                        if (!isOpen) setEditUser(null);
                    }}
                >
                    <DialogContent className="bg-white">
                        <DialogHeader>
                            <DialogTitle>Edit User</DialogTitle>
                        </DialogHeader>
                        <form className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">
                                    Admin Name
                                </label>
                                <Input
                                    type="text"
                                    value={editUser.adminName}
                                    onChange={(e) =>
                                        setEditUser((prev) =>
                                            prev
                                                ? {
                                                      ...prev,
                                                      adminName: e.target.value,
                                                  }
                                                : null
                                        )
                                    }
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">
                                    Location
                                </label>
                                <Input
                                    type="text"
                                    value={editUser.location}
                                    onChange={(e) =>
                                        setEditUser((prev) =>
                                            prev
                                                ? {
                                                      ...prev,
                                                      location: e.target.value,
                                                  }
                                                : null
                                        )
                                    }
                                />
                            </div>
                            <Button
                                type="button"
                                className="w-full"
                                onClick={() => {
                                    console.log("Updated User:", editUser);
                                    setEditUser(null);
                                }}
                            >
                                Save Changes
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default Sidebar;
