<?php
require_once __DIR__ . '/../auth.php';
requireAuth();
$admin = getCurrentAdmin();
$currentPage = basename($_SERVER['PHP_SELF']);

// Ensure /admin is accessed with trailing slash so all relative links resolve correctly
// (Apache mod_dir does this automatically; PHP's built-in dev server does not)
$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH);
if ($requestPath && preg_match('#/admin$#', $requestPath)) {
    header('Location: ' . $requestPath . '/');
    exit;
}

// Count unread inquiries if db is connected
$unreadInquiriesCount = 0;
try {
    $dbHeader = getDbConnection();
    $unreadInquiriesCount = (int)$dbHeader->query("SELECT COUNT(*) FROM inquiries WHERE is_read = 0")->fetchColumn();
} catch (Throwable $t) {
    // Graceful fallback
}
?>
<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= isset($pageTitle) ? htmlspecialchars($pageTitle) . ' — TrueVolt Admin' : 'TrueVolt Systems — Admin Portal' ?></title>
  <link rel="stylesheet" href="css/admin.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body class="min-h-full bg-[#FAF8F5] text-slate-800 flex flex-col antialiased">

  <!-- Top Navigation Bar (Frontend Navbar Match) -->
  <header class="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-40 shadow-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        
        <!-- Logo & Navigation Links -->
        <div class="flex items-center gap-6 lg:gap-8">
          <a href="index.php" class="flex items-center group shrink-0">
            <img
              src="../images/truevolt-logo-transparent.png"
              alt="TrueVolt Systems Ltd"
              class="h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              onerror="this.onerror=null; this.src='../images/truevolt-logo-transparent.png';"
            >
          </a>

          <!-- Main Desktop Navigation Tabs -->
          <nav class="hidden md:flex items-center gap-1.5">
            <a
              href="index.php"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors <?= $currentPage === 'index.php' ? 'bg-slate-100 text-[#2854A6] font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' ?>"
            >
              Dashboard
            </a>
            <a
              href="projects.php"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors <?= in_array($currentPage, ['projects.php', 'project-form.php']) ? 'bg-slate-100 text-[#2854A6] font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' ?>"
            >
              Projects
            </a>
            <a
              href="site-content.php"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors <?= $currentPage === 'site-content.php' ? 'bg-slate-100 text-[#2854A6] font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' ?>"
            >
              Content
            </a>
            <a
              href="inquiries.php"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors relative inline-flex items-center gap-1.5 <?= $currentPage === 'inquiries.php' ? 'bg-slate-100 text-[#2854A6] font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' ?>"
            >
              <span>Inquiries</span>
              <?php if ($unreadInquiriesCount > 0): ?>
                <span class="px-1.5 py-0.5 rounded-full bg-[#F7941D] text-white text-[10px] font-bold leading-none">
                  <?= $unreadInquiriesCount ?>
                </span>
              <?php endif; ?>
            </a>
            <a
              href="settings.php"
              class="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors <?= $currentPage === 'settings.php' ? 'bg-slate-100 text-[#2854A6] font-semibold' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50' ?>"
            >
              Settings
            </a>
          </nav>
        </div>

        <!-- Right Side Controls -->
        <div class="flex items-center gap-3">
          
          <a
            href="http://localhost:3000"
            target="_blank"
            class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:text-[#2854A6] hover:bg-slate-50 transition-colors"
            title="View Live Website"
          >
            <span>Live Site</span>
            <svg class="w-3.5 h-3.5 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          <!-- User Menu (Desktop) -->
          <div class="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200">
            <a
              href="settings.php"
              class="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg hover:bg-slate-50 transition-colors group"
              title="Account & Password Settings"
            >
              <div class="w-6 h-6 rounded-full bg-blue-50 text-[#2854A6] font-bold text-[11px] flex items-center justify-center border border-blue-200 group-hover:bg-[#2854A6] group-hover:text-white transition-colors">
                <?= strtoupper(substr($admin['username'] ?? 'A', 0, 1)) ?>
              </div>
              <span class="text-xs font-medium text-slate-700 group-hover:text-slate-900">
                @<?= htmlspecialchars($admin['username'] ?? 'admin') ?>
              </span>
            </a>

            <a
              href="logout.php"
              title="Sign Out"
              class="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </a>
          </div>

          <!-- Mobile Hamburger Menu Button -->
          <button
            id="mobileMenuToggleBtn"
            type="button"
            class="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
            aria-label="Toggle Navigation Menu"
          >
            <svg id="menuIconOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg id="menuIconClose" class="w-6 h-6 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

        </div>

      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <div id="mobileMenuDrawer" class="hidden md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 shadow-lg transition-all">
      <nav class="space-y-1">
        <a
          href="index.php"
          class="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium transition-colors <?= $currentPage === 'index.php' ? 'bg-slate-100 text-[#2854A6] font-semibold' : 'text-slate-700 hover:bg-slate-50' ?>"
        >
          <span>Dashboard</span>
          <span class="text-[11px] text-slate-400">&rarr;</span>
        </a>

        <a
          href="projects.php"
          class="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium transition-colors <?= in_array($currentPage, ['projects.php', 'project-form.php']) ? 'bg-slate-100 text-[#2854A6] font-semibold' : 'text-slate-700 hover:bg-slate-50' ?>"
        >
          <span>Projects</span>
          <span class="text-[11px] text-slate-400">&rarr;</span>
        </a>

        <a
          href="site-content.php"
          class="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium transition-colors <?= $currentPage === 'site-content.php' ? 'bg-slate-100 text-[#2854A6] font-semibold' : 'text-slate-700 hover:bg-slate-50' ?>"
        >
          <span>Content</span>
          <span class="text-[11px] text-slate-400">&rarr;</span>
        </a>

        <a
          href="inquiries.php"
          class="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium transition-colors <?= $currentPage === 'inquiries.php' ? 'bg-slate-100 text-[#2854A6] font-semibold' : 'text-slate-700 hover:bg-slate-50' ?>"
        >
          <span>Inquiries</span>
          <?php if ($unreadInquiriesCount > 0): ?>
            <span class="px-1.5 py-0.5 rounded-full bg-[#F7941D] text-white text-[10px] font-bold leading-none">
              <?= $unreadInquiriesCount ?> New
            </span>
          <?php else: ?>
            <span class="text-[11px] text-slate-400">&rarr;</span>
          <?php endif; ?>
        </a>

        <a
          href="settings.php"
          class="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium transition-colors <?= $currentPage === 'settings.php' ? 'bg-slate-100 text-[#2854A6] font-semibold' : 'text-slate-700 hover:bg-slate-50' ?>"
        >
          <span>Settings</span>
          <span class="text-[11px] text-slate-400">&rarr;</span>
        </a>

        <a
          href="http://localhost:3000"
          target="_blank"
          class="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <span>Live Site</span>
          <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>

        <div class="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between px-3.5">
          <a href="settings.php" class="inline-flex items-center gap-2 hover:opacity-80">
            <div class="w-6 h-6 rounded-full bg-blue-50 text-[#2854A6] font-bold text-[11px] flex items-center justify-center border border-blue-200">
              <?= strtoupper(substr($admin['username'] ?? 'A', 0, 1)) ?>
            </div>
            <span class="text-xs font-medium text-slate-800">
              @<?= htmlspecialchars($admin['username'] ?? 'admin') ?>
            </span>
          </a>
          <a
            href="logout.php"
            class="text-xs font-medium text-red-600 hover:text-red-700 px-2.5 py-1 rounded-md bg-red-50 hover:bg-red-100 transition-colors"
          >
            Sign Out
          </a>
        </div>
      </nav>
    </div>
  </header>

  <script>
    const toggleBtn = document.getElementById('mobileMenuToggleBtn');
    const drawer = document.getElementById('mobileMenuDrawer');
    const iconOpen = document.getElementById('menuIconOpen');
    const iconClose = document.getElementById('menuIconClose');

    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = drawer.classList.contains('hidden');
        if (isHidden) {
          drawer.classList.remove('hidden');
          iconOpen.classList.add('hidden');
          iconClose.classList.remove('hidden');
        } else {
          drawer.classList.add('hidden');
          iconOpen.classList.remove('hidden');
          iconClose.classList.add('hidden');
        }
      });
    }
  </script>

  <!-- Main Viewport Container -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

    <!-- Flash Alerts -->
    <?php if (!empty($_SESSION['flash_success'])): ?>
      <div class="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between shadow-xs">
        <div class="flex items-center gap-2.5">
          <svg class="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="font-medium"><?= htmlspecialchars($_SESSION['flash_success']) ?></span>
        </div>
        <button onclick="this.parentElement.remove()" class="text-emerald-500 hover:text-emerald-800 text-lg leading-none">&times;</button>
      </div>
      <?php unset($_SESSION['flash_success']); ?>
    <?php endif; ?>

    <?php if (!empty($_SESSION['flash_error'])): ?>
      <div class="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center justify-between shadow-xs">
        <div class="flex items-center gap-2.5">
          <svg class="w-5 h-5 text-rose-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="font-medium"><?= htmlspecialchars($_SESSION['flash_error']) ?></span>
        </div>
        <button onclick="this.parentElement.remove()" class="text-rose-500 hover:text-rose-800 text-lg leading-none">&times;</button>
      </div>
      <?php unset($_SESSION['flash_error']); ?>
    <?php endif; ?>
