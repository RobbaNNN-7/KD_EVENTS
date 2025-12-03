// Initialize EmailJS
(function() {
    emailjs.init('MmlAxeu5CE55D-GTI');
})();

// Notification System Class
class NotificationSystem {
    constructor() {
        this.container = document.getElementById('notification-container');
    }

    show(type, title, message, duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = type === 'success' 
            ? '<svg class="notification-icon" fill="#4CAF50" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>'
            : '<svg class="notification-icon" fill="#f44336" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>';

        notification.innerHTML = `
            ${icon}
            <div class="notification-content">
                <h4 class="notification-title">${title}</h4>
                <p class="notification-message">${message}</p>
            </div>
            <button class="notification-close">&times;</button>
        `;

        this.container.appendChild(notification);
        
        notification.offsetHeight;
        notification.classList.add('show');

        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => this.close(notification));

        if (duration) {
            setTimeout(() => this.close(notification), duration);
        }
    }

    close(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.parentElement.removeChild(notification);
            }
        }, 400);
    }
}

// Initialize the notification system
const notifications = new NotificationSystem();

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const submitButton = this.querySelector('.submit-btn');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;

    // Get form values directly from the form elements
    const formData = {
        name: this.querySelector('input[name="name"]').value,
        email: this.querySelector('input[name="email"]').value,
        phone: this.querySelector('input[name="phone"]').value,
        eventType: this.querySelector('select[name="eventType"]').value,
        message: this.querySelector('textarea[name="message"]').value
    };

    // Create email template parameters
    const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        event_type: formData.eventType,
        message: formData.message,
        to_name: 'Events by KD'
    };

    // Log the data being sent (for debugging)
    console.log('Sending data:', templateParams);

    emailjs.send('service_b2ruzti', 'template_6vlkk6g', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            notifications.show(
                'success',
                'Message Sent!',
                'Thank you for contacting us. We will get back to you soon.'
            );
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.log('FAILED...', error);
            notifications.show(
                'error',
                'Error',
                'Sorry, there was a problem sending your message. Please try again later.'
            );
        })
        .finally(function() {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        });
});