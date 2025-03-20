import GrievanceCard from "@/components/grievance-info/grievance-card/GrievanceCard";
import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

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
    rating?: number;
}

const GrievancePage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();

    const [grievances, setGrievances] = useState<Grievance[]>([
        {
            id: 1,
            userId: "user123",
            image: undefined,
            video: "https://www.example.com/sample-video.mp4",
            audio: "https://www.example.com/sample-audio.mp3",
            raisedDate: "2025-02-18",
            message: "Streetlights are not working properly in my area.",
            status: "temp-closed",
            location: {
                institute: "ABC Institute",
                building: "Main Block",
                floor: "2nd Floor",
            },
            rating: 0,
        },
        {
            id: 8,
            userId: "user123",
            image: undefined,
            video: "https://www.example.com/sample-video.mp4",
            audio: "https://www.example.com/sample-audio.mp3",
            raisedDate: "2025-02-18",
            message: "Streetlights are not working properly in my area.",
            status: "temp-closed",
            location: {
                institute: "ABC Institute",
                building: "Main Block",
                floor: "2nd Floor",
            },
            rating: 0,
        },
        {
            id: 9,
            userId: "user123",
            image: undefined,
            video: "https://www.example.com/sample-video.mp4",
            audio: "https://www.example.com/sample-audio.mp3",
            raisedDate: "2025-02-18",
            message: "Streetlights are not working properly in my area.",
            status: "temp-closed",
            location: {
                institute: "ABC Institute",
                building: "Main Block",
                floor: "2nd Floor",
            },
            rating: 0,
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
            rating: 0,
        },
        {
            id: 3,
            userId: "user123",
            image: undefined,
            video: undefined,
            audio: "https://www.example.com/sample-audio.mp3",
            raisedDate: "2025-02-10",
            message: "Garbage collection is not happening regularly.".repeat(9),
            status: "closed",
            location: {
                institute: "City College",
                building: "Admin Block",
                floor: "1st Floor",
            },
            rating: 4,
        },
    ]);

    const userGrievances = grievances.filter(
        (grievance) => grievance.userId === userId
    );

    const handleRate = (id: number, newRating: number) => {
        setGrievances((prev) =>
            prev.map((grievance) =>
                grievance.id === id
                    ? { ...grievance, rating: newRating }
                    : grievance
            )
        );
    };

    const handleReopen = (id: number) => {
        setGrievances((prev) =>
            prev.map((grievance) =>
                grievance.id === id
                    ? { ...grievance, status: "in-progress" }
                    : grievance
            )
        );
        toast.success(`Grievance #${id} reopened!`);
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-full sm:max-w-3xl md:max-w-4xl mx-auto bg-gray-50 min-h-screen">
            <div className="space-y-6">
                {userGrievances.length > 0 ? (
                    userGrievances.map((grievance, index) => (
                        <motion.div
                            key={grievance.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.3 }}
                            className="w-full"
                        >
                            <GrievanceCard
                                grievance={grievance}
                                onRate={handleRate}
                                onReopen={handleReopen}
                            />
                        </motion.div>
                    ))
                ) : (
                    <p className="text-center text-gray-500 text-base sm:text-lg md:text-xl py-10">
                        No grievances found for this user.
                    </p>
                )}
            </div>
        </div>
    );
};

export default GrievancePage;
