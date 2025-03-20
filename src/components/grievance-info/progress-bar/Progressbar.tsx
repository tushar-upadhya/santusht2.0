import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface ProgressBarProps {
    status: string;
    raisedDate: string; // Added to match GrievanceCard's trackingSteps
}

const ProgressBar: React.FC<ProgressBarProps> = ({ status, raisedDate }) => {
    // Standardizing status to lowercase
    const normalizedStatus = status.toLowerCase().replace("-", " ");

    // Define tracking steps (same as GrievanceCard)
    const trackingSteps = [
        {
            label: "Raised",
            date: raisedDate,
            completed: true,
        },
        {
            label: "Received",
            date:
                normalizedStatus === "in progress" ||
                normalizedStatus === "temp closed" ||
                normalizedStatus === "closed"
                    ? "2025-03-19"
                    : null,
            completed:
                normalizedStatus === "in progress" ||
                normalizedStatus === "temp closed" ||
                normalizedStatus === "closed",
        },
        {
            label: "In Progress",
            date:
                normalizedStatus === "in progress" ||
                normalizedStatus === "temp closed" ||
                normalizedStatus === "closed"
                    ? "2025-03-20"
                    : null,
            completed:
                normalizedStatus === "in progress" ||
                normalizedStatus === "temp closed" ||
                normalizedStatus === "closed",
        },
        {
            label: "Resolved",
            date: normalizedStatus === "closed" ? "2025-03-22" : null,
            completed: normalizedStatus === "closed",
        },
    ];

    // Calculate progress percentage
    const completedSteps = trackingSteps.filter(
        (step) => step.completed
    ).length;
    const progress = (completedSteps / trackingSteps.length) * 100;

    return (
        <div className="relative">
            <div className="flex justify-between items-center">
                {trackingSteps.map((step, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col items-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            delay: index * 0.1, // Faster delay for ProgressBar
                            duration: 0.3,
                        }}
                    >
                        <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                step.completed
                                    ? "bg-indigo-500 text-white"
                                    : "bg-gray-200 text-gray-500"
                            }`}
                        >
                            {step.completed ? (
                                <CheckCircle className="w-3 h-3" />
                            ) : (
                                <span className="text-xs font-medium">
                                    {index + 1}
                                </span>
                            )}
                        </div>
                        <p className="text-xs font-medium text-gray-700 mt-1">
                            {step.label}
                        </p>
                    </motion.div>
                ))}
            </div>
            <div className="absolute top-3 left-0 right-0 h-1 bg-gray-200 rounded-full -z-10">
                <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut",
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;
