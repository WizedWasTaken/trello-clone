<?php
$players = json_decode(file_get_contents('http://lotusrp.dk:30120/players.json'), true);
if ($players) {
    echo "count($players)";
} else {
    echo "count(0)";
}

?>