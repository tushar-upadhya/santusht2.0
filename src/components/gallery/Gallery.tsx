"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import { Separator } from "../ui/separator";

const images = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?crop=entropy&cs=tinysrgb&w=1200&h=800&fit=crop",
        alt: "Hero Image 1",
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&w=1200&h=800&fit=crop",
        alt: "Hero Image 2",
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&w=1200&h=800&fit=crop",
        alt: "Hero Image 3",
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?crop=entropy&cs=tinysrgb&w=1200&h=800&fit=crop",
        alt: "Hero Image 4",
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&w=1200&h=800&fit=crop",
        alt: "Hero Image 5",
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&w=1200&h=800&fit=crop",
        alt: "Hero Image 6",
    },
];

const Gallery: React.FC = () => {
    return (
        <section className="py-12">
            <div className="container mx-auto text-center px-4">
                <p className="text-[min(6vw,1.5rem)] font-bold text-center mb-6 text-green-500">
                    Gallery
                </p>
                <Separator className="bg-gray-300  mx-auto -mt-4 mb-4 w-8 h-[2px]" />
                <p className=" text-[min(4vw,1rem)] leading-relaxed capitalize text-muted-foreground mb-10 ">
                    SANTUSHT empowers you to voice your concerns and aids in
                    resolving grievances promptly. It is accessible 24/7 as we
                    prioritize your well-being. Share your feedback seamlessly
                    to help us enhance your healthcare experience. Your input
                    shapes our commitment to compassionate care, ensuring
                    satisfaction and trust in every step of your journey.
                </p>
                <Carousel
                    className="w-full "
                    opts={{
                        loop: true,
                        align: "start",
                    }}
                    plugins={[
                        Autoplay({
                            delay: 2000,
                        }),
                    ]}
                >
                    <CarouselContent className="flex flex-nowrap gap-2">
                        {" "}
                        {/* Added gap-2 to reduce space */}
                        {images.map((image) => (
                            <CarouselItem
                                key={image.id}
                                className="w-full md:basis-1/3 lg:basis-1/4 flex justify-center"
                            >
                                <div className="bg-white  flex flex-col justify-center items-center w-[90%]">
                                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </section>
    );
};

export default Gallery;
