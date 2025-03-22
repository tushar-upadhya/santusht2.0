import GrievanceCard from "@/components/grievance-info/grievance-card/GrievanceCard";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

interface Location {
    institute: string;
    building: string;
    floor: string;
    landmark?: string;
}

interface Grievance {
    id: number;
    userId: string;
    images?: string[];
    video?: string;
    audio?: string;
    raisedDate: string;
    message: string;
    status: string;
    location?: Location;
    category: string;
    rating?: number;
}

const GrievancePage: React.FC = () => {
    const { userId } = useParams<{ userId: string }>();
    const [grievances, setGrievances] = useState<Grievance[]>([]);

    useEffect(() => {
        try {
            const storedGrievances = JSON.parse(
                localStorage.getItem("grievances") || "[]"
            );
            if (!Array.isArray(storedGrievances))
                throw new Error("Invalid data");
            setGrievances(storedGrievances);
        } catch (error) {
            console.error("Error loading grievances:", error);
            toast.error("Failed to load grievances. Data may be corrupted.");
            setGrievances([]);
        }
    }, [userId]); // Re-run if userId changes

    const userGrievances = grievances.filter(
        (grievance) => grievance.userId === userId
    );

    const handleRate = (id: number, newRating: number) => {
        const updatedGrievances = grievances.map((grievance) =>
            grievance.id === id
                ? { ...grievance, rating: newRating }
                : grievance
        );
        setGrievances(updatedGrievances);
        try {
            localStorage.setItem(
                "grievances",
                JSON.stringify(updatedGrievances)
            );
        } catch (error) {
            console.error("Error saving rating:", error);
            toast.error("Failed to save rating.");
        }
    };

    const handleReopen = (id: number) => {
        const updatedGrievances = grievances.map((grievance) =>
            grievance.id === id
                ? { ...grievance, status: "in-progress" }
                : grievance
        );
        setGrievances(updatedGrievances);
        try {
            localStorage.setItem(
                "grievances",
                JSON.stringify(updatedGrievances)
            );
            toast.success(`Grievance #${id} reopened!`);
        } catch (error) {
            console.error("Error reopening grievance:", error);
            toast.error("Failed to reopen grievance.");
        }
    };

    if (!userId) {
        return (
            <p className="text-center text-red-500 py-10">Invalid user ID.</p>
        );
    }

    return (
        <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-full sm:max-w-3xl md:max-w-4xl mx-auto  min-h-screen">
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
