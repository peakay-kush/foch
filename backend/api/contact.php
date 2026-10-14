<?php
/**
 * Contact Inquiries API Endpoint
 * POST /api/contact.php
 */

require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/../config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonError("Method Not Allowed. Use POST.", 405);
}

// Support both JSON body and form-urlencoded / multipart POST
$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    $input = $_POST;
}

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$service = trim($input['service'] ?? '');
$location = trim($input['location'] ?? '');
$message = trim($input['message'] ?? '');

$errors = [];
if (empty($name)) {
    $errors['name'] = 'Full name is required.';
}
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'A valid email address is required.';
}
if (empty($phone)) {
    $errors['phone'] = 'Phone number is required.';
}
if (empty($message)) {
    $errors['message'] = 'Message is required.';
}

if (!empty($errors)) {
    sendJsonError("Validation failed", 422, $errors);
}

try {
    $db = getDbConnection();
    $stmt = $db->prepare("
        INSERT INTO inquiries (name, email, phone, service, location, message)
        VALUES (:name, :email, :phone, :service, :location, :message)
    ");
    $stmt->execute([
        ':name'     => $name,
        ':email'    => $email,
        ':phone'    => $phone,
        ':service'  => $service,
        ':location' => $location,
        ':message'  => $message,
    ]);

    sendJsonResponse([
        'message' => 'Thank you for reaching out to TrueVolt Systems. We have received your request and will contact you within 24 hours.',
        'id' => (int)$db->lastInsertId(),
    ], 201);

} catch (Throwable $e) {
    error_log("Error saving inquiry: " . $e->getMessage());
    sendJsonError("Unable to submit inquiry at this time.", 500);
}
