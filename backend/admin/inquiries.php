<?php
require_once __DIR__ . '/auth.php';
requireAuth();

$db = getDbConnection();

// Handle status updates or deletion
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        $action = $_POST['action'] ?? '';
        $id = (int)($_POST['id'] ?? 0);

        if ($action === 'mark_read' && $id > 0) {
            $stmt = $db->prepare("UPDATE inquiries SET is_read = 1 WHERE id = :id");
            $stmt->execute(['id' => $id]);
            $_SESSION['flash_success'] = "Inquiry marked as read.";
            header('Location: inquiries.php');
            exit;
        }

        if ($action === 'delete' && $id > 0) {
            $stmt = $db->prepare("DELETE FROM inquiries WHERE id = :id");
            $stmt->execute(['id' => $id]);
            $_SESSION['flash_success'] = "Inquiry deleted.";
            header('Location: inquiries.php');
            exit;
        }
    }
}

// Fetch inquiries
$filter = $_GET['filter'] ?? 'all';
$whereSql = '';
if ($filter === 'unread') {
    $whereSql = 'WHERE is_read = 0';
} elseif ($filter === 'read') {
    $whereSql = 'WHERE is_read = 1';
}

$stmt = $db->query("SELECT * FROM inquiries {$whereSql} ORDER BY id DESC");
$inquiries = $stmt->fetchAll();
$csrfToken = getCsrfToken();
$pageTitle = 'Client Inquiries';
require_once __DIR__ . '/includes/header.php';
?>

<!-- Clean Header -->
<div class="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  <div>
    <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
      Client Inquiries
    </h1>
    <p class="text-sm text-slate-500 mt-1">
      Messages and consultation requests submitted from the live website contact form.
    </p>
  </div>
  <div class="flex items-center gap-2">
    <div class="p-1 bg-white border border-slate-200 rounded-xl flex items-center text-xs font-semibold">
      <a href="inquiries.php?filter=all" class="px-3 py-1.5 rounded-lg <?= $filter === 'all' ? 'bg-[#2854A6] text-white' : 'text-slate-600 hover:text-slate-900' ?>">
        All
      </a>
      <a href="inquiries.php?filter=unread" class="px-3 py-1.5 rounded-lg <?= $filter === 'unread' ? 'bg-[#2854A6] text-white' : 'text-slate-600 hover:text-slate-900' ?>">
        Unread
      </a>
      <a href="inquiries.php?filter=read" class="px-3 py-1.5 rounded-lg <?= $filter === 'read' ? 'bg-[#2854A6] text-white' : 'text-slate-600 hover:text-slate-900' ?>">
        Read
      </a>
    </div>
  </div>
</div>

<?php if (empty($inquiries)): ?>
  <div class="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-lg mx-auto shadow-xs">
    <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    </div>
    <h3 class="font-heading font-bold text-base text-slate-900">No Inquiries Found</h3>
    <p class="text-xs text-slate-500 mt-1">
      When visitors submit inquiries on the live website contact form, they will appear here.
    </p>
  </div>
<?php else: ?>
  <div class="space-y-4">
    <?php foreach ($inquiries as $inq): ?>
      <div class="bg-white border <?= $inq['is_read'] ? 'border-slate-200' : 'border-amber-300 ring-1 ring-amber-200' ?> rounded-2xl p-6 shadow-xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div class="flex items-center gap-2">
              <h4 class="font-heading font-bold text-slate-900 text-base"><?= htmlspecialchars($inq['name']) ?></h4>
              <?php if (!$inq['is_read']): ?>
                <span class="px-2 py-0.5 rounded-full bg-[#F7941D] text-white text-[10px] font-bold">New</span>
              <?php endif; ?>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">
              Received <?= date('M j, Y \a\t g:i a', strtotime($inq['created_at'])) ?>
            </p>
          </div>

          <div class="flex items-center gap-2">
            <?php if (!$inq['is_read']): ?>
              <form method="POST" action="" class="inline">
                <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
                <input type="hidden" name="action" value="mark_read">
                <input type="hidden" name="id" value="<?= $inq['id'] ?>">
                <button type="submit" class="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors">
                  Mark as Read
                </button>
              </form>
            <?php endif; ?>
            
            <form method="POST" action="" onsubmit="return confirm('Delete this inquiry?');" class="inline">
              <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
              <input type="hidden" name="action" value="delete">
              <input type="hidden" name="id" value="<?= $inq['id'] ?>">
              <button type="submit" class="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors" title="Delete">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div class="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#FAF8F5] p-3.5 rounded-xl border border-slate-100">
          <div>
            <span class="text-slate-400 block text-[10px] uppercase font-semibold">Service</span>
            <span class="font-bold text-slate-900"><?= htmlspecialchars($inq['service'] ?? 'General') ?></span>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px] uppercase font-semibold">Phone</span>
            <a href="tel:<?= htmlspecialchars($inq['phone']) ?>" class="text-[#2854A6] hover:underline font-semibold">
              <?= htmlspecialchars($inq['phone']) ?>
            </a>
          </div>
          <div>
            <span class="text-slate-400 block text-[10px] uppercase font-semibold">Email</span>
            <a href="mailto:<?= htmlspecialchars($inq['email']) ?>" class="text-[#2854A6] hover:underline font-semibold">
              <?= htmlspecialchars($inq['email']) ?>
            </a>
          </div>
        </div>

        <div class="mt-4">
          <p class="text-sm text-slate-800 leading-relaxed whitespace-pre-line bg-white p-4 rounded-xl border border-slate-100">
            <?= htmlspecialchars($inq['message']) ?>
          </p>
        </div>

        <div class="mt-4 flex items-center justify-end gap-3 text-xs">
          <a
            href="https://wa.me/<?= preg_replace('/[^0-9]/', '', $inq['phone']) ?>"
            target="_blank"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-semibold transition-colors"
          >
            <span>WhatsApp Client</span> &nearr;
          </a>
          <a
            href="mailto:<?= htmlspecialchars($inq['email']) ?>?subject=Re:%20TrueVolt%20Inquiry"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#2854A6] hover:bg-blue-100 font-semibold transition-colors"
          >
            <span>Reply via Email</span> &nearr;
          </a>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
<?php endif; ?>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
