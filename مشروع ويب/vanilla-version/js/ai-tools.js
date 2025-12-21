// AI Tools functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeAITools()
  setupToolSwitching()
  categorizeTools()
  setupFilters()
  applyFilters(false)
  loadUsageHistory()
})

let currentTool = "contentGenerator"
let userCredits = 150

// Sample data for AI responses
const aiResponses = {
  contentGenerator: {
    post: [
      "🌟 هل تعلم أن الذكاء الاصطناعي يمكنه تحليل مشاعر النصوص بدقة تصل إلى 95%؟\n\nهذا يعني أن المستقبل سيكون مليئاً بالتطبيقات الذكية التي تفهم مشاعرنا وتتفاعل معنا بطريقة أكثر إنسانية.\n\n#الذكاء_الاصطناعي #التكنولوجيا #المستقبل",
      "💡 الإبداع ليس مجرد موهبة، بل مهارة يمكن تطويرها!\n\nإليك 3 طرق لتنمية إبداعك:\n1️⃣ اقرأ في مجالات مختلفة\n2️⃣ تحدث مع أشخاص من خلفيات متنوعة\n3️⃣ خصص وقتاً يومياً للتفكير الحر\n\nما هي طريقتك المفضلة لتحفيز الإبداع؟ 🤔",
    ],
    article: [
      "# قوة الذكاء الاصطناعي في تغيير مستقبل العمل\n\nيشهد عالم اليوم تطوراً مذهلاً في تقنيات الذكاء الاصطناعي، مما يثير تساؤلات حول مستقبل الوظائف والمهن. في هذا المقال، سنستكشف كيف يمكن للذكاء الاصطناعي أن يكون شريكاً في النجاح بدلاً من منافس.\n\n## التحديات والفرص\n\nبينما يخشى البعض من أن يحل الذكاء الاصطناعي محل الوظائف التقليدية، تشير الدراسات إلى أن التقنيات الجديدة ستخلق فرصاً وظيفية جديدة تتطلب مهارات مختلفة...",
    ],
  },
  textOptimizer: {
    improvements: [
      "تحسين وضوح الجملة الافتتاحية",
      "إضافة كلمات انتقالية لتحسين التدفق",
      "تقوية الدعوة للعمل في النهاية",
      "تحسين استخدام علامات الترقيم",
    ],
  },
  hashtags: {
    trending: ["#الذكاء_الاصطناعي", "#تكنولوجيا", "#ابتكار", "#مستقبل", "#تطوير"],
    niche: ["#برمجة", "#تعلم_آلي", "#بيانات", "#خوارزميات", "#روبوتات"],
    engagement: ["#تفاعل", "#مشاركة", "#إلهام", "#نجاح", "#تحدي"],
  },
  captions: [
    {
      type: "تحفيزي",
      content:
        "🚀 كل يوم هو فرصة جديدة لتحقيق أحلامك! لا تدع الخوف يمنعك من المحاولة. ابدأ اليوم، ولو بخطوة صغيرة. #تحفيز #نجاح #أحلام",
    },
    {
      type: "تعليمي",
      content:
        "💡 نصيحة اليوم: عند تعلم مهارة جديدة، خصص 20 دقيقة يومياً للممارسة. الثبات أهم من الكمية! #تعلم #مهارات #تطوير_الذات",
    },
    {
      type: "تفاعلي",
      content: "🤔 سؤال اليوم: ما هي المهارة التي تتمنى تعلمها هذا العام؟ شاركنا في التعليقات! #سؤال #تفاعل #مهارات",
    },
  ],
}

function initializeAITools() {
  // Update credits display
  updateCreditsDisplay()

  // Set up tool cards click handlers
  document.querySelectorAll(".tool-card").forEach((card) => {
    card.addEventListener("click", () => {
      const toolId = card.id
      switchTool(toolId)
    })
  })

  // Show default tool
  switchTool(currentTool)
}

function setupToolSwitching() {
  // Content generator form handlers
  document.getElementById("contentType")?.addEventListener("change", updateContentForm)
}

function switchTool(toolId) {
  // Update active tool card
  document.querySelectorAll(".tool-card").forEach((card) => {
    card.classList.remove("active")
  })
  document.getElementById(toolId)?.classList.add("active")

  // Update active workspace panel with fallback
  const panels = document.querySelectorAll(".workspace-panel")
  panels.forEach((panel) => panel.classList.remove("active"))

  const targetPanel = document.getElementById(toolId + "Panel")
  if (targetPanel) {
    targetPanel.classList.add("active")
  } else {
    // Fallback to content generator panel for tools without dedicated panels
    document.getElementById("contentGeneratorPanel")?.classList.add("active")
  }

  currentTool = toolId
}

// ===== Filters (Categories + Search) =====
let currentCategoryFilter = "الكل"
let currentSearchQuery = ""

// Map known tool IDs to categories
const toolCategoryMap = {
  // نصوص
  contentGenerator: "نصوص",
  textOptimizer: "نصوص",
  transcriptToArticle: "نصوص",
  summarizer: "نصوص",
  paraphraser: "نصوص",
  titleGenerator: "نصوص",
  outlineGenerator: "نصوص",
  // سوشيال
  hashtagGenerator: "سوشيال",
  captionWriter: "سوشيال",
  memeGenerator: "سوشيال",
  abHeadlineTester: "سوشيال",
  // صور
  imageGenerator: "صور",
  thumbnailMaker: "صور",
  backgroundRemover: "صور",
  styleTransfer: "صور",
  imageUpscaler: "صور",
  watermarkAdder: "صور",
  // فيديو
  videoGenerator: "فيديو",
  scriptToScenes: "فيديو",
  subtitleGenerator: "فيديو",
  // صوت
  voiceoverGenerator: "صوت",
  noiseReducer: "صوت",
  // SEO
  keywordExtractor: "SEO",
  seoOptimizer: "SEO",
  // ترجمة
  translator: "ترجمة",
  // تحليل
  sentimentAnalyzer: "تحليل",
  // تخطيط
  ideaBrainstorm: "تخطيط",
  contentCalendar: "تخطيط",
}

function inferCategoryFromId(id) {
  const lower = id.toLowerCase()
  if (/(image|photo|thumbnail|background|style|upscal|watermark)/.test(lower)) return "صور"
  if (/(video|scene|subtitle|captioning)/.test(lower)) return "فيديو"
  if (/(voice|audio|noise|speech)/.test(lower)) return "صوت"
  if (/(seo|keyword|rank|meta)/.test(lower)) return "SEO"
  if (/(translate|translator|lang)/.test(lower)) return "ترجمة"
  if (/(sentiment|analy|insight|metric|ab)/.test(lower)) return "تحليل"
  if (/(idea|plan|calendar|outline|roadmap)/.test(lower)) return "تخطيط"
  if (/(hash|hashtag|social|meme|caption)/.test(lower)) return "سوشيال"
  return "نصوص"
}

function categorizeTools() {
  document.querySelectorAll(".tool-card").forEach((card) => {
    const id = card.id
    const category = toolCategoryMap[id] || inferCategoryFromId(id)
    card.dataset.category = category
  })
}

function setupFilters() {
  // Category tabs
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
      currentCategoryFilter = btn.dataset.category || "الكل"
      // If "All" selected, clear search to show everything
      if (currentCategoryFilter === "الكل") {
        const searchInput = document.getElementById("toolsSearchInput")
        if (searchInput && searchInput.value) {
          searchInput.value = ""
          currentSearchQuery = ""
        }
      }
      applyFilters(true)
    })
  })

  // Search input
  const searchInput = document.getElementById("toolsSearchInput")
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      currentSearchQuery = searchInput.value.trim().toLowerCase()
      applyFilters(true)
    })
  }
}

function applyFilters(autoActivate = false) {
  const category = currentCategoryFilter
  const query = currentSearchQuery

  const cards = Array.from(document.querySelectorAll(".tool-card"))
  cards.forEach((card) => {
    const cardCategory = card.dataset.category || "نصوص"
    const title = card.querySelector(".tool-title")?.textContent?.toLowerCase() || ""
    const desc = card.querySelector(".tool-description")?.textContent?.toLowerCase() || ""
    const id = card.id?.toLowerCase() || ""

    const matchesCategory = category === "الكل" || cardCategory === category
    const matchesQuery = !query || title.includes(query) || desc.includes(query) || id.includes(query)

    card.style.display = matchesCategory && matchesQuery ? "" : "none"
  })

  if (autoActivate) {
    const firstVisible = cards.find((c) => c.style.display !== "none")
    if (firstVisible) {
      switchTool(firstVisible.id)
    }
  }
}

function updateCreditsDisplay() {
  const creditsText = document.querySelector(".credits-text")
  if (creditsText) {
    creditsText.textContent = `الرصيد: ${userCredits} نقطة`
  }
}

function deductCredits(amount) {
  if (userCredits >= amount) {
    userCredits -= amount
    updateCreditsDisplay()
    return true
  } else {
    showAlert("رصيدك غير كافي! يرجى شراء المزيد من النقاط.", "danger")
    return false
  }
}

// Content Generator Functions
function generateContent() {
  const contentType = document.getElementById("contentType").value
  const topic = document.getElementById("contentTopic").value.trim()

  if (!topic) {
    showAlert("يرجى إدخال موضوع أو فكرة للمحتوى", "danger")
    return
  }

  if (!deductCredits(5)) return

  const outputContent = document.getElementById("generatedContent")
  outputContent.innerHTML = '<div class="generating"><div class="loading-spinner"></div>جاري توليد المحتوى...</div>'

  setTimeout(() => {
    const responses = aiResponses.contentGenerator[contentType] || aiResponses.contentGenerator.post
    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    outputContent.innerHTML = `<div class="generated-text">${randomResponse.replace(/\n/g, "<br>")}</div>`
    outputContent.classList.add("fade-in")

    // Add to history
    addToHistory("مولد المحتوى", topic, 5)
    showAlert("تم توليد المحتوى بنجاح!", "success")
  }, 2000)
}

function clearWorkspace() {
  document.getElementById("contentTopic").value = ""
  document.getElementById("generatedContent").innerHTML = `
        <div class="output-placeholder">
            <div class="placeholder-icon">🤖</div>
            <p>اكتب موضوعك واضغط "توليد" لإنشاء محتوى مميز بالذكاء الاصطناعي</p>
        </div>
    `
}

function copyContent() {
  const generatedText = document.querySelector(".generated-text")
  if (generatedText) {
    const text = generatedText.textContent
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showAlert("تم نسخ المحتوى بنجاح!", "success")
        document.getElementById("copyBtn").textContent = "تم النسخ ✓"
        setTimeout(() => {
          document.getElementById("copyBtn").textContent = "نسخ"
        }, 2000)
      })
      .catch(() => {
        showAlert("حدث خطأ في النسخ", "danger")
      })
  }
}

function saveContent() {
  const generatedText = document.querySelector(".generated-text")
  if (generatedText) {
    showAlert("تم حفظ المحتوى في مكتبتك!", "success")
    // Here you would typically save to local storage or send to server
  }
}

function regenerateContent() {
  generateContent()
}

// Text Optimizer Functions
function optimizeText() {
  const originalText = document.getElementById("originalText").value.trim()

  if (!originalText) {
    showAlert("يرجى إدخال النص المراد تحسينه", "danger")
    return
  }

  if (!deductCredits(3)) return

  const optimizedContent = document.getElementById("optimizedText")
  optimizedContent.innerHTML = '<div class="generating"><div class="loading-spinner"></div>جاري تحسين النص...</div>'

  setTimeout(() => {
    // Simulate text optimization
    const optimizedText = enhanceText(originalText)
    optimizedContent.innerHTML = `<div class="optimized-text">${optimizedText.replace(/\n/g, "<br>")}</div>`

    // Show improvement summary
    const summaryDiv = document.getElementById("improvementSummary")
    const summaryItems = document.getElementById("summaryItems")
    summaryItems.innerHTML = aiResponses.textOptimizer.improvements
      .map((improvement) => `<div class="summary-item">✓ ${improvement}</div>`)
      .join("")
    summaryDiv.style.display = "block"

    addToHistory("محسن النصوص", originalText.substring(0, 50) + "...", 3)
    showAlert("تم تحسين النص بنجاح!", "success")
  }, 1500)
}

function enhanceText(text) {
  // Simple text enhancement simulation
  let enhanced = text

  // Add some improvements
  enhanced = enhanced.replace(/\./g, ". 🌟")
  enhanced = enhanced.replace(/!/g, "! ✨")
  enhanced = "💡 " + enhanced

  return enhanced
}

function clearOptimizer() {
  document.getElementById("originalText").value = ""
  document.getElementById("optimizedText").innerHTML = `
        <div class="output-placeholder">
            <div class="placeholder-icon">🔧</div>
            <p>الصق نصك واختر خيارات التحسين ثم اضغط "تحسين"</p>
        </div>
    `
  document.getElementById("improvementSummary").style.display = "none"
}

// Hashtag Generator Functions
function generateHashtags() {
  const content = document.getElementById("hashtagContent").value.trim()
  const platform = document.getElementById("hashtagPlatform").value
  const count = Number.parseInt(document.getElementById("hashtagCount").value)

  if (!content) {
    showAlert("يرجى إدخال وصف للمحتوى", "danger")
    return
  }

  if (!deductCredits(2)) return

  const categoriesDiv = document.getElementById("hashtagCategories")
  categoriesDiv.innerHTML = '<div class="generating"><div class="loading-spinner"></div>جاري توليد الهاشتاغات...</div>'

  setTimeout(() => {
    const categories = [
      { title: "🔥 رائجة", hashtags: aiResponses.hashtags.trending },
      { title: "🎯 متخصصة", hashtags: aiResponses.hashtags.niche },
      { title: "💬 تفاعلية", hashtags: aiResponses.hashtags.engagement },
    ]

    categoriesDiv.innerHTML = categories
      .map(
        (category) => `
            <div class="hashtag-category">
                <h4 class="category-title">${category.title}</h4>
                <div class="category-hashtags">
                    ${category.hashtags
                      .slice(0, Math.ceil(count / 3))
                      .map(
                        (hashtag) => `
                        <span class="hashtag-item" onclick="toggleHashtag(this)">${hashtag}</span>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        `,
      )
      .join("")

    addToHistory("مولد الهاشتاغات", content.substring(0, 50) + "...", 2)
    showAlert("تم توليد الهاشتاغات بنجاح!", "success")
  }, 1000)
}

function toggleHashtag(element) {
  element.classList.toggle("selected")
}

function clearHashtags() {
  document.getElementById("hashtagContent").value = ""
  document.getElementById("hashtagCategories").innerHTML = ""
}

// Caption Writer Functions
function generateCaption() {
  const description = document.getElementById("mediaDescription").value.trim()
  const type = document.getElementById("captionType").value
  const mood = document.getElementById("captionMood").value

  if (!description) {
    showAlert("يرجى إدخال وصف للصورة أو الفيديو", "danger")
    return
  }

  if (!deductCredits(4)) return

  const variationsDiv = document.getElementById("captionVariations")
  variationsDiv.innerHTML = '<div class="generating"><div class="loading-spinner"></div>جاري كتابة التعليقات...</div>'

  setTimeout(() => {
    const variations = aiResponses.captions.map((caption, index) => ({
      ...caption,
      id: index,
    }))

    variationsDiv.innerHTML = variations
      .map(
        (variation) => `
            <div class="caption-variation">
                <div class="variation-header">
                    <span class="variation-type">${variation.type}</span>
                    <div class="variation-actions">
                        <button class="variation-btn" onclick="copyCaption(${variation.id})">نسخ</button>
                        <button class="variation-btn" onclick="saveCaption(${variation.id})">حفظ</button>
                    </div>
                </div>
                <div class="variation-content" id="caption-${variation.id}">${variation.content}</div>
            </div>
        `,
      )
      .join("")

    addToHistory("كاتب التعليقات", description.substring(0, 50) + "...", 4)
    showAlert("تم إنشاء التعليقات بنجاح!", "success")
  }, 1500)
}

function copyCaption(id) {
  const captionElement = document.getElementById(`caption-${id}`)
  if (captionElement) {
    navigator.clipboard
      .writeText(captionElement.textContent)
      .then(() => {
        showAlert("تم نسخ التعليق بنجاح!", "success")
      })
      .catch(() => {
        showAlert("حدث خطأ في النسخ", "danger")
      })
  }
}

function saveCaption(id) {
  showAlert("تم حفظ التعليق في مكتبتك!", "success")
}

function clearCaption() {
  document.getElementById("mediaDescription").value = ""
  document.getElementById("captionVariations").innerHTML = `
        <div class="output-placeholder">
            <div class="placeholder-icon">💬</div>
            <p>اكتب وصف محتواك واضغط "كتابة" للحصول على تعليقات مميزة</p>
        </div>
    `
}

// Usage History Functions
function loadUsageHistory() {
  const historyList = document.getElementById("historyList")
  const history = JSON.parse(localStorage.getItem("aiToolsHistory") || "[]")

  if (history.length === 0) {
    historyList.innerHTML = `
            <div class="history-item">
                <div class="history-info">
                    <div class="history-tool">لا يوجد سجل استخدام</div>
                    <div class="history-preview">ابدأ باستخدام أدوات الذكاء الاصطناعي لرؤية سجل استخدامك هنا</div>
                </div>
            </div>
        `
    return
  }

  historyList.innerHTML = history
    .slice(-10) // Show last 10 items
    .reverse()
    .map(
      (item) => `
        <div class="history-item">
            <div class="history-info">
                <div class="history-tool">${item.tool}</div>
                <div class="history-preview">${item.preview}</div>
            </div>
            <div class="history-meta">
                <div class="history-time">${item.time}</div>
                <div class="history-cost">-${item.cost} نقطة</div>
            </div>
        </div>
    `,
    )
    .join("")
}

function addToHistory(tool, preview, cost) {
  const history = JSON.parse(localStorage.getItem("aiToolsHistory") || "[]")
  const now = new Date()

  history.push({
    tool,
    preview,
    cost,
    time: now.toLocaleString("ar-SA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    timestamp: now.getTime(),
  })

  // Keep only last 50 items
  if (history.length > 50) {
    history.splice(0, history.length - 50)
  }

  localStorage.setItem("aiToolsHistory", JSON.stringify(history))
  loadUsageHistory()
}

function clearHistory() {
  if (confirm("هل أنت متأكد من مسح سجل الاستخدام؟")) {
    localStorage.removeItem("aiToolsHistory")
    loadUsageHistory()
    showAlert("تم مسح سجل الاستخدام بنجاح!", "success")
  }
}

// Utility Functions
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
