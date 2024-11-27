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
