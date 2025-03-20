
import GrievanceCard from "@/components/grievance-info/GrievanceCard";
import { useState } from "react";

const GrievancePage = () => {
  // Sample grievances (Replace with API call)
  const [grievances] = useState([
    {
      id: 1,
      image: null,
      video: "https://www.example.com/sample-video.mp4",
      audio: null,
      raisedDate: "2025-02-18",
      message: "Streetlights are not working properly in my area.",
      status: "temp-closed",
      location: {
        institute: "ABC Institute",
        building: "Main Block",
        floor: "2nd Floor",
      },
    },
    {
      id: 2,
      image: null,
      video: "https://www.example.com/sample-video.mp4",
      audio: null,
      raisedDate: "2025-02-15",
      message: "Road maintenance issue needs urgent attention.",
      status: "in-progress",
      location: {
        institute: "XYZ School",
        building: "Science Wing",
        floor: "Ground Floor",
      },
    },
    {
      id: 3,
      image: null,
      video: null,
      audio: "https://www.example.com/sample-audio.mp3",
      raisedDate: "2025-02-10",
      message: "Garbage collection is not happening regularly.",
      status: "closed",
      location: {
        institute: "City College",
        building: "Admin Block",
        floor: "1st Floor",
      },
    },
  ]);

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      {/* List of Grievance Cards */}
      <div className="space-y-4">
        {grievances.map((grievance) => (
          <GrievanceCard key={grievance.id} grievance={grievance} />
        ))}
      </div>
    </div>
  );
};

export default GrievancePage;
