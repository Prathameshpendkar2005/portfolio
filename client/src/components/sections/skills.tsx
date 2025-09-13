import { useQuery } from "@tanstack/react-query";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { 
  Cloud, UserCheck, Shield, Code, Wrench, Server, Database, 
  Network, Layers, BarChart, Monitor, Search, Bug, 
  Terminal, Container, GitBranch, Settings
} from "lucide-react";
import type { SkillCategory } from "@shared/schema";

const iconMap = {
  Cloud, UserCheck, Shield, Code, Wrench, Server, Database,
  Network, Layers, BarChart, Monitor, Search, Bug,
  Terminal, Container, GitBranch, Settings
};

export function SkillsSection() {
  const { data: skillCategories, isLoading } = useQuery<SkillCategory[]>({
    queryKey: ['/api/skills'],
  });

  if (isLoading) {
    return (
      <section id="skills" className="min-h-screen py-20 px-4" data-testid="skills-section">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-neon font-mono">Loading skills...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="min-h-screen py-20 px-4" data-testid="skills-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-mono font-bold text-neon mb-4 flex items-center justify-center gap-4">
            <Wrench size={36} />
            Skills & Technologies
          </h2>
          <p className="text-muted">Expertise across cybersecurity domains</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {skillCategories && Array.isArray(skillCategories) && skillCategories.map((category) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Wrench;
            return (
              <div key={category.id} data-testid={`skill-category-${category.id}`}>
                <TerminalWindow title={category.id}>
                  <div>
                    <h3 className="text-lg font-mono font-bold text-accent mb-4 flex items-center gap-2">
                      <IconComponent size={20} />
                      {category.title}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-3">
                      {category.tools?.map((tool) => {
                        const ToolIcon = iconMap[tool.icon as keyof typeof iconMap] || Code;
                        return (
                          <a
                            key={tool.name}
                            href={tool.wikipediaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-terminal px-3 py-2 rounded text-sm font-mono text-neon hover:bg-border hover:text-accent transition-colors cursor-pointer"
                            data-testid={`tool-${tool.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <ToolIcon size={16} />
                            <span>{tool.name}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </TerminalWindow>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
