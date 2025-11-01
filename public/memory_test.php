<?php
echo "Memory limit: " . ini_get('memory_limit') . "\n";
echo "Current usage: " . memory_get_usage() . "\n";
echo "Peak usage: " . memory_get_peak_usage() . "\n";
?>
