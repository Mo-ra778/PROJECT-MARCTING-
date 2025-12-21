// Main JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active")
      this.classList.toggle("active")
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in")
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document.querySelectorAll(".feature-card, .mockup-item").forEach((el) => {
    observer.observe(el)
  })

  // Add animation styles
  const style = document.createElement("style")
  style.textContent = `
        .feature-card, .mockup-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        .nav-links.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: var(--shadow-lg);
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
    `
  document.head.appendChild(style)
})

// Utility functions
function showAlert(message, type = "success") {
  const alert = document.createElement("div")
  alert.className = `alert alert-${type}`
  alert.textContent = message

  document.body.insertBefore(alert, document.body.firstChild)

  setTimeout(() => {
    alert.remove()
  }, 5000)
}

function showLoading(element) {
  const loading = document.createElement("div")
  loading.className = "loading"
  element.appendChild(loading)
  return loading
}

function hideLoading(loading) {
  if (loading && loading.parentNode) {
    loading.parentNode.removeChild(loading)
  }
}

// Form validation utilities
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePassword(password) {
  return password.length >= 8
}

function validateForm(formData) {
  const errors = []

  if (!formData.email || !validateEmail(formData.email)) {
    errors.push("يرجى إدخال بريد إلكتروني صحيح")
  }

  if (!formData.password || !validatePassword(formData.password)) {
    errors.push("كلمة المرور يجب أن تكون 8 أحرف على الأقل")
  }

  return errors
}
