import { useEffect, useState } from "react";
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
  Clock
} from "lucide-react";

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    // Ensure Tailwind dark mode works: requires tailwind.config.js -> darkMode: 'class'
    const prefers = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored = localStorage.getItem('theme');
    const initialDark = stored ? stored === 'dark' : prefers;
    document.documentElement.classList.toggle('dark', initialDark);
    document.body.classList.toggle('dark', initialDark); // extra safety for some setups
    setIsDark(initialDark);
  }, []);

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



      {/* Background */}
      <div className="bg" style={{backgroundColor: '#fefce8'}}>
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
                Pranav Kalidas <span className="accent">✦</span>
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
            <button onClick={generateResumePDF} className="btn-primary row"><Award size={16}/> Download Resume (PDF)</button>
          </div>
        </div>
      </header>

      {/* Summary */}
      <main className="container" style={{paddingBottom: 64}}>
        <section className="card">
          <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}><Shield size={20} className="accent"/> Professional Summary</h2>
          <p style={{marginTop:12}}>
            Security Analyst with 1.8 years of hands-on SOC experience: monitoring, triaging, and responding to alerts. Skilled in threat detection, incident response, and remediation to safeguard enterprise infrastructure. Calm under pressure, collaborative with L2/L3, and consistently on-time against SLAs.
          </p>
        </section>

        {/* Experience & Skills */}
        <section className="grid-main mt-8">
          <div className="card">
            <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}><Briefcase size={20} className="accent"/> Experience</h2>
            <div className="space-y mt-6">
              {[...experience].map((exp, idx) => (
                <div key={idx} className="card experience-card">
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
          <div className="card">
            <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}><Code2 size={20} className="accent"/> Skills</h2>
            <div className="mt-6" style={{display:'flex', flexWrap:'wrap', gap:8}}>
              {skills.map(s => <span key={s} className="skill">{s}</span>)}
            </div>
          </div>
        </section>

        {/* Certifications Badge Wall */}
        <section className="card mt-8">
          <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}><Award size={20} className="accent"/> Certifications & Badge Wall</h2>
          <div className="grid-tiles mt-6">
            {certifications.map((c, i) => (
              <div key={i} className="card" style={{display:'flex', alignItems:'center', gap:12}}>
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
        <section className="card mt-8">
          <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}><Code2 size={20} className="accent"/> Tools & Technologies</h2>
          <div className="grid-tiles-3 mt-6">
            {tools.map((t, i) => (
              <div key={i} className="card">
                <div style={{fontWeight:600}}>{t.name}</div>
                <div className="muted" style={{fontSize:14, marginTop:6}}>{t.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Threat Timeline */}
        <section className="card mt-8">
          <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}><Shield size={20} className="accent"/> Threat Timeline</h2>
          <div className="timeline mt-6">
            <div className="space-y">
              {incidents.map((it) => (
                <div key={it.title} className="card" style={{position:'relative'}}>
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
              ))}
            </div>
          </div>
        </section>

        {/* Education & Achievements */}
        <section className="education-achievements mt-8">
          <div className="education-section">
            <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}><GraduationCap size={20} className="accent"/> Education</h2>
            <div className="education-card">
              <div className="education-icon">
                <GraduationCap size={24} className="accent"/>
              </div>
              <div className="education-content">
                <div className="degree-title">{education.degree}</div>
                <div className="university-name">{education.uni}</div>
                <div className="muted2 focus-text">{education.focus}</div>
                <div className="education-meta">
                  <span className="date-range">{education.start} – {education.end}</span>
                  <span className="cgpa-badge">{education.cgpa}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="achievements-section">
            <h2 className="row" style={{fontSize:'clamp(18px,3vw,24px)'}}><Award size={20} className="accent"/> Achievements</h2>
            <div className="achievements-grid">
              {achievements.map((a, i) => (
                <div key={i} className="achievement-item">
                  <div className="achievement-icon">
                    <Award size={18} className="accent"/>
                  </div>
                  <span className="achievement-text">{a}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="card mt-8 center">
          <h2 style={{fontSize:'clamp(18px,3vw,24px)'}}>Let’s connect</h2>
          <p className="muted2" style={{marginTop:8}}>Open to security analyst roles, SOC operations, and threat detection projects.</p>
          <div className="row" style={{justifyContent:'center', marginTop:16}}>
            <a href={`mailto:${contact.email}`} className="btn-primary row"><Mail size={16}/> Email</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="btn-ghost row"><Linkedin size={16}/> LinkedIn</a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container center" style={{paddingBottom:40, color:'var(--muted)'}}>
        © {new Date().getFullYear()} Pranav Kalidas. All rights reserved.
      </footer>
    </div>
  );
}
