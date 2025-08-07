
    document.addEventListener("DOMContentLoaded", function() {
      // Loader
      const loader = document.getElementById("loader");
      
      // Hide loader after page loads
      window.addEventListener("load", function() {
        setTimeout(function() {
          loader.classList.add("hidden");
        }, 500);
      });

      // Fallback in case load event doesn't fire
      setTimeout(function() {
        loader.classList.add("hidden");
      }, 2000);

      // Set skill bars
      const skillBars = document.querySelectorAll(".skill-bar");
      skillBars.forEach(function(bar) {
        bar.style.width = bar.getAttribute("data-width");
      });

      // Sidebar toggle for mobile
      const sidebar = document.querySelector(".sidebar");
      const menuToggle = document.getElementById("menuToggle");
      const sidebarToggle = document.getElementById("sidebarToggle");

      menuToggle.addEventListener("click", function() {
        sidebar.classList.toggle("sidebar-open");
        document.body.style.overflow = sidebar.classList.contains("sidebar-open") ? "hidden" : "auto";
      });

      sidebarToggle.addEventListener("click", function() {
        sidebar.classList.remove("sidebar-open");
        document.body.style.overflow = "auto";
      });

      // Close sidebar when clicking outside
      document.addEventListener("click", function(e) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
          sidebar.classList.remove("sidebar-open");
          document.body.style.overflow = "auto";
        }
      });

      // Smooth scrolling and active nav state
      document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener("click", function(e) {
          e.preventDefault();
          document.querySelectorAll(".nav-link").forEach(function(link) {
            link.classList.remove("active-nav");
          });
          this.classList.add("active-nav");
          const targetId = this.getAttribute("href");
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 20,
              behavior: "smooth"
            });
          }
          sidebar.classList.remove("sidebar-open");
          document.body.style.overflow = "auto";
        });
      });

      // Scroll progress bar
      const scrollProgress = document.getElementById("scrollProgress");
      window.addEventListener("scroll", function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + "%";
      });

      // Update active nav on scroll
      const sections = document.querySelectorAll("section[id]");
      window.addEventListener("scroll", function() {
        let current = "";
        sections.forEach(function(section) {
          const sectionTop = section.offsetTop - 100;
          if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
          }
        });
        document.querySelectorAll(".nav-link").forEach(function(link) {
          link.classList.remove("active-nav");
          if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active-nav");
          }
        });
      });

      // Back to top button
      const backToTop = document.getElementById("backToTop");
      window.addEventListener("scroll", function() {
        if (window.scrollY > 300) {
          backToTop.classList.add("show");
        } else {
          backToTop.classList.remove("show");
        }
      });

      backToTop.addEventListener("click", function() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      });

      // Update copyright year
      document.getElementById("currentYear").textContent = new Date().getFullYear();

      // Animate elements when they come into view
      const animateOnScroll = function() {
        const elements = document.querySelectorAll(".animation-fade-in-up");
        elements.forEach(function(element) {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          if (elementPosition < screenPosition) {
            element.style.animation = "fadeInUp 0.6s ease-out forwards";
          }
        });
      };

      window.addEventListener("scroll", animateOnScroll);
      animateOnScroll(); // Run once on load
    });
  