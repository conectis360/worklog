<?php
require_once '../model/BudgetModel.php';
$model = new BudgetModel();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $result = $model->addIncome($data['user_id'], $data['amount'], $data['source'], $data['date'], $data['notes']);
    echo json_encode(['success' => $result]);
}
?>

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

    $success = $model->addIncome(1, $data['amount'], $data['source'], $data['date'], $data['notes'] ?? '');
    echo json_encode(['success' => $success !== false]);
}
?>
