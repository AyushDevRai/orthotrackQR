/** Replace media URLs here; keep supplied catalogue images as poster fallbacks. */
export const brand = {
  name: "Orthotrack",
  website: "https://www.orthotrack.com",
  // Set verified contact details to enable direct enquiries. No data is sent to a server.
  email: "",
  phone: "",
  whatsapp: "", // International digits only, for example 919876543210.
  catalogue: "/orthotrack-catalogue.pdf",
};

export const media = {
  hero: { image: "/images/hero-park-runners.jpg", video: "" },
  story: { poster: "/images/motion-poster.jpg", video: "/media/orthotrack-motion.mp4" },
  detail: "/images/track-detail.webp",
  layers: "/images/surface-layers.webp",
};

export const spaces = [
  { id: "parks", title: "Parks & public spaces", short: "Public parks", image: "/images/belong-park.jpg", heading: "A little more life. In every park.", description: "Turn a daily route into a place people look forward to. A dedicated, cushioned walking surface brings everyday movement into the heart of your public space.", tags: ["Municipal parks", "Public walking paths", "Community wellness"] },
  { id: "communities", title: "Residential communities", short: "Communities", image: "/images/belong-community.jpg", heading: "Your neighbourhood. A little more connected.", description: "Morning walks, evening conversations, and familiar faces. Give residents a welcoming route for movement, right outside their door.", tags: ["RWAs & housing societies", "Residential developments", "Shared outdoor spaces"] },
  { id: "campuses", title: "Schools & campuses", short: "Campuses", image: "/images/belong-campus.jpg", heading: "Make movement part of the everyday.", description: "Create an inviting route around learning and working spaces, designed for walking and light recreational activity at an individual pace.", tags: ["School grounds", "Institutional campuses", "Recreation areas"] },
  { id: "wellness", title: "Wellness spaces", short: "Wellness spaces", image: "/images/belong-wellness.jpg", heading: "A space to pause. A reason to move.", description: "Connect landscaped spaces with a thoughtfully finished wellness path. A setting for unhurried walks, fresh air, and time for yourself.", tags: ["Wellness arenas", "Landscaped paths", "Outdoor leisure"] },
];

export const layers = [
  { name: "Final coloured finish", detail: "The surface you experience. A seamless coloured wear finish with texture finalised for your project.", color: "#ee4b23", number: "06" },
  { name: "Protective top coat", detail: "Adds surface protection and contributes to the durability and appearance of the finished track.", color: "#cd3c22", number: "05" },
  { name: "Pore-filling layer", detail: "Fills surface voids and consolidates the granular SBR structure ahead of finishing.", color: "#7f9399", number: "04" },
  { name: "Prime layer", detail: "Refines the surface profile to create a more uniform plane before the wear surface is applied.", color: "#a7a8a0", number: "03" },
  { name: "15 mm SBR cushion", detail: "A primary shock-absorbing cushion at the heart of the system, rather than a thin surface coating.", color: "#3b3d38", number: "02" },
  { name: "Prepared substrate + primer", detail: "The foundation. Prepared concrete or a suitable existing substrate, with a primer to establish adhesion.", color: "#b6b8b1", number: "01" },
];

export const faqs = [
  { q: "What exactly is Orthotrack?", a: "Orthotrack is a multi-layer cushioned walking-track system for outdoor walking paths and wellness spaces. It combines a 15 mm SBR shock-absorbing cushion with preparation, refining, protective, and coloured finishing layers." },
  { q: "Who is it designed for?", a: "Everyday walkers and people enjoying light recreational activity. The focus is comfort and regular movement, rather than competitive athletics. It can be considered for parks, residential communities, schools, campuses, and wellness arenas." },
  { q: "What makes it different from a hard walking path?", a: "The key difference is the dedicated cushion beneath the finished surface. Orthotrack is designed to make walking feel more comfortable, with a seamless coloured finish and a texture specified for the project. Individual experiences and performance depend on the finished installation and conditions." },
  { q: "Can it be installed on an existing path?", a: "A prepared concrete surface or a suitable existing walking-track substrate may be used. The Orthotrack team needs to assess the condition, preparation requirements, drainage, and intended use before confirming suitability." },
  { q: "How is the track maintained?", a: "The system is designed for straightforward cleaning and surface renewal by recoating. Ask the team for the maintenance schedule, approved cleaning methods, and recoat requirements for your specific installation." },
  { q: "Can I request specifications for a public project?", a: "Yes. Download the catalogue and prepare a project enquiry below. Ask for the proposed build-up, substrate preparation, drainage details, maintenance requirements, and available test reports. The catalogue marks several performance test values and service life as still to be established." },
];
