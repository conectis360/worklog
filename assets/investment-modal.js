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
