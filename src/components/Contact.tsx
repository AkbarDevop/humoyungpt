import { Button } from "@/components/ui/button";
import { Mail, Linkedin, MapPin, Phone } from "lucide-react";
import { Send } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new opportunities, collaborations, or just having a conversation about mathematics and education.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-lg">
            <Mail className="w-5 h-5 text-accent" />
            <a href="mailto:knasipkulov@connect.ust.hk" className="text-sm hover:text-accent transition-colors">
              knasipkulov@connect.ust.hk
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-lg">
            <Phone className="w-5 h-5 text-accent" />
            <span className="text-sm">+852 5281 8404</span>
          </div>
          
          <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-lg">
            <Linkedin className="w-5 h-5 text-accent" />
            <a 
              href="https://linkedin.com/in/khumoyun-nasipkulov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:text-accent transition-colors"
            >
              linkedin.com/in/khumoyun-nasipkulov
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-lg">
            <Send className="w-5 h-5 text-accent" />
            <a 
              href="https://t.me/humoyundotcom" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm hover:text-accent transition-colors"
            >
              t.me/humoyundotcom
            </a>
          </div>
          
          <div className="flex items-center justify-center gap-3 p-4 bg-card rounded-lg">
            <MapPin className="w-5 h-5 text-accent" />
            <span className="text-sm">Clear Water Bay, Hong Kong</span>
          </div>
        </div>
        
        <Button 
          size="lg" 
          className="gap-2"
          asChild
        >
          <a href="mailto:knasipkulov@connect.ust.hk">
            <Mail className="w-4 h-4" />
            Send me an email
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Contact;
