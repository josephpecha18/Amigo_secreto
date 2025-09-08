# 🎁 Secret Friend (Amigo Secreto)
<p><small>
A lightweight and interactive web app to organize your very own <strong>Secret Friend</strong> draw.
Built with <strong>HTML, CSS, and JavaScript</strong>, this project brings a playful yet polished way to add, manage, and randomly pick friends for your gift exchange.
</small></p>

---
## 🚀 Live Demo
[![Open in GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue)](https://josephpecha18.github.io/Amigo_secreto/)

---
## 🎬 Preview
![Demo](./assets/AnimationWebSite.gif)

---

## ✨ Features

- **Add Friends** ➝ Input full names (first and last) with validation for proper formatting.  
- **Unique Entries** ➝ Prevents duplicate names from being added.  
- **Remove Friends** ➝ Delete any participant before the draw.  
- **Random Draw** ➝ Fairly selects a random friend from the list.  
- **State Management** ➝ Buttons automatically enable/disable depending on the number of participants.  
- **Reset Option** ➝ Start fresh with one click — **available only after a draw** (by design). 
- **Responsive Design** ➝ Works across desktop and mobile devices.

---
## 🧪 Testing

This project includes a **Jest + jsdom** test suite aligned with the app’s real UX and DOM behavior.

**What’s covered**
- Initial disabled state for **Draw** and **Reset**.  
- Empty/invalid input flows (alerts + no DOM additions).  
- Duplicate prevention.  
- Enabling **Draw** only when there are **2+** valid names.  
- Removing specific participants with their delete button.  
- **Reset** flow: becomes available **only after** a draw; clears list, result, and input; re-disables **Draw**.  
- Draw behavior: renders a single result and disables relevant controls.  
- Input is cleared after a successful add.  
- Delete buttons keep their base class **`.eliminar-button`** and also receive a disabled-state class after the draw (so they remain discoverable by tests).

### How tests run (technical notes)

Tests use **Jest + jsdom** with **ESM** (`import { jest } from "@jest/globals"`).

The suite evaluates `app.js` and explicitly exposes functions to `window`:

- `window.agregarAmigo`, `window.sortearAmigo`, `window.reiniciarAmigos`.

This mirrors how the HTML uses `onclick="..."` but avoids brittle coupling in jsdom.

For “0” and “1” participant scenarios, tests call the function directly (instead of clicking a disabled button) to validate alert messages without violating the disabled-state UX.

### Run locally

```bash
# Install deps
npm install

# Run tests
npm test
```
---

## 🛠️ Tech Stack

- **HTML5** ➝ Semantic structure for accessibility and clarity.  
- **CSS3** ➝ Custom styles with responsive breakpoints for mobile usability.  
- **Vanilla JavaScript** ➝ Handles all app logic, from adding friends to random selection.  

---

## 🚀 Getting Started

1. Clone this repository:  
   ```bash
   git clone https://github.com/josephpecha18/Amigo_secreto.git
   ```
2. Navigate to the project folder:  
   ```bash
   cd Amigo_secreto
   ```
3. Open `index.html` in your favorite browser.  

That’s it—no extra dependencies required!  

---

## 📸 Demo Preview

**Main Page:**  
- Add your friends' names.  
- View a dynamic list of participants.  

**Draw Result:**  
- A randomly chosen friend is displayed in a styled results section.  

---

## 📂 Project Structure

```
├── index.html   # Main HTML page
├── app.js       # Application logic
├── style.css    # Styling rules
└── assets/      # Icons & images
```

---

## ⚡ Example Workflow

1. Enter names like: `Alice Johnson`, `Bob Smith`.  
2. Remove anyone with the ❌ button if needed.  
3. Click **Draw Friend** to reveal the lucky match.  
4. Use **Reset** to clear and start a new round.  

---

## 🎨 Why This Project?

This project was designed to **strengthen programming logic** while creating something **fun, useful, and shareable**.  
It’s a great example of combining **DOM manipulation**, **form validation**, and **stateful interactions** into a simple web application.  

---

## 📜 License

This project is released under the **MIT License** – feel free to fork, modify, and adapt for your own holiday gatherings!  
