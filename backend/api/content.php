<?php
/**
 * Site Content REST API Endpoint
 * TrueVolt Systems Ltd Backend
 * 
 * Returns dynamic content for the Hero section and "What We Deliver" service cards.
 */

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';

try {
    $db = getDbConnection();

    $section = trim($_GET['section'] ?? '');
    $where = '';
    $params = [];

    if (!empty($section)) {
        $where = 'WHERE section = :section';
        $params[':section'] = $section;
    }

    $stmt = $db->prepare("SELECT content_key, section, value FROM site_content {$where}");
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    $content = [];
    foreach ($rows as $row) {
        $content[$row['content_key']] = $row['value'];
    }

    echo json_encode([
        'status' => 'success',
        'data'   => $content,
        'timestamp' => gmdate('Y-m-d\TH:i:s\Z')
    ]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'status'  => 'error',
        'message' => 'Failed to retrieve site content',
        'code'    => 500
    ]);
}
