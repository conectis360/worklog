async function fetchIncomeSummary() {
    const response = await fetch('../controller/getIncomeSummary.php');
    const data = await response.json();
    document.getElementById('income-summary').textContent = `Total Income: ${data.total}`;
}

async function addIncome(amount, source, date, notes) {
    const response = await fetch('../controller/addIncome.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, source, date, notes })
    });
    const result = await response.json();
    if (result.success) {
        alert('Income added successfully');
    } else {
        alert('Failed to add income');
    }
}

const expenseChart = document.getElementById('expenseChart').getContext('2d');
new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Rent', 'Food', 'Entertainment', 'Utilities'],
        datasets: [{
            data: [500, 300, 200, 100],
            backgroundColor: ['red', 'blue', 'green', 'yellow']
        }]
    }
});

const balanceChart = document.getElementById('balanceChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
            label: 'Balance',
            data: [2000, 1800, 1500, 1700],
            borderColor: 'blue',
            fill: false
        }]
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    // Fetch summary data
    const summaryResponse = await fetch('../controller/budgetSummary.php?user_id=1');
    const summaryData = await summaryResponse.json();

    // Update summary cards
    document.getElementById('income-total').textContent = `$${summaryData.income}`;
    document.getElementById('expenses-total').textContent = `$${summaryData.expenses}`;
    document.getElementById('savings-total').textContent = `$${summaryData.savings}`;
    document.getElementById('debts-total').textContent = `$${summaryData.debts}`;

    // Fetch expense breakdown by category
    const categoryResponse = await fetch('../controller/expenseCategory.php?user_id=1');
    const categoryData = await categoryResponse.json();

    // Prepare data for the chart
    const labels = categoryData.map(item => item.category);
    const data = categoryData.map(item => item.total);

    // Render chart
    const ctx = document.getElementById('expenseChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['red', 'blue', 'green', 'yellow', 'orange']
            }]
        }
    });
});

