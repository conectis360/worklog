<?php
require_once '../model/WorklogModel.php';
$model = new WorklogModel();

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
