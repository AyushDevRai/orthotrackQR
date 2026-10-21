"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

export interface LayerItem {
  key: string;
  tex: string;
  h: number;
  short: string;
  name: string;
  accent: string;
  role: string;
  spec: string;
  desc: string;
}

export const OTL_LAYERS: LayerItem[] = [
  { key: "substrate", tex: "/images/layers/layer-5.jpg", h: 0.16,  short: "Substrate",    name: "Prepared Substrate",        accent: "Substrate",  role: "Foundation",           spec: "",      desc: "The stable, engineered foundation the entire Orthotrack system is built upon." },
  { key: "primer",    tex: "/images/layers/layer-4.jpg", h: 0.06,  short: "Primer",       name: "Primer Layer",              accent: "Primer",     role: "Adhesion",             spec: "",      desc: "Bonds every layer above it firmly to the substrate for lasting adhesion." },
  { key: "sbr",       tex: "/images/layers/layer-3.jpg", h: 0.14,  short: "SBR Cushion",  name: "15mm SBR Cushion",          accent: "Cushion",    role: "Shock absorption",     spec: "15 mm", desc: "A rubber-crumb shock-absorbing layer that softens impact and boosts underfoot comfort." },
  { key: "coat",      tex: "/images/layers/layer-2.jpg", h: 0.07,  short: "Cushion Coat", name: "Cushion Coat",              accent: "Cushion",    role: "Sealing",              spec: "",      desc: "Fills micro-voids in the base and reinforces the structure beneath the surface layers." },
  { key: "refine",    tex: "/images/layers/layer-1.jpg", h: 0.06,  short: "Refinement",   name: "Surface Refinement",        accent: "Refinement", role: "Leveling",             spec: "",      desc: "A precisely leveled layer that smooths out texture and creates a uniform walking surface." },
  { key: "color",     tex: "/images/layers/layer-0.jpg", h: 0.08,  short: "Color Coat",   name: "Wear-Resistant Color Coat", accent: "Color",      role: "UV & wear protection", spec: "",      desc: "A UV-stable, long-lasting color layer that keeps the track vivid and durable through years of daily use." },
];

function pad(n: number) {
  return (n < 10 ? "0" : "") + n;
}

function easeIn(x: number) { return x * x * x; }
function easeOut(x: number) { return 1 - Math.pow(1 - x, 3); }
function clamp01(x: number) { return Math.max(0, Math.min(1, x)); }

export default function LayerSystem3D() {
  const rootRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const vizRef = useRef<HTMLDivElement>(null);
  const rotRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const shoeRef = useRef<HTMLDivElement>(null);
  const shoeShadowRef = useRef<HTMLDivElement>(null);
  const mPopRef = useRef<HTMLDivElement>(null);
  const mBarRef = useRef<HTMLElement>(null);
  const mStateRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const elProgRef = useRef<HTMLSpanElement>(null);
  const elToastRef = useRef<HTMLParagraphElement>(null);

  const boxRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tagRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Start with only the base layer (Prepared Substrate) built
  const [built, setBuilt] = useState(0);
  const [active, setActive] = useState(0); // Start focused on base layer
  const [isExploded, setIsExploded] = useState(false);
  const [stepping, setStepping] = useState(false);
  const steppingRef = useRef(false);
  const hasAutoStepped = useRef(false);
  const [cardSwapping, setCardSwapping] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Rotation & Drag state
  const rotState = useRef({
    rx: 58,
    rz: -42,
    dragRX: 0,
    dragRZ: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    swayT: 0,
    hasDragged: false,
  });

  const count = OTL_LAYERS.length;
  const totalH = OTL_LAYERS.reduce((acc, l) => acc + l.h, 0);

  // Cumulative heights array
  const cumHeights = useRef<number[]>([]);
  if (cumHeights.current.length === 0) {
    let running = 0;
    cumHeights.current = OTL_LAYERS.map(l => {
      running += l.h;
      return running;
    });
  }

  const triggerToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3400);
  }, []);

  // Update card with smooth swap transition
  const handleSelectLayer = (idx: number) => {
    if (idx === active) return;
    setCardSwapping(true);
    setActive(idx);
    if (idx > built) {
      setBuilt(idx);
    }
    setTimeout(() => {
      setCardSwapping(false);
    }, 180);
  };

  // Toggle Explode
  const toggleExplode = () => {
    setIsExploded(prev => {
      const next = !prev;
      if (next && built < count - 1) {
        setBuilt(count - 1);
      }
      return next;
    });
  };

  // Step Demo Simulation with Physics Rebound
  const handleFeelStep = useCallback(() => {
    if (steppingRef.current) return;
    steppingRef.current = true;
    setStepping(true);

    if (built < count - 1) setBuilt(count - 1);
    if (isExploded) setIsExploded(false);
    handleSelectLayer(2); // Focus on SBR Cushion

    setTimeout(() => {
      const scene = sceneRef.current;
      const rot = rotRef.current;
      const viz = vizRef.current;
      const shoe = shoeRef.current;
      const shoeShadow = shoeShadowRef.current;
      const mPop = mPopRef.current;
      const mBar = mBarRef.current;
      const mState = mStateRef.current;
      const topFace = boxRefs.current[count - 1]?.querySelector<HTMLElement>(".otl-top");
      const sbrBox = boxRefs.current[2];

      if (!scene || !rot || !viz || !shoe || !shoeShadow || !topFace || !sbrBox || !mPop || !mBar || !mState) {
        steppingRef.current = false;
        setStepping(false);
        return;
      }

      scene.classList.add("is-pressing");
      sbrBox.classList.add("is-glow");
      mPop.classList.add("is-show");
      triggerToast("Soft underfoot, stable overall: the 15mm SBR cushion absorbs the impact, then springs right back.");

      const T_LAND = 420;
      const T_FULL = 700;
      const T_REL = 900;
      const T_END = 2300;

      const pressAt = (t: number) => {
        if (t < T_LAND) return 0;
        if (t < T_FULL) return easeOut((t - T_LAND) / (T_FULL - T_LAND));
        if (t < T_REL) return 1;
        const d = t - T_REL;
        return Math.cos(d / 640 * 2 * Math.PI) * Math.exp(-d / 260);
      };

      const t0 = performance.now();

      const frame = (now: number) => {
        const t = now - t0;
        const S = rot.offsetWidth || 240;
        const p = pressAt(t);

        if (t >= T_LAND && !scene.classList.contains("is-stepping")) {
          scene.classList.add("is-stepping");
        }

        const maxPress = S * 0.075;
        scene.style.setProperty("--press", `${(p * maxPress).toFixed(2)}px`);
        topFace.style.setProperty("--dent", Math.max(0, p).toFixed(3));

        const vr = viz.getBoundingClientRect();
        const fr = topFace.getBoundingClientRect();
        const cx = fr.left + fr.width / 2 - vr.left;
        const cy = fr.top + fr.height * 0.5 - vr.top;
        const sw = shoe.offsetWidth;
        const sh = shoe.offsetHeight;

        let lift = 0;
        let tilt = 0;
        let op = 0;

        if (t < T_LAND) {
          const k = easeIn(t / T_LAND);
          lift = (1 - k) * S * 0.8;
          tilt = -16 + 14 * k;
          op = clamp01(t / 200);
        } else if (t < T_REL) {
          lift = 0;
          tilt = -2 + 2 * clamp01((t - T_LAND) / 200);
          op = 1;
        } else {
          const u = easeIn(clamp01((t - T_REL - 120) / 900));
          lift = u * S * 0.9;
          tilt = -10 * u;
          op = 1 - clamp01((t - T_REL - 500) / 600);
        }

        const squash = t >= T_LAND && t < T_REL ? 1 - 0.04 * Math.max(0, p) : 1;
        shoe.style.opacity = op.toFixed(3);
        shoe.style.transform = `translate(${cx - sw * 0.5}px, ${cy - sh * 0.965 - lift}px) rotate(${tilt}deg) scaleY(${squash})`;

        const near = clamp01(1 - lift / (S * 0.8));
        shoeShadow.style.opacity = (near * 0.9 * op).toFixed(3);
        shoeShadow.style.transform = `translate(${cx - shoeShadow.offsetWidth / 2}px, ${cy - shoeShadow.offsetHeight / 2}px) scale(${0.55 + 0.45 * near})`;

        sbrBox.style.setProperty("--sq", Math.max(0, p).toFixed(3));
        mBar.style.width = `${Math.max(0, p) * 92}%`;
        mState.textContent = t < T_LAND ? "Ready" : (t < T_REL ? "Compressing" : (p < -0.05 ? "Rebounding" : (t > 1700 ? "Stable" : "Recovering")));

        if (t < T_END) {
          requestAnimationFrame(frame);
        } else {
          scene.style.setProperty("--press", "0px");
          topFace.style.setProperty("--dent", "0");
          scene.classList.remove("is-pressing", "is-stepping");
          sbrBox.classList.remove("is-glow");
          shoe.style.opacity = "0";
          shoeShadow.style.opacity = "0";
          setTimeout(() => {
            mPop.classList.remove("is-show");
          }, 1400);
          steppingRef.current = false;
          setStepping(false);
        }
      };

      requestAnimationFrame(frame);
    }, 120);
  }, [built, count, isExploded, triggerToast]);

  // Pointer drag to rotate
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return;
    rotState.current.isDragging = true;
    rotState.current.dragStartX = e.clientX;
    rotState.current.dragStartY = e.clientY;
    if (vizRef.current) {
      vizRef.current.classList.add("is-dragging");
      try {
        vizRef.current.setPointerCapture(e.pointerId);
      } catch (_) {}
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!rotState.current.isDragging) return;
    const dx = e.clientX - rotState.current.dragStartX;
    const dy = e.clientY - rotState.current.dragStartY;
    rotState.current.dragRZ = dx * 0.35;
    rotState.current.dragRX = Math.max(-22, Math.min(16, -dy * 0.18));
    if (Math.abs(dx) > 6 && vizRef.current) {
      rotState.current.hasDragged = true;
      vizRef.current.classList.add("has-dragged");
    }
    applyRotation();
  };

  const onPointerUp = () => {
    rotState.current.isDragging = false;
    rotState.current.rx += rotState.current.dragRX;
    rotState.current.rz += rotState.current.dragRZ;
    rotState.current.dragRX = 0;
    rotState.current.dragRZ = 0;
    if (vizRef.current) vizRef.current.classList.remove("is-dragging");
  };

  const applyRotation = () => {
    if (!rotRef.current) return;
    const s = rotState.current;
    const sway = s.isDragging ? 0 : Math.sin(s.swayT / 2600) * 4.5;
    rotRef.current.style.setProperty("--rx", `${s.rx + s.dragRX}deg`);
    rotRef.current.style.setProperty("--rz", `${s.rz + s.dragRZ + sway}deg`);
  };

  // Position Tags at 3D slab coordinates
  const placeTags = useCallback(() => {
    const viz = vizRef.current;
    const card = cardRef.current;
    if (!viz || !card) return;
    const vr = viz.getBoundingClientRect();
    const cardLeft = card.getBoundingClientRect().left;
    let clash = false;

    boxRefs.current.forEach((b, i) => {
      const tag = tagRefs.current[i];
      if (!b || !tag) return;
      const front = b.querySelector<HTMLElement>(".otl-front");
      if (!front) return;
      const r = front.getBoundingClientRect();
      if (!r.width) return;
      tag.style.left = `${r.right - vr.left + 10}px`;
      tag.style.top = `${r.top + r.height / 2 - vr.top}px`;
      if (r.right + 10 + tag.offsetWidth > cardLeft - 8) clash = true;
    });

    const tagsWrap = viz.querySelector<HTMLElement>(".otl-tags");
    if (tagsWrap) {
      tagsWrap.style.visibility = clash ? "hidden" : "";
    }
  }, []);

  // Continuous animation loop for sway and tags
  useEffect(() => {
    let raf = 0;
    let running = true;

    const loop = (time: number) => {
      if (!running) return;
      rotState.current.swayT = time;
      applyRotation();
      placeTags();
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, [placeTags]);

  // Scroll detection within the pinned section
  useEffect(() => {
    const onScroll = () => {
      const wrap = wrapRef.current;
      const stage = stageRef.current;
      const prog = elProgRef.current;
      if (!wrap || !stage || !prog) return;

      const hdr = 74;
      const total = Math.max(1, wrap.offsetHeight - stage.offsetHeight);
      const r = wrap.getBoundingClientRect();
      const raw = (hdr - r.top) / total;
      const p = Math.max(0, Math.min(1, raw));
      prog.style.width = `${p * 100}%`;

      // When above the section or scrolling up out of it: smoothly stay at single layer 0
      if (raw <= 0) {
        setBuilt(0);
        setActive(0);
        return;
      }

      // Smooth progression: layers 0 to 5 build progressively as user scrolls down
      // and peel back cleanly in reverse when scrolling up
      const BUILD_END = 0.85;
      const idx = Math.min(count - 1, Math.max(0, Math.floor((p / BUILD_END) * count)));
      setBuilt(idx);
      setActive(idx);

      // Auto-perform Feel the step at the final scroll of the section when all layers are built
      if (p >= 0.88 && !hasAutoStepped.current && !steppingRef.current) {
        hasAutoStepped.current = true;
        handleFeelStep();
      } else if (p < 0.45) {
        hasAutoStepped.current = false;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [count, handleFeelStep]);

  const currentLayer = OTL_LAYERS[active];

  return (
    <section
      id="engineering"
      ref={rootRef}
      className="otl-root"
      aria-label="Orthotrack 3D six-layer system"
      style={{
        ["--total" as string]: totalH,
        ["--count" as string]: count,
        ["--gap" as string]: isExploded ? "calc(var(--s) * 0.42)" : "calc(var(--s) * 0.20)",
      }}
    >
      <div ref={wrapRef} className="otl-pin-wrap">
        <div ref={stageRef} className="otl-pin-stage">
          <div className="otl-bg" aria-hidden="true" />

          {/* Heading */}
          <header className="otl-head">
            <p className="otl-kicker">
              <span aria-hidden="true" />
              THOUGHTFULLY ENGINEERED
              <span aria-hidden="true" />
            </p>
            <h2 className="otl-title">
              Built In Layers. <em>Built To Perform.</em>
            </h2>
            <p className="otl-intro">
              Six layers. One considered system. Dense polyurethane finish and dedicated 15mm SBR cushioning engineered together for lasting underfoot comfort.
            </p>
          </header>

          <div className="otl-main">
            {/* Left Layer List (Top to Bottom) */}
            <ol className="otl-list" aria-label="Layers, top to bottom">
              {OTL_LAYERS.slice()
                .reverse()
                .map((l, revIdx) => {
                  const originalIdx = count - 1 - revIdx;
                  const isLayerActive = originalIdx === active;
                  const isLayerBuilt = originalIdx <= built;

                  return (
                    <li key={l.key}>
                      <button
                        type="button"
                        className={`otl-li ${isLayerBuilt ? "is-built" : ""} ${isLayerActive ? "is-active" : ""}`}
                        onClick={() => handleSelectLayer(originalIdx)}
                        aria-current={isLayerActive ? "step" : undefined}
                      >
                        <span
                          className="otl-li-swatch"
                          style={{ backgroundImage: `url(${l.tex})` }}
                          aria-hidden="true"
                        />
                        <span className="otl-li-text">
                          <span className="otl-li-num">{pad(originalIdx + 1)}</span>
                          <span className="otl-li-name">{l.short}</span>
                        </span>
                      </button>
                    </li>
                  );
                })}
            </ol>

            {/* Center 3D Visual Stage */}
            <div
              ref={vizRef}
              className={`otl-viz ${isExploded ? "is-exploded" : ""}`}
              style={{
                ["--gap" as string]: isExploded ? "calc(var(--s) * 0.42)" : "calc(var(--s) * 0.20)",
              }}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
            >
              <div className="otl-glow" aria-hidden="true" />
              <div className="otl-bignum" aria-hidden="true">
                {pad(active + 1)}
              </div>
              <div className="otl-floor" aria-hidden="true" />

              {/* 3D Scene */}
              <div className="otl-scene-wrap" aria-hidden="true">
                <div ref={rotRef} className="otl-rot">
                  <div
                    ref={sceneRef}
                    className="otl-scene"
                    style={{
                      ["--gap" as string]: isExploded ? "calc(var(--s) * 0.42)" : "calc(var(--s) * 0.20)",
                    }}
                  >
                    {OTL_LAYERS.map((l, i) => {
                      const z = cumHeights.current[i];
                      const isBoxIn = i <= built;
                      const isBoxActive = i === active;

                      return (
                        <div
                          key={l.key}
                          ref={el => { boxRefs.current[i] = el; }}
                          className={`otl-box otl-box-${l.key} ${isBoxIn ? "is-in" : ""} ${isBoxActive ? "is-active" : ""}`}
                          style={{
                            ["--h" as string]: l.h,
                            ["--z" as string]: z,
                            ["--i" as string]: i,
                            ["--tex" as string]: `url(${l.tex})`,
                          }}
                        >
                          <div className="otl-face otl-top">
                            {i === count - 1 && (
                              <>
                                <span className="otl-ripple" />
                                <span className="otl-ripple" />
                                <span className="otl-ripple" />
                              </>
                            )}
                          </div>
                          <div className="otl-face otl-front" />
                          <div className="otl-face otl-left" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Dynamic 3D Tags */}
              <div className="otl-tags" aria-hidden="true">
                {OTL_LAYERS.map((l, i) => {
                  const showTag = i <= built && (isExploded || i === active);
                  const isTagActive = i === active;

                  return (
                    <span
                      key={l.key}
                      ref={el => { tagRefs.current[i] = el; }}
                      className={`otl-tag ${showTag ? "is-show" : ""} ${isTagActive ? "is-active" : ""}`}
                    >
                      <i />
                      <b>{pad(i + 1)}</b>
                      {l.short}
                    </span>
                  );
                })}
              </div>

              {/* Interactive Controls */}
              <div className="otl-controls">
                <button
                  type="button"
                  className="otl-btn"
                  onClick={toggleExplode}
                  aria-pressed={isExploded}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3v4M12 17v4M5 9l7-3 7 3-7 3zM5 15l7 3 7-3" />
                  </svg>
                  <span>{isExploded ? "Stack view" : "Explode view"}</span>
                </button>
                <button
                  type="button"
                  className="otl-btn otl-btn-accent"
                  onClick={handleFeelStep}
                  disabled={stepping}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 3v10M8 9l4 4 4-4M4 19c2.5-2 5.2-3 8-3s5.5 1 8 3" />
                  </svg>
                  <span>Feel the step</span>
                </button>
              </div>

              <p className="otl-hint" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 12h16M8 8l-4 4 4 4M16 8l4 4-4 4" />
                </svg>
                Drag to rotate 3D view
              </p>

              {/* Realistic Shoe Vector & Shadow for Impact Strike */}
              <div ref={shoeShadowRef} className="otl-shoe-shadow" aria-hidden="true" />
              <div ref={shoeRef} className="otl-shoe" aria-hidden="true">
                <svg viewBox="0 0 320 300" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="otl-leg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#C98E6B" stopOpacity="0" />
                      <stop offset=".35" stopColor="#C98E6B" />
                      <stop offset="1" stopColor="#B57A58" />
                    </linearGradient>
                    <linearGradient id="otl-up" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#2B3442" />
                      <stop offset="1" stopColor="#141A24" />
                    </linearGradient>
                    <linearGradient id="otl-sole" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#FFFFFF" />
                      <stop offset="1" stopColor="#D9DDE3" />
                    </linearGradient>
                  </defs>
                  <path d="M92 0 L150 0 L156 132 L96 140 Z" fill="url(#otl-leg)" />
                  <path d="M92 112 L158 108 L162 160 L90 166 Z" fill="#F4F4F5" />
                  <path d="M92 120 L159 116" stroke="#EA4F16" strokeWidth="5" />
                  <path d="M91 130 L160 126" stroke="#EA4F16" strokeWidth="3" />
                  <path d="M82 158 C 84 146, 98 142, 112 146 L 160 150 C 176 152, 186 170, 204 182 C 228 198, 268 204, 290 220 C 304 230, 306 248, 296 256 L 64 256 C 56 238, 60 196, 82 158 Z" fill="url(#otl-up)" />
                  <path d="M244 206 C 270 210, 296 222, 298 244 L 298 256 L 236 256 C 232 236, 234 218, 244 206 Z" fill="#3A4556" />
                  <path d="M64 256 C 56 236, 62 200, 80 166 C 88 176, 92 200, 96 256 Z" fill="#3A4556" />
                  <path d="M118 236 C 150 206, 190 196, 236 200" stroke="#EA4F16" strokeWidth="12" strokeLinecap="round" fill="none" />
                  <g stroke="#E4E4E7" strokeWidth="5" strokeLinecap="round">
                    <path d="M166 160 L 180 152" />
                    <path d="M178 170 L 194 162" />
                    <path d="M192 180 L 208 172" />
                    <path d="M206 188 L 222 182" />
                  </g>
                  <path d="M80 160 L 92 140 L 104 146 L 94 166 Z" fill="#EA4F16" />
                  <path d="M58 254 L 300 254 C 312 256, 314 270, 304 276 L 64 276 C 50 274, 48 258, 58 254 Z" fill="url(#otl-sole)" />
                  <path d="M62 276 L 304 276 C 306 284, 300 290, 290 290 L 70 290 C 60 290, 56 284, 62 276 Z" fill="#1F2430" />
                  <g stroke="#3A4150" strokeWidth="3">
                    <path d="M90 283 L 120 283" />
                    <path d="M140 283 L 170 283" />
                    <path d="M190 283 L 220 283" />
                    <path d="M240 283 L 270 283" />
                  </g>
                </svg>
              </div>

              {/* Real-time Dynamic Impact Popover */}
              <div ref={mPopRef} className="otl-meter-pop" aria-hidden="true">
                <div className="otl-mp-row">
                  <span>Impact</span>
                  <b>Absorbed</b>
                </div>
                <div className="otl-mp-bar">
                  <i ref={mBarRef} />
                </div>
                <div className="otl-mp-row otl-mp-sub">
                  <span>Cushion</span>
                  <b ref={mStateRef}>Ready</b>
                </div>
              </div>

              {/* Toast Feedback */}
              <p
                ref={elToastRef}
                className={`otl-toast ${showToast ? "is-show" : ""}`}
                role="status"
                aria-live="polite"
              >
                {toastMsg}
              </p>
            </div>

            {/* Right Information Card */}
            <div
              ref={cardRef}
              className={`otl-card ${cardSwapping ? "is-swap" : ""}`}
              aria-live="polite"
            >
              <div className="otl-card-top">
                <span className="otl-step">
                  Layer {pad(active + 1)} / {pad(count)}
                </span>
                <span className="otl-role">{currentLayer.role}</span>
              </div>
              <h3 className="otl-card-title">
                {currentLayer.name.includes(currentLayer.accent) ? (
                  <>
                    {currentLayer.name.slice(0, currentLayer.name.indexOf(currentLayer.accent))}
                    <span>{currentLayer.accent}</span>
                    {currentLayer.name.slice(currentLayer.name.indexOf(currentLayer.accent) + currentLayer.accent.length)}
                  </>
                ) : (
                  currentLayer.name
                )}
              </h3>
              <p className="otl-card-desc">{currentLayer.desc}</p>
              {currentLayer.spec && (
                <div className="otl-spec">
                  <span>Thickness</span>
                  <strong>{currentLayer.spec}</strong>
                </div>
              )}
              <div className="otl-meter" aria-hidden="true">
                <span style={{ width: `${((active + 1) / count) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Bottom Scroll Progress */}
          <div className="otl-progress" aria-hidden="true">
            <span ref={elProgRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
