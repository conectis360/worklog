<?php
require_once '../model/BudgetModel.php';

$model = new BudgetModel();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['goal'], $data['amount'], $data['date'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
        exit;
    }

    $success = $model->addSavings(1, $data['amount'], $data['goal'], $data['date'], $data['notes'] ?? '');
    echo json_encode(['success' => $success !== false]);
}
?>
