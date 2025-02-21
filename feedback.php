<?php

session_start();


include "blockdatabase.php";

try {
   
    if (!isset($db)) {
        throw new Exception("Database connection not initialized.");
    }

    $sql = "SELECT * FROM feedback ORDER BY created_at DESC";
    $stmt = $db->prepare($sql);
    $stmt->execute();

    $feedbacks = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($feedbacks as $feedback) {
        echo "<div class='feedback-box'>";
        echo "<h3>From: " . htmlspecialchars($feedback["username"], ENT_QUOTES, 'UTF-8') . 
             " (" . htmlspecialchars($feedback["email"], ENT_QUOTES, 'UTF-8') . ")</h3>";
        echo "<h4>Subject: " . htmlspecialchars($feedback["subject"], ENT_QUOTES, 'UTF-8') . "</h4>";
        echo "<p>" . nl2br(htmlspecialchars($feedback["message"], ENT_QUOTES, 'UTF-8')) . "</p>";
        echo "<small>Sent on: " . date("F j, Y, g:i a", strtotime($feedback["created_at"])) . "</small>";
        echo "<hr>";
        echo "</div>";
    }
} catch (PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    echo "An error occurred while fetching feedback.";
} catch (Exception $e) {
    error_log("General error: " . $e->getMessage());
    echo "An unexpected error occurred.";
}

?>
