import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Awards from "@/components/Awards";
import SocialMedia from "@/components/SocialMedia";
import Contact from "@/components/Contact";
import Navigation from "@/components/Navigation";
import AnimatedSection from "@/components/AnimatedSection";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <AnimatedSection>
        <About />
      </AnimatedSection>
      <AnimatedSection>
        <Experience />
      </AnimatedSection>
      <AnimatedSection>
        <Projects />
      </AnimatedSection>
      <AnimatedSection>
        <Awards />
      </AnimatedSection>
      <AnimatedSection>
        <SocialMedia />
      </AnimatedSection>
      <AnimatedSection>
        <Skills />
      </AnimatedSection>
      <AnimatedSection>
        <Contact />
      </AnimatedSection>
      
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-divider">
        <p>{t('contact.copyright')}</p>
      </footer>
    </div>
  );
};

export default Index;
