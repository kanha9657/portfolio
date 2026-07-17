
const HERO_LINES = [
  "A Software Engineering Student and AI Enthusiast.",
  "I build intelligent applications, modern web experiences, and technology-driven solutions.",
  "Passionate about learning, innovating, and solving real-world problems through code."
];

const CERTIFICATES = [
  { name: "Python Basic Certificate", file: "certificates/python_basic certificate.pdf" },
  { name: "Java Basic Certificate", file: "certificates/java_basic certificate.pdf" },
  { name: "Software Engineer Intern", file: "certificates/software_engineer_intern certificate.pdf" },
  { name: "Certificate JS", file: "certificates/certificateJS.pdf" },
  { name: "Resume (copy)", file: "Kanhaiya's Resume-hackerresume.pdf" },
  {name:"Deliotte Virtual intership certificates",file:"certificates/Deloitte_completion_certificate.pdf"},
  {name:"Tata Virtual intership certificates",file:"certificates/TataCertificate.pdf"}
];

const PROJECTS = [
  {
    id: 0,
    title: "Nirbhaya",
    desc: "An emergency app built to help users quickly access support in critical situations.",
    tech: "HTML",
    href: "https://github.com/kanha9657/Nirbhaya",
    repo: "kanha9657/Nirbhaya"
  },
  {
    id: 1,
    title: "Exam Cheating Detection Software",
    desc: "A computer-vision based project that monitors online exams and raises a violation score when cheating is detected.",
    tech: "Python",
    href: "https://github.com/kanha9657/exam_cheating_detection_software",
    repo: "kanha9657/exam_cheating_detection_software"
  },
  {
    id: 2,
    title: "Public Complaint Portal",
    desc: "A web app for submitting and managing public complaints in a structured workflow.",
    tech: "HTML",
    href: "https://github.com/kanha9657/public-complaint-portal",
    repo: "kanha9657/public-complaint-portal"
  },
  {
    id: 3,
    title: "Hospital Management System",
    desc: "A system for managing patient appointments and hospital operations efficiently.",
    tech: "JavaScript",
    href: "https://github.com/kanha9657/hospital-management-system",
    repo: "kanha9657/hospital-management-system"
  },
  {
    id: 4,
    title: "AI Crop Disease Detection System",
    desc: "An AI-based deep learning system that identifies plant diseases from leaf images and suggests treatments.",
    tech: "AI / Deep Learning",
    href: "https://github.com/kanha9657/AI-Crop-Disease-Detection-System",
    repo: "kanha9657/AI-Crop-Disease-Detection-System"
  }
];

/* ====================== Utilities ====================== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

function linkFor(path){
  return encodeURI(path);
}

/* ====================== Typing effect ====================== */
function runTypingEffect(containerId, lines, opts = {}) {
  const el = document.getElementById(containerId);
  if(!el) return;
  const typingSpeed = opts.typingSpeed || 36;
  const pauseBetween = opts.pauseBetween || 900;
  let lineIndex = 0;

  function typeLine(line, i = 0){
    if(i <= line.length){
      el.textContent = line.slice(0, i);
      setTimeout(()=> typeLine(line, i+1), typingSpeed);
    } else {
      setTimeout(()=> {
        lineIndex++;
        if(lineIndex < lines.length){
          typeLine(lines[lineIndex]);
        }
      }, pauseBetween);
    }
  }
  typeLine(lines[0]);
}

/* ====================== Smooth scrolling & nav behavior ====================== */
function initNav(){
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if(!a) return;
    const href = a.getAttribute('href');
    if(href === '#') return;
    e.preventDefault();
    const dest = document.querySelector(href);
    if(dest){
      dest.scrollIntoView({behavior:'smooth', block:'start'});
      const toggle = $('.nav-toggle');
      if(toggle && toggle.getAttribute('aria-expanded') === 'true') toggle.click();
    }
  });

  const toggle = $('.nav-toggle');
  const menu = $('#nav-menu');
  if(toggle && menu){
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', (!open).toString());
      menu.style.display = open ? 'none' : 'flex';
    });
  }
}

function initThemeSwitcher(){
  const buttons = $$('.theme-pill');
  if(!buttons.length) return;

  const storageKey = 'portfolio-theme';
  const defaultTheme = 'theme-royal';

  function applyTheme(themeClass){
    document.body.classList.remove('theme-royal', 'theme-emerald');
    if(themeClass) document.body.classList.add(themeClass);
    buttons.forEach(button => {
      const isActive = button.dataset.theme === themeClass;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
    if(!themeClass){
      const warmButton = buttons.find(button => button.dataset.theme === '');
      if(warmButton) warmButton.classList.add('is-active');
    }
  }

  const savedTheme = localStorage.getItem(storageKey) || defaultTheme;
  localStorage.setItem(storageKey, savedTheme);
  applyTheme(savedTheme);

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const nextTheme = button.dataset.theme || '';
      localStorage.setItem(storageKey, nextTheme);
      applyTheme(nextTheme);
    });
  });
}

/* ====================== Scroll reveal & skill animation ====================== */
function initRevealAndSkills(){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-revealed');
        if(entry.target.id === 'skills' || entry.target.closest('#skills')){
          $$('.skill-bar').forEach(bar => {
            const level = Number(bar.dataset.level || 0);
            const fill = bar.querySelector('.skill-fill');
            if(fill){ requestAnimationFrame(()=> fill.style.width = level + '%'); }
          });
        }
      }
    });
  }, {threshold: 0.12});

  $$('.reveal').forEach(el => observer.observe(el));
}

/* ====================== Certificates grid ====================== */
function renderCertificates(){
  const grid = $('#cert-grid');
  if(!grid) return;
  CERTIFICATES.forEach(cert => {
    const link = linkFor(cert.file);
    const card = document.createElement('a');
    card.className = 'cert-card';
    card.href = link;
    card.target = '_blank';
    card.rel = 'noopener';
    card.title = cert.name;

    card.innerHTML = `
      <div class="cert-thumb" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M7 2h8l4 4v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h3z" stroke="#0f1724" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="cert-info">
        <div class="cert-title">${cert.name}</div>
        <div class="cert-sub">View PDF</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* ====================== Projects wiring ====================== */
function wireProjects(){
  const grid = document.getElementById('project-grid');
  if(!grid) return;

  grid.innerHTML = '';

  PROJECTS.forEach((project, index) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal';
    card.dataset.project = String(index);

    card.innerHTML = `
      <div class="project-media project-media--github">
        <div class="project-badge">GitHub</div>
        <svg viewBox="0 0 400 260" class="project-thumb" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="400" height="260" rx="12" fill="#0f1724" opacity="0.05"></rect>
          <g transform="translate(24,30)">
            <rect width="220" height="30" rx="8" fill="#0f1724"></rect>
            <rect y="48" width="300" height="12" rx="6" fill="#eef6f5"></rect>
            <rect y="72" width="250" height="12" rx="6" fill="#f7fbfb"></rect>
            <rect y="96" width="180" height="12" rx="6" fill="#eef6f5"></rect>
          </g>
        </svg>
      </div>
      <div class="project-body">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-excerpt">${project.desc}</p>
        <div class="tech-badges">
          <span class="tech-badge">${project.tech}</span>
        </div>
        <div class="project-meta">
          <a href="${project.href}" class="link" target="_blank" rel="noopener">Open repo</a>
        </div>
      </div>
    `;

    grid.appendChild(card);
    requestAnimationFrame(() => card.classList.add('is-revealed'));
  });
}

function setYear(){ document.getElementById('year').textContent = new Date().getFullYear(); }

function initEnquiryForm(){
  const form = document.getElementById('enquiry-form');
  if(!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const subject = String(formData.get('subject') || 'Portfolio enquiry').trim();
    const message = String(formData.get('message') || '').trim();
    const mailTo = 'kanhaiyadalvi548@gmail.com';
    const body = [
      `Name: ${name}`,
      '',
      message
    ].join('\n');

    const url = `mailto:${mailTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  });
}

function initFloatingContact(){
  const btn = document.getElementById('floating-contact');
  if(!btn) return;
  btn.addEventListener('click', () => {
    const contact = document.getElementById('contact');
    if(contact) contact.scrollIntoView({behavior:'smooth', block:'start'});
  });
}

function initParallax(){
  window.addEventListener('scroll', () => {
    const sections = $$('section');
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
      if(scrollPercent > 0 && scrollPercent < 1.5){
        const offset = (1 - scrollPercent) * 20;
        section.style.transform = `translateY(${offset}px)`;
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setYear();
  runTypingEffect('typed-lines', HERO_LINES);
  initNav();
  initThemeSwitcher();
  initRevealAndSkills();
  renderCertificates();
  wireProjects();
  initEnquiryForm();
  initFloatingContact();
  initParallax();
});
