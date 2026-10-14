-- ====================================================================
-- TrueVolt Systems Ltd - Database Schema & Initial Data
-- Compatible with MySQL 5.7+, MySQL 8.0+, and MariaDB (cPanel phpMyAdmin)
-- ====================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------------------
-- Table structure for `admins`
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admins` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `username` VARCHAR(60) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Table structure for `projects`
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `projects` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category` ENUM('Solar', 'Electrical', 'Security') NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `location` VARCHAR(150) NOT NULL,
  `year` VARCHAR(10) NOT NULL DEFAULT '2025',
  `ref_num` INT DEFAULT NULL,
  `image` VARCHAR(500) NOT NULL,
  `description` TEXT DEFAULT NULL,
  `specs` TEXT DEFAULT NULL COMMENT 'Comma or newline-separated specs',
  `aspect` VARCHAR(50) DEFAULT 'aspect-[4/3]',
  `is_featured` TINYINT(1) DEFAULT 1,
  `sort_order` INT DEFAULT 0,
  `status` ENUM('published', 'draft') DEFAULT 'published',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_category` (`category`),
  INDEX `idx_status` (`status`),
  INDEX `idx_featured` (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Table structure for `inquiries`
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `service` VARCHAR(100) DEFAULT NULL,
  `location` VARCHAR(150) DEFAULT NULL,
  `message` TEXT NOT NULL,
  `is_read` TINYINT(1) DEFAULT 0,
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- Default Admin Account
-- Username: admin
-- Password: TrueVolt@2025
-- --------------------------------------------------------------------
INSERT INTO `admins` (`id`, `username`, `password_hash`, `email`, `full_name`) VALUES
(1, 'admin', '$2y$12$h0mYLwh6sio1Qb4KTndFYevVsddhjMi0f.PuIVKeP24ryT/m9X7yu', 'admin@truevoltsystems.co.ke', 'TrueVolt Administrator')
ON DUPLICATE KEY UPDATE `username` = `username`;

-- --------------------------------------------------------------------
-- Pre-seeding Live Site Projects
-- --------------------------------------------------------------------
INSERT INTO `projects` (`id`, `category`, `title`, `location`, `year`, `ref_num`, `image`, `description`, `specs`, `aspect`, `is_featured`, `sort_order`, `status`) VALUES
(1, 'Solar', 'Karen Executive Residence — 12kW Hybrid Inverter & Storage Bank', 'Karen, Nairobi', '2025', 101, '/images/projects/solar-hybrid-inverter.jpeg', 'Complete off-grid-ready hybrid solar system featuring dual Deye 8kW inverters, 20kWh lithium iron phosphate battery bank, and smart mobile monitoring for real-time energy management.', '12kW PV Capacity\n20kWh LiFePO4 Storage\nDeye Hybrid Inverters\nIoT Monitoring', 'aspect-[3/4]', 1, 1, 'published'),

(2, 'Electrical', 'Woodlands Office Park — Complete DB & Wiring Retrofit', 'Westlands, Nairobi', '2024', 102, '/images/projects/electrical-commercial-db.jpeg', 'Full replacement and upgrade of ageing main distribution boards across a 6-storey commercial office block, including three-phase bus-bar systems, surge protection, and earth leakage units.', '3-Phase MDB Upgrade\nSurge Protection\nEarth Leakage Units\nKPLC Compliance', 'aspect-[4/3]', 1, 2, 'published'),

(3, 'Security', 'Riverside Corporate Campus — 64-Channel IP CCTV & Access Command', 'Riverside, Nairobi', '2025', 103, '/images/projects/security-cctv-surveillance.jpeg', 'Enterprise-grade 64-channel Dahua IP surveillance deployment with dedicated multi-screen monitoring command centre, AI-powered motion detection, and 30-day on-site NVR recording with cloud backup.', '64-Channel 4K CCTV\nDahua NVR System\nAI Motion Detection\n30-Day Recording', 'aspect-[4/3]', 1, 3, 'published'),

(4, 'Solar', 'Lake Naivasha Agri-Hub — 25kW Waterfront Ground-Mount Solar Array', 'Naivasha, Rift Valley', '2025', 104, '/images/projects/solar-waterfront-array.jpeg', 'Large-scale agricultural ground-mounted solar array engineered for irrigation pump stations and cold storage facilities, reducing diesel generator dependence by over 90%.', '25kW Ground Array\nTier-1 Mono PERC Panels\nAgricultural Net-Metering\nPump Integration', 'aspect-[16/7]', 1, 4, 'published'),

(5, 'Electrical', 'Sunset Ridge Estate — Precision Electrical & Lighting Retrofit', 'Upper Hill, Nairobi', '2024', 105, '/images/projects/electrical-specialist-wiring.jpeg', 'High-end architectural lighting integration, smart automated dimming scenes, and complete rewiring for a luxury residential property with bespoke switchgear and surge suppression.', 'Architectural LED\nSmart Scene Control\nSurge Suppression\nNCA Certified Wiring', 'aspect-[4/3]', 1, 5, 'published'),

(6, 'Solar', 'Westlands Commercial Complex — 50kW Rooftop PV Array', 'Westlands, Nairobi', '2025', 106, '/images/projects/solar-rooftop-array.jpeg', 'High-performance commercial rooftop installation across 400m² of flat-roof space, engineered for maximum yield with tilt-optimized racking and KPLC grid-tie compliance.', '50kW Rooftop PV\nGrid-Tie Compliant\nTilt-Optimized Racking\n25yr Panel Warranty', 'aspect-[4/3]', 1, 6, 'published'),

(7, 'Security', 'Runda Executive Compound — Reinforced Perimeter Razor Wire & Electric Fence', 'Runda, Nairobi', '2025', 107, '/images/projects/security-perimeter-protection.jpeg', 'High-security perimeter fortification featuring reinforced concrete wall-top razor wire coils, anti-climb measures, and integrated flood lighting for a diplomatic residential compound.', 'Razor Wire Coils\nAnti-Climb Barriers\nFlood Lighting\nPerimeter Detection', 'aspect-[3/4]', 1, 7, 'published'),

(8, 'Electrical', 'Waterfall Business District — Multi-Tier Electrical Infrastructure', 'Industrial Area, Nairobi', '2024', 108, '/images/projects/electrical-commercial-complex.jpeg', 'Large-scale commercial electrical fit-out across a multi-storey development — cable tray reticulation, sub-distribution boards, generator changeover switches, and power factor correction.', 'Cable Tray Reticulation\nSub-DB Installation\nGenerator Changeover\nPower Factor Correction', 'aspect-[16/7]', 1, 8, 'published'),

(9, 'Solar', 'Elevated Tower-Mount PV Structure — Rural Off-Grid System', 'Nanyuki, Laikipia', '2024', 109, '/images/projects/solar-tower-structure.jpeg', 'Custom-fabricated elevated solar tower designed for areas with limited roof space or shading challenges, providing unobstructed sun exposure for maximum energy harvest.', 'Elevated Tower Mount\nAnti-Shading Design\nOff-Grid Configuration\nSteel Fabrication', 'aspect-[4/3]', 0, 9, 'published'),

(10, 'Solar', '4-Tier High-Capacity Lithium Storage Rack — Battery Installation', 'Runda, Nairobi', '2025', 110, '/images/projects/solar-lithium-rack.jpeg', 'Enterprise-grade LiFePO4 battery storage installation with 4-tier rack system providing 48kWh total capacity for uninterrupted backup during extended KPLC outages.', '48kWh Total Capacity\nLiFePO4 Chemistry\n4-Tier Rack System\n10yr Battery Warranty', 'aspect-[4/3]', 0, 10, 'published')
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`);

-- --------------------------------------------------------------------
-- Table structure for `site_content`
-- --------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `site_content` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `content_key` VARCHAR(100) NOT NULL UNIQUE,
  `section` VARCHAR(50) NOT NULL,
  `value` TEXT NULL,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_section` (`section`),
  INDEX `idx_key` (`content_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `site_content` (`content_key`, `section`, `value`) VALUES
('hero_headline', 'hero', 'Power your property.\nProtect what matters.'),
('hero_description', 'hero', 'TrueVolt Systems Ltd delivers dependable solar power installations, certified electrical engineering, and smart security systems for Kenyan homes and commercial facilities.'),
('hero_showcase_image', 'hero', '/images/projects/hero-showcase.jpeg'),
('hero_showcase_title', 'hero', 'Turnkey Property Installation'),
('hero_showcase_location', 'hero', 'Karen, Nairobi'),
('hero_showcase_description', 'hero', 'A complete hybrid energy and integrated security deployment — featuring rooftop solar generation, smart battery backup, certified distribution board wiring, and IP perimeter surveillance.'),
('services_solar_image', 'services', '/images/projects/solar-panel-installation.jpeg'),
('services_solar_statement', 'services', 'Eliminate KPLC outage downtime with custom-engineered photovoltaic arrays and high-capacity lithium storage.'),
('services_solar_title', 'services', 'Solar Installations'),
('services_solar_badge', 'services', 'Photovoltaic'),
('services_solar_tags', 'services', 'Rooftop PV Arrays, Battery Backup, Hybrid Inverters, Grid-Tie Systems'),
('services_electrical_image', 'services', '/images/projects/electrical-modern-lighting.jpeg'),
('services_electrical_statement', 'services', 'Complete distribution board overhauls, three-phase reticulation, and certified NCA-compliant electrical installations.'),
('services_electrical_title', 'services', 'Electrical Contracting'),
('services_electrical_badge', 'services', 'Contracting'),
('services_electrical_tags', 'services', 'Main DB Boards, Three-Phase Wiring, NCA Certified, Fault Rectification'),
('services_security_image', 'services', '/images/projects/security-cctv-surveillance.jpeg'),
('services_security_statement', 'services', 'Integrated perimeter protection combining 4K optical surveillance, zoned electric fencing, and smart access control.'),
('services_security_title', 'services', 'Security Systems'),
('services_security_badge', 'services', 'Surveillance'),
('services_security_tags', 'services', '4K IP CCTV, Electric Fencing, Intruder Alarms, Biometric Access')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);

SET FOREIGN_KEY_CHECKS = 1;
