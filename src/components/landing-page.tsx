"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { Activity, ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, Building2, Check, ChevronDown, ChevronLeft, ChevronRight, Facebook, FileText, Footprints, HeartPulse, Instagram, Layers3, Leaf, Linkedin, Mail, MapPin, Menu, MessageCircle, Phone, Play, Plus, ShieldCheck, Sparkles, Sun, Trees, User, Waves, X, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { brand, faqs, layers, media, spaces } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Durability, ExpandingFilm, HealthJourney, ImpactLab, JourneyGuide, PageTrack } from "@/components/scroll-experience";
import LayerSystem3D from "@/components/layer-system-3d";

function BrandLogo({ inverse = false, className }: { inverse?: boolean; className?: string }) {
  return (
    <a href="#top" className={cn("brand-logo", inverse && "brand-inverse", className)} aria-label="Orthotrack home">
      <Image src="/images/logo.png" width={176} height={42} alt="Orthotrack" priority unoptimized />
    </a>
  );
}

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) { return <p className={cn("section-label", light && "label-light")}><span />{children}</p>; }

interface TryTheTrackDialogProps {
  triggerText?: string;
  triggerVariant?: "default" | "outline" | "ghost" | "light";
  triggerSize?: "default" | "sm" | "icon";
  triggerClassName?: string;
  onTriggerClick?: () => void;
}

function TryTheTrackDialog({
  triggerText = "Book your Try the Track",
  triggerVariant = "default",
  triggerSize = "default",
  triggerClassName,
  onTriggerClick,
}: TryTheTrackDialogProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<{
    name: string;
    phone: string;
    location: string;
    email: string;
    spaceType: string;
  }>({
    name: "",
    phone: "",
    location: "",
    email: "",
    spaceType: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setData({
      name: String(fd.get("name") || ""),
      phone: String(fd.get("phone") || ""),
      location: String(fd.get("location") || ""),
      email: String(fd.get("email") || ""),
      spaceType: String(fd.get("spaceType") || "Not specified"),
    });
    setSubmitted(true);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      setTimeout(() => setSubmitted(false), 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant}
          size={triggerSize}
          className={triggerClassName}
          onClick={onTriggerClick}
        >
          <span>{triggerText}</span>
          <ArrowUpRight size={triggerSize === "sm" ? 14 : 18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="try-track-dialog">
        {submitted ? (
          <div className="try-track-success">
            <div className="success-icon-wrap">
              <span className="success-icon-pulse" />
              <Check size={32} strokeWidth={2.5} />
            </div>
            <DialogTitle className="success-title">
              Request Received!
            </DialogTitle>
            <div className="success-sales-notice">
              <Sparkles size={16} />
              <span>Our salesperson will be in touch soon</span>
            </div>
            <DialogDescription className="success-message">
              Thank you, <strong>{data.name || "there"}</strong>. We have registered your <em>Try the Track</em> session request for your space in <strong>{data.location || "your area"}</strong>. A dedicated Orthotrack specialist will reach out shortly to coordinate dates and track sample details.
            </DialogDescription>
            <div className="success-summary">
              <div className="summary-item">
                <span>Name</span>
                <strong>{data.name}</strong>
              </div>
              <div className="summary-item">
                <span>Phone</span>
                <strong>{data.phone}</strong>
              </div>
              <div className="summary-item">
                <span>Location</span>
                <strong>{data.location}</strong>
              </div>
              <div className="summary-item">
                <span>Space Type</span>
                <strong>{data.spaceType}</strong>
              </div>
            </div>
            <div className="success-actions">
              <Button onClick={() => setOpen(false)}>Done</Button>
              <Button variant="outline" onClick={() => setSubmitted(false)}>
                Submit another request
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="try-track-modal-header">
              <span className="try-track-badge">
                <span className="live-dot" /> On-Site &amp; Sample Experience
              </span>
              <DialogTitle className="try-track-title">
                Book your Try the Track
              </DialogTitle>
              <DialogDescription className="try-track-subtitle">
                Feel the difference of dedicated 15&nbsp;mm SBR cushioning firsthand. Tell us about yourself and your location to schedule an on-site walkthrough or sample kit.
              </DialogDescription>
            </div>
            <form onSubmit={handleSubmit} className="try-track-form">
              <div className="try-track-grid">
                <div className="try-track-field">
                  <label htmlFor="tt-name">
                    <User size={14} /> Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="tt-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patel"
                    autoComplete="name"
                  />
                </div>
                <div className="try-track-field">
                  <label htmlFor="tt-phone">
                    <Phone size={14} /> Phone Number <span className="req">*</span>
                  </label>
                  <input
                    id="tt-phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                  />
                </div>
                <div className="try-track-field">
                  <label htmlFor="tt-location">
                    <MapPin size={14} /> City / Location <span className="req">*</span>
                  </label>
                  <input
                    id="tt-location"
                    name="location"
                    type="text"
                    required
                    placeholder="e.g. Bandra, Mumbai"
                    autoComplete="address-level2"
                  />
                </div>
                <div className="try-track-field">
                  <label htmlFor="tt-email">
                    <Mail size={14} /> Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="tt-email"
                    name="email"
                    type="email"
                    required
                    placeholder="name@organization.com"
                    autoComplete="email"
                  />
                </div>
              </div>

              <div className="try-track-field full-field">
                <label htmlFor="tt-space">
                  <Building2 size={14} /> Space Type <span className="req">*</span>
                </label>
                <select id="tt-space" name="spaceType" required defaultValue="">
                  <option value="" disabled>Select the type of space</option>
                  <option value="Residential Society / Township">Residential Society / Township / RWA</option>
                  <option value="Public Park / Municipality">Public Park / Municipal Corporation</option>
                  <option value="School / University Campus">School / University / Educational Campus</option>
                  <option value="Corporate / Tech Park">Corporate / IT / Tech Park</option>
                  <option value="Hospital / Wellness Centre">Hospital / Wellness &amp; Rehabilitation Centre</option>
                  <option value="Sports Complex / Club">Sports Complex / Private Club</option>
                  <option value="Other Project">Other Commercial / Residential Project</option>
                </select>
              </div>

              <div className="try-track-field full-field">
                <label htmlFor="tt-notes">
                  Additional Notes or Questions <span className="opt">(Optional)</span>
                </label>
                <textarea
                  id="tt-notes"
                  name="notes"
                  rows={2}
                  placeholder="Estimated track length, existing surface (concrete, asphalt), timeline..."
                />
              </div>

              <div className="try-track-footer">
                <button type="submit" className="try-track-submit-btn">
                  <span>Submit Booking Request</span>
                  <ArrowRight size={17} />
                </button>
                <p className="try-track-privacy-note">
                  Your information is private and secure. Our team never shares your details.
                </p>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

interface NavDropdownItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
}

interface NavCategory {
  label: string;
  href: string;
  badge?: string;
  dropdown?: NavDropdownItem[];
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  const handleMouseEnter = (idx: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredIdx(idx);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredIdx(null);
    }, 180);
  };

  const navCategories: NavCategory[] = [
    {
      label: "Technology",
      href: "#difference",
      badge: "15mm",
      dropdown: [
        {
          title: "15mm Cushion Lab",
          description: "Interactive shoe strike & impact dissipation simulator",
          href: "#difference",
          icon: Activity,
          badge: "Interactive",
        },
        {
          title: "Joint & Spine Health",
          description: "Targeted shock relief for knees, hips & cardio endurance",
          href: "#wellbeing",
          icon: HeartPulse,
          badge: "Anatomical",
        },
      ],
    },
    {
      label: "Engineering",
      href: "#engineering",
      badge: "3D",
      dropdown: [
        {
          title: "6-Layer System Build",
          description: "Dense seamless polyurethane & dedicated SBR cushion",
          href: "#engineering",
          icon: Layers3,
          badge: "3D Cutaway",
        },
        {
          title: "All-Weather Durability",
          description: "UV resistance, non-porous finish & surface renewal",
          href: "#durability",
          icon: Sun,
          badge: "Weatherproof",
        },
      ],
    },
    {
      label: "Spaces",
      href: "#spaces",
      dropdown: [
        {
          title: "Public Parks & Tracks",
          description: "Civic promenades and high-traffic municipal walking circuits",
          href: "#spaces",
          icon: Trees,
        },
        {
          title: "Communities & Campuses",
          description: "Residential societies, universities & wellness retreats",
          href: "#spaces",
          icon: Building2,
        },
      ],
    },
    {
      label: "Owners & Specs",
      href: "#owners",
      dropdown: [
        {
          title: "For Decision-Makers",
          description: "Lifecycle value, minimal maintenance & asset longevity",
          href: "#owners",
          icon: ShieldCheck,
        },
        {
          title: "Specifications & FAQs",
          description: "Sub-base preparation, DIN standards & clear answers",
          href: "#questions",
          icon: FileText,
        },
      ],
    },
    {
      label: "FAQs",
      href: "#questions",
    },
  ];

  return (
    <header className="site-header">
      {/* Main Navbar */}
      <div className="nav-inner">
        <BrandLogo />

        {/* Desktop Navigation with Dropdowns */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {navCategories.map((item, idx) => {
            const hasDropdown = item.dropdown && item.dropdown.length > 0;
            const isHovered = hoveredIdx === idx;

            return (
              <div
                key={item.label}
                className={cn("nav-item-wrapper", isHovered && "has-open-dropdown")}
                onMouseEnter={() => handleMouseEnter(idx)}
                onMouseLeave={handleMouseLeave}
              >
                <a href={item.href} className="nav-item">
                  <span>{item.label}</span>
                  {item.badge && <span className="nav-pill-badge">{item.badge}</span>}
                  {hasDropdown && <ChevronDown size={12} className={cn("nav-chevron", isHovered && "rotate-180")} />}
                </a>

                {hasDropdown && (
                  <div
                    className={cn("nav-dropdown-menu", isHovered && "is-open")}
                    onMouseEnter={() => handleMouseEnter(idx)}
                    onMouseLeave={handleMouseLeave}
                    role="region"
                    aria-label={`${item.label} sub-navigation`}
                  >
                    <div className="nav-dropdown-inner">
                      {item.dropdown?.map((sub) => (
                        <a
                          key={sub.title}
                          href={sub.href}
                          className="nav-dropdown-card"
                          onClick={() => setHoveredIdx(null)}
                        >
                          <div className="nav-dropdown-icon">
                            <sub.icon size={18} />
                          </div>
                          <div className="nav-dropdown-content">
                            <div className="nav-dropdown-title-row">
                              <strong>{sub.title}</strong>
                              {sub.badge && <span className="nav-card-badge">{sub.badge}</span>}
                            </div>
                            <p>{sub.description}</p>
                          </div>
                          <ArrowUpRight size={14} className="nav-dropdown-arrow" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="nav-actions">
          <a
            href={brand.catalogue}
            download
            className="nav-catalogue-link"
            title="Download Orthotrack Technical Catalogue (PDF)"
          >
            <ArrowDownToLine size={13} />
            <span>Specs & Catalogue</span>
          </a>
          <TryTheTrackDialog
            triggerText="Try your track"
            triggerSize="sm"
            triggerClassName="nav-primary-cta"
          />
          <button
            className="mobile-menu-button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation">
          <div className="mobile-nav-inner">
            <div className="mobile-nav-header">
              <span className="mobile-nav-label">EXPLORE ORTHOTRACK SYSTEM</span>
              <span className="mobile-nav-meta">15mm SBR Build-Up</span>
            </div>

            <div className="mobile-nav-groups">
              {navCategories.map((cat) => (
                <div key={cat.label} className="mobile-nav-group">
                  <div className="mobile-nav-group-title">
                    <span>{cat.label}</span>
                    {cat.badge && <span className="nav-pill-badge">{cat.badge}</span>}
                  </div>
                  <div className="mobile-nav-group-links">
                    {cat.dropdown ? (
                      cat.dropdown.map((sub) => (
                        <a
                          key={sub.title}
                          href={sub.href}
                          className="mobile-nav-sub-item"
                          onClick={() => setOpen(false)}
                        >
                          <sub.icon size={16} />
                          <div>
                            <strong>{sub.title}</strong>
                            <small>{sub.description}</small>
                          </div>
                          <ArrowUpRight size={14} />
                        </a>
                      ))
                    ) : (
                      <a
                        href={cat.href}
                        className="mobile-nav-direct-item"
                        onClick={() => setOpen(false)}
                      >
                        <span>{cat.label}</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mobile-nav-actions">
              <a
                href={brand.catalogue}
                download
                className="mobile-catalogue-btn"
                onClick={() => setOpen(false)}
              >
                <ArrowDownToLine size={15} />
                <span>Download Technical Catalogue (PDF)</span>
              </a>
              <TryTheTrackDialog
                triggerText="Try your track"
                triggerClassName="mobile-cta-btn"
                onTriggerClick={() => setOpen(false)}
              />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return <section className="hero wrap" aria-labelledby="hero-title">
    <div className="hero-copy">
      <SectionLabel>EVERYDAY MOVEMENT. REIMAGINED FROM THE GROUND UP.</SectionLabel>
      <h1 id="hero-title">Healthy Steps<br />Begin With the<br /><span>Right Surface.</span></h1>
      <p className="hero-description">A cushioned walking surface designed to absorb impact.<br className="desktop-break" /> For a comfortable stride. And a habit that feels good.</p>
      <div className="hero-buttons">
        <TryTheTrackDialog triggerText="Book your Try the Track" />
        <a className="text-link" href="#motion">See it in motion <Play size={14} /></a>
      </div>
      <div className="hero-performance"><div><strong>15<span>mm</span></strong><span>DEDICATED SBR CUSHION</span></div><i /><div><strong>06</strong><span>LAYERS. ONE PURPOSE.</span></div><span className="hero-performance-note">Built for your body.<br />Designed for your everyday.</span></div>
    </div>
    <div className="hero-visual"><span className="hero-visual-word" aria-hidden="true">MOVE</span><div className="hero-photo"><Image src={media.hero.image} alt="A walker on an orange track surrounded by trees in warm morning light" fill priority sizes="(max-width: 760px) 92vw, 43vw" /><div className="hero-photo-shade" /><div className="photo-topline"><span className="live-dot" /> YOUR PACE. YOUR PATH.</div><div className="hero-photo-caption"><span>Built for the<br />everyday athlete.</span><p>That means you.</p></div><div className="image-index">ORTHOTRACK <span>/ EVERY STEP COUNTS</span></div></div><div className="comfort-note"><span className="comfort-note-icon"><Waves size={25} strokeWidth={1.3} /></span><div><strong>Less hard ground.</strong><span>Shock absorption starts below the surface.</span></div><Plus size={17} /></div></div>
  </section>;
}

function BenefitStrip() {
  return <div className="benefit-strip"><div className="wrap benefit-strip-inner">{[{ icon: Waves, title: "Cushioned for comfort", text: "Thoughtful support, underfoot" }, { icon: Footprints, title: "Made for everyday movement", text: "At your pace, on your terms" }, { icon: Sun, title: "Designed for the outdoors", text: "For the spaces we share" }].map(item => <div key={item.title}><item.icon size={28} strokeWidth={1.2} /><span><strong>{item.title}</strong><small>{item.text}</small></span></div>)}</div></div>;
}

function Engineering() {
  return <LayerSystem3D />;
}

function Spaces() {
  const [active, setActive] = useState(0);
  const space = spaces[active];
  return (
    <section id="spaces" className="spaces-section section">
      <div className="wrap">
        <div className="section-heading centered">
          <span className="chapter-number space-number">06</span>
          <SectionLabel>BETTER SPACES. MORE POSSIBILITIES.</SectionLabel>
          <h2>At home, wherever<br /><span className="muted">life moves.</span></h2>
          <p>For the people who walk here.<br />And the people who make it possible.</p>
        </div>
        <div className="space-tabs" role="group" aria-label="Choose a setting">
          {spaces.map((s, i) => (
            <button key={s.id} onClick={() => setActive(i)} aria-pressed={active === i} className={cn(active === i && "active")}>
              {s.short}
            </button>
          ))}
        </div>
        <div className="space-panel" key={space.id}>
          <div className="space-image">
            <Image src={space.image} fill priority sizes="(max-width: 760px) 92vw, 55vw" className="space-active-img" alt={space.title + " — illustrative imagery from the Orthotrack catalogue"} />
            <span className="space-image-label"><span />{space.title}</span>
            <div className="space-controls">
              <button onClick={() => setActive((active + spaces.length - 1) % spaces.length)} aria-label="Previous setting"><ChevronLeft size={19} /></button>
              <button onClick={() => setActive((active + 1) % spaces.length)} aria-label="Next setting"><ChevronRight size={19} /></button>
            </div>
          </div>
          <div className="space-copy">
            <span className="eyebrow">A SPACE FOR EVERYDAY WELLNESS</span>
            <h3>{space.heading}</h3>
            <p>{space.description}</p>
            <ul>{space.tags.map(tag => <li key={tag}><Check size={15} />{tag}</li>)}</ul>
            <a href="#enquire" className="text-link">Bring it to your space <ArrowUpRight size={18} /></a>
          </div>
        </div>
        <p className="section-footnote">Space imagery illustrates possible settings, rather than completed installations.</p>
      </div>
    </section>
  );
}

function ForDecisionMakers() {
  return <section id="owners" className="owners-section"><div className="wrap owners-grid"><div><SectionLabel light>FOR THE PEOPLE PLANNING AHEAD</SectionLabel><h2>A thoughtful choice.<br /><span>Beyond the first step.</span></h2><p>A great community space should be inviting to use<br className="desktop-break" /> and practical to care for.</p><Button asChild variant="light"><a href={brand.catalogue} download>Get the product catalogue <ArrowDownToLine size={17} /></a></Button></div><div className="owners-features">{[{ icon: Sparkles, title: "Made for simpler care", text: "A surface designed for straightforward cleaning and maintenance." }, { icon: Layers3, title: "A system, not just a coating", text: "A six-layer build-up with a dedicated 15 mm SBR cushion." }, { icon: Sun, title: "A finish for your project", text: "Colour, texture, and final specifications considered for your setting." }, { icon: Leaf, title: "Refresh, when it’s time", text: "Designed to allow surface renewal through recoating." }].map(item => <div key={item.title}><item.icon size={25} strokeWidth={1.25} /><span><h3>{item.title}</h3><p>{item.text}</p></span></div>)}</div></div></section>;
}

function Questions() {
  return (
    <section id="questions" className="faq-section section">
      <div className="wrap faq-grid">
        <div className="faq-intro">
          <SectionLabel>A LITTLE MORE CLARITY</SectionLabel>
          <h2>Good questions.<br /><span className="muted">Clear answers.</span></h2>
          <p>Get to know the surface<br />beneath your next step.</p>
          <a href={brand.catalogue} target="_blank" rel="noreferrer" className="text-link">Read the catalogue <ArrowUpRight size={17} /></a>
        </div>
        <Accordion type="single" collapsible defaultValue="question-0" className="faq-list">
          {faqs.map((faq, i) => (
            <AccordionItem key={faq.q} value={`question-${i}`}>
              <AccordionTrigger>{faq.q}</AccordionTrigger>
              <AccordionContent>{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}


function Contact() {
  return (
    <section id="enquire" className="contact-section">
      <div className="wrap contact-wrap">
        <div className="contact-track-lines" aria-hidden="true"><i /><i /><i /></div>
        <SectionLabel>EXPERIENCE ORTHOTRACK UNDERFOOT</SectionLabel>
        <h2>Try the track.<br /><span>Starts with your space.</span></h2>
        <p>Give your community a path worth coming back to. Experience the 15&nbsp;mm SBR cushion firsthand.</p>
        <div className="contact-actions">
          <TryTheTrackDialog triggerText="Book your Try the Track" triggerVariant="light" />
          <a href={brand.catalogue} download className="text-link">Download catalogue <ArrowDownToLine size={17} /></a>
        </div>
        <div className="contact-bottom">
          <span><span className="live-dot" /> FOR PARKS. FOR COMMUNITIES. FOR EVERY DAY.</span>
          <Footprints size={24} strokeWidth={1.1} />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer-full">
      <div className="footer-inner-wrap">
        <div className="footer-main-grid">
          {/* Left Brand & Contact Column */}
          <div className="footer-brand-col">
            <BrandLogo />
            <p className="footer-brand-desc">
              A specialist walking track system designed for a more comfortable, safer and longer-lasting experience — for healthier people and more active communities.
            </p>

            <div className="footer-contact-list">
              <a href="tel:+919811054101" className="footer-contact-item">
                <Phone size={15} />
                <span>[Phone number]</span>
              </a>
              <a href="mailto:contact@orthotrack.com" className="footer-contact-item">
                <Mail size={15} />
                <span>[Email address]</span>
              </a>
              <div className="footer-contact-item">
                <MapPin size={15} />
                <span>282, S Block Rd, Block S, Greater Kailash, New Delhi, Delhi 110048</span>
              </div>
            </div>

            <div className="footer-social-row" aria-label="Orthotrack social links">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="YouTube">
                <Youtube size={16} />
              </a>
              <a href="https://wa.me/919811054101" target="_blank" rel="noreferrer" className="footer-social-btn" aria-label="WhatsApp">
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          {/* Right Navigation Columns */}
          <div className="footer-nav-columns">
            <div className="footer-nav-col">
              <h4 className="footer-col-title">Explore</h4>
              <ul className="footer-nav-links">
                <li><a href="#top">Home</a></li>
                <li><a href="#difference">About us</a></li>
                <li><a href="#engineering">Products</a></li>
                <li><a href="#spaces">Our Applications</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-title">Track Info</h4>
              <ul className="footer-nav-links">
                <li><a href="#wellbeing">Track Benefits</a></li>
                <li><a href="#difference">Surface Comparison</a></li>
                <li><a href="#enquire">Estimation</a></li>
                <li><a href={brand.catalogue} download>Brochures</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h4 className="footer-col-title">Company</h4>
              <ul className="footer-nav-links">
                <li><a href="#enquire">Contact us</a></li>
                <li><a href="#enquire">Get in Touch</a></li>
                <li><a href="#questions">Privacy Policy</a></li>
                <li><a href="#questions">Terms &amp; Conditions</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Orthotrack. All rights reserved.
          </p>
          <div className="footer-legal-links">
            <a href="#questions">Privacy Policy</a>
            <a href="#questions">Terms &amp; Conditions</a>
            <a href="#top">Sitemap</a>
          </div>
        </div>
      </div>

      {/* Full-width ORTHOTRACK ghost watermark */}
      <div className="footer-watermark-wrap" aria-hidden="true">
        <span className="footer-watermark-text">ORTHOTRACK</span>
      </div>
    </footer>
  );
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
  return <div id="top" ref={rootRef} className="experience"><a href="#main" className="skip-link">Skip to content</a><Navigation /><main id="main"><PageTrack /><Hero /><ExpandingFilm /><BenefitStrip /><ImpactLab /><HealthJourney /><Engineering /><Durability /><Spaces /><ForDecisionMakers /><Questions /><Contact /></main><Footer /><div className={cn("mobile-sticky", showSticky && "visible")}><span>Comfort starts underfoot.<small>Follow the track. Find your next step.</small></span><TryTheTrackDialog triggerText="Try your track" triggerSize="sm" /></div></div>;
}
