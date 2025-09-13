import { useQuery } from "@tanstack/react-query";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Code, Github } from "lucide-react";
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
    <section id="projects" className="min-h-screen py-20 px-4" data-testid="projects-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-mono font-bold text-neon mb-4 flex items-center justify-center gap-4">
            <Code size={36} />
            Projects
          </h2>
          <p className="text-muted">Real-world cybersecurity implementations and research</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects && Array.isArray(projects) && projects.map((project) => (
            <div key={project.id} className="group" data-testid={`project-card-${project.id}`}>
              <TerminalWindow title={`${project.id}.sh`} hover>
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-mono font-bold text-neon">{project.title}</h3>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-neon text-background px-3 py-1 rounded text-xs font-mono font-bold hover:bg-accent transition-all duration-300 flex items-center gap-1"
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
                        className="bg-terminal px-3 py-1 rounded text-xs font-mono text-accent"
                        data-testid={`tech-tag-${tech.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
    </section>
  );
}
