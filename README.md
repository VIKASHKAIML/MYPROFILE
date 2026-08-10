# Premium 3D Personal Portfolio — Vikash Kushwaha

A high-end, futuristic 3D personal portfolio website created for **Vikash Kushwaha**, Data Analytics Professional and Computer Science & Engineering (AI & ML) student.

Built strictly with **HTML5, Vanilla CSS3, Vanilla JavaScript, Three.js (CDN), and GSAP (CDN)**. Zero frontend frameworks (React, Next.js) or utility libraries (Tailwind, Bootstrap) were used.

---

## 🌟 Key Features

1. **Phase 1 — Cinematic 3D Compile / Boot Screen**:
   - Cyber-terminal compile stream outputting dynamic code snippets and system logs.
   - Progress bar (0% → 100%) with audio visualizer bars and status messages.
   - Smooth GSAP camera transition into the 3D hero viewport upon completion.
   - Skip intro option for fast navigation.

2. **Phase 2 — Interactive 3D Hero Section & Chroma Key Stage**:
   - Cyber ambient lighting composition with depth-of-field blur backdrop.
   - Orbiting interactive nodes (Python, Database, Microchip, Analytics).
   - Mouse-parallax 3D card tilt effect.
   - Dedicated silhouette portrait cutout with easy replacement markers (`<!-- REPLACE PROFILE IMAGE HERE -->`).

3. **Three.js WebGL 3D Canvas Background**:
   - Floating cyan and purple particle constellation starfield.
   - Wireframe icosahedron abstract geometry node.
   - Cyber digital floor grid with perspective camera tracking mouse coordinates.

4. **Interactive Sections**:
   - **About Me**: Glassmorphism overview, career objective, and animated count-up statistics.
   - **Skills Matrix**: 3D tilt categories for Data Analytics, Programming, AI/Tech, and Tools.
   - **Experience Timeline**: Glowing timeline for Video Analytics Intern at Data Corp Traffic.
   - **Featured Projects**: 3D hover cards with custom SVG graphics, tech tags, quick view modal popups, and source code link placeholders.
   - **Academic Timeline**: B.Tech CSE (AI & ML) (AKTU 76%), Intermediate (CBSE 66%), High School (CBSE 60%).
   - **Certifications & Workshops**: Floating glass cards for Ethical Hacking, AI Video Workflow, and Python.
   - **Contact Form**: Futuristic glass form with real-time input validation and toast success notification.

5. **Cinematic 3D Footer**:
   - Large bold typography ("LET'S CONNECT", "VIKASH KUSHWAHA").
   - 3D floating VK badge, magnetic back-to-top button, and quick navigation.

---

## 📁 Directory Structure

```text
d:/Portfolio_vk/
├── index.html                      # Main HTML structure & CDN references
├── style.css                       # Complete CSS design system, dark theme, glassmorphism
├── script.js                       # Three.js 3D engine, GSAP animations, compile screen & form logic
├── README.md                       # Detailed instructions & configuration manual
└── assets/
    ├── profile.png                 # Profile portrait cutout for Chroma-key composition
    ├── Vikash_Kushwaha_Resume.pdf  # PDF Resume document
    └── project/
        ├── project1_traffic.svg    # Traffic Analytics project visual
        └── project2_retail.svg     # Retail Sales Analytics project visual
```

---

## ⚙️ How to Customize / Replace Files

### 1. Replace Profile Image
Place your transparent PNG/WebP portrait image in `assets/profile.png`.
- In `index.html`, look for: `<!-- REPLACE PROFILE IMAGE HERE -->`
- In `script.js`, update the `USER_CONFIG.profileImage` variable:
  ```javascript
  const USER_CONFIG = {
    profileImage: 'assets/profile.png',
    ...
  };
  ```

### 2. Replace Resume PDF
Place your updated resume file in `assets/Vikash_Kushwaha_Resume.pdf`.
- All download buttons in `index.html` automatically reference `assets/Vikash_Kushwaha_Resume.pdf`.

### 3. Update Social Links (LinkedIn, GitHub, HackerRank)
In `script.js` or `index.html`, update the URLs inside `USER_CONFIG`:
```javascript
const USER_CONFIG = {
  linkedinUrl: 'https://linkedin.com/in/vikashkushwaha3045',
  githubUrl: 'https://github.com/vikashkushwaha3045',
  hackerrankUrl: 'https://hackerrank.com/vikashkushwaha3045'
};
```

---

## 🚀 Running Locally

Since the application uses standard HTML5, CSS3, and JavaScript with CDN resources, you can open `index.html` directly in any web browser or serve it using any HTTP server:

```bash
# Using Python builtin server
python -m http.server 8000

# Using Node live-server / npx
npx live-server
```

Then navigate to `http://localhost:8000`.
