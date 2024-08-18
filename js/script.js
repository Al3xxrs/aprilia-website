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
    const menuIcon = document.querySelector(".menu-icon");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    menuIcon.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", (event) => {
        if (!menuIcon.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });

    // Handle dropdown menu items
    const dropdownItems = document.querySelectorAll(".dropdown-menu li a");
    dropdownItems.forEach((item) => {
        item.addEventListener("click", () => {
            dropdownMenu.style.display = "none";
        });
    });

    // Handle image animations with IntersectionObserver
    const images = document.querySelectorAll("#miscellaneous .card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const classes = {
                    0: "animate__zoomInLeft",
                    1: "animate__zoomIn",
                    2: "animate__zoomInRight",
                };

                const classToAdd = classes[Array.from(images).indexOf(entry.target)];
                if (classToAdd) {
                    entry.target.classList.remove(...Object.values(classes));
                    void entry.target.offsetWidth; // Trigger reflow
                    entry.target.classList.add(classToAdd);
                }

                observer.unobserve(entry.target);
            }
        });
    });

    images.forEach((image) => {
        observer.observe(image);
    });
});
