<?php
session_start();
if (!isset($_SESSION["username"])) {
    header("location: login.php");
    exit();
}
include "blockdatabase.php";

$sql = "SELECT * FROM algorithms";
$stmt = $db->query($sql);
$algorithms = $stmt->fetchAll(PDO::FETCH_ASSOC);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['request_algorithm'])) {
        $sql = "INSERT INTO pending_algorithm_requests (user_id, algorithm_name, code) 
                VALUES (:user_id, :algorithm_name, :code)";
        $stmt = $db->prepare($sql);
        $stmt->execute([
            ':user_id' => $_SESSION["user_id"],
            ':algorithm_name' => $_POST['algorithm_name'],
            ':code' => $_POST['code']
        ]);
        echo "Algorithm request submitted!";
    }
}
?>

<h2>Available Algorithms</h2>
<?php foreach ($algorithms as $algorithm): ?>
    <h3><?= htmlspecialchars($algorithm["algorithm_name"]) ?></h3>
    <pre><?= htmlspecialchars($algorithm["code"]) ?></pre>
    <p><strong>Updated By:</strong> <?= htmlspecialchars($algorithm["updated_by"]) ?></p>
    <p><strong>Updated At:</strong> <?= htmlspecialchars($algorithm["updated_at"]) ?></p>
    <hr>
<?php endforeach; ?>

<h2>Request a New Algorithm</h2>
<form method="post">
    <label>Algorithm Name:</label>
    <input type="text" name="algorithm_name" required>
    
    <label>Algorithm Code:</label>
    <textarea name="code" required></textarea>
    
    <button type="submit" name="request_algorithm">Submit Request</button>
</form>
