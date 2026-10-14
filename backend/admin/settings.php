<?php
require_once __DIR__ . '/auth.php';
requireAuth();

$db = getDbConnection();
$adminSession = getCurrentAdmin();
$adminId = (int)$adminSession['id'];

// Fetch latest fresh record from database
$stmt = $db->prepare("SELECT id, username, email, full_name, password_hash, created_at, updated_at FROM admins WHERE id = :id LIMIT 1");
$stmt->execute([':id' => $adminId]);
$admin = $stmt->fetch();

if (!$admin) {
    $_SESSION['flash_error'] = "Admin user not found.";
    header('Location: login.php');
    exit;
}

$errors = [];
$successMessage = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!verifyCsrfToken($_POST['csrf_token'] ?? '')) {
        $errors[] = "Security session expired. Please reload and try again.";
    } else {
        $action = $_POST['action'] ?? '';

        // ─────────────────────────────────────────────────────────────
        // 1. CHANGE PASSWORD ACTION
        // ─────────────────────────────────────────────────────────────
        if ($action === 'change_password') {
            $currentPassword = (string)($_POST['current_password'] ?? '');
            $newPassword     = (string)($_POST['new_password'] ?? '');
            $confirmPassword = (string)($_POST['confirm_password'] ?? '');

            if (empty($currentPassword)) {
                $errors[] = "Please enter your current password.";
            } elseif (!password_verify($currentPassword, $admin['password_hash'])) {
                $errors[] = "The current password you entered is incorrect.";
            }

            if (empty($newPassword)) {
                $errors[] = "Please enter a new password.";
            } elseif (strlen($newPassword) < 8) {
                $errors[] = "New password must be at least 8 characters long.";
            }

            if ($newPassword !== $confirmPassword) {
                $errors[] = "The new password and confirmation password do not match.";
            }

            if (empty($errors)) {
                try {
                    $newHash = password_hash($newPassword, PASSWORD_DEFAULT);
                    $upd = $db->prepare("UPDATE admins SET password_hash = :hash, updated_at = NOW() WHERE id = :id");
                    $upd->execute([
                        ':hash' => $newHash,
                        ':id'   => $adminId,
                    ]);

                    $_SESSION['flash_success'] = "Your password has been successfully updated. Please use your new password next time you sign in.";
                    header('Location: settings.php');
                    exit;
                } catch (Throwable $t) {
                    $errors[] = "Failed to update password: " . $t->getMessage();
                }
            }
        }

        // ─────────────────────────────────────────────────────────────
        // 2. UPDATE PROFILE DETAILS (FULL NAME & EMAIL)
        // ─────────────────────────────────────────────────────────────
        if ($action === 'update_profile') {
            $fullName = trim($_POST['full_name'] ?? '');
            $email    = trim($_POST['email'] ?? '');

            if (empty($fullName)) {
                $errors[] = "Full name cannot be blank.";
            }
            if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $errors[] = "Please provide a valid email address.";
            }

            if (empty($errors)) {
                try {
                    $upd = $db->prepare("UPDATE admins SET full_name = :fn, email = :em, updated_at = NOW() WHERE id = :id");
                    $upd->execute([
                        ':fn' => $fullName,
                        ':em' => $email,
                        ':id' => $adminId,
                    ]);

                    $_SESSION['admin_full_name'] = $fullName;
                    $_SESSION['admin_email'] = $email;
                    $_SESSION['flash_success'] = "Account profile details successfully updated.";
                    header('Location: settings.php');
                    exit;
                } catch (Throwable $t) {
                    $errors[] = "Failed to update profile: " . $t->getMessage();
                }
            }
        }
    }
}

$csrfToken = getCsrfToken();
$pageTitle = 'Account & Security Settings';
require_once __DIR__ . '/includes/header.php';
?>

<!-- Clean Page Header -->
<div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
  <div>
    <h1 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
      Account &amp; Security Settings
    </h1>
    <p class="text-sm text-slate-500 mt-1">
      Change your admin password and manage your TrueVolt portal credentials.
    </p>
  </div>
</div>

<!-- Errors Alert -->
<?php if (!empty($errors)): ?>
  <div class="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-1">
    <div class="font-bold flex items-center gap-1.5">
      <svg class="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>Please correct the following errors:</span>
    </div>
    <ul class="list-disc list-inside space-y-0.5 pl-5">
      <?php foreach ($errors as $e): ?>
        <li><?= htmlspecialchars($e) ?></li>
      <?php endforeach; ?>
    </ul>
  </div>
<?php endif; ?>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

  <!-- ═══════════════════════════════════════════════════════════════════ -->
  <!-- 1. CHANGE PASSWORD CARD -->
  <!-- ═══════════════════════════════════════════════════════════════════ -->
  <div class="lg:col-span-7">
    <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
      
      <div class="flex items-center gap-3 pb-5 border-b border-slate-100 mb-6">
        <div class="w-10 h-10 rounded-xl bg-blue-50 text-[#2854A6] flex items-center justify-center font-bold">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <div>
          <h2 class="font-heading font-bold text-lg text-slate-900">Change Admin Password</h2>
          <p class="text-xs text-slate-500">Update your login password to maintain high portal security.</p>
        </div>
      </div>

      <form method="POST" action="" class="space-y-5">
        <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
        <input type="hidden" name="action" value="change_password">

        <!-- Current Password -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Current Password <span class="text-rose-500">*</span>
          </label>
          <div class="relative">
            <input
              type="password"
              name="current_password"
              id="current_password"
              required
              autocomplete="current-password"
              placeholder="Enter your current password"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#2854A6] focus:ring-2 focus:ring-[#2854A6]/20 transition-all pr-10"
            >
            <button
              type="button"
              onclick="togglePasswordVisibility('current_password', this)"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              tabindex="-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <!-- New Password -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            New Password <span class="text-rose-500">*</span>
          </label>
          <div class="relative">
            <input
              type="password"
              name="new_password"
              id="new_password"
              required
              minlength="8"
              autocomplete="new-password"
              placeholder="Minimum 8 characters"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#2854A6] focus:ring-2 focus:ring-[#2854A6]/20 transition-all pr-10"
              oninput="checkPasswordStrength(this.value)"
            >
            <button
              type="button"
              onclick="togglePasswordVisibility('new_password', this)"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              tabindex="-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
          <div id="strength_meter" class="mt-2 hidden">
            <div class="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div id="strength_bar" class="h-full w-0 transition-all duration-300"></div>
            </div>
            <p id="strength_text" class="text-[11px] text-slate-500 mt-1 font-medium"></p>
          </div>
        </div>

        <!-- Confirm Password -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Confirm New Password <span class="text-rose-500">*</span>
          </label>
          <div class="relative">
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              required
              minlength="8"
              autocomplete="new-password"
              placeholder="Re-enter your new password"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-[#2854A6] focus:ring-2 focus:ring-[#2854A6]/20 transition-all pr-10"
            >
            <button
              type="button"
              onclick="togglePasswordVisibility('confirm_password', this)"
              class="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
              tabindex="-1"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            class="px-6 py-3 rounded-xl bg-[#2854A6] hover:bg-[#1E4388] text-white font-semibold text-xs uppercase tracking-wider shadow-sm transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4 text-[#F7941D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span>Update Password</span>
          </button>
        </div>

      </form>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════════ -->
  <!-- 2. ADMIN PROFILE DETAILS CARD -->
  <!-- ═══════════════════════════════════════════════════════════════════ -->
  <div class="lg:col-span-5 space-y-6">
    
    <div class="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
      <div class="flex items-center gap-3 pb-5 border-b border-slate-100 mb-6">
        <div class="w-10 h-10 rounded-xl bg-amber-50 text-[#F7941D] flex items-center justify-center font-bold">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h2 class="font-heading font-bold text-lg text-slate-900">Profile Details</h2>
          <p class="text-xs text-slate-500">Name and contact information for this account</p>
        </div>
      </div>

      <form method="POST" action="" class="space-y-4">
        <input type="hidden" name="csrf_token" value="<?= $csrfToken ?>">
        <input type="hidden" name="action" value="update_profile">

        <!-- Username (Readonly) -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
            Admin Username
          </label>
          <input
            type="text"
            value="<?= htmlspecialchars($admin['username']) ?>"
            disabled
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-xs font-mono cursor-not-allowed"
          >
          <span class="text-[11px] text-slate-400 mt-1 block">Username cannot be changed.</span>
        </div>

        <!-- Full Name -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            name="full_name"
            value="<?= htmlspecialchars($admin['full_name']) ?>"
            required
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#2854A6]"
          >
        </div>

        <!-- Email Address -->
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Notification Email
          </label>
          <input
            type="email"
            name="email"
            value="<?= htmlspecialchars($admin['email']) ?>"
            required
            class="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#2854A6]"
          >
        </div>

        <div class="pt-3 border-t border-slate-100 flex items-center justify-end">
          <button
            type="submit"
            class="px-5 py-2.5 rounded-xl border border-slate-200 hover:border-[#2854A6] hover:text-[#2854A6] bg-white text-slate-700 font-semibold text-xs tracking-wider uppercase transition-colors"
          >
            Save Profile
          </button>
        </div>
      </form>
    </div>


  </div>

</div>

<script>
function togglePasswordVisibility(fieldId, btn) {
  const input = document.getElementById(fieldId);
  if (input.type === 'password') {
    input.type = 'text';
    btn.classList.add('text-[#2854A6]');
  } else {
    input.type = 'password';
    btn.classList.remove('text-[#2854A6]');
  }
}

function checkPasswordStrength(password) {
  const meter = document.getElementById('strength_meter');
  const bar = document.getElementById('strength_bar');
  const text = document.getElementById('strength_text');

  if (!password) {
    meter.classList.add('hidden');
    return;
  }
  meter.classList.remove('hidden');

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    bar.style.width = '33%';
    bar.className = 'h-full bg-rose-500 transition-all duration-300';
    text.textContent = 'Weak password';
    text.className = 'text-[11px] text-rose-600 mt-1 font-medium';
  } else if (score <= 4) {
    bar.style.width = '66%';
    bar.className = 'h-full bg-amber-500 transition-all duration-300';
    text.textContent = 'Medium strength';
    text.className = 'text-[11px] text-amber-600 mt-1 font-medium';
  } else {
    bar.style.width = '100%';
    bar.className = 'h-full bg-emerald-500 transition-all duration-300';
    text.textContent = 'Strong password';
    text.className = 'text-[11px] text-emerald-600 mt-1 font-medium';
  }
}
</script>

<?php require_once __DIR__ . '/includes/footer.php'; ?>
