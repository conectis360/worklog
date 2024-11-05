<?php
require_once '../model/WorklogModel.php';
$model = new WorklogModel();

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
?>
