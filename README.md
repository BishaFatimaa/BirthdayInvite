# 🎓🎂 Birthday & Graduation Party Invite

A stunning animated party invitation website built with pure HTML, CSS & JavaScript.

**Theme:** Red · Brown · Black  
**Party Date:** May 27, 2026 at 5:30 PM

---

## 📁 File Structure

```
birthday-party-invite/
├── index.html     ← Main invite page (all HTML)
├── style.css      ← All styles (theme, animations, layout)
├── script.js      ← All interactivity (envelope, RSVP, animations)
└── README.md      ← This file
```

That's it — **3 files**, no build step, no frameworks, no dependencies (except Google Fonts via CDN).

---

## 🚀 How to Host on GitHub Pages (Step by Step)

### Step 1 — Create a GitHub Account
If you don't have one, go to [github.com](https://github.com) and sign up. It's free.

### Step 2 — Create a New Repository
1. Click the **+** icon (top right) → **New repository**
2. Name it: `party-invite` (or anything you like, e.g. `maya-bday-2026`)
3. Set it to **Public** (required for free GitHub Pages)
4. ✅ Check **"Add a README file"** (optional but helpful)
5. Click **Create repository**

### Step 3 — Upload Your Files
1. In your new repo, click **"uploading an existing file"** (or **Add file → Upload files**)
2. Drag and drop **all 3 files**:
   - `index.html`
   - `style.css`
   - `script.js`
3. Scroll down, write a commit message like `Add party invite`
4. Click **Commit changes**

### Step 4 — Enable GitHub Pages
1. Go to your repo's **Settings** tab (top menu)
2. In the left sidebar, click **Pages**
3. Under **"Branch"**, select `main` and leave folder as `/ (root)`
4. Click **Save**
5. Wait ~60 seconds

### Step 5 — Get Your Link
GitHub will show you a green banner with your URL:
```
https://YOUR-USERNAME.github.io/party-invite/
```
Copy that URL and send it to everyone!

> **Tip:** It may take 1–2 minutes for the site to go live after you enable Pages.

---

## 🎨 Customizations You Can Make

### Change your name / details
Open `index.html` and find these sections:

- **Location**: Find `To be announced` and replace with your actual venue
- **Dress code**: Update "Dress to impress" if you want something specific
- **RSVP deadline**: Find `May 20, 2026` and change it
- **Hero name**: Add your name to the `name-reveal` span

### Change party date/time
In `script.js`, find this line and update it:
```js
const partyDate = new Date('2026-05-27T17:30:00');
```

### Customize the about section
In `index.html`, find the `about-body` paragraph and write your own personal message!

---

## ✨ Features

| Feature | Description |
|---|---|
| 📧 Animated Envelope | Click to open — flap lifts, letter rises |
| 🎓 Graduation Cap | Click icon → cap shower animation |
| 🎂 Birthday Cake | Click icon → cake + balloon burst |
| 🎆 Fireworks | Click → multi-point firework explosions |
| 🎊 Confetti Pop | Click → confetti shower |
| 🎵 Music Notes | Click → musical note rain |
| ✨ Star Sparkle | Click → star shower across screen |
| ⏱️ Live Countdown | Counts down to 5:30 PM, May 27 in real time |
| 💌 RSVP Form | Yes/No buttons, guest counter, message field |
| 💾 RSVP Saves Locally | Responses saved to browser's localStorage |
| 🖱️ Cursor Trail | Red sparkle follows your mouse |
| 🌟 Particle Background | Ambient floating particles |
| 🎈 Floating Icons | Background emoji float up continuously |

---

## 📱 Mobile Friendly
The site is fully responsive. It works on phones and tablets.

---

## 🆓 Totally Free
- GitHub Pages: **free**
- Google Fonts: **free**
- No backend needed — RSVP data saves to each visitor's browser storage

> **Note on RSVP:** Because this is a static site with no server, RSVP responses are saved to each visitor's own browser — you won't receive them centrally. To collect RSVPs for real, consider embedding a **Google Form** link in the RSVP section. Open `index.html`, find `rsvp-section`, and add a link to your Google Form URL. It's the easiest free option!

---

Made with ❤️ and a lot of 🥂
# BirthdayInvite
# BirthdayInvite
