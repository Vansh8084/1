// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

// Main initialization function
function initApp() {
    // Initialize localStorage if needed
    initializeLocalStorage();
    
    // Set up navigation
    setupNavigation();
    
    // Load projects data
    loadProjects();
    
    // Set up dashboard
    setupDashboard();
    
    // Set up investment tab
    setupInvestmentTab();
    
    // Set up tasks tab
    setupTasksTab();
    
    // Set up midnight task reset
    setupMidnightReset();
    
    // Update all stats
    updateAllStats();
}

// Initialize localStorage with default values if needed
function initializeLocalStorage() {
    if (!localStorage.getItem('projects')) {
        // Default projects data
        const defaultProjects = [
            {
                id: 'blockmesh',
                name: 'Blockmesh',
                description: 'Decentralized mesh network protocol',
                logo: 'https://picsum.photos/200/200?random=1',
                tags: ['testnet', 'defi'],
                tge: 'Q3 2023',
                funding: '$12M',
                reward: 'Token Airdrop',
                type: 'Layer 1',
                fullDescription: 'Blockmesh is a decentralized mesh network protocol that enables secure and scalable communication between devices without relying on traditional internet infrastructure.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Discord', url: '#' }
                ],
                isHot: true
            },
            {
                id: 'taker',
                name: 'Taker',
                description: 'Decentralized order book protocol',
                logo: 'https://picsum.photos/200/200?random=2',
                tags: ['testnet', 'defi'],
                tge: 'Q4 2023',
                funding: '$8M',
                reward: 'Token Airdrop',
                type: 'DeFi',
                fullDescription: 'Taker is a decentralized order book protocol that enables high-frequency trading with low latency and high throughput on blockchain networks.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Telegram', url: '#' }
                ],
                isHot: true
            },
            {
                id: 'bless',
                name: 'Bless',
                description: 'NFT marketplace with social features',
                logo: 'https://picsum.photos/200/200?random=3',
                tags: ['nft', 'social'],
                tge: 'Q2 2023',
                funding: '$5M',
                reward: 'NFT Drop',
                type: 'NFT',
                fullDescription: 'Bless is an NFT marketplace with integrated social features that allow creators and collectors to interact and build communities around digital assets.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Discord', url: '#' }
                ],
                isHot: false
            },
            {
                id: 'cess',
                name: 'Cess',
                description: 'Decentralized cloud storage network',
                logo: 'https://picsum.photos/200/200?random=4',
                tags: ['storage', 'infrastructure'],
                tge: 'Q1 2024',
                funding: '$15M',
                reward: 'Token Airdrop',
                type: 'Infrastructure',
                fullDescription: 'Cess is a decentralized cloud storage network that provides secure, efficient, and affordable data storage solutions using blockchain technology.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Telegram', url: '#' }
                ],
                isHot: true
            },
            {
                id: 'beamable',
                name: 'Beamable',
                description: 'Gaming infrastructure for Web3',
                logo: 'https://picsum.photos/200/200?random=5',
                tags: ['gaming', 'infrastructure'],
                tge: 'Q3 2023',
                funding: '$7M',
                reward: 'Token Airdrop',
                type: 'Gaming',
                fullDescription: 'Beamable provides gaming infrastructure for Web3 developers, enabling them to build and deploy blockchain-based games with ease.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Discord', url: '#' }
                ],
                isHot: false
            },
            {
                id: 'pod',
                name: 'P.o.d',
                description: 'Proof of Donation protocol',
                logo: 'https://picsum.photos/200/200?random=6',
                tags: ['defi', 'charity'],
                tge: 'Q4 2023',
                funding: '$3M',
                reward: 'Token Airdrop',
                type: 'DeFi',
                fullDescription: 'P.o.d is a Proof of Donation protocol that enables transparent and verifiable charitable donations using blockchain technology.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Telegram', url: '#' }
                ],
                isHot: false
            },
            {
                id: 'ofc',
                name: 'OFC',
                description: 'On-chain financial contracts',
                logo: 'https://picsum.photos/200/200?random=7',
                tags: ['defi', 'derivatives'],
                tge: 'Q2 2024',
                funding: '$10M',
                reward: 'Token Airdrop',
                type: 'DeFi',
                fullDescription: 'OFC provides on-chain financial contracts and derivatives that enable sophisticated trading strategies on blockchain networks.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Discord', url: '#' }
                ],
                isHot: true
            },
            {
                id: 'newton',
                name: 'Newton',
                description: 'AI-powered trading protocol',
                logo: 'https://picsum.photos/200/200?random=8',
                tags: ['ai', 'defi'],
                tge: 'Q1 2024',
                funding: '$20M',
                reward: 'Token Airdrop',
                type: 'AI',
                fullDescription: 'Newton is an AI-powered trading protocol that uses machine learning algorithms to optimize trading strategies on decentralized exchanges.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Telegram', url: '#' }
                ],
                isHot: true
            },
            {
                id: 'billions',
                name: 'Billions',
                description: 'Decentralized asset management',
                logo: 'https://picsum.photos/200/200?random=9',
                tags: ['defi', 'asset-management'],
                tge: 'Q3 2023',
                funding: '$25M',
                reward: 'Token Airdrop',
                type: 'DeFi',
                fullDescription: 'Billions is a decentralized asset management platform that enables users to create, manage, and invest in on-chain investment funds.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Discord', url: '#' }
                ],
                isHot: false
            },
            {
                id: 'monad-score',
                name: 'Monad Score',
                description: 'On-chain credit scoring',
                logo: 'https://picsum.photos/200/200?random=10',
                tags: ['defi', 'credit'],
                tge: 'Q4 2023',
                funding: '$6M',
                reward: 'Token Airdrop',
                type: 'DeFi',
                fullDescription: 'Monad Score provides on-chain credit scoring and reputation systems that enable undercollateralized lending in DeFi protocols.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Telegram', url: '#' }
                ],
                isHot: true
            },
            {
                id: 'malda',
                name: 'Malda',
                description: 'Cross-chain messaging protocol [soon]',
                logo: 'https://picsum.photos/200/200?random=11',
                tags: ['infrastructure', 'interoperability'],
                tge: 'Q2 2024',
                funding: '$18M',
                reward: 'Token Airdrop',
                type: 'Infrastructure',
                fullDescription: 'Malda is a cross-chain messaging protocol that enables secure and efficient communication between different blockchain networks.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Discord', url: '#' }
                ],
                isHot: true
            },
            {
                id: 'recall',
                name: 'Recall',
                description: 'Decentralized data indexing',
                logo: 'https://picsum.photos/200/200?random=12',
                tags: ['infrastructure', 'data'],
                tge: 'Q1 2024',
                funding: '$9M',
                reward: 'Token Airdrop',
                type: 'Infrastructure',
                fullDescription: 'Recall provides decentralized data indexing services that make blockchain data more accessible and queryable for developers and users.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Telegram', url: '#' }
                ],
                isHot: false
            },
            {
                id: 'ari-chan-wallet',
                name: 'Ari Chan Wallet',
                description: 'Smart contract wallet with social recovery',
                logo: 'https://picsum.photos/200/200?random=13',
                tags: ['wallet', 'security'],
                tge: 'Q3 2023',
                funding: '$4M',
                reward: 'Token Airdrop',
                type: 'Wallet',
                fullDescription: 'Ari Chan Wallet is a smart contract wallet with social recovery features that make it easier and safer for users to manage their crypto assets. Referral code: 67ea953c38d2f',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Discord', url: '#' }
                ],
                isHot: false
            },
            {
                id: 'exabits',
                name: 'Exabits',
                description: 'Decentralized compute marketplace',
                logo: 'https://picsum.photos/200/200?random=14',
                tags: ['infrastructure', 'compute'],
                tge: 'Q2 2024',
                funding: '$22M',
                reward: 'Token Airdrop',
                type: 'Infrastructure',
                fullDescription: 'Exabits is a decentralized compute marketplace that enables users to buy and sell computing resources in a peer-to-peer network. Available on Zelay and Galxe.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Telegram', url: '#' }
                ],
                isHot: true
            },
            {
                id: 'grass',
                name: 'Grass',
                description: 'Decentralized social graph protocol',
                logo: 'https://picsum.photos/200/200?random=15',
                tags: ['social', 'infrastructure'],
                tge: 'Q4 2023',
                funding: '$7M',
                reward: 'Token Airdrop',
                type: 'Social',
                fullDescription: 'Grass is a decentralized social graph protocol that enables developers to build social applications with user-owned data and relationships.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Discord', url: '#' }
                ],
                isHot: false
            },
            {
                id: 'coresky',
                name: 'Coresky',
                description: 'Modular blockchain framework',
                logo: 'https://picsum.photos/200/200?random=16',
                tags: ['infrastructure', 'layer1'],
                tge: 'Q1 2024',
                funding: '$30M',
                reward: 'Token Airdrop',
                type: 'Layer 1',
                fullDescription: 'Coresky is a modular blockchain framework that enables developers to build custom blockchain solutions with specific features and capabilities.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Telegram', url: '#' }
                ],
                isHot: true
            },
            {
                id: 'interlink',
                name: 'Interlink',
                description: 'Cross-chain liquidity protocol',
                logo: 'https://picsum.photos/200/200?random=17',
                tags: ['defi', 'interoperability'],
                tge: 'Q3 2023',
                funding: '$15M',
                reward: 'Token Airdrop',
                type: 'DeFi',
                fullDescription: 'Interlink is a cross-chain liquidity protocol that enables seamless movement of assets between different blockchain networks with minimal slippage.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Discord', url: '#' }
                ],
                isHot: false
            },
            {
                id: 'eth-block-scout',
                name: 'ETH Block Scout',
                description: 'Ethereum block explorer with analytics',
                logo: 'https://picsum.photos/200/200?random=18',
                tags: ['infrastructure', 'analytics'],
                tge: 'Q4 2023',
                funding: '$5M',
                reward: 'Token Airdrop',
                type: 'Infrastructure',
                fullDescription: 'ETH Block Scout is an Ethereum block explorer with advanced analytics features that provide insights into on-chain activity and trends.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Telegram', url: '#' }
                ],
                isHot: false
            },
            {
                id: 'haust',
                name: 'Haust',
                description: 'Decentralized identity protocol',
                logo: 'https://picsum.photos/200/200?random=19',
                tags: ['identity', 'infrastructure'],
                tge: 'Q2 2024',
                funding: '$12M',
                reward: 'Token Airdrop',
                type: 'Identity',
                fullDescription: 'Haust is a decentralized identity protocol that enables users to create, manage, and control their digital identities across different applications and platforms.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Discord', url: '#' }
                ],
                isHot: true
            },
            {
                id: '3dos',
                name: '3DOS',
                description: 'Decentralized operating system',
                logo: 'https://picsum.photos/200/200?random=20',
                tags: ['infrastructure', 'os'],
                tge: 'Q1 2024',
                funding: '$25M',
                reward: 'Token Airdrop',
                type: 'Infrastructure',
                fullDescription: '3DOS is a decentralized operating system that enables users to run applications in a secure, private, and censorship-resistant environment. May not work on mobile.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Telegram', url: '#' }
                ],
                isHot: true
            },
            {
                id: 'dvin',
                name: 'Dvin',
                description: 'Zero-knowledge proof platform',
                logo: 'https://picsum.photos/200/200?random=21',
                tags: ['privacy', 'infrastructure'],
                tge: 'Q3 2023',
                funding: '$18M',
                reward: 'Token Airdrop',
                type: 'Privacy',
                fullDescription: 'Dvin is a zero-knowledge proof platform that enables developers to build privacy-preserving applications and services on blockchain networks.',
                socialLinks: [
                    { name: 'Website', url: '#' },
                    { name: 'Twitter', url: '#' },
                    { name: 'Discord', url: '#' }
                ],
                isHot: false
            }
        ];
        
        localStorage.setItem('projects', JSON.stringify(defaultProjects));
    }
    
    if (!localStorage.getItem('myProjects')) {
        localStorage.setItem('myProjects', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('favoriteProjects')) {
        localStorage.setItem('favoriteProjects', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('tasks')) {
        localStorage.setItem('tasks', JSON.stringify({}));
    }
    
    if (!localStorage.getItem('investments')) {
        localStorage.setItem('investments', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('earnings')) {
        localStorage.setItem('earnings', JSON.stringify([]));
    }
}

// Set up navigation between tabs
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            
            // Remove active class from all nav items and tab contents
            navItems.forEach(navItem => navItem.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding tab content
            item.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Set up back button for project details
    document.getElementById('back-to-explore').addEventListener('click', () => {
        document.getElementById('project-details').classList.remove('active');
        document.getElementById('explore').classList.add('active');
    });
}

// Load projects data and render in explore tab
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const exploreContainer = document.getElementById('explore-projects');
    
    // Clear container
    exploreContainer.innerHTML = '';
    
    // Render each project
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'explore-card';
        projectCard.innerHTML = `
            <img src="${project.logo}" alt="${project.name}" class="explore-logo">
            <h3 class="explore-name">${project.name}</h3>
            <p class="explore-desc">${project.description}</p>
            <div class="explore-tags">
                ${project.tags.map(tag => `<span class="explore-tag">${tag}</span>`).join('')}
            </div>
            <button class="explore-social" data-project-id="${project.id}">View Details</button>
        `;
        
        exploreContainer.appendChild(projectCard);
        
        // Add click event to view details button
        projectCard.querySelector('.explore-social').addEventListener('click', () => {
            showProjectDetails(project.id);
        });
    });
    
    // Load projects for dashboard
    loadDashboardProjects();
    
    // Load projects for investment/earning forms
    loadProjectsForForms();
}

// Show project details
function showProjectDetails(projectId) {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const myProjects = JSON.parse(localStorage.getItem('myProjects'));
    const favoriteProjects = JSON.parse(localStorage.getItem('favoriteProjects'));
    
    const project = projects.find(p => p.id === projectId);
    
    if (!project) return;
    
    const isJoined = myProjects.includes(projectId);
    const isFavorite = favoriteProjects.includes(projectId);
    
    const detailContent = document.getElementById('project-detail-content');
    
    detailContent.innerHTML = `
        <div class="project-header">
            <img src="${project.logo}" alt="${project.name}" class="project-header-logo">
            <div class="project-header-info">
                <h2 class="project-header-name">${project.name}</h2>
                <p class="project-header-desc">${project.description}</p>
            </div>
        </div>
        
        <div class="project-info-grid">
            <div class="project-info-item">
                <p class="project-info-label">TGE</p>
                <p class="project-info-value">${project.tge}</p>
            </div>
            <div class="project-info-item">
                <p class="project-info-label">Funding</p>
                <p class="project-info-value">${project.funding}</p>
            </div>
            <div class="project-info-item">
                <p class="project-info-label">Reward</p>
                <p class="project-info-value">${project.reward}</p>
            </div>
            <div class="project-info-item">
                <p class="project-info-label">Type</p>
                <p class="project-info-value">${project.type}</p>
            </div>
        </div>
        
        <div class="project-description">
            <h3>Description</h3>
            <p>${project.fullDescription}</p>
        </div>
        
        <div class="project-social">
            <h3>Social Links</h3>
            <div class="social-links">
                ${project.socialLinks.map(link => `
                    <a href="${link.url}" class="social-link" target="_blank">
                        <span>${link.name}</span>
                    </a>
                `).join('')}
            </div>
        </div>
        
        <div class="project-actions">
            <button class="project-action-btn favorite" data-project-id="${project.id}">
                ${isFavorite ? 'Remove Favorite' : 'Add to Favorite'}
            </button>
            <button class="project-action-btn" data-project-id="${project.id}">
                ${isJoined ? 'Remove from My Projects' : 'Add to My Projects'}
            </button>
            <a href="#" class="project-action-btn join" target="_blank">Join</a>
        </div>
    `;
    
    // Add event listeners for action buttons
    const favoriteBtn = detailContent.querySelector('.project-action-btn.favorite');
    const joinProjectBtn = detailContent.querySelector('.project-action-btn:not(.favorite):not(.join)');
    
    favoriteBtn.addEventListener('click', () => {
        toggleFavoriteProject(projectId);
        showProjectDetails(projectId); // Refresh the details view
    });
    
    joinProjectBtn.addEventListener('click', () => {
        toggleJoinProject(projectId);
        showProjectDetails(projectId); // Refresh the details view
    });
    
    // Show the project details tab
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.getElementById('project-details').classList.add('active');
}

// Toggle favorite project
function toggleFavoriteProject(projectId) {
    const favoriteProjects = JSON.parse(localStorage.getItem('favoriteProjects'));
    
    if (favoriteProjects.includes(projectId)) {
        // Remove from favorites
        const updatedFavorites = favoriteProjects.filter(id => id !== projectId);
        localStorage.setItem('favoriteProjects', JSON.stringify(updatedFavorites));
    } else {
        // Add to favorites
        favoriteProjects.push(projectId);
        localStorage.setItem('favoriteProjects', JSON.stringify(favoriteProjects));
    }
}

// Toggle join project
function toggleJoinProject(projectId) {
    const myProjects = JSON.parse(localStorage.getItem('myProjects'));
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    
    if (myProjects.includes(projectId)) {
        // Remove from my projects
        const updatedProjects = myProjects.filter(id => id !== projectId);
        localStorage.setItem('myProjects', JSON.stringify(updatedProjects));
        
        // Remove tasks for this project
        delete tasks[projectId];
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        // Add to my projects
        myProjects.push(projectId);
        localStorage.setItem('myProjects', JSON.stringify(myProjects));
        
        // Initialize tasks for this project
        if (!tasks[projectId]) {
            tasks[projectId] = [];
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
    
    // Update dashboard and tasks
    loadDashboardProjects();
    setupTasksTab();
    updateAllStats();
}

// Set up dashboard
function setupDashboard() {
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    const projectContainers = document.querySelectorAll('.projects-container');
    
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and containers
            toggleBtns.forEach(b => b.classList.remove('active'));
            projectContainers.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding container
            btn.classList.add('active');
            
            if (btn.id === 'my-projects-btn') {
                document.getElementById('my-projects-container').classList.add('active');
            } else if (btn.id === 'hot-projects-btn') {
                document.getElementById('hot-projects-container').classList.add('active');
            } else if (btn.id === 'all-projects-btn') {
                document.getElementById('all-projects-container').classList.add('active');
            }
        });
    });
    
    // Load projects for dashboard
    loadDashboardProjects();
}

// Load projects for dashboard
function loadDashboardProjects() {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const myProjects = JSON.parse(localStorage.getItem('myProjects'));
    
    const myProjectsContainer = document.getElementById('my-projects-container');
    const hotProjectsContainer = document.getElementById('hot-projects-container');
    const allProjectsContainer = document.getElementById('all-projects-container');
    
    // Clear containers
    myProjectsContainer.innerHTML = '';
    hotProjectsContainer.innerHTML = '';
    allProjectsContainer.innerHTML = '';
    
    // Check if there are any joined projects
    if (myProjects.length === 0) {
        myProjectsContainer.innerHTML = `
            <div class="empty-state">
                <p>No projects joined yet. Explore projects to join!</p>
            </div>
        `;
    } else {
        // Render my projects
        myProjects.forEach(projectId => {
            const project = projects.find(p => p.id === projectId);
            if (project) {
                const projectCard = createProjectCard(project, true);
                myProjectsContainer.appendChild(projectCard);
            }
        });
    }
    
    // Render hot projects
    const hotProjects = projects.filter(p => p.isHot);
    hotProjects.forEach(project => {
        const projectCard = createProjectCard(project, myProjects.includes(project.id));
        hotProjectsContainer.appendChild(projectCard);
    });
    
    // Render all projects
    projects.forEach(project => {
        const projectCard = createProjectCard(project, myProjects.includes(project.id));
        allProjectsContainer.appendChild(projectCard);
    });
    
    // Update project stats
    updateProjectStats();
}

// Create project card for dashboard
function createProjectCard(project, isJoined) {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
    projectCard.innerHTML = `
        <img src="${project.logo}" alt="${project.name}" class="project-logo">
        <div class="project-info">
            <h3 class="project-name">${project.name}</h3>
            <p class="project-stats">${project.type} • ${project.tge}</p>
        </div>
        ${isJoined ? '<span class="project-tag">Joined</span>' : ''}
    `;
    
    // Add click event to view details
    projectCard.addEventListener('click', () => {
        showProjectDetails(project.id);
    });
    
    return projectCard;
}

// Set up investment tab
function setupInvestmentTab() {
    // Set up modal triggers
    const addInvestmentBtn = document.getElementById('add-investment-btn');
    const addEarningBtn = document.getElementById('add-earning-btn');
    const investmentModal = document.getElementById('investment-modal');
    const earningModal = document.getElementById('earning-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    
    addInvestmentBtn.addEventListener('click', () => {
        investmentModal.style.display = 'flex';
        document.getElementById('investment-date').valueAsDate = new Date();
    });
    
    addEarningBtn.addEventListener('click', () => {
        earningModal.style.display = 'flex';
        document.getElementById('earning-date').valueAsDate = new Date();
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            investmentModal.style.display = 'none';
            earningModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === investmentModal) {
            investmentModal.style.display = 'none';
        }
        if (e.target === earningModal) {
            earningModal.style.display = 'none';
        }
    });
    
    // Set up form submissions
    const investmentForm = document.getElementById('investment-form');
    const earningForm = document.getElementById('earning-form');
    
    investmentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addInvestment();
    });
    
    earningForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addEarning();
    });
    
    // Set up custom project fields toggle
    const investmentProject = document.getElementById('investment-project');
    const customProjectFields = document.getElementById('custom-project-fields');
    
    investmentProject.addEventListener('change', () => {
        if (investmentProject.value === 'custom') {
            customProjectFields.style.display = 'block';
        } else {
            customProjectFields.style.display = 'none';
        }
    });
    
    const earningProject = document.getElementById('earning-project');
    const customEarningFields = document.getElementById('custom-earning-fields');
    
    earningProject.addEventListener('change', () => {
        if (earningProject.value === 'custom') {
            customEarningFields.style.display = 'block';
        } else {
            customEarningFields.style.display = 'none';
        }
    });
    
    // Load finance history
    loadFinanceHistory();
}

// Load projects for investment/earning forms
function loadProjectsForForms() {
    const projects = JSON.parse(localStorage.getItem('projects'));
    const investmentProject = document.getElementById('investment-project');
    const earningProject = document.getElementById('earning-project');
    
    // Clear existing options except the first one (Custom Project)
    while (investmentProject.options.length > 1) {
        investmentProject.remove(1);
    }
    
    while (earningProject.options.length > 1) {
        earningProject.remove(1);
    }
    
    // Add project options
    projects.forEach(project => {
        const investmentOption = document.createElement('option');
        investmentOption.value = project.id;
        investmentOption.textContent = project.name;
        investmentProject.appendChild(investmentOption);
        
        const earningOption = document.createElement('option');
        earningOption.value = project.id;
        earningOption.textContent = project.name;
        earningProject.appendChild(earningOption);
    });
}

// Add investment
function addInvestment() {
    const investments = JSON.parse(localStorage.getItem('investments'));
    const projects = JSON.parse(localStorage.getItem('projects'));
    
    const projectSelect = document.getElementById('investment-project');
    const amountInput = document.getElementById('investment-amount');
    const dateInput = document.getElementById('investment-date');
    const notesInput = document.getElementById('investment-notes');
    
    let projectId = projectSelect.value;
    let projectName = '';
    let projectLogo = '';
    
    if (projectId === 'custom') {
        // Custom project
        projectName = document.getElementById('custom-project-name').value;
        projectLogo = document.getElementById('custom-project-image').value;
        
        if (!projectName) {
            alert('Please enter a project name');
            return;
        }
        
        if (!projectLogo) {
            projectLogo = 'https://picsum.photos/200/200?random=' + Math.floor(Math.random() * 100);
        }
    } else {
        // Existing project
        const project = projects.find(p => p.id === projectId);
        projectName = project.name;
        projectLogo = project.logo;
    }
    
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    const notes = notesInput.value;
    
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    if (!date) {
        alert('Please select a date');
        return;
    }
    
    // Create new investment
    const newInvestment = {
        id: Date.now().toString(),
        projectId,
        projectName,
        projectLogo,
        amount,
        date,
        notes,
        timestamp: new Date().toISOString()
    };
    
    // Add to investments
    investments.push(newInvestment);
    localStorage.setItem('investments', JSON.stringify(investments));
    
    // Reset form
    document.getElementById('investment-form').reset();
    document.getElementById('custom-project-fields').style.display = 'none';
    
    // Close modal
    document.getElementById('investment-modal').style.display = 'none';
    
    // Reload finance history
    loadFinanceHistory();
    
    // Update stats
    updateFinanceStats();
    updateAllStats();
}

// Add earning
function addEarning() {
    const earnings = JSON.parse(localStorage.getItem('earnings'));
    const projects = JSON.parse(localStorage.getItem('projects'));
    
    const projectSelect = document.getElementById('earning-project');
    const amountInput = document.getElementById('earning-amount');
    const dateInput = document.getElementById('earning-date');
    const notesInput = document.getElementById('earning-notes');
    
    let projectId = projectSelect.value;
    let projectName = '';
    let projectLogo = '';
    
    if (projectId === 'custom') {
        // Custom project
        projectName = document.getElementById('custom-earning-name').value;
        projectLogo = document.getElementById('custom-earning-image').value;
        
        if (!projectName) {
            alert('Please enter a project name');
            return;
        }
        
        if (!projectLogo) {
            projectLogo = 'https://picsum.photos/200/200?random=' + Math.floor(Math.random() * 100);
        }
    } else {
        // Existing project
        const project = projects.find(p => p.id === projectId);
        projectName = project.name;
        projectLogo = project.logo;
    }
    
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;
    const notes = notesInput.value;
    
    if (!amount || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    
    if (!date) {
        alert('Please select a date');
        return;
    }
    
    // Create new earning
    const newEarning = {
        id: Date.now().toString(),
        projectId,
        projectName,
        projectLogo,
        amount,
        date,
        notes,
        timestamp: new Date().toISOString()
    };
    
    // Add to earnings
    earnings.push(newEarning);
    localStorage.setItem('earnings', JSON.stringify(earnings));
    
    // Reset form
    document.getElementById('earning-form').reset();
    document.getElementById('custom-earning-fields').style.display = 'none';
    
    // Close modal
    document.getElementById('earning-modal').style.display = 'none';
    
    // Reload finance history
    loadFinanceHistory();
    
    // Update stats
    updateFinanceStats();
    updateAllStats();
}

// Load finance history
function loadFinanceHistory() {
    const investments = JSON.parse(localStorage.getItem('investments'));
    const earnings = JSON.parse(localStorage.getItem('earnings'));
    const historyContainer = document.getElementById('finance-history');
    
    // Combine investments and earnings
    const history = [
        ...investments.map(item => ({ ...item, type: 'investment' })),
        ...earnings.map(item => ({ ...item, type: 'earning' }))
    ];
    
    // Sort by timestamp (newest first)
    history.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    
    // Clear container
    historyContainer.innerHTML = '';
    
    // Check if there are any transactions
    if (history.length === 0) {
        historyContainer.innerHTML = `
            <div class="empty-state">
                <p>No transactions yet. Add your first investment or earning!</p>
            </div>
        `;
        return;
    }
    
    // Render each history entry
    history.forEach(entry => {
        const historyEntry = document.createElement('div');
        historyEntry.className = 'history-entry';
        historyEntry.dataset.id = entry.id;
        historyEntry.dataset.type = entry.type;
        
        historyEntry.innerHTML = `
            <img src="${entry.projectLogo}" alt="${entry.projectName}" class="history-project-logo">
            <div class="history-details">
                <div class="history-project">${entry.projectName}</div>
                <div class="history-date">${formatDate(entry.date)}</div>
            </div>
            <div class="history-amount ${entry.type}">
                ${entry.type === 'investment' ? '-' : '+'}$${entry.amount.toFixed(2)}
            </div>
            <div class="history-actions">
                <button class="delete-btn" data-id="${entry.id}" data-type="${entry.type}">🗑️</button>
            </div>
        `;
        
        historyContainer.appendChild(historyEntry);
        
        // Add click event to delete button
        historyEntry.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteFinanceEntry(entry.id, entry.type);
        });
        
        // Add click event to show details
        historyEntry.addEventListener('click', () => {
            alert(`${entry.projectName}\nAmount: $${entry.amount.toFixed(2)}\nDate: ${formatDate(entry.date)}\nNotes: ${entry.notes || 'None'}`);
        });
    });
}

// Delete finance entry
function deleteFinanceEntry(id, type) {
    if (confirm('Are you sure you want to delete this entry?')) {
        if (type === 'investment') {
            const investments = JSON.parse(localStorage.getItem('investments'));
            const updatedInvestments = investments.filter(item => item.id !== id);
            localStorage.setItem('investments', JSON.stringify(updatedInvestments));
        } else if (type === 'earning') {
            const earnings = JSON.parse(localStorage.getItem('earnings'));
            const updatedEarnings = earnings.filter(item => item.id !== id);
            localStorage.setItem('earnings', JSON.stringify(updatedEarnings));
        }
        
        // Reload finance history
        loadFinanceHistory();
        
        // Update stats
        updateFinanceStats();
        updateAllStats();
    }
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

// Set up tasks tab
function setupTasksTab() {
    const tasksContainer = document.getElementById('tasks-container');
    const myProjects = JSON.parse(localStorage.getItem('myProjects'));
    const projects = JSON.parse(localStorage.getItem('projects'));
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    
    // Clear container
    tasksContainer.innerHTML = '';
    
    // Check if there are any joined projects
    if (myProjects.length === 0) {
        tasksContainer.innerHTML = `
            <div class="empty-state">
                <p>No projects joined yet. Join projects to add tasks!</p>
            </div>
        `;
        return;
    }
    
    // Render tasks for each project
    myProjects.forEach(projectId => {
        const project = projects.find(p => p.id === projectId);
        if (!project) return;
        
        const projectTasks = tasks[projectId] || [];
        const completedTasks = projectTasks.filter(task => task.completed).length;
        const progress = projectTasks.length > 0 ? (completedTasks / projectTasks.length) * 100 : 0;
        
        const projectTasksElement = document.createElement('div');
        projectTasksElement.className = 'project-tasks';
        projectTasksElement.innerHTML = `
            <div class="project-tasks-header">
                <img src="${project.logo}" alt="${project.name}" class="project-tasks-logo">
                <div class="project-tasks-info">
                    <div class="project-tasks-name">${project.name}</div>
                    <div class="project-tasks-progress">
                        <div class="project-tasks-progress-bar" style="width: ${progress}%"></div>
                    </div>
                </div>
            </div>
            <div class="task-list" id="task-list-${projectId}">
                ${projectTasks.map((task, index) => `
                    <div class="task-item" data-index="${index}">
                        <div class="task-checkbox ${task.completed ? 'checked' : ''}" data-project-id="${projectId}" data-index="${index}"></div>
                        <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
                        <button class="task-delete" data-project-id="${projectId}" data-index="${index}">×</button>
                    </div>
                `).join('')}
            </div>
            <form class="add-task-form" data-project-id="${projectId}">
                <input type="text" class="add-task-input" placeholder="Add a new task...">
                <button type="submit" class="add-task-btn">Add</button>
            </form>
        `;
        
        tasksContainer.appendChild(projectTasksElement);
        
        // Add event listeners for task checkboxes
        const checkboxes = projectTasksElement.querySelectorAll('.task-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('click', () => {
                const projectId = checkbox.getAttribute('data-project-id');
                const index = parseInt(checkbox.getAttribute('data-index'));
                toggleTaskCompletion(projectId, index);
            });
        });
        
        // Add event listeners for task delete buttons
        const deleteButtons = projectTasksElement.querySelectorAll('.task-delete');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectId = button.getAttribute('data-project-id');
                const index = parseInt(button.getAttribute('data-index'));
                deleteTask(projectId, index);
            });
        });
        
        // Add event listener for add task form
        const addTaskForm = projectTasksElement.querySelector('.add-task-form');
        addTaskForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const projectId = addTaskForm.getAttribute('data-project-id');
            const input = addTaskForm.querySelector('.add-task-input');
            const taskText = input.value.trim();
            
            if (taskText) {
                addTask(projectId, taskText);
                input.value = '';
            }
        });
    });
    
    // Update task stats
    updateTaskStats();
}

// Add task
function addTask(projectId, text) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    
    if (!tasks[projectId]) {
        tasks[projectId] = [];
    }
    
    tasks[projectId].push({
        text,
        completed: false,
        createdAt: new Date().toISOString()
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Reload tasks
    setupTasksTab();
    
    // Update stats
    updateTaskStats();
    updateAllStats();
}

// Toggle task completion
function toggleTaskCompletion(projectId, index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    
    if (tasks[projectId] && tasks[projectId][index]) {
        tasks[projectId][index].completed = !tasks[projectId][index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        // Reload tasks
        setupTasksTab();
        
        // Update stats
        updateTaskStats();
        updateAllStats();
    }
}

// Delete task
function deleteTask(projectId, index) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    
    if (tasks[projectId] && tasks[projectId][index]) {
        tasks[projectId].splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        // Reload tasks
        setupTasksTab();
        
        // Update stats
        updateTaskStats();
        updateAllStats();
    }
}

// Update task stats
function updateTaskStats() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    let totalTasks = 0;
    let completedTasks = 0;
    
    // Count total and completed tasks
    Object.values(tasks).forEach(projectTasks => {
        totalTasks += projectTasks.length;
        completedTasks += projectTasks.filter(task => task.completed).length;
    });
    
    // Update task stats in tasks tab
    document.getElementById('total-tasks-count').textContent = totalTasks;
    document.getElementById('completed-tasks-count').textContent = completedTasks;
    
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    document.getElementById('task-completion-rate').textContent = `${completionRate}%`;
    
    // Update task stats in dashboard
    document.getElementById('task-stats').textContent = `${completedTasks}/${totalTasks}`;
}

// Update project stats
function updateProjectStats() {
    const myProjects = JSON.parse(localStorage.getItem('myProjects'));
    const projects = JSON.parse(localStorage.getItem('projects'));
    
    document.getElementById('project-stats').textContent = `${myProjects.length}/${projects.length}`;
}

// Update finance stats
function updateFinanceStats() {
    const investments = JSON.parse(localStorage.getItem('investments'));
    const earnings = JSON.parse(localStorage.getItem('earnings'));
    
    // Calculate total investment
    const totalInvestment = investments.reduce((total, investment) => total + investment.amount, 0);
    
    // Calculate total earnings
    const totalEarnings = earnings.reduce((total, earning) => total + earning.amount, 0);
    
    // Calculate ROI
    const roi = totalInvestment > 0 ? ((totalEarnings / totalInvestment) * 100).toFixed(2) : 0;
    
    // Calculate monthly earnings
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const monthlyEarnings = earnings
        .filter(earning => {
            const earningDate = new Date(earning.date);
            return earningDate.getMonth() === currentMonth && earningDate.getFullYear() === currentYear;
        })
        .reduce((total, earning) => total + earning.amount, 0);
    
    // Update finance stats in investment tab
    document.getElementById('roi-value').textContent = `${roi}%`;
    document.getElementById('monthly-earnings').textContent = `$${monthlyEarnings.toFixed(2)}`;
    document.getElementById('inv-total-investment').textContent = `$${totalInvestment.toFixed(2)}`;
    document.getElementById('inv-total-earnings').textContent = `$${totalEarnings.toFixed(2)}`;
    
    // Update finance stats in dashboard
    document.getElementById('total-investment').textContent = `$${totalInvestment.toFixed(2)}`;
    document.getElementById('total-earnings').textContent = `$${totalEarnings.toFixed(2)}`;
}

// Update all stats
function updateAllStats() {
    updateProjectStats();
    updateTaskStats();
    updateFinanceStats();
}

// Set up midnight task reset
function setupMidnightReset() {
    // Calculate time until midnight
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const timeUntilMidnight = midnight - now;
    
    // Set timeout for midnight reset
    setTimeout(() => {
        resetDailyTasks();
        // Set up next day's reset
        setInterval(resetDailyTasks, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
}

// Reset daily tasks
function resetDailyTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    
    // Reset all tasks to uncompleted
    Object.keys(tasks).forEach(projectId => {
        tasks[projectId].forEach(task => {
            task.completed = false;
        });
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    // Reload tasks if the tasks tab is active
    if (document.getElementById('tasks').classList.contains('active')) {
        setupTasksTab();
    }
    
    // Update stats
    updateTaskStats();
    updateAllStats();
              }
