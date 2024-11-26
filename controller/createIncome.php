<?php
require_once '../model/BudgetModel.php';
$model = new BudgetModel();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $result = $model->addIncome($data['user_id'], $data['amount'], $data['source'], $data['date'], $data['notes']);
    echo json_encode(['success' => $result]);
}
?>
