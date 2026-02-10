// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear();

  // Theme Toggle Functionality
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Check for saved theme preference or use prefers-color-scheme
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
    body.classList.add("dark-theme");
    updateThemeToggle(true);
  }

  // Theme toggle event listener
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = body.classList.toggle("dark-theme");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      updateThemeToggle(isDark);
    });
  }

  function updateThemeToggle(isDark) {
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light mode" : "Switch to dark mode",
      );
    }
  }

  // Hamburger menu toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");

      // Animate hamburger to X
      const bars = hamburger.querySelectorAll(".bar");
      if (navMenu.classList.contains("active")) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
      } else {
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll(".nav-menu a").forEach((n) =>
      n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");

        // Reset hamburger animation
        const bars = hamburger.querySelectorAll(".bar");
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }),
    );

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (
        !navMenu.contains(e.target) &&
        !hamburger.contains(e.target) &&
        navMenu.classList.contains("active")
      ) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");

        // Reset hamburger animation
        const bars = hamburger.querySelectorAll(".bar");
        bars[0].style.transform = "none";
        bars[1].style.opacity = "1";
        bars[2].style.transform = "none";
      }
    });
  }

  // Animated counter for statistics
  const statNumbers = document.querySelectorAll(".stat-number");
  let animated = false;

  function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 20);
  }

  function checkScroll() {
    const statsSection = document.querySelector(".stats-container");
    if (!statsSection || animated) return;

    const sectionPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (sectionPosition < screenPosition) {
      statNumbers.forEach((stat) => {
        const target = parseInt(stat.getAttribute("data-target"));
        animateCounter(stat, target);
      });
      animated = true;
    }
  }

  window.addEventListener("scroll", checkScroll);
  // Initial check in case stats are already in view
  checkScroll();

  // Initialize programs data
  const programs = [
    "Promote gender equality and social inclusion in all development initiatives",
    "Promote entrepreneurship and livelihood development through skills training",
    "Design and implement capacity-building programs for sustainable development",
    "Support education development, including school renovation and improvement",
    "Initiate activities that protect, conserve, and promote environmental sustainability",
    "Conduct research on poverty-related issues and provide evidence-based consultancy",
    "Promote youth-focused poverty alleviation programs",
    "Promote HIV/AIDS awareness, prevention, and community education",
    "Empower women, widows, orphans, unemployed persons, and persons with disabilities",
    "Strengthen community awareness, civic education, and participation",
    "Build and maintain strategic partnerships with various stakeholders",
    "Promote monitoring, evaluation, learning, and accountability (MELA)",
  ];

  // Populate programs section
  const programsContainer = document.querySelector(".programs-container");

  if (programsContainer) {
    programs.forEach((program) => {
      const programCard = document.createElement("div");
      programCard.className = "program-card";
      programCard.innerHTML = `
                <h3>${program.substring(0, 60)}${program.length > 60 ? "..." : ""}</h3>
                <p>${program}</p>
            `;
      programsContainer.appendChild(programCard);
    });
  }

  // Initialize SDGs data
  const sdgs = [
    {
      number: 1,
      title: "No Poverty",
      description:
        "Directly aligns with PAO's core mission to reduce poverty and improve livelihoods",
    },
    {
      number: 2,
      title: "Zero Hunger",
      description:
        "Through livelihood support, skills training, and community food security initiatives",
    },
    {
      number: 3,
      title: "Good Health & Well-being",
      description:
        "Through HIV/AIDS awareness, health education, and support to vulnerable populations",
    },
    {
      number: 4,
      title: "Quality Education",
      description:
        "By supporting school renovations, improving access to school facilities",
    },
    {
      number: 5,
      title: "Gender Equality",
      description: "Promoting equal opportunities for women, widows, and girls",
    },
    {
      number: 8,
      title: "Decent Work & Economic Growth",
      description:
        "Through entrepreneurship, vocational skills training, and youth employment",
    },
    {
      number: 10,
      title: "Reduced Inequalities",
      description:
        "Focusing on marginalized groups such as persons with disabilities",
    },
    {
      number: 13,
      title: "Climate Action",
      description:
        "Through environmental conservation, awareness campaigns, and sustainable development",
    },
    {
      number: 17,
      title: "Partnerships",
      description:
        "By collaborating with government, NGOs, and development partners",
    },
  ];

  // Populate SDGs section
  const sdgsContainer = document.querySelector(".sdgs-container");

  if (sdgsContainer) {
    sdgs.forEach((sdg) => {
      const sdgCard = document.createElement("div");
      sdgCard.className = "sdg-card";
      sdgCard.innerHTML = `
                <div class="sdg-number">${sdg.number}</div>
                <h3>${sdg.title}</h3>
                <p>${sdg.description}</p>
            `;
      sdgsContainer.appendChild(sdgCard);
    });
  }

  // Donation functionality
  const amountOptions = document.querySelectorAll(".amount-option");
  const frequencyOptions = document.querySelectorAll(".frequency-option");
  const customAmountContainer = document.getElementById(
    "customAmountContainer",
  );
  const customAmountInput = document.getElementById("customAmount");
  const donateButton = document.getElementById("donateButton");

  let selectedAmount = 50; // Default amount
  let selectedFrequency = "one-time";

  // Handle amount selection
  amountOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from all amount options
      amountOptions.forEach((opt) => opt.classList.remove("active"));

      // Add active class to clicked option
      this.classList.add("active");

      const amount = this.getAttribute("data-amount");

      if (amount === "custom") {
        customAmountContainer.style.display = "block";
        customAmountInput.focus();
        selectedAmount = 0;
      } else {
        customAmountContainer.style.display = "none";
        selectedAmount = parseInt(amount);
      }
    });
  });

  // Handle custom amount input
  if (customAmountInput) {
    customAmountInput.addEventListener("input", function () {
      selectedAmount = parseInt(this.value) || 0;
    });
  }

  // Handle frequency selection
  frequencyOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove active class from all frequency options
      frequencyOptions.forEach((opt) => opt.classList.remove("active"));

      // Add active class to clicked option
      this.classList.add("active");

      selectedFrequency = this.getAttribute("data-frequency");
    });
  });

  // Handle donation button click
  if (donateButton) {
    donateButton.addEventListener("click", function () {
      const donorName = document.getElementById("donorName").value;
      const donorEmail = document.getElementById("donorEmail").value;

      // Validation
      if (!donorName || !donorEmail) {
        alert("Please enter your name and email address");
        return;
      }

      if (selectedAmount <= 0) {
        alert("Please select or enter a donation amount");
        return;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(donorEmail)) {
        alert("Please enter a valid email address");
        return;
      }

      // In a real application, this would connect to a payment gateway
      // For now, we'll show a confirmation message
      const frequencyText =
        selectedFrequency === "one-time"
          ? "one-time"
          : selectedFrequency === "monthly"
            ? "monthly"
            : "quarterly";

      const message = `Thank you ${donorName} for your ${frequencyText} donation of $${selectedAmount}! 
            A confirmation has been sent to ${donorEmail}. 
            Your support helps us fight poverty across Africa.`;

      alert(message);

      // Reset form
      document.getElementById("donorName").value = "";
      document.getElementById("donorEmail").value = "";
      customAmountInput.value = "";
      customAmountContainer.style.display = "none";

      // Reset to default selections
      amountOptions.forEach((opt) => opt.classList.remove("active"));
      if (amountOptions[1]) amountOptions[1].classList.add("active"); // Select $50 by default
      selectedAmount = 50;

      frequencyOptions.forEach((opt) => opt.classList.remove("active"));
      if (frequencyOptions[0]) frequencyOptions[0].classList.add("active"); // Select one-time by default
      selectedFrequency = "one-time";
    });
  }

  // Add smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = document.querySelector(".navbar").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Handle keyboard navigation for accessibility
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");

      // Reset hamburger animation
      const bars = hamburger.querySelectorAll(".bar");
      bars[0].style.transform = "none";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "none";
    }
  });

  // Listen for system theme changes
  prefersDarkScheme.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        body.classList.add("dark-theme");
        updateThemeToggle(true);
      } else {
        body.classList.remove("dark-theme");
        updateThemeToggle(false);
      }
    }
  });
});
