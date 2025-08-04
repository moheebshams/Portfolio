document.addEventListener("DOMContentLoaded", () => {
    // Sidebar toggle for mobile
    const sidebar = document.querySelector(".sidebar");
    const menuToggle = document.getElementById("menuToggle");
    const sidebarToggle = document.getElementById("sidebarToggle");

    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("sidebar-open");
    });

    sidebarToggle.addEventListener("click", () => {
        sidebar.classList.remove("sidebar-open");
    });

    // Smooth scrolling and active nav state
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            document
                .querySelectorAll(".nav-link")
                .forEach((link) => link.classList.remove("active-nav"));
            anchor.classList.add("active-nav");

            const targetId = anchor.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 20,
                    behavior: "smooth",
                });
            }
            sidebar.classList.remove("sidebar-open"); // Close sidebar on mobile
        });
    });

    // Scroll progress bar
    const scrollProgress = document.getElementById("scrollProgress");
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;
    });

    // Animate skill bars on view
    const skillBars = document.querySelectorAll(".skill-bar");
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.width = bar.getAttribute("data-width");
                }
            });
        },
        { threshold: 0.3 }
    );

    skillBars.forEach((bar) => observer.observe(bar));

    // Update active nav on scroll
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("active-nav");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active-nav");
            }
        });
    });
});
