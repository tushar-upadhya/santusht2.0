import { Check, Eye, Forward, X } from "lucide-react";
import { Button } from "../ui/button";

// Define the type for a single grievance
interface Grievance {
  id: number;
  title: string;
  raisedBy: string;
}

// Define the props type
interface LevelTableProps {
  data: Grievance[];
  type: "new" | "active" | "closed";
}

const LevelTable: React.FC<LevelTableProps> = ({ data, type }) => {
  return (
    <table className="w-full ">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border">S.No</th>
          <th className="p-2 border">Grievance No</th>
          <th className="p-2 border">Title</th>
          <th className="p-2 border">Raised By</th>
          <th className="p-2 border">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((grievance, index) => (
          <tr key={grievance.id} className="text-center ">
            <td className="p-2 border">{index + 1}</td>
            <td className="p-2 border">{grievance.id}</td>
            <td className="p-2 border">{grievance.title}</td>
            <td className="p-2 border">{grievance.raisedBy}</td>
            <td className="p-2 border space-x-2 flex justify-center">
              <Button size="sm" variant="outline">
                <Eye size={16} />
              </Button>
              {type === "new" && (
                <Button size="sm" variant="outline">
                  <Check size={16} />
                </Button>
              )}
              {type === "active" && (
                <>
                  <Button size="sm" variant="outline">
                    <Forward size={16} />
                  </Button>
                  <Button size="sm" variant="outline">
                    <X size={16} />
                  </Button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LevelTable;
