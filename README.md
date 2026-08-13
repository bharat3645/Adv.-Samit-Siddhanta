# Adv. Samit Siddhanta — Portfolio Website

An elegant, single-page portfolio for **Adv. Samit Siddhanta**, Advocate before the
Supreme Court of India. The design draws on a classical legal aesthetic — deep maroon
and ivory, refined serif typography (Playfair Display + Cormorant Garamond), and
imagery of Lady Justice and the scales of law — inspired by the supplied reference theme.

## ✨ Highlights

- **Scroll-choreographed reveals** — every section animates in on scroll using a
  lightweight `IntersectionObserver` (StringTune-style staged motion, no heavy libraries).
- **Parallax depth** — hero background, Lady Justice statue and the contact backdrop
  drift at independent speeds on scroll.
- **Auto-rotating hero showcase** — a four-panel practice-area card matching the
  reference layout, with numbered tabs (01–04) and hover-pause.
- **Animated stat counters**, **timeline of the journey**, **testimonial carousel**,
  **insights cards**, and a **floating-label contact form** with inline validation.
- **Fully responsive** with an accessible slide-in mobile menu and a
  `prefers-reduced-motion` fallback.
- **Zero build step / zero dependencies** — pure HTML, CSS and vanilla JS.

## 🗂 Structure

```
.
├── index.html        # all page sections
├── css/style.css     # design system + responsive layout + animations
├── js/main.js        # reveals, parallax, carousels, counters, form
└── README.md
```

## ▶️ Run locally

It is a static site — just open `index.html`, or serve it:

```bash
python3 -m http.server 8000
# visit http://localhost:8000
```

## 🎨 Customising

- **Colours / fonts** — edit the CSS custom properties under `:root` in `css/style.css`.
- **Content** — all copy, practice areas and contact details live in `index.html`.
- **Images** — hero/portrait/insight images use Unsplash URLs; swap them for the
  advocate's own photography when available.

## ⚖️ Note

Per Bar Council of India rules, advocates may not solicit work or advertise. The
footer carries a disclaimer; the site is informational only and not an advertisement.

## 📄 License

This is a client deliverable, not open-source software. All rights are
reserved by the client, Adv. Samit Siddhanta — see [LICENSE](LICENSE). The
code is shared here publicly for portfolio/demonstration purposes only and
is not licensed for reuse.
