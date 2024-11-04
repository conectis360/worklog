<?php
// Include database connection
$db = new SQLite3('my_database');

// Function to update a worklog
function updateWorklog($id, $task_number, $title, $description_link, $description, $analysis, $is_finished) {
    global $db;
    $stmt = $db->prepare('UPDATE worklogs 
                          SET task_number = :task_number, 
                              title = :title, 
                              description_link = :description_link, 
                              description = :description, 
                              analysis = :analysis, 
                              is_finished = :is_finished, 
                              last_updated = CURRENT_TIMESTAMP 
                          WHERE id = :id');
    $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
    $stmt->bindValue(':task_number', $task_number, SQLITE3_TEXT);
    $stmt->bindValue(':title', $title, SQLITE3_TEXT);
    $stmt->bindValue(':description_link', $description_link, SQLITE3_TEXT);
    $stmt->bindValue(':description', $description, SQLITE3_TEXT);
    $stmt->bindValue(':analysis', $analysis, SQLITE3_TEXT);
    $stmt->bindValue(':is_finished', $is_finished, SQLITE3_INTEGER);
    return $stmt->execute();
}

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get form data
    $id = $_POST['id'];
    $task_number = $_POST['task_number'];
    $title = $_POST['title'];
    $description_link = $_POST['description_link'];
    $description = $_POST['description'];
    $analysis = $_POST['analysis'];
    $is_finished = isset($_POST['is_finished']) ? 1 : 0;


    // Validate data (you can add more detailed validation as needed)
    if ($id && $task_number && $title && $description_link) {
        if (updateWorklog($id, $task_number, $title, $description_link, $description, $analysis, $is_finished)) {
            // Redirect to the main page after successful update
            header('Location: index.php');
            exit;
        } else {
            echo "<p class='notification is-danger'>Failed to update the worklog. Please try again.</p>";
        }
    } else {
        echo "<p class='notification is-warning'>Please fill in all required fields.</p>";
    }
}
?>
