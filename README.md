# Bulls and Cows / Picas y Fijas Game 🎮

![Mobile Screenshot](https://github.com/Yosolita1978/screenshoots/blob/main/2025/WhatsApp%20Image%202025-07-09%20at%206.38.08%20PM.jpeg?raw=true)

A **fully bilingual** implementation of the classic Bulls and Cows number guessing game, built with vanilla JavaScript, HTML, and CSS. Supports both English and Spanish with automatic language detection and cultural adaptations.

🎮 **Play now:** [https://www.picasyfijas.com](https://www.picasyfijas.com) | **Jugar ahora:** [https://www.picasyfijas.com/?lang=es](https://www.picasyfijas.com/?lang=es)

## 🌍 Language Support

This game is available in two languages:
- **English**: Bulls & Cows 🐂🐄
- **Spanish**: Picas y Fijas 🐓🐥

### Features
- **Auto-detection** of browser language (Spanish users automatically see Spanish interface)
- **One-click language switching** with flag buttons (🇺🇸/🇨🇴)
- **URL language parameters** for direct sharing (`?lang=es` or `?lang=en`)
- **Persistent language choice** - remembers your preference across visits
- **Cultural emoji adaptation** - different animals represent the game concepts in each language

## 🎯 Game Description

**Bulls and Cows** (English) / **Picas y Fijas** (Spanish) is a classic code-breaking game where:
- One player (the computer) thinks of a secret 4-digit number
- The other player tries to guess it within 10 attempts
- Each guess receives feedback:
  - **Bulls/Fijas** 🐂🐓: Correct digits in the correct position
  - **Cows/Picas** 🐄🐥: Correct digits in the wrong position

The game continues until you guess correctly or run out of attempts!

## ✨ Features

### Core Game Features
- **Random 4-digit secret number generation** (no duplicate digits)
- **Input validation** - ensures 4 different digits
- **Real-time feedback** with bulls/cows counting
- **10-attempt limit** with turn counter
- **Win/lose detection** with animated feedback
- **New game functionality** - start fresh anytime

### International Features
- **Bilingual interface** (English/Spanish)
- **Browser language detection**
- **Cultural emoji adaptations**
- **Translated game terminology**
- **SEO-optimized** with language-specific meta tags
- **Accessibility compliant** with proper lang attributes

### Social Features
- **Share your results** with emoji grids
- **WhatsApp sharing** - send your game results
- **Mastodon sharing** - post to your instance
- **Copy to clipboard** - share anywhere
- **Mobile-responsive design** - play on any device

### Technical Features
- **Progressive Web App ready**
- **No external dependencies** - pure vanilla JS
- **localStorage persistence** for language preferences
- **URL parameter support** for direct language links
- **Error handling** with graceful fallbacks
- **Production-ready** code

## 🚀 Getting Started

### Prerequisites
- A modern web browser with JavaScript enabled
- No server required - runs entirely client-side

### Installation
1. **Clone this repository**
   ```bash
   git clone https://github.com/Yosolita1978/BullsAndCows.git
   cd BullsAndCows
   ```

2. **Open in browser**
   ```bash
   # Simply open the index.html file in your browser
   open index.html
   # or
   python -m http.server 8000  # For local server
   ```

3. **Or visit online**
   - Play directly at: [https://www.picasyfijas.com](https://www.picasyfijas.com)
   - Spanish version: [https://www.picasyfijas.com/?lang=es](https://www.picasyfijas.com/?lang=es)

## 🎮 How to Play

### English Version (Bulls & Cows)
1. **Enter a 4-digit number** using 4 different digits (0-9, no duplicates)
2. **Click "Enter"** or press Enter to submit your guess
3. **Check the feedback**:
   - **Bulls** 🐂: Correct digits in the right place
   - **Cows** 🐄: Correct digits in the wrong place
4. **Keep guessing** until you find the secret number or run out of attempts!

### Spanish Version (Picas y Fijas)
1. **Ingresa un número de 4 dígitos** usando 4 dígitos diferentes (0-9, sin duplicados)
2. **Haz clic en "Enviar"** o presiona Enter para enviar tu intento
3. **Revisa la retroalimentación**:
   - **Fijas** 🐓: Dígitos correctos en la posición correcta
   - **Picas** 🐥: Dígitos correctos en la posición incorrecta
4. **¡Sigue intentando** hasta encontrar el número secreto o quedarte sin intentos!

## 📱 Sharing Your Results

When you complete a game, you can share your results with a visual emoji grid:

```
I just played Bulls & Cows!
🎉 I won in 4 attempts!

Bulls & Cows 4/10

🐂🐄⚫🐂
🐂🐂🐄⚫
🐂🐄🐂⚫
🐂🐂🐂🐂

Can you beat my score?
https://www.picasyfijas.com
```

## 🛠️ Technical Implementation

### File Structure
```
├── index.html      # Main HTML structure with language toggles
├── styles.css      # Responsive CSS with mobile optimization
├── script.js       # Complete game logic with internationalization
├── sw.js           # Service worker for PWA offline support
├── manifest.json   # PWA manifest
├── robots.txt      # SEO crawling rules
├── sitemap.xml     # SEO sitemap
└── README.md       # This documentation
```

### Architecture Highlights
- **IIFE (Immediately Invoked Function Expression)** prevents global scope pollution
- **Translation system** with fallback mechanisms
- **Event-driven architecture** for responsive gameplay
- **Mobile-first responsive design**
- **Accessibility best practices**

### Browser Support
- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **Mobile browsers** (iOS Safari, Chrome Mobile)
- **Progressive enhancement** - works without JavaScript for basic layout

## 🌐 Internationalization Details

### Language Detection Priority
1. **URL parameter** (`?lang=es`) - highest priority
2. **localStorage** - user's saved preference
3. **Browser language** - automatic detection
4. **Default fallback** - English

### Cultural Adaptations
| Feature | English | Spanish |
|---------|---------|---------|
| Game Name | Bulls & Cows | Picas y Fijas |
| Correct Position | Bulls 🐂 | Fijas 🐓 |
| Wrong Position | Cows 🐄 | Picas 🐥 |
| Flag | 🇺🇸 USA | 🇨🇴 Colombia |

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional language support
- Enhanced accessibility features
- Game variations (different number lengths, etc.)
- Improved mobile experience
- Performance optimizations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙋‍♀️ About the Developer

**Cristina Rodriguez** - Full Stack Developer & Technical Educator

3+ years of experience in tech mentorship, software engineering, technical workshops, and explaining technical concepts to beginners. 20+ years of experience in project management, communications, content management, and content creation.

**Portfolio:** [https://www.yosola.co](https://www.yosola.co)

**Expertise:**
- ✅ Bilingual web applications
- ✅ International user experience design
- ✅ Technical documentation and education
- ✅ Project delivery and event organization
- ✅ Digital marketing and content strategy

**Looking for opportunities in:**
- Technical training and customer education
- International software development
- Community building and developer relations
- Content creation and technical writing

**Let's connect!** ☕️ Always open to collaborations and new opportunities across industries.

---

🎮 **Play now:** [https://www.picasyfijas.com](https://www.picasyfijas.com) | **Jugar ahora:** [https://www.picasyfijas.com/?lang=es](https://www.picasyfijas.com/?lang=es)