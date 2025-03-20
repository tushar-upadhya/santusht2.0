import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import ProgressBar from "./progress-bar/ProgressBar";


const GrievanceDetail = ({ grievances }) => {
  const { id } = useParams();
  const grievance = grievances.find((g) => g.id.toString() === id);

  if (!grievance) {
    return <p className="text-center text-red-500">Grievance not found.</p>;
  }

  const { image, video, audio, message, status, levels } = grievance;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      {/* Grievance Card */}
      <Card className="p-4 shadow-md rounded-lg">
        <p className="text-xs sm:text-sm text-gray-500 font-medium">
          Grievance ID: {id}
        </p>
        <p className="text-sm sm:text-base font-medium">{message}</p>

        {/* Media Content */}
        <div className="flex gap-4 mt-4">
          {image && <img src={image} alt="Grievance" className="w-24 h-24 rounded-lg" />}
          {video && (
            <video className="w-24 h-24 rounded-lg" controls>
              <source src={video} type="video/mp4" />
            </video>
          )}
          {audio && (
            <audio controls className="w-full">
              <source src={audio} type="audio/mpeg" />
            </audio>
          )}
        </div>
      </Card>

      {/* Vertical Progress Bar */}
      <ProgressBar levels={levels} status={status} />
    </div>
  );
};

export default GrievanceDetail;
