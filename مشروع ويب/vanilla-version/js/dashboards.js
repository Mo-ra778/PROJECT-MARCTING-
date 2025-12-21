// Dashboard JavaScript functionality
document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  checkAuth()

  // Initialize dashboard
  initializeDashboard()

  // Setup event listeners
  setupEventListeners()

  // Load initial data
  loadDashboardData()
})


function checkAuth() {
  const user = localStorage.getItem("user")
  if (!user) {
    window.location.href = "login.html"
    return
  }

  // Update profile info
  try {
    const userData = JSON.parse(user)
    const profileName = document.querySelector(".profile-name")
    if (profileName && userData.email) {
      profileName.textContent = userData.email.split("@")[0]
    }
  } catch (error) {
    console.error("Error parsing user data:", error)
  }
}

function initializeDashboard() {
  // Set active navigation
  setActiveNavigation()

  // Initialize chart
  initializeChart()

  // Update platform stats
  updatePlatformStats()
}

function setupEventListeners() {
  // Sidebar toggle
  const sidebarToggle = document.getElementById("sidebarToggle")
  const sidebar = document.getElementById("sidebar")

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed")
      localStorage.setItem("sidebarCollapsed", sidebar.classList.contains("collapsed"))
    })

    // Restore sidebar state
    const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true"
    if (isCollapsed) {
      sidebar.classList.add("collapsed")
    }
  }

  // Chart period buttons
  const chartBtns = document.querySelectorAll(".chart-btn")
  chartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      chartBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      updateChart(btn.textContent)
    })
  })

  // Mobile sidebar
  if (window.innerWidth <= 768) {
    setupMobileSidebar()
  }
}

function setupMobileSidebar() {
  const sidebar = document.getElementById("sidebar")
  const sidebarToggle = document.getElementById("sidebarToggle")

  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open")
    })
  }

  // Close sidebar when clicking outside
  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
      sidebar.classList.remove("open")
    }
  })
}

function setActiveNavigation() {
  const currentPage = window.location.pathname.split("/").pop()
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active")
    }
  })
}

function loadDashboardData() {
  // Simulate loading dashboard data
  showLoadingState()

  setTimeout(() => {
    hideLoadingState()
    animateStats()
  }, 1000)
}

function showLoadingState() {
  const statValues = document.querySelectorAll(".stat-value")
  statValues.forEach((stat) => {
    stat.textContent = "..."
  })
}

function hideLoadingState() {
  // Data will be updated by updatePlatformStats()
}

function animateStats() {
  const statValues = document.querySelectorAll(".stat-value")
  statValues.forEach((stat) => {
    const finalValue = stat.textContent
    const numericValue = Number.parseInt(finalValue.replace(/,/g, ""))

    if (!isNaN(numericValue)) {
      animateNumber(stat, 0, numericValue, 1000)
    }
  })
}

function animateNumber(element, start, end, duration) {
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    const current = Math.floor(start + (end - start) * progress)
    element.textContent = current.toLocaleString()

    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}

function updatePlatformStats() {
  const platform = document.getElementById("platformSelect").value
  const stats = getPlatformStats(platform)

  // Update stat values
  document.getElementById("followersCount").textContent = stats.followers.toLocaleString()
  document.getElementById("likesCount").textContent = stats.likes.toLocaleString()
  document.getElementById("commentsCount").textContent = stats.comments.toLocaleString()
  document.getElementById("viewsCount").textContent = stats.views.toLocaleString()

  // Update chart
  updateChart("يومي", platform)
}

function getPlatformStats(platform) {
  const allStats = {
    all: {
      followers: 12543,
      likes: 45231,
      comments: 2156,
      views: 156789,
    },
    instagram: {
      followers: 8234,
      likes: 28456,
      comments: 1456,
      views: 89234,
    },
    tiktok: {
      followers: 15678,
      likes: 67890,
      comments: 3456,
      views: 234567,
    },
    youtube: {
      followers: 5432,
      likes: 12345,
      comments: 876,
      views: 98765,
    },
    twitter: {
      followers: 3456,
      likes: 8765,
      comments: 432,
      views: 23456,
    },
  }

  return allStats[platform] || allStats.all
}

function initializeChart() {
  const canvas = document.getElementById("engagementChart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  drawChart(ctx, canvas.width, canvas.height)
}

function drawChart(ctx, width, height) {
  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  // Sample data for the last 30 days
  const data = generateChartData(30)
  const maxValue = Math.max(...data)
  const padding = 40

  // Draw grid lines
  ctx.strokeStyle = "#e5e7eb"
  ctx.lineWidth = 1

  // Horizontal grid lines
  for (let i = 0; i <= 5; i++) {
    const y = padding + (i * (height - 2 * padding)) / 5
    ctx.beginPath()
    ctx.moveTo(padding, y)
    ctx.lineTo(width - padding, y)
    ctx.stroke()
  }

  // Vertical grid lines
  for (let i = 0; i <= 6; i++) {
    const x = padding + (i * (width - 2 * padding)) / 6
    ctx.beginPath()
    ctx.moveTo(x, padding)
    ctx.lineTo(x, height - padding)
    ctx.stroke()
  }

  // Draw chart line
  ctx.strokeStyle = "#79737eff"
  ctx.lineWidth = 3
  ctx.beginPath()

  data.forEach((value, index) => {
    const x = padding + (index * (width - 2 * padding)) / (data.length - 1)
    const y = height - padding - (value / maxValue) * (height - 2 * padding)

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  ctx.stroke()

  // Draw data points
  ctx.fillStyle = "#9333ea"
  data.forEach((value, index) => {
    const x = padding + (index * (width - 2 * padding)) / (data.length - 1)
    const y = height - padding - (value / maxValue) * (height - 2 * padding)

    ctx.beginPath()
    ctx.arc(x, y, 4, 0, 2 * Math.PI)
    ctx.fill()
  })

  // Add labels
  ctx.fillStyle = "#6b7280"
  ctx.font = "12px Cairo"
  ctx.textAlign = "center"

  // Y-axis labels
  for (let i = 0; i <= 5; i++) {
    const value = (maxValue * (5 - i)) / 5
    const y = padding + (i * (height - 2 * padding)) / 5
    ctx.fillText(Math.round(value).toLocaleString(), 20, y + 4)
  }

  // X-axis labels
  const labels = ["30 يوم", "25 يوم", "20 يوم", "15 يوم", "10 يوم", "5 أيام", "اليوم"]
  for (let i = 0; i <= 6; i++) {
    const x = padding + (i * (width - 2 * padding)) / 6
    ctx.fillText(labels[i], x, height - 10)
  }
}

function generateChartData(days) {
  const data = []
  for (let i = 0; i < days; i++) {
    // Generate realistic engagement data with some randomness
    const baseValue = 1000 + Math.sin(i * 0.2) * 500
    const randomVariation = (Math.random() - 0.5) * 400
    data.push(Math.max(0, baseValue + randomVariation))
  }
  return data
}

function updateChart(period, platform = "all") {
  const canvas = document.getElementById("engagementChart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  // Generate different data based on period
  let days
  switch (period) {
    case "أسبوعي":
      days = 7
      break
    case "شهري":
      days = 30
      break
    default:
      days = 30
  }

  drawChart(ctx, canvas.width, canvas.height)
}

function logout() {
  if (confirm("هل أنت متأكد من تسجيل الخروج؟")) {
    localStorage.removeItem("user")
    localStorage.removeItem("sidebarCollapsed")
    window.location.href = "login.html"
  }
}

// Utility functions
function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "م"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "ك"
  }
  return num.toString()
}

function getTimeAgo(date) {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (days > 0) {
    return `منذ ${days} ${days === 1 ? "يوم" : "أيام"}`
  } else if (hours > 0) {
    return `منذ ${hours} ${hours === 1 ? "ساعة" : "ساعات"}`
  } else {
    return `منذ ${minutes} ${minutes === 1 ? "دقيقة" : "دقائق"}`
  }
}

// Handle window resize
window.addEventListener("resize", () => {
  const canvas = document.getElementById("engagementChart")
  if (canvas) {
    const ctx = canvas.getContext("2d")
    drawChart(ctx, canvas.width, canvas.height)
  }

  // Handle mobile sidebar
  if (window.innerWidth <= 768) {
    setupMobileSidebar()
  }
})
