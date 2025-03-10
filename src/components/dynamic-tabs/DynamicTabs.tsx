import { DataTable } from "@/components/admin/table/data-table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface DynamicTabsProps<T> {
    tabOptions: string[];
    fetchData: (tab: string) => Promise<T[]>;
    columns: any;
}

const DynamicTabs = <T,>({
    tabOptions,
    fetchData,
    columns,
}: DynamicTabsProps<T>) => {
    const [tabData, setTabData] = useState<T[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>(tabOptions[0]);
    const [counts, setCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        handleTabChange(tabOptions[0]);
    }, []);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        setLoading(true);

        fetchData(tab).then((data) => {
            setTabData(data);
            setLoading(false);
            setCounts((prev) => ({ ...prev, [tab]: data.length }));
        });
    };

    return (
        <div className="px-4 py-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 container mx-auto">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <TabsList className="flex flex-wrap gap-2 mb-4 sm:mb-0 sm:flex-row sm:gap-4">
                        {tabOptions.map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                className="w-full sm:w-auto px-6 bg-primary/20 cursor-pointer"
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                {loading ? (
                                    <Skeleton className="ml-1 h-4 w-6 rounded-full" />
                                ) : (
                                    <Badge className="ml-1 rounded-full px-3">
                                        {counts[tab] || 0}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <div className="mt-10 overflow-x-auto">
                    {loading ? (
                        <div className="space-y-2">
                            {Array(5)
                                .fill(0)
                                .map((_, index) => (
                                    <Skeleton
                                        key={index}
                                        className="h-12 w-full rounded-md mt-auto"
                                    />
                                ))}
                        </div>
                    ) : (
                        <DataTable columns={columns} data={tabData} />
                    )}
                </div>
            </Tabs>
        </div>
    );
};

export default DynamicTabs;
