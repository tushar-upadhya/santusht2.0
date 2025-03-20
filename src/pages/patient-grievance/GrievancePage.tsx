import GrievanceCard from "@/components/grievance-info/grievance-card/GrievanceCard";
import { useState } from "react";
import { useParams } from "react-router-dom";

// Define Location type
interface Location {
    institute: string;
    building: string;
    floor: string;
}

interface Grievance {
    id: number;
    userId: string;
    image?: string;
    video?: string;
    audio?: string;
    raisedDate: string;
    message: string;
    status: string;
    location?: Location;
}

const GrievancePage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();

    const [grievances] = useState<Grievance[]>([
        {
            id: 1,
            userId: "user123",
            image: undefined,
            video: "https://www.example.com/sample-video.mp4",
            audio: undefined,
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
            userId: "user456",
            image: undefined,
            video: "https://www.example.com/sample-video.mp4",
            audio: undefined,
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
            userId: "user123",
            image: undefined,
            video: undefined,
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

    const userGrievances = grievances.filter(
        (grievance) => grievance.userId === userId
    );

    return (
        <div className="p-4 space-y-6 max-w-3xl mx-auto">
            {/* List of Grievance Cards */}
            <div className="space-y-4">
                {userGrievances.length > 0 ? (
                    userGrievances.map((grievance) => (
                        <GrievanceCard
                            key={grievance.id}
                            grievance={grievance}
                        />
                    ))
                ) : (
                    <p>No grievances found for this user.</p>
                )}
            </div>
        </div>
    );
};

export default GrievancePage;
