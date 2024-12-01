<?php

require_once '../model/BudgetModel.php';

$model = new BudgetModel();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['source'], $data['amount'], $data['category'], $data['date'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Invalid data']);
        exit;
    }

    $success = $model->addExpense(1, $data['amount'], $data['category'], $data['date'], $data['notes'] ?? '');
    echo json_encode(['success' => $success !== false]);
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user_id = $_GET['user_id'];
    $categories = $model->getExpensesByCategory($user_id);
    echo json_encode($categories);
}


?>
