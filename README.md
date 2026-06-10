# Premium handcrafted portfolio (HTML/CSS/JS)

Files:
- index.html
- styles.css
- main.js

Quick preview
1. Place these files in your `portfolio/` folder.
2. Make sure your certificates and resume PDFs are in `portfolio/certificates/` and `portfolio/` respectively (the code references these filenames):
   - `Kanhaiya's Resume-hackerresume.pdf`
   - `certificates/python_basic certificate.pdf`
   - `certificates/java_basic certificate.pdf`
   - `certificates/software_engineer_intern certificate.pdf`
   - `certificates/certificateJS.pdf`

3. Start a quick local server and open the site:
```bash
# from the portfolio folder
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
```

Customization notes
- Replace `your.email@example.com` in `index.html` with your email.
- Replace project placeholders in `main.js` (the `PROJECTS` array) with real titles, descriptions, links and thumbnails.
- To add/remove certificates, update the `CERTIFICATES` array in `main.js` with exact filenames.
- The design uses the Inter font. Swap or provide local fonts by editing the `<link>` in `index.html`.

Accessibility
- Keyboard skip link, meaningful landmarks and focus-friendly controls included.
- Forms use mailto fallback; add a form service if you want serverless form submissions.

Next steps
- If you want, I can add placeholder images in `assets/`, integrate project screenshots, or commit these files to your repo.
