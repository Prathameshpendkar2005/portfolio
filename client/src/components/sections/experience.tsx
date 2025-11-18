import { useQuery } from "@tanstack/react-query";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Briefcase, ChevronDown } from "lucide-react";
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
    <section id="experience" className="min-h-screen py-20 px-4 relative" data-testid="experience-section">
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
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-mono font-bold text-neon">{exp.title}</h3>
                      <p className="text-accent font-mono text-sm">{exp.company}</p>
                    </div>
                    <div className="text-muted font-mono text-sm flex-shrink-0 whitespace-nowrap">
                      {exp.duration}
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
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

      {/* Scroll Down Indicator */}
      <div className="flex justify-center mt-20 pb-8">
        <a href="#gallery" className="flex flex-col items-center gap-2 text-neon hover:text-accent transition-colors">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll Down</span>
          <ChevronDown size={24} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
