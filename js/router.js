
class Router {
    constructor() {
        this.currentView = 'dashboard';
        this.routes = {
            dashboard: () => this.loadTemplate('dashboard-template'),
            investment: () => this.loadTemplate('investment-template'),
            tasks: () => this.loadTemplate('tasks-template'),
            explore: () => this.loadTemplate('explore-template')
        };
    }

    init() {
        // Set up navigation event listeners
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                const view = item.dataset.view;
                this.navigate(view);
            });
        });

        // Load initial view
        this.navigate(this.currentView);
    }

    navigate(view) {
        if (this.routes[view]) {
            // Update active nav item
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.toggle('active', item.dataset.view === view);
            });

            // Load view content
            this.currentView = view;
            this.routes[view]();
        }
    }

    loadTemplate(templateId) {
        const template = document.getElementById(templateId);
        const mainContent = document.querySelector('.main-content');
        
        if (template && mainContent) {
            mainContent.innerHTML = '';
            mainContent.appendChild(template.content.cloneNode(true));
        }
    }
}
