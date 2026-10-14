<?php
require_once __DIR__ . '/auth.php';
requireAuth();

$db = getDbConnection();

// Handle deletion
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'delete') {
    if (verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        $deleteId = (int)($_POST['id'] ?? 0);
        if ($deleteId > 0) {
            $stmt = $db->prepare("DELETE FROM projects WHERE id = :id");
            $stmt->execute(['id' => $deleteId]);
            $_SESSION['flash_success'] = "Project successfully deleted.";
            header('Location: projects.php');
            exit;
        }
    } else {
        $_SESSION['flash_error'] = "Security session expired. Please reload and try again.";
    }
}

// Quick toggle featured status
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'toggle_featured') {
    if (verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        $projId = (int)($_POST['id'] ?? 0);
        $curr = (int)($_POST['current'] ?? 0);
        $new = $curr === 1 ? 0 : 1;
        $stmt = $db->prepare("UPDATE projects SET is_featured = :feat WHERE id = :id");
        $stmt->execute(['feat' => $new, 'id' => $projId]);
        $_SESSION['flash_success'] = "Homepage featured status updated.";
        header('Location: projects.php' . (!empty($_SERVER['QUERY_STRING']) ? '?' . $_SERVER['QUERY_STRING'] : ''));
        exit;
    }
}

// Filters & Search
$categoryFilter = $_GET['category'] ?? '';
$statusFilter = $_GET['status'] ?? '';
$search = trim($_GET['q'] ?? '');

$where = [];
$params = [];

if (!empty($categoryFilter)) {
    $where[] = "category = :category";
    $params[':category'] = $categoryFilter;
}

if (!empty($statusFilter)) {
    $where[] = "status = :status";
    $params[':status'] = $statusFilter;
}

if (!empty($search)) {
    $where[] = "(title LIKE :q OR location LIKE :q OR description LIKE :q)";
    $params[':q'] = "%{$search}%";
}

$whereSql = !empty($where) ? 'WHERE ' . implode(' AND ', $where) : '';

// Pagination: 5 projects per page
$perPage = 5;
$countStmt = $db->prepare("SELECT COUNT(*) FROM projects {$whereSql}");
foreach ($params as $key => $val) {
    $countStmt->bindValue($key, $val);
}
$countStmt->execute();
$totalFiltered = (int)$countStmt->fetchColumn();

$totalPages = max(1, (int)ceil($totalFiltered / $perPage));
$page = max(1, min((int)($_GET['page'] ?? 1), $totalPages));
$offset = ($page - 1) * $perPage;

$stmt = $db->prepare("SELECT * FROM projects {$whereSql} ORDER BY sort_order ASC, id DESC LIMIT :limit OFFSET :offset");
foreach ($params as $key => $val) {
    $stmt->bindValue($key, $val);
}
$stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$projects = $stmt->fetchAll();

$csrfToken = getCsrfToken();

// Category total counters
$counts = [
    'All' => (int)$db->query("SELECT COUNT(*) FROM projects")->fetchColumn(),
    'Solar' => (int)$db->query("SELECT COUNT(*) FROM projects WHERE category = 'Solar'")->fetchColumn(),
    'Electrical' => (int)$db->query("SELECT COUNT(*) FROM projects WHERE category = 'Electrical'")->fetchColumn(),
    'Security' => (int)$db->query("SELECT COUNT(*) FROM projects WHERE category = 'Security'")->fetchColumn(),
];

// Helper to build page URL
function getPageUrl($pageNum) {
    $params = $_GET;
    $params['page'] = $pageNum;
    return 'projects.php?' . http_build_query($params);
}

$pageTitle = 'Projects & Portfolio';
require_once __DIR__ . '/includes/header.php';
?>

<!-- Clean Page Header -->
<div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  <div>
    <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
      Projects &amp; Portfolio
    </h1>
    <p class="text-sm text-slate-500 mt-1">
      Manage all Solar, Electrical, and Security case studies shown on the live website.
    </p>
  </div>
  <div>
    <a
      href="project-form.php"
      class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#2854A6] hover:bg-[#1E4388] text-white font-semibold text-xs tracking-wider uppercase shadow-xs transition-colors"
    >
      <span class="text-[#F7941D] text-sm leading-none font-bold">+</span>
      <span>Add New Project</span>
    </a>
  </div>
</div>

<!-- Filters & Search Toolbar -->
<div class="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
  
  <!-- Category Tabs -->
  <div class="flex flex-wrap items-center gap-2">
    <a
      href="projects.php"
      class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border <?= empty($categoryFilter) ? 'bg-[#2854A6] text-white border-[#2854A6] shadow-xs' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300' ?>"
    >
      All (<?= $counts['All'] ?>)
    </a>
    <a
      href="projects.php?category=Solar"
      class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border <?= $categoryFilter === 'Solar' ? 'bg-[#F7941D] text-white border-[#F7941D] shadow-xs' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300' ?>"
    >
      Solar PV (<?= $counts['Solar'] ?>)
    </a>
    <a
      href="projects.php?category=Electrical"
      class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border <?= $categoryFilter === 'Electrical' ? 'bg-[#2854A6] text-white border-[#2854A6] shadow-xs' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300' ?>"
    >
      Electrical (<?= $counts['Electrical'] ?>)
    </a>
    <a
      href="projects.php?category=Security"
      class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border <?= $categoryFilter === 'Security' ? 'bg-slate-900 text-white border-slate-900 shadow-xs' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300' ?>"
    >
      Security (<?= $counts['Security'] ?>)
    </a>
  </div>

  <!-- Search Input -->
  <form method="GET" action="" class="flex items-center gap-2">
    <?php if (!empty($categoryFilter)): ?>
      <input type="hidden" name="category" value="<?= htmlspecialchars($categoryFilter) ?>">
    <?php endif; ?>
    <div class="relative">
      <input
        type="text"
        name="q"
        value="<?= htmlspecialchars($search) ?>"
        placeholder="Search projects..."
        class="w-64 sm:w-72 px-3.5 py-2 pl-9 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#2854A6] focus:ring-1 focus:ring-[#2854A6]"
      >
      <svg class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    </div>
    <?php if (!empty($search)): ?>
      <a href="projects.php<?= !empty($categoryFilter) ? '?category=' . urlencode($categoryFilter) : '' ?>" class="text-xs text-slate-500 hover:text-slate-800">
        Clear
      </a>
    <?php endif; ?>
  </form>

</div>

<!-- Projects Table -->
<div class="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
  <?php if (empty($projects)): ?>
    <div class="p-12 text-center">
      <p class="text-sm font-semibold text-slate-700">No projects found.</p>
      <p class="text-xs text-slate-500 mt-1">Try resetting your search filter or add a new project.</p>
      <div class="mt-4">
        <a href="projects.php" class="text-xs font-semibold text-[#2854A6] hover:underline">Reset Filters &rarr;</a>
      </div>
    </div>
  <?php else: ?>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead class="bg-slate-50/75 text-slate-500 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-100">
          <tr>
            <th class="py-4 px-6 w-12 text-center">#</th>
            <th class="py-4 px-6">Project &amp; Location</th>
            <th class="py-4 px-6">Category</th>
            <th class="py-4 px-6">Specifications</th>
            <th class="py-4 px-6 text-center">Homepage</th>
            <th class="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-700">
          <?php foreach ($projects as $p): ?>
            <?php
              $catBadge = match($p['category']) {
                'Solar' => 'bg-amber-50 text-[#F7941D] border-amber-200',
                'Electrical' => 'bg-blue-50 text-[#2854A6] border-blue-200',
                'Security' => 'bg-slate-100 text-slate-800 border-slate-200',
                default => 'bg-slate-100 text-slate-700 border-slate-200',
              };
            ?>
            <tr class="hover:bg-slate-50/60 transition-colors">
              
              <!-- Ref Number / ID -->
              <td class="py-4 px-6 text-center text-slate-400 font-mono text-xs">
                <?= $p['ref_num'] ?: $p['id'] ?>
              </td>

              <!-- Title, Photo, Location -->
              <td class="py-4 px-6">
                <div class="flex items-center gap-3.5">
                  <div class="w-16 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
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

              <!-- Category Badge -->
              <td class="py-4 px-6">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border <?= $catBadge ?>">
                  <?= htmlspecialchars($p['category']) ?>
                </span>
              </td>

              <!-- Specs -->
              <td class="py-4 px-6 text-slate-500 max-w-[240px] truncate">
                <?= htmlspecialchars(str_replace("\n", " • ", $p['specs'] ?? '')) ?>
              </td>

              <!-- Featured Toggle -->
              <td class="py-4 px-6 text-center">
                <form method="POST" action="">
                  <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
                  <input type="hidden" name="action" value="toggle_featured">
                  <input type="hidden" name="id" value="<?= $p['id'] ?>">
                  <input type="hidden" name="current" value="<?= (int)$p['is_featured'] ?>">
                  <button
                    type="submit"
                    class="px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all <?= (int)$p['is_featured'] === 1 ? 'bg-blue-50 text-[#2854A6] hover:bg-blue-100' : 'bg-slate-100 text-slate-400 hover:text-slate-600' ?>"
                    title="Click to toggle featured on homepage"
                  >
                    <?= (int)$p['is_featured'] === 1 ? '&starf; Featured' : 'Off' ?>
                  </button>
                </form>
              </td>

              <!-- Action Buttons -->
              <td class="py-4 px-6 text-right">
                <div class="flex items-center justify-end gap-2">
                  <a
                    href="project-form.php?id=<?= $p['id'] ?>"
                    class="px-3 py-1.5 rounded-lg border border-slate-200 hover:border-[#2854A6] hover:text-[#2854A6] font-semibold text-xs transition-colors"
                  >
                    Edit
                  </a>

                  <form method="POST" action="" onsubmit="return confirm('Are you sure you want to delete this project?');" class="inline">
                    <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
                    <input type="hidden" name="action" value="delete">
                    <input type="hidden" name="id" value="<?= $p['id'] ?>">
                    <button
                      type="submit"
                      class="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </form>
                </div>
              </td>

            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls (5 per page) -->
    <div class="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
      <div>
        Showing <span class="font-semibold text-slate-900"><?= min($totalFiltered, $offset + 1) ?></span> to 
        <span class="font-semibold text-slate-900"><?= min($totalFiltered, $offset + count($projects)) ?></span> of 
        <span class="font-semibold text-slate-900"><?= $totalFiltered ?></span> projects
      </div>

      <?php if ($totalPages > 1): ?>
        <div class="flex items-center gap-1.5">
          <!-- Previous Button -->
          <?php if ($page > 1): ?>
            <a
              href="<?= getPageUrl($page - 1) ?>"
              class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
            >
              &larr; Prev
            </a>
          <?php else: ?>
            <span class="px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed">
              &larr; Prev
            </span>
          <?php endif; ?>

          <!-- Page Numbers -->
          <?php for ($i = 1; $i <= $totalPages; $i++): ?>
            <a
              href="<?= getPageUrl($i) ?>"
              class="px-3 py-1.5 rounded-lg font-semibold transition-colors <?= $i === $page ? 'bg-[#2854A6] text-white shadow-xs' : 'border border-slate-200 bg-white hover:bg-slate-50 text-slate-700' ?>"
            >
              <?= $i ?>
            </a>
          <?php endfor; ?>

          <!-- Next Button -->
          <?php if ($page < $totalPages): ?>
            <a
              href="<?= getPageUrl($page + 1) ?>"
              class="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-slate-700 transition-colors"
            >
              Next &rarr;
            </a>
          <?php else: ?>
            <span class="px-3 py-1.5 rounded-lg border border-slate-100 bg-slate-50 text-slate-300 cursor-not-allowed">
              Next &rarr;
            </span>
          <?php endif; ?>
        </div>
      <?php endif; ?>

    </div>
  <?php endif; ?>
</div>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
