<?php
require_once '../model/BudgetModel.php';
$model = new BudgetModel();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user_id = $_GET['user_id'];
    $categories = $model->getExpensesByCategory($user_id);
    echo json_encode($categories);
}
?>
