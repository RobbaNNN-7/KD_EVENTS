// Gallery Data
const galleryData = [
    {
        id: 1,
        type: 'image',
        category: 'nature',
        src: 'dest_wedding-2.jpeg',
        title: 'Mountain Vista',
        description: 'Early morning fog rolling through valleys'
    },
    {
        id: 2,
        type: 'video',
        category: 'urban',
        src: 'hd-reel.mp4',
        title: 'City Pulse',
        description: 'Night life in motion'
    },
    {
        id: 2,
        type: 'video',
        category: 'urban',
        src: 'dest_wedding_video-1.mp4',
        title: 'City Pulse',
        description: 'Night life in motion'
    },
    {
        id: 1,
        type: 'image',
        category: 'nature',
        src: 'dest_wedding-3.jpeg',
        title: 'Mountain Vista',
        description: 'Early morning fog rolling through valleys'
    },
    {
        id: 1,
        type: 'image',
        category: 'nature',
        src: 'dest_wedding-4.jpeg',
        title: 'Mountain Vista',
        description: 'Early morning fog rolling through valleys'
    },
    {
        id: 2,
        type: 'video',
        category: 'urban',
        src: 'dest_wedding_video2.mp4',
        title: 'City Pulse',
        description: 'Night life in motion'
    },
    {
        id: 1,
        type: 'image',
        category: 'nature',
        src: 'event-2.jpeg',
        title: 'Mountain Vista',
        description: 'Early morning fog rolling through valleys'
    },
    {
        id: 1,
        type: 'image',
        category: 'nature',
        src: 'concert-1.jpg',
        title: 'Mountain Vista',
        description: 'Early morning fog rolling through valleys'
    },
    {
        id: 1,
        type: 'image',
        category: 'nature',
        src: 'concert-2.jpg',
        title: 'Mountain Vista',
        description: 'Early morning fog rolling through valleys'
    },
    {
        id: 1,
        type: 'image',
        category: 'nature',
        src: 'dest_wedding-5.jpg',
        title: 'Mountain Vista',
        description: 'Early morning fog rolling through valleys'
    },
    {
        id: 1,
        type: 'image',
        category: 'nature',
        src: 'dest_wedding-6.jpg',
        title: 'Mountain Vista',
        description: 'Early morning fog rolling through valleys'
    },
    // Add more items as needed
    {
        id: 1,
        type: 'image',
        category: 'nature',
        src: 'dest_wedding-7.jpg',
        title: 'Mountain Vista',
        description: 'Early morning fog rolling through valleys'
    },
    // Add more items as needed
];

// Story Data
const storyData = [
    {
        title: 'Urban Renaissance',
        description: 'A visual journey through city transformation',
        background: 'dest_wedding-2.jpeg',
        position: 'right' // This controls the image position
    },
    {
        title: 'Natural Wonders',
        description: 'Exploring Earth\'s most beautiful landscapes',
        background: 'dest_wedding-1.jpeg',
        position: 'right'
    },
    {
        title: 'Ocean Dreams',
        description: 'Deep blue mysteries of the sea',
        background: 'dest_wedding-3.jpg',
        position: 'left'
    }
    // Add more stories as needed
];

// Initialize Gallery
document.addEventListener('DOMContentLoaded', () => {
    const masonryContainer = document.querySelector('.gallery-masonry');
    const navButtons = document.querySelectorAll('.nav-btn');
    const storyContainer = document.querySelector('.story-container');
    
    // Initialize Masonry Gallery
    function initMasonryGallery(category = 'all') {
        masonryContainer.innerHTML = '';
        
        const filteredItems = category === 'all' 
            ? galleryData 
            : galleryData.filter(item => item.category === category);
            
        filteredItems.forEach(item => {
            const element = document.createElement('div');
            element.className = 'masonry-item';
            
            if (item.type === 'image') {
                element.innerHTML = `
                    <img src="${item.src}" alt="${item.title}" loading="lazy">
                    <div class="item-content">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                `;
            } else {
                element.innerHTML = `
                    <video src="${item.src}" muted loop></video>
                    <div class="item-content">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                `;
                
                const video = element.querySelector('video');
                
                // Play/pause on hover
                element.addEventListener('mouseenter', () => video.play());
                element.addEventListener('mouseleave', () => video.pause());
            }
            
            // Add reveal animation
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            
            masonryContainer.appendChild(element);
            
            // Trigger animation
            setTimeout(() => {
                element.style.transition = 'all 0.8s ease-out';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100);
        });
    }
    
    // Initialize Stories
    function initStories() {
        storyData.forEach((story, index) => {
            const storyElement = document.createElement('div');
            storyElement.className = `story-item ${index === 0 ? 'active' : ''}`;
            storyElement.style.backgroundImage = `url(${story.background})`;
            
            storyElement.innerHTML = `
                <div class="story-content">
                    <h2>${story.title}</h2>
                    <p>${story.description}</p>
                </div>
            `;
            
            storyContainer.appendChild(storyElement);
        });
    }
    
    // Parallax Effect
    function handleParallax() {
        const elements = document.querySelectorAll('.featured-item, .masonry-item');
        
        window.addEventListener('scroll', () => {
            elements.forEach(element => {
                const speed = 0.15;
                const rect = element.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isInView) {
                    const yPos = -(rect.top * speed);
                    element.style.transform = `translate3d(0, ${yPos}px, 0)`;
                }
            });
        });
    }
    
    // Smooth Scrolling
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                target.scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
    
    // Filter Functionality
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            initMasonryGallery(button.dataset.category);
        });
    });
    
    // Initialize Everything
    initMasonryGallery();
    initStories();
    handleParallax();
    initSmoothScroll();
    
    // Intersection Observer for Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.featured-item, .masonry-item').forEach(item => {
        observer.observe(item);
    });
});

// Handle Video Playback
document.querySelectorAll('video').forEach(video => {
    video.addEventListener('mouseover', () => {
        video.play();
    });
    
    video.addEventListener('mouseout', () => {
        video.pause();
    });
});

// Lazy Loading
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}