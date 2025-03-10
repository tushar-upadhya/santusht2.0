"use client";

import { DataTable } from "@/components/admin/table/data-table";
import { UserTableColumns } from "@/components/admin/user-management/user-table/UserTableColumns";
import BuildingMasterForm from "@/components/forms/building-master-form/BuildingMasterForm";
import CategoryMasterForm from "@/components/forms/category-master-form/CategoryMasterForm";
import DesignationMaster from "@/components/forms/designation-master/DesignationMaster";
import DialogForm from "@/components/forms/dialog-form/DialogForm";
import EditExistingUserForm from "@/components/forms/edit-existing-user-form/EditExistingUserForm";
import LockAndUnlockUserForm from "@/components/forms/unlock-user-forms/LockAndUnlockUserForm";
import Logo from "@/components/header/logo/Logo";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

import React from "react";

interface UserData {
    id: number;
    serialNumber: number;
    status: string;
    role: string;
    fullName: string;
    description: string;
    mobile: number;
}

const fetchUsers = async (): Promise<UserData[]> => {
    const res = await fetch("http://localhost:5000/users");
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
};

const UserManagementPage: React.FC = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
        staleTime: 300000,
    });

    return (
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {isLoading
                        ? Array(5)
                              .fill(0)
                              .map((_, index) => (
                                  <Skeleton
                                      key={index}
                                      className="h-16 w-full rounded-md"
                                  />
                              ))
                        : [
                              {
                                  component: <BuildingMasterForm />,
                                  label: "Building Master",
                              },
                              {
                                  component: <CategoryMasterForm />,
                                  label: "Category Master",
                              },
                              {
                                  component: <DesignationMaster />,
                                  label: "Designation Master",
                              },
                              {
                                  component: <LockAndUnlockUserForm />,
                                  label: "Lock & Unlock User",
                              },
                              {
                                  component: <EditExistingUserForm />,
                                  label: "Edit Existing User",
                              },
                          ].map((item, index) => (
                              <DialogForm
                                  key={index}
                                  title="SANTUSHT"
                                  description="Your well-being is our priority."
                                  formComponent={item.component}
                                  buttonLabel={item.label}
                                  logo={<Logo />}
                                  location="All India Institute Of Medical Sciences, Ansari Nagar New Delhi"
                              />
                          ))}
                </div>

                <div className="mt-6 overflow-x-auto">
                    {isLoading ? (
                        <div className="space-y-2">
                            {Array(10)
                                .fill(0)
                                .map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        className="h-10 w-full rounded-md"
                                    />
                                ))}
                        </div>
                    ) : isError ? (
                        <div className="text-red-500">
                            Error fetching data: {error.message}
                        </div>
                    ) : (
                        <DataTable
                            columns={UserTableColumns}
                            data={data || []}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserManagementPage;
