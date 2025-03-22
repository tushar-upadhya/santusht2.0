import { ClipboardCheck, Clock, HeartPulse, MailCheck } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

const features = [
    {
        icon: <HeartPulse className="w-8 h-8 text-green-400" />,
        title: "Patient Care",
        description:
            "Committed to excellence, we prioritize your well-being with compassionate, personalized care.",
    },
    {
        icon: <MailCheck className="w-8 h-8 text-green-400" />,
        title: "Solve Grievances",
        description:
            "Swiftly resolving concerns, ensuring satisfaction, and fostering positive experiences for all.",
    },
    {
        icon: <ClipboardCheck className="w-8 h-8 text-green-400" />,
        title: "Accept Feedbacks",
        description:
            "Welcome your feedback; it shapes our commitment to continuous improvement",
    },
    {
        icon: <Clock className="w-8 h-8 text-green-400" />,
        title: "24*7 Available",
        description:
            "Accessible round-the-clock for your convenience, ensuring continuous support and assistance.",
    },
];

const Cards: React.FC = () => {
    return (
        <div className="py-12 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Heading */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-8 text-green-500">
                    Our Key Features
                    <Separator className="bg-gray-300 dark:bg-gray-600 mx-auto mt-2 w-20 sm:w-24 h-[2px]" />
                </h2>

                {/* Responsive Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 flex flex-col items-center text-center "
                        >
                            <CardHeader className="flex flex-col items-center gap-3">
                                {feature.icon}
                                <CardTitle className="text-base sm:text-lg lg:text-xl text-gray-800 dark:text-gray-200 font-semibold">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cards;
