import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
    AlertCircle, // For "Temp Closed"
    Check,
    CheckCircle, // For "Received"
    Clock,
    Image as ImageIcon, // For "Raised"
    Mail,
    Music, // For "In Progress"
    PauseCircle,
    Star,
    Video,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { toast } from "sonner";

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
    rating?: number;
}

interface GrievanceCardProps {
    grievance: Grievance;
    onRate: (id: number, rating: number) => void;
    onReopen?: (id: number) => void;
}

const GrievanceCard: React.FC<GrievanceCardProps> = ({
    grievance,
    onRate,
    onReopen,
}) => {
    const {
        id,
        image,
        video,
        audio,
        raisedDate,
        message,
        status,
        location,
        rating = 0,
    } = grievance;
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
    const [isAudioDialogOpen, setIsAudioDialogOpen] = useState(false);
    const [tempRating, setTempRating] = useState(rating);

    const imageContent: ReactNode = image ? (
        <img
            src={image}
            alt="Grievance"
            className="w-full max-h-[200px] sm:max-h-[300px] md:max-h-[400px] object-contain rounded-lg"
            onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
        />
    ) : null;

    const videoContent: ReactNode = video ? (
        <video
            className="w-full max-h-[200px] sm:max-h-[300px] md:max-h-[400px] rounded-lg"
            controls
        >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    ) : null;

    const audioContent: ReactNode = audio ? (
        <audio controls className="w-full">
            <source src={audio} type="audio/mpeg" />
            Your browser does not support the audio tag.
        </audio>
    ) : null;

    let cardMediaContent: ReactNode | null = null;
    if (image) {
        cardMediaContent = (
            <div className="relative">
                <img
                    src={image}
                    alt="Grievance"
                    className="w-full h-20 sm:h-24 md:h-28 object-cover rounded-md border border-gray-200"
                    onError={(e) =>
                        (e.currentTarget.src = "/fallback-image.jpg")
                    }
                />
                {(video || audio) && (
                    <div className="absolute bottom-1 right-1 flex gap-1">
                        {video && <Video className="w-4 h-4 text-[#FA7275]" />}
                        {audio && <Music className="w-4 h-4 text-[#FA7275]" />}
                    </div>
                )}
            </div>
        );
    } else if (video) {
        cardMediaContent = (
            <video
                className="w-full h-20 sm:h-24 md:h-28 rounded-md border border-gray-200"
                controls
            >
                <source src={video} type="video/mp4" />
            </video>
        );
    } else if (audio) {
        cardMediaContent = (
            <div className="w-full flex items-center justify-center h-20 sm:h-24 md:h-28 bg-gray-100 rounded-md border border-gray-200">
                <Music className="w-6 h-6 sm:w-8 sm:h-8 text-[#FA7275]" />
            </div>
        );
    }

    const trackingSteps = [
        {
            label: "Raised",
            date: raisedDate,
            completed: true,
            icon: <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
        },
        {
            label: "Received",
            date: status !== "raised" ? "2025-03-19" : null,
            completed: status !== "raised",
            icon: <Mail className="w-4 h-4 sm:w-5 sm:h-5" />,
        },
        {
            label: "In Progress",
            date: ["in-progress", "temp-closed", "closed"].includes(status)
                ? "2025-03-20"
                : null,
            completed: ["in-progress", "temp-closed", "closed"].includes(
                status
            ),
            icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
        },
        {
            label: "Temp Closed",
            date: status === "temp-closed" ? "2025-03-21" : null,
            completed: status === "temp-closed",
            icon: (
                <PauseCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
            ),
        },
        {
            label: "Close",
            date: status === "closed" ? "2025-03-22" : null,
            completed: status === "closed",
            icon: <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />,
        },
    ];

    const handleRatingClick = (newRating: number) => {
        setTempRating(newRating);
        onRate(id, newRating);
        toast.success(
            `Rated Grievance #${id} with ${newRating} star${
                newRating !== 1 ? "s" : ""
            }!`,
            {
                description: "Thank you for your feedback.",
            }
        );
    };

    const handleReopen = () => {
        if (onReopen) onReopen(id);
    };

    const statusStyles = {
        raised: "bg-blue-100 text-blue-800",
        "in-progress": "bg-yellow-100 text-yellow-800",
        "temp-closed": "bg-orange-100 text-orange-800",
        closed: "bg-green-100 text-green-800",
    };

    return (
        <Card className="p-3 sm:p-4 md:p-5 bg-white border border-gray-100 relative w-full">
            <span
                className={`absolute top-2 right-2 text-xs sm:text-sm font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 animate-pulse rounded-md capitalize ${
                    statusStyles[status as keyof typeof statusStyles] ||
                    "bg-gray-100 text-gray-800"
                }`}
            >
                {status}
            </span>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <div
                        className="flex flex-col sm:flex-row gap-3 sm:gap-4 cursor-pointer pt-8 sm:pt-6"
                        onClick={() => setIsDialogOpen(true)}
                    >
                        {cardMediaContent && (
                            <div className="w-full sm:w-1/3 md:w-1/4 flex-shrink-0">
                                {cardMediaContent}
                            </div>
                        )}
                        <div className="flex-1 space-y-2 sm:space-y-3">
                            <div className="flex justify-between items-start sm:items-center">
                                <div>
                                    <p className="text-xs sm:text-sm md:text-base text-gray-700 font-semibold">
                                        Grievance #{id}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {raisedDate}
                                    </p>
                                </div>
                            </div>
                            {location && (
                                <p className="text-xs sm:text-sm text-gray-600">
                                    <span className="font-medium">
                                        Location:
                                    </span>{" "}
                                    {location.institute || "N/A"},{" "}
                                    {location.building || "N/A"},{" "}
                                    {location.floor || "N/A"}
                                </p>
                            )}
                            <p className="text-sm sm:text-base md:text-lg font-medium text-gray-900 break-words line-clamp-3">
                                {message}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-2 sm:gap-3">
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <p className="text-xs sm:text-sm text-gray-600">
                                        Rate:
                                    </p>
                                    <div className="flex items-center space-x-1">
                                        {[...Array(5)].map((_, index) => (
                                            <Star
                                                key={index}
                                                className={`w-3 h-3 sm:w-4 sm:h-4 cursor-pointer transition-colors ${
                                                    index < tempRating
                                                        ? "fill-yellow-500 text-yellow-500"
                                                        : "fill-gray-200 text-gray-200 hover:text-yellow-400"
                                                }`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRatingClick(
                                                        index + 1
                                                    );
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                {status === "temp-closed" && (
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="text-white hover:text-[#FA7275]  border-[#FA7275] bg-[#FA7275] hover:bg-[#FA7275]/80 w-full sm:w-auto text-xs sm:text-sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleReopen();
                                        }}
                                    >
                                        Reopen Grievance
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="w-[95vw] sm:max-w-[450px] md:max-w-[500px] bg-white rounded-xl shadow-lg p-0 border border-gray-100">
                    <DialogHeader className="p-3 sm:p-4 border-b border-gray-100 bg-gray-50">
                        <div className="flex justify-between items-center w-full">
                            <DialogTitle className="text-base sm:text-lg font-semibold text-gray-900">
                                Grievance #{id}
                            </DialogTitle>
                            <span
                                className={`text-xs sm:text-sm font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 animate-pulse rounded-md capitalize ${
                                    statusStyles[
                                        status as keyof typeof statusStyles
                                    ] || "bg-gray-100 text-gray-800"
                                }`}
                            >
                                {status}
                            </span>
                        </div>
                    </DialogHeader>
                    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                        <div className="relative">
                            <div className="space-y-4 sm:space-y-6">
                                {trackingSteps.map((step, index) => (
                                    <div
                                        key={index}
                                        className="flex items-start relative"
                                    >
                                        <motion.div
                                            className="flex-shrink-0"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                delay: index * 0.2,
                                                type: "spring",
                                                stiffness: 200,
                                                damping: 10,
                                            }}
                                        >
                                            <div
                                                className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full flex items-center justify-center ${
                                                    step.completed
                                                        ? step.label ===
                                                          "Temp Closed"
                                                            ? "bg-orange-500"
                                                            : "bg-green-500"
                                                        : "bg-gray-300"
                                                }`}
                                            >
                                                {step.completed && (
                                                    <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                                                )}
                                            </div>
                                        </motion.div>
                                        {index < trackingSteps.length - 1 && (
                                            <motion.div
                                                className={`absolute top-3 sm:top-4 left-1 sm:left-1.5 w-0.5 border-l-2 border-dashed ${
                                                    step.completed
                                                        ? step.label ===
                                                          "Temp Closed"
                                                            ? "border-orange-500"
                                                            : "border-green-500"
                                                        : "border-gray-300"
                                                }`}
                                                initial={{ height: 0 }}
                                                animate={{
                                                    height: step.completed
                                                        ? "1.5rem"
                                                        : "0",
                                                }}
                                                transition={{
                                                    delay: index * 0.2 + 0.1,
                                                    duration: 0.5,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        )}
                                        <motion.div
                                            className="ml-3 sm:ml-4"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{
                                                delay: index * 0.2,
                                                duration: 0.3,
                                            }}
                                        >
                                            <p
                                                className={`text-xs sm:text-sm font-medium flex gap-2 items-center ${
                                                    step.completed
                                                        ? step.label ===
                                                          "Temp Closed"
                                                            ? "text-orange-600"
                                                            : "text-green-600"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {step.icon}
                                                {step.label}
                                            </p>
                                            {step.date && (
                                                <p className="text-xs text-gray-500">
                                                    {step.date}
                                                </p>
                                            )}
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <span className="text-xs sm:text-sm font-normal text-slate-700">
                                    Message
                                </span>
                                <p className="text-xs sm:text-sm text-slate-700 font-semibold bg-[#FA7275]/20 p-2 sm:p-3 rounded-md mt-1 break-words">
                                    {message}
                                </p>
                            </div>
                            {location && (
                                <div>
                                    <span className="text-xs sm:text-sm font-normal text-slate-700">
                                        Location
                                    </span>
                                    <p className="text-xs sm:text-sm text-slate-700 font-semibold bg-[#FA7275]/20 p-2 sm:p-3 rounded-md mt-1">
                                        {location.institute || "N/A"},{" "}
                                        {location.building || "N/A"},{" "}
                                        {location.floor || "N/A"}
                                    </p>
                                </div>
                            )}
                            {(image || video || audio) && (
                                <div>
                                    <span className="text-xs sm:text-sm font-normal text-slate-700">
                                        Media
                                    </span>
                                    <div className="flex flex-col sm:flex-row gap-2 mt-1">
                                        {image && (
                                            <Dialog
                                                open={isImageDialogOpen}
                                                onOpenChange={
                                                    setIsImageDialogOpen
                                                }
                                            >
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex items-center gap-2 text-[#FA7275] border-[#FA7275] hover:bg-[#FA7275]/80 text-xs sm:text-sm"
                                                        onClick={() =>
                                                            setIsImageDialogOpen(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#FA7275]" />
                                                        <span>View Image</span>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="w-[95vw] sm:max-w-[500px] md:max-w-[600px] bg-white rounded-xl shadow-lg p-3 sm:p-4 border border-gray-100">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-base sm:text-lg font-semibold text-gray-900">
                                                            Image for Grievance
                                                            #{id}
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    <div className="mt-3 sm:mt-4">
                                                        {imageContent}
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                        {video && (
                                            <Dialog
                                                open={isVideoDialogOpen}
                                                onOpenChange={
                                                    setIsVideoDialogOpen
                                                }
                                            >
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex items-center gap-2 text-[#FA7275] border-[#FA7275] hover:bg-[#FA7275]/80 text-xs sm:text-sm"
                                                        onClick={() =>
                                                            setIsVideoDialogOpen(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        <Video className="w-4 h-4 sm:w-5 sm:h-5 text-[#FA7275]" />
                                                        <span>View Video</span>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="w-[95vw] sm:max-w-[500px] md:max-w-[600px] bg-white rounded-xl shadow-lg p-3 sm:p-4 border border-gray-100">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-base sm:text-lg font-semibold text-gray-900">
                                                            Video for Grievance
                                                            #{id}
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    <div className="mt-3 sm:mt-4">
                                                        {videoContent}
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                        {audio && (
                                            <Dialog
                                                open={isAudioDialogOpen}
                                                onOpenChange={
                                                    setIsAudioDialogOpen
                                                }
                                            >
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="flex items-center gap-2 text-[#FA7275] border-[#FA7275] hover:bg-[#FA7275]/80 text-xs sm:text-sm"
                                                        onClick={() =>
                                                            setIsAudioDialogOpen(
                                                                true
                                                            )
                                                        }
                                                    >
                                                        <Music className="w-4 h-4 sm:w-5 sm:h-5 text-[#FA7275]" />
                                                        <span>View Audio</span>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="w-[95vw] sm:max-w-[500px] md:max-w-[600px] bg-white rounded-xl shadow-lg p-3 sm:p-4 border border-gray-100">
                                                    <DialogHeader>
                                                        <DialogTitle className="text-base sm:text-lg font-semibold text-gray-900">
                                                            Audio for Grievance
                                                            #{id}
                                                        </DialogTitle>
                                                    </DialogHeader>
                                                    <div className="mt-3 sm:mt-4">
                                                        {audioContent}
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        )}
                                    </div>
                                </div>
                            )}
                            {status === "temp-closed" && (
                                <Button
                                    size="sm"
                                    className="bg-[#FA7275] hover:bg-[#FA7275]/80 cursor-pointer text-white w-full text-xs sm:text-sm"
                                    onClick={handleReopen}
                                >
                                    Reopen Grievance
                                </Button>
                            )}
                            <div>
                                <span className="text-xs sm:text-sm font-medium text-gray-900">
                                    Rate our service
                                </span>
                                <div className="flex items-center space-x-1 mt-1">
                                    {[...Array(5)].map((_, index) => (
                                        <Star
                                            key={index}
                                            className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer transition-colors ${
                                                index < tempRating
                                                    ? "fill-yellow-500 text-yellow-500"
                                                    : "fill-gray-200 text-gray-200 hover:text-yellow-400"
                                            }`}
                                            onClick={() =>
                                                handleRatingClick(index + 1)
                                            }
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default GrievanceCard;
