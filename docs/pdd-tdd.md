# InkUrl: Product & Technical Design Documents

## Product Design Document (PDD)

### 1. Project Vision & Mission
To create a minimalist, private, and serverless Markdown editor that makes creating and sharing formatted text as simple and intuitive as sharing a link. It prioritizes user frictionlessness, privacy, and an excellent mobile experience.

### 2. Target Audience & Use Cases
- **Developers:** Quickly sharing formatted code snippets, technical notes, or mini-documentation with colleagues without needing a Gist or Pastebin account.
- **Students & Academics:** Collaborating on notes, outlines, or even simple equations with study partners via a single, self-contained link.
- **General Users:** Drafting a formatted email, a blog post, or a social media update; sharing a list or recipe; taking quick, temporary notes that can be easily bookmarked.

### 3. Core Features (MVP)
- Two-pane layout: Markdown input and live preview
- Auto-save to URL
- Open shared links with pre-loaded content
- Copy Link button
- Clean, responsive, mobile-first UI

### 4. Post-MVP Features
- Native mobile sharing
- Dark mode
- Copy HTML button
- Improved Markdown support (syntax highlighting, GFM)
- URL compression

### 5. Non-Goals
- No user accounts or authentication
- No server-side storage
- No real-time multi-user collaboration
- No file syncing or cloud integration

---

## Technical Design Document (TDD)

### 1. Technology Stack
- **Frontend:** Vanilla JavaScript, HTML5, CSS3
- **Markdown Parsing:** Marked.js
- **Hosting:** GitHub Pages

### 2. Architecture & Logic Flow

#### A. File Structure
```
/
├── index.html
├── style.css
└── script.js
```

#### B. HTML Structure
- `<textarea id="markdown-input">` for user text entry
- `<div id="html-output">` for rendered HTML
- `<button id="copy-link-button">` for copying the shareable link

#### C. Core JavaScript Logic
- Live preview on input
- Encode/decode content to/from URL hash
- Copy link functionality
- Render Markdown using Marked.js

#### D. Encoding/Decoding Strategy
- Encoding: `encodeURIComponent()` + `btoa()`
- Decoding: `atob()` + `decodeURIComponent()`

---

Refer to the main README for project overview.
