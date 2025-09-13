import { useQuery } from "@tanstack/react-query";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Award, Cloud, UserCheck, Search } from "lucide-react";
import type { Certification } from "@shared/schema";

const iconMap = {
  Cloud, UserCheck, Search, Award
};

export function CertificationsSection() {
  const { data: certifications, isLoading } = useQuery<Certification[]>({
    queryKey: ['/api/certifications'],
  });

  if (isLoading) {
    return (
      <section id="certifications" className="min-h-screen py-20 px-4" data-testid="certifications-section">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-neon font-mono">Loading certifications...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="certifications" className="min-h-screen py-20 px-4" data-testid="certifications-section">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-mono font-bold text-neon mb-4 flex items-center justify-center gap-4">
            <Award size={36} />
            Certifications
          </h2>
          <p className="text-muted">Professional cybersecurity credentials</p>
        </div>

        <div className="space-y-6">
          {certifications && Array.isArray(certifications) && certifications.map((cert) => {
            const IconComponent = iconMap[cert.icon as keyof typeof iconMap] || Award;
            return (
              <div key={cert.id} data-testid={`certification-${cert.id}`}>
                <TerminalWindow title={`${cert.id}.json`} hover>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl text-neon">
                        <IconComponent size={48} />
                      </div>
                      <div>
                        <h3 className="text-lg font-mono font-bold text-foreground">{cert.title}</h3>
                        <p className="text-muted">{cert.provider} • {cert.year}</p>
                        <p className="text-sm text-accent font-mono">{cert.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`${cert.statusColor} px-3 py-1 rounded font-mono text-sm`}>
                        {cert.status}
                      </div>
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
