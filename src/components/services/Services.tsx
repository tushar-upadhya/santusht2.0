import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { CheckCircle, MessageSquare, UserPlus, Users } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";

const stats = {
    beneficiaryNo: 12000,
    skilledTeam: 250,
    grievancesResolved: 9800,
    totalFeedback: 5000,
};

const Services: React.FC = () => {
    const statCards = [
        {
            icon: <UserPlus className="w-8 h-8 text-green-400" />,
            number: stats.beneficiaryNo,
            title: "Beneficiaries",
            description:
                "Patients benefited from dedicated care, support, and services.",
        },
        {
            icon: <Users className="w-8 h-8 text-green-400" />,
            number: stats.skilledTeam,
            title: "Skilled Team Members",
            description:
                "Skilled team ensuring optimal care for your well-being always.",
        },
        {
            icon: <CheckCircle className="w-8 h-8 text-green-400" />,
            number: stats.grievancesResolved,
            title: "Grievances Resolved",
            description:
                "Grievances resolved, ensuring satisfaction and trust in our services.",
        },
        {
            icon: <MessageSquare className="w-8 h-8 text-green-400" />,
            number: stats.totalFeedback,
            title: "Total Feedback",
            description:
                "Feedbacks we received till now to improve our patient care services",
        },
    ];

    return (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Heading */}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-8 text-green-500">
                    Services
                </h2>
                <Separator className="bg-gray-300 dark:bg-gray-600 mx-auto mb-6 w-20 sm:w-24 h-[2px]" />

                {/* Responsive Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-none  gap-6 sm:gap-8">
                    {statCards.map((stat, index) => (
                        <Card
                            key={index}
                            className="bg-white dark:bg-gray-800 border-none rounded-lg"
                        >
                            <CardHeader className="flex flex-col items-center gap-3">
                                {stat.icon}
                                <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-gray-200 font-bold">
                                    {stat.number}
                                </CardTitle>
                                <CardDescription className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-semibold">
                                    {stat.title}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {stat.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
