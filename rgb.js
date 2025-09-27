 document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
        });

        function initializeApp() {
            const loginForm = document.getElementById('loginForm');
            const loginBtn = document.getElementById('loginBtn');
            const errorMessage = document.getElementById('errorMessage');
            const loginScreen = document.getElementById('loginScreen');
            const mainApp = document.getElementById('mainApp');
            const userInitial = document.getElementById('userInitial');
            const profileIcon = document.getElementById('profileIcon');
            const profileMenu = document.getElementById('profileMenu');
            const signOutBtn = document.getElementById('signOut');
            const searchBox = document.getElementById('searchBox');
            const navLinks = document.querySelectorAll('.nav-links a');

            let currentUser = null;

            // Handle login form submission
            loginForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value.trim();

                if (!email || !password) {
                    showError('Please fill in all fields');
                    return;
                }

                // Show loading state
                loginBtn.textContent = 'Signing In...';
                loginBtn.disabled = true;
                hideError();

                // Simulate API call with timeout
                setTimeout(() => {
                    // Accept any valid email and password
                    if (isValidEmail(email) && password.length >= 3) {
                        currentUser = {
                            email: email,
                            name: email.split('@')[0],
                            avatar: email.charAt(0).toUpperCase()
                        };

                        // Hide login screen and show main app
                        loginScreen.style.display = 'none';
                        mainApp.style.display = 'block';
                        
                        // Set user initial
                        userInitial.textContent = currentUser.avatar;
                        
                        console.log('Login successful:', currentUser);
                    } else {
                        showError('Please enter a valid email and password (min 3 characters)');
                    }

                    // Reset button state
                    loginBtn.textContent = 'Sign In';
                    loginBtn.disabled = false;
                }, 1000);
            });

            // Handle sign out
            signOutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                currentUser = null;
                
                // Show login screen and hide main app
                loginScreen.style.display = 'flex';
                mainApp.style.display = 'none';
                
                // Reset form
                loginForm.reset();
                hideError();
                
                // Hide profile menu
                profileMenu.classList.remove('show');
            });

            // Handle profile menu toggle
            profileIcon.addEventListener('click', function(e) {
                e.stopPropagation();
                profileMenu.classList.toggle('show');
            });

            // Close profile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!profileIcon.contains(e.target)) {
                    profileMenu.classList.remove('show');
                }
            });

            // Handle navigation
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Remove active class from all links
                    navLinks.forEach(l => l.classList.remove('active'));
                    
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    const category = this.dataset.category;
                    updateContent(category);
                });
            });

            // Handle search
            searchBox.addEventListener('input', function(e) {
                const query = e.target.value.toLowerCase().trim();
                filterMovies(query);
            });

            // Handle scroll effects
            window.addEventListener('scroll', function() {
                const header = document.getElementById('header');
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });

            // Handle hero buttons
            document.getElementById('heroPlay').addEventListener('click', function() {
                alert('Play button clicked! In a real app, this would start video playback.');
            });

            document.getElementById('heroInfo').addEventListener('click', function() {
                alert('More Info button clicked! This would show detailed information about the content.');
            });

            // Handle movie card clicks
            document.querySelectorAll('.movie-card').forEach(card => {
                card.addEventListener('click', function() {
                    const title = this.querySelector('.movie-title').textContent;
                    alert(`You clicked on: ${title}\n\nIn a real app, this would open the movie details or start playback.`);
                });
            });

            // Helper functions
            function showError(message) {
                errorMessage.textContent = message;
                errorMessage.style.display = 'block';
            }

            function hideError() {
                errorMessage.style.display = 'none';
            }

            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            function updateContent(category) {
                const sections = document.querySelectorAll('.content-section');
                
                switch(category) {
                    case 'home':
                        sections.forEach(section => section.style.display = 'block');
                        break;
                    case 'tv':
                        sections.forEach((section, index) => {
                            section.style.display = index === 0 ? 'block' : 'none';
                        });
                        break;
                    case 'movies':
                        sections.forEach((section, index) => {
                            section.style.display = index === 2 ? 'block' : 'none';
                        });
                        break;
                    case 'trending':
                        sections.forEach((section, index) => {
                            section.style.display = index === 0 ? 'block' : 'none';
                        });
                        break;
                    case 'mylist':
                        sections.forEach((section, index) => {
                            section.style.display = index === 1 ? 'block' : 'none';
                        });
                        break;
                }
            }

            function filterMovies(query) {
                const movieCards = document.querySelectorAll('.movie-card');
                
                if (query === '') {
                    movieCards.forEach(card => {
                        card.style.display = 'block';
                    });
                    return;
                }

                movieCards.forEach(card => {
                    const title = card.querySelector('.movie-title').textContent.toLowerCase();
                    if (title.includes(query)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }

            console.log('Netflix Clone initialized successfully!');
        }
    </script>
</body>
</html>
