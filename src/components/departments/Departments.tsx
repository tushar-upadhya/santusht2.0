import { StickyScroll } from "../ui/sticky-scroll-reveal";

const departments = [
    {
        department: "Hospital Administration",
        contentHeading:
            "Efficient administration: Nurturing health, managing care, and ensuring excellence in every aspect of your well-being",
        content:
            "The Hospital Administration Department at SANTUSHT ensures efficient operations, smooth coordination, and optimal resource management. With a focus on patient-centric care, our dedicated team upholds high standards, contributing to a seamless healthcare experience.",
        image: "/aiimshospital.svg", // Updated path
    },
    {
        department: "Sanitation",
        contentHeading:
            "Clean communities, healthy lives: Sanitation Department, fostering well-being through hygiene and dedicated service.",
        content:
            "Our sanitation department works tirelessly to maintain a clean and safe healthcare environment. Committed to stringent hygiene protocols, they ensure a sterile and comforting space, promoting optimal health and well-being for both patients and staff at SANTUSHT.",
        image: "/hygine.svg", // Updated path
    },
    {
        department: "Civil",
        contentHeading:
            "Building bridges of trust, laying foundations for progress. Strength, integrity, and community service unite us.",
        content:
            "The Civil Department at SANTUSHT plays a vital role in creating a welcoming and comfortable environment for patients. From maintaining facilities to ensuring safety, our dedicated team contributes to a positive atmosphere, enhancing the overall patient experience.",
        image: "/civil.svg", // Updated path
    },
    {
        department: "Security",
        contentHeading:
            "Safeguarding your well-being, ensuring a secure and protected environment for optimal care and comfort.",
        content:
            "Our vigilant security department prioritizes your safety within the SANTUSHT portal. Employing advanced measures, we ensure secure access and protect your confidential information, fostering trust and confidence in every interaction. Your privacy is our utmost concern.",
        image: "/security.svg", // Updated path
    },
];

export const Departments: React.FC = () => {
    return (
        <div className="py-12">
            <div className="container mx-auto px-4">
                <div className="rounded-2xl bg-primary/20 dark:bg-zinc-900">
                    <StickyScroll
                        content={departments.map((dept) => ({
                            title: dept.contentHeading,
                            description: dept.content,
                            content: (
                                <div>
                                    <img
                                        src={dept.image}
                                        alt={dept.department}
                                        className="w-full h-auto rounded-md mt-4"
                                    />
                                    <p className="text-slate-800 dark:text-gray-300 text-sm font-semibold">
                                        {dept.department}
                                    </p>
                                </div>
                            ),
                        }))}
                        contentClassName="bg-gray-800 text-white text-[min(4vw,1rem)] leading-relaxed capitalize"
                    />
                </div>
            </div>
        </div>
    );
};
