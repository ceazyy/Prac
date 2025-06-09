// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation functionality
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile navigation
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile navigation when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Enhanced Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add staggered animation for children
                const children = entry.target.querySelectorAll('.service-card, .team-member, .location-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('visible');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    // Initialize enhanced scroll animations with streaming text effects
    function initScrollAnimations() {
        // Enhanced observer with more visible threshold
        const enhancedObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add staggered delay for multiple elements in the same container
                    const container = entry.target.closest('.container, .services-grid, .team-grid, .locations-grid, .portfolio-grid, .timeline');
                    let delay = 0;
                    
                    if (container) {
                        const elementsInContainer = container.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .scale-in');
                        const elementIndex = Array.from(elementsInContainer).indexOf(entry.target);
                        delay = elementIndex * 150; // 150ms delay between each element
                    }
                    
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        
                        // Add streaming text effect for text elements
                        if (entry.target.classList.contains('stream-text')) {
                            initTextStreaming(entry.target);
                        }
                        
                        // Add word-by-word animation for paragraphs
                        const paragraphs = entry.target.querySelectorAll('p');
                        paragraphs.forEach((p, index) => {
                            setTimeout(() => {
                                animateTextWords(p);
                            }, index * 100);
                        });
                        
                        // Add a subtle bounce effect for scale-in elements
                        if (entry.target.classList.contains('scale-in')) {
                            entry.target.style.animation = 'none';
                            setTimeout(() => {
                                entry.target.style.animation = 'subtle-bounce 0.6s ease-out';
                            }, 100);
                        }
                    }, delay);
                    
                    // Stop observing once animated
                    enhancedObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15, // More strict threshold
            rootMargin: '0px 0px -50px 0px' // Trigger animations earlier
        });

        // Add animation classes to elements with enhanced targeting
        const sections = document.querySelectorAll('section');
        sections.forEach((section, index) => {
            if (index === 0) return; // Skip hero section
            
            const sectionTitle = section.querySelector('.section-title');
            const sectionSubtitle = section.querySelector('.section-subtitle');
            
            if (sectionTitle) {
                sectionTitle.classList.add('fade-in-up');
                enhancedObserver.observe(sectionTitle);
            }
            
            if (sectionSubtitle) {
                sectionSubtitle.classList.add('fade-in-up');
                enhancedObserver.observe(sectionSubtitle);
            }
        });

        // Service cards with enhanced animations
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            if (index % 3 === 0) {
                card.classList.add('fade-in-left');
            } else if (index % 3 === 1) {
                card.classList.add('fade-in-up');
            } else {
                card.classList.add('fade-in-right');
            }
            enhancedObserver.observe(card);
        });

        // Portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            if (index % 2 === 0) {
                item.classList.add('fade-in-left');
            } else {
                item.classList.add('fade-in-right');
            }
            enhancedObserver.observe(item);
        });

        // Work items (legacy support)
        const workItems = document.querySelectorAll('.work-item');
        workItems.forEach((item, index) => {
            if (index % 2 === 0) {
                item.classList.add('fade-in-left');
            } else {
                item.classList.add('fade-in-right');
            }
            enhancedObserver.observe(item);
        });

        // Team members with scale animation
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach((member, index) => {
            member.classList.add('scale-in');
            enhancedObserver.observe(member);
        });

        // Location cards
        const locationCards = document.querySelectorAll('.location-card');
        locationCards.forEach((card, index) => {
            if (index % 3 === 0) {
                card.classList.add('fade-in-left');
            } else if (index % 3 === 1) {
                card.classList.add('fade-in-up');
            } else {
                card.classList.add('fade-in-right');
            }
            enhancedObserver.observe(card);
        });

        // Timeline items
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            item.classList.add('fade-in-right');
            enhancedObserver.observe(item);
        });

        // Stats
        const stats = document.querySelectorAll('.stat');
        stats.forEach((stat, index) => {
            stat.classList.add('scale-in');
            enhancedObserver.observe(stat);
        });

        // About text elements
        const aboutText = document.querySelectorAll('.about-text p, .about-text h3');
        aboutText.forEach((element, index) => {
            element.classList.add('fade-in-up');
            enhancedObserver.observe(element);
        });

        // Contact form and info
        const contactForm = document.querySelector('.contact-form');
        const contactInfo = document.querySelector('.contact-info');
        
        if (contactForm) {
            contactForm.classList.add('fade-in-left');
            enhancedObserver.observe(contactForm);
        }
        
        if (contactInfo) {
            contactInfo.classList.add('fade-in-right');
            enhancedObserver.observe(contactInfo);
        }
    }

    // Initialize animations
    initScrollAnimations();

    // Fast text streaming animation function
    function initTextStreaming(element) {
        element.style.overflow = 'hidden';
        element.style.position = 'relative';
        
        const streamLine = document.createElement('div');
        streamLine.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(231, 76, 60, 0.4), transparent);
            animation: stream-sweep 0.8s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.appendChild(streamLine);
        
        setTimeout(() => {
            streamLine.remove();
        }, 800);
    }

    // Fast word-by-word animation function
    function animateTextWords(paragraph) {
        if (!paragraph || paragraph.dataset.animated) return;
        paragraph.dataset.animated = 'true';
        
        const text = paragraph.textContent.trim();
        const words = text.split(' ');
        paragraph.innerHTML = '';
        
        words.forEach((word, index) => {
            const wordSpan = document.createElement('span');
            wordSpan.textContent = word;
            wordSpan.style.cssText = `
                opacity: 0;
                transform: translateY(15px);
                display: inline-block;
                margin-right: 0.3em;
                transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                will-change: transform, opacity;
            `;
            paragraph.appendChild(wordSpan);
            
            setTimeout(() => {
                wordSpan.style.opacity = '1';
                wordSpan.style.transform = 'translateY(0)';
            }, index * 60 + 100);
        });
    }

    // Enhanced timeline animations
    function initTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const timelineObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }

    // Initialize timeline animations
    initTimelineAnimations();

    // Initialize section transitions
    initSectionTransitions();

    // Initialize video background
    initVideoBackground();

    // Section transition animations
    function initSectionTransitions() {
        const sections = document.querySelectorAll('section');
        
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add a small delay to prevent flickering
                    setTimeout(() => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('section-visible');
                        }
                    }, 50);
                } else {
                    // Only remove class if element is significantly out of view
                    if (entry.intersectionRatio < 0.05) {
                        setTimeout(() => {
                            entry.target.classList.remove('section-visible');
                        }, 200);
                    }
                }
            });
        }, {
            threshold: [0, 0.1, 0.2],
            rootMargin: '0px 0px -50px 0px'
        });
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }

    // Video background initialization
    function initVideoBackground() {
        const video = document.querySelector('.hero-video');
        const videoOverlay = document.querySelector('.video-overlay');
        
        if (video) {
            // Handle video load success
            video.addEventListener('loadeddata', function() {
                video.style.opacity = '1';
                console.log('Background video loaded successfully');
            });
            
            // Handle video load error - create animated fallback
            video.addEventListener('error', function() {
                console.log('Video failed to load, using animated fallback');
                video.style.display = 'none';
                
                // Create animated background fallback
                if (videoOverlay) {
                    videoOverlay.style.background = `
                        linear-gradient(
                            135deg, 
                            rgba(10,10,10,0.95) 0%, 
                            rgba(30,30,30,0.9) 50%, 
                            rgba(10,10,10,0.98) 100%
                        ),
                        radial-gradient(circle at 20% 30%, rgba(231, 76, 60, 0.1) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(52, 152, 219, 0.08) 0%, transparent 50%),
                        linear-gradient(45deg, rgba(155, 89, 182, 0.05) 0%, transparent 50%)
                    `;
                    videoOverlay.style.animation = 'fallback-float 20s ease-in-out infinite';
                }
            });
            
            // Set video properties for better mobile support
            video.muted = true;
            video.playsInline = true;
            
            // Try to play video
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log('Auto-play prevented:', error);
                    // Video auto-play was prevented, but that's okay
                });
            }
        }
    }

    // Counter animation for stats
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start) + '+';
            
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            }
        }, 16);
    }

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const targetValue = parseInt(stat.textContent);
                    animateCounter(stat, targetValue);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            // Show success message
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '10px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '500',
            zIndex: '10000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            maxWidth: '300px',
            wordWrap: 'break-word'
        });
        
        // Set background color based on type
        const colors = {
            success: '#2ECC71',
            error: '#E74C3C',
            warning: '#F39C12',
            info: '#3498DB'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Form validation
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Remove existing error state
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Show error if validation failed
        if (!isValid) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errorMessage;
            errorDiv.style.color = '#E74C3C';
            errorDiv.style.fontSize = '12px';
            errorDiv.style.marginTop = '5px';
            field.parentNode.appendChild(errorDiv);
        }

        return isValid;
    }

    // Add error styles
    const style = document.createElement('style');
    style.textContent = `
        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: #E74C3C !important;
            box-shadow: 0 0 0 3px rgba(231, 76, 60, 0.1);
        }
    `;
    document.head.appendChild(style);

    // Crayon box animation trigger
    const crayonBox = document.querySelector('.crayon-box');
    if (crayonBox) {
        const crayonObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'none';
                    setTimeout(() => {
                        entry.target.style.animation = '';
                    }, 100);
                }
            });
        }, { threshold: 0.5 });
        
        crayonObserver.observe(crayonBox);
    }

    // Work gallery hover effects
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Parallax effect for color splashes
    const colorSplashes = document.querySelectorAll('.color-splash');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        colorSplashes.forEach((splash, index) => {
            const speed = 0.5 + (index * 0.1);
            splash.style.transform = `translateY(${rate * speed}px)`;
        });
    });

    // Smooth reveal for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.3 });

    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        timelineObserver.observe(item);
    });

    // Add dynamic copyright year
    const currentYear = new Date().getFullYear();
    const copyrightText = document.querySelector('.copyright');
    if (copyrightText) {
        copyrightText.innerHTML = copyrightText.innerHTML.replace('2024', currentYear);
    }

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debounce to scroll-intensive functions
    const debouncedHighlight = debounce(highlightNavigation, 10);
    window.removeEventListener('scroll', highlightNavigation);
    window.addEventListener('scroll', debouncedHighlight);

    // Accessibility improvements
    // Add focus indicators for keyboard navigation
    const focusableElements = document.querySelectorAll('a, button, input, select, textarea');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #E74C3C';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Reduce motion for users who prefer it
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Initialize News Section
    function initNewsSection() {
        const newsItems = document.querySelectorAll('.news-item');
        
        // Enhanced scroll observer for news items
        const newsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Add staggered animation
                    const index = Array.from(newsItems).indexOf(entry.target);
                    entry.target.style.animationDelay = `${index * 0.1}s`;
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        newsItems.forEach((item, index) => {
            // Set initial state
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            
            // Observe for animation
            newsObserver.observe(item);
            
            // Enhanced hover effects
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-12px)';
                this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            });
        });

        // Add click tracking for news links
        const newsLinks = document.querySelectorAll('.news-link');
        newsLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Optional: Add analytics tracking here
                console.log('News article clicked:', this.closest('.news-item').querySelector('.news-title').textContent);
            });
        });
    }

    // Call news section initialization
    initNewsSection();

    // Portfolio filter functionality
    function initPortfolioFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('[data-category]');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active filter
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                        item.style.display = 'block';
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            if (item.style.opacity === '0') {
                                item.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Services timeline animation
    function initServicesTimeline() {
        const serviceItems = document.querySelectorAll('.service-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.3 });
        
        serviceItems.forEach(item => observer.observe(item));
    }
    
    // Enhanced About Gallery
    function initAboutAnimations() {
        const gallery = document.querySelector('.about-gallery-container');
        if (!gallery) return;

        const slides = gallery.querySelectorAll('.gallery-slide');
        const thumbnails = gallery.querySelectorAll('.thumbnail');
        const prevBtn = gallery.querySelector('.prev-btn');
        const nextBtn = gallery.querySelector('.next-btn');
        const progressBar = gallery.querySelector('.progress-bar');
        
        let currentIndex = 0;
        let isTransitioning = false;
        let autoPlayInterval;

        function showSlide(index) {
            if (isTransitioning || index === currentIndex) return;
            isTransitioning = true;

            // Remove active class from all slides and thumbnails
            slides.forEach(slide => slide.classList.remove('active'));
            thumbnails.forEach(thumb => thumb.classList.remove('active'));

            // Add active class to current slide and thumbnail
            if (slides[index]) {
                slides[index].classList.add('active');
            }
            if (thumbnails[index]) {
                thumbnails[index].classList.add('active');
            }

            // Update progress bar
            if (progressBar) {
                const progressWidth = ((index + 1) / slides.length) * 100;
                progressBar.style.width = `${progressWidth}%`;
            }

            currentIndex = index;
            
            setTimeout(() => {
                isTransitioning = false;
            }, 800);
        }

        function nextSlide() {
            const nextIndex = (currentIndex + 1) % slides.length;
            showSlide(nextIndex);
        }

        function prevSlide() {
            const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                startAutoPlay(); // Restart autoplay after manual navigation
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                startAutoPlay(); // Restart autoplay after manual navigation
            });
        }

        thumbnails.forEach((thumb, index) => {
            thumb.addEventListener('click', () => {
                showSlide(index);
                startAutoPlay(); // Restart autoplay after manual navigation
            });
        });

        // Pause autoplay on hover
        gallery.addEventListener('mouseenter', stopAutoPlay);
        gallery.addEventListener('mouseleave', startAutoPlay);

        // Initialize first slide and start autoplay
        if (slides.length > 0) {
            showSlide(0);
            startAutoPlay();
        }
    }

    // Initialize Identity Slider
    function initIdentitySlider() {
        const slides = document.querySelectorAll('.identity-slide');
        const dots = document.querySelectorAll('.slider-dots .dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        const progressBar = document.querySelector('.progress-bar');
        
        let currentSlide = 0;
        let autoPlayInterval;
        let progressInterval;
        
        if (slides.length === 0) return;
        
        function showSlide(index) {
            // Remove active classes
            slides.forEach(slide => slide.classList.remove('active', 'prev'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            // Add prev class to previous slide for smooth transition
            const prevIndex = index === 0 ? slides.length - 1 : index - 1;
            slides[prevIndex].classList.add('prev');
            
            currentSlide = index;
            resetProgress();
        }
        
        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }
        
        function prevSlide() {
            const prev = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
            showSlide(prev);
        }
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
            startProgress();
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
            clearInterval(progressInterval);
        }
        
        function startProgress() {
            if (!progressBar) return;
            progressBar.style.width = '0%';
            progressBar.style.animation = 'progress 5s linear forwards';
        }
        
        function resetProgress() {
            if (!progressBar) return;
            progressBar.style.animation = 'none';
            setTimeout(() => {
                progressBar.style.animation = 'progress 5s linear forwards';
            }, 50);
        }
        
        // Event listeners
        if (nextBtn) nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            setTimeout(startAutoPlay, 1000);
        });
        
        if (prevBtn) prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            setTimeout(startAutoPlay, 1000);
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoPlay();
                showSlide(index);
                setTimeout(startAutoPlay, 1000);
            });
        });
        
        // Start autoplay
        startAutoPlay();
        
        // Pause on hover
        const sliderContainer = document.querySelector('.identity-slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoPlay);
            sliderContainer.addEventListener('mouseleave', startAutoPlay);
        }
    }

    // Enhanced fade-in animations for all sections
    function initFadeAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    
                    // Stagger child animations
                    const children = entry.target.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('fade-in-visible');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observe all major sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('fade-animation');
            observer.observe(section);
        });

        // Observe individual elements
        document.querySelectorAll('.animate-element, .team-member, .client-row, .news-item, .award-item, .certification-item, .network-item, .media-partner-item').forEach(element => {
            element.classList.add('animate-child');
            observer.observe(element);
        });
    }
    
    // Enhanced smooth scrolling for navigation links
    function initializeSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Performance optimization for scroll events
    function initializePerformanceOptimizations() {
        // Use passive listeners for better scroll performance
        let ticking = false;
        
        const updateOnScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Any scroll-dependent updates go here
                    ticking = false;
                });
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', updateOnScroll, { passive: true });
        window.addEventListener('resize', debounce(updateOnScroll, 250), { passive: true });
    }

    // Preload critical images for better performance
    function preloadCriticalImages() {
        const criticalImages = [
            'assets/images/logo.png',
            'assets/images/about-img.jpg',
            'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=250&fit=crop'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    // Fix any potential layout shifts
    function preventLayoutShifts() {
        // Set explicit dimensions for images to prevent layout shifts
        const images = document.querySelectorAll('img[src*="unsplash"]');
        images.forEach(img => {
            if (!img.style.aspectRatio && !img.width && !img.height) {
                img.style.aspectRatio = '16/10';
                img.style.objectFit = 'cover';
            }
        });
    }

    // Initialize all functions
    initPortfolioFilters();
    initServicesTimeline();
    initAboutAnimations();
    initIdentitySlider();
    initFadeAnimations();
    initializeSmoothScrolling();
    initializePerformanceOptimizations();
    preloadCriticalImages();
    preventLayoutShifts();
    
    console.log('The Crayons Network website loaded successfully! 🎨✨');
}); 