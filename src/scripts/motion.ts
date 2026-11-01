/**
 * Shared motion + interaction helpers.
 *
 * Every effect here is progressive: content is readable with JS disabled, the
 * whole module no-ops under `prefers-reduced-motion`, and pointer effects only
 * attach on devices that actually have a fine pointer.
 */

const reducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* -------------------------------------------------------------------------- */
/* Scroll reveal                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Adds `.is-visible` to `.reveal` elements as they enter the viewport.
 * Elements are unobserved once shown, so this costs nothing after first paint.
 */
export function reveal(): void {
  const items = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)');
  if (!items.length) return;

  if (reducedMotion() || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    // Trigger slightly before the element reaches the fold.
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  items.forEach((el) => observer.observe(el));
}

/* -------------------------------------------------------------------------- */
/* 3D tilt                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Pointer-tracked tilt for `[data-tilt]` elements.
 *
 * The rotation is written as CSS custom properties rather than inline
 * transforms, so the stylesheet keeps ownership of the transform and can
 * neutralise it wholesale for reduced motion.
 *
 * Only attached on fine-pointer devices: on touch, a tilt that follows the
 * finger fights scrolling and never resolves to a resting state.
 */
export function tilt(): void {
  if (reducedMotion()) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const max = Number(el.dataset.tiltMax ?? 8);
    let frame = 0;

    const move = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = el.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;

        el.style.setProperty('--tilt-ry', `${(px - 0.5) * 2 * max}deg`);
        el.style.setProperty('--tilt-rx', `${(0.5 - py) * 2 * max}deg`);
        el.style.setProperty('--tilt-mx', `${px * 100}%`);
        el.style.setProperty('--tilt-my', `${py * 100}%`);
      });
    };

    const enter = () => el.classList.add('is-tilting');

    const leave = () => {
      el.classList.remove('is-tilting');
      el.style.setProperty('--tilt-ry', '0deg');
      el.style.setProperty('--tilt-rx', '0deg');
      el.style.setProperty('--tilt-mx', '50%');
      el.style.setProperty('--tilt-my', '50%');
    };

    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
  });
}

/* -------------------------------------------------------------------------- */
/* Scroll progress bar                                                        */
/* -------------------------------------------------------------------------- */

/** Fills the top hairline as the document scrolls. */
export function scrollProgress(): void {
  const bar = document.getElementById('scrollBar');
  if (!bar) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
    bar.style.transform = `scaleX(${ratio})`;
  };

  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
}

/* -------------------------------------------------------------------------- */
/* Active nav link                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Highlights the nav item for whichever section owns the middle of the screen.
 * `rootMargin` biases the observer band to the upper-middle of the viewport,
 * which matches where people actually read.
 */
export function activeNav(): void {
  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('.nav-link')
  );
  if (!links.length) return;

  const byId = new Map<string, HTMLAnchorElement>();
  const sections: HTMLElement[] = [];

  for (const link of links) {
    const id = link.getAttribute('href')?.replace('#', '');
    if (!id) continue;
    const section = document.getElementById(id);
    if (!section) continue;
    byId.set(id, link);
    sections.push(section);
  }

  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        links.forEach((l) => l.classList.remove('is-active'));
        byId.get(entry.target.id)?.classList.add('is-active');
      }
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* -------------------------------------------------------------------------- */
/* Parallax                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * Writes a per-element vertical offset into `--parallax` (in px) based on how
 * far the element sits from the viewport centre. `data-parallax` is the
 * strength multiplier.
 */
export function parallax(): void {
  const items = document.querySelectorAll<HTMLElement>('[data-parallax]');
  if (!items.length || reducedMotion()) return;

  let frame = 0;

  const update = () => {
    frame = 0;
    const mid = window.innerHeight / 2;
    for (const el of items) {
      const rect = el.getBoundingClientRect();
      const strength = Number(el.dataset.parallax ?? 0);
      const offset = ((rect.top + rect.height / 2 - mid) / mid) * strength;
      el.style.setProperty('--parallax', String(-offset));
    }
  };

  const schedule = () => {
    if (frame) return;
    frame = requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
}

/* -------------------------------------------------------------------------- */
/* Toast                                                                      */
/* -------------------------------------------------------------------------- */

let toastTimer = 0;

/** Shows the shared toast element (rendered once in the page shell). */
export function toast(message: string): void {
  const el = document.getElementById('toast');
  const text = document.getElementById('toastMessage');
  if (!el || !text) return;

  text.textContent = message;
  el.classList.add('is-visible');

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => el.classList.remove('is-visible'), 2600);
}

/* -------------------------------------------------------------------------- */
/* Copy to clipboard                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Delegated handler for `[data-copy]`.
 *
 * Falls back to a hidden textarea + `execCommand` because `navigator.clipboard`
 * is unavailable on insecure origins — and a portfolio is often opened over
 * plain http on a phone hotspot.
 */
export function copyHandlers(): void {
  document.addEventListener('click', async (event) => {
    const trigger = (event.target as HTMLElement).closest<HTMLElement>('[data-copy]');
    if (!trigger) return;

    const value = trigger.dataset.copy;
    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const area = document.createElement('textarea');
      area.value = value;
      area.setAttribute('readonly', '');
      area.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(area);
      area.select();
      try {
        document.execCommand('copy');
      } catch {
        toast('Copy failed — select the text manually');
        area.remove();
        return;
      }
      area.remove();
    }

    toast(`Copied: ${value}`);
  });
}

/* -------------------------------------------------------------------------- */
/* Bootstrap                                                                  */
/* -------------------------------------------------------------------------- */

/** Wires the effects that apply to the whole page. */
export function initPage(): void {
  reveal();
  scrollProgress();
  activeNav();
  parallax();
  copyHandlers();
}
