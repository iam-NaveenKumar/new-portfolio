# Professional AI-Powered Portfolio

A high-performance, visually stunning portfolio for **Naveen Kumar**, built with modern web technologies and focused on a "minimalist tech" aesthetic.

## 🚀 Live Demo
[View Live Portfolio](https://your-live-link-here.com)

## ✨ Key Features

### 💻 Interactive Developer CLI
A custom-built React terminal emulator featuring command history, auto-focus, and integrated page controls.
- **Commands**: 
  - `help`: Lists all available commands.
  - `about`: Professional summary and focus areas.
  - `stack`: Displays tech expertise and scrolls to the Skills section.
  - `projects`: Navigates directly to the Projects section.
  - `cv` / `resume`: Triggers direct download of the latest PDF resume.
  - `contact`: Scrolls to the contact form and displays social links.
  - `clear`: Purges terminal history.
  - `exit`: Closes the terminal window.

### 🌦️ Immersive Weather Effects
Dynamic, full-screen particle systems triggered directly by the CLI.
- **Rain (`rain`)**: Realistic falling rain with glassmorphism interactions.
- **Snow (`snow`)**: Calm, slow-falling snow for a winter aesthetic.
- **Control**: Effects automatically clear after **15 seconds** to maintain performance, or can be stopped manually using the `end` command.

### 🎭 Universal Staggered Entrance
A proprietary animation system using **Framer Motion** variants. Every section (Banner, Skills, Experience, Projects, Contact, Footer) reveals its children sequentially for a "perfect landing page" flow.

### 💎 Premium Tech Aesthetic
- **Glassmorphism**: Consistent design system using `backdrop-filter`, semi-transparent borders, and HSL-tailored accent colors.
- **Floating Utilities**: Scroll-aware "Back to Top" button and interactive terminal toggle.
- **Mobile-First Optimization**: Custom CSS media queries for high-fidelity rendering on all screen sizes.

## 🛠️ Tech Stack

- **Frontend**: React.js 18
- **Styling**: Vanilla CSS, React Bootstrap
- **Animations**: Framer Motion, Animate.css
- **Backend (Contact)**: Node.js / Serverless API integration
- **Building**: Vite (Lightning fast HMR)

## 📦 Project Structure

```text
src/
├── assets/          # Images, logos, and icons
├── components/      # UI Components (NavBar, WeatherEffects, Terminal, etc.)
├── api/             # API handlers (e.g., Contact form)
└── App.jsx          # Main application architecture
```

---
*Designed and built by Naveen Kumar — 2026*
