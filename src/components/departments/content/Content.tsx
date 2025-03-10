import Image from "next/image";

interface MainContentProps {
    title: string;
    tagLine: string;
    content: string;
    image?: string;
}

const Content = ({ title, tagLine, content, image }: MainContentProps) => {
    return (
        <div className="w-full dark:text-gray-300 p-4 xl:p-6 h-[450px] xl:h-[500px] overflow-y-auto overflow-x-hidden relative scrollbar-none">
            {/* Title & Tagline */}
            <div className="bg-white dark:bg-accent pb-2 pt-2">
                <h2 className="text-[min(4vw,1rem)] leading-relaxed capitalize text-muted-foreground font-semibold border-b border-gray-200 dark:border-gray-600">
                    {title}
                </h2>
                <p className="text-slate-800 font-medium dark:text-gray-400 italic text-sm mt-1">
                    {tagLine}
                </p>
            </div>

            {image && (
                <div className="flex justify-center my-4">
                    <Image
                        src={image}
                        alt={title}
                        width={500}
                        height={300}
                        className="rounded-lg object-cover w-full md:w-3/4 lg:w-1/2 h-auto max-w-full"
                    />
                </div>
            )}

            {/* Content */}
            <p className="leading-7 text-sm sm:text-base">{content}</p>
        </div>
    );
};

export default Content;
