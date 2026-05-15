import {
  Component, AfterViewInit, ChangeDetectionStrategy
} from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-experience',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section experience" id="experience">
      <div class="section-divider"></div>

      <div class="experience__header">
        <span class="section__eyebrow">03. Experience</span>
        <h2 class="section__title">Journey so far.</h2>
      </div>
        <p class="section__subtitle">
          From internships and leadership roles to hackathon podiums &mdash; here's how I've been growing.
        </p>

      <div class="experience__layout">
        <!-- Timeline -->
        <div class="experience__timeline">
          <div class="experience__track">
            <div class="experience__track-line"></div>
          </div>

          @for (job of jobs; track job.company; let i = $index) {
            <article class="experience__item" [class.experience__item--active]="i === 0">
              <div class="experience__dot">
                <div class="experience__dot-inner"></div>
              </div>
              <div class="glass-card experience__card">
                <div class="experience__card-header">
                  <div>
                    <h3 class="experience__role">{{ job.role }}</h3>
                    <p class="experience__company">
                      <span class="experience__company-name">@ {{ job.company }}</span>
                      <span class="experience__period label-mono">{{ job.period }}</span>
                    </p>
                  </div>
                  <div class="experience__badge label-mono">{{ job.type }}</div>
                </div>

                <ul class="experience__bullets">
                  @for (bullet of job.bullets; track bullet) {
                    <li>
                      <span class="experience__bullet-arrow">▹</span>
                      {{ bullet }}
                    </li>
                  }
                </ul>

                <div class="experience__tags">
                  @for (tag of job.stack; track tag) {
                    <span class="experience__tag label-mono">{{ tag }}</span>
                  }
                </div>
              </div>
            </article>
          }
        </div>

        <!-- Education sidebar -->
        <aside class="experience__sidebar">
          <div class="glass-card experience__edu-card">
            <span class="section__eyebrow">Education</span>
            <h3 class="experience__edu-degree">B.E. Computer Science &amp; Engineering</h3>
            <p class="experience__edu-school">LICET — Loyola-ICAM College of Engg &amp; Tech</p>
            <p class="experience__edu-period label-mono">2023 – Present · Chennai</p>
            <div class="experience__edu-gpa">
              <span class="experience__edu-gpa-label">CGPA</span>
              <span class="experience__edu-gpa-value">8.0 / 10</span>
            </div>
          </div>

          <div class="glass-card experience__cert-card">
            <span class="section__eyebrow">Certifications</span>
            <ul class="experience__cert-list">
              @for (cert of certs; track cert.name) {
                <li class="experience__cert-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <div>
                    <p class="experience__cert-name">{{ cert.name }}</p>
                    <p class="experience__cert-issuer label-mono">{{ cert.issuer }} · {{ cert.year }}</p>
                  </div>
                </li>
              }
            </ul>
          </div>
        </aside>
      </div>
    </section>
  `,
  styles: [`
    .experience {
      background: var(--bg-primary);

      &__header { max-width: 700px; margin-bottom: clamp(3rem, 6vh, 5rem); }

      &__layout {
        display: grid;
        grid-template-columns: 1fr 340px;
        gap: 3rem;
        align-items: start;

        @media (max-width: 1024px) {
          grid-template-columns: 1fr;
        }
      }

      &__timeline {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
        padding-left: 2.5rem;
      }

      &__track {
        position: absolute;
        left: 8px;
        top: 0; bottom: 0;
        width: 2px;
      }

      &__track-line {
        width: 100%;
        height: 0;
        background: linear-gradient(to bottom, var(--accent), transparent);
        border-radius: 1px;
        transition: height 1.5s ease;
      }

      &__item {
        position: relative;
        opacity: 0;
        transform: translateX(-20px);

        &--active .experience__dot-inner {
          background: var(--accent);
          box-shadow: 0 0 12px rgba(100,255,218,0.6);
          animation: dotPulse 2s ease-in-out infinite;
        }
      }

      &__dot {
        position: absolute;
        left: -2.5rem;
        top: 1.5rem;
        width: 18px; height: 18px;
        border-radius: 50%;
        border: 2px solid var(--glass-border);
        background: var(--bg-primary);
        display: flex; align-items: center; justify-content: center;
        z-index: 1;
        transition: border-color 0.3s;

        &-inner {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--text-secondary);
          transition: all 0.3s;
        }
      }

      &__item:hover .experience__dot { border-color: var(--accent); }
      &__item:hover .experience__dot-inner { background: var(--accent); }

      &__card {
        padding: 1.75rem 2rem;

        &-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }
      }

      &__role {
        font-size: 1.1rem;
        color: var(--text-bright);
        font-weight: 600;
        margin-bottom: 0.25rem;
      }

      &__company {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.75rem;

        &-name { color: var(--accent); font-size: 0.95rem; }
      }

      &__period { color: var(--text-secondary); font-size: 0.78rem; }

      &__badge {
        font-size: 0.7rem;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        border: 1px solid var(--glass-border);
        color: var(--text-secondary);
        white-space: nowrap;
      }

      &__bullets {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        margin-bottom: 1.25rem;

        li {
          display: flex;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      }

      &__bullet-arrow { color: var(--accent); flex-shrink: 0; margin-top: 0.05em; }

      &__tags {
        display: flex; flex-wrap: wrap; gap: 0.5rem;
      }

      &__tag {
        font-size: 0.7rem;
        color: var(--accent);
        border: 1px solid rgba(100,255,218,0.15);
        border-radius: 4px;
        padding: 0.2rem 0.5rem;
        letter-spacing: 0.04em;
      }

      // ── Sidebar ────────────────────────────────────────────────────────
      &__sidebar { display: flex; flex-direction: column; gap: 1.5rem; }

      &__edu-card {
        padding: 2rem;
        display: flex; flex-direction: column; gap: 0.5rem;

        .section__eyebrow { margin-bottom: 0.75rem; }
      }

      &__edu-degree {
        font-size: 1.05rem;
        color: var(--text-bright);
        font-weight: 600;
      }
      &__edu-school { color: var(--accent); font-size: 0.9rem; }
      &__edu-period { color: var(--text-secondary); margin-top: 0.15rem; }
      &__edu-gpa {
        display: flex; justify-content: space-between;
        margin-top: 1rem;
        padding-top: 1rem;
        border-top: 1px solid var(--glass-border);
        &-label { font-size: 0.8rem; color: var(--text-secondary); }
        &-value { font-family: 'Space Grotesk', sans-serif; font-size: 1.25rem; color: var(--accent); font-weight: 700; }
      }

      &__cert-card {
        padding: 2rem;
        .section__eyebrow { margin-bottom: 1rem; }
      }

      &__cert-list { list-style: none; display: flex; flex-direction: column; gap: 1rem; }

      &__cert-item {
        display: flex; gap: 0.75rem; align-items: flex-start;
        svg { flex-shrink: 0; margin-top: 2px; }
      }

      &__cert-name { font-size: 0.875rem; color: var(--text-primary); font-weight: 500; }
      &__cert-issuer { font-size: 0.72rem; color: var(--text-secondary); margin-top: 0.15rem; }
    }

    @keyframes dotPulse {
      0%, 100% { box-shadow: 0 0 12px rgba(100,255,218,0.6); }
      50%       { box-shadow: 0 0 24px rgba(100,255,218,0.9); }
    }
  `]
})
export class ExperienceComponent implements AfterViewInit {
  jobs = [
    {
      role: 'AIML Intern',
      company: 'Infosys Springboard',
      period: 'Oct 2024 – Dec 2024',
      type: 'Internship',
      bullets: [
        'Completed intensive AIML internship program covering 19 courses on Infosys Springboard platform.',
        'Worked on AI & Machine Learning fundamentals, building hands-on projects using Python and ML frameworks.',
        'Strengthened skills in data processing, model training, and deploying basic intelligent systems.',
        'Collaborated with peers on applied AI problem-solving exercises and technical assessments.',
      ],
      stack: ['Python', 'Machine Learning', 'AI', 'Infosys Springboard'],
    },
    {
      role: 'DALIT Committee Coordinator',
      company: 'AICUF — LICET',
      period: '2024 – 2025',
      type: 'Leadership',
      bullets: [
        'Coordinated the Dalit Committee for AICUF at LICET, managing social impact initiatives and community outreach.',
        'Conducted Master of Ceremony for multiple college-level events, demonstrating strong public speaking skills.',
        'Organised the Tribal Visit to Pulikundram, leading a team of students for grassroots community engagement.',
        'Participated in the Planting 1 Crore Trees initiative as part of AICUF\'s environmental sustainability drive.',
      ],
      stack: ['Leadership', 'Event Management', 'Communication', 'Community Service'],
    },
    {
      role: 'Hackathon Achiever',
      company: 'Multiple Institutions',
      period: '2023 – 2026',
      type: 'Competitions',
      bullets: [
        '🥇 1st Prize — Carpe Diem 2023 hackathon, competing against college teams across disciplines.',
        '🥉 3rd Prize — Ctrl + Alt + Hack hackathon, building a rapid-prototype solution under pressure.',
        'Top 10 — Envision 2023, securing 9th prize in a competitive innovation challenge.',
        'Spark Challenge — Participated in the 24-hour design thinking hackathon hosted by Intellect Design Arena Ltd (25–26 March 2026), applying the full design thinking process and leveraging Purple Fabric AI to build our solution.',
        '📄 Paper Presentation — Sairam Institute of Technology on MEENAVAN maritime AI system.',
      ],
      stack: ['Python', 'AI', 'Computer Vision', 'Research', 'Teamwork'],
    },
  ];

  certs = [
    { name: 'AIML — 19 Courses Completed', issuer: 'Infosys Springboard', year: '2024' },
    { name: 'Basics of Python', issuer: 'Infosys Springboard', year: '2024' },
    { name: 'Introduction to AI', issuer: 'IBM Skills Build', year: '2024' },
    { name: 'AI & ML Program', issuer: 'Elevate Labs', year: '2024' },
  ];

  ngAfterViewInit() {
    // Animate track line
    ScrollTrigger.create({
      trigger: '.experience__timeline',
      start: 'top 70%',
      onEnter: () => {
        gsap.to('.experience__track-line', { height: '100%', duration: 1.5, ease: 'power2.out' });
      }
    });

    // Animate items sequentially
    gsap.to('.experience__item', {
      x: 0, opacity: 1, stagger: 0.25, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.experience__timeline', start: 'top 75%' }
    });

    // Sidebar cards
    gsap.fromTo('.experience__sidebar > *',
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.experience__sidebar', start: 'top 80%' }
      }
    );
  }
}
