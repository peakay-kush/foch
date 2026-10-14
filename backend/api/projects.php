<?php
/**
 * Projects API Endpoint
 * GET /api/projects.php
 * GET /api/projects.php?category=Solar
 * GET /api/projects.php?featured=1
 * GET /api/projects.php?id=1
 */

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';

try {
    $db = getDbConnection();
    $baseUrl = getBaseUrl();

    // Check if requesting single project by ID
    $id = isset($_GET['id']) ? (int)$_GET['id'] : null;
    if ($id) {
        $stmt = $db->prepare("SELECT * FROM projects WHERE id = :id AND status = 'published' LIMIT 1");
        $stmt->execute(['id' => $id]);
        $project = $stmt->fetch();

        if (!$project) {
            sendJsonError("Project not found", 404);
        }

        $project = formatProject($project, $baseUrl);
        sendJsonResponse($project);
    }

    // List query with optional filters
    $category = isset($_GET['category']) ? trim($_GET['category']) : null;
    $featured = isset($_GET['featured']) ? (int)$_GET['featured'] : null;
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;

    $where = ["status = 'published'"];
    $params = [];

    if ($category && in_array(strtolower($category), ['solar', 'electrical', 'security'])) {
        $where[] = "LOWER(category) = :category";
        $params['category'] = strtolower($category);
    }

    if ($featured !== null) {
        $where[] = "is_featured = :featured";
        $params['featured'] = $featured;
    }

    $whereClause = implode(' AND ', $where);
    $sql = "SELECT * FROM projects WHERE {$whereClause} ORDER BY sort_order ASC, id DESC LIMIT {$limit}";

    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    $rows = $stmt->fetchAll();

    $projects = array_map(function ($row) use ($baseUrl) {
        return formatProject($row, $baseUrl);
    }, $rows);

    sendJsonResponse($projects);

} catch (Throwable $e) {
    error_log("API Error in projects.php: " . $e->getMessage());
    sendJsonError("Unable to retrieve projects from database: " . $e->getMessage(), 500);
}

/**
 * Format a database project record for clean client consumption
 */
function formatProject(array $row, string $baseUrl): array {
    // Process specs into array
    $rawSpecs = trim($row['specs'] ?? '');
    $specs = [];
    if (!empty($rawSpecs)) {
        // Try decoding as JSON array first
        $decoded = json_decode($rawSpecs, true);
        if (is_array($decoded)) {
            $specs = $decoded;
        } else {
            // Split by newline or comma
            $lines = preg_split('/[\r\n,]+/', $rawSpecs);
            $specs = array_values(array_filter(array_map('trim', $lines)));
        }
    }

    // Process image URL
    $image = $row['image'] ?? '';
    if (!empty($image)) {
        if (!preg_match('/^https?:\/\//i', $image)) {
            // Relative path - if it's an upload, attach backend base URL
            if (strpos($image, 'uploads/') === 0 || strpos($image, '/uploads/') === 0) {
                $image = rtrim($baseUrl, '/') . '/' . ltrim($image, '/');
            }
        }
    }

    return [
        'id'          => (int)$row['id'],
        'category'    => $row['category'],
        'title'       => $row['title'],
        'location'    => $row['location'],
        'year'        => $row['year'],
        'refNum'      => !empty($row['ref_num']) ? (int)$row['ref_num'] : null,
        'image'       => $image,
        'imageSrc'    => $image, // Backwards compatibility for frontend cards
        'description' => $row['description'] ?? '',
        'specs'       => $specs,
        'aspect'      => !empty($row['aspect']) ? $row['aspect'] : 'aspect-[4/3]',
        'isFeatured'  => (bool)($row['is_featured'] ?? false),
        'sortOrder'   => (int)($row['sort_order'] ?? 0),
        'status'      => $row['status'] ?? 'published',
        'updatedAt'   => $row['updated_at'] ?? $row['created_at'] ?? null,
    ];
}
