# Yiran Xu — Personal Academic Homepage

Static personal website hosted on GitHub Pages at [raizellll.github.io](https://raizellll.github.io/).

## Local Preview

```bash
python -m http.server 8765
```

Then open <http://localhost:8765/>.

## Structure

- `index.html` — Main single-page academic profile (`About`, `Research`, `Experience`, `Projects`, `Contact`)
- `styles.css` — Light/dark editorial typography, layout, and responsive styling
- `script.js` — Theme toggle, mobile navigation drawer, scrollspy, figure lightbox, and copy-to-clipboard actions
- `404.html` — Legacy route redirect handler and fallback 404 page
- `assets/` — CV PDF, portrait image, and undergraduate thesis figures
- `.github/workflows/publish.yml` — Static GitHub Pages deployment workflow
