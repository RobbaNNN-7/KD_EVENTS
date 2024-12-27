document.addEventListener('DOMContentLoaded', () => {
    // Existing JavaScript code...

    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-background');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Rest of the existing JavaScript code...

  
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
  
    // Contact Modal
    const modal = document.getElementById('contact-modal');
    const contactBtn = document.querySelector('.contact-btn');
    const closeBtn = document.getElementsByClassName('close')[0];
  
    contactBtn.onclick = () => {
        modal.style.display = 'block';
    }
  
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    }
  
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
  
    // Form Submission
    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your inquiry! We will get back to you soon.');
        bookingForm.reset();
    });
  
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
  
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
  
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

   

document.addEventListener("DOMContentLoaded", () => {
    const faqItems = document.querySelectorAll(".faq-item");
  
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const icon = question.querySelector("i");
  
      // Set initial height of all answers to 0
      answer.style.height = "0";
  
      question.addEventListener("click", () => {
        const isActive = answer.classList.contains("active");
  
        // Close all other FAQ items
        document.querySelectorAll(".faq-answer.active").forEach((openAnswer) => {
          openAnswer.classList.remove("active");
          openAnswer.style.height = "0";
  
          const openIcon = openAnswer.closest(".faq-item").querySelector("i");
          openIcon.style.transform = "rotate(0deg)";
        });
  
        // Toggle the current FAQ item
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
    });
  });
  
  

  
    document.addEventListener("DOMContentLoaded", function () {
        // Testimonial Slider
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll(".testimonial");
        const prevBtn = document.querySelector(".prev-testimonial");
        const nextBtn = document.querySelector(".next-testimonial");
      
        function showTestimonial(index) {
          testimonials.forEach((testimonial, i) => {
            if (i === index) {
              testimonial.classList.add("active");
            } else {
              testimonial.classList.remove("active");
            }
          });
        }
      
        function nextTestimonial() {
          currentTestimonial = (currentTestimonial + 1) % testimonials.length;
          showTestimonial(currentTestimonial);
        }
      
        function prevTestimonial() {
          currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
          showTestimonial(currentTestimonial);
        }
      
        if (prevBtn && nextBtn) {
          prevBtn.addEventListener("click", prevTestimonial);
          nextBtn.addEventListener("click", nextTestimonial);
        }
      
        // Auto-slide testimonials every 5 seconds
        setInterval(nextTestimonial, 5000);
      
        // Show the first testimonial initially
        showTestimonial(currentTestimonial);
      });
      // Scroll Animations
    const scrollElements = document.querySelectorAll('.scroll-animation');
  
    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= 
            ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
    };
  
    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };
  
    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };
  
    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 100)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        })
    }
  
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
  
    // Initialize
    handleScrollAnimation();
  });