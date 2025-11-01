<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Step 1: PHP is working\n";

// Test file permissions
$storage = is_writable('../storage');
$bootstrap = is_writable('../bootstrap/cache');
echo "Storage writable: " . ($storage ? 'Yes' : 'No') . "\n";
echo "Bootstrap cache writable: " . ($bootstrap ? 'Yes' : 'No') . "\n";

// Test database connection
try {
    $pdo = new PDO('sqlite:' . __DIR__ . '/../database/database.sqlite');
    echo "Database: Connected\n";
} catch (Exception $e) {
    echo "Database Error: " . $e->getMessage() . "\n";
}

echo "Step 2: All tests completed\n";
?>
