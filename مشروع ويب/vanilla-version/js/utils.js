// Shared utilities available across pages (attached to window)
;(function () {
  // ---------- Alerts ----------
  function showAlert(message, type = "success") {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll(".alert")
    existingAlerts.forEach((a) => a.remove())

    const alert = document.createElement("div")
    alert.className = `alert alert-${type}`
    alert.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 420px;
      padding: 1rem 1.125rem;
      border-radius: 10px;
      font-weight: 500;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      backdrop-filter: saturate(1.2);
    `

    // type colors
    switch (type) {
      case "success":
        alert.style.background = "rgba(34, 197, 94, 0.08)"
        alert.style.border = "1px solid rgba(34, 197, 94, 0.25)"
        alert.style.color = "#059669"
        break
      case "danger":
        alert.style.background = "rgba(239, 68, 68, 0.08)"
        alert.style.border = "1px solid rgba(239, 68, 68, 0.25)"
        alert.style.color = "#dc2626"
        break
      case "info":
        alert.style.background = "rgba(59, 130, 246, 0.08)"
        alert.style.border = "1px solid rgba(59, 130, 246, 0.25)"
        alert.style.color = "#2563eb"
        break
      default:
        alert.style.background = "rgba(0,0,0,0.05)"
        alert.style.border = "1px solid rgba(0,0,0,0.08)"
        alert.style.color = "#111827"
    }

    alert.textContent = message
    document.body.appendChild(alert)

    setTimeout(() => alert.remove(), 5000)
  }

  // ---------- Validation ----------
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  function validatePassword(password) {
    return typeof password === "string" && password.length >= 8
  }

  // ---------- Timing helpers ----------
  function debounce(fn, wait = 300) {
    let t
    return function (...args) {
      clearTimeout(t)
      t = setTimeout(() => fn.apply(this, args), wait)
    }
  }

  // Smooth number animation (used in dashboard)
  function animateNumber(element, start, end, duration) {
    const startTime = performance.now()
    function update(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const current = Math.floor(start + (end - start) * progress)
      element.textContent = current.toLocaleString()
      if (progress < 1) requestAnimationFrame(update)
    }
    requestAnimationFrame(update)
  }

  // ---------- Formatting helpers ----------
  function formatNumber(num) {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "م"
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "ك"
    return String(num)
  }

  function getTimeAgo(date) {
    const now = new Date()
    const diff = now - date
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (days > 0) return `منذ ${days} ${days === 1 ? "يوم" : "أيام"}`
    if (hours > 0) return `منذ ${hours} ${hours === 1 ? "ساعة" : "ساعات"}`
    return `منذ ${minutes} ${minutes === 1 ? "دقيقة" : "دقائق"}`
  }

  // ---------- Session helpers ----------
  function logout() {
    if (confirm("هل أنت متأكد من تسجيل الخروج؟")) {
      localStorage.removeItem("user")
      localStorage.removeItem("sidebarCollapsed")
      window.location.href = "login.html"
    }
  }

  // Expose to window (global)
  window.showAlert = showAlert
  window.validateEmail = validateEmail
  window.validatePassword = validatePassword
  window.debounce = debounce
  window.animateNumber = animateNumber
  window.formatNumber = formatNumber
  window.getTimeAgo = getTimeAgo
  window.logout = logout
})()