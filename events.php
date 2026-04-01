<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// TURN OFF HTML ERRORS (VERY IMPORTANT)
ini_set('display_errors', 0);
error_reporting(0);

$conn = new mysqli(
    "sql101.infinityfree.com",
    "if0_41096969",
    "Shaolin18270601",
    "if0_41096969_deewan"
);

// If DB fails → return JSON (NOT HTML)
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "Database connection failed"
    ]);
    exit;
}

$sql = "SELECT id, title, location, date FROM events ORDER BY id DESC";
$result = $conn->query($sql);

$data = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode([
    "success" => true,
    "data" => $data
]);

$conn->close();
?>
