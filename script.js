// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check for saved theme preference or use prefers-color-scheme
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('poak-theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        body.classList.add('dark-theme');
        updateThemeToggle(true);
    }
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = body.classList.toggle('dark-theme');
            localStorage.setItem('poak-theme', isDark ? 'dark' : 'light');
            updateThemeToggle(isDark);
        });
    }
    
    function updateThemeToggle(isDark) {
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', 
                isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }
    
    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger to X
            const bars = hamburger.querySelectorAll('.bar');
            if (navMenu.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                // Prevent body scroll when menu is open
                document.body.style.overflow = 'hidden';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
                document.body.style.overflow = '';
            }
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger animation
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
            document.body.style.overflow = '';
        }));
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger animation
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Animated counter for statistics
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = Math.ceil(target / 100);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = current;
            }
        }, 20);
    }
    
    function checkScroll() {
        const statsSection = document.querySelector('.stats-container');
        if (!statsSection || animated) return;
        
        const sectionPosition = statsSection.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (sectionPosition < screenPosition) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            animated = true;
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    // Initial check in case stats are already in view
    checkScroll();
    
    // Initialize programs data for POAK
    const programs = [
        "Promote gender equality and social inclusion for Kenyan women and girls",
        "Promote youth entrepreneurship and livelihood development through skills training in Kenya",
        "Design and implement capacity-building programs for Kenyan communities",
        "Support education development in Kenya, including school renovation and improvement",
        "Initiate activities that protect and promote environmental sustainability in Kenya",
        "Conduct research on poverty-related issues in Kenya and provide evidence-based consultancy",
        "Promote youth-focused poverty alleviation programs for unemployed Kenyan youth",
        "Promote HIV/AIDS awareness, prevention, and community education in Kenya",
        "Empower Kenyan women, widows, orphans, and persons with disabilities",
        "Strengthen community awareness and civic participation in Kenya",
        "Build strategic partnerships with Kenyan government, NGOs, and private sector",
        "Promote monitoring, evaluation, learning, and accountability (MELA) in Kenya programs"
    ];
    
    // Populate programs section
    const programsContainer = document.querySelector('.programs-container');
    
    if (programsContainer) {
        programs.forEach(program => {
            const programCard = document.createElement('div');
            programCard.className = 'program-card';
            programCard.innerHTML = `
                <h3>${program.substring(0, 60)}${program.length > 60 ? '...' : ''}</h3>
                <p>${program}</p>
            `;
            programsContainer.appendChild(programCard);
        });
    }
    
    // Initialize SDGs data for POAK
    const sdgs = [
        { number: 1, title: "No Poverty", description: "Directly aligns with POAK's core mission to reduce poverty in Kenya" },
        { number: 2, title: "Zero Hunger", description: "Through livelihood support and food security initiatives in Kenya" },
        { number: 3, title: "Good Health & Well-being", description: "Through HIV/AIDS awareness and health education in Kenya" },
        { number: 4, title: "Quality Education", description: "By supporting school renovations and education access in Kenya" },
        { number: 5, title: "Gender Equality", description: "Promoting equal opportunities for Kenyan women and girls" },
        { number: 8, title: "Decent Work & Economic Growth", description: "Through entrepreneurship and youth employment in Kenya" },
        { number: 10, title: "Reduced Inequalities", description: "Focusing on marginalized groups in Kenya" },
        { number: 13, title: "Climate Action", description: "Through environmental conservation in Kenyan communities" },
        { number: 17, title: "Partnerships", description: "By collaborating with Kenyan government and development partners" }
    ];
    
    // Populate SDGs section
    const sdgsContainer = document.querySelector('.sdgs-container');
    
    if (sdgsContainer) {
        sdgs.forEach(sdg => {
            const sdgCard = document.createElement('div');
            sdgCard.className = 'sdg-card';
            sdgCard.innerHTML = `
                <div class="sdg-number">${sdg.number}</div>
                <h3>${sdg.title}</h3>
                <p>${sdg.description}</p>
            `;
            sdgsContainer.appendChild(sdgCard);
        });
    }
    
    // Donation functionality for KES
    const amountOptions = document.querySelectorAll('.amount-option');
    const frequencyOptions = document.querySelectorAll('.frequency-option');
    const customAmountContainer = document.getElementById('customAmountContainer');
    const customAmountInput = document.getElementById('customAmount');
    const donateButton = document.getElementById('donateButton');
    
    let selectedAmount = 5000; // Default amount in KES
    let selectedFrequency = 'one-time';
    
    // Handle amount selection
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all amount options
            amountOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            const amount = this.getAttribute('data-amount');
            
            if (amount === 'custom') {
                customAmountContainer.style.display = 'block';
                customAmountInput.focus();
                selectedAmount = 0;
            } else {
                customAmountContainer.style.display = 'none';
                selectedAmount = parseInt(amount);
            }
        });
    });
    
    // Handle custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            selectedAmount = parseInt(this.value) || 0;
        });
    }
    
    // Handle frequency selection
    frequencyOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all frequency options
            frequencyOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            selectedFrequency = this.getAttribute('data-frequency');
        });
    });
    
    // Handle donation button click
    if (donateButton) {
        donateButton.addEventListener('click', function() {
            const donorName = document.getElementById('donorName').value;
            const donorEmail = document.getElementById('donorEmail').value;
            const donorPhone = document.getElementById('donorPhone')?.value || 'Not provided';
            
            // Validation
            if (!donorName || !donorEmail) {
                alert('Please enter your name and email address');
                return;
            }
            
            if (selectedAmount < 100) {
                alert('Please select or enter a valid donation amount (minimum KSh 100)');
                return;
            }
            
            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(donorEmail)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Format amount with commas
            const formattedAmount = selectedAmount.toLocaleString('en-KE');
            
            // Donation confirmation
            const frequencyText = selectedFrequency === 'one-time' ? 'one-time' : 
                                 selectedFrequency === 'monthly' ? 'monthly' : 'quarterly';
            
            let message = `Asante sana ${donorName}! 🙏\n\n`;
            message += `Thank you for your ${frequencyText} donation of KSh ${formattedAmount} to POAK.\n\n`;
            message += `Your support will help us fight poverty in Kenya.\n`;
            message += `A confirmation has been sent to ${donorEmail}.\n\n`;
            
            if (donorPhone !== 'Not provided') {
                message += `M-PESA confirmation will be sent to ${donorPhone}`;
            }
            
            alert(message);
            
            // Reset form
            document.getElementById('donorName').value = '';
            document.getElementById('donorEmail').value = '';
            if (document.getElementById('donorPhone')) {
                document.getElementById('donorPhone').value = '';
            }
            customAmountInput.value = '';
            customAmountContainer.style.display = 'none';
            
            // Reset to default selections
            amountOptions.forEach(opt => opt.classList.remove('active'));
            if (amountOptions[1]) amountOptions[1].classList.add('active'); // Select KSh 5,000 by default
            selectedAmount = 5000;
            
            frequencyOptions.forEach(opt => opt.classList.remove('active'));
            if (frequencyOptions[0]) frequencyOptions[0].classList.add('active'); // Select one-time by default
            selectedFrequency = 'one-time';
        });
    }
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle keyboard navigation for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger animation
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Listen for system theme changes
    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('poak-theme')) {
            if (e.matches) {
                body.classList.add('dark-theme');
                updateThemeToggle(true);
            } else {
                body.classList.remove('dark-theme');
                updateThemeToggle(false);
            }
        }
    });
    
    // Add Swahili greeting for Kenya
    console.log('Karibu POAK - Poverty Africa Kenya');
});