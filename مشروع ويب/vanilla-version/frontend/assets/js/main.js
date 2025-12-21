// ========================================
// MAIN.JS - Core Initialization & Global Functions
// ========================================

// Theme Management (Dark Mode)
class ThemeManager {
  constructor() {
    this.themeKey = 'mors-theme';
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem(this.themeKey) || 'light';
    this.setTheme(savedTheme);
    this.attachListeners();
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(this.themeKey, theme);
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  }

  attachListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-theme-toggle]')) {
        this.toggleTheme();
      }
    });
  }
}

// Mobile Menu Management
class MobileMenu {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('click', (e) => {
      const menuBtn = e.target.closest('.mobile-menu-btn');
      if (menuBtn) {
        this.toggleMenu();
      }
    });
  }

  toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks) navLinks.classList.toggle('active');
    if (menuBtn) menuBtn.classList.toggle('active');
  }

  close() {
    const navLinks = document.querySelector('.nav-links');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (navLinks) navLinks.classList.remove('active');
    if (menuBtn) menuBtn.classList.remove('active');
  }
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Intersection Observer for Animations
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}

// Toast Notification System
class Toast {
  static show(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast alert alert-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.animation = 'slideOutUp 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  static success(message) {
    this.show(message, 'success');
  }

  static error(message) {
    this.show(message, 'danger');
  }

  static warning(message) {
    this.show(message, 'warning');
  }

  static info(message) {
    this.show(message, 'info');
  }
}

// Modal Management
class Modal {
  static open(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  static close(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  static init() {
    document.addEventListener('click', (e) => {
      // Close on backdrop click
      if (e.target.classList.contains('modal-backdrop')) {
        const modal = e.target.closest('.modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
      }

      // Close on close button click
      if (e.target.closest('.modal-close')) {
        const modal = e.target.closest('.modal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal.active');
        if (openModal) {
          openModal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  }
}

// Dropdown Management
class Dropdown {
  static init() {
    document.addEventListener('click', (e) => {
      const dropdownToggle = e.target.closest('[data-dropdown-toggle]');
      
      if (dropdownToggle) {
        e.preventDefault();
        const dropdown = dropdownToggle.closest('.dropdown');
        dropdown.classList.toggle('active');
        return;
      }

      // Close all dropdowns when clicking outside
      if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown.active').forEach(d => {
          d.classList.remove('active');
        });
      }
    });
  }
}

// Tabs Management
class Tabs {
  static init() {
    document.addEventListener('click', (e) => {
      const tabItem = e.target.closest('.tabs-item');
      if (!tabItem) return;

      const tabsContainer = tabItem.closest('.tabs');
      const targetId = tabItem.dataset.tab;

      // Remove active class from all tabs
      tabsContainer.querySelectorAll('.tabs-item').forEach(item => {
        item.classList.remove('active');
      });

      // Add active class to clicked tab
      tabItem.classList.add('active');

      // Hide all tab contents
      document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
      });

      // Show target tab content
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  }
}

// Form Validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePassword(password) {
  return password.length >= 8;
}

// Loading State
function showLoading(element) {
  const spinner = document.createElement('span');
  spinner.className = 'spinner';
  element.appendChild(spinner);
  element.disabled = true;
  return spinner;
}

function hideLoading(spinner) {
  if (spinner && spinner.parentNode) {
    spinner.parentNode.removeChild(spinner);
    spinner.parentNode.disabled = false;
  }
}

// Initialize everything on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core features
  new ThemeManager();
  new MobileMenu();
  
  initSmoothScroll();
  initAnimations();
  
  Modal.init();
  Dropdown.init();
  Tabs.init();

  console.log('🚀 MORS Platform Initialized');
});

// Export for use in other modules
window.Toast = Toast;
window.Modal = Modal;
window.validateEmail = validateEmail;
window.validatePassword = validatePassword;
window.showLoading = showLoading;
window.hideLoading = hideLoading;
