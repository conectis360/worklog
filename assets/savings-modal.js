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
