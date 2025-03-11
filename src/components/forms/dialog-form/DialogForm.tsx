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
            <DialogTrigger asChild className="cursor-pointer">
                <Button
                    variant="outline"
                    className={`border dark:border-green-500 text-green-500 dark:text-gray-300 font-semibold w-full sm:w-fit px-14 py-5 ${buttonClassName}`}
                >
                    {buttonLabel}
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-gray-800">
                <DialogHeader>
                    <div className="flex items-center gap-4">
                        {logo && <div className="w-fit h-fit">{logo}</div>}
                        <div>
                            <DialogTitle className="text-[min(4vw,1rem)] leading-relaxed">
                                {title}
                            </DialogTitle>
                            <DialogDescription className="text-[min(6vw,.8rem)] leading-relaxed text-muted-foreground mt-1">
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
