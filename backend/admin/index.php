<?php
$pageTitle = 'Dashboard Overview';
require_once __DIR__ . '/includes/header.php';

try {
    $db = getDbConnection();

    // Counts
    $totalProjects   = (int)$db->query("SELECT COUNT(*) FROM projects")->fetchColumn();
    $solarCount      = (int)$db->query("SELECT COUNT(*) FROM projects WHERE category = 'Solar'")->fetchColumn();
    $electricalCount = (int)$db->query("SELECT COUNT(*) FROM projects WHERE category = 'Electrical'")->fetchColumn();
    $securityCount   = (int)$db->query("SELECT COUNT(*) FROM projects WHERE category = 'Security'")->fetchColumn();
    $featuredCount   = (int)$db->query("SELECT COUNT(*) FROM projects WHERE is_featured = 1")->fetchColumn();
    
    // Inquiries
    $totalInquiries  = (int)$db->query("SELECT COUNT(*) FROM inquiries")->fetchColumn();
    $unreadInquiries = (int)$db->query("SELECT COUNT(*) FROM inquiries WHERE is_read = 0")->fetchColumn();

    // Recent 5 projects from DB
    $stmt = $db->query("SELECT * FROM projects ORDER BY sort_order ASC, id DESC LIMIT 5");
    $recentProjects = $stmt->fetchAll();

    // Recent inquiries
    $stmtInq = $db->query("SELECT * FROM inquiries ORDER BY id DESC LIMIT 3");
    $recentInquiries = $stmtInq->fetchAll();

} catch (Throwable $e) {
    $error = "Unable to connect to database: " . $e->getMessage();
}
?>

<!-- Clean Airy Welcome Banner -->
<div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  <div>
    <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
      Overview Dashboard
    </h1>
    <p class="text-sm text-slate-500 mt-1">
      Manage live projects, case study images, and client inquiries for TrueVolt.
    </p>
  </div>
  <div class="flex items-center gap-3">
    <a
      href="project-form.php"
      class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2854A6] hover:bg-[#1E4388] text-white font-semibold text-xs tracking-wider uppercase shadow-sm transition-colors"
    >
      <span class="text-[#F7941D] text-sm leading-none font-bold">+</span>
      <span>Add New Project</span>
    </a>
  </div>
</div>

<!-- 4 Clean Metric Cards (Light, Uncongested) -->
<div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
  
  <!-- Total Projects -->
  <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center justify-between">
    <div>
      <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Total Projects</p>
      <h3 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-heading"><?= $totalProjects ?></h3>
      <p class="text-xs text-slate-500 mt-1"><?= $featuredCount ?> featured on home</p>
    </div>
    <div class="w-12 h-12 rounded-xl bg-blue-50 text-[#2854A6] flex items-center justify-center shrink-0">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    </div>
  </div>

  <!-- Solar PV -->
  <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center justify-between">
    <div>
      <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Solar PV</p>
      <h3 class="text-3xl sm:text-4xl font-extrabold text-[#F7941D] mt-2 font-heading"><?= $solarCount ?></h3>
      <a href="projects.php?category=Solar" class="text-xs text-[#F7941D] hover:underline font-semibold mt-1 inline-block">Filter Solar &rarr;</a>
    </div>
    <div class="w-12 h-12 rounded-xl bg-amber-50 text-[#F7941D] flex items-center justify-center shrink-0">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </div>
  </div>

  <!-- Electrical Contracting -->
  <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center justify-between">
    <div>
      <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Electrical</p>
      <h3 class="text-3xl sm:text-4xl font-extrabold text-[#2854A6] mt-2 font-heading"><?= $electricalCount ?></h3>
      <a href="projects.php?category=Electrical" class="text-xs text-[#2854A6] hover:underline font-semibold mt-1 inline-block">Filter Electrical &rarr;</a>
    </div>
    <div class="w-12 h-12 rounded-xl bg-blue-50 text-[#2854A6] flex items-center justify-center shrink-0">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </div>
  </div>

  <!-- Security Systems -->
  <div class="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex items-center justify-between">
    <div>
      <p class="text-xs font-semibold uppercase tracking-wider text-slate-400">Security</p>
      <h3 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-heading"><?= $securityCount ?></h3>
      <a href="projects.php?category=Security" class="text-xs text-slate-600 hover:underline font-semibold mt-1 inline-block">Filter Security &rarr;</a>
    </div>
    <div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    </div>
  </div>

</div>

<!-- Recent Projects Section (Spacious White Card) -->
<div class="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden mb-10">
  <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
    <div>
      <h3 class="font-heading font-bold text-lg text-slate-900">Recent Projects</h3>
      <p class="text-xs text-slate-500 mt-0.5">Real installations currently published to the frontend portfolio</p>
    </div>
    <a href="projects.php" class="text-xs font-semibold text-[#2854A6] hover:underline flex items-center gap-1">
      <span>View all <?= $totalProjects ?> projects</span> &rarr;
    </a>
  </div>

  <div class="overflow-x-auto">
    <table class="w-full text-left text-xs">
      <thead class="bg-slate-50/75 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-100">
        <tr>
          <th class="py-4 px-6">Project &amp; Location</th>
          <th class="py-4 px-6">Category</th>
          <th class="py-4 px-6">Key Specs</th>
          <th class="py-4 px-6 text-center">Homepage</th>
          <th class="py-4 px-6 text-right">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 text-slate-700">
        <?php foreach ($recentProjects as $p): ?>
          <?php
            $catBadge = match($p['category']) {
              'Solar' => 'bg-amber-50 text-[#F7941D] border-amber-200',
              'Electrical' => 'bg-blue-50 text-[#2854A6] border-blue-200',
              'Security' => 'bg-slate-100 text-slate-800 border-slate-200',
              default => 'bg-slate-100 text-slate-700 border-slate-200',
            };
          ?>
          <tr class="hover:bg-slate-50/60 transition-colors">
            
            <!-- Thumbnail + Title + Location -->
            <td class="py-4 px-6">
              <div class="flex items-center gap-3.5">
                <div class="w-14 h-11 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src="<?= htmlspecialchars($p['image']) ?>"
                    alt="<?= htmlspecialchars($p['title']) ?>"
                    class="w-full h-full object-cover"
                    onerror="this.src='/images/projects/solar-panel-installation.jpeg'"
                  >
                </div>
                <div>
                  <a href="project-form.php?id=<?= $p['id'] ?>" class="font-bold text-slate-900 hover:text-[#2854A6] text-sm line-clamp-1">
                    <?= htmlspecialchars($p['title']) ?>
                  </a>
                  <p class="text-xs text-slate-500 mt-0.5">
                    <?= htmlspecialchars($p['location']) ?> &bull; <?= htmlspecialchars($p['year']) ?>
                  </p>
                </div>
              </div>
            </td>

            <!-- Category -->
            <td class="py-4 px-6">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border <?= $catBadge ?>">
                <?= htmlspecialchars($p['category']) ?>
              </span>
            </td>

            <!-- Specs -->
            <td class="py-4 px-6 text-slate-500 max-w-[260px] truncate">
              <?= htmlspecialchars(str_replace("\n", " • ", $p['specs'] ?? '')) ?>
            </td>

            <!-- Featured -->
            <td class="py-4 px-6 text-center">
              <?php if ((int)$p['is_featured'] === 1): ?>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2854A6] text-[11px] font-semibold">
                  Featured
                </span>
              <?php else: ?>
                <span class="text-slate-400 text-[11px]">Category Only</span>
              <?php endif; ?>
            </td>

            <!-- Action -->
            <td class="py-4 px-6 text-right">
              <a
                href="project-form.php?id=<?= $p['id'] ?>"
                class="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#2854A6] hover:text-[#2854A6] font-semibold text-xs transition-colors inline-block"
              >
                Edit
              </a>
            </td>

          </tr>
        <?php endforeach; ?>
      </tbody>
    </table>
  </div>
</div>

<!-- Customer Inquiries Quick Preview (If any exist) -->
<?php if (!empty($recentInquiries)): ?>
  <div class="bg-white border border-slate-200 rounded-2xl shadow-xs p-6">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3 class="font-heading font-bold text-base text-slate-900">Recent Inquiries</h3>
        <p class="text-xs text-slate-500">Contact form leads submitted through the website</p>
      </div>
      <a href="inquiries.php" class="text-xs font-semibold text-[#2854A6] hover:underline">
        View All Inquiries (<?= $totalInquiries ?>) &rarr;
      </a>
    </div>

    <div class="space-y-3">
      <?php foreach ($recentInquiries as $inq): ?>
        <div class="p-4 rounded-xl border border-slate-100 bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="font-bold text-slate-900 text-sm"><?= htmlspecialchars($inq['name']) ?></span>
              <span class="text-xs text-slate-500">&bull; <?= htmlspecialchars($inq['phone']) ?></span>
              <?php if (!$inq['is_read']): ?>
                <span class="px-2 py-0.5 rounded-full bg-[#F7941D] text-white text-[10px] font-bold">New</span>
              <?php endif; ?>
            </div>
            <p class="text-xs text-slate-600 mt-1 line-clamp-1"><?= htmlspecialchars($inq['message']) ?></p>
          </div>
          <div class="shrink-0">
            <a href="inquiries.php" class="text-xs font-semibold text-[#2854A6] hover:underline">
              View Details &rarr;
            </a>
          </div>
        </div>
      <?php endforeach; ?>
    </div>
  </div>
<?php endif; ?>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
