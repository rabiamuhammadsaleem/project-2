# 🎓 EduFuture Academy - Responsive Educational Platform

A fully responsive educational platform with dark mode, AI chatbot, enrollment system, certificate generation, and downloadable ID cards. Built as an internship project for DecodeLabs.

---

## ✨ Features

### Core Features
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Dark mode toggle with localStorage persistence
- ✅ Live clock with dynamic greetings (Morning/Afternoon/Evening/Night)
- ✅ Typing animation in hero section
- ✅ Animated statistics counters
- ✅ Reading progress bar

### Course Management
- 📚 4 premium courses with details
- 📅 Batch schedule table with status indicators (Open/Limited/Closed)
- 👨‍🏫 Expert instructors section

### Enrollment & ID Card System
- 📝 Course enrollment form with validation
- 🎓 Dummy certificate preview
- 🪪 Dummy ID card preview
- 🆔 Personalized ID card generation after enrollment
- 📥 Download ID card as PNG (html2canvas)

### AI Chatbot
- 🤖 Smart chatbot with course information
- 💬 Quick suggestion buttons
- 📊 Real-time responses about fees, duration, enrollment

### UI/UX Features
- 🪟 Glassmorphism design
- 🎨 3D card hover effects
- 🔘 Animated buttons
- 💫 Custom cursor (desktop)
- 🧭 Smooth scrolling navigation
- 📱 Hamburger menu for mobile

---

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling, Grid, Flexbox, Animations |
| JavaScript (Vanilla) | Interactivity |
| SweetAlert2 | Beautiful popup alerts |
| html2canvas | ID Card PNG download |

---

## 📱 Responsive Breakpoints

| Breakpoint | Target Device |
|------------|---------------|
| 1024px+ | Desktop |
| 768px - 1023px | Tablet |
| 480px - 767px | Mobile |
| < 480px | Small Mobile |
| Landscape | Orientation handling |

---

## 🚀 How to Run

1. Download or clone the repository
2. Make sure all files are in correct folder structure:
   - `index.html` in root
   - `css/` folder with all CSS files
   - `js/` folder with all JS files
3. Open `index.html` in any modern browser
4. No build steps or dependencies required (CDNs are used)

---

## 🎯 Project Requirements Met

| Requirement | Status |
|-------------|--------|
| Responsive webpage across screen sizes | ✅ |
| CSS Media Queries used | ✅ |
| Responsive navigation | ✅ |
| Proper spacing and alignment | ✅ |

---

## 🔧 Key Features Explanation

### Enrollment Flow
1. User clicks "Enroll Now" on any course card
2. Fills form (name, email, phone, course)
3. Validation checks email format
4. SweetAlert2 confirmation with option to view ID Card
5. Personalized ID Card generated and downloadable as PNG

### Chatbot Commands
| User Says | Bot Response |
|-----------|--------------|
| Show courses | Lists all courses with prices |
| Course fees | Shows fee for each course |
| Course duration | Shows duration for each course |
| How to enroll | Step-by-step enrollment guide |
| Certificate info | Certificate details |
| ID Card info | ID card info (personalized if enrolled) |
| Full Stack | Full Stack course details |
| Data Science | Data Science course details |




## 📝 License

This project was created for internship purposes at **DecodeLabs**.


---

## 🙏 Acknowledgments

- SweetAlert2 for beautiful alerts
- html2canvas for PNG conversion
- Font Awesome for icons
- DecodeLabs for project guidelines