import { Card } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Database Developer",
      company: "HKUST Business School",
      location: "Hong Kong",
      period: "Sep 2025 – Present",
      points: [
        "Developed and managed an Excel database to automate data processing in the External & Alumni Relations office",
        "Sourced, analyzed, and updated alumni and administrative records for accuracy",
        "Supported database management and data analysis for office projects"
      ]
    },
    {
      title: "Intern",
      company: "Walt Disney",
      location: "FL, USA",
      period: "June 2025 – August 2025",
      points: [
        "Delivering exceptional guest service in a fast paced, multicultural environment, enhancing the overall Disney experience and consistently receiving positive feedback",
        "Collaborated with an international team to support daily operations, demonstrate problem-solving under pressure, and adapt to dynamic guest needs",
        "Participated in professional development workshops focused on leadership, communication, and career advancement"
      ]
    },
    {
      title: "Teaching Assistant & Grader",
      company: "Art of Problem Solving Academy (aops.com)",
      location: "(Remote) CA, USA",
      period: "December 2024 – Present",
      points: [
        "Assisting in live classes weekly for the online intermediate and advanced math olympiad courses for high school students preparing for AMC, AIME, USAMO, IMC, IMO",
        "Grading and providing assignments for 100+ students weekly"
      ]
    },
    {
      title: "Intern at the Department of Small and Medium Businesses",
      company: "Ministry of Finance and Economics of Republic of Uzbekistan",
      location: "Tashkent, Uzbekistan",
      period: "June 2024 - August 2024",
      points: [
        "Conducted research on MSME sector development in Uzbekistan, analyzing international best practices and proposing tailored recommendations",
        "Produced detailed reports and case studies to support policymaking and sector growth",
        "Collaborated with colleagues, presented findings, and contributed to team discussions with strong analytical insights"
      ]
    },
    {
      title: "Mathematics Teacher",
      company: "Alpha Academy",
      location: "Sirdaryo, Uzbekistan",
      period: "May 2023 - August 2023",
      points: [
        "Became the first SAT teacher in my region, mentoring students for preparing SAT math part",
        "Taught students in sequences, trigonometry, and combinatorics with personalized guidance",
        "Graded assignments and provided detailed feedback to enhance understanding"
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Briefcase className="w-6 h-6 text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold">Work Experience</h2>
        </div>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                <div>
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="text-muted-foreground">{exp.company}</p>
                </div>
                <span className="text-sm text-subtle whitespace-nowrap">{exp.period}</span>
              </div>
              <p className="text-sm text-subtle mb-4">{exp.location}</p>
              <ul className="space-y-2">
                {exp.points.map((point, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
