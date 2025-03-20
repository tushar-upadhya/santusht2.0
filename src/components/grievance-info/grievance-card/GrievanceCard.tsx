import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight, Star } from "lucide-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../progress-bar/ProgressBar";

interface Location {
    institute?: string;
    building?: string;
    floor?: string;
}

interface Grievance {
    id: number;
    image?: string;
    video?: string;
    audio?: string;
    raisedDate: string;
    message: string;
    status: string;
    location?: Location;
}

interface GrievanceCardProps {
    grievance: Grievance;
}

const GrievanceCard: React.FC<GrievanceCardProps> = ({ grievance }) => {
    const { id, image, video, audio, raisedDate, message, status, location } =
        grievance;
    const navigate = useNavigate();

    let mediaContent: ReactNode | null = null;
    if (image) {
        mediaContent = (
            <img
                src={image}
                alt="Grievance"
                className="w-full h-32 sm:h-40 object-cover rounded-lg"
            />
        );
    } else if (video) {
        mediaContent = (
            <video className="w-full h-32 sm:h-40 rounded-lg" controls>
                <source src={video} type="video/mp4" />
            </video>
        );
    } else if (audio) {
        mediaContent = (
            <audio controls className="w-full">
                <source src={audio} type="audio/mpeg" />
            </audio>
        );
    }

    return (
        <Card className="p-3 sm:p-4 shadow-md rounded-lg flex flex-col sm:flex-row gap-4 w-full max-w-lg sm:max-w-2xl mx-auto relative">
            {/* Media Section */}
            {mediaContent && (
                <div className="w-full sm:w-1/3">{mediaContent}</div>
            )}

            {/* Right Content */}
            <div className="flex-1 space-y-2">
                {/* Grievance ID & Raised Date */}
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Grievance ID: {id}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    Raised on {raisedDate}
                </p>

                {/* Location */}
                {location && (
                    <p className="text-xs sm:text-sm text-gray-600">
                        <span className="font-medium">Location:</span>{" "}
                        {location?.institute || "N/A"},{" "}
                        {location?.building || "N/A"},{" "}
                        {location?.floor || "N/A"}
                    </p>
                )}

                {/* Grievance Message */}
                <p className="text-sm sm:text-base font-medium">{message}</p>

                {/* Temporary Closed */}
                {status === "temp-closed" && (
                    <div className="flex items-center justify-between">
                        <p className="text-yellow-600 font-medium text-xs sm:text-sm">
                            Temporarily Closed
                        </p>
                        <Button size="sm" className="text-xs sm:text-sm">
                            Reopen
                        </Button>
                    </div>
                )}

                {/* Progress Bar */}
                <ProgressBar status={status} />

                {/* Ratings (Only for Closed status) */}
                {status === "closed" && (
                    <div className="mt-2">
                        <p className="text-sm font-medium">Rate our service</p>
                        <div className="flex items-center space-x-1 text-yellow-500">
                            {[...Array(5)].map((_, index) => (
                                <Star
                                    key={index}
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                    fill="currentColor"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Navigate to DetailsInfo Component */}
            <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                onClick={() => navigate(`/grievance/${id}`)}
            >
                <ChevronRight size={24} />
            </button>
        </Card>
    );
};

export default GrievanceCard;
