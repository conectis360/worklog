<?php
class BudgetModel {
    private $db;

    public function __construct() {
        $this->db = new SQLite3('../worklog.db'); // Use the same database
    }

    // Add Income
    public function addIncome($user_id, $amount, $source, $date, $notes) {
        $stmt = $this->db->prepare("INSERT INTO income (user_id, amount, source, date, notes) 
                                    VALUES (:user_id, :amount, :source, :date, :notes)");
        $stmt->bindValue(':user_id', $user_id, SQLITE3_INTEGER);
        $stmt->bindValue(':amount', $amount, SQLITE3_FLOAT);
        $stmt->bindValue(':source', $source, SQLITE3_TEXT);
        $stmt->bindValue(':date', $date, SQLITE3_TEXT);
        $stmt->bindValue(':notes', $notes, SQLITE3_TEXT);
        return $stmt->execute();
    }

    // Add Expense
    public function addExpense($user_id, $amount, $category, $date, $notes) {
        $stmt = $this->db->prepare("INSERT INTO expenses (user_id, amount, category, date, notes) 
                                    VALUES (:user_id, :amount, :category, :date, :notes)");
        $stmt->bindValue(':user_id', $user_id, SQLITE3_INTEGER);
        $stmt->bindValue(':amount', $amount, SQLITE3_FLOAT);
        $stmt->bindValue(':category', $category, SQLITE3_TEXT);
        $stmt->bindValue(':date', $date, SQLITE3_TEXT);
        $stmt->bindValue(':notes', $notes, SQLITE3_TEXT);
        return $stmt->execute();
    }

    // Fetch Summary Data
    public function getSummary($user_id) {
        $income = $this->db->querySingle("SELECT SUM(amount) as total_income FROM income WHERE user_id = $user_id");
        $expenses = $this->db->querySingle("SELECT SUM(amount) as total_expenses FROM expenses WHERE user_id = $user_id");
        $savings = $this->db->querySingle("SELECT SUM(amount) as total_savings FROM savings WHERE user_id = $user_id");
        $debts = $this->db->querySingle("SELECT SUM(amount) as total_debts FROM debts WHERE user_id = $user_id");

        return [
            'income' => $income ?: 0,
            'expenses' => $expenses ?: 0,
            'savings' => $savings ?: 0,
            'debts' => $debts ?: 0
        ];
    }

    // Fetch Expenses by Category
    public function getExpensesByCategory($user_id) {
        $result = $this->db->query("SELECT category, SUM(amount) as total FROM expenses WHERE user_id = $user_id GROUP BY category");
        $categories = [];
        while ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            $categories[] = $row;
        }
        return $categories;
    }
}
?>
