<?php
/**
 * CORS and JSON Response Helper
 * Allows seamless communication between Vercel frontend and cPanel backend.
 */

// Allow cross-origin requests from any frontend domain (Vercel, localhost, custom domains)
$origin = $_SERVER['HTTP_ORIGIN'] ?? '*';

header("Access-Control-Allow-Origin: {$origin}");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept, Origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 86400"); // Cache preflight for 24 hours

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Set standard JSON response header
header('Content-Type: application/json; charset=utf-8');

/**
 * Output JSON success response and terminate
 */
function sendJsonResponse(array $data, int $statusCode = 200): void {
    http_response_code($statusCode);
    echo json_encode([
        'status' => 'success',
        'code'   => $statusCode,
        'data'   => $data,
        'timestamp' => date('c')
    ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit;
}

/**
 * Output JSON error response and terminate
 */
function sendJsonError(string $message, int $statusCode = 400, array $errors = []): void {
    http_response_code($statusCode);
    echo json_encode([
        'status'  => 'error',
        'code'    => $statusCode,
        'message' => $message,
        'errors'  => $errors,
        'timestamp' => date('c')
    ], JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    exit;
}
