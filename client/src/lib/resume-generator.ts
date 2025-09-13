import jsPDF from 'jspdf';

export function generateATSResume(): void {
  const doc = new jsPDF();
  
  // Page settings
  const pageWidth = 210; // A4 width in mm
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);
  let currentY = margin;

  // Helper function to add text and update Y position
  const addText = (text: string, fontSize: number = 10, isBold: boolean = false, color: string = '#000000') => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setTextColor(color);
    doc.text(text, margin, currentY);
    currentY += fontSize * 0.35 + 2; // Line height calculation
  };

  const addSection = (title: string) => {
    currentY += 3; // Extra space before section
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor('#000000');
    doc.text(title.toUpperCase(), margin, currentY);
    
    // Add underline
    doc.setLineWidth(0.5);
    doc.line(margin, currentY + 1, pageWidth - margin, currentY + 1);
    currentY += 8;
  };

  const addBulletPoint = (text: string) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#000000');
    
    const bulletX = margin + 3;
    const textX = margin + 8;
    
    // Add bullet point
    doc.text('•', bulletX, currentY);
    
    // Split long text into multiple lines
    const textLines = doc.splitTextToSize(text, contentWidth - 8);
    textLines.forEach((line: string, index: number) => {
      doc.text(line, textX, currentY + (index * 4));
    });
    
    currentY += textLines.length * 4 + 1;
  };

  // Header
  addText('PRATHAMESH SANTOSH PENDKAR', 16, true);
  addText('Email: prathameshpendkar@gmail.com | Phone: +91-8390088075 | Location: Pune, India', 9);
  addText('LinkedIn: linkedin.com/in/prathamesh-pendkar | GitHub: github.com/Prathameshpendkar2005', 9);
  currentY += 5;

  // Professional Summary
  addSection('PROFESSIONAL SUMMARY');
  addText('Cybersecurity professional with expertise in penetration testing, vulnerability assessment, and cloud security. Proven track record in SOC monitoring, digital forensics, and security automation. AWS certified with hands-on experience in bug bounty programs and VAPT methodologies.', 10);

  // Education
  addSection('EDUCATION');
  addText('Bachelor of Technology in Computer Science & Engineering', 10, true);
  addText('Symbiosis Skills & Professional University, Pune | CGPA: 8.9/10 | Expected 2026', 10);

  // Professional Experience
  addSection('PROFESSIONAL EXPERIENCE');
  
  // Experience entries
  addText('Cybersecurity Intern | Imperative (Cyber Secured India)', 10, true);
  addText('August 2025 - November 2025', 9, false, '#666666');
  addBulletPoint('SOC/NOC Lab Deployment: Built modular ELK + Wazuh + Zabbix stack using Docker with static IPs');
  addBulletPoint('Health Check Automation: Scripted health checks for Elasticsearch, Kibana, Fleet Server, and Zabbix agents');
  addBulletPoint('Remote Infrastructure: Validated uptime across Docker containers, connected to Thane office via VPN');

  addText('Security Analyst Intern | Bloggerscon Vision Pvt. Ltd', 10, true);
  addText('February 2025 - August 2025', 9, false, '#666666');
  addBulletPoint('Found 5-8 bugs: XSS, IDOR, CSRF, Open Redirect');
  addBulletPoint('Recon Automation: 40% speed improvement');
  addBulletPoint('Subdomain Enumeration: 500+ endpoints');
  addBulletPoint('Delivered 20+ PoC reports with VRT mapping');

  addText('Cybersecurity Intern | Hacktify Cyber Security', 10, true);
  addText('February 2025 - March 2025', 9, false, '#666666');
  addBulletPoint('Bug Bounty VAPT: Found 5-7 web app vulnerabilities (XSS, SQLi, IDOR, CSRF, Broken Auth)');
  addBulletPoint('Hacktify CTF: Solved 5 exploitation challenges, simulating real-world bounty tasks');

  addText('Digital Forensics Intern | Cybersecurity Corporation', 10, true);
  addText('June 2024 - August 2024', 9, false, '#666666');
  addBulletPoint('Forensics: 10+ disk imaging cases with Autopsy');
  addBulletPoint('Incident Response: 5+ investigations supported');
  addBulletPoint('TSCM: 35% detection accuracy improvement');
  addBulletPoint('Reporting: 25% faster incident resolution');

  addText('Vulnerability Management Analyst | ARAPL, Pune', 10, true);
  addText('June 2023 - August 2023', 9, false, '#666666');
  addBulletPoint('Lab Setup: Simulated 5 vulnerabilities using DVWA, Juice Shop, WebGoat');
  addBulletPoint('Vulnerability Scanning: Detected 30+ issues with OWASP ZAP');
  addBulletPoint('Reporting: Improved dev patch adoption by 20%');

  // Technical Skills
  addSection('TECHNICAL SKILLS');
  addText('Cloud Security: AWS, EC2, S3, VPC, IAM, Azure, GCP, CloudFront, WAF', 10);
  addText('VAPT Tools: Nmap, Naabu, Burp Suite, OWASP ZAP, SQLMap, Nikto, Kali Linux, Metasploit', 10);
  addText('SOC/SIEM: Elasticsearch, Logstash, Kibana, Wazuh, Microsoft Sentinel, Zabbix, Prometheus, Splunk, Grafana', 10);
  addText('DevOps & Automation: Docker, Kubernetes, Python, Bash, Git, Terraform, Ansible, Infrastructure as Code', 10);

  // Certifications
  addSection('CERTIFICATIONS');
  addBulletPoint('AWS Cloud Certification - SevenMentor (September 2025)');
  addBulletPoint('Digital Forensics Essentials (DFE) - EC-Council (March 2023)');
  addBulletPoint('CompTIA PenTest+ - Udemy (In Progress)');

  // Key Projects
  addSection('KEY PROJECTS');
  
  addText('Secure Web Hosting on AWS EC2', 10, true);
  addText('Deployed web application on EC2 and S3 with custom IAM policies for least-privilege access and isolation. Technologies: AWS EC2, S3, IAM, VPC, CloudFront', 10);
  currentY += 2;
  
  addText('Recon Automation Bash Script', 10, true);
  addText('Automated reconnaissance and vulnerability scanning with endpoint enumeration and comprehensive reporting. Technologies: Bash, Nmap, OWASP ZAP, FFUF, WPScan', 10);
  currentY += 2;
  
  addText('TSCM Product Design', 10, true);
  addText('Built hardware-assisted tool to detect hidden surveillance devices with access control integration. Achieved 35% detection accuracy improvement.', 10);
  currentY += 2;
  
  addText('Web Vulnerability Testing Lab', 10, true);
  addText('Created comprehensive lab to simulate and exploit OWASP Top 10 vulnerabilities for VAPT practice. Technologies: OWASP Juice Shop, bWAPP, Metasploit, Docker', 10);

  // Save the PDF
  doc.save('Prathamesh_Pendkar_ATS_Resume.pdf');
}