import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ElementRef, ViewChild, NgZone, ChangeDetectionStrategy
} from '@angular/core';
import * as THREE from 'three';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero" id="hero">
      <canvas #canvas class="hero__canvas"></canvas>

      <div class="hero__content">
        <p class="hero__eyebrow label-mono">
          <span class="hero__eyebrow-dot"></span>
          Open to internships &amp; collaborations
        </p>

        <h1 class="hero__title display-xl">
          <span class="hero__title-line">Hi, I'm</span>
          <span class="hero__title-name gradient-text">Keerthana.</span>
        </h1>

        <h2 class="hero__subtitle display-md">
          I engineer <span class="hero__rotating-word" #rotatingWord>experiences</span>
        </h2>

        <p class="hero__desc body-lg">
          AI &amp; Computer Vision enthusiast, Full-Stack developer, and
          relentless builder. Currently pursuing B.E. CSE at LICET, Chennai &mdash;
          turning ideas into intelligent systems, one model at a time.
        </p>

        <div class="hero__cta">
          <a href="#lab" class="btn-primary magnetic">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            View My Work
          </a>
          <a href="https://github.com/Keerthana-2276" target="_blank" rel="noopener" class="hero__ghost-btn magnetic">GitHub →</a>
        </div>

        <div class="hero__stats">
          @for (stat of stats; track stat.label) {
            <div class="hero__stat">
              <span class="hero__stat-value">{{ stat.value }}</span>
              <span class="hero__stat-label">{{ stat.label }}</span>
            </div>
          }
        </div>
      </div>

      <div class="hero__scroll-indicator">
        <span class="label-mono">scroll</span>
        <div class="hero__scroll-line"></div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      overflow: hidden;

      &__canvas {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
      }

      &__content {
        position: relative;
        z-index: 2;
        padding: clamp(6rem, 12vh, 10rem) clamp(1.5rem, 8vw, 8rem);
        max-width: 900px;
      }

      &__eyebrow {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: var(--text-secondary);
        margin-bottom: 2rem;
        opacity: 0;
      }

      &__eyebrow-dot {
        width: 8px; height: 8px;
        background: var(--accent);
        border-radius: 50%;
        animation: pulse 2s ease-in-out infinite;
      }

      &__title {
        color: var(--text-bright);
        margin-bottom: 0.75rem;
        overflow: hidden;

        &-line {
          display: block;
          color: var(--text-secondary);
          font-size: 0.55em;
          font-weight: 400;
          letter-spacing: 0.05em;
        }

        &-name {
          display: block;
          line-height: 1;
        }
      }

      &__subtitle {
        color: var(--text-secondary);
        font-weight: 400;
        margin-bottom: 1.75rem;
      }

      &__rotating-word {
        color: var(--accent);
        font-weight: 600;
      }

      &__desc {
        color: var(--text-secondary);
        max-width: 52ch;
        line-height: 1.8;
        margin-bottom: 2.5rem;
        opacity: 0;
      }

      &__cta {
        display: flex;
        align-items: center;
        gap: 2rem;
        flex-wrap: wrap;
        margin-bottom: 4rem;
        opacity: 0;
      }

      &__ghost-btn {
        color: var(--text-primary);
        text-decoration: none;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.875rem;
        transition: color 0.2s;
        &:hover { color: var(--accent); }
      }

      &__stats {
        display: flex;
        gap: clamp(2rem, 5vw, 4rem);
        flex-wrap: wrap;
        opacity: 0;
      }

      &__stat {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;

        &-value {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          font-weight: 700;
          color: var(--accent);
        }

        &-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          letter-spacing: 0.05em;
        }
      }

      &__scroll-indicator {
        position: absolute;
        bottom: 3rem;
        right: clamp(1.5rem, 4vw, 4rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        z-index: 2;

        span {
          color: var(--text-secondary);
          writing-mode: vertical-rl;
          letter-spacing: 0.2em;
          font-size: 0.7rem;
        }
      }

      &__scroll-line {
        width: 1px;
        height: 80px;
        background: linear-gradient(to bottom, var(--accent), transparent);
        animation: scrollPulse 2s ease-in-out infinite;
      }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(0.85); }
    }

    @keyframes scrollPulse {
      0%, 100% { opacity: 1; transform: scaleY(1); transform-origin: top; }
      50%       { opacity: 0.3; transform: scaleY(0.5); transform-origin: top; }
    }
  `]
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('rotatingWord') wordRef!: ElementRef<HTMLSpanElement>;

  stats = [
    { value: '4',   label: 'Projects Built' },
    { value: '3',   label: 'Hackathon Prizes' },
    { value: '8.22', label: 'CGPA (Sem 5)' },
    { value: '1st', label: 'BlissBot Award' },
  ];

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private particles!: THREE.Points;
  private mouse = new THREE.Vector2();
  private target = new THREE.Vector2();
  private rafId = 0;
  private resizeObserver!: ResizeObserver;
  private isMobile = false;

  private rotatingWords = ['AI systems', 'solutions', 'the future', 'smart apps'];
  private wordIndex = 0;

  constructor(private ngZone: NgZone) {
    // Detect touch/mobile
    this.isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }

  ngAfterViewInit() {
    this.initThreeJS();
    this.initGSAP();
    this.startWordRotation();
  }

  private initThreeJS() {
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;

    // Scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
    this.camera.position.z = 4;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#64FFDA'),
      new THREE.Color('#57CBFF'),
      new THREE.Color('#BD93F9'),
      new THREE.Color('#CCD6F6'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const r = 4 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos((Math.random() * 2) - 1);

      positions[i3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i3]     = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });

    this.particles = new THREE.Points(geo, mat);
    this.scene.add(this.particles);

    this.ngZone.runOutsideAngular(() => {
      if (this.isMobile) {
        this.attachGyro();
      } else {
        window.addEventListener('mousemove', this.onMouseMove, { passive: true });
      }
      this.animate();
    });

    // Handle resize
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(canvas.parentElement!);
  }

  private onMouseMove = (e: MouseEvent) => {
    this.mouse.x = (e.clientX / window.innerWidth)  * 2 - 1;
    this.mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  };

  /** Maps device tilt (beta/gamma) to the same -1..1 mouse space. */
  private onDeviceOrientation = (e: DeviceOrientationEvent) => {
    const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
    // gamma = left/right tilt  (-90..90) → x axis
    // beta  = front/back tilt  (-180..180) → y axis, use ~-45..45 range
    const gamma = e.gamma ?? 0;   // degrees
    const beta  = e.beta  ?? 0;   // degrees
    this.mouse.x = clamp(gamma / 45, -1, 1);
    this.mouse.y = clamp((beta - 45) / 45, -1, 1); // subtract 45° so flat = neutral
  };

  /**
   * Attach the gyro listener, requesting iOS 13+ permission if necessary.
   * Falls back silently if the API is unavailable.
   */
  private attachGyro() {
    const attach = () =>
      window.addEventListener('deviceorientation', this.onDeviceOrientation, { passive: true });

    // iOS 13+ requires an explicit permission request triggered by a user gesture.
    const DOE = DeviceOrientationEvent as unknown as {
      requestPermission?: () => Promise<PermissionState>;
    };

    if (typeof DOE.requestPermission === 'function') {
      // Request on first touch
      const onFirstTouch = () => {
        DOE.requestPermission!()
          .then(state => { if (state === 'granted') attach(); })
          .catch(() => {/* permission denied, no gyro */});
        window.removeEventListener('touchstart', onFirstTouch);
      };
      window.addEventListener('touchstart', onFirstTouch, { once: true, passive: true });
    } else {
      // Android / non-gated browsers
      attach();
    }
  }

  private onResize() {
    const canvas = this.canvasRef.nativeElement;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  private animate = () => {
    this.rafId = requestAnimationFrame(this.animate);
    // Smooth mouse tracking
    this.target.x += (this.mouse.x * 0.5 - this.target.x) * 0.05;
    this.target.y += (-this.mouse.y * 0.5 - this.target.y) * 0.05;

    this.particles.rotation.y += 0.0008;
    this.particles.rotation.x = this.target.y * 0.3;
    this.particles.rotation.y += this.target.x * 0.005;

    this.renderer.render(this.scene, this.camera);
  };

  private initGSAP() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero__eyebrow', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.3)
      .fromTo('.hero__title .hero__title-line', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.5)
      .fromTo('.hero__title .hero__title-name', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.7)
      .fromTo('.hero__subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 1.0)
      .to('.hero__desc', { opacity: 1, y: 0, duration: 0.8 }, 1.2)
      .to('.hero__cta', { opacity: 1, y: 0, duration: 0.8 }, 1.4)
      .to('.hero__stats', { opacity: 1, y: 0, duration: 0.8 }, 1.6);
  }

  private startWordRotation() {
    setInterval(() => {
      if (!this.wordRef?.nativeElement) return;
      const el = this.wordRef.nativeElement;
      this.wordIndex = (this.wordIndex + 1) % this.rotatingWords.length;
      gsap.to(el, { opacity: 0, y: -10, duration: 0.3,
        onComplete: () => {
          el.textContent = this.rotatingWords[this.wordIndex];
          gsap.fromTo(el, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 });
        }
      });
    }, 2500);
  }

  ngOnDestroy() {
    cancelAnimationFrame(this.rafId);
    this.resizeObserver?.disconnect();
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('deviceorientation', this.onDeviceOrientation);
    this.renderer?.dispose();
  }
}
