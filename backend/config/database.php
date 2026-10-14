<?php
/**
 * Database Configuration & Connection
 * TrueVolt Systems Ltd Backend
 * 
 * Works out of the box on cPanel shared hosting with MySQL/MariaDB & PDO.
 * You can customize these constants or set environment variables in cPanel.
 */

// Report errors in development, hide in production
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// Auto-load .env file if it exists (no composer dependency needed)
$envPath = __DIR__ . '/../.env';
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) {
            continue;
        }
        if (strpos($line, '=') !== false) {
            list($key, $val) = explode('=', $line, 2);
            $key = trim($key);
            $val = trim($val);
            // Strip matching wrapping quotes
            $len = strlen($val);
            if ($len >= 2 && (($val[0] === '"' && $val[$len - 1] === '"') || ($val[0] === "'" && $val[$len - 1] === "'"))) {
                $val = substr($val, 1, -1);
            }
            if (getenv($key) === false) {
                putenv("{$key}={$val}");
                $_ENV[$key] = $val;
                $_SERVER[$key] = $val;
            }
        }
    }
}

// Database Credentials (from .env or server environment, with fallbacks)
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_PORT', getenv('DB_PORT') ?: '3306');
define('DB_NAME', getenv('DB_NAME') ?: 'truevolt_db');
define('DB_USER', getenv('DB_USER') ?: 'root');
define('DB_PASS', getenv('DB_PASS') !== false ? getenv('DB_PASS') : '');
define('DB_CHARSET', 'utf8mb4');

// Base URL for image paths and uploads
define('APP_URL', getenv('APP_URL') ?: '');

// Frontend Live Site URL (fallback to localhost:3000)
define('LIVE_SITE_URL', getenv('LIVE_SITE_URL') ?: (getenv('APP_URL') ?: 'http://localhost:3000'));

/**
 * Returns the configured frontend live website URL
 */
function getLiveSiteUrl(): string {
    return defined('LIVE_SITE_URL') && !empty(LIVE_SITE_URL) ? rtrim(LIVE_SITE_URL, '/') : 'http://localhost:3000';
}

/**
 * Returns a singleton PDO connection
 * @return PDO
 */
function getDbConnection(): PDO {
    static $pdo = null;

    if ($pdo === null) {
        $dsn = sprintf(
            'mysql:host=%s;port=%s;dbname=%s;charset=%s',
            DB_HOST,
            DB_PORT,
            DB_NAME,
            DB_CHARSET
        );

        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        try {
            $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
        } catch (PDOException $e) {
            // Log real error for server admin
            error_log("Database connection error: " . $e->getMessage());
            
            // If API request, output JSON error
            if (strpos($_SERVER['REQUEST_URI'] ?? '', '/api/') !== false) {
                header('Content-Type: application/json; charset=utf-8');
                http_response_code(503);
                $isLocal = in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1', 'localhost']) || 
                           in_array($_SERVER['HTTP_HOST'] ?? '', ['localhost:8000', '127.0.0.1:8000']);
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Database connection failed. Please verify credentials in backend/.env',
                    'error_detail' => $isLocal ? $e->getMessage() : null,
                    'code' => 503
                ]);
                exit;
            } else {
                die("Database connection failed. Please check backend/config/database.php settings.");
            }
        }
    }

    return $pdo;
}

/**
 * Helper to get the base backend URL (e.g. https://example.com/backend)
 */
function getBaseUrl(): string {
    if (!empty(APP_URL)) {
        return rtrim(APP_URL, '/');
    }

    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') || 
              ($_SERVER['SERVER_PORT'] ?? 80) == 443 || 
              (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
              ? 'https://' : 'http://';

    $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
    
    // Calculate folder path relative to domain root
    $scriptDir = dirname(dirname($_SERVER['SCRIPT_NAME'] ?? ''));
    $scriptDir = str_replace('\\', '/', $scriptDir);
    if ($scriptDir === '/' || $scriptDir === '.') {
        $scriptDir = '';
    }

    return rtrim($scheme . $host . $scriptDir, '/');
}
