<?php
/**
 * Admin Authentication & Session Management
 */

if (!ob_get_level()) {
    ob_start();
}

if (session_status() === PHP_SESSION_NONE) {
    // Set secure session cookie parameters
    $isSecure = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || 
                ($_SERVER['SERVER_PORT'] ?? 80) == 443;

    session_set_cookie_params([
        'lifetime' => 86400 * 7, // 7 days
        'path' => '/',
        'domain' => '',
        'secure' => $isSecure,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    session_start();
}

require_once __DIR__ . '/../config/database.php';

/**
 * Check if current user is logged in
 */
function isLoggedIn(): bool {
    return !empty($_SESSION['admin_user_id']);
}

/**
 * Enforce authentication on protected admin pages
 */
function requireAuth(): void {
    if (!isLoggedIn()) {
        header('Location: login.php');
        exit;
    }
}

/**
 * Get logged-in admin details
 */
function getCurrentAdmin(): ?array {
    if (!isLoggedIn()) {
        return null;
    }
    return [
        'id'        => $_SESSION['admin_user_id'],
        'username'  => $_SESSION['admin_username'] ?? 'admin',
        'full_name' => $_SESSION['admin_full_name'] ?? 'Administrator',
        'email'     => $_SESSION['admin_email'] ?? '',
    ];
}

/**
 * CSRF token generation
 */
function getCsrfToken(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * CSRF token verification
 */
function verifyCsrfToken(?string $token): bool {
    if (empty($token) || empty($_SESSION['csrf_token'])) {
        return false;
    }
    return hash_equals($_SESSION['csrf_token'], $token);
}

/**
 * Resolves an asset (image/upload) URL for the Admin portal so it works
 * reliably whether the backend is hosted at the domain root, localhost,
 * or any live subdirectory (e.g. https://yourdomain.com/backend/admin/).
 */
function adminAssetUrl(?string $path, string $fallback = '../images/projects/solar-panel-installation.jpeg'): string {
    if (empty($path)) {
        return $fallback;
    }
    // Full external URLs or data URIs remain untouched
    if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://') || str_starts_with($path, 'data:')) {
        return $path;
    }
    // Already relative to admin directory
    if (str_starts_with($path, '../')) {
        return $path;
    }
    // Strip any leading slash to avoid browser jumping to domain root on live subdirectory setups
    $clean = ltrim($path, '/');
    return '../' . $clean;
}
