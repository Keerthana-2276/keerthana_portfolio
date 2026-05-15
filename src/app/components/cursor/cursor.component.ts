import {
  Component, OnDestroy, ElementRef, ViewChild,
  AfterViewInit, NgZone, ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-cursor',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div #dot class="cursor-dot"></div>
    <div #ring class="cursor-ring"></div>
  `,
  styles: [`
    .cursor-dot {
      position: fixed;
      top: 0; left: 0;
      width: 8px; height: 8px;
      background: var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      transition: opacity 0.2s, width 0.2s, height 0.2s, background 0.2s;
      will-change: transform;
      mix-blend-mode: screen;
    }
    .cursor-ring {
      position: fixed;
      top: 0; left: 0;
      width: 40px; height: 40px;
      border: 1.5px solid var(--accent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 99998;
      transform: translate(-50%, -50%);
      transition: opacity 0.2s, width 0.25s, height 0.25s, border-color 0.2s;
      will-change: transform;
      opacity: 0.6;
    }
    :host-context(body.cursor-hover) .cursor-dot {
      width: 12px; height: 12px;
    }
    :host-context(body.cursor-hover) .cursor-ring {
      width: 60px; height: 60px;
      border-color: var(--accent-2);
      opacity: 0.9;
    }
  `]
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dot') dotRef!: ElementRef<HTMLDivElement>;
  @ViewChild('ring') ringRef!: ElementRef<HTMLDivElement>;

  private dotX = 0; private dotY = 0;
  private ringX = 0; private ringY = 0;
  private mouseX = 0; private mouseY = 0;
  private rafId = 0;
  private magneticTeardown: Array<() => void> = [];

  private onMouseMove = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  private onMouseEnter = () => document.body.classList.add('cursor-hover');
  private onMouseLeave = () => document.body.classList.remove('cursor-hover');

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('mousemove', this.onMouseMove, { passive: true });

      const interactables = 'a, button, [role="button"], input, textarea, .magnetic';
      document.querySelectorAll(interactables).forEach(el => {
        el.addEventListener('mouseenter', this.onMouseEnter);
        el.addEventListener('mouseleave', this.onMouseLeave);
      });

      this.setupMagneticElements();

      const animate = () => {
        // Dot follows instantly
        this.dotX += (this.mouseX - this.dotX) * 0.85;
        this.dotY += (this.mouseY - this.dotY) * 0.85;
        // Ring lags behind
        this.ringX += (this.mouseX - this.ringX) * 0.12;
        this.ringY += (this.mouseY - this.ringY) * 0.12;

        if (this.dotRef?.nativeElement) {
          this.dotRef.nativeElement.style.transform =
            `translate(${this.dotX - 4}px, ${this.dotY - 4}px)`;
        }
        if (this.ringRef?.nativeElement) {
          this.ringRef.nativeElement.style.transform =
            `translate(${this.ringX - 20}px, ${this.ringY - 20}px)`;
        }
        this.rafId = requestAnimationFrame(animate);
      };
      animate();
    });
  }

  private setupMagneticElements() {
    const magnets = document.querySelectorAll<HTMLElement>('.magnetic');
    magnets.forEach((el) => {
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        const strength = Math.min(rect.width, rect.height) > 56 ? 0.28 : 0.18;
        const tx = relX * strength;
        const ty = relY * strength;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      };

      const onLeave = () => {
        el.style.transform = 'translate3d(0, 0, 0)';
      };

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      this.magneticTeardown.push(() => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      });
    });
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
    document.removeEventListener('mousemove', this.onMouseMove);
    this.magneticTeardown.forEach(fn => fn());
  }
}
