import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const images = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39",
        alt: "Hero Image 1",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
        alt: "Hero Image 2",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        alt: "Hero Image 3",
    },
];

const Hero: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-1">
            <div className="container mx-auto text-center px-4">
                <Carousel className="w-full">
                    <CarouselContent
                        className={clsx(
                            "flex transition-transform duration-700 ease-in-out",
                            {
                                "translate-x-0": currentIndex === 0,
                                "-translate-x-full": currentIndex === 1,
                                "-translate-x-[200%]": currentIndex === 2,
                            }
                        )}
                    >
                        {images.map((image) => (
                            <CarouselItem
                                key={image.id}
                                className="w-full flex-shrink-0"
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    width={1200}
                                    height={600}
                                    className="w-full h-[300px] md:h-[500px] object-cover"
                                    // priority
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
};

export default Hero;
