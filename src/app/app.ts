import { Component, HostListener, OnInit, signal } from '@angular/core';
import { CursorComponent }     from './components/cursor/cursor.component';
import { NavComponent }        from './components/nav/nav.component';
import { HeroComponent }       from './components/hero/hero.component';
import { StackComponent }      from './components/stack/stack.component';
import { LabComponent }        from './components/lab/lab.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ConnectComponent }    from './components/connect/connect.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CursorComponent,
    NavComponent,
    HeroComponent,
    StackComponent,
    LabComponent,
    ExperienceComponent,
    ConnectComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly scrollProgress = signal(0);
  protected readonly orbX = signal(0);
  protected readonly orbY = signal(0);
  protected readonly showLoader = signal(false);
  private readonly loaderStorageKey = 'keerthana-portfolio-loader-seen-v1';

  ngOnInit(): void {
    let hasSeenLoader = false;
    try {
      hasSeenLoader = localStorage.getItem(this.loaderStorageKey) === '1';
    } catch {
      hasSeenLoader = false;
    }

    if (!hasSeenLoader) {
      this.showLoader.set(true);
      setTimeout(() => {
        this.showLoader.set(false);
        try {
          localStorage.setItem(this.loaderStorageKey, '1');
        } catch {
          // Ignore storage errors and continue without persistence.
        }
      }, 300);
    }
  }

  protected progressScale(): string {
    return `scaleX(${this.scrollProgress()})`;
  }

  @HostListener('window:scroll')
  onScroll() {
    const h = document.documentElement;
    const total = h.scrollHeight - h.clientHeight;
    const value = total > 0 ? window.scrollY / total : 0;
    this.scrollProgress.set(Math.max(0, Math.min(1, value)));
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    this.orbX.set(e.clientX);
    this.orbY.set(e.clientY);
  }
}

