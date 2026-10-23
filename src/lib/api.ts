/**
 * TrueVolt Systems - API Client & Resilient Data Layer
 * 
 * Seamlessly fetches dynamic project portfolio & media from the cPanel PHP backend.
 * Provides instant, zero-downtime fallback to static site data if the backend
 * is unreachable, offline, or still being configured.
 */

export interface Project {
  id: number;
  category: "Solar" | "Electrical" | "Security" | string;
  title: string;
  location: string;
  year: string;
  refNum?: number | null;
  image: string;
  imageSrc?: string; // backwards compatibility
  description?: string;
  specs?: string[];
  aspect?: string;
  isFeatured?: boolean;
  sortOrder?: number;
  status?: string;
}

// ── Static Fallbacks (Guarantees 100% Uptime) ──────────────────────────

export const STATIC_FEATURED_PROJECTS: Project[] = [
  {
    id: 1,
    category: "Solar",
    title: "Greenfield Estate — 12kW Hybrid Inverter & Storage Bank",
    location: "Karen, Nairobi",
    year: "2024",
    refNum: 101,
    aspect: "aspect-[3/4]",
    image: "/images/projects/solar-hybrid-inverter.jpeg",
    imageSrc: "/images/projects/solar-hybrid-inverter.jpeg",
    description: "Complete off-grid-ready hybrid solar system featuring dual Deye 8kW inverters, 20kWh lithium iron phosphate battery bank, and smart mobile monitoring.",
    specs: ["12kW PV Capacity", "20kWh LiFePO4 Storage", "Deye Hybrid Inverters", "IoT Monitoring"],
    isFeatured: true,
  },
  {
    id: 2,
    category: "Electrical",
    title: "Woodlands Office Park — Complete DB & Wiring Retrofit",
    location: "Westlands, Nairobi",
    year: "2024",
    refNum: 102,
    aspect: "aspect-[4/3]",
    image: "/images/projects/electrical-commercial-db.jpeg",
    imageSrc: "/images/projects/electrical-commercial-db.jpeg",
    description: "Full replacement and upgrade of ageing main distribution boards across a 6-storey commercial office block.",
    specs: ["3-Phase MDB Upgrade", "Surge Protection", "Earth Leakage Units", "KPLC Compliance"],
    isFeatured: true,
  },
  {
    id: 3,
    category: "Security",
    title: "Riverside Corporate — 64-Channel IP CCTV & Access",
    location: "Riverside, Nairobi",
    year: "2023",
    refNum: 103,
    aspect: "aspect-[4/3]",
    image: "/images/projects/security-cctv-surveillance.jpeg",
    imageSrc: "/images/projects/security-cctv-surveillance.jpeg",
    description: "Enterprise-grade 64-channel Dahua IP surveillance deployment with dedicated monitoring command centre.",
    specs: ["64-Channel 4K CCTV", "Dahua NVR System", "AI Motion Detection", "30-Day Recording"],
    isFeatured: true,
  },
  {
    id: 4,
    category: "Solar",
    title: "Hazelwood Agri-Hub — 25kW Waterfront Solar Array",
    location: "Naivasha",
    year: "2024",
    refNum: 104,
    aspect: "aspect-[16/7]",
    image: "/images/projects/solar-waterfront-array.jpeg",
    imageSrc: "/images/projects/solar-waterfront-array.jpeg",
    description: "Large-scale agricultural ground-mounted solar array engineered for irrigation pump stations.",
    specs: ["25kW Ground Array", "Tier-1 Mono PERC Panels", "Agricultural Net-Metering", "Pump Integration"],
    isFeatured: true,
  },
  {
    id: 5,
    category: "Electrical",
    title: "Sunset Ridge Estate — Precision Electrical & Lighting Retrofit",
    location: "Upper Hill, Nairobi",
    year: "2023",
    refNum: 105,
    aspect: "aspect-[4/3]",
    image: "/images/projects/electrical-specialist-wiring.jpeg",
    imageSrc: "/images/projects/electrical-specialist-wiring.jpeg",
    description: "Specialist electrical wiring for luxury residential lighting including heavy chandelier mounting.",
    specs: ["Chandelier Mounting", "Dimmer Circuits", "Concealed Conduit", "Premium Finishes"],
    isFeatured: true,
  },
  {
    id: 6,
    category: "Solar",
    title: "Kiambu Commercial Farm — 50kW Rooftop PV Array",
    location: "Kiambu",
    year: "2024",
    refNum: 106,
    aspect: "aspect-[4/3]",
    image: "/images/projects/solar-rooftop-array.jpeg",
    imageSrc: "/images/projects/solar-rooftop-array.jpeg",
    description: "High-performance commercial rooftop installation across 400m² of flat-roof space.",
    specs: ["50kW Rooftop PV", "Grid-Tie Compliant", "Tilt-Optimized Racking", "25yr Panel Warranty"],
    isFeatured: true,
  },
  {
    id: 7,
    category: "Security",
    title: "Thornhill Executive Compound — Perimeter Protection",
    location: "Runda, Nairobi",
    year: "2024",
    refNum: 107,
    aspect: "aspect-[3/4]",
    image: "/images/projects/security-perimeter-protection.jpeg",
    imageSrc: "/images/projects/security-perimeter-protection.jpeg",
    description: "High-security perimeter fortification featuring reinforced concrete wall-top razor wire coils.",
    specs: ["Razor Wire Coils", "Anti-Climb Barriers", "Flood Lighting", "Perimeter Detection"],
    isFeatured: true,
  },
  {
    id: 8,
    category: "Electrical",
    title: "Waterfall Business District — Multi-Tier Electrical Infrastructure",
    location: "Industrial Area, Nairobi",
    year: "2024",
    refNum: 108,
    aspect: "aspect-[16/7]",
    image: "/images/projects/electrical-commercial-complex.jpeg",
    imageSrc: "/images/projects/electrical-commercial-complex.jpeg",
    description: "Large-scale commercial electrical fit-out across a multi-storey development.",
    specs: ["Cable Tray Reticulation", "Sub-DB Installation", "Generator Changeover", "Power Factor Correction"],
    isFeatured: true,
  },
];

export const STATIC_SOLAR_PROJECTS: Project[] = [
  {
    id: 101,
    category: "Solar",
    title: "Karen Executive Residence — 12kW Hybrid Inverter & LiFePO4 Storage",
    location: "Karen, Nairobi",
    year: "2025",
    image: "/images/projects/solar-hybrid-inverter.jpeg",
    imageSrc: "/images/projects/solar-hybrid-inverter.jpeg",
    description: "Complete off-grid-ready hybrid solar system featuring dual Deye 8kW inverters, 20kWh lithium iron phosphate battery bank, and smart mobile monitoring for real-time energy management.",
    specs: ["12kW PV Capacity", "20kWh LiFePO4 Storage", "Deye Hybrid Inverters", "IoT Monitoring"],
  },
  {
    id: 102,
    category: "Solar",
    title: "Lake Naivasha Agri-Hub — 25kW Waterfront Ground-Mount Array",
    location: "Naivasha, Rift Valley",
    year: "2025",
    image: "/images/projects/solar-waterfront-array.jpeg",
    imageSrc: "/images/projects/solar-waterfront-array.jpeg",
    description: "Large-scale agricultural ground-mounted solar array engineered for irrigation pump stations and cold storage facilities, reducing diesel generator dependence by over 90%.",
    specs: ["25kW Ground Array", "Tier-1 Mono PERC Panels", "Agricultural Net-Metering", "Pump Integration"],
  },
  {
    id: 103,
    category: "Solar",
    title: "Westlands Commercial Complex — 50kW Rooftop PV Array",
    location: "Westlands, Nairobi",
    year: "2025",
    image: "/images/projects/solar-rooftop-array.jpeg",
    imageSrc: "/images/projects/solar-rooftop-array.jpeg",
    description: "High-performance commercial rooftop installation across 400m² of flat-roof space, engineered for maximum yield with tilt-optimized racking and KPLC grid-tie compliance.",
    specs: ["50kW Rooftop PV", "Grid-Tie Compliant", "Tilt-Optimized Racking", "25yr Panel Warranty"],
  },
  {
    id: 104,
    category: "Solar",
    title: "Elevated Tower-Mount PV Structure — Rural Off-Grid System",
    location: "Nanyuki, Laikipia",
    year: "2024",
    image: "/images/projects/solar-tower-structure.jpeg",
    imageSrc: "/images/projects/solar-tower-structure.jpeg",
    description: "Custom-fabricated elevated solar tower designed for areas with limited roof space or shading challenges, providing unobstructed sun exposure for maximum energy harvest.",
    specs: ["Elevated Tower Mount", "Anti-Shading Design", "Off-Grid Configuration", "Steel Fabrication"],
  },
  {
    id: 105,
    category: "Solar",
    title: "4-Tier High-Capacity Lithium Storage Rack — Battery Installation",
    location: "Runda, Nairobi",
    year: "2025",
    image: "/images/projects/solar-lithium-rack.jpeg",
    imageSrc: "/images/projects/solar-lithium-rack.jpeg",
    description: "Enterprise-grade LiFePO4 battery storage installation with 4-tier rack system providing 48kWh total capacity for uninterrupted backup during extended KPLC outages.",
    specs: ["48kWh Total Capacity", "LiFePO4 Chemistry", "4-Tier Rack System", "10yr Battery Warranty"],
  },
  {
    id: 106,
    category: "Solar",
    title: "Certified Technician Roof Deployment — Residential PV Installation",
    location: "Lavington, Nairobi",
    year: "2025",
    image: "/images/projects/solar-panel-installation.jpeg",
    imageSrc: "/images/projects/solar-panel-installation.jpeg",
    description: "Professional roof-mounted solar panel installation by EPRA-certified technicians with full structural assessment, waterproofing integrity, and optimized panel orientation.",
    specs: ["Roof Structural Assessment", "EPRA Certified Team", "Waterproof Mounting", "Optimal Orientation"],
  },
];

export const STATIC_ELECTRICAL_PROJECTS: Project[] = [
  {
    id: 201,
    category: "Electrical",
    title: "Westlands Office Park — Complete Main Distribution Board Retrofit",
    location: "Westlands, Nairobi",
    year: "2025",
    image: "/images/projects/electrical-commercial-db.jpeg",
    imageSrc: "/images/projects/electrical-commercial-db.jpeg",
    description: "Full replacement and upgrade of ageing main distribution boards across a 6-storey commercial office block, including three-phase bus-bar systems, surge protection, and earth leakage units.",
    specs: ["3-Phase MDB Upgrade", "Surge Protection", "Earth Leakage Units", "KPLC Compliance"],
  },
  {
    id: 202,
    category: "Electrical",
    title: "Industrial Area Complex — Multi-Tier Electrical Infrastructure",
    location: "Industrial Area, Nairobi",
    year: "2025",
    image: "/images/projects/electrical-commercial-complex.jpeg",
    imageSrc: "/images/projects/electrical-commercial-complex.jpeg",
    description: "Large-scale commercial electrical fit-out across a multi-storey development — cable tray reticulation, sub-distribution boards, generator changeover switches, and power factor correction.",
    specs: ["Cable Tray Reticulation", "Sub-DB Installation", "Generator Changeover", "Power Factor Correction"],
  },
  {
    id: 203,
    category: "Electrical",
    title: "Karen Residence — Precision Chandelier & Architectural Wiring",
    location: "Karen, Nairobi",
    year: "2025",
    image: "/images/projects/electrical-specialist-wiring.jpeg",
    imageSrc: "/images/projects/electrical-specialist-wiring.jpeg",
    description: "Specialist electrical wiring for luxury residential lighting — including heavy chandelier mounting, dimmer circuit integration, and concealed conduit runs in plastered ceilings.",
    specs: ["Chandelier Mounting", "Dimmer Circuits", "Concealed Conduit", "Premium Finishes"],
  },
  {
    id: 204,
    category: "Electrical",
    title: "Kilimani Apartments — Modern Geometric LED Ceiling Lighting",
    location: "Kilimani, Nairobi",
    year: "2024",
    image: "/images/projects/electrical-modern-lighting.jpeg",
    imageSrc: "/images/projects/electrical-modern-lighting.jpeg",
    description: "Contemporary architectural LED lighting installation featuring geometric gypsum ceiling designs with integrated strip lighting, downlights, and smart control systems.",
    specs: ["LED Strip Integration", "Gypsum Ceiling Design", "Smart Controls", "Energy Efficient"],
  },
];

export const STATIC_SECURITY_PROJECTS: Project[] = [
  {
    id: 301,
    category: "Security",
    title: "Riverside Corporate Campus — 64-Channel 4K IP CCTV Command Centre",
    location: "Riverside, Nairobi",
    year: "2025",
    image: "/images/projects/security-cctv-surveillance.jpeg",
    imageSrc: "/images/projects/security-cctv-surveillance.jpeg",
    description: "Enterprise-grade 64-channel Dahua IP surveillance deployment with dedicated multi-screen monitoring command centre, AI-powered motion detection, and 30-day on-site NVR recording with cloud backup.",
    specs: ["64-Channel 4K CCTV", "Dahua NVR System", "AI Motion Detection", "30-Day Recording"],
  },
  {
    id: 302,
    category: "Security",
    title: "Runda Executive Compound — Reinforced Perimeter Razor Wire Defence",
    location: "Runda, Nairobi",
    year: "2025",
    image: "/images/projects/security-perimeter-protection.jpeg",
    imageSrc: "/images/projects/security-perimeter-protection.jpeg",
    description: "High-security perimeter fortification featuring reinforced concrete wall-top razor wire coils, anti-climb measures, and integrated flood lighting for a diplomatic residential compound.",
    specs: ["Razor Wire Coils", "Anti-Climb Barriers", "Flood Lighting", "Perimeter Detection"],
  },
  {
    id: 303,
    category: "Security",
    title: "Karen Executive Estate — Integrated Dusk Illumination & Perimeter Security",
    location: "Karen, Nairobi",
    year: "2025",
    image: "/images/projects/hero-showcase.jpeg",
    imageSrc: "/images/projects/hero-showcase.jpeg",
    description: "Complete estate security integration — perimeter CCTV coverage, motion-activated flood lighting, electric fencing with zone monitoring, and solar-backed UPS ensuring zero-downtime operation during power outages.",
    specs: ["Estate Integration", "Motion Lighting", "Electric Fencing", "Solar UPS Backup"],
  },
  {
    id: 304,
    category: "Security",
    title: "Muthaiga Residence — Premium Estate Exterior Security & Lighting",
    location: "Muthaiga, Nairobi",
    year: "2024",
    image: "/images/projects/residential-executive-estate.jpeg",
    imageSrc: "/images/projects/residential-executive-estate.jpeg",
    description: "Luxury residential security deployment featuring discreet IP camera placement, architectural security lighting, smart gate automation with intercom, and remote smartphone monitoring.",
    specs: ["Discreet IP Cameras", "Gate Automation", "Intercom System", "Remote Monitoring"],
  },
];

// ── API Configuration & URL Resolution ─────────────────────────────────

export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL || "";
  return url.replace(/\/+$/, "");
}

/**
 * Resolves an image path from either the PHP upload server or local public directory
 */
export function resolveImageUrl(image: string): string {
  if (!image) return "/images/projects/solar-panel-installation.jpeg";
  if (image.startsWith("http://") || image.startsWith("https://") || image.startsWith("data:")) {
    return image;
  }
  
  // If uploaded via PHP CMS
  if (image.startsWith("uploads/") || image.startsWith("/uploads/")) {
    const apiBase = getApiBaseUrl();
    if (apiBase) {
      return `${apiBase}/${image.replace(/^\/+/, "")}`;
    }
  }

  // Local static asset fallback
  return image.startsWith("/") ? image : `/${image}`;
}

/**
 * Resiliently fetch projects from the PHP API with fast timeout & static fallback
 */
export async function fetchProjects(options: {
  category?: "Solar" | "Electrical" | "Security" | string;
  featured?: boolean;
} = {}): Promise<Project[]> {
  const apiBase = getApiBaseUrl();

  // If no API URL configured yet, return matching static dataset immediately
  if (!apiBase) {
    return getFallbackProjects(options);
  }

  try {
    const params = new URLSearchParams();
    if (options.category) params.append("category", options.category);
    if (options.featured !== undefined) params.append("featured", options.featured ? "1" : "0");

    const endpoint = `${apiBase}/api/projects.php?${params.toString()}`;

    // Fast 3.5s timeout prevents Vercel page hangs if cPanel server is sleeping
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(endpoint, {
      signal: controller.signal,
      next: { revalidate: 60 }, // ISR: cache for 60 seconds on Vercel
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[TrueVolt API] Server responded with status ${response.status}. Using static fallback.`);
      return getFallbackProjects(options);
    }

    const json = await response.json();
    if (json.status === "success" && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map((p: Project) => ({
        ...p,
        image: resolveImageUrl(p.image),
        imageSrc: resolveImageUrl(p.image),
      }));
    }

    // If API returned empty array, use fallback
    return getFallbackProjects(options);

  } catch (error) {
    // Network error, CORS error, timeout, or cPanel offline
    console.info("[TrueVolt API] Backend currently unreachable. Seamlessly served static content.");
    return getFallbackProjects(options);
  }
}

/**
 * Get internal static projects according to filters
 */
function getFallbackProjects(options: {
  category?: string;
  featured?: boolean;
}): Project[] {
  if (options.featured) {
    return STATIC_FEATURED_PROJECTS;
  }

  if (options.category) {
    const cat = options.category.toLowerCase();
    if (cat === "solar") return STATIC_SOLAR_PROJECTS;
    if (cat === "electrical") return STATIC_ELECTRICAL_PROJECTS;
    if (cat === "security") return STATIC_SECURITY_PROJECTS;
  }

  // All combined
  return STATIC_FEATURED_PROJECTS;
}

/**
 * Submit inquiry to PHP backend API with graceful response
 */
export async function submitContactInquiry(data: {
  name: string;
  email: string;
  phone: string;
  service?: string;
  location?: string;
  message: string;
}): Promise<{ success: boolean; message: string }> {
  const apiBase = getApiBaseUrl();
  const endpoint = apiBase ? `${apiBase}/api/contact.php` : `/backend/api/contact.php`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await response.json().catch(() => null);

    if (response.ok && json?.status === "success") {
      return {
        success: true,
        message: json.data?.message || "Thank you! Your inquiry has been sent to our engineering team.",
      };
    }

    return {
      success: false,
      message: json?.message || "Failed to submit inquiry. Please call or WhatsApp us directly.",
    };
  } catch (err: any) {
    console.error("Inquiry submission error:", err);
    return {
      success: false,
      message: "Unable to connect to the backend server. Please verify your connection or contact us via WhatsApp.",
    };
  }
}

// ── Dynamic Site Content (Hero & What We Deliver) ──────────────────────

export interface SiteContent {
  hero_headline: string;
  hero_description: string;
  hero_showcase_image: string;
  hero_showcase_title: string;
  hero_showcase_location: string;
  hero_showcase_description: string;
  services_solar_title: string;
  services_solar_badge: string;
  services_solar_statement: string;
  services_solar_image: string;
  services_solar_tags: string;
  services_electrical_title: string;
  services_electrical_badge: string;
  services_electrical_statement: string;
  services_electrical_image: string;
  services_electrical_tags: string;
  services_security_title: string;
  services_security_badge: string;
  services_security_statement: string;
  services_security_image: string;
  services_security_tags: string;
}

export const DEFAULT_SITE_CONTENT: SiteContent = {
  hero_headline: "Power your property.\nProtect what matters.",
  hero_description: "TrueVolt Systems Ltd delivers dependable solar power installations, certified electrical engineering, and smart security systems for Kenyan homes and commercial facilities.",
  hero_showcase_image: "/images/projects/hero-showcase.jpeg",
  hero_showcase_title: "Turnkey Property Installation",
  hero_showcase_location: "Karen, Nairobi",
  hero_showcase_description: "A complete hybrid energy and integrated security deployment — featuring rooftop solar generation, smart battery backup, certified distribution board wiring, and IP perimeter surveillance.",
  services_solar_title: "Solar Installations",
  services_solar_badge: "Photovoltaic",
  services_solar_statement: "Eliminate KPLC outage downtime with custom-engineered photovoltaic arrays and high-capacity lithium storage.",
  services_solar_image: "/images/projects/solar-panel-installation.jpeg",
  services_solar_tags: "Rooftop PV Arrays, Battery Backup, Hybrid Inverters, Grid-Tie Systems",
  services_electrical_title: "Electrical Contracting",
  services_electrical_badge: "Contracting",
  services_electrical_statement: "Complete distribution board overhauls, three-phase reticulation, and certified NCA-compliant electrical installations.",
  services_electrical_image: "/images/projects/electrical-modern-lighting.jpeg",
  services_electrical_tags: "Main DB Boards, Three-Phase Wiring, NCA Certified, Fault Rectification",
  services_security_title: "Security Systems",
  services_security_badge: "Surveillance",
  services_security_statement: "Integrated perimeter protection combining 4K optical surveillance, zoned electric fencing, and smart access control.",
  services_security_image: "/images/projects/security-cctv-surveillance.jpeg",
  services_security_tags: "4K IP CCTV, Electric Fencing, Intruder Alarms, Biometric Access",
};

export async function fetchSiteContent(): Promise<SiteContent> {
  const apiBase = getApiBaseUrl();

  if (!apiBase) {
    return DEFAULT_SITE_CONTENT;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`${apiBase}/api/content.php`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return DEFAULT_SITE_CONTENT;
    }

    const json = await response.json();
    if (json.status === "success" && json.data) {
      return {
        ...DEFAULT_SITE_CONTENT,
        ...json.data,
      };
    }

    return DEFAULT_SITE_CONTENT;
  } catch (err) {
    return DEFAULT_SITE_CONTENT;
  }
}
