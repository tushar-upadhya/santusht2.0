import About from "@/components/about/About";
import AssistanceBanner from "@/components/assistance-banner/AssistanceBanner";
import Cards from "@/components/cards/Cards";
import { Departments } from "@/components/departments/Departments";
import Faq from "@/components/faq/Faq";
import Gallery from "@/components/gallery/Gallery";
import Hero from "@/components/hero/Hero";
import Services from "@/components/services/Services";
import Testimonials from "@/components/testimonials/Testimonials";
import React from "react";

const HomePage: React.FC = () => {
    return (
        <div className="container mx-auto">
            <Hero />
            <AssistanceBanner />
            <About />
            <Testimonials />
            <Cards />
            <Services />
            <Departments />
            <Gallery />
            <Faq />
        </div>
    );
};

export default HomePage;
