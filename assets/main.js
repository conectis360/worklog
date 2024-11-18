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

