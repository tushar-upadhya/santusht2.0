import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ChevronDown, Edit, Menu } from "lucide-react";
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
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [editUser, setEditUser] = useState<UserData | null>(null);

    const toggleDropdown = (dropdown: string) => {
        setOpenDropdown(openDropdown === dropdown ? null : dropdown);
    };

    const handleEditClick = (user: UserData) => {
        setEditUser(user);
    };

    return (
        <>
            {/* Sidebar */}
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="default"
                        className="ml-4 bg-green-400/40 mt-4 border-none cursor-pointer hover:bg-green-400 transition-all duration-300"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] p-4 bg-white">
                    <h2 className="text-lg font-semibold mb-4">Admin Panel</h2>
                    <div className="space-y-4">
                        {/* Admins Section */}
                        <div>
                            <button
                                onClick={() => toggleDropdown("admins")}
                                className="flex justify-between items-center w-full py-2 px-3 bg-gray-200 rounded-md"
                            >
                                Admins <ChevronDown className="w-4 h-4" />
                            </button>
                            {openDropdown === "admins" && (
                                <ul className="mt-2 space-y-2 pl-4">
                                    {users
                                        .filter((user) => user.role === "Admin")
                                        .map((admin) => (
                                            <li
                                                key={admin.id}
                                                className="flex justify-between items-center py-1"
                                            >
                                                {admin.adminName}
                                                <Edit
                                                    className="w-4 h-4 cursor-pointer text-blue-500"
                                                    onClick={() =>
                                                        handleEditClick(admin)
                                                    }
                                                />
                                            </li>
                                        ))}
                                </ul>
                            )}
                        </div>

                        {/* Institutes Section */}
                        <div>
                            <button
                                onClick={() => toggleDropdown("institutes")}
                                className="flex justify-between items-center w-full py-2 px-3 bg-gray-200 rounded-md"
                            >
                                Institutes <ChevronDown className="w-4 h-4" />
                            </button>
                            {openDropdown === "institutes" && (
                                <ul className="mt-2 space-y-2 pl-4">
                                    {users.map((user) => (
                                        <li
                                            key={user.id}
                                            className="flex justify-between items-center py-1"
                                        >
                                            {user.location}
                                            <Edit
                                                className="w-4 h-4 cursor-pointer text-blue-500"
                                                onClick={() =>
                                                    handleEditClick(user)
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </SheetContent>
            </Sheet>

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
                                    Description
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
        </>
    );
};

export default Sidebar;
