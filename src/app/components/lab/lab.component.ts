import {
  Component, AfterViewInit, OnDestroy, computed, signal,
  ChangeDetectionStrategy
} from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  link: string;
  repo: string;
  accent: string;
  featured: boolean;
  num: string;
  category: 'AI' | 'CV' | 'Research' | 'Chatbot';
}

@Component({
  selector: 'app-lab',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section lab" id="lab">
      <div class="section-divider"></div>

      <div class="lab__header">
        <span class="section__eyebrow">02. The Lab</span>
        <h2 class="section__title">Things I've built.</h2>
        <p class="section__subtitle">
          Real projects built from scratch — from AI-powered chatbots and
          gesture-controlled games to maritime safety systems and fitness AI.
        </p>

        <div class="lab__filters">
          @for (filter of filters; track filter) {
            <button
              type="button"
              class="lab__filter-chip magnetic"
              [class.lab__filter-chip--active]="activeFilter() === filter"
              (click)="setFilter(filter)">
              {{ filter }}
            </button>
          }
        </div>
      </div>

      <!-- Featured Projects -->
      <div class="lab__featured">
        @for (proj of filteredFeaturedProjects(); track proj.id; let i = $index) {
          <article class="lab__featured-item" [class.lab__featured-item--alt]="i % 2 !== 0">
            <div class="lab__featured-visual">
              <div class="lab__featured-screen tilt-card" [style.--proj-accent]="proj.accent">
                <div class="lab__mock-browser">
                  <div class="lab__mock-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <div class="lab__mock-content">
                    <div class="lab__mock-line" style="width:60%"></div>
                    <div class="lab__mock-line" style="width:80%"></div>
                    <div class="lab__mock-line" style="width:45%"></div>
                    <div class="lab__mock-chart"></div>
                    <div class="lab__mock-line" style="width:70%"></div>
                    <div class="lab__mock-line" style="width:55%"></div>
                  </div>
                </div>
                <div class="lab__featured-num">{{ proj.num }}</div>
              </div>
            </div>

            <div class="lab__featured-info">
              <span class="label-mono" style="color: var(--accent)">Featured Project</span>
              <span class="lab__category-pill label-mono">{{ proj.category }}</span>
              <h3 class="lab__proj-title">{{ proj.title }}</h3>
              <p class="lab__proj-tagline">{{ proj.tagline }}</p>
              <div class="glass-card lab__proj-desc-card">
                <p>{{ proj.description }}</p>
              </div>
              <div class="lab__proj-tags">
                @for (tag of proj.tags; track tag) {
                  <span class="lab__tag label-mono">{{ tag }}</span>
                }
              </div>
              <div class="lab__proj-links">
                <a [href]="proj.repo" target="_blank" rel="noopener" class="lab__icon-link magnetic" aria-label="GitHub repo">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
                <a [href]="proj.link" target="_blank" rel="noopener" class="lab__icon-link magnetic" aria-label="Live demo">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        }
      </div>

      <!-- Other Projects Grid -->
      <div class="lab__other-header">
        <span class="section__eyebrow">Other Noteworthy Projects</span>
      </div>
      <div class="lab__grid">
        @for (proj of filteredOtherProjects(); track proj.id) {
          <article class="glass-card lab__mini-card magnetic tilt-card">
            <div class="lab__mini-top">
              <span class="lab__category-pill label-mono">{{ proj.category }}</span>
              <div class="lab__proj-links">
                <a [href]="proj.repo" target="_blank" rel="noopener" class="lab__icon-link" aria-label="Repo">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
            <h3 class="lab__mini-title">{{ proj.title }}</h3>
            <p class="lab__mini-desc">{{ proj.description }}</p>
            <div class="lab__proj-tags">
              @for (tag of proj.tags; track tag) {
                <span class="lab__tag label-mono">{{ tag }}</span>
              }
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: [`
    .lab {
      background: var(--bg-secondary);

      &__header { max-width: 700px; margin-bottom: clamp(3rem, 6vh, 5rem); }

      &__filters {
        margin-top: 1.5rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
      }

      &__filter-chip {
        border: 1px solid var(--glass-border);
        background: rgba(17, 34, 64, 0.5);
        color: var(--text-secondary);
        border-radius: 999px;
        padding: 0.45rem 0.9rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.74rem;
        letter-spacing: 0.03em;
        transition: all 0.24s ease;

        &:hover {
          color: var(--accent);
          border-color: rgba(100, 255, 218, 0.5);
        }

        &--active {
          color: var(--bg-primary);
          background: linear-gradient(90deg, var(--accent), var(--accent-2));
          border-color: transparent;
          box-shadow: 0 8px 20px rgba(100, 255, 218, 0.25);
        }
      }

      // ── Featured ──────────────────────────────────────────────────
      &__featured { display: flex; flex-direction: column; gap: 6rem; margin-bottom: 6rem; }

      &__featured-item {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;

        @media (max-width: 900px) {
          grid-template-columns: 1fr;
          gap: 2rem;
        }

        &--alt {
          direction: rtl;
          > * { direction: ltr; }

          @media (max-width: 900px) { direction: ltr; }
        }
      }

      &__featured-visual { perspective: 1000px; }

      &__featured-screen {
        border-radius: 16px;
        overflow: hidden;
        border: 1px solid var(--glass-border);
        background: var(--bg-tertiary);
        position: relative;
        transform: rotateY(-5deg) rotateX(3deg);
        transition: transform 0.35s ease;
        box-shadow: 20px 20px 60px var(--shadow);
        will-change: transform;

        &:hover { transform: rotateY(0deg) rotateX(0deg); }
      }

      &__featured-num {
        position: absolute;
        bottom: 1rem;
        right: 1.5rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 4rem;
        font-weight: 700;
        color: var(--proj-accent, var(--accent));
        opacity: 0.12;
        line-height: 1;
        pointer-events: none;
      }

      // Mock browser chrome
      &__mock-browser { padding: 1.5rem; }

      &__mock-dots {
        display: flex; gap: 6px; margin-bottom: 1.25rem;
        span { width: 10px; height: 10px; border-radius: 50%; background: var(--glass-border); }
        span:nth-child(1) { background: #FF5F57; }
        span:nth-child(2) { background: #FEBC2E; }
        span:nth-child(3) { background: #28C840; }
      }

      &__mock-content { display: flex; flex-direction: column; gap: 8px; padding: 1rem 0; }

      &__mock-line {
        height: 8px;
        background: var(--glass-border);
        border-radius: 4px;
        animation: shimmer 2.5s ease-in-out infinite;
      }

      &__mock-chart {
        height: 80px;
        background: linear-gradient(135deg, rgba(100,255,218,0.1) 0%, rgba(87,203,255,0.05) 100%);
        border-radius: 8px;
        border: 1px solid var(--glass-border);
        margin: 4px 0;
        position: relative;
        overflow: hidden;

        &::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 50%;
          background: linear-gradient(180deg, transparent, rgba(100,255,218,0.08));
        }
      }

      // ── Featured Info ─────────────────────────────────────────────
      &__featured-info { display: flex; flex-direction: column; gap: 1rem; }

      &__category-pill {
        display: inline-flex;
        align-items: center;
        width: fit-content;
        font-size: 0.68rem;
        letter-spacing: 0.11em;
        color: var(--accent);
        border: 1px solid rgba(100, 255, 218, 0.25);
        background: rgba(100, 255, 218, 0.08);
        border-radius: 999px;
        padding: 0.28rem 0.62rem;
      }

      &__proj-title {
        font-size: clamp(1.5rem, 2.5vw, 2rem);
        color: var(--text-bright);
        margin-top: 0.25rem;
      }

      &__proj-tagline { font-size: 1rem; color: var(--accent); font-weight: 500; }

      &__proj-desc-card {
        padding: 1.25rem 1.5rem;
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.75;
        &:hover { transform: none; }
      }

      &__proj-tags {
        display: flex; flex-wrap: wrap; gap: 0.5rem;
        margin-top: 0.5rem;
      }

      &__tag {
        font-size: 0.72rem;
        color: var(--accent);
        letter-spacing: 0.05em;
        padding: 0.25rem 0.6rem;
        border: 1px solid rgba(100,255,218,0.2);
        border-radius: 4px;
      }

      &__proj-links { display: flex; gap: 1rem; margin-top: 0.5rem; }

      &__icon-link {
        color: var(--text-secondary);
        transition: color 0.2s, transform 0.2s;
        display: flex; align-items: center;

        &:hover { color: var(--accent); transform: translateY(-2px); }
      }

      // ── Other Grid ───────────────────────────────────────────────
      &__other-header { margin-bottom: 1.5rem; }

      &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
        gap: 1.25rem;
      }

      &__mini-card {
        padding: 1.75rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        cursor: default;
        min-height: 220px;
        transition: transform 0.3s ease, border-color 0.25s ease;
      }

      &__mini-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      &__mini-title {
        font-size: 1.05rem;
        color: var(--text-bright);
        font-weight: 600;
      }

      &__mini-desc {
        font-size: 0.875rem;
        color: var(--text-secondary);
        line-height: 1.65;
        flex: 1;
      }

      .tilt-card {
        transform-style: preserve-3d;
      }
    }

    @keyframes shimmer {
      0%, 100% { opacity: 0.4; }
      50%       { opacity: 0.8; }
    }
  `]
})
export class LabComponent implements AfterViewInit, OnDestroy {
  filters = ['All', 'AI', 'CV', 'Chatbot', 'Research'] as const;
  activeFilter = signal<(typeof this.filters)[number]>('All');
  private tiltTeardown: Array<() => void> = [];

  featuredProjects: Project[] = [
    {
      id: 1,
      num: '01',
      title: 'Gesture-Based Game Control',
      tagline: 'Hands-free gaming powered by computer vision',
      description: 'A gesture-based game control system that reimagines how we interact with games — no controller needed. Built with YOLOv8, OpenCV, MediaPipe, and Keras to detect and classify hand gestures in real-time and map them to game inputs.',
      tags: ['Python', 'YOLOv8', 'OpenCV', 'MediaPipe', 'Keras'],
      link: 'https://github.com/Keerthana-2276',
      repo: 'https://github.com/Keerthana-2276',
      accent: '#64FFDA',
      featured: true,
      category: 'CV',
    },
    {
      id: 2,
      num: '02',
      title: 'BlissBot',
      tagline: 'AI-powered mental health chatbot — 1st Place Winner',
      description: 'An empathetic AI chatbot offering emotional support, mental health resources, and conversational guidance. Secured 1st place at the hackathon. Designed with a focus on accessibility, compassionate UX, and responsible AI principles.',
      tags: ['Python', 'NLP', 'Chatbot Dev', 'AI', 'UX Design'],
      link: 'https://github.com/Keerthana-2276',
      repo: 'https://github.com/Keerthana-2276',
      accent: '#57CBFF',
      featured: true,
      category: 'Chatbot',
    },
    {
      id: 3,
      num: '03',
      title: 'Neural Gains',
      tagline: 'CV-based AI fitness coach',
      description: 'A computer vision AI assistant that analyses workout form in real-time and delivers instant posture corrections, rep counting, and personalized diet recommendations — built to replace traditional personal trainers with intelligent technology.',
      tags: ['Python', 'OpenCV', 'Computer Vision', 'ML', 'AI'],
      link: 'https://github.com/Keerthana-2276',
      repo: 'https://github.com/Keerthana-2276',
      accent: '#BD93F9',
      featured: true,
      category: 'AI',
    }
  ];

  otherProjects: Array<{
    id: number;
    title: string;
    description: string;
    tags: string[];
    repo: string;
    category: Project['category'];
  }> = [
    {
      id: 4,
      title: 'MEENAVAN',
      description: 'A GPS-enabled AI maritime safety system for fishermen, providing real-time communication, emergency response alerts, and location tracking to save lives at sea. Presented as a research paper.',
      tags: ['Python', 'GPS', 'AI', 'Research Paper'],
      repo: 'https://github.com/Keerthana-2276',
      category: 'Research',
    },
  ];

  filteredFeaturedProjects = computed(() => {
    const f = this.activeFilter();
    if (f === 'All') return this.featuredProjects;
    return this.featuredProjects.filter(p => p.category === f);
  });

  filteredOtherProjects = computed(() => {
    const f = this.activeFilter();
    if (f === 'All') return this.otherProjects;
    return this.otherProjects.filter(p => p.category === f);
  });

  setFilter(filter: (typeof this.filters)[number]) {
    this.activeFilter.set(filter);
    gsap.fromTo('.lab__featured-item, .lab__mini-card',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: 'power2.out' }
    );
  }

  ngAfterViewInit() {
    gsap.fromTo('.lab__featured-item',
      { y: 80, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.2,
        scrollTrigger: { trigger: '.lab__featured', start: 'top 80%' }
      }
    );

    gsap.fromTo('.lab__mini-card',
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7,
        ease: 'back.out(1.4)',
        scrollTrigger: { trigger: '.lab__grid', start: 'top 85%' }
      }
    );

    this.setupTiltCards();
  }

  private setupTiltCards() {
    const cards = document.querySelectorAll<HTMLElement>('.tilt-card');
    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rx = (0.5 - y) * 8;
        const ry = (x - 0.5) * 10;
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
      };

      const onLeave = () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      this.tiltTeardown.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  ngOnDestroy() {
    this.tiltTeardown.forEach(fn => fn());
  }
}
