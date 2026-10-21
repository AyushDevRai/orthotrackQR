"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Footprints, Layers3, Leaf, Menu, Play, Plus, Sparkles, Sun, Waves, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { brand, faqs, layers, media, spaces } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Durability, ExpandingFilm, HealthJourney, ImpactLab, JourneyGuide, PageTrack } from "@/components/scroll-experience";

function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return <a href="#top" className={cn("brand-logo", inverse && "brand-inverse")} aria-label="Orthotrack home"><Image src="/images/logo.webp" width={190} height={46} alt="Ortho Track" priority /><span>WALKING TRACK SYSTEM</span></a>;
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={cn("section-label", light && "label-light")}><span />{children}</p>; }

function Navigation() {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (!open) return; const close = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); }; document.addEventListener("keydown", close); return () => document.removeEventListener("keydown", close); }, [open]);
  const links = [["Feel the difference", "#difference"], ["Built for you", "#wellbeing"], ["For your space", "#spaces"]];
  return <header className="site-header"><div className="nav-inner"><BrandLogo /><nav className="desktop-nav" aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav><div className="nav-actions"><Button asChild size="sm" className="desktop-cta"><a href="#enquire">Let’s talk <ArrowUpRight size={15} /></a></Button><button className="mobile-menu-button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div></div>{open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">{[...links, ["Let’s talk", "#enquire"]].map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}<ArrowUpRight size={18} /></a>)}</nav>}</header>;
}

function Hero() {
  return <section className="hero wrap" aria-labelledby="hero-title">
    <div className="hero-copy">
      <SectionLabel>EVERYDAY MOVEMENT. REIMAGINED FROM THE GROUND UP.</SectionLabel>
      <h1 id="hero-title">Be kind to<br />your knees.<br /><span>Keep moving.</span></h1>
      <p className="hero-description">A cushioned walking surface designed to absorb impact.<br className="desktop-break" /> For a comfortable stride. And a habit that feels good.</p>
      <div className="hero-buttons"><Button asChild><a href="#difference">Discover the cushion <ArrowUpRight size={18} /></a></Button><a className="text-link" href="#motion">See it in motion <Play size={14} /></a></div>
      <div className="hero-performance"><div><strong>15<span>mm</span></strong><span>DEDICATED SBR CUSHION</span></div><i /><div><strong>06</strong><span>LAYERS. ONE PURPOSE.</span></div><span className="hero-performance-note">Built for your body.<br />Designed for your everyday.</span></div>
    </div>
    <div className="hero-visual"><span className="hero-visual-word" aria-hidden="true">MOVE</span><div className="hero-photo"><Image src={media.hero.image} alt="A walker on an orange track surrounded by trees in warm morning light" fill priority sizes="(max-width: 760px) 92vw, 43vw" /><div className="hero-photo-shade" /><div className="photo-topline"><span className="live-dot" /> YOUR PACE. YOUR PATH.</div><div className="hero-photo-caption"><span>Built for the<br />everyday athlete.</span><p>That means you.</p></div><div className="image-index">ORTHOTRACK <span>/ EVERY STEP COUNTS</span></div></div><div className="comfort-note"><span className="comfort-note-icon"><Waves size={25} strokeWidth={1.3} /></span><div><strong>Less hard ground.</strong><span>Shock absorption starts below the surface.</span></div><Plus size={17} /></div></div>
  </section>;
}

function BenefitStrip() {
  return <div className="benefit-strip"><div className="wrap benefit-strip-inner">{[{ icon: Waves, title: "Cushioned for comfort", text: "Thoughtful support, underfoot" }, { icon: Footprints, title: "Made for everyday movement", text: "At your pace, on your terms" }, { icon: Sun, title: "Designed for the outdoors", text: "For the spaces we share" }].map(item => <div key={item.title}><item.icon size={28} strokeWidth={1.2} /><span><strong>{item.title}</strong><small>{item.text}</small></span></div>)}</div></div>;
}

function Engineering() {
  const [selected, setSelected] = useState(4);
  return <section id="engineering" className="engineering-section section"><div className="wrap"><div className="engineering-heading"><span className="chapter-number engineering-number">04</span><div><SectionLabel>THOUGHTFULLY ENGINEERED</SectionLabel><h2>There’s more<br /><span className="muted">beneath the surface.</span></h2></div><p>Six layers. One considered system.<br />Each with a purpose. All working together.</p></div><div className="engineering-grid"><div className="layer-visual"><span className="technical-label">ORTHOTRACK / SYSTEM BUILD-UP</span><div className="layer-stack" aria-label="Exploded illustration of the six-layer Orthotrack system">{layers.map((layer, index) => <button key={layer.name} className={cn("layer-slab", selected === index && "selected")} style={{ "--layer-color": layer.color, "--layer-index": index } as React.CSSProperties} onClick={() => setSelected(index)} aria-label={`Explore layer ${layer.number}: ${layer.name}`} aria-pressed={selected === index}><span /></button>)}</div><div className="layer-dimension"><span>15<span>mm</span></span><p>Primary SBR cushion.<br />Comfort at the core.</p></div><span className="illustration-note">EXPLODED VIEW · ILLUSTRATIVE, NOT TO SCALE</span></div><div className="layer-details"><div className="layer-selector-label">EXPLORE EACH LAYER <span>TOP TO BOTTOM <ArrowDown size={12} /></span></div>{layers.map((layer, index) => <button key={layer.name} className={cn("layer-row", selected === index && "active")} onClick={() => setSelected(index)} aria-expanded={selected === index} aria-controls={`layer-detail-${index}`}><span className="layer-number">{layer.number}</span><span className="layer-row-copy"><strong>{layer.name}</strong><span id={`layer-detail-${index}`} hidden={selected !== index}>{layer.detail}</span></span><span className="layer-row-indicator">{selected === index ? <ArrowUpRight size={18} /> : <Plus size={16} />}</span></button>)}</div></div><div className="material-note"><Leaf size={19} strokeWidth={1.4} /><p><strong>A considered finish.</strong> Water-based coating technology. A seamless coloured surface. Details tailored to your project.</p><a href={brand.catalogue} target="_blank" rel="noreferrer">Explore the specifications <ArrowUpRight size={16} /></a></div></div></section>;
}

function Spaces() {
  const [active, setActive] = useState(0);
  const space = spaces[active];
  return <section id="spaces" className="section wrap"><div className="section-heading centered"><span className="chapter-number space-number">06</span><SectionLabel>BETTER SPACES. MORE POSSIBILITIES.</SectionLabel><h2>At home, wherever<br /><span className="muted">life moves.</span></h2><p>For the people who walk here.<br />And the people who make it possible.</p></div><div className="space-tabs" role="group" aria-label="Choose a setting">{spaces.map((s, i) => <button key={s.id} onClick={() => setActive(i)} aria-pressed={active === i} className={cn(active === i && "active")}>{s.short}</button>)}</div><div className="space-panel" key={space.id}><div className="space-image"><Image src={space.image} fill sizes="(max-width: 760px) 92vw, 55vw" alt={space.title + " — illustrative imagery from the Orthotrack catalogue"} /><span className="space-image-label"><span />{space.title}</span><div className="space-controls"><button onClick={() => setActive((active + spaces.length - 1) % spaces.length)} aria-label="Previous setting"><ChevronLeft size={19} /></button><button onClick={() => setActive((active + 1) % spaces.length)} aria-label="Next setting"><ChevronRight size={19} /></button></div></div><div className="space-copy"><span className="eyebrow">A SPACE FOR EVERYDAY WELLNESS</span><h3>{space.heading}</h3><p>{space.description}</p><ul>{space.tags.map(tag => <li key={tag}><Check size={15} />{tag}</li>)}</ul><a href="#enquire" className="text-link">Bring it to your space <ArrowUpRight size={18} /></a></div></div><p className="section-footnote">Space imagery illustrates possible settings, rather than completed installations.</p></section>;
}

function ForDecisionMakers() {
  return <section className="owners-section"><div className="wrap owners-grid"><div><SectionLabel light>FOR THE PEOPLE PLANNING AHEAD</SectionLabel><h2>A thoughtful choice.<br /><span>Beyond the first step.</span></h2><p>A great community space should be inviting to use<br className="desktop-break" /> and practical to care for.</p><Button asChild variant="light"><a href={brand.catalogue} download>Get the product catalogue <ArrowDownToLine size={17} /></a></Button></div><div className="owners-features">{[{ icon: Sparkles, title: "Made for simpler care", text: "A surface designed for straightforward cleaning and maintenance." }, { icon: Layers3, title: "A system, not just a coating", text: "A six-layer build-up with a dedicated 15 mm SBR cushion." }, { icon: Sun, title: "A finish for your project", text: "Colour, texture, and final specifications considered for your setting." }, { icon: Leaf, title: "Refresh, when it’s time", text: "Designed to allow surface renewal through recoating." }].map(item => <div key={item.title}><item.icon size={25} strokeWidth={1.25} /><span><h3>{item.title}</h3><p>{item.text}</p></span></div>)}</div></div></section>;
}

function Questions() {
  return <section id="questions" className="section wrap faq-grid"><div className="faq-intro"><SectionLabel>A LITTLE MORE CLARITY</SectionLabel><h2>Good questions.<br /><span className="muted">Clear answers.</span></h2><p>Get to know the surface<br />beneath your next step.</p><a href={brand.catalogue} target="_blank" rel="noreferrer" className="text-link">Read the catalogue <ArrowUpRight size={17} /></a></div><Accordion type="single" collapsible defaultValue="question-0" className="faq-list">{faqs.map((faq, i) => <AccordionItem key={faq.q} value={`question-${i}`}><AccordionTrigger>{faq.q}</AccordionTrigger><AccordionContent>{faq.a}</AccordionContent></AccordionItem>)}</Accordion></section>;
}

function EnquiryForm() {
  const [done, setDone] = useState(false);
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const text = `ORTHOTRACK PROJECT ENQUIRY\n\nName: ${values.get("name")}\nEmail: ${values.get("email")}\nProject type: ${values.get("type")}\nLocation: ${values.get("location")}\n\nProject details:\n${values.get("message") || "Please contact me to discuss a walking-track project."}\n\nPlease share the proposed system, installation requirements, maintenance guidance, and available test reports.`;
    setBrief(text); setDone(true);
  }
  function download() { const url = URL.createObjectURL(new Blob([brief], { type: "text/plain;charset=utf-8" })); const a = document.createElement("a"); a.href = url; a.download = "orthotrack-project-enquiry.txt"; a.click(); URL.revokeObjectURL(url); }
  async function copy() { try { await navigator.clipboard.writeText(brief); setCopied(true); } catch { download(); } }
  return <Dialog onOpenChange={() => { setDone(false); setCopied(false); }}><DialogTrigger asChild><Button>Plan a track for your space <ArrowUpRight size={18} /></Button></DialogTrigger><DialogContent className="enquiry-dialog"><DialogTitle className="dialog-heading">{done ? "Your next step is ready." : "Let’s make room for movement."}</DialogTitle><DialogDescription className="dialog-description">{done ? "Your project brief is ready to share with Orthotrack. It has not been sent or stored." : "Tell us a little about your space. We’ll turn it into a project brief you can share with the Orthotrack team."}</DialogDescription>{done ? <div className="enquiry-result"><span className="result-check"><Check size={27} /></span><pre>{brief}</pre><div className="result-actions"><Button onClick={download}>Download your brief <ArrowDownToLine size={17} /></Button><Button variant="outline" onClick={copy}>{copied ? "Copied" : "Copy brief"}{copied && <Check size={16} />}</Button></div>{brand.email ? <a className="text-link" href={`mailto:${brand.email}?subject=${encodeURIComponent("Orthotrack project enquiry")}&body=${encodeURIComponent(brief)}`}>Open email to Orthotrack <ArrowUpRight size={17} /></a> : <a className="text-link" href={brand.website} target="_blank" rel="noreferrer">Visit Orthotrack to contact the team <ArrowUpRight size={17} /></a>}</div> : <form onSubmit={submit} className="enquiry-form"><div className="form-grid"><label>Your name<input autoComplete="name" name="name" placeholder="Full name" required maxLength={100} /></label><label>Email address<input autoComplete="email" name="email" type="email" placeholder="you@company.com" required maxLength={200} /></label><label>Type of space<select name="type" required defaultValue=""><option value="" disabled>Select a space</option><option>Public park / government facility</option><option>Residential community / RWA</option><option>School / campus</option><option>Wellness space</option><option>Other</option></select></label><label>Project location<input name="location" autoComplete="address-level2" placeholder="City, state" required maxLength={150} /></label></div><label>What do you have in mind?<textarea name="message" placeholder="Approximate area, an existing path, your vision…" rows={3} maxLength={2000} /></label><p className="form-note">Your details stay in this browser. Preparing a brief does not send an enquiry.</p><Button type="submit">Prepare my project brief <ArrowRight size={17} /></Button></form>}</DialogContent></Dialog>;
}

function Contact() {
  return <section id="enquire" className="contact-section wrap"><div className="contact-track-lines" aria-hidden="true"><i /><i /><i /></div><SectionLabel>THE NEXT STEP STARTS HERE</SectionLabel><h2>Better movement.<br /><span>Starts with your space.</span></h2><p>Give your community a path worth coming back to.</p><div className="contact-actions"><EnquiryForm /><a href={brand.catalogue} download className="text-link">Download catalogue <ArrowDownToLine size={17} /></a></div><div className="contact-bottom"><span><span className="live-dot" /> FOR PARKS. FOR COMMUNITIES. FOR EVERY DAY.</span><Footprints size={24} strokeWidth={1.1} /></div></section>;
}

function Footer() {
  return <footer className="site-footer wrap"><div className="footer-main"><BrandLogo /><span>Built for your body.<br /><strong>Designed for your everyday.</strong></span><a href={brand.website} target="_blank" rel="noreferrer">orthotrack.com <ArrowUpRight size={16} /></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Orthotrack. Every step counts.</span><div><a href="#questions">FAQs</a><a href={brand.catalogue} target="_blank" rel="noreferrer">Product catalogue</a><a href="#top">Back to top ↑</a></div></div></footer>;
}

export default function LandingPage() {
  const [showSticky, setShowSticky] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elements = rootRef.current?.querySelectorAll(".section-heading, .benefit-card, .engineering-heading, .engineering-grid, .space-panel, .owners-grid, .faq-intro, .contact-section");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } }), { threshold: 0.09 });
    elements?.forEach(el => { el.classList.add("reveal"); observer.observe(el); });
    const hero = document.querySelector(".hero");
    const heroObserver = new IntersectionObserver(([entry]) => setShowSticky(!entry.isIntersecting), { threshold: 0 });
    if (hero) heroObserver.observe(hero);
    return () => { observer.disconnect(); heroObserver.disconnect(); };
  }, []);
  return <div id="top" ref={rootRef} className="experience"><a href="#main" className="skip-link">Skip to content</a><Navigation /><JourneyGuide /><main id="main"><PageTrack /><Hero /><ExpandingFilm /><BenefitStrip /><ImpactLab /><HealthJourney /><Engineering /><Durability /><Spaces /><ForDecisionMakers /><Questions /><Contact /></main><Footer /><div className={cn("mobile-sticky", showSticky && "visible")}><span>Comfort starts underfoot.<small>Follow the track. Find your next step.</small></span><Button asChild size="sm"><a href="#enquire">Let’s talk <ArrowUpRight size={15} /></a></Button></div></div>;
}
