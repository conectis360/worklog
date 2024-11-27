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
