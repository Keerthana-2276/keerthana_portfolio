import {
  Component, AfterViewInit, signal,
  ChangeDetectionStrategy
} from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-connect',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section connect" id="connect">
      <div class="section-divider"></div>

      <div class="connect__inner">
        <div class="connect__content">
          <span class="section__eyebrow">04. Connect</span>
          <h2 class="connect__heading display-lg">
            Let's build something <span class="gradient-text">remarkable</span> together.
          </h2>
          <p class="section__subtitle">
            Whether you have a cool project idea, an internship opportunity, or just want
            to talk AI &amp; tech — my inbox is always open.
          </p>

          <div class="connect__actions">
            <a href="mailto:Keerthanas.27csa&#64;licet.ac.in" class="btn-primary magnetic connect__email-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Say Hello
            </a>
            <a href="/assets/Keerthana-Resume.pdf" class="connect__resume-link magnetic" download="Keerthana-Resume.pdf">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </a>
          </div>

          <div class="connect__facts">
            <div class="connect__fact">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.78.68 2.62a2 2 0 0 1-.45 2.11L8 9.9a16 16 0 0 0 6.1 6.1l1.45-1.33a2 2 0 0 1 2.11-.45c.84.33 1.72.56 2.62.68A2 2 0 0 1 22 16.92z"/></svg>
              <span>+91 7558163511</span>
            </div>
            <div class="connect__fact">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>Chennai, India</span>
            </div>
          </div>
        </div>

        <div class="connect__social-panel glass-card">
          <p class="connect__social-label label-mono">Find me on</p>
          <div class="connect__socials">
            @for (link of socials; track link.label) {
              <a [href]="link.url" target="_blank" rel="noopener"
                 class="connect__social-item magnetic"
                 [attr.aria-label]="link.label">
                <div class="connect__social-icon" aria-hidden="true">
                  @switch (link.kind) {
                    @case ('linkedin') {
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                        <circle cx="4" cy="4" r="2"/>
                      </svg>
                    }
                    @case ('github') {
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                      </svg>
                    }
                    @default {
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    }
                  }
                </div>
                <div class="connect__social-info">
                  <span class="connect__social-name">{{ link.label }}</span>
                  <span class="connect__social-handle label-mono">{{ link.handle }}</span>
                </div>
                <svg class="connect__social-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            }
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="connect__footer">
        <p class="label-mono">
          Designed & Built by
          <span class="connect__footer-name">Keerthana</span>
          · {{ year }}
        </p>
        <p class="connect__footer-sub label-mono">
          Built with Angular {{ angularVersion }} · GSAP · Three.js
        </p>
      </footer>
    </section>
  `,
  styles: [`
    .connect {
      background: var(--bg-secondary);
      min-height: 80vh;
      display: flex;
      flex-direction: column;
      justify-content: center;

      &__inner {
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: 4rem;
        align-items: center;
        margin-bottom: 5rem;

        @media (max-width: 900px) {
          grid-template-columns: 1fr;
          gap: 3rem;
        }
      }

      &__content { display: flex; flex-direction: column; gap: 1.5rem; }

      &__heading {
        color: var(--text-bright);
        line-height: 1.15;
      }

      &__actions {
        display: flex;
        align-items: center;
        gap: 2rem;
        flex-wrap: wrap;
        margin-top: 0.5rem;
      }

      &__email-btn { padding: 1rem 2.5rem; font-size: 1rem; }

      &__resume-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--text-secondary);
        text-decoration: none;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.875rem;
        transition: color 0.2s;
        border-bottom: 1px solid transparent;

        &:hover { color: var(--accent); border-bottom-color: var(--accent); }
      }

      &__facts {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        margin-top: 0.35rem;
      }

      &__fact {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        border: 1px solid var(--glass-border);
        border-radius: 999px;
        padding: 0.34rem 0.72rem;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.72rem;
        color: var(--text-secondary);

        svg {
          width: 13px;
          height: 13px;
          color: var(--accent);
        }
      }

      // ── Social Panel ──────────────────────────────────────────────
      &__social-panel {
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      &__social-label { color: var(--text-secondary); }

      &__socials { display: flex; flex-direction: column; gap: 0.75rem; }

      &__social-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        border-radius: 10px;
        text-decoration: none;
        transition: background 0.2s;
        border: 1px solid transparent;

        &:hover {
          background: rgba(100,255,218,0.06);
          border-color: var(--glass-border);

          .connect__social-arrow { transform: translateX(4px); }
        }
      }

      &__social-icon {
        width: 40px; height: 40px;
        border-radius: 10px;
        background: rgba(100,255,218,0.08);
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        color: var(--accent);

        svg { width: 20px; height: 20px; }
      }

      &__social-info { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; }
      &__social-name { font-size: 0.9rem; color: var(--text-primary); font-weight: 500; }
      &__social-handle { font-size: 0.75rem; color: var(--text-secondary); }

      &__social-arrow {
        color: var(--text-secondary);
        transition: transform 0.2s;
        flex-shrink: 0;
      }

      // ── Footer ────────────────────────────────────────────────────
      &__footer {
        border-top: 1px solid var(--glass-border);
        padding-top: 2rem;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.5rem;
        color: var(--text-secondary);
        font-size: 0.78rem;
      }

      &__footer-name { color: var(--accent); }
      &__footer-sub  { color: var(--text-secondary); opacity: 0.6; }
    }
  `]
})
export class ConnectComponent implements AfterViewInit {
  year = new Date().getFullYear();
  angularVersion = '21';

  socials = [
    {
      kind: 'linkedin',
      label: 'LinkedIn',
      handle: 's-keerthana-4a0451280',
      url: 'https://www.linkedin.com/in/keerthana-s-4a0451280/'
    },
    {
      kind: 'github',
      label: 'GitHub',
      handle: 'Keerthana-2276',
      url: 'https://github.com/Keerthana-2276'
    },
    {
      kind: 'email',
      label: 'Email',
      handle: 'Keerthanas.27csa@licet.ac.in',
      url: 'mailto:Keerthanas.27csa@licet.ac.in'
    },
  ];

  ngAfterViewInit() {
    gsap.fromTo('.connect__content > *',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.connect__inner', start: 'top 75%' }
      }
    );

    gsap.fromTo('.connect__social-panel',
      { x: 40, opacity: 0 },
      {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.connect__inner', start: 'top 70%' }
      }
    );

    gsap.fromTo('.connect__social-item',
      { x: 30, opacity: 0 },
      {
        x: 0, opacity: 1, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: '.connect__socials', start: 'top 85%' }
      }
    );
  }
}
