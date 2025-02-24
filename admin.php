<?php
session_start();
session_regenerate_id(true);
require "blockdatabase.php";

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'Admin') {
    header("Location: index.php");
    exit();
}

function getAlgorithms($db) {
    $sql = "SELECT * FROM algorithms ORDER BY updated_at DESC";
    $stmt = $db->query($sql);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function getPendingRequests($db) {
    $sql = "SELECT * FROM pending_algorithm_requests ORDER BY created_at DESC";
    $stmt = $db->query($sql);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

function approveAlgorithm($db, $request_id, $admin_name) {
    $sql = "SELECT * FROM pending_algorithm_requests WHERE id = :request_id";
    $stmt = $db->prepare($sql);
    $stmt->execute([':request_id' => $request_id]);
    $request = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($request) {
        $insert_sql = "INSERT INTO algorithms (algorithm_name, code, updated_by) 
                       VALUES (:algorithm_name, :code, :updated_by)";
        $insert_stmt = $db->prepare($insert_sql);
        $insert_stmt->execute([
            ':algorithm_name' => $request['algorithm_name'],
            ':code' => $request['code'],
            ':updated_by' => $admin_name
        ]);

        $delete_sql = "DELETE FROM pending_algorithm_requests WHERE id = :request_id";
        $delete_stmt = $db->prepare($delete_sql);
        $delete_stmt->execute([':request_id' => $request_id]);
    }
}

function rejectAlgorithm($db, $request_id) {
    $sql = "DELETE FROM pending_algorithm_requests WHERE id = :request_id";
    $stmt = $db->prepare($sql);
    $stmt->execute([':request_id' => $request_id]);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['approve']) && isset($_POST['request_id'])) {
        approveAlgorithm($db, $_POST['request_id'], $_SESSION['username']);
    } elseif (isset($_POST['reject']) && isset($_POST['request_id'])) {
        rejectAlgorithm($db, $_POST['request_id']);
    }
}

$algorithms = getAlgorithms($db);
$pending_requests = getPendingRequests($db);
?>

<h2>Algorithm Management</h2>

<h3>Pending Algorithm Requests</h3>
<table border="1">
    <tr>
        <th>ID</th>
        <th>User ID</th>
        <th>Algorithm Name</th>
        <th>Code</th>
        <th>Actions</th>
    </tr>
    <?php foreach ($pending_requests as $request): ?>
        <tr>
            <td><?= htmlspecialchars($request['id']) ?></td>
            <td><?= htmlspecialchars($request['user_id']) ?></td>
            <td><?= htmlspecialchars($request['algorithm_name']) ?></td>
            <td><pre><?= htmlspecialchars($request['code']) ?></pre></td>
            <td>
                <form method="post">
                    <input type="hidden" name="request_id" value="<?= $request['id'] ?>">
                    <button type="submit" name="approve">Approve</button>
                    <button type="submit" name="reject">Reject</button>
                </form>
            </td>
        </tr>
    <?php endforeach; ?>
</table>

<h3>Existing Algorithms</h3>
<table border="1">
    <tr>
        <th>ID</th>
        <th>Algorithm Name</th>
        <th>Code</th>
        <th>Updated By</th>
        <th>Updated At</th>
    </tr>
    <?php foreach ($algorithms as $algorithm): ?>
        <tr>
            <td><?= htmlspecialchars($algorithm['id']) ?></td>
            <td><?= htmlspecialchars($algorithm['algorithm_name']) ?></td>
            <td><pre><?= htmlspecialchars($algorithm['code']) ?></pre></td>
            <td><?= htmlspecialchars($algorithm['updated_by']) ?></td>
            <td><?= htmlspecialchars($algorithm['updated_at']) ?></td>
        </tr>
    <?php endforeach; ?>
</table>
