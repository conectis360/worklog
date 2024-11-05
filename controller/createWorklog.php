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
?>
