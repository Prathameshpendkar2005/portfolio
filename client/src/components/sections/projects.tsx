import { useQuery } from "@tanstack/react-query";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Code, Github, ChevronDown } from "lucide-react";
import type { Project } from "@shared/schema";

export function ProjectsSection() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  if (isLoading) {
    return (
      <section id="projects" className="min-h-screen py-20 px-4" data-testid="projects-section">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-neon font-mono">Loading projects...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative" data-testid="projects-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-mono font-bold text-neon mb-4 flex items-center justify-center gap-4">
            <Code size={36} />
            Projects
          </h2>
          <p className="text-muted">Real-world cybersecurity implementations and research</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 auto-rows-max">
          {projects && Array.isArray(projects) && projects.map((project) => (
            <div key={project.id} className="group h-full" data-testid={`project-card-${project.id}`}>
              <TerminalWindow title={`${project.id}.sh`} hover className="h-full">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-mono font-bold text-neon flex-1">{project.title}</h3>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-neon text-background px-3 py-1 rounded text-xs font-mono font-bold hover:bg-accent transition-all duration-300 flex items-center gap-1 flex-shrink-0 ml-2"
                        data-testid={`github-link-${project.id}`}
                      >
                        <Github size={14} />
                        GitHub
                      </a>
                    )}
                  </div>
                  
                  <p className="text-muted mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="bg-terminal px-3 py-1 rounded text-xs font-mono text-accent h-6 flex items-center"
                        data-testid={`tech-tag-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-grow">
                    {project.details.map((detail, index) => (
                      <p key={index} className="text-xs text-muted font-mono">
                        ├── {detail}
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
        <a href="#skills" className="flex flex-col items-center gap-2 text-neon hover:text-accent transition-colors">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll Down</span>
          <ChevronDown size={24} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
