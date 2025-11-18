import { useState } from "react";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Terminal, Mail, Phone, Github, Linkedin, MapPin, Download } from "lucide-react";
import { generateATSResume } from "@/lib/resume-generator";

export function ContactSection() {
  const [notification, setNotification] = useState<string | null>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setNotification("Copied to clipboard!");
      setTimeout(() => setNotification(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <section id="contact" className="min-h-screen py-20 px-4" data-testid="contact-section">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-mono font-bold text-neon mb-4 flex items-center justify-center gap-4">
            <Terminal size={36} />
            Contact
          </h2>
          <p className="text-muted">Let's connect and build secure solutions together</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <TerminalWindow title="contact.sh">
            <div className="space-y-6">
              {/* Email */}
              <div 
                className="flex items-center space-x-4 group cursor-pointer" 
                onClick={() => copyToClipboard('prathameshpendkar@gmail.com')}
                data-testid="contact-email"
              >
                <div className="text-2xl text-neon group-hover:scale-110 transition-transform">
                  <Mail size={32} />
                </div>
                <div>
                  <p className="font-mono text-foreground group-hover:text-neon transition-colors">
                    prathameshpendkar@gmail.com
                  </p>
                  <p className="text-sm text-muted">Click to copy email address</p>
                </div>
              </div>

              {/* Phone */}
              <div 
                className="flex items-center space-x-4 group cursor-pointer" 
                onClick={() => copyToClipboard('+91-8390088075')}
                data-testid="contact-phone"
              >
                <div className="text-2xl text-accent group-hover:scale-110 transition-transform">
                  <Phone size={32} />
                </div>
                <div>
                  <p className="font-mono text-foreground group-hover:text-accent transition-colors">
                    +91-8390088075
                  </p>
                  <p className="text-sm text-muted">Click to copy phone number</p>
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center space-x-4 group" data-testid="contact-github">
                <div className="text-2xl text-foreground group-hover:scale-110 transition-transform group-hover:text-neon">
                  <Github size={32} />
                </div>
                <div>
                  <a 
                    href="https://github.com/Prathameshpendkar2005" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-mono text-foreground group-hover:text-neon transition-colors"
                  >
                    github.com/Prathameshpendkar2005
                  </a>
                  <p className="text-sm text-muted">Open source contributions & projects</p>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="flex items-center space-x-4 group" data-testid="contact-linkedin">
                <div className="text-2xl text-accent group-hover:scale-110 transition-transform">
                  <Linkedin size={32} />
                </div>
                <div>
                  <a 
                    href="https://www.linkedin.com/in/prathamesh-pendkar-1750b1248" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-mono text-foreground group-hover:text-accent transition-colors"
                  >
                    www.linkedin.com/in/prathamesh-pendkar-1750b1248
                  </a>
                  <p className="text-sm text-muted">Professional network & experience</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center space-x-4 group" data-testid="contact-location">
                <div className="text-2xl text-muted group-hover:scale-110 transition-transform">
                  <MapPin size={32} />
                </div>
                <div>
                  <p className="font-mono text-foreground">Pune, India</p>
                  <p className="text-sm text-muted">Available for remote & on-site opportunities</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <div className="text-center">
                <p className="font-mono text-muted text-sm mb-4">
                  <span className="text-neon">$</span> Ready to secure your infrastructure?
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="mailto:prathameshpendkar@gmail.com" 
                    className="bg-neon text-background px-6 py-3 rounded-lg font-mono font-bold hover:bg-accent transition-all duration-300 hover:scale-105"
                    data-testid="button-send-email"
                  >
                    Send Email
                  </a>
                  <button 
                    onClick={generateATSResume}
                    className="bg-accent text-background px-6 py-3 rounded-lg font-mono font-bold hover:bg-neon transition-all duration-300 hover:scale-105 flex items-center gap-2"
                    data-testid="button-download-resume-contact"
                  >
                    <Download size={20} />
                    Download Resume
                  </button>
                  <a 
                    href="https://www.linkedin.com/in/prathamesh-pendkar-1750b1248" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-accent text-background px-6 py-3 rounded-lg font-mono font-bold hover:bg-neon transition-all duration-300 hover:scale-105"
                    data-testid="button-connect-linkedin"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </TerminalWindow>
        </div>
      </div>

      {/* Copy notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-neon text-background px-4 py-2 rounded-lg font-mono text-sm z-50 animate-in fade-in slide-in-from-top-2">
          {notification}
        </div>
      )}
    </section>
  );
}
