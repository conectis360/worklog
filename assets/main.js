document.addEventListener('DOMContentLoaded', async () => {
    const worklogList = document.getElementById('worklog-list');

    // Function to fetch and display worklogs
    async function loadWorklogs() {
        const response = await fetch('../controller/readWorklogs.php');
        const worklogs = await response.json();
        worklogList.innerHTML = '';
        worklogs.forEach(worklog => {
            const isFinished = worklog.is_finished ? ' (FINISHED)' : '';
            const titleStyle = worklog.is_finished ? 'text-decoration: line-through;' : '';

            const worklogItem = `
                <div class="box" id="worklog-${worklog.id}">
                    <h2 class="subtitle" style="${titleStyle}">${worklog.title}${isFinished} (Task #${worklog.task_number})</h2>
                    <p><a href="${worklog.description_link}" target="_blank" class="is-link">View Task Description</a></p>
                    <p><strong>Description:</strong> ${worklog.description}</p>
                    <p><strong>Analysis:</strong> ${worklog.analysis}</p>
                    <p class="has-text-grey-light">Created on: ${worklog.date_created}</p>
                    <button class="button is-info" onclick="showEditModal(${worklog.id})">Edit</button>
                    <button class="button is-danger" onclick="deleteWorklog(${worklog.id})">Delete</button>
                </div>
            `;
            worklogList.innerHTML += worklogItem;
        });
    }

    // Load the worklogs when the page loads
    await loadWorklogs();
});

// Function to delete a worklog
async function deleteWorklog(id) {
    const response = await fetch(`../controller/deleteWorklog.php?id=${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.getElementById(`worklog-${id}`).remove();
        alert('Worklog deleted successfully');
    } else {
        alert('Failed to delete the worklog');
    }
}

// Function to show the edit modal with worklog data
async function showEditModal(id) {
    console.log('into showEditModal method')
    // Fetch existing worklog data
    const worklog = await this.fetchWorklogById(id);

    if (worklog) {
        document.getElementById('editWorklogId').value = worklog.id;
        document.getElementById('editTaskNumber').value = worklog.task_number;
        document.getElementById('editTitle').value = worklog.title;
        document.getElementById('editDescriptionLink').value = worklog.description_link;
        document.getElementById('editDescription').value = worklog.description;
        document.getElementById('editAnalysis').value = worklog.analysis;
        document.getElementById('editIsFinished').checked = worklog.is_finished;

        // Display modal logic here (e.g., show a modal using Bulma or custom modal display logic)
        document.getElementById('editModal').classList.add('is-active');
    }
}

async function fetchWorklogById(id) {
    try {
        const response = await fetch(`../controller/readWorklogs.php?id=${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch the worklog');
        }
        const worklog = await response.json();
        console.log(worklog);
        return worklog;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while fetching the worklog.');
    }
}

// Function to handle form submission for editing
async function submitEditForm() {
    const id = document.getElementById('editWorklogId').value;
    const taskNumber = document.getElementById('editTaskNumber').value;
    const title = document.getElementById('editTitle').value;
    const descriptionLink = document.getElementById('editDescriptionLink').value;
    const description = document.getElementById('editDescription').value;
    const analysis = document.getElementById('editAnalysis').value;
    const isFinished = document.getElementById('editIsFinished').checked ? 1 : 0;

    const response = await fetch(`../controller/updateWorklog.php?id=${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, task_number: taskNumber, title, description_link: descriptionLink, description, analysis, is_finished: isFinished }),
    });

    if (response.ok) {
        alert('Worklog updated successfully');
        document.getElementById('editModal').classList.remove('is-active');
        await loadWorklogs(); // Reload worklogs to reflect changes
    } else {
        alert('Failed to update the worklog');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.getElementById('openSavingsModal');
    const closeModalButton = document.getElementById('closeSavingsModal');
    const cancelModalButton = document.getElementById('cancelSavingsModal');
    const savingsModal = document.getElementById('savingsModal');
    const saveSavingsButton = document.getElementById('saveSavings');
    const savingsForm = document.getElementById('savingsForm');

    // Open modal
    openModalButton.addEventListener('click', () => {
        savingsModal.classList.add('is-active');
        savingsModal.setAttribute('aria-hidden', 'false');
    });

    // Close modal
    const closeModal = () => {
        savingsModal.classList.remove('is-active');
        savingsModal.setAttribute('aria-hidden', 'true');
        savingsForm.reset(); // Clear input fields
    };

    closeModalButton.addEventListener('click', closeModal);
    cancelModalButton.addEventListener('click', closeModal);

    // Save savings data
    saveSavingsButton.addEventListener('click', async (e) => {
        e.preventDefault();

        // Validate form inputs
        const goal = document.getElementById('savingsGoal').value.trim();
        const amount = parseFloat(document.getElementById('savingsAmount').value);
        const date = document.getElementById('savingsDate').value;
        const notes = document.getElementById('savingsNotes').value.trim();

        if (!goal || isNaN(amount) || !date) {
            alert('Please fill in all required fields.');
            return;
        }

        // Construct data payload
        const savingsData = {
            goal,
            amount,
            date,
            notes,
        };

        // Send data to the backend
        try {
            const response = await fetch('../controller/createSavings.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(savingsData),
            });

            const result = await response.json();
            if (result.success) {
                alert('Savings added successfully!');
                closeModal();
            } else {
                alert('Failed to save savings. Please try again.');
            }
        } catch (error) {
            console.error('Error saving savings:', error);
            alert('An error occurred. Please try again.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.getElementById('openInvestmentModal');
    const closeModalButton = document.getElementById('closeInvestmentModal');
    const cancelModalButton = document.getElementById('cancelInvestmentModal');
    const investmentModal = document.getElementById('investmentModal');
    const saveInvestmentButton = document.getElementById('saveInvestment');
    const investmentForm = document.getElementById('investmentForm');

    // Open modal
    openModalButton.addEventListener('click', () => {
        investmentModal.classList.add('is-active');
        investmentModal.setAttribute('aria-hidden', 'false');
    });

    // Close modal
    const closeModal = () => {
        investmentModal.classList.remove('is-active');
        investmentModal.setAttribute('aria-hidden', 'true');
        investmentForm.reset(); // Clear input fields
    };

    closeModalButton.addEventListener('click', closeModal);
    cancelModalButton.addEventListener('click', closeModal);

    // Save investment data
    saveInvestmentButton.addEventListener('click', async (e) => {
        e.preventDefault();

        // Validate form inputs
        const type = document.getElementById('investmentType').value.trim();
        const amount = parseFloat(document.getElementById('investmentAmount').value);
        const category = document.getElementById('investmentCategory').value;
        const date = document.getElementById('investmentDate').value;
        const notes = document.getElementById('investmentNotes').value.trim();

        if (!type || isNaN(amount) || !category || !date) {
            alert('Please fill in all required fields.');
            return;
        }

        // Construct data payload
        const investmentData = {
            type,
            amount,
            category,
            date,
            notes,
        };

        // Send data to the backend
        try {
            const response = await fetch('../controller/addInvestment.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(investmentData),
            });

            const result = await response.json();
            if (result.success) {
                alert('Investment added successfully!');
                closeModal();
            } else {
                alert('Failed to save investment. Please try again.');
            }
        } catch (error) {
            console.error('Error saving investment:', error);
            alert('An error occurred. Please try again.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.getElementById('openModal');
    const closeModalButton = document.getElementById('closeModal');
    const cancelModalButton = document.getElementById('cancelModal');
    const incomeModal = document.getElementById('incomeModal');
    const saveIncomeButton = document.getElementById('saveIncome');
    const incomeForm = document.getElementById('incomeForm');

    // Open modal
    openModalButton.addEventListener('click', () => {
        incomeModal.classList.add('is-active');
        incomeModal.setAttribute('aria-hidden', 'false');
    });

    // Close modal
    const closeModal = () => {
        incomeModal.classList.remove('is-active');
        incomeModal.setAttribute('aria-hidden', 'true');
        incomeForm.reset(); // Clear input fields
    };

    closeModalButton.addEventListener('click', closeModal);
    cancelModalButton.addEventListener('click', closeModal);

    // Save income data
    saveIncomeButton.addEventListener('click', async (e) => {
        e.preventDefault();

        // Validate form inputs
        const source = document.getElementById('incomeSource').value.trim();
        const amount = parseFloat(document.getElementById('incomeAmount').value);
        const category = document.getElementById('incomeCategory').value;
        const date = document.getElementById('incomeDate').value;
        const notes = document.getElementById('incomeNotes').value.trim();

        if (!source || isNaN(amount) || !category || !date) {
            alert('Please fill in all required fields.');
            return;
        }

        // Construct data payload
        const incomeData = {
            source,
            amount,
            category,
            date,
            notes,
        };

        // Send data to the backend
        try {
            const response = await fetch('../controller/createIncome.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(incomeData),
            });

            const result = await response.json();
            if (result.success) {
                alert('Income added successfully!');
                closeModal();
            } else {
                alert('Failed to save income. Please try again.');
            }
        } catch (error) {
            console.error('Error saving income:', error);
            alert('An error occurred. Please try again.');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const openModalButton = document.getElementById('openExpenseModal');
    const closeModalButton = document.getElementById('closeExpenseModal');
    const cancelModalButton = document.getElementById('cancelExpenseModal');
    const expenseModal = document.getElementById('expenseModal');
    const saveExpenseButton = document.getElementById('saveExpense');
    const expenseForm = document.getElementById('expenseForm');

    // Open modal
    openModalButton.addEventListener('click', () => {
        expenseModal.classList.add('is-active');
        expenseModal.setAttribute('aria-hidden', 'false');
    });

    // Close modal
    const closeModal = () => {
        expenseModal.classList.remove('is-active');
        expenseModal.setAttribute('aria-hidden', 'true');
        expenseForm.reset(); // Clear input fields
    };

    closeModalButton.addEventListener('click', closeModal);
    cancelModalButton.addEventListener('click', closeModal);

    // Save expense data
    saveExpenseButton.addEventListener('click', async (e) => {
        e.preventDefault();

        // Validate form inputs
        const source = document.getElementById('expenseSource').value.trim();
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;
        const date = document.getElementById('expenseDate').value;
        const notes = document.getElementById('expenseNotes').value.trim();

        if (!source || isNaN(amount) || !category || !date) {
            alert('Please fill in all required fields.');
            return;
        }

        // Construct data payload
        const expenseData = {
            source,
            amount,
            category,
            date,
            notes,
        };

        // Send data to the backend
        try {
            const response = await fetch('../controller/createExpense.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expenseData),
            });

            const result = await response.json();
            if (result.success) {
                alert('Expense added successfully!');
                closeModal();
            } else {
                alert('Failed to save expense. Please try again.');
            }
        } catch (error) {
            console.error('Error saving expense:', error);
            alert('An error occurred. Please try again.');
        }
    });
});

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

document.addEventListener('DOMContentLoaded', () => {
    console.log('entrou')
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const toggleButton = document.getElementById('toggleButton');

    toggleButton.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        content.classList.toggle('shifted');
    });
});

let currentPage = 1;

// Function to fetch worklogs for a specific page
async function fetchWorklogs(page) {
    const response = await fetch(`http://localhost:8080/controller/readWorklogs.php?page=${page}`);
    const data = await response.json();
    console.log(data)
    // Render worklogs in the HTML
    renderWorklogs(data.worklogs);
    
    // Update pagination controls
    updatePaginationControls(data.currentPage, data.totalPages);
}

// Function to render worklogs in HTML
function renderWorklogs(worklogs) {
    const worklogList = document.getElementById('worklog-list');
    worklogList.innerHTML = '';
    worklogs.forEach(worklog => {
        const isFinished = worklog.is_finished ? ' (FINISHED)' : '';
        const titleStyle = worklog.is_finished ? 'text-decoration: line-through;' : '';

        const worklogItem = `
            <tr>
                    <td>worklog-${worklog.id}</td>
                    <td style="${titleStyle}">${worklog.title}${isFinished} (Task #${worklog.task_number})</td>
                    <td><a href="${worklog.description_link}" target="_blank" class="is-link">Link Chamado</a></td>
                    <td>${worklog.description}</td>
                    <td>${worklog.analysis}</td>
                    <td>${worklog.date_created}</td>
                    <td><button class="button is-info" onclick="showEditModal(${worklog.id})">Edit</button></td>
                    <td><button class="button is-danger" onclick="deleteWorklog(${worklog.id})">Delete</button></td>
                </tr>
        `;
        worklogList.innerHTML += worklogItem;
    });
}

// Function to update pagination controls
function updatePaginationControls(currentPage, totalPages) {
    document.getElementById('page-number').textContent = currentPage;
    document.getElementById('prev').disabled = currentPage === 1;
    document.getElementById('next').disabled = currentPage === totalPages;
}

// Event listeners for pagination buttons
document.getElementById('prev').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchWorklogs(currentPage);
    }
});

document.getElementById('next').addEventListener('click', () => {
    currentPage++;
    fetchWorklogs(currentPage);
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    fetchWorklogs(currentPage);
});
