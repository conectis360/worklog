<?php
require_once '../model/WorklogModel.php';
$model = new WorklogModel();
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $result = $model->createWorklog(
        $data['task_number'],
        $data['title'],
        $data['description_link'],
        $data['description'],
        $data['analysis'],
        $data['is_finished']
    );
    echo json_encode(['success' => $result !== false]);
} else {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) {
        $result = $model->updateWorklog(
            $data['id'],
            $data['task_number'],
            $data['title'],
            $data['description_link'],
            $data['description'],
            $data['analysis'],
            $data['is_finished']
        );
        echo json_encode(['success' => $result !== false]);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid input']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

$method = $_SERVER['REQUEST_METHOD'];
$page = isset($_GET['page']) && is_numeric($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = 10;
$offset = ($page - 1) * $limit;

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $worklog = $model->getWorklogsById($id);
            echo $worklog;
        } else {
            $worklogs = $model->getWorklogs($offset, $page, $limit);
            echo $worklogs;
        }
        break;
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Parse the URL to get the ID
    parse_str(file_get_contents("php://input"), $_DELETE);
    $id = $_DELETE['id'] ?? null;

    if ($id && $model->deleteWorklog($id)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Worklog deleted successfully']);
    } else {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Failed to delete the worklog']);
    }
} else {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}
?>
