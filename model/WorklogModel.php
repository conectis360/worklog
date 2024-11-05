<?php
class WorklogModel {
    private $db;

    public function __construct() {
        $this->db = new SQLite3('../worklog.db');
    }

    public function createWorklog($task_number, $title, $description_link, $description, $analysis, $is_finished = 0) {
        $stmt = $this->db->prepare('INSERT INTO worklogs (task_number, title, description_link, description, analysis, is_finished) 
                                    VALUES (:task_number, :title, :description_link, :description, :analysis, :is_finished)');
        $stmt->bindValue(':task_number', $task_number, SQLITE3_TEXT);
        $stmt->bindValue(':title', $title, SQLITE3_TEXT);
        $stmt->bindValue(':description_link', $description_link, SQLITE3_TEXT);
        $stmt->bindValue(':description', $description, SQLITE3_TEXT);
        $stmt->bindValue(':analysis', $analysis, SQLITE3_TEXT);
        $stmt->bindValue(':is_finished', $is_finished, SQLITE3_INTEGER);
        return $stmt->execute();
    }

    public function getWorklogs() {
        $result = $this->db->query('SELECT * FROM worklogs ORDER BY date_created DESC');
        $worklogs = [];
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $worklogs[] = $row;
        }
        return $worklogs;
    }

    public function getWorklogsById($id) {
        $stmt = $this->db->prepare('SELECT * FROM worklogs WHERE id = :id ORDER BY date_created DESC');
        $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
    
        $result = $stmt->execute();
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $worklogs = $row;
            break;
        }
        return $worklogs;
    }

    public function updateWorklog($id, $task_number, $title, $description_link, $description, $analysis, $is_finished) {
        $stmt = $this->db->prepare('UPDATE worklogs 
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

    public function deleteWorklog($id) {
        $stmt = $this->db->prepare('DELETE FROM worklogs WHERE id = :id');
        $stmt->bindValue(':id', $id, SQLITE3_INTEGER);
        return $stmt->execute();
    }
}
?>
