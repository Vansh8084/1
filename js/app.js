
// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    const router = new Router();
    router.init();

    // Initialize stats
    const stats = Storage.get('stats') || {
        totalProjects: 0,
        activeTasks: 0,
        completed: 0
    };

    // Update dashboard stats
    const updateStats = () => {
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length >= 3) {
            statValues[0].textContent = stats.totalProjects;
            statValues[1].textContent = stats.activeTasks;
            statValues[2].textContent = stats.completed;
        }
    };

    // Update stats when dashboard is shown
    document.addEventListener('click', (e) => {
        if (e.target.closest('.nav-item[data-view="dashboard"]')) {
            setTimeout(updateStats, 0);
        }
    });

    // Initial stats update
    updateStats();
});
