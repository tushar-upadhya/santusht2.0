import { DataTable } from "@/components/data-table/data-table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ColumnDef } from "@tanstack/react-table";
import { useCallback, useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

interface DynamicTabsProps<T> {
    tabOptions: string[];
    fetchData: (tab: string) => Promise<T[]>;
    columns: ColumnDef<T>[] | ((tab: string) => ColumnDef<T>[]);
    initialNewData?: { count: number; data: T[] };
}

const DynamicTabs = <T,>({
    tabOptions,
    fetchData,
    columns,
    initialNewData,
}: DynamicTabsProps<T>) => {
    const [tabData, setTabData] = useState<T[]>(initialNewData?.data || []);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<string>(tabOptions[0]);
    const [counts, setCounts] = useState<Record<string, number>>({
        new: initialNewData?.count || 0,
    });

    const handleTabChange = useCallback(
        (tab: string) => {
            setActiveTab(tab);
            setLoading(true);

            if (tab === "new" && initialNewData) {
                setTabData(initialNewData.data);
                setCounts((prev) => ({ ...prev, [tab]: initialNewData.count }));
                setLoading(false);
            } else {
                fetchData(tab).then((data) => {
                    setTabData(data);
                    setLoading(false);
                    setCounts((prev) => ({ ...prev, [tab]: data.length }));
                });
            }
        },
        [fetchData, initialNewData]
    );

    useEffect(() => {
        handleTabChange(tabOptions[0]);
    }, [handleTabChange, tabOptions]);

    const resolvedColumns =
        typeof columns === "function" ? columns(activeTab) : columns;

    return (
        <div className="py-6 md:py-12 px-4 md:px-6 max-w-full md:max-w-6xl mx-auto">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
                <div className="flex flex-col gap-6">
                    <TabsList className="flex flex-wrap gap-2 sm:gap-4 bg-transparent">
                        {tabOptions.map((tab) => (
                            <TabsTrigger
                                key={tab}
                                value={tab}
                                className="flex items-center gap-2 px-4 py-2 text-sm sm:text-base text-slate-700 cursor-pointer bg-[#FA7275]/20 rounded-md hover:bg-[#FA7275]/20 data-[state=active]:bg-[#FA7275] data-[state=active]:text-white data-[state=active]:font-semibold transition-all duration-300"
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                {loading && activeTab === tab ? (
                                    <Skeleton className="h-5 w-6 rounded-full" />
                                ) : (
                                    <Badge
                                        variant="secondary"
                                        className="ml-2 px-2 py-0.5 text-xs bg-[#FA7275] text-white rounded-full"
                                    >
                                        {counts[tab] || 0}
                                    </Badge>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    <div className="mt-4">
                        {loading ? (
                            <div className="space-y-3">
                                {Array(5)
                                    .fill(0)
                                    .map((_, index) => (
                                        <Skeleton
                                            key={index}
                                            className="h-12 w-full rounded-md"
                                        />
                                    ))}
                            </div>
                        ) : (
                            <div className="mt-[3rem]">
                                <DataTable
                                    columns={resolvedColumns}
                                    data={tabData}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </Tabs>
        </div>
    );
};

export default DynamicTabs;
