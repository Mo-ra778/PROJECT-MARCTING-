// Trends page functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeTrends()
  loadTrendingTopics()
  loadHashtags()
  loadAnalytics()
  loadCompetitors()
})

// Sample data
const trendingData = {
  all: [
    {
      id: 1,
      title: "الذكاء الاصطناعي في التعليم",
      rank: 1,
      engagement: "45.2K",
      mentions: "12.8K",
      growth: "+125%",
      description: "كيف يغير الذكاء الاصطناعي مستقبل التعليم والتعلم الإلكتروني",
      tags: ["AI", "تعليم", "تكنولوجيا"],
      platform: "all",
      category: "technology",
    },
    {
      id: 2,
      title: "نصائح الصحة النفسية",
      rank: 2,
      engagement: "38.7K",
      mentions: "9.2K",
      growth: "+89%",
      description: "أهمية الاهتمام بالصحة النفسية في العصر الحديث",
      tags: ["صحة", "نفسية", "رفاهية"],
      platform: "instagram",
      category: "lifestyle",
    },
    {
      id: 3,
      title: "ريادة الأعمال الناشئة",
      rank: 3,
      engagement: "32.1K",
      mentions: "7.5K",
      growth: "+67%",
      description: "قصص نجاح رواد الأعمال الشباب في المنطقة العربية",
      tags: ["ريادة", "أعمال", "نجاح"],
      platform: "youtube",
      category: "business",
    },
    {
      id: 4,
      title: "الطبخ الصحي السريع",
      rank: 4,
      engagement: "28.9K",
      mentions: "6.8K",
      growth: "+54%",
      description: "وصفات سريعة وصحية للحياة العملية المزدحمة",
      tags: ["طبخ", "صحة", "وصفات"],
      platform: "tiktok",
      category: "lifestyle",
    },
    {
      id: 5,
      title: "التسويق الرقمي 2024",
      rank: 5,
      engagement: "25.3K",
      mentions: "5.9K",
      growth: "+43%",
      description: "أحدث استراتيجيات التسويق الرقمي والتجارة الإلكترونية",
      tags: ["تسويق", "رقمي", "استراتيجية"],
      platform: "twitter",
      category: "business",
    },
  ],
}

const hashtagsData = {
  trending: [
    { tag: "#الذكاء_الاصطناعي", count: "45.2K", growth: "+125%" },
    { tag: "#ريادة_الأعمال", count: "32.1K", growth: "+89%" },
    { tag: "#الصحة_النفسية", count: "28.7K", growth: "+76%" },
    { tag: "#التعليم_الرقمي", count: "24.5K", growth: "+65%" },
    { tag: "#الطبخ_الصحي", count: "21.3K", growth: "+54%" },
    { tag: "#التسويق_الرقمي", count: "19.8K", growth: "+43%" },
    { tag: "#التكنولوجيا", count: "17.2K", growth: "+38%" },
    { tag: "#الإبداع", count: "15.6K", growth: "+32%" },
  ],
  recommended: [
    { tag: "#محتوى_عربي", count: "12.4K", growth: "+28%" },
    { tag: "#تطوير_الذات", count: "11.8K", growth: "+25%" },
    { tag: "#الابتكار", count: "10.9K", growth: "+22%" },
    { tag: "#التعلم_المستمر", count: "9.7K", growth: "+19%" },
    { tag: "#النجاح", count: "8.5K", growth: "+16%" },
    { tag: "#الإلهام", count: "7.3K", growth: "+13%" },
  ],
}

const competitorsData = [
  
  {
    id: 1,
    name: "محمد الادريسي  ",
    handle: "mohamed_edrees@",
    avatar: "أ",
    followers: "76K",
    engagement: "7.8%",
    posts: "198",
  },
  {
    id: 2,
    name: "اسامه شميس ",
    handle: "@osama_shamis",
    avatar: "س",
    followers: "98K",
    engagement: "9.2%",
    posts: "287",
  },
  
  {
    id: 3,
    name: "رؤوف العقاب ",
    handle: "@roaof_aloqab",
    avatar: "أ",
    followers: "76K",
    engagement: "7.8%",
    posts: "198",
  },
  {
    id: 4,
    name: " سليمان العربي ",
    handle: "soliman_arabic@",
    avatar: "م",
    followers: "125K",
    engagement: "8.4%",
    posts: "342",
  },
]

function initializeTrends() {
  // Set up event listeners
  document.getElementById("trendSearch").addEventListener("input", debounce(searchTrends, 300))

  // Initialize charts
  setTimeout(() => {
    initializeMetricCharts()
  }, 100)
}

function loadTrendingTopics() {
  const grid = document.getElementById("trendingGrid")
  const platform = document.getElementById("platformFilter").value
  const category = document.getElementById("categoryFilter").value

  let filteredTrends = trendingData.all

  if (platform !== "all") {
    filteredTrends = filteredTrends.filter((trend) => trend.platform === platform || trend.platform === "all")
  }

  if (category !== "all") {
    filteredTrends = filteredTrends.filter((trend) => trend.category === category)
  }

  grid.innerHTML = ""

  filteredTrends.forEach((trend) => {
    const trendCard = createTrendCard(trend)
    grid.appendChild(trendCard)
  })

  // Add animation
  setTimeout(() => {
    grid.querySelectorAll(".trend-card").forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("fade-in")
      }, index * 100)
    })
  }, 50)
}

function createTrendCard(trend) {
  const card = document.createElement("div")
  card.className = "trend-card"
  card.innerHTML = `
        <div class="trend-header">
            <h3 class="trend-title">${trend.title}</h3>
            <span class="trend-rank">#${trend.rank}</span>
        </div>
        <div class="trend-stats">
            <div class="trend-stat">
                <span class="trend-stat-icon">❤️</span>
                <span>${trend.engagement}</span>
            </div>
            <div class="trend-stat">
                <span class="trend-stat-icon">💬</span>
                <span>${trend.mentions}</span>
            </div>
            <div class="trend-stat">
                <span class="trend-stat-icon">📈</span>
                <span>${trend.growth}</span>
            </div>
        </div>
        <p class="trend-description">${trend.description}</p>
        <div class="trend-tags">
            ${trend.tags.map((tag) => `<span class="trend-tag">#${tag}</span>`).join("")}
        </div>
        <div class="trend-actions">
            <button class="trend-btn primary" onclick="useTrend(${trend.id})">استخدم الترند</button>
            <button class="trend-btn" onclick="saveTrend(${trend.id})">حفظ</button>
        </div>
    `
  return card
}

function loadHashtags(type = "trending") {
  const cloud = document.getElementById("hashtagCloud")
  const hashtags = hashtagsData[type]

  cloud.innerHTML = ""

  hashtags.forEach((hashtag, index) => {
    const hashtagElement = document.createElement("div")
    hashtagElement.className = "hashtag-item"
    hashtagElement.onclick = () => useHashtag(hashtag.tag)
    hashtagElement.innerHTML = `
            <span class="hashtag-text">${hashtag.tag}</span>
            <span class="hashtag-count">${hashtag.count}</span>
        `

    // Add size variation based on popularity
    const size = Math.max(0.8, 1.2 - index * 0.05)
    hashtagElement.style.fontSize = `${size}rem`

    cloud.appendChild(hashtagElement)
  })
}

function loadAnalytics() {
  // Load performance data
  const performanceList = document.getElementById("performanceList")
  const performanceData = [
    {
      rank: 1,
      title: "دليل شامل للذكاء الاصطناعي",
      likes: "2.4K",
      comments: "156",
      shares: "89",
      views: "12.5K",
    },
    {
      rank: 2,
      title: "نصائح لتطوير المهارات الشخصية",
      likes: "1.8K",
      comments: "124",
      shares: "67",
      views: "9.8K",
    },
    {
      rank: 3,
      title: "استراتيجيات التسويق الحديثة",
      likes: "1.5K",
      comments: "98",
      shares: "54",
      views: "8.2K",
    },
  ]

  performanceList.innerHTML = ""

  performanceData.forEach((item) => {
    const performanceItem = document.createElement("div")
    performanceItem.className = "performance-item"
    performanceItem.innerHTML = `
            <div class="performance-rank">${item.rank}</div>
            <div class="performance-content">
                <div class="performance-title-text">${item.title}</div>
                <div class="performance-stats">
                    <div class="performance-metric">
                        <span>❤️</span>
                        <span>${item.likes}</span>
                    </div>
                    <div class="performance-metric">
                        <span>💬</span>
                        <span>${item.comments}</span>
                    </div>
                    <div class="performance-metric">
                        <span>🔄</span>
                        <span>${item.shares}</span>
                    </div>
                    <div class="performance-metric">
                        <span>👁️</span>
                        <span>${item.views}</span>
                    </div>
                </div>
            </div>
        `
    performanceList.appendChild(performanceItem)
  })
}

function loadCompetitors() {
  const grid = document.getElementById("competitorGrid")
  grid.innerHTML = ""

  competitorsData.forEach((competitor) => {
    const competitorCard = document.createElement("div")
    competitorCard.className = "competitor-card"
    competitorCard.innerHTML = `
            <div class="competitor-header">
                <div class="competitor-avatar">${competitor.avatar}</div>
                <div class="competitor-info">
                    <div class="competitor-name">${competitor.name}</div>
                    <div class="competitor-handle">${competitor.handle}</div>
                </div>
            </div>
            <div class="competitor-stats">
                <div class="competitor-stat">
                    <div class="competitor-stat-value">${competitor.followers}</div>
                    <div class="competitor-stat-label">متابع</div>
                </div>
                <div class="competitor-stat">
                    <div class="competitor-stat-value">${competitor.engagement}</div>
                    <div class="competitor-stat-label">تفاعل</div>
                </div>
                <div class="competitor-stat">
                    <div class="competitor-stat-value">${competitor.posts}</div>
                    <div class="competitor-stat-label">منشور</div>
                </div>
            </div>
            <div class="competitor-actions">
                <button class="competitor-btn" onclick="analyzeCompetitor(${competitor.id})">تحليل</button>
                <button class="competitor-btn" onclick="removeCompetitor(${competitor.id})">إزالة</button>
            </div>
        `
    grid.appendChild(competitorCard)
  })
}

function initializeMetricCharts() {
  // Initialize engagement chart
  const engagementCanvas = document.getElementById("engagementChart")
  if (engagementCanvas) {
    drawMiniChart(engagementCanvas, generateChartData(7), "#9333ea")
  }

  // Initialize reach chart
  const reachCanvas = document.getElementById("reachChart")
  if (reachCanvas) {
    drawMiniChart(reachCanvas, generateChartData(7), "#06b6d4")
  }

  // Initialize impressions chart
  const impressionsCanvas = document.getElementById("impressionsChart")
  if (impressionsCanvas) {
    drawMiniChart(impressionsCanvas, generateChartData(7), "#f59e0b")
  }
}

function drawMiniChart(canvas, data, color) {
  const ctx = canvas.getContext("2d")
  const width = canvas.width
  const height = canvas.height
  const padding = 10

  // Clear canvas
  ctx.clearRect(0, 0, width, height)

  if (data.length === 0) return

  const maxValue = Math.max(...data)
  const minValue = Math.min(...data)
  const range = maxValue - minValue || 1

  // Draw line
  ctx.strokeStyle = color
  ctx.lineWidth = 2
  ctx.beginPath()

  data.forEach((value, index) => {
    const x = padding + (index * (width - 2 * padding)) / (data.length - 1)
    const y = height - padding - ((value - minValue) / range) * (height - 2 * padding)

    if (index === 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  })

  ctx.stroke()

  // Draw area under curve
  ctx.globalAlpha = 0.1
  ctx.fillStyle = color
  ctx.lineTo(width - padding, height - padding)
  ctx.lineTo(padding, height - padding)
  ctx.closePath()
  ctx.fill()
  ctx.globalAlpha = 1
}

function generateChartData(days) {
  const data = []
  for (let i = 0; i < days; i++) {
    const baseValue = 50 + Math.sin(i * 0.5) * 20
    const randomVariation = (Math.random() - 0.5) * 10
    data.push(Math.max(0, baseValue + randomVariation))
  }
  return data
}

// Event handlers
function filterTrends() {
  loadTrendingTopics()
}

function searchTrends() {
  const query = document.getElementById("trendSearch").value.toLowerCase()
  const grid = document.getElementById("trendingGrid")
  const cards = grid.querySelectorAll(".trend-card")

  cards.forEach((card) => {
    const title = card.querySelector(".trend-title").textContent.toLowerCase()
    const description = card.querySelector(".trend-description").textContent.toLowerCase()

    if (title.includes(query) || description.includes(query)) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

function refreshTrends() {
  const refreshBtn = document.querySelector(".refresh-btn")
  const icon = refreshBtn.querySelector(".refresh-icon")

  icon.style.animation = "spin 1s linear infinite"

  setTimeout(() => {
    loadTrendingTopics()
    icon.style.animation = "none"
    showAlert("تم تحديث الترندات بنجاح!", "success")
  }, 1000)
}

function toggleHashtagView(type) {
  const buttons = document.querySelectorAll(".toggle-btn")
  buttons.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  loadHashtags(type)
}

function changePeriod(period) {
  const buttons = document.querySelectorAll(".period-btn")
  buttons.forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")

  // Reload analytics with new period
  setTimeout(() => {
    initializeMetricCharts()
  }, 100)
}

function useTrend(trendId) {
  showAlert("تم إضافة الترند إلى أفكارك!", "success")
  // Here you would typically save the trend to the user's ideas
}

function saveTrend(trendId) {
  showAlert("تم حفظ الترند بنجاح!", "success")
  // Here you would typically save the trend to the user's saved items
}

function useHashtag(hashtag) {
  // Copy hashtag to clipboard
  navigator.clipboard
    .writeText(hashtag)
    .then(() => {
      showAlert(`تم نسخ ${hashtag} إلى الحافظة!`, "success")
    })
    .catch(() => {
      showAlert("حدث خطأ في النسخ", "danger")
    })
}

function addCompetitor() {
  const name = prompt("أدخل اسم المنافس:")
  if (name) {
    showAlert(`تم إضافة ${name} إلى قائمة المنافسين!`, "success")
    // Here you would typically add the competitor to the list
  }
}

function analyzeCompetitor(competitorId) {
  showAlert("جاري تحليل المنافس...", "info")
  // Here you would typically show detailed competitor analysis
}

function removeCompetitor(competitorId) {
  if (confirm("هل أنت متأكد من إزالة هذا المنافس؟")) {
    showAlert("تم إزالة المنافس بنجاح!", "success")
    // Here you would typically remove the competitor from the list
  }
}

// Utility functions
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function showAlert(message, type = "success") {
  // Remove existing alerts
  const existingAlerts = document.querySelectorAll(".alert")
  existingAlerts.forEach((alert) => alert.remove())

  const alert = document.createElement("div")
  alert.className = `alert alert-${type}`
  alert.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        max-width: 400px;
        padding: 1rem;
        border-radius: 8px;
        font-weight: 500;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    `

  // Set colors based on type
  switch (type) {
    case "success":
      alert.style.background = "rgba(34, 197, 94, 0.1)"
      alert.style.border = "1px solid rgba(34, 197, 94, 0.2)"
      alert.style.color = "#059669"
      break
    case "danger":
      alert.style.background = "rgba(239, 68, 68, 0.1)"
      alert.style.border = "1px solid rgba(239, 68, 68, 0.2)"
      alert.style.color = "#dc2626"
      break
    case "info":
      alert.style.background = "rgba(59, 130, 246, 0.1)"
      alert.style.border = "1px solid rgba(59, 130, 246, 0.2)"
      alert.style.color = "#2563eb"
      break
  }

  alert.textContent = message
  document.body.appendChild(alert)

  setTimeout(() => {
    alert.remove()
  }, 5000)
}
