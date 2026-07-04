import { Card } from "@/components/ui/card";
import { Rocket, Heart, Users } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      icon: Users,
      title: "President | HKUST Mathematics and Economics Club",
      period: "March 2024 – Present",
      points: [
        "Provide overall leadership and direction to the club with membership of 100+ students",
        "Lead a working team of 7 Executive Committee secretaries",
        "Assigned work duties according to different specialties and strengths of team members"
      ]
    },
    {
      icon: Rocket,
      title: "Founder, Head Mentor | NASEEB EDU",
      period: "September 2023 – Present",
      link: "https://t.me/naseeb_edu",
      points: [
        "Led a team of mentors to prepare students for admission to top universities",
        "Successfully guided 100+ students into the top 100 universities worldwide",
        "Managed the mentorship program, ensuring personalized support and quality guidance",
        "Maintained regular communication with parents, providing progress updates and monthly performance reports"
      ]
    },
    {
      icon: Heart,
      title: "Event Manager | Ibrat Farzandlari",
      company: "Youth Affairs Agency of Republic of Uzbekistan",
      period: "May 2022 - Present",
      points: [
        "Organized annual summer camps to support talented youth, especially from rural areas, in achieving their academic and career goals",
        "Planned events, managed logistics, and facilitated mentorship programs to guide students on applying to top universities",
        "Reached out to students from prestigious universities, inviting them as guest speakers and mentors"
      ]
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 md:px-12 bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Projects & Leadership</h2>
        
        <div className="space-y-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                {project.link ? (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="block">
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                          <h3 className="text-xl font-semibold hover:text-accent transition-colors">{project.title}</h3>
                          <span className="text-sm text-subtle whitespace-nowrap">{project.period}</span>
                        </div>
                        {project.company && (
                          <p className="text-muted-foreground mb-3">{project.company}</p>
                        )}
                        <ul className="space-y-2">
                          {project.points.map((point, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                              <span className="text-accent mt-1">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <span className="text-sm text-subtle whitespace-nowrap">{project.period}</span>
                      </div>
                      {project.company && (
                        <p className="text-muted-foreground mb-3">{project.company}</p>
                      )}
                      <ul className="space-y-2">
                        {project.points.map((point, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                            <span className="text-accent mt-1">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
