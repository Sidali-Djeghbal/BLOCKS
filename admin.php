<?php
session_start();
session_regenerate_id(true);

require "blockdatabase.php";

if (!isset($db)) {
    die("Database connection error.");
}

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'Admin') {
    header("Location: index.php");
    exit();
}

function addLesson($db, $lesson_name, $lesson_text, $lesson_challenge, $solution_challenge) {
    if (!preg_match('/^[a-zA-Z0-9\s\-]{3,50}$/', $lesson_name)) {
        throw new Exception("Invalid lesson name.");
    }

    $sql = "INSERT INTO lessons (lesson_name, lesson_text, lesson_challenge, solution_challenge) 
            VALUES (:lesson_name, :lesson_text, :lesson_challenge, :solution_challenge)";
    $stmt = $db->prepare($sql);
    return $stmt->execute([
        ':lesson_name' => trim($lesson_name),
        ':lesson_text' => trim($lesson_text),
        ':lesson_challenge' => trim($lesson_challenge),
        ':solution_challenge' => trim($solution_challenge)
    ]);
}

function addAdmin($db, $username, $useremail, $userpassword) {
    if (!filter_var($useremail, FILTER_VALIDATE_EMAIL)) {
        throw new Exception("Invalid email format.");
    }

    if (!preg_match('/^[a-zA-Z0-9_]{3,50}$/', $username)) {
        throw new Exception("Invalid username.");
    }

    $checkStmt = $db->prepare("SELECT user_id FROM users WHERE useremail = :useremail");
    $checkStmt->execute([':useremail' => $useremail]);
    
    if ($checkStmt->fetch()) {
        throw new Exception("Email is already registered.");
    }

    $hashedPassword = password_hash($userpassword, PASSWORD_ARGON2ID);

    $sql = "INSERT INTO users (username, useremail, userpassword, role) 
            VALUES (:username, :useremail, :userpassword, 'Admin')";
    $stmt = $db->prepare($sql);

    return $stmt->execute([
        ':username' => $username,
        ':useremail' => $useremail,
        ':userpassword' => $hashedPassword
    ]);
}

function updateLessonByName($db, $lesson_name, $lesson_text, $lesson_challenge, $solution_challenge) {
    $sql = "UPDATE lessons SET lesson_text=:lesson_text, lesson_challenge=:lesson_challenge, 
            solution_challenge=:solution_challenge WHERE lesson_name=:lesson_name";
    $stmt = $db->prepare($sql);
    return $stmt->execute([
        ':lesson_name' => trim($lesson_name),
        ':lesson_text' => trim($lesson_text),
        ':lesson_challenge' => trim($lesson_challenge),
        ':solution_challenge' => trim($solution_challenge)
    ]);
}

function deleteLessonByName($db, $lesson_name) {
    $sql = "DELETE FROM lessons WHERE lesson_name=:lesson_name";
    $stmt = $db->prepare($sql);
    return $stmt->execute([':lesson_name' => trim($lesson_name)]);
}

function getLessons($db) {
    $sql = "SELECT lesson_name, lesson_text, lesson_challenge, solution_challenge FROM lessons";
    $stmt = $db->query($sql);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        $lesson_name = $_POST['lesson_name'] ?? '';

        if ($_POST['action'] === 'add') {
            addLesson($db, $lesson_name, $_POST['lesson_text'], $_POST['lesson_challenge'], $_POST['solution_challenge']);
        } elseif ($_POST['action'] === 'update') {
            updateLessonByName($db, $lesson_name, $_POST['lesson_text'], $_POST['lesson_challenge'], $_POST['solution_challenge']);
        } elseif ($_POST['action'] === 'delete') {
            deleteLessonByName($db, $lesson_name);
        }
    }
}

$lessons = getLessons($db);
?>

