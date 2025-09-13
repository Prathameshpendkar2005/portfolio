import { useQuery } from "@tanstack/react-query";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Briefcase } from "lucide-react";
import type { Experience } from "@shared/schema";

export function ExperienceSection() {
  const { data: experiences, isLoading } = useQuery<Experience[]>({
    queryKey: ['/api/experience'],
  });

  if (isLoading) {
    return (
      <section id="experience" className="min-h-screen py-20 px-4" data-testid="experience-section">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-neon font-mono">Loading experience...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="min-h-screen py-20 px-4" data-testid="experience-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-mono font-bold text-neon mb-4 flex items-center justify-center gap-4">
            <Briefcase size={36} />
            Professional Experience
          </h2>
          <p className="text-muted">Cybersecurity internships and hands-on experience</p>
        </div>

        <div className="space-y-8">
          {experiences && Array.isArray(experiences) && experiences.map((exp) => (
            <div key={exp.id} data-testid={`experience-${exp.id}`}>
              <TerminalWindow title={`${exp.id}.log`} hover>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-mono font-bold text-neon">{exp.title}</h3>
                      <p className="text-accent font-mono">{exp.company}</p>
                    </div>
                    <div className="text-muted font-mono text-sm">
                      {exp.duration}
                    </div>
                  </div>
                  
                  <div className={`${exp.achievements.length > 2 ? 'grid md:grid-cols-2 gap-4' : 'space-y-2'} text-sm`}>
                    {exp.achievements.map((achievement, index) => (
                      <p key={index} className="font-mono text-foreground">
                        <span className="text-neon">{'>'}</span> {achievement}
                      </p>
                    ))}
                  </div>
                </div>
              </TerminalWindow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
