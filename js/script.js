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
    hamburger = document.querySelector(".hamburger");
    hamburger.onclick = () => {
        navbar = document.querySelector(".nav-bar");

        if (!navbar.classList.contains("active")) {
            // First, add the 'scrolled' class to the header
            header.classList.add("scrolled");

            // Then, after a delay of 0.2 seconds, show the navbar
            setTimeout(() => {
                navbar.classList.add("active");
            }, 200);
        } else {
            // If the menu is already active, close it immediately
            navbar.classList.remove("active");

            // Delay the removal of the 'scrolled' class by 0.2 seconds
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
                    // Find the first class that starts with 'animate__' in the element
                    const animateClass = Array.from(entry.target.classList).find((cls) => cls.startsWith("animate__"));

                    if (animateClass) {
                        // Remove all animation classes
                        entry.target.classList.remove(...Array.from(entry.target.classList).filter((cls) => cls.startsWith("animate__")));
                        // Force reflow
                        void entry.target.offsetWidth;
                        // Add the animation class
                        entry.target.classList.add(animateClass);
                    }

                    // Unobserve the element after it has been animated
                    generalObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    ); // Adjust the threshold as needed

    // Observe each general animated element
    animatedElements.forEach((element) => {
        generalObserver.observe(element);
    });

    // Select .card elements for specific animation handling
    const cardElements = document.querySelectorAll("#miscellaneous .card");

    // Define the observer for .card elements
    const cardObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const classes = {
                        0: "animate__zoomInLeft",
                        1: "animate__zoomIn",
                        2: "animate__zoomInRight",
                    };

                    // Find the index of the current card element
                    const index = Array.from(cardElements).indexOf(entry.target);
                    const classToAdd = classes[index];

                    if (classToAdd) {
                        entry.target.classList.remove(...Object.values(classes));
                        // Force reflow
                        void entry.target.offsetWidth;
                        // Add the animation class
                        entry.target.classList.add(classToAdd);
                    }

                    // Unobserve the element after it has been animated
                    cardObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    ); // Adjust the threshold as needed

    // Observe each card element
    cardElements.forEach((element) => {
        cardObserver.observe(element);
    });

    // Handle smooth scrolling with anchor links
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
    // Smooth scrolling function with offset
    function smoothScroll(target) {
        const headerOffset = 250; // Adjust this value to the height of your fixed header
        const element = document.querySelector(target);
        const top = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: top,
            behavior: "smooth",
        });
    }

    // Add event listener to all nav links
    document.querySelectorAll(".nav-bar a").forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault(); // Prevent the default link behavior
            smoothScroll(this.getAttribute("href")); // Scroll to the target element
        });
    });
});
