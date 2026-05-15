import {
  Component, AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-stack',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section stack" id="stack">
      <div class="section-divider"></div>

      <div class="stack__header">
        <span class="section__eyebrow">01. The Stack</span>
        <h2 class="section__title">Technologies I command.</h2>
        <p class="section__subtitle">
          A growing toolkit forged through real projects, internships, and relentless curiosity —
          spanning AI, computer vision, full-stack development, and beyond.
        </p>
      </div>

      <div class="stack__grid">
        @for (cat of categories; track cat.title) {
          <div class="glass-card stack__card">
            <div class="stack__card-icon" aria-hidden="true">
              @switch (cat.iconType) {
                @case ('code') {
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                  </svg>
                }
                @case ('ai') {
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
                  </svg>
                }
                @case ('app') {
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="3" width="20" height="14" rx="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                }
                @default {
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3"/>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
                  </svg>
                }
              }
            </div>
            <h3 class="stack__card-title">{{ cat.title }}</h3>
            <div class="stack__skills">
              @for (skill of cat.skills; track skill.name) {
                <div class="stack__skill">
                  <div class="stack__skill-header">
                    <span class="stack__skill-name">{{ skill.name }}</span>
                    <span class="stack__skill-level label-mono">{{ skill.pct }}%</span>
                  </div>
                  <div class="stack__skill-bar">
                    <div class="stack__skill-fill" [attr.data-pct]="skill.pct"
                         [style.width.%]="0"></div>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>

      <div class="stack__tools">
        <span class="section__eyebrow">Also proficient with</span>
        <div class="stack__tool-chips">
          @for (tool of tools; track tool.name) {
            <span class="stack__chip magnetic">
              <span class="stack__chip-icon" aria-hidden="true">
                @switch (tool.iconType) {
                  @case ('git') {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3 3 12l9 9 9-9-9-9z"/><circle cx="12" cy="12" r="2"/></svg>
                  }
                  @case ('github') {
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.44 9.8 8.2 11.39.6.1.82-.26.82-.58 0-.28-.01-1.04-.02-2.05-3.34.73-4.04-1.41-4.04-1.41-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.21.08 1.85 1.25 1.85 1.25 1.08 1.85 2.83 1.31 3.52 1 .11-.79.42-1.32.77-1.62-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.39 1.24-3.24-.12-.3-.54-1.53.12-3.2 0 0 1.01-.32 3.3 1.24.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.56 3.3-1.24 3.3-1.24.66 1.67.24 2.9.12 3.2.77.85 1.24 1.92 1.24 3.24 0 4.63-2.8 5.66-5.48 5.95.43.37.82 1.11.82 2.24 0 1.62-.02 2.92-.02 3.32 0 .32.22.69.83.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"/></svg>
                  }
                  @case ('target') {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                  @case ('nodes') {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="4"/><circle cx="16" cy="8" r="4"/><circle cx="12" cy="16" r="4"/></svg>
                  }
                  @case ('hand') {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20c3-6 5-8 8-8s5 2 8 8"/><circle cx="12" cy="7" r="3"/></svg>
                  }
                  @case ('cross') {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="M8 8l8 8M16 8l-8 8"/></svg>
                  }
                  @case ('figma') {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="5" r="3"/><circle cx="15" cy="5" r="3"/><circle cx="9" cy="12" r="3"/><circle cx="15" cy="12" r="3"/><circle cx="9" cy="19" r="3"/></svg>
                  }
                  @case ('vscode') {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 3 7 8v8l10 5V3z"/><path d="m7 8-4 4 4 4"/></svg>
                  }
                  @case ('jupyter') {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M4 12h2M18 12h2M12 4v2M12 18v2"/></svg>
                  }
                  @case ('linux') {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3c3 0 5 3 5 7v6H7v-6c0-4 2-7 5-7z"/><circle cx="10" cy="10" r="1"/><circle cx="14" cy="10" r="1"/></svg>
                  }
                  @case ('triangle') {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 17 12 4l9 13H3z"/></svg>
                  }
                  @case ('panel') {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>
                  }
                  @default {
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4z"/></svg>
                  }
                }
              </span>
              <span>{{ tool.name }}</span>
            </span>
          }
        </div>
      </div>
    </section>
  `,
  styles: [`
    .stack {
      background: var(--bg-primary);

      &__header {
        max-width: 700px;
        margin-bottom: clamp(3rem, 6vh, 5rem);
      }

      &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(320px, 100%), 1fr));
        gap: 1.5rem;
        margin-bottom: 4rem;
      }

      &__card {
        padding: 2rem;
        container-type: inline-size;

        &-icon {
          width: 48px; height: 48px;
          border-radius: 12px;
          background: rgba(100,255,218,0.08);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 1.25rem;
          color: var(--accent);

          svg { width: 24px; height: 24px; }
        }

        &-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--text-bright);
          margin-bottom: 1.5rem;
        }
      }

      &__skills { display: flex; flex-direction: column; gap: 1rem; }

      &__skill-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.4rem;
      }

      &__skill-name  { font-size: 0.875rem; color: var(--text-primary); }
      &__skill-level { color: var(--accent); font-size: 0.75rem; }

      &__skill-bar {
        height: 4px;
        background: var(--bg-tertiary);
        border-radius: 2px;
        overflow: hidden;
      }

      &__skill-fill {
        height: 100%;
        background: linear-gradient(90deg, var(--accent), var(--accent-2));
        border-radius: 2px;
        transform-origin: left;
        width: 0;
        transition: width 1.2s cubic-bezier(0.4, 0, 0.2, 1);
        will-change: width;
      }

      &__tools {
        margin-top: 1rem;

        .section__eyebrow { margin-bottom: 1.5rem; }
      }

      &__tool-chips {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
      }

      &__chip {
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.78rem;
        color: var(--text-secondary);
        border: 1px solid var(--glass-border);
        border-radius: 6px;
        padding: 0.42rem 0.8rem;
        transition: all 0.2s;
        cursor: default;
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;

        &-icon {
          display: inline-flex;
          width: 14px;
          height: 14px;
          color: var(--accent);

          :is(svg) {
            width: 14px;
            height: 14px;
          }
        }

        &:hover {
          color: var(--accent);
          border-color: var(--accent);
          background: rgba(100,255,218,0.06);
        }
      }
    }
  `]
})
export class StackComponent implements AfterViewInit {
  categories = [
    {
      title: 'Frontend Engineering',
      iconType: 'code',
      skills: [
        { name: 'Python Programming', pct: 88 },
        { name: 'Java Programming', pct: 78 },
        { name: 'C Programming', pct: 75 },
        { name: 'Full Stack Development', pct: 80 },
      ]
    },
    {
      title: 'AI & Machine Learning',
      iconType: 'ai',
      skills: [
        { name: 'Machine Learning', pct: 82 },
        { name: 'Computer Vision (OpenCV / YOLOv8)', pct: 85 },
        { name: 'Gesture Recognition (MediaPipe)', pct: 84 },
        { name: 'Chatbot Development', pct: 80 },
      ]
    },
    {
      title: 'Web & App Development',
      iconType: 'app',
      skills: [
        { name: 'UI / UX Design', pct: 82 },
        { name: 'App Development', pct: 78 },
        { name: 'HTML / CSS', pct: 85 },
        { name: 'Software Testing', pct: 75 },
      ]
    },
    {
      title: 'Data & Databases',
      iconType: 'data',
      skills: [
        { name: 'MySQL', pct: 82 },
        { name: 'Data Analysis', pct: 74 },
        { name: 'Keras / TensorFlow', pct: 76 },
        { name: 'Artificial Intelligence', pct: 80 },
      ]
    }
  ];

  tools = [
    {
      name: 'Git',
      iconType: 'git'
    },
    {
      name: 'GitHub',
      iconType: 'github'
    },
    {
      name: 'YOLOv8',
      iconType: 'target'
    },
    {
      name: 'OpenCV',
      iconType: 'nodes'
    },
    {
      name: 'MediaPipe',
      iconType: 'hand'
    },
    {
      name: 'Keras',
      iconType: 'cross'
    },
    {
      name: 'Figma',
      iconType: 'figma'
    },
    {
      name: 'VS Code',
      iconType: 'vscode'
    },
    {
      name: 'Jupyter',
      iconType: 'jupyter'
    },
    {
      name: 'Linux',
      iconType: 'linux'
    },
    {
      name: 'Infosys Springboard',
      iconType: 'triangle'
    },
    {
      name: 'IBM Skills Build',
      iconType: 'panel'
    },
    {
      name: 'Elevate Labs AI',
      iconType: 'shield'
    }
  ];

  ngAfterViewInit() {
    // Animate cards in
    gsap.fromTo('.stack__card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stack__grid',
          start: 'top 80%',
        }
      }
    );

    // Animate skill bars
    ScrollTrigger.create({
      trigger: '.stack__grid',
      start: 'top 70%',
      onEnter: () => {
        document.querySelectorAll<HTMLElement>('.stack__skill-fill').forEach(el => {
          const pct = el.getAttribute('data-pct') || '0';
          gsap.to(el, { width: `${pct}%`, duration: 1.4, ease: 'power2.out', delay: 0.3 });
        });
      }
    });

    // Chips stagger
    gsap.fromTo('.stack__chip',
      { y: 20, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.04, duration: 0.5,
        scrollTrigger: { trigger: '.stack__tools', start: 'top 85%' }
      }
    );
  }
}
