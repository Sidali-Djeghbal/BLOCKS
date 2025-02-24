<?php
session_start();
if (!isset($_SESSION["username"])) {
    header("location: login.php");
    exit();
}
include "blockdatabase.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['algorithm_name']) || !isset($_POST['code'])) {
        echo "Invalid request.";
        exit();
    }

    $algorithm_name = trim($_POST['algorithm_name']);
    $code = trim($_POST['code']);

    if (strlen($algorithm_name) < 3 || strlen($algorithm_name) > 50) {
        echo "Algorithm name must be between 3 and 50 characters.";
        exit();
    }

    if (strlen($code) < 10) {
        echo "Algorithm code must be at least 10 characters.";
        exit();
    }

    $sql = "INSERT INTO pending_algorithm_requests (user_id, algorithm_name, code) 
            VALUES (:user_id, :algorithm_name, :code)";
    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':user_id' => $_SESSION["user_id"],
        ':algorithm_name' => $algorithm_name,
        ':code' => $code
    ]);

    echo "Algorithm request submitted successfully!";
}
?>

<h2>Request a New Algorithm</h2>
<form method="post">
    <label>Algorithm Name:</label>
    <input type="text" name="algorithm_name" required>
    
    <label>Algorithm Code:</label>
    <textarea name="code" required></textarea>
    
    <button type="submit">Submit Request</button>
</form>
