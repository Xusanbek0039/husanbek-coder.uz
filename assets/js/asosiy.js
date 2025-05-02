// Main JavaScript for Husanbek Portfolio
document.addEventListener('DOMContentLoaded', () => {
  // Load header and footer components
  loadComponents();
  
  // Initialize language switcher
  initLanguageSwitcher();
  
  // Initialize theme switcher
  initThemeSwitcher();
  
  // Initialize menu toggle
  initMenuToggle();
  
  // Initialize loading screen
  initLoadingScreen();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize 3D background (if on homepage)
  if (document.getElementById('three-container')) {
    initThreeBackground();
  }
  
  // Initialize portfolio filters (if on portfolio page)
  if (document.querySelector('.loyiha-filtrlar')) {
    initPortfolioFilters();
  }
  
  // Initialize project modals (if on portfolio page)
  if (document.querySelector('.loyiha-details-tugma')) {
    initProjectModals();
  }
  
  // Initialize FAQ accordions (if on services page)
  if (document.querySelector('.faq-element')) {
    initFAQAccordions();
  }
  
  // Initialize contact form (if on contact page)
  if (document.getElementById('contact-form')) {
    initContactForm();
  }
  
  // Initialize blog filters (if on blog page)
  if (document.querySelector('.blog-kategoriyalar')) {
    initBlogFilters();
  }
});

// Load Components from separate files
function loadComponents() {
  // Load header
  const headerContainer = document.getElementById('boshnav-container');
  if (headerContainer) {
    fetch('components/boshnav.html')
      .then(response => response.text())
      .then(data => {
        headerContainer.innerHTML = data;
        
        // Initialize components inside the navigation
        initLanguageSwitcher();
        initThemeSwitcher();
        initMenuToggle();
        
        // Highlight active page in navigation
        highlightActivePage();
      })
      .catch(error => console.error('Error loading header:', error));
  }
  
  // Load footer
  const footerContainer = document.getElementById('pastki-container');
  if (footerContainer) {
    fetch('components/pastki.html')
      .then(response => response.text())
      .then(data => {
        footerContainer.innerHTML = data;
        
        // Initialize language in footer
        updateLanguageElements();
      })
      .catch(error => console.error('Error loading footer:', error));
  }
}

// Highlight active page in navigation
function highlightActivePage() {
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-havola');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (currentPage.endsWith(linkPath) || 
        (currentPage.endsWith('/') && linkPath === 'index.html')) {
      link.classList.add('faol');
    }
  });
}

// Language Switcher
function initLanguageSwitcher() {
  const languageButtons = document.querySelectorAll('.til-tugma');
  if (!languageButtons.length) return;
  
  // Get stored language or default to 'uz'
  const currentLang = localStorage.getItem('language') || 'uz';
  
  // Initialize language
  setLanguage(currentLang);
  
  // Add event listeners to language buttons
  languageButtons.forEach(button => {
    const lang = button.getAttribute('data-lang');
    
    // Add active class to current language button
    if (lang === currentLang) {
      button.classList.add('faol');
    }
    
    button.addEventListener('click', () => {
      setLanguage(lang);
      
      // Update active class
      document.querySelectorAll('.til-tugma').forEach(btn => {
        btn.classList.remove('faol');
      });
      button.classList.add('faol');
    });
  });
}

// Set language and update elements
function setLanguage(lang) {
  localStorage.setItem('language', lang);
  updateLanguageElements();
}

// Update all language elements
function updateLanguageElements() {
  const currentLang = localStorage.getItem('language') || 'uz';
  const langElements = document.querySelectorAll('[data-lang]');
  
  langElements.forEach(element => {
    if (element.getAttribute('data-lang') === currentLang) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}

// Theme Switcher
function initThemeSwitcher() {
  const themeButton = document.querySelector('.tema-tugma');
  if (!themeButton) return;
  
  // Get stored theme or default to 'light'
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Initialize theme
  setTheme(currentTheme);
  
  // Add event listener to theme button
  themeButton.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('theme-light') ? 'dark' : 'light';
    setTheme(newTheme);
  });
}

// Set theme and update elements
function setTheme(theme) {
  localStorage.setItem('theme', theme);
  
  if (theme === 'dark') {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
  } else {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
  }
}

// Menu Toggle
function initMenuToggle() {
  const menuButton = document.querySelector('.menyu-tugma');
  if (!menuButton) return;
  
  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('menyu-ochiq');
    document.querySelector('.boshnav').classList.toggle('menyu-ochiq');
  });
}

// Loading Screen
function initLoadingScreen() {
  const loadingScreen = document.querySelector('.loading-sahifa');
  if (!loadingScreen) return;
  
  // Hide loading screen after animations finish
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    
    // Remove from DOM after transition
    setTimeout(() => {
      loadingScreen.style.display = 'none';
    }, 500);
  }, 4500); // Wait for typing animations to complete (3s + buffer)
}

// Scroll Animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-aos]');
  if (!animatedElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// 3D Background with Three.js
function initThreeBackground() {
  // Load Three.js from CDN if needed
  if (typeof THREE === 'undefined') {
    console.error('Three.js is not loaded. Make sure to include it in your HTML.');
    return;
  }
  
  const container = document.getElementById('three-container');
  if (!container) return;
  
  // Create scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);
  
  // Responsive canvas
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
  
  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(0, 10, 10);
  scene.add(directionalLight);
  
  // Create technology logo objects
  const logoGeometry = new THREE.BoxGeometry(1, 1, 1);
  
  const logoMaterials = [
    new THREE.MeshPhongMaterial({ color: 0x3366FF }), // HTML - Blue
    new THREE.MeshPhongMaterial({ color: 0x2ECC71 }), // CSS - Green
    new THREE.MeshPhongMaterial({ color: 0xF7DF1E }), // JS - Yellow
    new THREE.MeshPhongMaterial({ color: 0x092E20 })  // Django - Dark Green
  ];
  
  const logos = [];
  const logoCount = 20;
  
  for (let i = 0; i < logoCount; i++) {
    const material = logoMaterials[Math.floor(Math.random() * logoMaterials.length)];
    const logo = new THREE.Mesh(logoGeometry, material);
    
    // Random position in a spherical arrangement
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 5 + Math.random() * 10;
    
    logo.position.x = radius * Math.sin(phi) * Math.cos(theta);
    logo.position.y = radius * Math.sin(phi) * Math.sin(theta);
    logo.position.z = radius * Math.cos(phi);
    
    logo.rotation.x = Math.random() * Math.PI;
    logo.rotation.y = Math.random() * Math.PI;
    
    // Scale randomly
    const scale = 0.2 + Math.random() * 0.3;
    logo.scale.set(scale, scale, scale);
    
    scene.add(logo);
    logos.push({
      mesh: logo,
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      }
    });
  }
  
  // Position camera
  camera.position.z = 20;
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate logos
    logos.forEach(logo => {
      logo.mesh.rotation.x += logo.rotationSpeed.x;
      logo.mesh.rotation.y += logo.rotationSpeed.y;
      logo.mesh.rotation.z += logo.rotationSpeed.z;
    });
    
    // Rotate entire scene slightly
    scene.rotation.y += 0.001;
    
    renderer.render(scene, camera);
  }
  
  animate();
}

// Portfolio Filters
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-tugma');
  const projectCards = document.querySelectorAll('.loyiha-karta');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('faol'));
      button.classList.add('faol');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Project Modals
function initProjectModals() {
  const detailButtons = document.querySelectorAll('.loyiha-details-tugma');
  const modal = document.getElementById('loyiha-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalDetails = document.querySelector('.modal-details');
  const modalLoading = document.querySelector('.modal-loading');
  
  // Open modal when detail button is clicked
  detailButtons.forEach(button => {
    button.addEventListener('click', () => {
      const projectCard = button.closest('.loyiha-karta');
      const projectId = projectCard.getAttribute('data-project-id');
      
      // Show loading spinner
      modalLoading.style.display = 'flex';
      modalDetails.innerHTML = '';
      
      // Open modal
      modal.classList.add('ochiq');
      
      // Simulate loading project details (replace with actual API call in production)
      setTimeout(() => {
        modalLoading.style.display = 'none';
        
        // Get project data from card
        const projectTitle = projectCard.querySelector('h3').textContent;
        const projectImage = projectCard.querySelector('img').src;
        const projectDescription = projectCard.querySelector('p span[data-lang="' + (localStorage.getItem('language') || 'uz') + '"]').textContent;
        const projectTechnologies = Array.from(projectCard.querySelectorAll('.texnologiya')).map(tech => tech.textContent);
        
        // Create modal content
        const modalContent = `
          <div class="modal-rasm">
            <img src="${projectImage}" alt="${projectTitle}">
          </div>
          <h2>${projectTitle}</h2>
          <p class="modal-tavsif">${projectDescription}</p>
          <div class="modal-section">
            <h3>
              <span data-lang="uz">Texnologiyalar</span>
              <span data-lang="ru">Технологии</span>
            </h3>
            <div class="loyiha-texnologiyalar">
              ${projectTechnologies.map(tech => `<span class="texnologiya">${tech}</span>`).join('')}
            </div>
          </div>
          <div class="modal-section">
            <h3>
              <span data-lang="uz">Loyiha haqida</span>
              <span data-lang="ru">О проекте</span>
            </h3>
            <p>
              <span data-lang="uz">Bu loyiha ${projectTechnologies.join(', ')} texnologiyalaridan foydalanib yaratilgan. Loyiha doirasida foydalanuvchilar autentifikatsiyasi, ma'lumotlar bazasi bilan ishlash va foydalanuvchi interfeyslarini yaratish amalga oshirildi.</span>
              <span data-lang="ru">Этот проект был создан с использованием технологий ${projectTechnologies.join(', ')}. В рамках проекта была реализована аутентификация пользователей, работа с базой данных и создание пользовательских интерфейсов.</span>
            </p>
          </div>
          <div class="modal-section">
            <h3>
              <span data-lang="uz">Natijalar</span>
              <span data-lang="ru">Результаты</span>
            </h3>
            <ul>
              <li>
                <span data-lang="uz">Loyiha muvaffaqiyatli yakunlandi va mijoz talablariga to'liq javob berdi</span>
                <span data-lang="ru">Проект был успешно завершен и полностью соответствовал требованиям клиента</span>
              </li>
              <li>
                <span data-lang="uz">Foydalanuvchilar soni 10,000+ ga yetdi</span>
                <span data-lang="ru">Количество пользователей достигло 10 000+</span>
              </li>
              <li>
                <span data-lang="uz">Saytning yuklash vaqti 1.5 soniyadan kam</span>
                <span data-lang="ru">Время загрузки сайта менее 1,5 секунд</span>
              </li>
            </ul>
          </div>
          <div class="loyiha-havolalar">
            <a href="#" class="tugma tugma-asosiy">
              <span data-lang="uz">Loyihani ko'rish</span>
              <span data-lang="ru">Посмотреть проект</span>
            </a>
            <a href="#" class="tugma tugma-github">
              <i class="fab fa-github"></i> GitHub
            </a>
          </div>
        `;
        
        modalDetails.innerHTML = modalContent;
        
        // Update language in modal
        updateLanguageElements();
      }, 800);
    });
  });
  
  // Close modal when close button is clicked
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('ochiq');
    });
  }
  
  // Close modal when clicking outside content
  if (modal) {
    modal.addEventListener('click', event => {
      if (event.target === modal) {
        modal.classList.remove('ochiq');
      }
    });
  }
}

// FAQ Accordions
function initFAQAccordions() {
  const faqItems = document.querySelectorAll('.faq-element');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-savol');
    
    question.addEventListener('click', () => {
      // Close other open FAQ items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('ochiq')) {
          otherItem.classList.remove('ochiq');
        }
      });
      
      // Toggle current item
      item.classList.toggle('ochiq');
    });
  });
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const successModal = document.getElementById('success-modal');
  const modalClose = document.querySelector('#success-modal .modal-close');
  const closeButton = document.querySelector('.modal-close-btn');
  
  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formObject = {};
      
      formData.forEach((value, key) => {
        formObject[key] = value;
      });
      
      // Simulate form submission (replace with actual EmailJS or form handling in production)
      setTimeout(() => {
        // Show success modal
        if (successModal) {
          successModal.classList.add('ochiq');
        }
        
        // Reset form
        contactForm.reset();
      }, 1000);
    });
  }
  
  // Close success modal
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      successModal.classList.remove('ochiq');
    });
  }
  
  if (closeButton) {
    closeButton.addEventListener('click', () => {
      successModal.classList.remove('ochiq');
    });
  }
  
  // Close modal when clicking outside content
  if (successModal) {
    successModal.addEventListener('click', event => {
      if (event.target === successModal) {
        successModal.classList.remove('ochiq');
      }
    });
  }
}

// Blog Filters
function initBlogFilters() {
  const categoryButtons = document.querySelectorAll('.kategoriya-tugma');
  const blogPosts = document.querySelectorAll('.blog-post');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      
      // Update active button
      categoryButtons.forEach(btn => btn.classList.remove('faol'));
      button.classList.add('faol');
      
      // Filter blog posts
      blogPosts.forEach(post => {
        if (category === 'all' || post.getAttribute('data-category') === category) {
          post.style.display = 'block';
        } else {
          post.style.display = 'none';
        }
      });
    });
  });
  
  // Blog search functionality
  const searchInput = document.getElementById('blog-search');
  
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      
      // If search term is empty, show all posts or respect current category filter
      if (searchTerm === '') {
        const activeCategory = document.querySelector('.kategoriya-tugma.faol').getAttribute('data-category');
        
        blogPosts.forEach(post => {
          if (activeCategory === 'all' || post.getAttribute('data-category') === activeCategory) {
            post.style.display = 'block';
          } else {
            post.style.display = 'none';
          }
        });
        
        return;
      }
      
      // Search in post titles and content
      blogPosts.forEach(post => {
        const title = post.querySelector('h2').textContent.toLowerCase();
        const content = post.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || content.includes(searchTerm)) {
          post.style.display = 'block';
        } else {
          post.style.display = 'none';
        }
      });
    });
  }
}