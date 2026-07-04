import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const Awards = () => {
  const awards: (string | { text: string; link: string })[] = [
    "El-Yurt Umidi Foundation (EYUF) scholarship holder - June 2023",
    { text: "Winner, \"Mirzo Ulugbek Vorislari\" start-up competition - May 2023", link: "https://agromaxuzb.netlify.app/" },
    "Gold Medalist, MAA American Mathematics Competition (AMC 10/12) - November 2021",
    "Bronze Medalist, Southeast Asian Mathematical Olympiad (SEAMO) - September 2020",
    "1st place, Republican Mathematical and Physics Olympiad - December 2019"
  ];

  const memberships = [
    "Resident, Uzbekistan's Club - October 2024 – Present",
    "Member, ASHK (The Actuarial Society of Hong Kong) - February 2025 – Present"
  ];

  return (
    <section id="awards" className="py-24 px-6 md:px-12 border-t border-divider">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Trophy className="w-6 h-6 text-accent" />
          <h2 className="text-3xl md:text-4xl font-bold">Awards & Recognition</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {awards.map((award, index) => (
            <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
              {typeof award === 'string' ? (
                <p className="text-sm text-muted-foreground">{award}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  <a 
                    href={award.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline hover:text-accent transition-colors"
                  >
                    {award.text}
                  </a>
                </p>
              )}
            </Card>
          ))}
        </div>
        
        <h3 className="text-2xl font-semibold mb-6">Memberships</h3>
        <div className="space-y-3">
          {memberships.map((membership, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-accent mt-1">•</span>
              <p className="text-muted-foreground">{membership}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
