import MainLayout from '../components/layout/MainLayout';
import Hero from '../components/sections/Hero';
import WhyUs from '../components/sections/WhyUs';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Experience from '../components/sections/Experience';
import Team from '../components/sections/Team';
import RecentProjects from '../components/sections/RecentProjects';
import Testimonials from '../components/sections/Testimonials';
import GalleryShowcase from '../components/sections/GalleryShowcase';
import Contact from '../components/sections/Contact';
import FAQ from '../components/sections/FAQ';

const HomePage = () => {
    return (
        <MainLayout>
            <Hero />
            <WhyUs />
            <About />
            <Services />
            <Experience />
            <Team />
            <RecentProjects />
            <Testimonials />
            <GalleryShowcase />
            <Contact />
            <FAQ />
        </MainLayout>
    );
};

export default HomePage;
