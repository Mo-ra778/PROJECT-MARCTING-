// Ideas Page Functionality
document.addEventListener("DOMContentLoaded", () => {
  // Sample ideas data
  const ideasData = [
    {
      id: 1,
      title: "10 نصائح لزيادة التفاعل على إنستغرام",
      description: "شارك نصائح عملية لزيادة معدل التفاعل والوصول على منصة إنستغرام",
      category: "social",
      platform: "instagram",
      difficulty: "easy",
      tags: ["إنستغرام", "تفاعل", "نصائح"],
      date: "2024-01-15",
      success_score: 95,
      views: "250K",
      likes: "15K",
      shares: "2.5K",
      is_successful: true,
    },
    {
      id: 2,
      title: "فيديو تحدي الـ 30 ثانية",
      description: "أنشئ فيديو قصير يعرض مهارة أو موهبة في 30 ثانية فقط",
      category: "video",
      platform: "tiktok",
      difficulty: "medium",
      tags: ["تيك توك", "تحدي", "فيديو قصير"],
      date: "2024-01-14",
      success_score: 88,
      views: "500K",
      likes: "45K",
      shares: "8K",
      is_successful: true,
    },
    {
      id: 3,
      title: "مراجعة منتج بطريقة إبداعية",
      description: "قم بمراجعة منتج تستخدمه بطريقة مبتكرة وجذابة",
      category: "video",
      platform: "youtube",
      difficulty: "medium",
      tags: ["مراجعة", "منتج", "يوتيوب"],
      date: "2024-01-13",
      success_score: 92,
      views: "150K",
      likes: "12K",
      shares: "1.8K",
      is_successful: true,
    },
    {
      id: 4,
      title: "خيط تويتر عن تجربة شخصية",
      description: "اكتب خيط تويتر يحكي تجربة شخصية ملهمة أو درس تعلمته",
      category: "social",
      platform: "twitter",
      difficulty: "easy",
      tags: ["تويتر", "خيط", "تجربة شخصية"],
      date: "2024-01-12",
      success_score: 85,
      views: "180K",
      likes: "8K",
      shares: "3K",
      is_successful: true,
    },
    {
      id: 5,
      title: "دليل شامل للمبتدئين",
      description: "اكتب مقال شامل يساعد المبتدئين في مجال خبرتك",
      category: "blog",
      platform: "all",
      difficulty: "hard",
      tags: ["دليل", "مبتدئين", "تعليم"],
      date: "2024-01-11",
      success_score: 78,
      views: "75K",
      likes: "5K",
      shares: "1.2K",
      is_successful: false,
    },
    {
      id: 6,
      title: "قصة نجاح ملهمة",
      description: "شارك قصة نجاح شخصية أو لشخص تعرفه بطريقة ملهمة",
      category: "social",
      platform: "instagram",
      difficulty: "easy",
      tags: ["نجاح", "إلهام", "قصة"],
      date: "2024-01-10",
      success_score: 90,
      views: "320K",
      likes: "22K",
      shares: "4K",
      is_successful: true,
    },
    // Additional successful ideas
    {
      id: 7,
      title: "تحدي الـ7 أيام لتحسين الإنتاجية",
      description: "سلسلة منشورات يومية تحدي المشاهدين لتحسين إنتاجيتهم",
      category: "social",
      platform: "instagram",
      difficulty: "medium",
      tags: ["تحدي", "إنتاجية", "سلسلة"],
      date: "2024-01-09",
      success_score: 96,
      views: "400K",
      likes: "28K",
      shares: "6K",
      is_successful: true,
    },
    {
      id: 8,
      title: "فيديو توضيحي عن تطبيق جديد",
      description: "شرح كيفية استخدام تطبيق شائع بطريقة بسيطة وممتعة",
      category: "video",
      platform: "tiktok",
      difficulty: "easy",
      tags: ["تطبيق", "توضيح", "تعليم"],
      date: "2024-01-08",
      success_score: 89,
      views: "280K",
      likes: "18K",
      shares: "3.5K",
      is_successful: true,
    },
    {
      id: 9,
      title: "مقابلة مع خبير في المجال",
      description: "قم بمقابلة شخصية مع خبير لمشاركة خبراته مع الجمهور",
      category: "video",
      platform: "youtube",
      difficulty: "hard",
      tags: ["مقابلة", "خبير", "خبرة"],
      date: "2024-01-07",
      success_score: 94,
      views: "180K",
      likes: "14K",
      shares: "2.2K",
      is_successful: true,
    },
    {
      id: 10,
      title: "إنفوجرافيك عن إحصائيات مهمة",
      description: "صمم إنفوجرافيك جذاب يعرض إحصائيات مفيدة في مجالك",
      category: "social",
      platform: "instagram",
      difficulty: "medium",
      tags: ["إنفوجرافيك", "إحصائيات", "تصميم"],
      date: "2024-01-06",
      success_score: 87,
      views: "220K",
      likes: "16K",
      shares: "2.8K",
      is_successful: true,
    },
  ]

  // Initialize ideas page if exists
  if (document.getElementById("ideasGrid")) {
    initializeIdeasPage()
  }

  // Initialize posting times page if exists
  if (document.getElementById("scheduleBody")) {
    initializePostingTimesPage()
  }

  // Initialize schedule post page if exists
  if (document.getElementById("schedulePostForm")) {
    initializeSchedulePostPage()
  }

  // Initialize settings page if exists
  if (document.querySelector(".settings-container")) {
    initializeSettingsPage()
  }

  function initializeIdeasPage() {
    const ideasGrid = document.getElementById("ideasGrid")
    const searchInput = document.getElementById("searchInput")
    const categoryFilter = document.getElementById("categoryFilter")
    const platformFilter = document.getElementById("platformFilter")
    const difficultyFilter = document.getElementById("difficultyFilter")
    const successFilter = document.getElementById("successFilter")
    const addIdeaBtn = document.getElementById("addIdeaBtn")
    const loadMoreBtn = document.getElementById("loadMoreBtn")
    const modal = document.getElementById("addIdeaModal")
    const closeModal = document.getElementById("closeModal")
    const cancelBtn = document.getElementById("cancelBtn")
    const addIdeaForm = document.getElementById("addIdeaForm")

    let currentIdeas = [...ideasData].sort((a, b) => (b.success_score || 0) - (a.success_score || 0))
    let displayedCount = 6

    function renderIdeas(ideas = currentIdeas.slice(0, displayedCount)) {
      ideasGrid.innerHTML = ideas
        .map(
          (idea) => `
                <div class="idea-card ${idea.is_successful ? 'successful' : ''}" data-id="${idea.id}">
                    <div class="idea-header">
                        <h3 class="idea-title">${idea.title} ${idea.is_successful ? '<span class="success-badge"><i class="fas fa-star"></i> ناجح</span>' : ''}</h3>
                        <button class="idea-menu">
                            <i class="fas fa-ellipsis-v"></i>
                        </button>
                    </div>
                    <p class="idea-description">${idea.description}</p>
                    <div class="idea-meta">
                        ${idea.tags.map((tag) => `<span class="idea-tag">#${tag}</span>`).join("")}
                    </div>
                    ${idea.is_successful ? `
                    <div class="idea-success-stats">
                        <div class="stat-item">
                            <i class="fas fa-eye"></i>
                            <span>${idea.views}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-heart"></i>
                            <span>${idea.likes}</span>
                        </div>
                        <div class="stat-item">
                            <i class="fas fa-share"></i>
                            <span>${idea.shares}</span>
                        </div>
                    </div>
                    ` : ''}
                    <div class="idea-footer">
                        <div class="idea-platform">
                            <i class="fab fa-${getPlatformIcon(idea.platform)}"></i>
                            <span>${getPlatformName(idea.platform)}</span>
                        </div>
                        <div class="idea-success-score">
                            <span class="score-label">نسبة النجاح:</span>
                            <span class="score-value">${idea.success_score || 0}%</span>
                        </div>
                        <div class="idea-actions">
                            <button class="action-btn" title="إضافة للمفضلة">
                                <i class="fas fa-heart"></i>
                            </button>
                            <button class="action-btn" title="استخدام الفكرة">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `,
        )
        .join("")

      // Show/hide load more button
      loadMoreBtn.style.display = displayedCount >= currentIdeas.length ? "none" : "block"
    }

    function getPlatformIcon(platform) {
      const icons = {
        instagram: "instagram",
        tiktok: "tiktok",
        youtube: "youtube",
        twitter: "twitter",
        all: "globe",
      }
      return icons[platform] || "globe"
    }

    function getPlatformName(platform) {
      const names = {
        instagram: "إنستغرام",
        tiktok: "تيك توك",
        youtube: "يوتيوب",
        twitter: "تويتر",
        all: "جميع المنصات",
      }
      return names[platform] || "غير محدد"
    }

    function filterIdeas() {
      const searchTerm = searchInput.value.toLowerCase()
      const category = categoryFilter.value
      const platform = platformFilter.value
      const difficulty = difficultyFilter.value
      const success = successFilter.value

      currentIdeas = ideasData.filter((idea) => {
        const matchesSearch =
          idea.title.toLowerCase().includes(searchTerm) ||
          idea.description.toLowerCase().includes(searchTerm) ||
          idea.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
        const matchesCategory = category === "all" || idea.category === category
        const matchesPlatform = platform === "all" || idea.platform === platform || idea.platform === "all"
        const matchesDifficulty = difficulty === "all" || idea.difficulty === difficulty
        const matchesSuccess = success === "all" || (success === "successful" && idea.is_successful)

        return matchesSearch && matchesCategory && matchesPlatform && matchesDifficulty && matchesSuccess
      }).sort((a, b) => (b.success_score || 0) - (a.success_score || 0))

      displayedCount = 6
      renderIdeas()
    }

    // Event listeners
    searchInput.addEventListener("input", filterIdeas)
    categoryFilter.addEventListener("change", filterIdeas)
    platformFilter.addEventListener("change", filterIdeas)
    difficultyFilter.addEventListener("change", filterIdeas)
    successFilter.addEventListener("change", filterIdeas)

    loadMoreBtn.addEventListener("click", () => {
      displayedCount += 6
      renderIdeas()
    })

    addIdeaBtn.addEventListener("click", () => {
      modal.classList.add("active")
    })

    closeModal.addEventListener("click", () => {
      modal.classList.remove("active")
    })

    cancelBtn.addEventListener("click", () => {
      modal.classList.remove("active")
    })

    addIdeaForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = new FormData(addIdeaForm)
      const newIdea = {
        id: ideasData.length + 1,
        title: document.getElementById("ideaTitle").value,
        description: document.getElementById("ideaDescription").value,
        category: document.getElementById("ideaCategory").value,
        platform: document.getElementById("ideaPlatform").value,
        difficulty: "medium",
        tags: document
          .getElementById("ideaTags")
          .value.split(",")
          .map((tag) => tag.trim()),
        date: new Date().toISOString().split("T")[0],
      }

      ideasData.unshift(newIdea)
      currentIdeas = [...ideasData]
      renderIdeas()
      modal.classList.remove("active")
      addIdeaForm.reset()
    })

    // Initial render
    renderIdeas()
  }

  function initializePostingTimesPage() {
    const scheduleBody = document.getElementById("scheduleBody")
    const summaryGrid = document.getElementById("summaryGrid")
    const platformBtns = document.querySelectorAll(".platform-btn")

    const timeSlots = [
      "6:00",
      "7:00",
      "8:00",
      "9:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00",
    ]

    const days = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]

    const platformData = {
      all: {
        name: "جميع المنصات",
        bestTimes: ["19:00", "20:00", "21:00"],
        schedule: generateScheduleData("mixed"),
      },
      instagram: {
        name: "إنستغرام",
        bestTimes: ["18:00", "19:00", "20:00"],
        schedule: generateScheduleData("instagram"),
      },
      tiktok: {
        name: "تيك توك",
        bestTimes: ["19:00", "20:00", "21:00"],
        schedule: generateScheduleData("tiktok"),
      },
      youtube: {
        name: "يوتيوب",
        bestTimes: ["20:00", "21:00", "22:00"],
        schedule: generateScheduleData("youtube"),
      },
      twitter: {
        name: "تويتر",
        bestTimes: ["12:00", "18:00", "19:00"],
        schedule: generateScheduleData("twitter"),
      },
    }

    function generateScheduleData(platform) {
      const schedule = {}
      timeSlots.forEach((time) => {
        schedule[time] = {}
        days.forEach((day, index) => {
          let quality = "poor"
          const hour = Number.parseInt(time.split(":")[0])

          // Different patterns for different platforms
          if (platform === "instagram") {
            if ((hour >= 18 && hour <= 21) || (hour >= 11 && hour <= 13)) {
              quality = "optimal"
            } else if ((hour >= 15 && hour <= 17) || (hour >= 8 && hour <= 10)) {
              quality = "good"
            }
          } else if (platform === "tiktok") {
            if ((hour >= 19 && hour <= 22) || (hour >= 12 && hour <= 14)) {
              quality = "optimal"
            } else if ((hour >= 16 && hour <= 18) || (hour >= 9 && hour <= 11)) {
              quality = "good"
            }
          } else if (platform === "youtube") {
            if ((hour >= 20 && hour <= 23) || (hour >= 14 && hour <= 16)) {
              quality = "optimal"
            } else if ((hour >= 17 && hour <= 19) || (hour >= 10 && hour <= 13)) {
              quality = "good"
            }
          } else if (platform === "twitter") {
            if ((hour >= 12 && hour <= 13) || (hour >= 18 && hour <= 20)) {
              quality = "optimal"
            } else if ((hour >= 9 && hour <= 11) || (hour >= 15 && hour <= 17)) {
              quality = "good"
            }
          } else {
            // mixed
            if ((hour >= 19 && hour <= 21) || (hour >= 12 && hour <= 13)) {
              quality = "optimal"
            } else if ((hour >= 16 && hour <= 18) || (hour >= 9 && hour <= 11)) {
              quality = "good"
            }
          }

          // Weekend adjustments
          if (index === 5 || index === 6) {
            // Friday, Saturday
            if (hour >= 15 && hour <= 23) {
              quality = quality === "poor" ? "good" : "optimal"
            }
          }

          schedule[time][day] = {
            quality: quality,
            engagement: Math.floor(Math.random() * 50) + 50,
          }
        })
      })
      return schedule
    }

    function renderSchedule(platform = "all") {
      const data = platformData[platform]

      scheduleBody.innerHTML = timeSlots
        .map(
          (time) => `
                <div class="time-slot">${time}</div>
                ${days
                  .map((day) => {
                    const cellData = data.schedule[time][day]
                    return `<div class="schedule-cell ${cellData.quality}" title="${cellData.engagement}% تفاعل">
                        ${cellData.engagement}%
                    </div>`
                  })
                  .join("")}
            `,
        )
        .join("")

      // Render summary
      summaryGrid.innerHTML = Object.keys(platformData)
        .filter((p) => p !== "all")
        .map((p) => {
          const pData = platformData[p]
          return `
                    <div class="summary-item">
                        <div class="summary-platform">
                            <i class="fab fa-${getPlatformIcon(p)}"></i>
                        </div>
                        <div class="summary-time">${pData.bestTimes[0]}</div>
                        <div class="summary-engagement">أفضل وقت للنشر</div>
                    </div>
                `
        })
        .join("")
    }

    function getPlatformIcon(platform) {
      const icons = {
        instagram: "instagram",
        tiktok: "tiktok",
        youtube: "youtube",
        twitter: "twitter",
      }
      return icons[platform] || "globe"
    }

    // Platform selection
    platformBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        platformBtns.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
        renderSchedule(btn.dataset.platform)
      })
    })

    // Initial render
    renderSchedule()
  }

  function initializeSchedulePostPage() {
    const postContent = document.getElementById("postContent")
    const charCount = document.querySelector(".char-count")
    const mediaInput = document.getElementById("mediaInput")
    const uploadArea = document.getElementById("uploadArea")
    const mediaPreview = document.getElementById("mediaPreview")
    const hashtagInput = document.getElementById("hashtagInput")
    const addHashtagBtn = document.getElementById("addHashtagBtn")
    const hashtagsList = document.getElementById("hashtagsList")
    const scheduleTypeInputs = document.querySelectorAll('input[name="scheduleType"]')
    const scheduleDetails = document.getElementById("scheduleDetails")
    const optimalTimes = document.getElementById("optimalTimes")
    const schedulePostForm = document.getElementById("schedulePostForm")

    const uploadedFiles = []
    const hashtags = []

    // Character counter
    postContent.addEventListener("input", () => {
      const count = postContent.value.length
      charCount.textContent = `${count}/2200`
      charCount.style.color = count > 2200 ? "#ef4444" : "#6b7280"
    })

    // File upload
    uploadArea.addEventListener("click", () => mediaInput.click())
    uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault()
      uploadArea.style.borderColor = "#9333ea"
    })
    uploadArea.addEventListener("dragleave", () => {
      uploadArea.style.borderColor = "#d1d5db"
    })
    uploadArea.addEventListener("drop", (e) => {
      e.preventDefault()
      uploadArea.style.borderColor = "#d1d5db"
      handleFiles(e.dataTransfer.files)
    })

    mediaInput.addEventListener("change", (e) => {
      handleFiles(e.target.files)
    })

    function handleFiles(files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
          uploadedFiles.push(file)

          const reader = new FileReader()
          reader.onload = (e) => {
            const mediaItem = document.createElement("div")
            mediaItem.className = "media-item"
            mediaItem.innerHTML = `
                            <img src="${e.target.result}" alt="Media">
                            <button type="button" class="remove-media" onclick="removeMedia(${uploadedFiles.length - 1})">
                                <i class="fas fa-times"></i>
                            </button>
                        `
            mediaPreview.appendChild(mediaItem)
          }
          reader.readAsDataURL(file)
        }
      })
    }

    window.removeMedia = (index) => {
      uploadedFiles.splice(index, 1)
      renderMediaPreview()
    }

    function renderMediaPreview() {
      mediaPreview.innerHTML = ""
      uploadedFiles.forEach((file, index) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const mediaItem = document.createElement("div")
          mediaItem.className = "media-item"
          mediaItem.innerHTML = `
                        <img src="${e.target.result}" alt="Media">
                        <button type="button" class="remove-media" onclick="removeMedia(${index})">
                            <i class="fas fa-times"></i>
                        </button>
                    `
          mediaPreview.appendChild(mediaItem)
        }
        reader.readAsDataURL(file)
      })
    }

    // Hashtags
    addHashtagBtn.addEventListener("click", addHashtag)
    hashtagInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        addHashtag()
      }
    })

    function addHashtag() {
      const tag = hashtagInput.value.trim().replace("#", "")
      if (tag && !hashtags.includes(tag)) {
        hashtags.push(tag)
        renderHashtags()
        hashtagInput.value = ""
      }
    }

    function renderHashtags() {
      hashtagsList.innerHTML = hashtags
        .map(
          (tag, index) => `
                <span class="hashtag-item">
                    #${tag}
                    <button type="button" class="remove-hashtag" onclick="removeHashtag(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                </span>
            `,
        )
        .join("")
    }

    window.removeHashtag = (index) => {
      hashtags.splice(index, 1)
      renderHashtags()
    }

    // Suggested hashtags
    document.querySelectorAll(".suggested-tag").forEach((tag) => {
      tag.addEventListener("click", () => {
        const tagText = tag.textContent.replace("#", "")
        if (!hashtags.includes(tagText)) {
          hashtags.push(tagText)
          renderHashtags()
        }
      })
    })

    // Schedule type handling
    scheduleTypeInputs.forEach((input) => {
      input.addEventListener("change", () => {
        scheduleDetails.style.display = input.value === "later" ? "block" : "none"
        optimalTimes.style.display = input.value === "optimal" ? "block" : "none"
      })
    })

    // Optimal time buttons
    document.querySelectorAll(".optimal-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".optimal-btn").forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")
      })
    })

    // Form submission
    schedulePostForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = {
        content: postContent.value,
        media: uploadedFiles,
        hashtags: hashtags,
        platforms: Array.from(document.querySelectorAll('input[name="platforms"]:checked')).map((cb) => cb.value),
        scheduleType: document.querySelector('input[name="scheduleType"]:checked').value,
        scheduleDate: document.getElementById("scheduleDate").value,
        scheduleTime: document.getElementById("scheduleTime").value,
      }

      console.log("Post scheduled:", formData)
      alert("تم جدولة المنشور بنجاح!")

      // Redirect to dashboard
      window.location.href = "dashboard.html"
    })

    // Set default date and time
    const now = new Date()
    document.getElementById("scheduleDate").value = now.toISOString().split("T")[0]
    document.getElementById("scheduleTime").value = now.toTimeString().slice(0, 5)
  }

  function initializeSettingsPage() {
    const settingsTabs = document.querySelectorAll(".settings-tab")
    const settingsPanels = document.querySelectorAll(".settings-panel")
    const photoInput = document.getElementById("photoInput")
    const changePhotoBtn = document.querySelector(".change-photo-btn")
    const profileImage = document.getElementById("profileImage")

    // Tab switching
    settingsTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetTab = tab.dataset.tab

        settingsTabs.forEach((t) => t.classList.remove("active"))
        settingsPanels.forEach((p) => p.classList.remove("active"))

        tab.classList.add("active")
        document.getElementById(targetTab).classList.add("active")
      })
    })

    // Profile photo change
    changePhotoBtn.addEventListener("click", () => {
      photoInput.click()
    })

    photoInput.addEventListener("change", (e) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          profileImage.src = e.target.result
        }
        reader.readAsDataURL(file)
      }
    })

    // Account connection buttons
    document.querySelectorAll(".account-item button").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const isConnect = btn.textContent.includes("ربط")
        if (isConnect) {
          btn.textContent = "إلغاء الربط"
          btn.className = "btn-danger"
          btn.previousElementSibling.querySelector("p").textContent = "مربوط"
        } else {
          btn.textContent = "ربط الحساب"
          btn.className = "btn-primary"
          btn.previousElementSibling.querySelector("p").textContent = "غير مربوط"
        }
      })
    })

    // Form submissions
    document.querySelectorAll(".settings-form").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault()
        alert("تم حفظ التغييرات بنجاح!")
      })
    })
  }
})
