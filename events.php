<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://shao.infinityfree.me/api/events.php");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "User-Agent: Mozilla/5.0"
]);

$response = curl_exec($ch);
curl_close($ch);

echo $response;