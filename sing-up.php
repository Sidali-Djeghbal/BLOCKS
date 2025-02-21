<?php 
session_start();
require "blockdatabase.php"; 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   
    $username = trim($_POST['username']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    
    if (empty($username) || empty($email) || empty($password)) {
        $error = "All fields are required.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = "Invalid email format.";
    } else {
        try {
           
            $sql = "SELECT user_id FROM users WHERE username = :username OR useremail = :email";
            $stmt = $db->prepare($sql);
            $stmt->bindValue(":username", $username, PDO::PARAM_STR);
            $stmt->bindValue(":email", $email, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->fetch()) {
                $error = "Username or Email is already taken.";
            } else {
              
                $hashed_password = password_hash($password, PASSWORD_DEFAULT);

               
                $sql = "INSERT INTO users (username, useremail, userpassword, role) 
                        VALUES (:username, :email, :password, 'Normal')";
                $stmt = $db->prepare($sql);
                $stmt->bindValue(":username", $username, PDO::PARAM_STR);
                $stmt->bindValue(":email", $email, PDO::PARAM_STR);
                $stmt->bindValue(":password", $hashed_password, PDO::PARAM_STR);

                if ($stmt->execute()) {
                    
                    header("Location: login.php?signup_success=1");
                    exit();
                } else {
                    $error = "Error registering. Please try again.";
                }
            }
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            $error = "An error occurred. Please try again later.";
        }
    }

    $db = null;
}
?>

