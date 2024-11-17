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
