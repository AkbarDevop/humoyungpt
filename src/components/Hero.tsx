import { ArrowRight, Mail, Linkedin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import profileImg from "@/assets/profile.jpg";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 relative">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Khumoyun at HKUST" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background"></div>
      </div>
      <div className="max-w-6xl w-full animate-fade-in-up relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            {t('hero.name')}
          </h1>
          <p className="text-xl md:text-2xl text-subtle mb-4">
            {t('hero.title')}
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mb-8">
            {t('hero.description')}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Button 
              variant="default" 
              size="lg"
              className="gap-2"
              asChild
            >
              <Link to="/humoyungpt">
                <MessageCircle className="w-4 h-4" />
                HumoyunGPT
              </Link>
            </Button>
            
            <Button 
              variant="default" 
              size="lg"
              className="gap-2"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {t('hero.getInTouch')}
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="gap-2"
              asChild
            >
              <a href="mailto:knasipkulov@connect.ust.hk">
                <Mail className="w-4 h-4" />
                {t('hero.email')}
              </a>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="gap-2"
              asChild
            >
              <a href="https://linkedin.com/in/khumoyun-nasipkulov" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
                {t('hero.linkedin')}
              </a>
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span>📍 {t('hero.location')}</span>
            <span>•</span>
            <span>🎓 {t('hero.year')}</span>
            <span>•</span>
            <span>🏆 {t('hero.scholarship')}</span>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <img 
            src={profileImg} 
            alt="Khumoyun Naseeb" 
            className="w-64 md:w-80 h-auto rounded-lg shadow-xl border-2 border-border"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
