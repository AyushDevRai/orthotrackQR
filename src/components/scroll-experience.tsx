"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Footprints, Heart, Leaf, Maximize2, Pause, Play, RotateCcw, ShieldCheck, Sparkles, Sun, Waves } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { brand, media } from "@/lib/content";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  { id: "motion", label: "Feel the movement", short: "Feel" },
  { id: "difference", label: "Cushion your step", short: "Cushion" },
  { id: "wellbeing", label: "Move for yourself", short: "Wellbeing" },
  { id: "engineering", label: "Explore the layers", short: "Layers" },
  { id: "durability", label: "Made for everyday", short: "Endure" },
  { id: "spaces", label: "Find your space", short: "Belong" },
];

export function JourneyGuide() {
  const [active, setActive] = useState(0);
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const triggers = chapters.map((chapter, index) => ScrollTrigger.create({
      trigger: `#${chapter.id}`, start: "top 48%", end: "bottom 48%",
      onEnter: () => setActive(index), onEnterBack: () => setActive(index),
    }));
    const timeline = gsap.to(progress.current, { scaleX: 1, ease: "none", scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: true } });
    return () => { triggers.forEach(t => t.kill()); timeline.scrollTrigger?.kill(); timeline.kill(); };
  }, []);
  return <nav className="journey-guide" aria-label="Your Orthotrack journey"><div className="journey-guide-inner"><span className="journey-label"><span className="journey-indicator" />YOUR NEXT STEP</span><div className="journey-chapters">{chapters.map((chapter, i) => <a href={`#${chapter.id}`} key={chapter.id} className={cn(active === i && "active", i < active && "completed")} aria-label={`Step ${i + 1}: ${chapter.label}`} aria-current={active === i ? "step" : undefined}><span>{i < active ? <Check size={10} /> : `0${i + 1}`}</span><strong>{chapter.short}</strong></a>)}</div><span className="journey-current">0{active + 1} <span>/ {chapters[active].label}</span></span></div><div ref={progress} className="journey-progress" /></nav>;
}

const trackPath = "M 1470 -120 C 1040 80 1220 550 780 600 C 260 660 -100 700 30 1200 C 140 1580 1410 1150 1350 1800 C 1300 2280 170 1980 90 2580 C 0 3130 1370 2780 1310 3350 C 1250 3840 110 3590 100 4100 C 80 4620 1400 4280 1330 4910 C 1260 5480 -110 5110 30 5730 C 180 6270 1320 5990 1400 6500 C 1450 6900 500 6830 530 7300";

export function PageTrack() {
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const dot = useRef<SVGCircleElement>(null);
  useEffect(() => {
    if (!path.current) return;
    const route = path.current;
    const length = route.getTotalLength();
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(route, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(route, { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: .8, onUpdate: self => { const point = route.getPointAtLength(length * self.progress); gsap.set(dot.current, { attr: { cx: point.x, cy: point.y } }); } } });
    });
    return () => mm.revert();
  }, []);
  return <div className="page-track" aria-hidden="true"><svg ref={svg} viewBox="0 0 1400 7200" preserveAspectRatio="none"><defs><pattern id="track-grain" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="2" cy="3" r="1" fill="#8c3622" opacity=".22" /><circle cx="8" cy="9" r="1.3" fill="#fff" opacity=".3" /><circle cx="10" cy="2" r=".7" fill="#a94729" opacity=".3" /></pattern></defs><g fill="none" strokeLinecap="round"><path d={trackPath} stroke="#df5d38" strokeWidth="190" className="track-base" /><path d={trackPath} stroke="url(#track-grain)" strokeWidth="184" /><path d={trackPath} stroke="#fff4e9" strokeWidth="150" /><path d={trackPath} stroke="#e8825e" strokeWidth="147" /><path d={trackPath} stroke="#fff4e9" strokeWidth="106" /><path d={trackPath} stroke="#e8825e" strokeWidth="103" /><path d={trackPath} stroke="#fff4e9" strokeWidth="62" /><path d={trackPath} stroke="#e8825e" strokeWidth="59" /><path d={trackPath} stroke="url(#track-grain)" strokeWidth="184" /><path ref={path} d={trackPath} stroke="#ef4b26" strokeWidth="3" className="track-drawn" /><circle ref={dot} r="9" fill="#ee4b27" stroke="#fff" strokeWidth="5" /></g></svg><span className="track-micro-label track-label-one">FOLLOW YOUR OWN TRACK ↘</span><span className="track-micro-label track-label-two">MOVEMENT, FROM THE GROUND UP.</span><span className="track-micro-label track-label-three">ONE MORE COMFORTABLE STEP.</span></div>;
}

export function ExpandingFilm() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add({ desktop: "(min-width: 761px)", mobile: "(max-width: 760px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      const { desktop, motion } = context.conditions!;
      if (!motion) return;
      gsap.fromTo(frame.current, { width: desktop ? "78%" : "92%", borderRadius: desktop ? "18px" : "10px" }, { width: "100%", borderRadius: 0, ease: "none", scrollTrigger: { trigger: section.current, start: "top 75%", end: "top 12%", scrub: .8, invalidateOnRefresh: true } });
      gsap.fromTo(".motion-film-copy", { y: 22 }, { y: -22, ease: "none", scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: 1 } });
    });
    const element = video.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (!element) return;
      if (entry.isIntersecting && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) void element.play().catch(() => setPlaying(false));
      else element.pause();
    }, { threshold: .15 });
    if (element) observer.observe(element);
    return () => { observer.disconnect(); mm.revert(); };
  }, []);
  async function toggle() { if (!video.current) return; if (video.current.paused) { try { await video.current.play(); } catch { setFailed(true); } } else video.current.pause(); }
  return <section id="motion" className="motion-section" ref={section} aria-label="Experience Orthotrack in motion"><div className="motion-film" ref={frame}><video ref={video} src={media.story.video} poster={media.story.poster} muted loop playsInline preload="metadata" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => setFailed(true)} aria-label="A person jogging on a tree-lined orange walking track" /><div className="motion-film-shade" /><div className="motion-film-top"><span><span className="live-dot" /> ORTHOTRACK IN MOTION</span><span>BUILT FOR YOUR BODY / DESIGNED FOR YOUR EVERYDAY</span></div><div className="motion-film-copy"><span className="motion-eyebrow">FEEL THE DIFFERENCE. FROM THE FIRST STEP.</span><h2>Less hard ground.<br /><em>More good mornings.</em></h2><a href="#difference">Follow the comfort <ArrowDown size={18} /></a></div><div className="motion-film-bottom"><span>SCROLL TO STEP INSIDE <ArrowDown size={12} /></span><div><button onClick={toggle} aria-label={playing ? "Pause track video" : "Play track video"}>{playing ? <Pause size={16} /> : <Play size={16} />}</button><Dialog><DialogTrigger asChild><button aria-label="Open track video"><Maximize2 size={16} /></button></DialogTrigger><DialogContent className="story-dialog"><DialogTitle className="sr-only">Orthotrack in motion</DialogTitle><DialogDescription className="sr-only">Watch the supplied walking-track video with playback controls.</DialogDescription><video src={media.story.video} controls playsInline className="story-video" /></DialogContent></Dialog></div></div>{failed && <a className="video-fallback" href={media.story.video}>Open the track film <ArrowUpRight size={14} /></a>}</div><div className="motion-caption wrap"><span>01 — THE SURFACE CHANGES EVERYTHING.</span><span>YOU BRING THE MOVEMENT. WE BUILD THE COMFORT.</span></div></section>;
}

export function ImpactLab() {
  const [cushioned, setCushioned] = useState(true);
  const [stepped, setStepped] = useState(false);
  const [busy, setBusy] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const animation = useRef<gsap.core.Timeline | null>(null);
  useEffect(() => () => { animation.current?.kill(); }, []);
  function step() {
    if (!scene.current || busy) return;
    setBusy(true); setStepped(true);
    const shoe = scene.current.querySelector(".impact-shoe");
    const cushion = scene.current.querySelector(".impact-cushion");
    const rings = scene.current.querySelectorAll(".impact-wave");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setBusy(false); return; }
    const tl = gsap.timeline({ onComplete: () => setBusy(false) }); animation.current = tl;
    tl.fromTo(shoe, { y: -65, rotate: -16 }, { y: 0, rotate: 0, duration: .45, ease: "power2.in" })
      .fromTo(rings, { scale: .3, opacity: .7 }, { scale: cushioned ? 1.5 : 2.2, opacity: 0, duration: .9, stagger: .1, ease: "power2.out" }, .4)
      .to(cushion, { scaleY: cushioned ? .72 : 1, transformOrigin: "bottom", duration: .16 }, .44)
      .to(shoe, { y: cushioned ? 8 : -22, duration: .16, ease: "power1.out" }, .45)
      .to(cushion, { scaleY: 1, duration: .7, ease: "elastic.out(1,.5)" }, .6)
      .to(shoe, { y: 0, duration: .65, ease: cushioned ? "power2.out" : "bounce.out" }, .61);
  }
  return <section id="difference" className="impact-section section wrap"><div className="chapter-heading"><span className="chapter-number">02</span><div><p className="section-label"><span />COMFORT YOU CAN UNDERSTAND</p><h2>The ground takes the impact.<br /><span>Your knees deserve the care.</span></h2></div><span className="chapter-aside">LESS HARDNESS.<br />MORE THOUGHT.</span></div><div className="impact-grid"><div className="impact-copy"><span className="feature-overline"><Waves size={18} /> SHOCK-ABSORBING BY DESIGN</span><h3>Real cushioning.<br />In every step.</h3><p>Each footfall meets a dedicated <strong>15 mm SBR cushion</strong> beneath the surface. It’s designed to absorb impact and soften the feel of your everyday walk.</p><div className="impact-benefits"><span><Check size={15} /> Designed with joint comfort in mind</span><span><Check size={15} /> A resilient layer below every step</span><span><Check size={15} /> Made for walking & light recreation</span></div><a href="#wellbeing" className="text-link">See what it means for you <ArrowRight size={17} /></a></div><div className={cn("impact-demo", !cushioned && "hard-mode")} ref={scene}><div className="demo-top"><span>THE UNDERFOOT EXPLORER</span><span className="interactive-tag"><span /> INTERACTIVE</span></div><div className="surface-switch" role="group" aria-label="Choose a walking surface"><button aria-pressed={cushioned} className={cn(cushioned && "active")} onClick={() => { if (!busy) { setCushioned(true); setStepped(false); } }}>Orthotrack</button><button aria-pressed={!cushioned} className={cn(!cushioned && "active")} onClick={() => { if (!busy) { setCushioned(false); setStepped(false); } }}>Hard surface</button></div><div className="impact-scene"><div className="impact-shoe"><Footprints size={78} strokeWidth={1.1} /></div><div className="impact-rings"><i className="impact-wave" /><i className="impact-wave" /><i className="impact-wave" /></div><div className="impact-surface"><span className="surface-top" /><span className="impact-cushion" /><span className="surface-base" /></div><span className="surface-caption">{cushioned ? "15 mm shock-absorbing SBR cushion" : "Rigid surface · no cushioning layer shown"}</span></div><div className="demo-response" aria-live="polite"><Waves size={24} strokeWidth={1.3} /><span><strong>{stepped ? cushioned ? "A cushioned response." : "A firmer landing." : "Try a step. Explore the difference."}</strong><small>{cushioned ? "The cushion is designed to absorb part of the impact." : "A hard surface has no dedicated cushion in this illustration."}</small></span><button onClick={step} disabled={busy} aria-label="Try a step on the selected surface"><RotateCcw size={15} />{busy ? "Stepping…" : "Try a step"}</button></div><p className="demo-note">Illustration of the construction principle, not a measured comparison or medical prediction.</p></div></div></section>;
}

const wellbeingSteps = [
  { title: "A kinder landing.\nFor your knees.", tag: "CUSHIONING & JOINT COMFORT", text: "Your knees are part of every step. A dedicated shock-absorbing layer is designed to cushion the landing, so your daily route feels less like hard ground.", foot: "Designed for comfort. Individual experiences vary.", icon: Waves, point: "knees", caption: "The difference starts underfoot.", detail: "15 mm SBR cushion" },
  { title: "A daily walk.\nA healthier habit.", tag: "HEART & EVERYDAY MOVEMENT", text: "Regular physical activity supports cardiovascular health and overall wellbeing. A comfortable, welcoming path gives you a reason to make movement part of your routine.", foot: "Health benefits relate to regular physical activity, not a treatment effect of the track.", icon: Heart, point: "heart", caption: "Keep the habit. At your pace.", detail: "Movement for everyday wellbeing" },
  { title: "Step outside.\nCome back to yourself.", tag: "MIND & WELLBEING", text: "A walk can be a moment to reset. Regular physical activity can support mental wellbeing and sleep. Make a little room for movement, fresh air, and time for you.", foot: "A place for everyday movement, without the pressure of competition.", icon: Sun, point: "mind", caption: "Good for your routine. Good for you.", detail: "A reason to move, every day" },
];

export function HealthJourney() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const elements = root.current?.querySelectorAll<HTMLElement>(".wellbeing-step");
    const triggers = Array.from(elements || []).map((element, i) => ScrollTrigger.create({ trigger: element, start: "top 60%", end: "bottom 40%", onEnter: () => setActive(i), onEnterBack: () => setActive(i) }));
    return () => triggers.forEach(t => t.kill());
  }, []);
  const step = wellbeingSteps[active];
  return <section id="wellbeing" ref={root} className="wellbeing-section"><div className="wrap wellbeing-top"><span className="chapter-number">03</span><div><p className="section-label"><span />MORE THAN A WALKING SURFACE</p><h2>Built around your body.<br /><span>Made for your everyday.</span></h2></div><span className="chapter-aside">FOLLOW THE TRACK.<br />FEEL THE PURPOSE.</span></div><div className="wrap wellbeing-grid"><div className={cn("body-panel", `body-${step.point}`)}><div className="body-panel-top"><span>YOUR BODY. YOUR EVERYDAY.</span><span>0{active + 1} / 03</span></div><div className="body-orbit" /><div className="body-illustration"><Image src="/images/body-support.webp" alt="An anatomical illustration showing the knees, joints, and body" fill sizes="350px" /><span className="body-target knee-left" /><span className="body-target knee-right" /><span className="body-target heart-target" /><span className="body-target mind-target" /></div><div className="body-callout" key={active}><step.icon size={21} /><span><strong>{step.caption}</strong><small>{step.detail}</small></span></div><div className="body-panel-bottom"><span>THOUGHTFUL SURFACES. EVERYDAY MOVEMENT.</span><span className="body-scroll">SCROLL TO EXPLORE <ArrowDown size={13} /></span></div></div><div className="wellbeing-steps">{wellbeingSteps.map((item, i) => <article key={item.tag} className={cn("wellbeing-step", active === i && "active")}><span className="wellbeing-index">0{i + 1} <i />{item.tag}</span><h3>{item.title.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h3><p>{item.text}</p><div className="wellbeing-takeaway"><item.icon size={18} /><span>{item.foot}</span></div>{i === 0 ? <a href="#engineering" className="text-link">Explore the cushion below <ArrowUpRight size={16} /></a> : i === 1 ? <a className="health-source" href="https://www.who.int/news-room/fact-sheets/detail/physical-activity" target="_blank" rel="noreferrer">Why movement matters · WHO <ArrowUpRight size={12} /></a> : <a href="#durability" className="text-link">Built for the long run <ArrowRight size={16} /></a>}</article>)}</div></div><p className="wellbeing-note wrap">Orthotrack is a walking surface, not a medical treatment. No surface guarantees pain-free walking or prevents every injury. Product performance depends on the finished installation and conditions.</p></section>;
}

export function Durability() {
  const [selected, setSelected] = useState(0);
  const features = [
    { icon: Sun, name: "Outdoor ready", heading: "Sun. Seasons. Everyday footsteps.", text: "Protective top coats and a coloured wear finish form the working surface. The system is specified for outdoor walking paths, with texture and finish tailored to each installation.", note: "Ask for available UV and weather-resistance test data." },
    { icon: Sparkles, name: "Easy to care for", heading: "More movement. Simpler care.", text: "A continuous coated surface is designed for straightforward cleaning. Follow the maintenance schedule and approved cleaning methods for your installation to keep the route welcoming.", note: "Site care and project conditions affect the finish over time." },
    { icon: Layers3Icon, name: "Renewable finish", heading: "A fresh chapter. Underfoot.", text: "When the surface needs renewal, the system is designed to be refreshed by recoating. Plan maintenance with the Orthotrack team, rather than treating the finish as maintenance-free.", note: "Recoat timing and service life depend on testing, use, and site conditions." },
  ];
  const item = features[selected];
  return <section id="durability" className="durability-section section"><div className="wrap"><div className="chapter-heading"><span className="chapter-number">05</span><div><p className="section-label"><span />MADE FOR THE EVERYDAY</p><h2>Everyday comfort.<br /><span>Thoughtfully protected.</span></h2></div><span className="chapter-aside">BUILT AS A SYSTEM.<br />CARED FOR OVER TIME.</span></div><div className="durability-grid"><div className="durability-photo"><Image src="/images/track-detail.webp" alt="Close view of the orange track's finished walking surface" fill sizes="(max-width:760px) 100vw, 50vw" /><div className="durability-photo-shade" /><span className="durability-photo-label">FINISH WITH PURPOSE.</span><div className="durability-photo-copy"><ShieldCheck size={34} strokeWidth={1.2} /><span>Protection.<br />Layer after layer.</span></div><span className="texture-label">SURFACE / DETAIL 01</span></div><div className="durability-copy"><div className="durability-tabs" role="group" aria-label="Explore track durability">{features.map((f, i) => <button key={f.name} aria-pressed={selected === i} onClick={() => setSelected(i)} className={cn(selected === i && "active")}><f.icon size={17} />{f.name}</button>)}</div><div className="durability-detail" key={selected}><item.icon size={38} strokeWidth={1.1} /><h3>{item.heading}</h3><p>{item.text}</p><div className="durability-note"><Check size={15} />{item.note}</div><Button asChild variant="outline"><a href={brand.catalogue} target="_blank" rel="noreferrer">See the technical details <ArrowUpRight size={16} /></a></Button></div></div></div></div></section>;
}

function Layers3Icon(props: React.ComponentProps<typeof ShieldCheck>) { return <svg {...props} width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={props.strokeWidth || 1.5} strokeLinecap="round" strokeLinejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 16l9 5 9-5" /></svg>; }
