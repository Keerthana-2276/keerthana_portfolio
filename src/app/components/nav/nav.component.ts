import {
  Component, signal, HostListener, ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="nav" [class.nav--scrolled]="scrolled()">
      <div class="nav__logo">
        <span class="nav__logo-bracket">&lt;</span>
        <span class="nav__logo-name">K</span>
        <span class="nav__logo-bracket">/&gt;</span>
      </div>

      <ul class="nav__links" [class.nav__links--open]="menuOpen()">
        @for (item of navItems; track item.anchor) {
          <li>
            <a [href]="'#' + item.anchor" class="nav__link" (click)="closeMenu()">
              <span class="nav__link-num">{{ item.num }}.</span>
              {{ item.label }}
            </a>
          </li>
        }
        <li>
          <a href="mailto:Keerthanas.27csa&#64;licet.ac.in" class="btn-primary magnetic">Connect</a>
        </li>
      </ul>

      <button class="nav__theme-toggle magnetic" (click)="toggleTheme()" [attr.aria-label]="'Switch to ' + (isDark() ? 'light' : 'dark') + ' mode'">
        @if (isDark()) {
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
          </svg>
        } @else {
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        }
      </button>

      <button class="nav__burger magnetic" (click)="toggleMenu()" [attr.aria-label]="menuOpen() ? 'Close menu' : 'Open menu'">
        <span [class.open]="menuOpen()"></span>
      </button>
    </nav>
  `,
  styles: [`
    .nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1.5rem clamp(1.5rem, 6vw, 4rem);
      background: transparent;
      transition: background 0.4s ease, padding 0.4s ease, backdrop-filter 0.4s ease;

      &--scrolled {
        background: var(--nav-bg);
        backdrop-filter: blur(20px) saturate(200%);
        -webkit-backdrop-filter: blur(20px) saturate(200%);
        padding: 1rem clamp(1.5rem, 6vw, 4rem);
        box-shadow: 0 2px 20px var(--shadow);
        border-bottom: 1px solid var(--glass-border);
      }
    }

    .nav__logo {
      font-family: 'JetBrains Mono', monospace;
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: -0.02em;

      &-bracket { color: var(--accent); }
      &-name    { color: var(--text-bright); }
    }

    .nav__links {
      display: flex;
      align-items: center;
      gap: 2.5rem;
      list-style: none;

      @media (max-width: 768px) {
        position: fixed;
        inset: 0;
        flex-direction: column;
        justify-content: center;
        background: var(--bg-secondary);
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999;

        &--open { transform: translateX(0); }
      }
    }

    .nav__link {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.2s ease;
      letter-spacing: 0.02em;

      &:hover { color: var(--accent); }

      &-num {
        color: var(--accent);
        margin-right: 0.3rem;
        font-size: 0.75rem;
      }

      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
    }

    .nav__theme-toggle {
      background: transparent;
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      color: var(--accent);
      width: 40px; height: 40px;
      display: flex; align-items: center; justify-content: center;
      transition: all 0.2s;

      &:hover { border-color: var(--accent); background: rgba(100,255,218,0.08); }
    }

    .nav__burger {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: none;
      border: none;
      padding: 8px;
      z-index: 1001;

      span, span::before, span::after {
        display: block;
        width: 24px; height: 2px;
        background: var(--text-primary);
        border-radius: 2px;
        transition: all 0.3s ease;
        content: '';
        position: relative;
      }
      span::before { top: -8px; }
      span::after  { top: 6px; }
      span.open { background: transparent; }
      span.open::before { transform: rotate(45deg); top: 0; }
      span.open::after  { transform: rotate(-45deg); top: -2px; }

      @media (max-width: 768px) { display: flex; }
    }

    .btn-primary {
      padding: 0.6rem 1.25rem;
      font-size: 0.8rem;
    }
  `]
})
export class NavComponent {
  scrolled  = signal(false);
  isDark    = signal(true);
  menuOpen  = signal(false);

  navItems = [
    { num: '01', label: 'Stack',      anchor: 'stack' },
    { num: '02', label: 'Lab',        anchor: 'lab' },
    { num: '03', label: 'Experience', anchor: 'experience' },
    { num: '04', label: 'Connect',    anchor: 'connect' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 80);
  }

  toggleTheme() {
    const dark = !this.isDark();
    this.isDark.set(dark);
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu()  { this.menuOpen.set(false); }
}
