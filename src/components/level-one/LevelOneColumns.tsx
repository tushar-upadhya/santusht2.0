import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnDef } from "@tanstack/react-table";
import {
    Eye,
    Fingerprint,
    Forward,
    Image as ImageIcon,
    Music,
    Trash,
    Video,
} from "lucide-react";
import { ReactNode, useState } from "react";

export type Employee = {
    serialNumber: number;
    refNo: string;
    location: string;
    description: string;
    lastUpdate: string;
    images?: string[];
    video?: string;
    audio?: string;
};

export const LevelOneColumns = (activeTab: string): ColumnDef<Employee>[] => [
    {
        accessorKey: "serialNumber",
        header: () => <div className="text-left">S.No</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.index + 1}
            </div>
        ),
    },
    {
        accessorKey: "refNo",
        header: () => <div className="text-left">Ref No</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("refNo")}
            </div>
        ),
    },
    {
        accessorKey: "location",
        header: () => <div className="text-left">Location</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("location")}
            </div>
        ),
    },
    {
        accessorKey: "description",
        header: () => <div className="text-left">Description</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("description")}
            </div>
        ),
    },
    {
        accessorKey: "lastUpdate",
        header: () => <div className="text-left">Last Update</div>,
        cell: ({ row }) => (
            <div className="text-left text-[min(4vw,1rem)] leading-relaxed truncate">
                {row.getValue("lastUpdate")}
            </div>
        ),
    },
    {
        accessorKey: "action",
        header: () => <div className="text-left">Action</div>,
        cell: ({ row }) => (
            <ActionButtons employee={row.original} activeTab={activeTab} />
        ),
    },
];

const ActionButtons = ({
    employee,
    activeTab,
}: {
    employee: Employee;
    activeTab: string;
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
    const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false);
    const [isAudioDialogOpen, setIsAudioDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState("");

    const handleView = () => {
        setDialogTitle(`Details of ${employee.refNo}`);
        setIsDialogOpen(true);
    };

    const handleForward = () => {
        console.log(`Forwarding ${employee.refNo}`);
    };

    const handleClose = () => {
        console.log(`Closing ${employee.refNo}`);
    };

    const handleAssign = () => {
        console.log(`Assigning ${employee.refNo}`);
        // Add your assignment logic here (e.g., API call)
    };

    const statusStyles = {
        new: "bg-blue-100 text-blue-800",
        active: "bg-yellow-100 text-yellow-800",
        closed: "bg-green-100 text-green-800",
    };

    // Media content definitions
    const imageContent: ReactNode =
        employee.images && employee.images.length > 0 ? (
            <div className="space-y-3">
                {employee.images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Grievance #${employee.refNo} - Image ${idx + 1}`}
                        className="w-full h-auto max-h-[40vh] rounded-md object-contain border border-gray-300"
                        onError={(e) =>
                            (e.currentTarget.src = "/fallback-image.jpg")
                        }
                    />
                ))}
            </div>
        ) : null;

    const videoContent: ReactNode = employee.video ? (
        <video
            className="w-full h-auto max-h-[40vh] rounded-md border border-gray-300"
            controls
        >
            <source src={employee.video} type="video/webm" />
            Your browser does not support the video tag.
        </video>
    ) : null;

    const audioContent: ReactNode = employee.audio ? (
        <audio controls className="w-full">
            <source src={employee.audio} type="audio/webm" />
            Your browser does not support the audio tag.
        </audio>
    ) : null;

    return (
        <>
            <div className="flex items-center gap-2">
                <Button
                    size="icon"
                    variant="outline"
                    onClick={handleView}
                    className="border-none text-gray-900 cursor-pointer dark:text-white dark:bg-gray-800 hover:dark:bg-gray-700"
                >
                    <Eye className="w-4 h-4" />
                </Button>

                {activeTab === "active" && (
                    <>
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={handleForward}
                            className="border-none text-gray-900 cursor-pointer dark:text-white dark:bg-gray-800 hover:dark:bg-gray-700"
                        >
                            <Forward className="w-4 h-4" />
                        </Button>
                        <Button
                            size="icon"
                            variant="destructive"
                            onClick={handleClose}
                            className="border-none text-gray-900 cursor-pointer dark:text-white dark:bg-gray-800 hover:dark:bg-gray-700"
                        >
                            <Trash className="w-4 h-4" />
                        </Button>
                    </>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="w-[95vw] sm:max-w-[450px] md:max-w-[500px] bg-white rounded-md p-0 border border-gray-300 shadow-md">
                    <DialogHeader className="p-3 sm:p-4 border-b border-gray-300 bg-gray-50">
                        <div className="flex sm:justify-between items-center w-full mt-4">
                            <DialogTitle className="text-sm sm:text-base font-semibold text-gray-700">
                                {dialogTitle}
                            </DialogTitle>
                            <span
                                className={`text-xs sm:text-sm font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 animate-pulse rounded-md capitalize ${
                                    statusStyles[
                                        activeTab as keyof typeof statusStyles
                                    ] || "bg-gray-100 text-gray-800"
                                }`}
                            >
                                {activeTab}
                            </span>
                        </div>
                    </DialogHeader>
                    <ScrollArea className="max-h-[70vh] p-4 sm:p-6 space-y-4 sm:space-y-6">
                        <div className="space-y-3 sm:space-y-4">
                            <div>
                                <span className="text-xs sm:text-sm font-normal text-gray-700">
                                    Location
                                </span>
                                <p className="text-xs sm:text-sm text-gray-700 font-semibold bg-[#FA7275]/20 p-2 sm:p-3 rounded-md mt-1">
                                    {employee.location}
                                </p>
                            </div>
                            <div>
                                <span className="text-xs sm:text-sm font-normal text-gray-700">
                                    Description
                                </span>
                                <p className="text-xs sm:text-sm text-gray-700 font-semibold bg-[#FA7275]/20 p-2 sm:p-3 rounded-md mt-1 break-words">
                                    {employee.description}
                                </p>
                            </div>
                            <div>
                                <span className="text-xs sm:text-sm font-normal text-gray-700">
                                    Last Update
                                </span>
                                <p className="text-xs sm:text-sm text-gray-700 font-semibold bg-[#FA7275]/20 p-2 sm:p-3 rounded-md mt-1">
                                    {employee.lastUpdate}
                                </p>
                            </div>
                            {/* Show media only for 'new' and 'active' tabs */}
                            {(activeTab === "new" || activeTab === "active") &&
                                (employee.images ||
                                    employee.video ||
                                    employee.audio) && (
                                    <div>
                                        <span className="text-xs sm:text-sm font-normal text-gray-700">
                                            Media
                                        </span>
                                        <div className="flex flex-col sm:flex-row gap-2 mt-1">
                                            {employee.images &&
                                                employee.images.length > 0 && (
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
                                                                className="flex cursor-pointer items-center gap-2 border-[#FA7275] text-[#FA7275] hover:bg-[#FA7275] hover:text-white transition-all duration-300 text-xs sm:text-sm h-9 rounded-md"
                                                            >
                                                                <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                                                                <span>
                                                                    View Images
                                                                </span>
                                                            </Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="w-[95vw] max-w-[425px] sm:max-w-[500px] md:max-w-[600px] bg-white rounded-md p-4 border border-gray-300 shadow-md">
                                                            <DialogHeader>
                                                                <DialogTitle className="text-sm sm:text-base font-semibold text-gray-700">
                                                                    Images for
                                                                    Grievance #
                                                                    {
                                                                        employee.refNo
                                                                    }
                                                                </DialogTitle>
                                                            </DialogHeader>
                                                            <ScrollArea className="max-h-[60vh] mt-3">
                                                                {imageContent}
                                                            </ScrollArea>
                                                        </DialogContent>
                                                    </Dialog>
                                                )}
                                            {employee.video && (
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
                                                            className="flex cursor-pointer items-center gap-2 border-[#FA7275] text-[#FA7275] hover:bg-[#FA7275] hover:text-white transition-all duration-300 text-xs sm:text-sm h-9 rounded-md"
                                                        >
                                                            <Video className="w-4 h-4 sm:w-5 sm:h-5" />
                                                            <span>
                                                                View Video
                                                            </span>
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="w-[95vw] max-w-[425px] sm:max-w-[500px] md:max-w-[600px] bg-white rounded-md p-4 border border-gray-300 shadow-md">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-sm sm:text-base font-semibold text-gray-700">
                                                                Video for
                                                                Grievance #
                                                                {employee.refNo}
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <div className="mt-3">
                                                            {videoContent}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            )}
                                            {employee.audio && (
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
                                                            className="flex items-center gap-2 border-[#FA7275] text-[#FA7275] cursor-pointer hover:bg-[#FA7275] hover:text-white transition-all duration-300 text-xs sm:text-sm h-9 rounded-md"
                                                        >
                                                            <Music className="w-4 h-4 sm:w-5 sm:h-5" />
                                                            <span>
                                                                View Audio
                                                            </span>
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="w-[95vw] max-w-[425px] sm:max-w-[500px] md:max-w-[600px] bg-white rounded-md p-4 border border-gray-300 shadow-md">
                                                        <DialogHeader>
                                                            <DialogTitle className="text-sm sm:text-base font-semibold text-gray-700">
                                                                Audio for
                                                                Grievance #
                                                                {employee.refNo}
                                                            </DialogTitle>
                                                        </DialogHeader>
                                                        <div className="mt-3">
                                                            {audioContent}
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            )}
                                        </div>
                                    </div>
                                )}
                        </div>
                        {activeTab === "new" && (
                            <Button
                                size="sm"
                                className="bg-[#FA7275] hover:bg-[#FA7275]/80 cursor-pointer text-white w-full sm:w-auto text-xs sm:text-sm h-9 rounded-md mt-4"
                                onClick={handleAssign}
                            >
                                <Fingerprint className="w-4 h-4 mr-2" />
                                Accept
                            </Button>
                        )}
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default ActionButtons;
