<?php
require_once __DIR__ . '/auth.php';
requireAuth();

$isEdit = isset($_GET['id']) && (int)$_GET['id'] > 0;
$db = getDbConnection();
$errors = [];
$project = [
    'id'          => 0,
    'category'    => 'Solar',
    'title'       => '',
    'location'    => '',
    'year'        => date('Y'),
    'ref_num'     => '',
    'image'       => '',
    'description' => '',
    'specs'       => '',
    'aspect'      => 'aspect-[4/3]',
    'is_featured' => 1,
    'sort_order'  => 0,
    'status'      => 'published',
];

if ($isEdit) {
    $id = (int)$_GET['id'];
    $stmt = $db->prepare("SELECT * FROM projects WHERE id = :id LIMIT 1");
    $stmt->execute(['id' => $id]);
    $existing = $stmt->fetch();
    if ($existing) {
        $project = array_merge($project, $existing);
    } else {
        $_SESSION['flash_error'] = "Project #{$id} not found.";
        header('Location: projects.php');
        exit;
    }
}

// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        $errors[] = "Security session expired. Please reload and try again.";
    } else {
        $category    = trim($_POST['category'] ?? '');
        $title       = trim($_POST['title'] ?? '');
        $location    = trim($_POST['location'] ?? '');
        $year        = trim($_POST['year'] ?? '');
        $ref_num     = trim($_POST['ref_num'] ?? '');
        $aspect      = trim($_POST['aspect'] ?? 'aspect-[4/3]');
        $is_featured = isset($_POST['is_featured']) ? 1 : 0;
        $status      = $_POST['status'] === 'draft' ? 'draft' : 'published';
        $sort_order  = (int)($_POST['sort_order'] ?? 0);
        $description = trim($_POST['description'] ?? '');
        $specs       = trim($_POST['specs'] ?? '');
        $imageUrl    = trim($_POST['image_url'] ?? $project['image']);

        // Validation
        if (empty($title)) $errors[] = "Project title is required.";
        if (empty($category) || !in_array($category, ['Solar', 'Electrical', 'Security'])) {
            $errors[] = "Valid category (Solar, Electrical, or Security) is required.";
        }
        if (empty($location)) $errors[] = "Location is required.";
        if (empty($year)) $errors[] = "Year is required.";

        // Handle Image Upload
        if (!empty($_FILES['image_file']['name'])) {
            $file = $_FILES['image_file'];
            if ($file['error'] === UPLOAD_ERR_OK) {
                $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
                $allowed = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

                if (!in_array($ext, $allowed)) {
                    $errors[] = "Invalid image format. Allowed: JPG, PNG, WEBP, AVIF.";
                } else {
                    $uploadDir = __DIR__ . '/../uploads/projects/';
                    if (!is_dir($uploadDir)) {
                        mkdir($uploadDir, 0755, true);
                    }

                    $safeSlug = preg_replace('/[^a-z0-9_-]/', '-', strtolower(substr($title, 0, 30)));
                    $fileName = 'project-' . time() . '-' . $safeSlug . '.' . $ext;
                    $targetPath = $uploadDir . $fileName;

                    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
                        $imageUrl = 'uploads/projects/' . $fileName;
                    } else {
                        $errors[] = "Failed to save uploaded image. Check directory permissions.";
                    }
                }
            } else {
                $errors[] = "Upload failed with error code: {$file['error']}.";
            }
        }

        if (empty($imageUrl)) {
            $errors[] = "An image is required. Please upload a photo or select an existing asset path.";
        }

        // Save to Database
        if (empty($errors)) {
            try {
                if ($isEdit) {
                    $stmt = $db->prepare("
                        UPDATE projects SET
                            category = :category,
                            title = :title,
                            location = :location,
                            year = :year,
                            ref_num = :ref_num,
                            image = :image,
                            description = :description,
                            specs = :specs,
                            aspect = :aspect,
                            is_featured = :is_featured,
                            sort_order = :sort_order,
                            status = :status
                        WHERE id = :id
                    ");
                    $stmt->execute([
                        ':category'    => $category,
                        ':title'       => $title,
                        ':location'    => $location,
                        ':year'        => $year,
                        ':ref_num'     => !empty($ref_num) ? (int)$ref_num : null,
                        ':image'       => $imageUrl,
                        ':description' => $description,
                        ':specs'       => $specs,
                        ':aspect'      => $aspect,
                        ':is_featured' => $is_featured,
                        ':sort_order'  => $sort_order,
                        ':status'      => $status,
                        ':id'          => $project['id'],
                    ]);
                    $_SESSION['flash_success'] = "Project successfully updated.";
                } else {
                    $stmt = $db->prepare("
                        INSERT INTO projects (
                            category, title, location, year, ref_num, image,
                            description, specs, aspect, is_featured, sort_order, status
                        ) VALUES (
                            :category, :title, :location, :year, :ref_num, :image,
                            :description, :specs, :aspect, :is_featured, :sort_order, :status
                        )
                    ");
                    $stmt->execute([
                        ':category'    => $category,
                        ':title'       => $title,
                        ':location'    => $location,
                        ':year'        => $year,
                        ':ref_num'     => !empty($ref_num) ? (int)$ref_num : null,
                        ':image'       => $imageUrl,
                        ':description' => $description,
                        ':specs'       => $specs,
                        ':aspect'      => $aspect,
                        ':is_featured' => $is_featured,
                        ':sort_order'  => $sort_order,
                        ':status'      => $status,
                    ]);
                    $_SESSION['flash_success'] = "Project published successfully.";
                }

                header('Location: projects.php');
                exit;

            } catch (Throwable $e) {
                $errors[] = "Database error: " . $e->getMessage();
            }
        }
    }
}

$csrfToken = getCsrfToken();
$pageTitle = $isEdit ? 'Edit Project' : 'Add New Project';
require_once __DIR__ . '/includes/header.php';
?>

<!-- Clean Page Header -->
<div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  <div>
    <div class="flex items-center gap-2 mb-1">
      <a href="projects.php" class="text-xs font-semibold text-[#2854A6] hover:underline flex items-center gap-1">
        &larr; Back to Projects
      </a>
    </div>
    <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
      <?= $isEdit ? 'Edit Project' : 'Add New Project' ?>
    </h1>
    <p class="text-xs sm:text-sm text-slate-500 mt-1">
      Configure project title, division category, specifications, and photography.
    </p>
  </div>
  <div>
    <a
      href="projects.php"
      class="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
    >
      Cancel
    </a>
  </div>
</div>

<!-- Errors Alert -->
<?php if (!empty($errors)): ?>
  <div class="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-1">
    <div class="font-bold flex items-center gap-2 text-rose-900">
      <svg class="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      Please correct the errors below:
    </div>
    <ul class="list-disc list-inside space-y-0.5 pl-2 text-rose-700">
      <?php foreach ($errors as $err): ?>
        <li><?= htmlspecialchars($err) ?></li>
      <?php endforeach; ?>
    </ul>
  </div>
<?php endif; ?>

<!-- Main Form -->
<form method="POST" action="" enctype="multipart/form-data" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
  <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">

  <!-- Left 2 Cols: Details -->
  <div class="lg:col-span-2 space-y-6">
    
    <!-- Category Division Selector -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">
        1. Select Service Category <span class="text-rose-500">*</span>
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        <!-- Solar -->
        <label class="relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all <?= ($project['category'] === 'Solar') ? 'bg-amber-50 border-[#F7941D] ring-2 ring-[#F7941D]/30' : 'bg-white border-slate-200 hover:border-slate-300' ?>">
          <input type="radio" name="category" value="Solar" class="sr-only" <?= ($project['category'] === 'Solar') ? 'checked' : '' ?> onchange="updateCatStyle(this)">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-[#F7941D]"></span>
            <span class="font-bold text-slate-900 text-sm">Solar PV</span>
          </div>
          <span class="text-xs text-slate-500 mt-1">Hybrid, Grid-tie, Batteries</span>
        </label>

        <!-- Electrical -->
        <label class="relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all <?= ($project['category'] === 'Electrical') ? 'bg-blue-50 border-[#2854A6] ring-2 ring-[#2854A6]/30' : 'bg-white border-slate-200 hover:border-slate-300' ?>">
          <input type="radio" name="category" value="Electrical" class="sr-only" <?= ($project['category'] === 'Electrical') ? 'checked' : '' ?> onchange="updateCatStyle(this)">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-[#2854A6]"></span>
            <span class="font-bold text-slate-900 text-sm">Electrical</span>
          </div>
          <span class="text-xs text-slate-500 mt-1">MDBs, Wiring, Compliance</span>
        </label>

        <!-- Security -->
        <label class="relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all <?= ($project['category'] === 'Security') ? 'bg-slate-100 border-slate-800 ring-2 ring-slate-800/30' : 'bg-white border-slate-200 hover:border-slate-300' ?>">
          <input type="radio" name="category" value="Security" class="sr-only" <?= ($project['category'] === 'Security') ? 'checked' : '' ?> onchange="updateCatStyle(this)">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-slate-900"></span>
            <span class="font-bold text-slate-900 text-sm">Security</span>
          </div>
          <span class="text-xs text-slate-500 mt-1">CCTV, Access, Razor Wire</span>
        </label>

      </div>
    </div>

    <!-- Core Project Info Card -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
      <h3 class="font-heading font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
        2. Project Information
      </h3>

      <!-- Project Title -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Project Title <span class="text-rose-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          required
          placeholder="e.g. Karen Executive Residence — 12kW Hybrid Inverter & Storage Bank"
          value="<?= htmlspecialchars($project['title']) ?>"
          class="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2854A6] focus:ring-2 focus:ring-[#2854A6]/20 transition-all"
        >
      </div>

      <!-- Location, Year, Ref Num -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Location <span class="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            required
            placeholder="e.g. Karen, Nairobi"
            value="<?= htmlspecialchars($project['location']) ?>"
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2854A6] focus:ring-2 focus:ring-[#2854A6]/20"
          >
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Year Completed <span class="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="year"
            required
            placeholder="2025"
            value="<?= htmlspecialchars($project['year']) ?>"
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2854A6] focus:ring-2 focus:ring-[#2854A6]/20"
          >
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Reference #
          </label>
          <input
            type="number"
            name="ref_num"
            placeholder="101"
            value="<?= htmlspecialchars($project['ref_num'] ?? '') ?>"
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#2854A6] focus:ring-2 focus:ring-[#2854A6]/20"
          >
        </div>
      </div>

      <!-- Description -->
      <div>
        <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
          Project Description
        </label>
        <textarea
          name="description"
          rows="4"
          placeholder="Comprehensive description of the engineering scope, equipment installed, and client outcome..."
          class="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm leading-relaxed focus:outline-none focus:border-[#2854A6] focus:ring-2 focus:ring-[#2854A6]/20"
        ><?= htmlspecialchars($project['description'] ?? '') ?></textarea>
      </div>

      <!-- Specs (Line by line) -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Key Specifications (1 per line)
          </label>
          <span class="text-xs text-slate-400">Shown as feature pills on the live site</span>
        </div>
        <textarea
          name="specs"
          rows="4"
          placeholder="12kW PV Capacity&#10;20kWh LiFePO4 Storage&#10;Deye Hybrid Inverters&#10;IoT Mobile Monitoring"
          class="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 text-sm leading-relaxed font-mono text-xs focus:outline-none focus:border-[#2854A6] focus:ring-2 focus:ring-[#2854A6]/20"
        ><?= htmlspecialchars($project['specs'] ?? '') ?></textarea>
      </div>

    </div>

  </div>

  <!-- Right 1 Col: Media & Visibility -->
  <div class="space-y-6">
    
    <!-- Photo Asset Card -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      <h3 class="font-heading font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
        3. Project Photo
      </h3>

      <!-- Current Preview -->
      <div>
        <label class="block text-xs text-slate-500 mb-2">Photo Preview</label>
        <div class="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
          <img
            id="imagePreview"
            src="<?= htmlspecialchars(!empty($project['image']) ? $project['image'] : '/images/projects/solar-panel-installation.jpeg') ?>"
            alt="Preview"
            class="w-full h-full object-cover"
            onerror="this.src='/images/projects/solar-panel-installation.jpeg'"
          >
        </div>
      </div>

      <!-- Upload New File -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Upload Image File</label>
        <input
          type="file"
          name="image_file"
          id="imageFileInput"
          accept="image/*"
          class="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
          onchange="previewImage(this)"
        >
      </div>

      <!-- Or Asset Path -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Or Existing Asset Path</label>
        <input
          type="text"
          name="image_url"
          id="imageUrlInput"
          placeholder="/images/projects/solar-hybrid-inverter.jpeg"
          value="<?= htmlspecialchars($project['image']) ?>"
          class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#2854A6]"
          oninput="document.getElementById('imagePreview').src = this.value"
        >
      </div>

      <!-- Aspect Ratio -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Card Aspect Ratio</label>
        <select
          name="aspect"
          class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#2854A6]"
        >
          <option value="aspect-[4/3]" <?= ($project['aspect'] === 'aspect-[4/3]') ? 'selected' : '' ?>>4:3 (Standard)</option>
          <option value="aspect-[3/4]" <?= ($project['aspect'] === 'aspect-[3/4]') ? 'selected' : '' ?>>3:4 (Portrait / Tall)</option>
          <option value="aspect-[16/7]" <?= ($project['aspect'] === 'aspect-[16/7]') ? 'selected' : '' ?>>16:7 (Wide Panoramic)</option>
        </select>
      </div>
    </div>

    <!-- Visibility & Save Card -->
    <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
      <h3 class="font-heading font-bold text-slate-900 text-sm border-b border-slate-100 pb-3">
        4. Visibility
      </h3>

      <!-- Featured on Homepage Toggle -->
      <label class="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 cursor-pointer hover:bg-slate-100/60 transition-colors">
        <input
          type="checkbox"
          name="is_featured"
          value="1"
          class="mt-1 rounded text-[#2854A6] focus:ring-[#2854A6] border-slate-300"
          <?= ((int)$project['is_featured'] === 1) ? 'checked' : '' ?>
        >
        <div>
          <span class="text-xs font-bold text-slate-900 block">Show on Homepage</span>
          <span class="text-[11px] text-slate-500 block mt-0.5">Features this case study in the primary homepage grid</span>
        </div>
      </label>

      <!-- Status -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1.5">Status</label>
        <div class="grid grid-cols-2 gap-2">
          <label class="p-2.5 rounded-xl border text-center cursor-pointer text-xs font-semibold <?= ($project['status'] === 'published') ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-white border-slate-200 text-slate-500' ?>">
            <input type="radio" name="status" value="published" class="sr-only" <?= ($project['status'] === 'published') ? 'checked' : '' ?>>
            Published
          </label>
          <label class="p-2.5 rounded-xl border text-center cursor-pointer text-xs font-semibold <?= ($project['status'] === 'draft') ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-white border-slate-200 text-slate-500' ?>">
            <input type="radio" name="status" value="draft" class="sr-only" <?= ($project['status'] === 'draft') ? 'checked' : '' ?>>
            Draft
          </label>
        </div>
      </div>

      <!-- Sort Order -->
      <div>
        <label class="block text-xs font-semibold text-slate-700 mb-1">Display Order</label>
        <input
          type="number"
          name="sort_order"
          value="<?= (int)$project['sort_order'] ?>"
          class="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-[#2854A6]"
        >
      </div>

      <!-- Submit Button -->
      <div class="pt-4 border-t border-slate-100">
        <button
          type="submit"
          class="w-full py-3 rounded-xl bg-[#2854A6] hover:bg-[#1E4388] text-white font-semibold text-xs tracking-wider uppercase shadow-xs transition-colors"
        >
          <?= $isEdit ? 'Save Changes' : 'Publish Project' ?>
        </button>
      </div>

    </div>

  </div>
</form>

<script>
  function previewImage(input) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('imagePreview').src = e.target.result;
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  function updateCatStyle(radio) {
    document.querySelectorAll('input[name="category"]').forEach(r => {
      r.closest('label').className = 'relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all bg-white border-slate-200 hover:border-slate-300';
    });
    const selected = radio.closest('label');
    if (radio.value === 'Solar') {
      selected.className = 'relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all bg-amber-50 border-[#F7941D] ring-2 ring-[#F7941D]/30';
    } else if (radio.value === 'Electrical') {
      selected.className = 'relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all bg-blue-50 border-[#2854A6] ring-2 ring-[#2854A6]/30';
    } else if (radio.value === 'Security') {
      selected.className = 'relative flex flex-col p-4 rounded-xl border cursor-pointer transition-all bg-slate-100 border-slate-800 ring-2 ring-slate-800/30';
    }
  }
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
