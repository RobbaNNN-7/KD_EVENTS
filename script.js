document.addEventListener("DOMContentLoaded", () => {
    // 1. Parallax Effect for Hero Background
    const heroBackground = document.querySelector(".hero-background");
    if (heroBackground) {
        window.addEventListener("scroll", () => {
            const scrollPosition = window.pageYOffset;
            heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        });
    }

    // 2. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });

    

    // 3. Contact Modal
    const modal = document.getElementById("contact-modal");
    const contactBtn = document.querySelector(".contact-btn");
    const closeBtn = document.querySelector(".close");

    if (contactBtn && modal && closeBtn) {
        contactBtn.addEventListener("click", () => {
            modal.style.display = "block";
        });

        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // 4. FAQ Dropdown Logic
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = question.querySelector("i");

        if (question && answer && icon) {
            answer.style.height = "0"; // Set initial height to 0
            question.addEventListener("click", () => {
                const isActive = answer.classList.contains("active");

                // Close all other answers
                document.querySelectorAll(".faq-answer.active").forEach((openAnswer) => {
                    openAnswer.classList.remove("active");
                    openAnswer.style.height = "0";
                    const openIcon = openAnswer.closest(".faq-item").querySelector("i");
                    if (openIcon) openIcon.style.transform = "rotate(0deg)";
                });

                // Toggle current answer
                if (!isActive) {
                    answer.classList.add("active");
                    answer.style.height = `${answer.scrollHeight}px`;
                    icon.style.transform = "rotate(180deg)";
                } else {
                    answer.classList.remove("active");
                    answer.style.height = "0";
                    icon.style.transform = "rotate(0deg)";
                }
            });
        }
    });
    
    // 5. Testimonial Slider
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll(".testimonial");
    const prevBtn = document.querySelector(".prev-testimonial");
    const nextBtn = document.querySelector(".next-testimonial");

    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle("active", i === index);
        });
    };

    if (prevBtn && nextBtn && testimonials.length > 0) {
        prevBtn.addEventListener("click", () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        nextBtn.addEventListener("click", () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);

        showTestimonial(currentTestimonial); // Show first testimonial
    }

    // 6. Scroll Animations
    const scrollElements = document.querySelectorAll(".scroll-animation");

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add("scrolled");
    };

    const hideScrollElement = (element) => {
        element.classList.remove("scrolled");
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation(); // Initialize
});
