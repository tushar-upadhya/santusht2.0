import { Dialog, DialogContent, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface Grievance {
  id: number;
  title: string;
  raisedBy: string;
  location: string;
  description: string;
  dateTime: string;
  attachedFiles?: { type: "photo" | "video" | "audio"; url: string }[];
}

interface ViewGrievanceModalProps {
  grievance: Grievance;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (grievanceId: number) => void; // Function to move grievance to active
}

const ViewGrievanceModal: React.FC<ViewGrievanceModalProps> = ({ grievance, isOpen, onClose, onAccept }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <DialogHeader className="text-lg font-semibold">{grievance.title}</DialogHeader>

        {/* Grievance Details */}
        <div className="space-y-4 text-black">
          <p><strong>Grievance No:</strong> {grievance.id}</p>
          <p><strong>Raised By:</strong> {grievance.raisedBy}</p>
          <p><strong>Date & Time:</strong> {grievance.dateTime}</p>
          <p><strong>Location:</strong> {grievance.location}</p>
          <p><strong>Description:</strong> {grievance.description}</p>

          {/* Media Files Section */}
          {grievance.attachedFiles && grievance.attachedFiles.length > 0 && (
            <div className="space-y-2">
              <strong>Attachments:</strong>
              <div className="grid grid-cols-3 gap-2"> {/* Media Grid Layout */}
                {grievance.attachedFiles.map((file, index) => (
                  <div key={index} className="border p-2 rounded flex items-center justify-center">
                    {file.type === "photo" && (
                      <img src={file.url} alt="Photo" className="h-20 w-20 object-cover rounded" />
                    )}
                    {file.type === "video" && (
                      <video src={file.url} className="h-20 w-20 rounded" controls />
                    )}
                    {file.type === "audio" && (
                      <audio src={file.url} controls className="w-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Accept Button */}
        <DialogFooter className="flex justify-end">
          <Button variant="default" onClick={() => onAccept(grievance.id)}>Accept</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewGrievanceModal;
