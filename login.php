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

    if (empty($username) || empty($password)) {
        $error = "Username and password are required.";
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

                
                if ($user['role'] === 'Admin') {
                    header("Location: admin.php");
                } else {
                    header("Location: index.php");
                }
                exit();
            } else {
                $error = "Invalid username or password.";
            }
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            $error = "An error occurred. Please try again later.";
        }
    }

    $db = null;
}
?>



?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="POST">
    <h2>LOgin form</h2>
    <div>
    <input type="text" name="username" placeholder="username">
    <input type="email" name="email" placeholder="email">
    <input type="password" name="password" placeholder="password">
    </div>
    <button name="submit" value="submit">submit</button>
   
    </form>
    
</body>
</html>