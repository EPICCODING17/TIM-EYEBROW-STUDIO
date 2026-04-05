const fs = require('fs');

let css = fs.readFileSync('style.css', 'utf-8');

// Update CSS Variables
css = css.replace(/--primary: #080808;/, '--primary: #FAF9F6;');
css = css.replace(/--text-light: #fafafa;/, '--text-light: #1A1A1A;');
css = css.replace(/--text-muted: #a0a0a0;/, '--text-muted: #5A5A5A;');
css = css.replace(/--glass-bg: rgba\(12, 12, 12, 0.5\);/, '--glass-bg: rgba(255, 255, 255, 0.7);');
css = css.replace(/--glass-border: rgba\(178, 58, 72, 0.25\);/, '--glass-border: rgba(178, 58, 72, 0.15);');
css = css.replace(/--glass-highlight: rgba\(255, 255, 255, 0.05\);/, '--glass-highlight: rgba(0, 0, 0, 0.05);');
css = css.replace(/--card-bg: rgba\(18, 18, 18, 0.65\);/, '--card-bg: rgba(255, 255, 255, 0.8);');

// Shadows
css = css.replace(/0 10px 40px rgba\(0, 0, 0, 0.5\)/g, '0 10px 40px rgba(0, 0, 0, 0.08)');
css = css.replace(/0 20px 50px rgba\(0, 0, 0, 0.5\)/g, '0 20px 50px rgba(0, 0, 0, 0.08)');
css = css.replace(/0 15px 40px rgba\(0, 0, 0, 0.5\)/g, '0 15px 40px rgba(0, 0, 0, 0.08)');
css = css.replace(/0 25px 50px rgba\(0, 0, 0, 0.5\)/g, '0 25px 50px rgba(0, 0, 0, 0.08)');
css = css.replace(/0 20px 60px rgba\(0, 0, 0, 0.4\)/g, '0 20px 60px rgba(0, 0, 0, 0.08)');
css = css.replace(/0 12px 30px rgba\(0, 0, 0, 0.3\)/g, '0 12px 30px rgba(0, 0, 0, 0.08)');

// Dropdown backgrounds
css = css.replace(/background: rgba\(20, 20, 20, 0.95\);/g, 'background: rgba(255, 255, 255, 0.95);');
css = css.replace(/background: rgba\(25, 25, 25, 0.95\);/g, 'background: rgba(255, 255, 255, 0.95);');

// Card hover background
css = css.replace(/background: rgba\(25, 25, 25, 0.8\);/g, 'background: rgba(255, 255, 255, 0.95);');

// Hero overlay
css = css.replace(/rgba\(15, 15, 15, 0.95\)/g, 'rgba(250, 249, 246, 0.95)');
css = css.replace(/rgba\(15, 15, 15, 0.7\)/g, 'rgba(250, 249, 246, 0.7)');
css = css.replace(/rgba\(15, 15, 15, 0.3\)/g, 'rgba(250, 249, 246, 0.3)');
css = css.replace(/rgba\(15, 15, 15, 0.5\)/g, 'rgba(250, 249, 246, 0.5)');
css = css.replace(/rgba\(15, 15, 15, 0.85\)/g, 'rgba(250, 249, 246, 0.85)');
css = css.replace(/rgba\(15, 15, 15, 0.9\)/g, 'rgba(250, 249, 246, 0.9)');
css = css.replace(/rgba\(10, 10, 10, 0.85\)/g, 'rgba(255, 255, 255, 0.9)');

// Shimmer gradient
css = css.replace(/rgba\(20, 20, 20, 1\)/g, 'rgba(240, 240, 240, 1)');
css = css.replace(/rgba\(30, 30, 30, 1\)/g, 'rgba(220, 220, 220, 1)');

// Glow orb
css = css.replace(/--accent-glow\), transparent 70%\)/, "rgba(220, 180, 180, 0.8)), transparent 60%)");

fs.writeFileSync('style.css', css);

let html = fs.readFileSync('index.html', 'utf-8');

const tailwindConfigReplaces = \`colors: {
              accent: "#8B1E2D",
              "accent-sec": "#B23A48",
              dark: "#FAF9F6",
              gray: {
                100: '#1a1a1a',
                200: '#262626',
                300: '#404040',
                400: '#525252',
                500: '#737373',
                600: '#a3a3a3',
                700: '#d4d4d4',
                800: '#e5e5e5',
                900: '#f5f5f5',
              }
            },\`;

html = html.replace(/colors:\s*\\{[\\s\\S]*?dark:\s*"#0F0F0F",\\s*\\},/m, tailwindConfigReplaces);

html = html.replace(/bg-white\\/5/g, 'bg-black/5');
html = html.replace(/border-white\\/5/g, 'border-black/5');
html = html.replace(/border-white\\/10/g, 'border-black/10');
html = html.replace(/bg-white\\/10/g, 'bg-black/10');
html = html.replace(/border-white\\/30/g, 'border-black/30');
html = html.replace(/hover:bg-white\\/5/g, 'hover:bg-black/5');
html = html.replace(/hover:bg-white\\/10/g, 'hover:bg-black/10');
html = html.replace(/bg-white rounded-full/g, 'bg-black rounded-full');
html = html.replace(/bg-white border-white\\/10/g, 'bg-black border-black/10');

// Privacy Policy Text White
html = html.replace(/text-white mb-3/g, 'text-gray-100 mb-3');

// Lightbox bg
html = html.replace(/bg-black\\/90/g, 'bg-[#FAF9F6]/90');
html = html.replace(/text-white text-3xl/g, 'text-gray-100 text-3xl');

fs.writeFileSync('index.html', html);

console.log("Migration complete!");
