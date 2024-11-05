<?php
require_once '../model/WorklogModel.php';
$model = new WorklogModel();
// Set the content type to JSON
header('Content-Type: application/json');

// Get the HTTP method
$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $worklog = $model->getWorklogsById($id);
            echo json_encode($worklog);
        } else {
            $worklogs = $model->getWorklogs();
            echo json_encode($worklogs);
        }
        break;
}
?>