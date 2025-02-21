<?php
session_start();

if (isset($_SESSION['username'])) {
    header("Location: index.php");
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    require "blockdatabase.php"; 

    $username = trim($_POST['username']);
    $password = trim($_POST['password']);
    $csrf_token = $_POST['csrf_token'] ?? '';

    if (empty($username) || empty($password)) {
        $error = "Username and password are required.";
    } elseif (!isset($_SESSION['csrf_token']) || $csrf_token !== $_SESSION['csrf_token']) {
        $error = "Invalid CSRF token.";
    } else {
        try {
            $sql = "SELECT username, userpassword, role FROM users WHERE username = :username";
            $stmt = $db->prepare($sql);
            $stmt->bindValue(":username", $username, PDO::PARAM_STR);
            $stmt->execute();
            
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['userpassword'])) {
                session_regenerate_id(true);
                
                $_SESSION['username'] = $user['username'];
                $_SESSION['role'] = $user['role']; 

                header("Location: " . ($user['role'] === 'Admin' ? "admin.php" : "index.php"));
                exit();
            }
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
        }

        $error = "Invalid username or password.";
    }
}

$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
?>

