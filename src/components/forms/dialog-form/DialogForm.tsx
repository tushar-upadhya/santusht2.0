import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface DialogFormProps {
    title: string;
    description?: string;
    formComponent: React.ReactNode;
    buttonLabel: string;
    logo?: React.ReactNode;
    location?: string;
    buttonClassName?: string;
}

const DialogForm = ({
    title,
    description,
    formComponent,
    buttonLabel,
    logo,
    location,
    buttonClassName = "",
}: DialogFormProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className={`px-4 py-2 cursor-pointer  sm:px-6 sm:py-3 bg-[#FA7275] hover:bg-[#FA7275]/80 text-white text-sm sm:text-base font-medium transition-colors duration-300 ${buttonClassName}`}
                >
                    {buttonLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-w-sm sm:max-w-md md:max-w-lg w-full p-6 sm:p-8 rounded-lg shadow-lg">
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        {logo && <div className="w-fit h-fit">{logo}</div>}
                        <div>
                            <DialogTitle className="text-lg sm:text-xl font-semibold">
                                {title}
                            </DialogTitle>
                            <DialogDescription className="text-sm sm:text-base text-muted-foreground mt-1">
                                <span className="font-semibold">
                                    {description}
                                </span>
                                {location && (
                                    <span className="mt-2 block">
                                        {location}
                                    </span>
                                )}
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className="mt-4">{formComponent}</div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogForm;
