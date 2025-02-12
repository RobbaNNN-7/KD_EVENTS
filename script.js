function handleVideoPlayback() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Force video load on mobile
        video.load();
        
        // Handle playback
        function playVideo() {
            video.play().catch(function(error) {
                console.log("Video play failed:", error);
                // If autoplay fails, show first frame
                video.currentTime = 0.1;
            });
        }

        // Play video when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    playVideo();
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(video);

        // Handle touch events for mobile
        video.addEventListener('touchstart', () => {
            if (video.paused) {
                playVideo();
            } else {
                video.pause();
            }
        });

        // Ensure video plays after loading
        video.addEventListener('loadedmetadata', playVideo);
        video.addEventListener('canplay', playVideo);
    });
}

// Call the function when DOM is loaded
document.addEventListener('DOMContentLoaded', handleVideoPlayback);
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

    $(document).ready(function(){
        $("img").click(function(){
        var t = $(this).attr("src");
        $(".modal-body").html("<img src='"+t+"' class='modal-img'>");
        $("#myModal").modal();
      });
      
      $("video").click(function(){
        var v = $("video > source");
        var t = v.attr("src");
        $(".modal-body").html("<video class='model-vid' controls><source src='"+t+"' type='video/mp4'></source></video>");
        $("#myModal").modal();  
      });
      });//EOF Document.ready

    

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
            question.addEventListener("click", () => {
                // Toggle current answer
                answer.classList.toggle("active");
                
                // Toggle icon rotation
                icon.style.transform = answer.classList.contains("active") 
                    ? "rotate(180deg)" 
                    : "rotate(0deg)";
                
                // Set height for animation
                if (answer.classList.contains("active")) {
                    answer.style.height = answer.scrollHeight + "px";
                    answer.style.opacity = "1";
                } else {
                    answer.style.height = "0";
                    answer.style.opacity = "0";
                }
            });
        }
    });

    // Testimonials Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentIndex = 0;

    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        testimonialCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.style.visibility = 'visible';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            } else {
                card.style.visibility = 'hidden';
                card.style.opacity = '0';
                card.style.transform = 'translateX(50px)';
            }
            dots[index].classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        updateSlider();
    }

    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Auto slide
    setInterval(nextSlide, 5000);

    // Initial state
    updateSlider();
});
    


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



document.addEventListener("DOMContentLoaded", () => {
    console.log("Gallery script loaded")
  
    // Add hover effect for gallery items
    const galleryItems = document.querySelectorAll(".gallery-item")
    galleryItems.forEach((item) => {
      if (!item.classList.contains("video-item")) {
        item.addEventListener("mouseenter", () => {
          item.querySelector(".overlay").style.opacity = "1"
        })
        item.addEventListener("mouseleave", () => {
          item.querySelector(".overlay").style.opacity = "0"
        })
      }
    })
  
    // Add click event for explore button
    const exploreBtn = document.querySelector(".explore-btn")
    exploreBtn.addEventListener("click", () => {
      console.log("Explore More clicked")
      // Add your desired action here
    })
  })
  
  document.addEventListener('DOMContentLoaded', () => {
    const viewMoreBtn = document.querySelector('.view-more-btn');
    viewMoreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('View More clicked');
        // You can add any additional logic here before navigation
        window.location.href = viewMoreBtn.href;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Toggle mobile menu
    mobileNavToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !mobileNavToggle.contains(e.target)) {
            mobileNavToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.exp-number');
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps

                const updateCount = () => {
                    count += increment;
                    if (count < target) {
                        counter.textContent = Math.ceil(count) + '+';
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = target + '+';
                    }
                };

                updateCount();
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
});

// Testimonials Slider
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-testimonial');
    const nextBtn = document.querySelector('.next-testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentIndex = 0;

    // Create dots
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlider() {
        testimonialCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.style.visibility = 'visible';
                card.style.opacity = '1';
                card.style.transform = 'translateX(0)';
            } else {
                card.style.visibility = 'hidden';
                card.style.opacity = '0';
                card.style.transform = 'translateX(50px)';
            }
            dots[index].classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
        updateSlider();
    }

    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
    }

    // Auto slide
    setInterval(nextSlide, 5000);

    // Initial state
    updateSlider();
});