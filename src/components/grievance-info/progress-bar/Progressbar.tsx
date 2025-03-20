import { Smile } from "lucide-react";

interface ProgressBarProps {
    status: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ status }) => {
    // Standardizing status to lowercase
    const normalizedStatus = status.toLowerCase();

    const steps: string[] = [
        "raised",
        "received",
        "in-progress",
        "temp-closed",
        "closed",
    ];
    const statusIndex: number = steps.indexOf(normalizedStatus);

    return (
        <div className="flex justify-between items-center mt-4">
            {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                    {/* Progress Step Circles */}
                    <div
                        className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold
            ${
                index < statusIndex
                    ? "bg-green-500"
                    : index === statusIndex
                    ? "bg-yellow-500"
                    : "bg-gray-300"
            }`}
                    >
                        {step === "closed" && index === statusIndex ? (
                            <Smile className="w-5 h-5" />
                        ) : (
                            index + 1
                        )}
                    </div>
                    {/* Step Labels */}
                    <p className="text-xs sm:text-sm mt-1">
                        {step.replace("-", " ")}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
