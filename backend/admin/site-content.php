<?php
require_once __DIR__ . '/auth.php';
requireAuth();

$db = getDbConnection();
$errors = [];

// Handle update
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        $errors[] = "Security session expired. Please reload and try again.";
    } else {
        $fields = [
            'hero_headline'               => trim($_POST['hero_headline'] ?? ''),
            'hero_description'            => trim($_POST['hero_description'] ?? ''),
            'hero_showcase_title'         => trim($_POST['hero_showcase_title'] ?? ''),
            'hero_showcase_location'      => trim($_POST['hero_showcase_location'] ?? ''),
            'hero_showcase_description'   => trim($_POST['hero_showcase_description'] ?? ''),
            'hero_showcase_image'         => trim($_POST['hero_showcase_image'] ?? ''),

            // 01 Solar
            'services_solar_title'        => trim($_POST['services_solar_title'] ?? 'Solar Installations'),
            'services_solar_badge'        => trim($_POST['services_solar_badge'] ?? 'Photovoltaic'),
            'services_solar_statement'    => trim($_POST['services_solar_statement'] ?? ''),
            'services_solar_image'        => trim($_POST['services_solar_image'] ?? ''),
            'services_solar_tags'         => trim($_POST['services_solar_tags'] ?? ''),

            // 02 Electrical
            'services_electrical_title'   => trim($_POST['services_electrical_title'] ?? 'Electrical Contracting'),
            'services_electrical_badge'   => trim($_POST['services_electrical_badge'] ?? 'Contracting'),
            'services_electrical_statement' => trim($_POST['services_electrical_statement'] ?? ''),
            'services_electrical_image'   => trim($_POST['services_electrical_image'] ?? ''),
            'services_electrical_tags'    => trim($_POST['services_electrical_tags'] ?? ''),

            // 03 Security
            'services_security_title'     => trim($_POST['services_security_title'] ?? 'Security Systems'),
            'services_security_badge'     => trim($_POST['services_security_badge'] ?? 'Surveillance'),
            'services_security_statement' => trim($_POST['services_security_statement'] ?? ''),
            'services_security_image'     => trim($_POST['services_security_image'] ?? ''),
            'services_security_tags'      => trim($_POST['services_security_tags'] ?? ''),
        ];

        // Handle file uploads if any provided
        $uploadDir = __DIR__ . '/../uploads/projects/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $imageUploadMap = [
            'hero_showcase_image_file' => 'hero_showcase_image',
            'services_solar_image_file' => 'services_solar_image',
            'services_electrical_image_file' => 'services_electrical_image',
            'services_security_image_file' => 'services_security_image',
        ];

        foreach ($imageUploadMap as $fileInputName => $contentKey) {
            if (!empty($_FILES[$fileInputName]['name']) && $_FILES[$fileInputName]['error'] === UPLOAD_ERR_OK) {
                $file = $_FILES[$fileInputName];
                $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
                $allowed = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

                if (in_array($ext, $allowed)) {
                    $slug = str_replace('_image', '', $contentKey);
                    $fileName = 'content-' . $slug . '-' . time() . '.' . $ext;
                    $targetPath = $uploadDir . $fileName;

                    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
                        $fields[$contentKey] = 'uploads/projects/' . $fileName;
                    }
                }
            }
        }

        // Save to database
        try {
            $stmt = $db->prepare("INSERT INTO site_content (content_key, section, value) VALUES (:k, :sec, :val) ON DUPLICATE KEY UPDATE value = :val2");
            foreach ($fields as $key => $val) {
                $section = str_starts_with($key, 'hero_') ? 'hero' : 'services';
                $stmt->execute([
                    ':k'    => $key,
                    ':sec'  => $section,
                    ':val'  => $val,
                    ':val2' => $val,
                ]);
            }
            $_SESSION['flash_success'] = "Homepage content, service titles, badges, and images successfully updated.";
            header('Location: site-content.php');
            exit;
        } catch (Throwable $t) {
            $errors[] = "Failed to save content: " . $t->getMessage();
        }
    }
}

// Fetch current content values
$stmt = $db->query("SELECT content_key, value FROM site_content");
$content = [];
while ($row = $stmt->fetch()) {
    $content[$row['content_key']] = $row['value'];
}

$csrfToken = getCsrfToken();
$pageTitle = 'Homepage Content';
require_once __DIR__ . '/includes/header.php';
?>

<!-- Clean Page Header -->
<div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  <div>
    <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
      Homepage &amp; Service Sections
    </h1>
    <p class="text-sm text-slate-500 mt-1">
      Manage the hero showcase, service titles, division badges, statements, and photography.
    </p>
  </div>
  <div>
    <a
      href="<?= htmlspecialchars(getLiveSiteUrl()) ?>"
      target="_blank"
      class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-[#2854A6] hover:border-[#2854A6] transition-colors shadow-xs"
    >
      <span>Preview Live Site</span>
      <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  </div>
</div>

<!-- Errors Alert -->
<?php if (!empty($errors)): ?>
  <div class="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-1">
    <div class="font-bold">Errors occurred:</div>
    <ul class="list-disc list-inside">
      <?php foreach ($errors as $e): ?>
        <li><?= htmlspecialchars($e) ?></li>
      <?php endforeach; ?>
    </ul>
  </div>
<?php endif; ?>

<form method="POST" action="" enctype="multipart/form-data" class="space-y-10">
  <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">

  <!-- ═══════════════════════════════════════════════════════════════════ -->
  <!-- 1. HERO SECTION MANAGEMENT -->
  <!-- ═══════════════════════════════════════════════════════════════════ -->
  <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
    <div class="flex items-center gap-3 pb-5 border-b border-slate-100 mb-6">
      <div class="w-9 h-9 rounded-xl bg-blue-50 text-[#2854A6] flex items-center justify-center font-bold text-sm">
        1
      </div>
      <div>
        <h2 class="font-heading font-bold text-lg text-slate-900">Hero Section</h2>
        <p class="text-xs text-slate-500">Main headline, introduction narrative, and right-hand installation showcase</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left: Headline & Text -->
      <div class="lg:col-span-7 space-y-5">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Main Hero Headline
          </label>
          <textarea
            name="hero_headline"
            rows="2"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#2854A6] focus:ring-2 focus:ring-[#2854A6]/20 font-heading font-bold"
          ><?= htmlspecialchars($content['hero_headline'] ?? '') ?></textarea>
          <span class="text-xs text-slate-400 mt-1 block">Default: Power your property. Protect what matters.</span>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Introduction Description Narrative
          </label>
          <textarea
            name="hero_description"
            rows="3"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm leading-relaxed focus:outline-none focus:border-[#2854A6] focus:ring-2 focus:ring-[#2854A6]/20"
          ><?= htmlspecialchars($content['hero_description'] ?? '') ?></textarea>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Showcase Title
            </label>
            <input
              type="text"
              name="hero_showcase_title"
              value="<?= htmlspecialchars($content['hero_showcase_title'] ?? '') ?>"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#2854A6]"
            >
          </div>
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Showcase Location
            </label>
            <input
              type="text"
              name="hero_showcase_location"
              value="<?= htmlspecialchars($content['hero_showcase_location'] ?? '') ?>"
              class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#2854A6]"
            >
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Showcase Card Description
          </label>
          <textarea
            name="hero_showcase_description"
            rows="2"
            class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs sm:text-sm leading-relaxed focus:outline-none focus:border-[#2854A6]"
          ><?= htmlspecialchars($content['hero_showcase_description'] ?? '') ?></textarea>
        </div>
      </div>

      <!-- Right: Hero Showcase Image -->
      <div class="lg:col-span-5 space-y-4">
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Hero Showcase Photo
        </label>

        <div class="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 relative group">
          <img
            id="preview_hero_showcase_image"
            src="<?= htmlspecialchars(adminAssetUrl($content['hero_showcase_image'] ?? null, '../images/projects/hero-showcase.jpeg')) ?>"
            alt="Hero Preview"
            class="w-full h-full object-cover"
            onerror="this.onerror=null; this.src='../images/projects/hero-showcase.jpeg';"
          >
        </div>

        <div>
          <label class="block text-xs font-semibold text-slate-600 mb-1">Upload New Showcase Photo</label>
          <input
            type="file"
            name="hero_showcase_image_file"
            accept="image/*"
            class="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
            onchange="previewFile(this, 'preview_hero_showcase_image')"
          >
          <input
            type="hidden"
            name="hero_showcase_image"
            value="<?= htmlspecialchars($content['hero_showcase_image'] ?? '') ?>"
          >
        </div>
      </div>

    </div>
  </div>


  <!-- ═══════════════════════════════════════════════════════════════════ -->
  <!-- 2. "WHAT WE DELIVER" (3 SERVICES: TITLES, BADGES, STATEMENTS, TAGS & IMAGES) -->
  <!-- ═══════════════════════════════════════════════════════════════════ -->
  <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
    <div class="flex items-center gap-3 pb-5 border-b border-slate-100 mb-6">
      <div class="w-9 h-9 rounded-xl bg-amber-50 text-[#F7941D] flex items-center justify-center font-bold text-sm">
        2
      </div>
      <div>
        <h2 class="font-heading font-bold text-lg text-slate-900">"What We Deliver" Section</h2>
        <p class="text-xs text-slate-500">Manage service titles, category badges (e.g. Photovoltaic, Contracting, Surveillance), statements, tags, and images</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
      
      <!-- 01: Solar Installations -->
      <div class="border border-slate-200 rounded-2xl p-5 bg-[#FAF8F5]/60 flex flex-col justify-between space-y-4">
        <div class="space-y-4">
          
          <!-- Header Area with Editable Badge & Number -->
          <div class="p-3 bg-white rounded-xl border border-slate-200 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-[#F7941D]">01 &bull; SOLAR</span>
              <span id="badge_preview_solar" class="px-2.5 py-0.5 rounded-full bg-amber-50 text-[#F7941D] text-[11px] font-bold border border-amber-200">
                <?= htmlspecialchars($content['services_solar_badge'] ?? 'Photovoltaic') ?>
              </span>
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Badge Label
              </label>
              <input
                type="text"
                name="services_solar_badge"
                value="<?= htmlspecialchars($content['services_solar_badge'] ?? 'Photovoltaic') ?>"
                placeholder="Photovoltaic"
                class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#F7941D]"
                oninput="document.getElementById('badge_preview_solar').textContent = this.value || 'Badge'"
              >
            </div>
          </div>

          <!-- Service Title -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Service Card Title
            </label>
            <input
              type="text"
              name="services_solar_title"
              value="<?= htmlspecialchars($content['services_solar_title'] ?? 'Solar Installations') ?>"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#F7941D]"
            >
          </div>

          <!-- Image Preview & Uploader -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Featured Card Image
            </label>
            <div class="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mb-2">
              <img
                id="preview_services_solar_image"
                src="<?= htmlspecialchars(adminAssetUrl($content['services_solar_image'] ?? null, '../images/projects/solar-panel-installation.jpeg')) ?>"
                alt="Solar Preview"
                class="w-full h-full object-cover"
                onerror="this.onerror=null; this.src='../images/projects/solar-panel-installation.jpeg';"
              >
            </div>

            <input
              type="file"
              name="services_solar_image_file"
              accept="image/*"
              class="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-100 cursor-pointer"
              onchange="previewFile(this, 'preview_services_solar_image')"
            >
            <input
              type="hidden"
              name="services_solar_image"
              value="<?= htmlspecialchars($content['services_solar_image'] ?? '') ?>"
            >
          </div>

          <!-- Statement -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              One-Sentence Statement
            </label>
            <textarea
              name="services_solar_statement"
              rows="3"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs leading-relaxed focus:outline-none focus:border-[#F7941D]"
            ><?= htmlspecialchars($content['services_solar_statement'] ?? '') ?></textarea>
          </div>

          <!-- Feature Tags -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Feature Tags (Comma-separated)
            </label>
            <input
              type="text"
              name="services_solar_tags"
              value="<?= htmlspecialchars($content['services_solar_tags'] ?? 'Rooftop PV Arrays, Battery Backup, Hybrid Inverters, Grid-Tie Systems') ?>"
              class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-700 focus:outline-none focus:border-[#F7941D]"
            >
          </div>

        </div>
      </div>

      <!-- 02: Electrical Contracting -->
      <div class="border border-slate-200 rounded-2xl p-5 bg-[#FAF8F5]/60 flex flex-col justify-between space-y-4">
        <div class="space-y-4">
          
          <!-- Header Area with Editable Badge & Number -->
          <div class="p-3 bg-white rounded-xl border border-slate-200 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-[#2854A6]">02 &bull; ELECTRICAL</span>
              <span id="badge_preview_electrical" class="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2854A6] text-[11px] font-bold border border-blue-200">
                <?= htmlspecialchars($content['services_electrical_badge'] ?? 'Contracting') ?>
              </span>
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Badge Label
              </label>
              <input
                type="text"
                name="services_electrical_badge"
                value="<?= htmlspecialchars($content['services_electrical_badge'] ?? 'Contracting') ?>"
                placeholder="Contracting"
                class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#2854A6]"
                oninput="document.getElementById('badge_preview_electrical').textContent = this.value || 'Badge'"
              >
            </div>
          </div>

          <!-- Service Title -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Service Card Title
            </label>
            <input
              type="text"
              name="services_electrical_title"
              value="<?= htmlspecialchars($content['services_electrical_title'] ?? 'Electrical Contracting') ?>"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#2854A6]"
            >
          </div>

          <!-- Image Preview & Uploader -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Featured Card Image
            </label>
            <div class="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mb-2">
              <img
                id="preview_services_electrical_image"
                src="<?= htmlspecialchars(adminAssetUrl($content['services_electrical_image'] ?? null, '../images/projects/electrical-modern-lighting.jpeg')) ?>"
                alt="Electrical Preview"
                class="w-full h-full object-cover"
                onerror="this.onerror=null; this.src='../images/projects/electrical-commercial-db.jpeg';"
              >
            </div>

            <input
              type="file"
              name="services_electrical_image_file"
              accept="image/*"
              class="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-100 cursor-pointer"
              onchange="previewFile(this, 'preview_services_electrical_image')"
            >
            <input
              type="hidden"
              name="services_electrical_image"
              value="<?= htmlspecialchars($content['services_electrical_image'] ?? '') ?>"
            >
          </div>

          <!-- Statement -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              One-Sentence Statement
            </label>
            <textarea
              name="services_electrical_statement"
              rows="3"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs leading-relaxed focus:outline-none focus:border-[#2854A6]"
            ><?= htmlspecialchars($content['services_electrical_statement'] ?? '') ?></textarea>
          </div>

          <!-- Feature Tags -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Feature Tags (Comma-separated)
            </label>
            <input
              type="text"
              name="services_electrical_tags"
              value="<?= htmlspecialchars($content['services_electrical_tags'] ?? 'Main DB Boards, Three-Phase Wiring, NCA Certified, Fault Rectification') ?>"
              class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-700 focus:outline-none focus:border-[#2854A6]"
            >
          </div>

        </div>
      </div>

      <!-- 03: Security Systems -->
      <div class="border border-slate-200 rounded-2xl p-5 bg-[#FAF8F5]/60 flex flex-col justify-between space-y-4">
        <div class="space-y-4">
          
          <!-- Header Area with Editable Badge & Number -->
          <div class="p-3 bg-white rounded-xl border border-slate-200 space-y-2.5">
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-slate-900">03 &bull; SECURITY</span>
              <span id="badge_preview_security" class="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-800 text-[11px] font-bold border border-slate-200">
                <?= htmlspecialchars($content['services_security_badge'] ?? 'Surveillance') ?>
              </span>
            </div>
            <div>
              <label class="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Badge Label
              </label>
              <input
                type="text"
                name="services_security_badge"
                value="<?= htmlspecialchars($content['services_security_badge'] ?? 'Surveillance') ?>"
                placeholder="Surveillance"
                class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-900 focus:outline-none focus:border-slate-800"
                oninput="document.getElementById('badge_preview_security').textContent = this.value || 'Badge'"
              >
            </div>
          </div>

          <!-- Service Title -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Service Card Title
            </label>
            <input
              type="text"
              name="services_security_title"
              value="<?= htmlspecialchars($content['services_security_title'] ?? 'Security Systems') ?>"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-slate-800"
            >
          </div>

          <!-- Image Preview & Uploader -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Featured Card Image
            </label>
            <div class="aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mb-2">
              <img
                id="preview_services_security_image"
                src="<?= htmlspecialchars(adminAssetUrl($content['services_security_image'] ?? null, '../images/projects/security-cctv-surveillance.jpeg')) ?>"
                alt="Security Preview"
                class="w-full h-full object-cover"
                onerror="this.onerror=null; this.src='../images/projects/security-perimeter-protection.jpeg';"
              >
            </div>

            <input
              type="file"
              name="services_security_image_file"
              accept="image/*"
              class="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-2.5 file:rounded-md file:border-0 file:text-[11px] file:font-semibold file:bg-white file:text-slate-700 hover:file:bg-slate-100 cursor-pointer"
              onchange="previewFile(this, 'preview_services_security_image')"
            >
            <input
              type="hidden"
              name="services_security_image"
              value="<?= htmlspecialchars($content['services_security_image'] ?? '') ?>"
            >
          </div>

          <!-- Statement -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              One-Sentence Statement
            </label>
            <textarea
              name="services_security_statement"
              rows="3"
              class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs leading-relaxed focus:outline-none focus:border-slate-800"
            ><?= htmlspecialchars($content['services_security_statement'] ?? '') ?></textarea>
          </div>

          <!-- Feature Tags -->
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Feature Tags (Comma-separated)
            </label>
            <input
              type="text"
              name="services_security_tags"
              value="<?= htmlspecialchars($content['services_security_tags'] ?? '4K IP CCTV, Electric Fencing, Intruder Alarms, Biometric Access') ?>"
              class="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-[11px] text-slate-700 focus:outline-none focus:border-slate-800"
            >
          </div>

        </div>
      </div>

    </div>
  </div>

  <!-- Save Bar -->
  <div class="flex items-center justify-end gap-4 pt-4 border-t border-slate-200">
    <a href="index.php" class="px-5 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors">
      Discard
    </a>
    <button
      type="submit"
      class="px-8 py-3.5 rounded-xl bg-[#2854A6] hover:bg-[#1E4388] text-white font-semibold text-xs uppercase tracking-wider shadow-sm transition-colors"
    >
      Save &amp; Update Live Website
    </button>
  </div>

</form>

<script>
  function previewFile(input, targetId) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById(targetId).src = e.target.result;
      }
      reader.readAsDataURL(input.files[0]);
    }
  }
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
