# Finova - Pro Expense & Meal Tracker 🚀



**Finova** is a highly secure, smart, and fully responsive web application designed to track personal daily expenses and manage meal logs effortlessly. Built with a modern glass-morphism UI, it features real-time cloud synchronization, automated monthly archiving, and interactive visual reports.

🌐 **Live Demo:** [https://finova-track.web.app/](https://finova-track.web.app/)

---

## ✨ Key Features

* **🔐 Google Authentication:** Secure login using Firebase Auth. User data is strictly tied to their Google account and synced across all devices.
* **💸 Smart Expense Tracking:** Add, edit, or delete transactions with precise date, time, and custom category segmentation.
* **📊 Interactive Data Visualization:** Real-time multi-line charts (powered by Chart.js) to monitor monthly spending trends per category.
* **🍽️ Automated Meal Manager:** Automatically adds 2 meals for every new day. Users can manually adjust or edit specific dates via a dedicated modal.
* **🗄️ Auto-Archiving System:** Seamlessly transitions into a new month, automatically securely saving the previous month's data into the "Past Months Archive".
* **📄 PDF Report Export:** Generate and download beautifully formatted segment-wise financial reports using `html2pdf.js`.
* **📱 Fully Responsive:** Optimized for both desktop and mobile devices with a smooth, app-like mobile navigation experience.
* **🌐 Bilingual Guidelines:** Built-in comprehensive user manual available in both English and Bengali.

---

## 🛠️ Technologies Used

* **Frontend:** HTML5, Vanilla CSS3 (Custom Properties, Flexbox, CSS Grid), JavaScript (ES6+ Modules)
* **Backend & Database:** Google Firebase (Authentication & Firestore)
* **Libraries:** * [Chart.js](https://www.chartjs.org/) (Data Visualization)
    * [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/) (PDF Generation)
    * [FontAwesome](https://fontawesome.com/) (Icons)
* **Hosting:** Firebase Hosting

---

## 🚀 Run Locally

To run this project locally, follow these steps:

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/your-username/finova-tracker.git
   cd finova-tracker
   \`\`\`

2. **Configure Firebase:**
   * Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
   * Enable **Google Analytics** (optional).
   * Go to **Authentication** and enable the **Google** sign-in provider.
   * Go to **Firestore Database**, create a database, and update the rules:
     \`\`\`javascript
     rules_version = '2';
     service cloud.firestore {
       match /databases/{database}/documents {
         match /users/{userId} {
           allow read, write: if request.auth != null && request.auth.uid == userId;
         }
       }
     }
     \`\`\`
   * Register a web app in your Firebase project to get the config object.
   * Open `index.html` and replace the placeholder config block at the bottom with your own credentials:
     \`\`\`javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
       projectId: "YOUR_PROJECT_ID",
       // ... other config variables
     };
     \`\`\`

3. **Launch the App:**
   Simply open the `index.html` file in your browser, or use an extension like VS Code Live Server.

---

## 👨‍💻 Developed By

**S.M. Tahmid Hasan Shahria**
* Undergraduate Student, B.Sc. in Computer Science & Engineering (UIU)
* Founder & CEO at Delta Store
* Let's connect: [Facebook](https://www.facebook.com/itstahmid) | [GitHub](https://github.com/your-username)
