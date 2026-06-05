
// UNIQUE-FEATURES.JS - Dark Mode, Chatbot, Enrollment, Modals, Download, Animations


// Wait for DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. INITIALIZATION LOG...
    
    console.log('✅ EduFuture Academy features loaded');
    
    
    // 2. LOADING ANIMATION...
    
    // Get loader element
    const loader = document.getElementById('loader');
    if (loader) {
        // Hide loader after 1.5 seconds with fade effect
        setTimeout(() => {
            loader.classList.add('hide');  // Add hide class for fade out
            setTimeout(() => { 
                loader.style.display = 'none';  // Remove from DOM after animation
            }, 500);
        }, 1500);
    }
    
    // 3. DARK MODE TOGGLE...
    
    
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        // Toggle dark mode on button click
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            // Change button icon based on mode
            darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
            // Save preference to localStorage
            localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        });
        
        // Load saved preference from localStorage
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️';
        }
    }
    
    // 4. BACK TO TOP BUTTON...
    
    // Create back to top button dynamically
    const backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    document.body.appendChild(backToTop);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 300);
    });
    
    // Scroll to top on button click
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    
    // 5. PROGRESS BARS (Scroll Progress)...
    
    const progressBar = document.getElementById('progressBar');
    const readingProgress = document.getElementById('readingProgress');
    
    // Update progress bars on scroll...
    window.addEventListener('scroll', () => {
        // Calculate scroll percentage
        const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (progressBar) progressBar.style.width = progress + '%';
        if (readingProgress) readingProgress.style.width = progress + '%';
    });
    
    // 6. TYPING ANIMATION (Hero Section)...
    
    const words = ['Code', 'Create', 'Innovate', 'Succeed', 'Build'];
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    const typedText = document.getElementById('typedText');
    
    if (typedText) {
        function typeEffect() {
            const currentWord = words[wordIndex];
            // Type or delete characters
            typedText.textContent = isDeleting 
                ? currentWord.substring(0, charIndex - 1) 
                : currentWord.substring(0, charIndex + 1);
            
            isDeleting ? charIndex-- : charIndex++;
            
            // Word completed - start deleting after pause
            if (!isDeleting && charIndex === currentWord.length) { 
                isDeleting = true; 
                setTimeout(typeEffect, 2000); 
                return; 
            }
            
            // Word fully deleted - move to next word
            if (isDeleting && charIndex === 0) { 
                isDeleting = false; 
                wordIndex = (wordIndex + 1) % words.length; 
            }
            
            // Continue animation with different speeds
            setTimeout(typeEffect, isDeleting ? 100 : 150);
        }
        typeEffect();
    }
    
    // 7. LIVE CLOCK WITH DYNAMIC GREETING...
    
    function updateClock() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        // Format time (12-hour format)
        const timeString = `${hours % 12 || 12}:${minutes}:${seconds} ${hours >= 12 ? 'PM' : 'AM'}`;
        
        // Format date
        const dateString = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        // Dynamic greeting based on time of day
        let greeting = hours < 12 ? '🌅 Good Morning! Ready to learn?' 
            : hours < 17 ? '☀️ Good Afternoon! Keep growing!' 
            : hours < 21 ? '🌤️ Good Evening!' 
            : '🌙 Good Night! Rest up!';
        
        // Update DOM elements
        const greetingEl = document.getElementById('greeting');
        const timeEl = document.getElementById('currentTime');
        const dateEl = document.getElementById('currentDate');
        
        if (greetingEl) greetingEl.textContent = greeting;
        if (timeEl) timeEl.textContent = timeString;
        if (dateEl) dateEl.textContent = dateString;
    }
    
    updateClock();
    setInterval(updateClock, 1000);  // Update every second
    
    // 8. STATS COUNTER (Animated Numbers)...
    
    const counters = document.querySelectorAll('.stat-number[data-target]');
    const statsSection = document.getElementById('statsSection');
    let counterStarted = false;
    
    function startCounters() {
        if (counterStarted) return;
        counterStarted = true;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 60;  // Complete in 60 steps
            
            const updateCounter = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(updateCounter);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 30);  
        });
    }
    
    // Trigger counter when stats section comes into view
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => { 
            if (entry.isIntersecting) startCounters(); 
        });
    }, { threshold: 0.3 });  // Trigger when 30% visible
    
    if (statsSection) statsObserver.observe(statsSection);
    
    // 9. MODAL REFERENCES...
    
    const enrollModal = document.getElementById('enrollModal');
    const certModal = document.getElementById('certificateModal');
    const dummyIdModal = document.getElementById('idCardModal');
    const realIdModal = document.getElementById('realIdCardModal');
    
    // 10. DUMMY CERTIFICATE PREVIEW...
    
    document.getElementById('openCertPreviewBtn')?.addEventListener('click', () => {
        // Set current date on dummy certificate
        const dummyDate = document.getElementById('dummyCertDate');
        const dummyId = document.getElementById('dummyCertId');
        
        if (dummyDate) dummyDate.textContent = new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
        });
        if (dummyId) dummyId.textContent = 'EF-CERT-DEMO-' + Math.floor(Math.random() * 10000);
        
        if (certModal) certModal.classList.add('active');
    });
    
    // 11. DUMMY ID CARD PREVIEW...
    
    document.getElementById('openIdCardBtn')?.addEventListener('click', () => {
        if (dummyIdModal) dummyIdModal.classList.add('active');
    });
    
    // 12. SHOW REAL ID CARD (After Enrollment)...
    
    function showRealIdCard(name, course, idNumber, validTill) {
        const realNameEl = document.getElementById('realIdCardName');
        const realCourseEl = document.getElementById('realIdCardCourse');
        const realIdNumberEl = document.getElementById('realIdCardNumber');
        const realValidEl = document.getElementById('realIdCardValid');
        
        if (realNameEl) realNameEl.textContent = name;
        if (realCourseEl) realCourseEl.textContent = course;
        if (realIdNumberEl) realIdNumberEl.textContent = idNumber;
        if (realValidEl) realValidEl.textContent = validTill;
        
        if (realIdModal) realIdModal.classList.add('active');
    }
    
    // 13. DOWNLOAD REAL ID CARD AS PNG...
    
    const downloadRealIdCard = document.getElementById('downloadRealIdCard');
    if (downloadRealIdCard) {
        downloadRealIdCard.addEventListener('click', async () => {
            const idCardElement = document.getElementById('realIdCard');
            const studentName = document.getElementById('realIdCardName')?.textContent;
            
            if (!idCardElement) return;
            
            // Check if user has enrolled
            if (!studentName || studentName === 'Loading...') {
                Swal.fire({ 
                    icon: 'info', 
                    title: 'No Enrollment Found', 
                    text: 'Please enroll first to get your personalized ID Card!', 
                    confirmButtonColor: '#D4AF37' 
                });
                return;
            }
            
            // Show loading alert
            Swal.fire({ 
                title: 'Generating Your ID Card...', 
                text: 'Please wait...', 
                allowOutsideClick: false, 
                didOpen: () => { Swal.showLoading(); } 
            });
            
            try {
                // Capture ID card as canvas
                const canvas = await html2canvas(idCardElement, { 
                    scale: 3, 
                    backgroundColor: null, 
                    logging: false 
                });
                
                // Create download link
                const link = document.createElement('a');
                link.download = `EduFuture_ID_${studentName.replace(/\s/g, '_')}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                
                // Success message
                Swal.fire({ 
                    icon: 'success', 
                    title: 'ID Card Downloaded!', 
                    text: `Your personalized ID Card for ${studentName} has been saved!`, 
                    confirmButtonColor: '#D4AF37' 
                });
            } catch (error) {
                // Error message
                Swal.fire({ 
                    icon: 'error', 
                    title: 'Download Failed', 
                    text: 'Please try again!', 
                    confirmButtonColor: '#D4AF37' 
                });
            }
        });
    }
    
    // 14. ENROLLMENT FORM SUBMIT...
    
    const enrollForm = document.getElementById('enrollForm');
    if (enrollForm) {
        enrollForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const studentName = document.getElementById('studentName')?.value.trim();
            const studentEmail = document.getElementById('studentEmail')?.value.trim();
            const studentPhone = document.getElementById('studentPhone')?.value.trim();
            const selectedCourse = document.getElementById('selectedCourse')?.value;
            
            // Validate required fields
            if (!studentName || !studentEmail || !studentPhone) {
                Swal.fire({ 
                    icon: 'warning', 
                    title: 'Missing Information', 
                    text: 'Please fill all required fields!', 
                    confirmButtonColor: '#D4AF37' 
                });
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(studentEmail)) {
                Swal.fire({ 
                    icon: 'warning', 
                    title: 'Invalid Email', 
                    text: 'Please enter a valid email address!', 
                    confirmButtonColor: '#D4AF37' 
                });
                return;
            }
            
           
            
            // Generate unique ID and validity date
            const idNumber = 'EF' + Date.now();
            const today = new Date();
            const validTill = new Date(today.setMonth(today.getMonth() + 12));
            const validTillDate = validTill.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
            });
            
            // Save student data to localStorage
            const studentData = {
                name: studentName,
                email: studentEmail,
                phone: studentPhone,
                course: selectedCourse,
                id: idNumber,
                validTill: validTillDate,
                enrolledDate: new Date().toISOString()
            };
            localStorage.setItem('enrolledStudent', JSON.stringify(studentData));
            
            // Close enrollment modal
            if (enrollModal) enrollModal.classList.remove('active');
            
            // Show success message
            Swal.fire({
                icon: 'success',
                title: '🎉 Enrollment Successful!',
                html: `<div style="text-align: left;">
                        <p><strong>Welcome ${studentName}!</strong></p>
                        <p>📚 <strong>Course:</strong> ${selectedCourse}</p>
                        <p>🆔 <strong>ID:</strong> ${idNumber}</p>
                        </div>`,
                confirmButtonText: '📥 View My ID Card',
                confirmButtonColor: '#D4AF37',
                showCancelButton: true,
                cancelButtonText: 'Later'
            }).then((result) => {
                if (result.isConfirmed) {
                    showRealIdCard(studentName, selectedCourse, idNumber, validTillDate);
                }
            });
            
            enrollForm.reset();
        });
    }

    
    // 15. OPEN ENROLLMENT MODAL...
    
    // Open from "Start Free Trial" button
    document.getElementById('openEnrollBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (enrollModal) enrollModal.classList.add('active');
    });
    
    // Open from any "Enroll Now" button on course cards
    document.querySelectorAll('.enroll-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Preselect course in dropdown
            const course = btn.getAttribute('data-course');
            const courseSelect = document.getElementById('selectedCourse');
            if (courseSelect && course) {
                for (let i = 0; i < courseSelect.options.length; i++) {
                    if (courseSelect.options[i].value.includes(course)) {
                        courseSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            if (enrollModal) enrollModal.classList.add('active');
        });
    });
    
    // 16. CLOSE MODALS...
    
    // Close buttons
    document.getElementById('closeModalBtn')?.addEventListener('click', () => { 
        if (enrollModal) enrollModal.classList.remove('active'); 
    });
    document.getElementById('closeCertModal')?.addEventListener('click', () => { 
        if (certModal) certModal.classList.remove('active'); 
    });
    document.getElementById('closeIdCardModal')?.addEventListener('click', () => { 
        if (dummyIdModal) dummyIdModal.classList.remove('active'); 
    });
    document.getElementById('closeRealIdCardModal')?.addEventListener('click', () => { 
        if (realIdModal) realIdModal.classList.remove('active'); 
    });
    
    // Close modals when clicking outside (on overlay)
    [enrollModal, certModal, dummyIdModal, realIdModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        }
    });
    
    // 17. FIXED CHATBOT WITH PROPER RESPONSES...
    
    const chatbotWidget = document.getElementById('chatbotWidget');
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    
    // Toggle chatbot open/close
    if (chatbotToggle && chatbotWidget) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWidget.classList.toggle('open');
        });
    }
    
    // 17a. CHATBOT RESPONSE FUNCTION...
    
    function getChatResponse(userMessage) {
        const msg = userMessage.toLowerCase().trim();
        
        // Show all courses
        if (msg.includes('show courses') || msg.includes('courses') && !msg.includes('fees') && !msg.includes('duration')) {
            return "📚 **Our Top Courses:**\n\n• 💻 **Full Stack Web Development** - Rs:4,999\n• 🤖 **Data Science & AI** - Rs:6,499\n• 🎨 **UI/UX Design** - Rs:3,999\n• ☁️ **Cloud Computing (AWS)** - Rs:4,499\n\nType any course name for details!";
        }
        
        // Course fees
        if (msg.includes('course fees') || msg.includes('fees') && !msg.includes('duration')) {
            return "💰 **Course Fees:**\n\n• Full Stack Web Development: Rs:4,999\n• Data Science & AI: Rs:6,499\n• UI/UX Design: Rs:3,999\n• Cloud Computing (AWS): Rs:4,499\n\n✅ EMI options available!";
        }
        
        // Course duration
        if (msg.includes('course duration') || msg.includes('duration') || msg.includes('how long')) {
            return "⏱️ **Course Durations:**\n\n• Full Stack: 6 months (40 hours)\n• Data Science: 8 months (50 hours)\n• UI/UX Design: 4 months (30 hours)\n• Cloud Computing: 5 months (35 hours)";
        }
        
        // How to enroll
        if (msg.includes('how to enroll') || msg.includes('enroll') && !msg.includes('info')) {
            return "🎓 **How to Enroll:**\n\n1. Click 'Enroll Now' on any course card\n2. Fill your details in the form\n3. Complete payment\n4. Get your ID Card instantly!\n\n✅ Start your free trial today!";
        }
        
        // Certificate info
        if (msg.includes('certificate info') || msg.includes('certificate')) {
            return "📜 **Certificate Information:**\n\n• Industry-recognized certificates\n• View Dummy Certificate for preview\n• Real certificate after completion\n• Includes Academy seal & signatures\n• Share on LinkedIn!";
        }
        
        // ID Card info
        if (msg.includes('id card info') || msg.includes('id card')) {
            const hasEnrolled = localStorage.getItem('enrolledStudent');
            if (hasEnrolled) {
                const student = JSON.parse(hasEnrolled);
                return `🪪 **Your ID Card:**\n\nName: ${student.name}\nCourse: ${student.course}\nID: ${student.id}\n\n✅ Click 'View Dummy ID Card' to see and download!`;
            } else {
                return "🪪 **ID Card Information:**\n\n• Dummy ID Card available for preview\n• After enrollment, get personalized ID Card\n• Download as PNG after enrollment";
            }
        }
        
        // Full Stack course details
        if (msg.includes('full stack') || msg.includes('web development')) {
            return "💻 **Full Stack Web Development** - Rs:4,999\n\n• 6 months duration\n• 120+ lectures, 40+ hours\n• Learn: HTML, CSS, JavaScript, React, Node.js, MongoDB\n• Real-world projects\n• Start Date: June 15, 2026 (7-9 PM)";
        }
        
        // Data Science course details
        if (msg.includes('data science') || msg.includes('ai')) {
            return "🤖 **Data Science & AI** - Rs:6,499\n\n• 8 months duration\n• 150+ lectures, 50+ hours\n• Learn: Python, Pandas, ML, Deep Learning, NLP\n• Industry projects\n• Start Date: June 20, 2026 (8-10 PM)";
        }
        
        // UI/UX course details
        if (msg.includes('ui/ux') || msg.includes('design')) {
            return "🎨 **UI/UX Design** - Rs:3,999\n\n• 4 months duration\n• 90+ lectures, 30+ hours\n• Learn: Figma, Adobe XD, Prototyping\n• Build portfolio\n• Start Date: July 1, 2026 (6-8 PM)";
        }
        
        // Cloud Computing course details
        if (msg.includes('cloud') || msg.includes('aws')) {
            return "☁️ **Cloud Computing (AWS)** - Rs:4,499\n\n• 5 months duration\n• 100+ lectures, 35+ hours\n• Learn: EC2, S3, Lambda, DevOps\n• AWS Certification prep\n• Start Date: July 10, 2026 (7-9 PM)";
        }
        
        // Greetings
        if (msg.match(/hello|hi|hey|namaste|hola/)) {
            return "👋 Hello! Welcome to EduFuture Academy! How can I help you? Try asking:\n• Show courses\n• Course fees\n• Course duration\n• How to enroll\n• Certificate info\n• ID Card info";
        }
        
        // Default response
        return "🤔 I'm here to help! Please ask me about:\n\n• Show courses\n• Course fees\n• Course duration\n• How to enroll\n• Certificate info\n• ID Card info\n\nOr type a specific course name like 'Full Stack' or 'Data Science'!";
    }
    
    // 17b. SEND CHAT MESSAGE...
    
    function sendChatMessage() {
        if (!chatbotInput || !chatbotMessages) return;
        const message = chatbotInput.value.trim();
        if (!message) return;
        
        // Add user message to chat
        const userDiv = document.createElement('div');
        userDiv.className = 'chatbot-message user';
        userDiv.textContent = message;
        chatbotMessages.appendChild(userDiv);
        chatbotInput.value = '';
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Show typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot';
        typingDiv.textContent = '🤔 Thinking...';
        typingDiv.style.opacity = '0.7';
        chatbotMessages.appendChild(typingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // Get and display bot response after delay
        setTimeout(() => {
            chatbotMessages.removeChild(typingDiv);
            const botDiv = document.createElement('div');
            botDiv.className = 'chatbot-message bot';
            const response = getChatResponse(message);
            botDiv.innerHTML = response.replace(/\n/g, '<br>');
            chatbotMessages.appendChild(botDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 500);
    }
    
    // Send message on button click
    if (chatbotSend) chatbotSend.addEventListener('click', sendChatMessage);
    
    // Send message on Enter key press
    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendChatMessage();
        });
    }
    
    // 17c. ADD QUICK SUGGESTION BUTTONS...
    
    function addQuickSuggestions() {
        const suggestions = ["Show courses", "Course fees", "Course duration", "How to enroll", "Certificate info", "ID Card info"];
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'chatbot-suggestions';
        
        suggestions.forEach(suggestion => {
            const btn = document.createElement('button');
            btn.textContent = suggestion;
            btn.onclick = () => {
                chatbotInput.value = suggestion;
                sendChatMessage();
            };
            suggestionsDiv.appendChild(btn);
        });
        
        const chatContainer = document.querySelector('.chatbot-messages');
        if (chatContainer && !document.querySelector('.chatbot-suggestions')) {
            chatContainer.appendChild(suggestionsDiv);
        }
    }
    
    // Add suggestions after 1 second
    setTimeout(addQuickSuggestions, 1000);
    
    // 18. CUSTOM CURSOR (Desktop Only)...
    
    // Only enable on devices wider than 768px
    if (window.innerWidth > 768) {
        const customCursor = document.getElementById('customCursor');
        const customCursorDot = document.getElementById('customCursorDot');
        
        if (customCursor && customCursorDot) {
            // Move cursor with mouse
            document.addEventListener('mousemove', (e) => {
                customCursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
                customCursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });
            
            // Enlarge cursor when hovering over interactive elements
            document.querySelectorAll('a, button, .btn').forEach(link => {
                link.addEventListener('mouseenter', () => {
                    customCursor.style.width = '60px';
                    customCursor.style.height = '60px';
                });
                link.addEventListener('mouseleave', () => {
                    customCursor.style.width = '40px';
                    customCursor.style.height = '40px';
                });
            });
        }
    }
    
    // 19. COMPLETION LOG...
    
    console.log('🚀 All features initialized');
});