document.addEventListener('DOMContentLoaded', function() {
    // Add a subtle entrance animation to the page
    document.body.style.opacity = 0;
    document.body.style.transform = 'translateY(10px)';
    document.body.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    
    setTimeout(() => {
        document.body.style.opacity = 1;
        document.body.style.transform = 'translateY(0)';
    }, 100);
    
    // Initialize Intersection Observer for scroll animations with staggered delays
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a staggered delay based on the section's position
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px'
    });

    // Observe all sections with a slight delay to ensure proper observation
    setTimeout(() => {
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }, 300);



    // Add interactive hover effects to skills
    const skillItems = document.querySelectorAll('.skill-list li');
    skillItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            const progressBar = item.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.backgroundColor = 'var(--accent-color)';
            }
            item.style.transform = 'translateX(5px)';
            item.style.color = 'var(--primary-color)';
            item.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseout', () => {
            const progressBar = item.querySelector('.progress-bar');
            if (progressBar) {
                progressBar.style.backgroundColor = '';
            }
            item.style.color = '';
            item.style.transform = '';
        });
    });

    // PDF download functionality
    document.getElementById('download-pdf').addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add a print-specific class to the body
        document.body.classList.add('print-mode');
        
        // Alert the user that their browser's print dialog will open
        alert('Your browser will open a print dialog. Choose "Save as PDF" to download the resume.');
        
        // Trigger browser print functionality
        window.print();
        
        // Remove the print-specific class after printing
        setTimeout(() => {
            document.body.classList.remove('print-mode');
        }, 1000);
    });

    // Add current year to footer copyright
    const currentYear = new Date().getFullYear();
    const footerYear = document.querySelector('.footer-content p:first-child');
    if (footerYear) {
        footerYear.textContent = `© ${currentYear} Rahul Rao - Resume`;
    }

    // Apply progress bar animation when they come into view with staggered delays
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.progress-bar');
                progressBars.forEach((bar, index) => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    
                    // Stagger the animations
                    setTimeout(() => {
                        bar.style.width = width;
                        bar.style.transition = 'width 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                    }, 300 + (index * 200)); // Increase delay for each successive bar
                });
                progressObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.skill-category').forEach(category => {
        progressObserver.observe(category);
    });
    
    // Add subtle hover effects to all sections
    document.querySelectorAll('section').forEach(section => {
        section.addEventListener('mouseenter', function() {
            if (this.classList.contains('visible')) {
                this.style.transform = 'translateY(-5px) scale(1.01)';
            }
        });
        
        section.addEventListener('mouseleave', function() {
            if (this.classList.contains('visible')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Add interactive effects to tech tags
    const techTags = document.querySelectorAll('.tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('click', function(event) {
            // Create a ripple effect on click
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            
            ripple.style.width = ripple.style.height = `${size * 2}px`;
            ripple.style.left = `${event.clientX - rect.left - size}px`;
            ripple.style.top = `${event.clientY - rect.top - size}px`;
            
            // Remove the ripple after animation completes
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add a "selected" class to this tag and remove from others
            document.querySelectorAll('.tech-tag.selected').forEach(t => {
                if (t !== this) t.classList.remove('selected');
            });
            
            this.classList.toggle('selected');
        });
    });
    
    // Create interactive typing effect for name heading on initial load
    const nameHeading = document.querySelector('h1');
    if (nameHeading) {
        const originalText = nameHeading.textContent;
        nameHeading.style.opacity = '1';
        nameHeading.innerHTML = '';
        
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < originalText.length) {
                nameHeading.innerHTML += originalText.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }
});
