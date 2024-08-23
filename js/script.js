document.addEventListener("DOMContentLoaded", () => {
    // Handle header scroll effect
    const header = document.querySelector("header");
    const headerHeight = header.offsetHeight;
    let lastScrollTop = 0;

    const handleScroll = () => {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        if (currentScroll > headerHeight) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };
    window.addEventListener("scroll", handleScroll);

    // Handle dropdown menu
    const hamburger = document.querySelector(".hamburger");
    hamburger.onclick = () => {
        const navbar = document.querySelector(".nav-bar");

        if (!navbar.classList.contains("active")) {
            header.classList.add("scrolled");

            setTimeout(() => {
                navbar.classList.add("active");
            }, 200);
        } else {
            navbar.classList.remove("active");

            setTimeout(() => {
                const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                if (currentScroll <= headerHeight) {
                    header.classList.remove("scrolled");
                }
            }, 200);
        }
    };

    // Select all elements with a class that starts with 'animate__'
    const animatedElements = document.querySelectorAll('[class*="animate__"]');

    // Define the observer for general animations
    const generalObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const animateClass = Array.from(entry.target.classList).find((cls) => cls.startsWith("animate__"));

                    if (animateClass) {
                        entry.target.classList.remove(...Array.from(entry.target.classList).filter((cls) => cls.startsWith("animate__")));
                        void entry.target.offsetWidth;
                        entry.target.classList.add(animateClass);
                    }

                    generalObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    animatedElements.forEach((element) => {
        generalObserver.observe(element);
    });

    const cardElements = document.querySelectorAll("#miscellaneous .card");

    const cardObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const classes = {
                        0: "animate__zoomInLeft",
                        1: "animate__zoomIn",
                        2: "animate__zoomInRight",
                    };

                    const index = Array.from(cardElements).indexOf(entry.target);
                    const classToAdd = classes[index];

                    if (classToAdd) {
                        entry.target.classList.remove(...Object.values(classes));
                        void entry.target.offsetWidth;
                        entry.target.classList.add(classToAdd);
                    }

                    cardObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    cardElements.forEach((element) => {
        cardObserver.observe(element);
    });

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll", () => {
        let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        let headerHeight = document.querySelector("header").offsetHeight;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - headerHeight - 300;
            const sectionHeight = section.offsetHeight;

            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (section.getAttribute("id") === link.getAttribute("href").substring(1)) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });

    function smoothScroll(target) {
        const headerOffset = 250;
        const element = document.querySelector(target);
        const top = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    }

    document.querySelectorAll(".nav-bar a").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            smoothScroll(this.getAttribute("href"));
        });
    });

    // Ensure video plays on mobile devices
    const heroVideo = document.querySelector(".hero-video");
    if (heroVideo) {
        heroVideo.play().catch((error) => {
            console.error("Video playback failed:", error);
        });
    }
});
