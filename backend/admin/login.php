<?php
require_once __DIR__ . '/auth.php';

if (isLoggedIn()) {
    header('Location: index.php');
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if (empty($username) || empty($password)) {
        $error = 'Please enter both username and password.';
    } else {
        try {
            $db = getDbConnection();
            $stmt = $db->prepare("SELECT * FROM admins WHERE username = :username LIMIT 1");
            $stmt->execute(['username' => $username]);
            $admin = $stmt->fetch();

            if ($admin && password_verify($password, $admin['password_hash'])) {
                session_regenerate_id(true);

                $_SESSION['admin_user_id'] = $admin['id'];
                $_SESSION['admin_username'] = $admin['username'];
                $_SESSION['admin_full_name'] = $admin['full_name'];
                $_SESSION['admin_email'] = $admin['email'];

                header('Location: index.php');
                exit;
            } else {
                $error = 'Invalid username or password. Please try again.';
            }
        } catch (Throwable $e) {
            $error = 'Database error: ' . $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en" class="h-full">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TrueVolt Admin — Login</title>
  <link rel="stylesheet" href="css/admin.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body class="h-full bg-[#FAF8F5] text-slate-800 flex items-center justify-center p-4 antialiased">

  <div class="max-w-md w-full">
    
    <!-- Real Brand Logo at Top -->
    <div class="text-center mb-8">
      <a href="/" class="inline-block">
        <img
          src="../images/truevolt-logo-transparent.png"
          alt="TrueVolt Systems Ltd"
          class="h-14 sm:h-16 w-auto object-contain mx-auto"
          onerror="this.onerror=null; this.src='../images/truevolt-logo-transparent.png';"
        >
      </a>
      <p class="text-xs uppercase tracking-[0.2em] font-semibold text-[#F7941D] mt-3">Content Management Portal</p>
    </div>

    <!-- Login Card Container -->
    <div class="bg-white border border-slate-200/90 shadow-lg rounded-2xl p-8 relative overflow-hidden">
      <!-- Decorative Top Brand Accent Line -->
      <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2854A6] via-[#1E4388] to-[#F7941D]"></div>

      <div class="mb-6">
        <h2 class="text-xl font-bold text-slate-900 tracking-tight">Admin Sign In</h2>
        <p class="text-xs text-slate-500 mt-1">Enter your credentials to manage live content.</p>
      </div>

      <!-- Error Alert -->
      <?php if (!empty($error)): ?>
        <div class="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
          <svg class="w-4 h-4 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div><?= htmlspecialchars($error) ?></div>
        </div>
      <?php endif; ?>

      <!-- Form -->
      <form method="POST" action="" class="space-y-4">
        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Username</label>
          <input
            type="text"
            name="username"
            required
            autofocus
            placeholder="admin"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2854A6] focus:ring-2 focus:ring-[#2854A6]/20 outline-none text-slate-900 text-sm transition-all"
            value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
          >
        </div>

        <div>
          <label class="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            required
            placeholder="••••••••••••"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#2854A6] focus:ring-2 focus:ring-[#2854A6]/20 outline-none text-slate-900 text-sm transition-all"
          >
        </div>

        <button
          type="submit"
          class="w-full mt-2 py-3.5 rounded-xl bg-[#2854A6] hover:bg-[#1E4388] text-white font-semibold text-xs tracking-wider uppercase shadow-xs transition-colors"
        >
          Sign In to Portal
        </button>
      </form>


    </div>

    <!-- Live Site Link -->
    <div class="text-center mt-6">
      <a href="<?= htmlspecialchars(getLiveSiteUrl()) ?>" target="_blank" class="text-xs text-slate-500 hover:text-[#2854A6] transition-colors">
        &larr; Return to Live Website
      </a>
    </div>

  </div>

</body>
</html>
