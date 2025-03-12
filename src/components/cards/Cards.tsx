import { ClipboardCheck, Clock, HeartPulse, MailCheck } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

const features = [
    {
        icon: <HeartPulse className="w-8 h-8 text-primary" />,
        title: "Patient Care",
        description:
            "Committed to excellence, we prioritize your well-being with compassionate, personalized care.",
    },
    {
        icon: <MailCheck className="w-8 h-8 text-primary" />,
        title: "Solve Grievances",
        description:
            "Swiftly resolving concerns, ensuring satisfaction, and fostering positive experiences for all.",
    },
    {
        icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
        title: "Accept Feedbacks",
        description:
            "Welcome your feedback; it shapes our commitment to continuous improvement",
    },
    {
        icon: <Clock className="w-8 h-8 text-primary" />,
        title: "24*7 Available",
        description:
            "Accessible round-the-clock for your convenience, ensuring continuous support and assistance.",
    },
];

const Cards: React.FC = () => {
    return (
        <div className="py-12">
            <div className="container mx-auto text-center px-4 capitalize">
                <h2 className="text-[min(6vw,1.5rem)]  font-bold text-center mb-8 text-foreground text-green-500">
                    Our Key Features
                    <Separator className="bg-gray-300  mx-auto mt-2 w-24 h-[2px]" />
                </h2>
                {/* Responsive Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className=" ">
                            <CardHeader className="flex items-center gap-3">
                                {feature.icon}
                                <CardTitle className="text-[min(4vw,1rem)] leading-relaxed  text-foreground">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-[min(4vw,1rem)] leading-relaxed ">
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
