interface sidebarProps {
    months: string[];
    selectedMonth: number;
    onSelectMonth: (index: number) => void;
}

const Sidebar = ({ months, selectedMonth, onSelectMonth }: sidebarProps) => {
    return (
        <div className="w-full xl:w-1/4 dark:text-gray-300 p-2 sm:p-6 bg-white dark:bg-accent rounded-l-2xl xl:rounded-l-xl overflow-x-auto xl:overflow-x-hidden">
            {/* <Separator className="mb-4" /> */}
            <ul className="flex xl:flex-col space-x-4 xl:space-x-0 xl:space-y-2 text-sm sm:text-base">
                {months.map((month, index) => (
                    <li
                        key={index}
                        className={`p-3 cursor-pointer rounded-lg whitespace-nowrap duration-200 transition-all ${
                            selectedMonth === index
                                ? "text-primary font-semibold "
                                : "hover:text-primary "
                        }`}
                        onClick={() => onSelectMonth(index)}
                    >
                        {month}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
