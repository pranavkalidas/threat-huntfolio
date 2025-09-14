import { useEffect, useState, useRef } from "react";
import "./Portfolio.css";
import {
  contact,
  experience,
  certifications,
  skills,
  education,
  achievements,
  tools,
  incidents
} from "./portfolioData";
import {
  Mail,
  Linkedin,
  MapPin,
  Shield,
  Code2,
  Award,
  GraduationCap,
  Briefcase,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Sun,
  Moon,
  Clock,
  Terminal,
  Zap,
  Eye
} from "lucide-react";

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const matrixRef = useRef(null);

  useEffect(() => {
    // Ensure Tailwind dark mode works: requires tailwind.config.js -> darkMode: 'class'
    const stored = localStorage.getItem('theme');
    const initialDark = stored ? stored === 'dark' : true; // Default to dark theme
    document.documentElement.classList.toggle('dark', initialDark);
    document.body.classList.toggle('dark', initialDark); // extra safety for some setups
    setIsDark(initialDark);

    // Simulate loading for 3.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Debug incidents data
  useEffect(() => {
    console.log('Incidents data:', incidents);
    console.log('Incidents length:', incidents?.length);
  }, []);


  // Matrix rain effect for dark theme
  useEffect(() => {
    if (!isDark || !matrixRef.current) return;

    const matrixChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const columns = Math.floor(window.innerWidth / 20);
    const matrixContainer = matrixRef.current;

    // Clear existing columns
    matrixContainer.innerHTML = '';

    // Create matrix columns
    for (let i = 0; i < columns; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = `${i * 20}px`;
      column.style.animationDelay = `${Math.random() * 5}s`;
      column.style.animationDuration = `${2 + Math.random() * 3}s`;
      
      // Generate random characters for this column
      let text = '';
      for (let j = 0; j < 50; j++) {
        text += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '\n';
      }
      column.textContent = text;
      
      matrixContainer.appendChild(column);
    }

    // Update on resize
    const handleResize = () => {
      if (isDark) {
        const newColumns = Math.floor(window.innerWidth / 20);
        if (newColumns !== columns) {
          matrixContainer.innerHTML = '';
          for (let i = 0; i < newColumns; i++) {
            const column = document.createElement('div');
            column.className = 'matrix-column';
            column.style.left = `${i * 20}px`;
            column.style.animationDelay = `${Math.random() * 5}s`;
            column.style.animationDuration = `${2 + Math.random() * 3}s`;
            
            let text = '';
            for (let j = 0; j < 50; j++) {
              text += matrixChars[Math.floor(Math.random() * matrixChars.length)] + '\n';
            }
            column.textContent = text;
            
            matrixContainer.appendChild(column);
          }
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isDark]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    document.body.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };



  // PDF generator (branded amber)
  const generateResumePDF = async () => {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF({ unit: 'pt', format: 'a4' });
    // header band
    doc.setFillColor(245, 200, 66); // amber ~
    doc.rect(0, 0, 595.28, 80, 'F');
    doc.setTextColor(30, 30, 30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.text(contact.name, 40, 50);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text(`${contact.title}  •  ${contact.location}`, 40, 68);
    doc.text(`${contact.email}  •  linkedin.com/in/pranav-kalidas`, 40, 84);

    let y = 120;
    const addSection = (title) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(180, 130, 0);
      doc.text(title, 40, y);
      y += 16;
      doc.setTextColor(20, 20, 20);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
    };

    addSection('Summary');
    const summary = doc.splitTextToSize(contact.summary, 515);
    doc.text(summary, 40, y); y += summary.length * 14 + 6;

    addSection('Skills');
    doc.text(skills.join(' • '), 40, y); y += 24;

    addSection('Certifications');
    certifications.forEach(c => { doc.text(`• ${c.name} — ${c.org} (${c.date})`, 40, y); y += 16; });

    addSection('Experience');
    experience.forEach(e => {
      doc.text(`${e.role} — ${e.company} (${e.start} – ${e.end})`, 40, y); y += 14;
      e.bullets.forEach(b => { doc.text(`- ${b}`, 52, y); y += 14; });
      y += 6;
    });

    addSection('Education');
    doc.text(`${education.degree} — ${education.uni} • ${education.cgpa}`, 40, y); y += 14;
    doc.text(`Focus: ${education.focus} (${education.start} – ${education.end})`, 40, y);

    doc.save('Pranav_Kalidas_Resume.pdf');
  };

  return (
    <div className="portfolio" data-theme={isDark ? 'dark' : 'light'}>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader-shield">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="loader-icon">
              <path d="M16 2L28 8V16C28 22.627 22.627 28 16 28S4 22.627 4 16V8L16 2Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5"/>
              <rect x="12" y="14" width="8" height="8" rx="1" fill="#1f2937"/>
              <path d="M14 14V11C14 9.343 15.343 8 17 8S20 9.343 20 11V14" stroke="#1f2937" strokeWidth="1.5" fill="none"/>
              <circle cx="16" cy="18" r="1" fill="#f59e0b"/>
              <path d="M8 12L12 16L16 12" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 12L20 16L24 12" stroke="#ffffff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="loader-text">
            <h1 className="loader-title">Security Analyst</h1>
            <div className="loader-subtitle">Initializing Threat Detection Systems...</div>
          </div>
          <div className="loader-progress">
            <div className="loader-bar"></div>
          </div>
        </div>
      ) : (
        <>
          {/* Cyberpunk Effects for Dark Theme */}
          {isDark && (
            <>
              <div className="matrix-rain" ref={matrixRef}></div>
              <div className="scan-lines"></div>
              <div className="cyber-grid"></div>
            </>
          )}

          {/* Background */}
          <div className="bg" style={{backgroundColor: isDark ? '#0a0a0a' : '#fefce8'}}>
            <div className="bg-grad" />
            <div className="bg-grid" />
            <div className="glow-a" />
            <div className="glow-b" />
          </div>

          {/* Header */}
          <header className="container header">
            <div className="header-flex">
              <div className="header-left">
                <div className="avatar">PK</div>
                <div>
                  <h1 style={{fontSize: 'clamp(28px, 4vw, 36px)'}}>
                    <>Pranav Kalidas <span className="accent">✦</span></>
                  </h1>
                  <p className="row muted2" style={{marginTop:6}}>
                    <Shield size={16}/> Security Analyst
                  </p>
                  <p className="row muted" style={{marginTop:6}}>
                    <MapPin size={16}/> Kozhikode, Kerala — 673522
                  </p>
                </div>
              </div>
              <div className="links">
                <button onClick={toggleTheme} className="pill theme-toggle-pill" aria-label="Toggle theme">
                  {isDark ? <Sun size={16}/> : <Moon size={16}/>} {isDark ? 'Light mode' : 'Dark mode'}
                </button>
                <a href="mailto:kalidas.pranav@gmail.com" className="pill"><Mail size={16}/> kalidas.pranav@gmail.com</a>
                <a href="https://linkedin.com/in/pranav-kalidas" target="_blank" rel="noreferrer" className="pill"><Linkedin size={16}/> linkedin.com/in/pranav-kalidas <ExternalLink size={16}/></a>
                <button onClick={generateResumePDF} className="btn-primary row">
                  <Award size={16}/> 
                  {isDark ? (
                    <span className="terminal-cursor">Download Resume (PDF)</span>
                  ) : (
                    'Download Resume (PDF)'
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Summary */}
          <main className="container" style={{paddingBottom: 64}}>
            <section className={`card animate-entrance data-stream ${isDark ? 'terminal-window' : ''}`} style={{animationDelay: '0.1s'}}>
              <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}>
                <Shield size={20} className="accent"/> 
                {isDark ? (
                  <span className="terminal-cursor">Professional Summary</span>
                ) : (
                  'Professional Summary'
                )}
              </h2>
              <p style={{marginTop:12, fontFamily: isDark ? 'Courier New, monospace' : 'inherit'}}>
                {isDark ? (
                  <>
                    <span className="terminal-cursor">root@security:~$</span> Security Analyst with 1.8 years of hands-on SOC experience: monitoring, triaging, and responding to alerts. Skilled in threat detection, incident response, and remediation to safeguard enterprise infrastructure. Calm under pressure, collaborative with L2/L3, and consistently on-time against SLAs.
                  </>
                ) : (
                  'Security Analyst with 1.8 years of hands-on SOC experience: monitoring, triaging, and responding to alerts. Skilled in threat detection, incident response, and remediation to safeguard enterprise infrastructure. Calm under pressure, collaborative with L2/L3, and consistently on-time against SLAs.'
                )}
              </p>
            </section>

            {/* Experience & Skills */}
            <section className="grid-main mt-8">
              <div className="card animate-entrance" style={{animationDelay: '0.2s'}}>
                <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}><Briefcase size={20} className="accent"/> Experience</h2>
                <div className="space-y mt-6">
                  {[...experience].map((exp, idx) => (
                    <div key={idx} className="card experience-card animate-entrance" style={{animationDelay: `${0.3 + (idx * 0.1)}s`}}>
                      <div className="row experience-header">
                        <div>
                          <div className="role-title">{exp.role}</div>
                          <div className="muted2">{exp.company}</div>
                          <div className="muted location-text">{exp.location}</div>
                        </div>
                        <div className="chip">{exp.start} – {exp.end}</div>
                      </div>
                      <ul className="experience-bullets">
                        {exp.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="skills-container animate-entrance" style={{animationDelay: '0.4s'}}>
                <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}><Code2 size={20} className="accent"/> Skills</h2>
                <div className="skills-list">
                  {skills.map((s, index) => (
                    <span 
                      key={s} 
                      className="skill" 
                      style={{ '--skill-index': index }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Certifications Badge Wall */}
            <section className="card mt-8 animate-entrance" style={{animationDelay: '0.5s'}}>
              <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}><Award size={20} className="accent"/> Certifications & Badge Wall</h2>
              <div className="grid-tiles mt-6">
                {certifications.map((c, i) => (
                  <div key={i} className="card animate-entrance" style={{display:'flex', alignItems:'center', gap:12, animationDelay: `${0.6 + (i * 0.1)}s`}}>
                    <div style={{height:40, width:40, borderRadius:999, background:'linear-gradient(135deg,#f59e0b,#fde047)', display:'grid', placeItems:'center', color:'#fff', fontWeight:800, outline:`2px solid ${'var(--ring)'}`}}>
                      {c.abbr}
                    </div>
                    <div>
                      <div style={{fontWeight:600}}>{c.name}</div>
                      <div className="muted" style={{fontSize:12}}>{c.org} • {c.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tools & Technologies */}
            <section className="card mt-8 animate-entrance" style={{animationDelay: '0.7s'}}>
              <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}><Code2 size={20} className="accent"/> Tools & Technologies</h2>
              <div className="grid-tiles-3 mt-6">
                {tools.map((t, i) => (
                  <div key={i} className="card animate-entrance" style={{animationDelay: `${0.8 + (i * 0.1)}s`}}>
                    <div style={{fontWeight:600}}>{t.name}</div>
                    <div className="muted" style={{fontSize:14, marginTop:6}}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Threat Timeline */}
            <section className="card mt-8 animate-entrance" style={{animationDelay: '0.1s'}}>
              <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}>
                <Shield size={20} className="accent"/> 
                'Threat Timeline'
              </h2>
              <div className="timeline mt-6">
                <div className="space-y">
                  {incidents && incidents.length > 0 ? incidents.map((it, idx) => (
                    <div key={it.title} className="timeline-item animate-entrance" style={{animationDelay: `${0.2 + (idx * 0.1)}s`}}>
                      <span className="dot" />
                      <div className="row" style={{justifyContent:'space-between'}}>
                        <div style={{fontWeight:600}}>{it.title}</div>
                        <span className="chip"><Clock size={12}/> {new Date(it.date).toLocaleDateString()}</span>
                      </div>
                      <div className="row" style={{gap:8, marginTop:8, flexWrap:'wrap'}}>
                        <span className="chip">Severity: {it.severity}</span>
                        {it.tags.map(t => <span key={t} className="chip">{t}</span>)}
                      </div>
                      <p className="muted2" style={{marginTop:8, fontSize:14}}>{it.notes}</p>
                    </div>
                  )) : (
                    <div style={{padding: '20px', textAlign: 'center', color: 'var(--muted)', backgroundColor: 'rgba(255, 0, 0, 0.1)', border: '1px solid red'}}>
                      No incidents data available - Debug: incidents = {JSON.stringify(incidents)}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Education & Achievements */}
            <section className="mt-8">
              <div style={{display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px'}}>
                <div className="card animate-entrance" style={{animationDelay: '1.1s'}}>
                  <h2 className="row" style={{fontSize:'clamp(16px,2.5vw,20px)'}}><GraduationCap size={18} className="accent"/> Education</h2>
                  <div className="row" style={{gap: '8px', alignItems: 'flex-start', marginTop: '8px'}}>
                    <div className="education-icon" style={{padding: '6px', borderRadius: '6px'}}>
                      <GraduationCap size={16} className="accent"/>
                    </div>
                    <div className="education-content">
                      <div style={{fontWeight: 600, fontSize: '14px'}}>{education.degree}</div>
                      <div className="university-name" style={{fontSize: '12px', marginTop: '2px'}}>{education.uni}</div>
                      <div className="muted2 focus-text" style={{fontSize: '11px', marginTop: '2px'}}>{education.focus}</div>
                      <div className="education-meta" style={{marginTop: '6px', gap: '6px'}}>
                        <span className="date-range" style={{fontSize: '10px'}}>{education.start} – {education.end}</span>
                        <span className="cgpa-badge" style={{fontSize: '9px', padding: '1px 4px'}}>{education.cgpa}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card animate-entrance" style={{animationDelay: '1.2s'}}>
                  <h2 className="row" style={{fontSize:'clamp(16px,2.5vw,20px)'}}><Award size={18} className="accent"/> Achievements</h2>
                  <div className="space-y" style={{marginTop: '8px'}}>
                    {achievements.map((a, i) => (
                      <div key={i} className="row animate-entrance" style={{animationDelay: `${1.3 + (i * 0.1)}s`, gap: '8px', alignItems: 'flex-start', padding: '4px 0'}}>
                        <div className="achievement-icon" style={{padding: '4px', borderRadius: '4px'}}>
                          <Award size={14} className="accent"/>
                        </div>
                        <span className="achievement-text" style={{fontSize: '12px', lineHeight: '1.3'}}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CTA */}
            <section className={`card mt-8 center animate-entrance ${isDark ? 'data-stream' : ''}`} style={{animationDelay: '1.6s'}}>
              <h2 style={{fontSize:'clamp(18px,3vw,24px)'}}>
                "Let's connect"
              </h2>
              <p className="muted2" style={{marginTop:8, fontFamily: isDark ? 'Courier New, monospace' : 'inherit'}}>
                {isDark ? (
                  <>
                    <span className="terminal-cursor">root@security:~$</span> Open to security analyst roles, SOC operations, and threat detection projects.
                  </>
                ) : (
                  'Open to security analyst roles, SOC operations, and threat detection projects.'
                )}
              </p>
              <div className="row" style={{justifyContent:'center', marginTop:16}}>
                <a href={`mailto:${contact.email}`} className="btn-primary row">
                  <Mail size={16}/> 
                  {isDark ? (
                    <span className="terminal-cursor">Email</span>
                  ) : (
                    'Email'
                  )}
                </a>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="btn-ghost row">
                  <Linkedin size={16}/> 
                  {isDark ? (
                    <span className="terminal-cursor">LinkedIn</span>
                  ) : (
                    'LinkedIn'
                  )}
                </a>
              </div>
            </section>
          </main>

          {/* Footer */}
          <footer className="container center" style={{paddingBottom:40, color:'var(--muted)'}}>
            © {new Date().getFullYear()} Pranav Kalidas. All rights reserved.
          </footer>
        </>
      )}
    </div>
  );
}
