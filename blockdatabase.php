
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "my_database1";

try {
  
    $db = new PDO("mysql:host=$servername", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    $db->exec("CREATE DATABASE IF NOT EXISTS $dbname");
    
  
    $db = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    $sql = "
    CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        useremail VARCHAR(50) NOT NULL UNIQUE,
        userpassword VARCHAR(255) NOT NULL,
        role ENUM('Admin','Normal') DEFAULT 'Normal',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS lessons (
        lesson_id INT AUTO_INCREMENT PRIMARY KEY,
        lesson_name VARCHAR(25) NOT NULL UNIQUE,
        lesson_text TEXT NOT NULL,
        lesson_challenge TEXT NOT NULL,
        solution_challenge TEXT NOT NULL,
        lesson_progress ENUM('incomplete','complete') DEFAULT 'incomplete',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS Users_lessons    (
        id INT AUTO_INCREMENT PRIMARY KEY,
        lesson_id INT NOT NULL,
        user_id INT NOT NULL,
        comment TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (lesson_id) REFERENCES lessons(lesson_id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );
    CREATE TABLE IF NOT EXISTS feedback (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id int not null,
    email varchar(50) not null,
    subject varchar(50) not null,
    message TEXT not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
    );
    ";

    $db->exec($sql);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
