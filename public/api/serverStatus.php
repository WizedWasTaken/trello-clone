<?php
$fp = @fsockopen('lotusrp.dk', 30120, $errno, $errstr, 1);
if ($fp) {
    echo "Online";
    fclose($fp);
} else {
    echo "Offline";
}
?>