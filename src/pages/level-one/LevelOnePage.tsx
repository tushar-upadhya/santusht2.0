import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import LevelTable from "@/components/level-table/LevelTable";
import Notification from "@/components/grievance-info/grievance-notification/GrievanceNotice";


// Define the grievance type
interface Grievance {
  id: string;
  title: string;
  raisedBy: string;
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
      <Tabs defaultValue="new" className="w-full">
        <TabsList className="flex space-x-4">
          <TabsTrigger value="new">New</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
        </TabsList>

        <TabsContent value="new">
          <Card className="p-4">
            <LevelTable data={grievances.new} type="new" />
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card className="p-4">
            <LevelTable data={grievances.active} type="active" />
          </Card>
        </TabsContent>

        <TabsContent value="closed">
          <Card className="p-4">
            <LevelTable data={grievances.closed} type="closed" />
          </Card>
        </TabsContent>

        <TabsContent value="verified">
          <Card className="p-4">
            <LevelTable data={grievances.verified} type="verified" />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LevelOnePage;
