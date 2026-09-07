# FitForge — Gym Calorie Tracker

A single-page gym site with two training categories:

- **Cardio** — walking, jogging, cycling, swimming, treadmill, skipping
- **Strength Training** — weight lifting, push-ups, squats, deadlift, pull-ups, plank

Tap an exercise icon to open a timer. Start it, and calories burned update live based on
your body weight and a standard MET (Metabolic Equivalent of Task) formula:

```
kcal/min = (MET × 3.5 × weight_kg) / 200
```

No build step, no frameworks — plain HTML/CSS/JS. Just three files:

```
index.html
styles.css
script.js
```

## Run it locally

Just open `index.html` in a browser, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Push to GitHub

```bash
cd fitforge
git init
git add .
git commit -m "Initial commit: FitForge gym site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

(Create the empty repo on GitHub first at github.com/new, then run the commands above.)

## Publish with GitHub Pages

1. On GitHub, open your repo → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)` → **Save**.
4. Wait ~1 minute, then your site is live at:
   `https://<your-username>.github.io/<your-repo>/`

That URL is what you'd share/access as the live site — GitHub Pages is the free static
hosting GitHub provides for repos like this one.

## Customizing

- **Add/edit exercises or MET values**: edit the `EXERCISES` object in `script.js`.
- **Add new icons**: add an SVG string to the `ICONS` object, then reference it.
- **Colors**: edit the CSS custom properties at the top of `styles.css` (`:root`).
