<?php
$db = new SQLite3('my_database');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $task_number = $_POST['task_number'];
    $title = $_POST['title'];
    $description_link = $_POST['description_link'];
    $description = $_POST['description'];
    $analysis = $_POST['analysis'];
    createWorklog($task_number, $title, $description_link, $description, $analysis);
    header('Location: index.php');  // Redirect to main page or display a success message
}

// Updated function to create a worklog
function createWorklog($task_number, $title, $description_link, $description, $analysis, $is_finished = 0) {
    global $db;
    $stmt = $db->prepare('INSERT INTO worklogs (task_number, title, description_link, description, analysis, is_finished) 
                          VALUES (:task_number, :title, :description_link, :description, :analysis, :is_finished)');
    $stmt->bindValue(':task_number', $task_number, SQLITE3_TEXT);
    $stmt->bindValue(':title', $title, SQLITE3_TEXT);
    $stmt->bindValue(':description_link', $description_link, SQLITE3_TEXT);
    $stmt->bindValue(':description', $description, SQLITE3_TEXT);
    $stmt->bindValue(':analysis', $analysis, SQLITE3_TEXT);
    $stmt->bindValue(':is_finished', $is_finished, SQLITE3_INTEGER);
    return $stmt->execute();
}


function getWorklogs() {
    global $db;
    $result = $db->query('SELECT * FROM worklogs ORDER BY date_created DESC');
    $worklogs = [];
    while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
        $worklogs[] = $row;
    }
    return $worklogs;
}

?>