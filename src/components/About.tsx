import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

const About = () => {
  const education = [
    {
      school: "Hong Kong University of Science and Technology (HKUST)",
      degree: "BSc Mathematics and Economics, Year 3",
      location: "Hong Kong",
      period: "September 2023 – Present",
      highlight: "Global Learners scholarship recipient (Full Tuition fees for 4 years)"
    },
    {
      school: "Vrije Universiteit Amsterdam",
      degree: "Spring Semester Exchange",
      location: "Amsterdam, Netherlands",
      period: "January 2026 – Present",
      highlight: ""
    },
    {
      school: "Vin University",
      degree: "Summer Exchange (Global Political Economy)",
      location: "Hanoi, Vietnam",
      period: "August 2024 – September 2024",
      highlight: "Fully Funded"
    },
    {
      school: "Westminster International University in Tashkent (WIUT)",
      degree: "Certificate of International Foundation Studies",
      location: "Tashkent, Uzbekistan",
      period: "September 2022 – May 2023",
      highlight: "Academic Scholarship (Full Tuition fees)"
    }
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 border-t border-divider">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <GraduationCap className="w-6 h-6 text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold">Education</h2>
        </div>
        
        <div className="space-y-8">
          {education.map((edu, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                <h3 className="text-xl font-semibold">{edu.school}</h3>
                <span className="text-sm text-subtle whitespace-nowrap">{edu.period}</span>
              </div>
              <p className="text-muted-foreground mb-1">{edu.degree}</p>
              <p className="text-sm text-subtle mb-3">{edu.location}</p>
              {edu.highlight && (
                <p className="text-sm text-accent font-medium">• {edu.highlight}</p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
