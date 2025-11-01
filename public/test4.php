<?php
echo "TEST 4: Testing Laravel kernel...";
require_once __DIR__.'/../vendor/autoload.php';
$app = require_once __DIR__.'/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
echo "Laravel kernel works!";
?>
