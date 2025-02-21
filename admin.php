<?php
session_start();
require "blockdatabase.php";

if (!isset($_SESSION['role']) || $_SESSION['role'] !== 'Admin') {
    header("Location: index.php");
    exit();
}

function addLesson($db, $lesson_name, $lesson_text, $lesson_challenge, $solution_challenge) {
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
