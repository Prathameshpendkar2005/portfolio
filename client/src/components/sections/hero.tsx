import { useEffect, useState } from "react";
import { TerminalWindow } from "@/components/ui/terminal-window";
import { Github, Linkedin, Mail, GraduationCap, Phone, Download, ChevronDown } from "lucide-react";
import { generateATSResume } from "@/lib/resume-generator";

export function HeroSection() {
  const [typewriterText, setTypewriterText] = useState("");
  const fullText = "Prathamesh Santosh Pendkar";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypewriterText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative px-4" data-testid="hero-section">
      <div className="max-w-4xl mx-auto text-center">
        <TerminalWindow title="prathamesh@cybersec ~ %" className="mb-8">
          <div className="font-mono">
            <div className="text-neon mb-4 text-2xl">
              <span data-testid="typewriter-text">{typewriterText}</span>
              <span className="animate-cursor-blink text-neon">|</span>
            </div>
            <p className="text-lg text-muted mb-4">Cybersecurity Professional & Penetration Tester</p>
            <div className="text-sm text-accent space-y-1">
              <p className="flex items-center justify-center gap-2">
                <GraduationCap size={16} />
                B.Tech CSE @ Symbiosis Skills & Professional University (8.9 CGPA)
              </p>
              <p className="flex items-center justify-center gap-2">
                <Mail size={16} />
                prathameshpendkar@gmail.com
              </p>
              <p className="flex items-center justify-center gap-2">
                <Phone size={16} />
                +91-8390088075
              </p>
            </div>
          </div>
        </TerminalWindow>
        
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="#projects" 
            className="bg-neon text-background px-6 py-3 rounded-lg font-mono font-bold hover:bg-accent transition-all duration-300 hover:scale-105"
            data-testid="button-view-projects"
          >
            View Projects
          </a>
          <button 
            onClick={generateATSResume}
            className="bg-accent text-background px-6 py-3 rounded-lg font-mono font-bold hover:bg-neon transition-all duration-300 hover:scale-105 flex items-center gap-2"
            data-testid="button-download-resume"
          >
            <Download size={20} />
            Download Resume
          </button>
          <a 
            href="https://github.com/Prathameshpendkar2005" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-neon text-neon px-6 py-3 rounded-lg font-mono font-bold hover:bg-neon hover:text-background transition-all duration-300 flex items-center gap-2"
            data-testid="link-github"
          >
            <Github size={20} />
            GitHub
          </a>
          <a 
            href="https://linkedin.com/in/prathamesh-pendkar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border border-accent text-accent px-6 py-3 rounded-lg font-mono font-bold hover:bg-accent hover:text-background transition-all duration-300 flex items-center gap-2"
            data-testid="link-linkedin"
          >
            <Linkedin size={20} />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#projects" className="flex flex-col items-center gap-2 text-neon hover:text-accent transition-colors">
          <span className="text-xs font-mono uppercase tracking-widest">Scroll Down</span>
          <ChevronDown size={24} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
}
