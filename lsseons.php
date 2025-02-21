<?php
session_start();
if(!isset($_SESSION["username"])){
    header("location:login.php");
    exit();
}
include "blockdatabase.php";
try{
$sql = "SELECT * FROM lessons WHERE username = :username";
$stmt = $db->prepare($sql);
$stmt->bindParam(":username", $_SESSION["username"], PDO::PARAM_STR);
$stmt->execute();
$lessons = $stmt->fetchAll(PDO::FETCH_ASSOC);

   
foreach ($lessons as $lesson) {
    echo "<h2>" . htmlspecialchars($lesson["lesson_name"]) . "</h2>";
    echo "<p>" . nl2br(htmlspecialchars($lesson["lesson_text"])) . "</p>";
    echo "<br>";

    echo "<h2>CHALLENGE</h2><br>";
    echo "<p>" . nl2br(htmlspecialchars($lesson["lesson_challenge"])) . "</p>";
    echo "<br>";

   
    echo '<button onclick="showSolution(\'solution_' . $lesson["lesson_id"] . '\')">Show Solution</button>';

   
    echo '<img id="solution_' . $lesson["lesson_id"] . '" src="' . htmlspecialchars($lesson["solution_challenge"]) . '" alt="Solution Image" style="display: none; max-width:100%; height:auto;">';

    echo "<br>";
    echo "<strong>Status: " . htmlspecialchars($lesson["lesson_progress"]) . "</strong><br><hr>";
}


}
catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

?>