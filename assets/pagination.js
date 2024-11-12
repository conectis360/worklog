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
    worklogList.innerHTML = ''; // Clear previous content

    worklogs.forEach(worklog => {
        const worklogItem = document.createElement('div');
        worklogItem.classList.add('box');
        worklogItem.innerHTML = `
            <h2 class="subtitle">${worklog.title} (Task #${worklog.task_number})</h2>
            <p>${worklog.description}</p>
            <p><small>${new Date(worklog.date_created).toLocaleDateString()}</small></p>
        `;
        worklogList.appendChild(worklogItem);
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
