import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const ForwardGrievanceModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const dummyGrievance = {
    id: 8788578,
    title: "Security Misbehavior",
    raisedBy: "Rohit Kumar",
    dateTime: "12/04/2025 07:45 AM",
  };

  const departments = ["Upper Level", "Civil", "Security", "Sanitization", "Electrical", "Doctor Concern"];
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

  const handleCheckboxChange = (department: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(department) ? prev.filter((item) => item !== department) : [...prev, department]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader className="text-lg font-semibold">{dummyGrievance.title}</DialogHeader>

        {/* Grievance Details */}
        <div className="space-y-4 text-black">
          <p><strong>Grievance No:</strong> {dummyGrievance.id}</p>
          <p><strong>Raised By:</strong> {dummyGrievance.raisedBy}</p>
          <p><strong>Date & Time:</strong> {dummyGrievance.dateTime}</p>
        </div>

        {/* Forward To Section */}
        <div className="mt-4">
          <strong>Forward To:</strong>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {departments.map((dept) => (
              <label key={dept} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedDepartments.includes(dept)}
                  onCheckedChange={() => handleCheckboxChange(dept)}
                />
                <span>{dept}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer with Forward Button */}
        <DialogFooter className="flex justify-end">
          <Button variant="default" onClick={() => console.log("Forwarding to:", selectedDepartments)}>
            Forward
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForwardGrievanceModal;
