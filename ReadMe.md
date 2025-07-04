# DualSpark Portfolio

A modern, interactive developer portfolio built with **React**, featuring:

- A dynamic glassy/cyan theme
- Animated 3D globe with orbiting rings and particles (Three.js)
- Smooth section navigation with react-scroll
- Responsive navbar with mobile dropdown
- Animated splash cursor effect
- AOS-powered scroll animations

---

## 🚀 Features

- **Glassy, Modern UI:** Uses Tailwind CSS and custom styles for a sleek, glassmorphic look.
- **Animated Navbar:** Responsive, with a logo-triggered dropdown on mobile.
- **3D Globe:** Interactive, animated globe with orbiting rings and space-like particles.
- **Splash Cursor:** Custom animated cursor effect for extra flair.
- **Section Navigation:** Smooth scrolling to Home, Projects, Skills, and Contact sections.
- **Contact Form:** Integrated with Formspree for easy messaging.
- **AOS Animations:** Scroll-triggered animations for engaging transitions.

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/dualspark_portfolio.git
cd dualspark_portfolio
npm install
# or
yarn install
```

### Running the Project

```bash
npm start
# or
yarn start
```

Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

---

## 📁 Project Structure

```
src/
  components/
    Navbar.jsx
    HomeSection.jsx
    ProjectsSection.jsx
    SkillsSection.jsx
    ContactSection.tsx
    SplashCursor/
      SplashCursor.jsx
    Footer.jsx
  App.jsx
  index.css
  ...
```

---

## ✨ Customization

- **Theme:** Edit Tailwind classes or `index.css` for colors and glass effects.
- **Navbar Links:** Update `navLinks` in `Navbar.jsx` to add/remove sections.
- **Globe:** Tweak globe/ring/particle settings in `ContactSection.tsx` for a unique look.
- **Contact Form:** Change the Formspree endpoint in `ContactSection.tsx` to your own.

---

## 📦 Built With

- [React](https://reactjs.org/)
- [Three.js](https://threejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [AOS](https://michalsnik.github.io/aos/)
- [react-scroll](https://www.npmjs.com/package/react-scroll)

---

## 📝 License

MIT License

---

## 🙏 Credits

- Inspired by modern glassmorphism and interactive portfolio trends.
- 3D globe and splash cursor adapted from open-source creative coding demos.

---
