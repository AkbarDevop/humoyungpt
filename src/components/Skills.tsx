import { Badge } from "@/components/ui/badge";
import { Code2, Languages } from "lucide-react";

const Skills = () => {
  const techSkills = ["Python", "SQL", "R", "HTML/CSS", "Microsoft Office"];
  const languages = [
    "English (fluent)",
    "Uzbek (native)",
    "Russian (conversational)",
    "Chinese (basic)"
  ];

  return (
    <section id="skills" className="py-24 px-6 md:px-12 border-t border-divider">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Skills</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold">Technical</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {techSkills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Languages className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-semibold">Languages</h3>
            </div>
            <div className="space-y-2">
              {languages.map((lang, index) => (
                <p key={index} className="text-sm text-muted-foreground">
                  • {lang}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
