// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and project cards
    const filterButtons = document.querySelectorAll('.filter-button');
    const projectCards = document.querySelectorAll('.project-card');
    
    // Add click event listeners to all filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get the filter value from data-filter attribute
            const filterValue = this.getAttribute('data-filter');
            
            // Show or hide project cards based on filter
            projectCards.forEach(card => {
                // Get the categories of the current card
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filterValue === 'all') {
                    // Show all cards if "All Projects" is selected
                    card.style.display = 'flex';
                } else if (categories.includes(filterValue)) {
                    // Show card if it has the selected category
                    card.style.display = 'flex';
                } else {
                    // Hide card if it doesn't have the selected category
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Initialize Three.js background
    initThreeJsBackground();
    
    // Initialize modal functionality
    initModal();
    
    // Initialize theme toggle
    initThemeToggle();
});

// Three.js background animation
function initThreeJsBackground() {
    const container = document.getElementById('canvas-container');
    
    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    
    // Create particles
    const particles = [];
    const particleCount = 100;
    const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0xd8b4fe });
    
    for (let i = 0; i < particleCount; i++) {
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        
        // Random position
        particle.position.x = Math.random() * 40 - 20;
        particle.position.y = Math.random() * 40 - 20;
        particle.position.z = Math.random() * 20 - 10;
        
        // Random velocity
        particle.userData = {
            velocity: {
                x: Math.random() * 0.02 - 0.01,
                y: Math.random() * 0.02 - 0.01,
                z: Math.random() * 0.02 - 0.01
            }
        };
        
        scene.add(particle);
        particles.push(particle);
    }
    
    // Position camera
    camera.position.z = 5;
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Update particle positions
        particles.forEach(particle => {
            particle.position.x += particle.userData.velocity.x;
            particle.position.y += particle.userData.velocity.y;
            particle.position.z += particle.userData.velocity.z;
            
            // Bounce particles off boundaries
            if (Math.abs(particle.position.x) > 20) {
                particle.userData.velocity.x *= -1;
            }
            if (Math.abs(particle.position.y) > 20) {
                particle.userData.velocity.y *= -1;
            }
            if (Math.abs(particle.position.z) > 10) {
                particle.userData.velocity.z *= -1;
            }
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    });
}

// Modal functionality
function initModal() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    const modalContainer = document.querySelector('.modal');
    
    // Create modal container if it doesn't exist
    if (!modalContainer) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <img class="modal-image" src="" alt="Project Image">
                <h2 class="modal-title"></h2>
                <div class="modal-meta"></div>
                <p class="modal-description"></p>
                <div class="modal-features">
                    <h3 class="modal-section-title">Key Features</h3>
                    <ul class="feature-list"></ul>
                </div>
                <div class="modal-gallery"></div>
                <div class="modal-buttons">
                    <a href="#" class="project-link github-link">View on GitHub</a>
                    <a href="#" class="project-link demo-link">Live Demo</a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    
    // Project details data
    const projectDetails = {
        project1: {
            title: "Advanced RAG System",
            image: "/api/placeholder/800/500",
            duration: "1 month (February 2025 - March 2025)",
            team: "Solo project",
            description: "This project implements a sophisticated Retrieval-Augmented Generation system that enhances Large Language Model responses with contextually relevant information from a knowledge base. The system uses semantic search with embeddings to find the most relevant documents before generating responses, significantly improving accuracy and reducing hallucinations.",
            features: [
                "Document chunking and embedding pipeline for efficient information retrieval",
                "Hybrid search combining vector similarity and keyword matching",
                "Multi-step reasoning with chain-of-thought prompting",
                "Automated evaluation framework to measure relevance and accuracy",
                "Simple API interface for easy integration with existing systems",
                "Streaming responses for better user experience"
            ],
            gallery: [
                // "/api/placeholder/400/300",
                // "/api/placeholder/400/300",
                // "/api/placeholder/400/300",
                // "/api/placeholder/400/300"
            ],
            github: "https://github.com/SiddharthCh7/LinkedIn-Post-Automation-Tool",
            demo: "https://linkedout-a6rv.onrender.com/"
        },
        project2: {
            title: "AI Resume Enhancer",
            image: "/api/placeholder/800/500",
            duration: "1 month",
            team: "Solo Project",
            description: "This is an AI-powered resume enhancer which takes a resume as input and provide improvments that can be made in the resume, along with the improved resume",
            features: [
                "AI-powered",
                "Auto-scaling compute resources based on data volume",
                "Comprehensive data quality checks and error handling",
                "Delta Lake implementation for ACID transactions on data lake",
                "Monitoring dashboard with alerting for pipeline health",
                "CI/CD integration for automated testing and deployment"
            ],
            gallery: [
                // "/api/placeholder/400/300",
                // "/api/placeholder/400/300",
                // "/api/placeholder/400/300",
                // "/api/placeholder/400/300"
            ],
            github: "https://github.com/SiddharthCh7/Resume-Enhancer",
            demo: "https://resume-enhancer-w9yb.onrender.com/"
        },
        project3: {
            title: "Hate Speech Classification",
            image: "/api/placeholder/800/500",
            duration: "1 month (December 2024)",
            team: "Solo project",
            description: "A machine learning project for classifying hate speech from text using a Random Forest Classifier (RFC). Used Polars for data processing, and various NLP techniques such as tokenization, lemmatization, and stopword removal. The pipeline was designed for efficiency, with special attention to the optimization of data handling and model performance. The entire project was developed on a AMD Ryzen 5 5500U processor, ensuring efficient processing and fast execution.",
            features: [
                "Accuracy: Achieved 83% accuracy with RandomForestClassifier.",
                "Efficiency: Leveraged Polars for data manipulation, resulting in approximately 80% faster execution compared to Pandas, especially when working with datasets of this scale.",
                "Word2Vec: Utilized Word2Vec for generating word embeddings, which allows the model to capture semantic meaning from text.",
                "Model Choice: Chose RandomForestClassifier for better performance in capturing non-linear relationships in the data.",
                "Batch Processing: Performed batch processing to preprocess the data, reducing the overhead on the CPU and improving memory efficiency.",
            ],
            gallery: [
                "../media/bpt.png",
                // "/api/placeholder/400/300",
                // "/api/placeholder/400/300",
                // "/api/placeholder/400/300"
            ],
            github: "https://github.com/SiddharthCh7/Hate-Speech-Classification-using-Polars",
            demo: "#"
        },
        // Project 4
        project4: {
            title: "Dynamic ELT Pipeline",
            image: "https://github.com/SiddharthCh7/Azure-Ipl-Pipeline/blob/collab/snapshots/Success.png",
            duration: "1 week (Mar 2025)",
            team: "Solo project",
            description: "Designed and implemented a fully dynamic data ingestion pipeline in Azure Data Factory (ADF) to automate data extraction from RESTful APIs with parameterized endpoints. Leveraged ADF's dynamic content capabilities and parameterization features to build a reusable and scalable pipeline architecture. This setup enables on-the-fly modification of API parameters—such as resource identifiers—without altering the pipeline logic or structure. Integrated Azure Key Vault for secure handling of API credentials and configured the pipeline to store raw and processed data in Azure Blob Storage. This dynamic approach significantly improved operational efficiency, reduced maintenance overhead, and enabled seamless integration of new API endpoints with minimal development effort.",
            features : [
                "Dynamic Parameterization: Implemented dynamic parameter handling in Azure Data Factory, enabling API endpoint customization without modifying pipeline logic.",
                "Scalability: Designed the pipeline to easily adapt to new data sources or endpoints, supporting seamless scaling for future API integrations.",
                "Automation: Fully automated the data extraction and ingestion workflow, minimizing manual intervention and improving overall efficiency.",
                "Secure Credential Management: Integrated Azure Key Vault to securely manage and retrieve API keys and secrets during pipeline execution.",
                "Efficient Storage: Configured the pipeline to store both raw and processed data in Azure Blob Storage, ensuring organized and cost-effective data archival.",
                "Low Maintenance: Replaced hard-coded values with dynamic expressions and parameterized datasets, reducing long-term maintenance overhead.",
                "Resilience: Added error handling and retry mechanisms within pipeline activities to ensure robust data extraction even under intermittent API failures.",
            ],            
            gallery: [
                "https://github.com/SiddharthCh7/Azure-Ipl-Pipeline/blob/collab/snapshots/source.png",
                "https://github.com/SiddharthCh7/Azure-Ipl-Pipeline/blob/collab/snapshots/sink.png",
                "https://github.com/SiddharthCh7/Azure-Ipl-Pipeline/blob/collab/snapshots/Success.png",
                "https://github.com/SiddharthCh7/Azure-Ipl-Pipeline/blob/collab/snapshots/dashboard.png"
            ],
            github: "https://github.com/SiddharthCh7/Azure-Ipl-Pipeline",
            demo: "#"
        },

        // Project 5
        project5: {
            title: "End-to-End ML Pipeline",
            image: "https://github.com/SiddharthCh7/Azure-Ipl-Pipeline/blob/collab/snapshots/Success.png",
            duration: "1 month",
            team: "Solo project",
            description: "Built a modular ELT+ML pipeline to process 1M+ text records using Azure Blob Storage, PySpark (Databricks), and Hugging Face Transformers.",
            features : [
                "Scalability: Designed with a Data Lakehouse architecture enabling scalable data ingestion, transformation, and storage using Azure Blob Storage and Databricks Spark.",
                "Multilingual Support: Supports fine-tuning Seq2Seq models like T5 and mBART, with configurations for handling multiple languages (though currently tested on a single language).",
                "Efficiency: Training scripts that are compatible with both GPU and CPU environments and use efficient libraries such as Hugging Face Datasets, Transformers, and Accelerate.",
                "Reproducibility: The entire pipeline including data ingestion, transformation, model training, and logging is encapsulated within a Docker container for portable and reproducible execution.",
                "Data Ingestion: Automated data ingestion from Hugging Face datasets API, storing raw data in Azure Blob Storage (Bronze layer) for traceability and reusability.",
                "Data Transformation: Uses PySpark on Databricks to clean, tokenize, and transform raw data, storing processed data in the Silver layer of Azure Blob Storage to ensure consistent downstream usage.",
                "Model Training: Utilizes Hugging Face's Trainer API for fine-tuning, supporting both CPU and GPU environments with flexible dataset loading.",
                "Experiment Tracking: Integrates MLflow to log parameters, metrics, and artifacts with a centralized dashboard for comparing runs and managing model versions.",
                "Containerization: Docker encapsulates the entire workflow, defining dependencies and ensuring environment portability across local, cloud, and CI/CD setups.",
            ],            
            gallery: [
                "https://github.com/SiddharthCh7/Seq2Seq-FineTuning/blob/main/media/flowchart.png",
                "https://github.com/SiddharthCh7/Seq2Seq-FineTuning/blob/main/media/Docker-container.png",
                "https://github.com/SiddharthCh7/Seq2Seq-FineTuning/blob/main/media/mlflow-model-versions.png",
                
            ],
            github: "https://github.com/SiddharthCh7/Seq2Seq-FineTuning",
            demo: "#"
        },

        // Project: 6
        project6: {
            title: "Spotify-Style Music Backend",
            image: "",  
            duration: "3 weeks",
            team: "Solo project",
            description: "A scalable Node.js backend inspired by Spotify, offering APIs for song search, playlists, secure streaming, and user management. Built for seamless integration with modern music UIs.",
            features: [
                "Scalable Architecture: Clean, modular API design using Express.js with structured routing, controllers, and middleware for maintainability.",
                "Efficient Data Layer: Uses MongoDB to store song, album, and playlist metadata, optimized for fast search and filtering.",
                "Media Storage: Stores audio files in AWS S3 for reliable and cost-efficient media delivery at scale.",
                "Secure Streaming: Generates time-limited signed URLs, preventing direct S3 access and ensuring controlled media playback.",
                "Playlist Management: Supports playlist creation, update, deletion, and track operations with proper user authorization.",
                "User Authentication: Includes JWT-based auth for secure access to protected music and playlist endpoints.",
                "Frontend Integration: Built to integrate smoothly with the React + Vite frontend UI for real-time music interactions.",
                "Deployment Ready: Supports production deployment through Docker or cloud platforms with environment-based configuration."
            ],
            gallery: [
                // "https://raw.githubusercontent.com/SiddharthCh7/Spotify-backend/main/snapshots/api-flow.png",
                // "https://raw.githubusercontent.com/SiddharthCh7/Spotify-backend/main/snapshots/s3-architecture.png",
                // "https://raw.githubusercontent.com/SiddharthCh7/Spotify-backend/main/snapshots/playlist-endpoints.png"
            ],
            github: "https://github.com/SiddharthCh7/Spotify-backend",
            demo: "https://spotify-frontend-pied.vercel.app/"
        },

    };
    
    // Get modal elements
    const modal = document.querySelector('.modal') || document.body.lastChild;
    const modalContent = modal.querySelector('.modal-content');
    const modalClose = modal.querySelector('.modal-close');
    const modalImage = modal.querySelector('.modal-image');
    const modalTitle = modal.querySelector('.modal-title');
    const modalMeta = modal.querySelector('.modal-meta');
    const modalDescription = modal.querySelector('.modal-description');
    const featureList = modal.querySelector('.feature-list');
    const modalGallery = modal.querySelector('.modal-gallery');
    const modalButtons = modal.querySelector('.modal-buttons');
    
    // Add click event to modal triggers
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get project ID from data attribute
            const projectId = this.getAttribute('data-modal');
            const project = projectDetails[projectId];
            
            if (project) {
                // Populate modal with project details
                modalImage.src = project.image;
                modalImage.alt = project.title;
                modalTitle.textContent = project.title;
                
                // Set metadata
                modalMeta.innerHTML = `
                    <div><strong>Duration:</strong> ${project.duration}</div>
                    <div><strong>Team:</strong> ${project.team}</div>
                `;
                
                modalDescription.textContent = project.description;
                
                // Clear and populate features list
                featureList.innerHTML = '';
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.className = 'feature-item';
                    li.textContent = feature;
                    featureList.appendChild(li);
                });
                
                // Clear and populate gallery
                modalGallery.innerHTML = '';
                project.gallery.forEach(image => {
                    const img = document.createElement('img');
                    img.className = 'gallery-image';
                    img.src = image;
                    img.alt = project.title + ' screenshot';
                    modalGallery.appendChild(img);
                });
                
                // Set buttons
                const githubLink = modalButtons.querySelector('.github-link');
                const demoLink = modalButtons.querySelector('.demo-link');
                githubLink.href = project.github;
                demoLink.href = project.demo;
                
                // Show modal
                modal.classList.add('active');
                
                // Prevent body scrolling
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Theme toggle functionality
function initThemeToggle() {
    // Create Batman logo toggle if it doesn't exist
    if (!document.querySelector('.batman-toggle')) {
        const batmanToggle = document.createElement('div');
        batmanToggle.className = 'batman-toggle';
        batmanToggle.innerHTML = `
            <svg class="batman-logo" viewBox="0 0 512 512">
                <path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M256,448
                     c-106.039,0-192-85.961-192-192S149.961,64,256,64s192,85.961,192,192S362.039,448,256,448z M256,112
                     c-79.529,0-144,64.471-144,144c0,24.875,6.421,48.865,18.178,70.154C116.098,312.523,66,279.342,66,279.342
                     c18.763,118.733,136.563,122.155,157.5,122.155c18.166,0,32.5-6.826,32.5-6.826s14.334,6.826,32.5,6.826
                     c20.937,0,138.737-3.422,157.5-122.155c0,0-50.098,33.181-64.178,47.233C393.579,304.864,400,280.875,400,256
                     C400,176.471,335.529,112,256,112z"/>
            </svg>
        `;
        document.body.appendChild(batmanToggle);
    }
    
    const batmanToggle = document.querySelector('.batman-toggle');
    const root = document.documentElement;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        root.classList.add('light-mode');
    }
    
    // Toggle theme on click
    batmanToggle.addEventListener('click', function() {
        root.classList.toggle('light-mode');
        
        // Save theme preference
        if (root.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
    });
}