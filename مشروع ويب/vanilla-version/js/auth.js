// Guest login enablement
// Minimal script to allow "الدخول كضيف" without enabling full auth flows

document.addEventListener("DOMContentLoaded", () => {
  const guestBtn = document.getElementById("guestLogin")
  if (guestBtn) {
    guestBtn.addEventListener("click", (e) => {
      e.preventDefault()
      const guestUser = {
        name: "ضيف",
        role: "guest",
        loginTime: new Date().toISOString(),
      }
      localStorage.setItem("user", JSON.stringify(guestUser))
      window.location.href = "dashboard.html"
    })
  }
})

// Login Handler
async function handleLogin(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
    remember: formData.get("remember"),
  }

  // Validate form
  const errors = validateLoginForm(loginData)
  if (errors.length > 0) {
    showAlert(errors.join("\n"), "danger")
    return
  }

  // Show loading
  const submitBtn = e.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "جاري تسجيل الدخول..."
  submitBtn.disabled = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Store user session
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: loginData.email,
        loginTime: new Date().toISOString(),
      }),
    )

    showAlert("تم تسجيل الدخول بنجاح!", "success")

    // Redirect to dashboard
    setTimeout(() => {
      window.location.href = "dashboard.html"
    }, 1000)
  } catch (error) {
    showAlert("حدث خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.", "danger")
  } finally {
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }
}

// Register Handler
async function handleRegister(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const registerData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    terms: formData.get("terms"),
  }

  // Validate form
  const errors = validateRegisterForm(registerData)
  if (errors.length > 0) {
    showAlert(errors.join("\n"), "danger")
    return
  }

  // Show loading
  const submitBtn = e.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "جاري إنشاء الحساب..."
  submitBtn.disabled = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    showAlert("تم إنشاء الحساب بنجاح! يرجى تفعيل حسابك من البريد الإلكتروني.", "success")

    // Redirect to login
    setTimeout(() => {
      window.location.href = "login.html"
    }, 2000)
  } catch (error) {
    showAlert("حدث خطأ في إنشاء الحساب. يرجى المحاولة مرة أخرى.", "danger")
  } finally {
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }
}

// Forgot Password Handler
async function handleForgotPassword(e) {
  e.preventDefault()

  const formData = new FormData(e.target)
  const email = formData.get("email")

  if (!validateEmail(email)) {
    showAlert("يرجى إدخال بريد إلكتروني صحيح", "danger")
    return
  }

  // Show loading
  const submitBtn = e.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent
  submitBtn.textContent = "جاري الإرسال..."
  submitBtn.disabled = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    showAlert("تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني.", "success")
  } catch (error) {
    showAlert("حدث خطأ في إرسال الرابط. يرجى المحاولة مرة أخرى.", "danger")
  } finally {
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }
}

// Social Login Handler
function socialLogin(provider) {
  showAlert(`جاري تسجيل الدخول عبر ${provider}...`, "info")

  // Simulate social login
  setTimeout(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: `user@${provider}.com`,
        provider: provider,
        loginTime: new Date().toISOString(),
      }),
    )

    showAlert("تم تسجيل الدخول بنجاح!", "success")

    setTimeout(() => {
      window.location.href = "dashboard.html"
    }, 1000)
  }, 1500)
}

// Password Strength Checker
function checkPasswordStrength() {
  const password = document.getElementById("password").value
  const strengthIndicator = document.getElementById("passwordStrength")

  if (!strengthIndicator) return

  let strength = 0

  // Check length
  if (password.length >= 8) strength++

  // Check for numbers
  if (/\d/.test(password)) strength++

  // Check for lowercase and uppercase
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++

  // Check for special characters
  if (/[^A-Za-z0-9]/.test(password)) strength++

  // Update indicator
  strengthIndicator.className = "password-strength"

  if (strength <= 1) {
    strengthIndicator.classList.add("weak")
  } else if (strength <= 2) {
    strengthIndicator.classList.add("medium")
  } else {
    strengthIndicator.classList.add("strong")
  }
}

// Form Validation Functions

function validateLoginForm(data) {
  const errors = []

  if (!data.email || !validateEmail(data.email)) {
    errors.push("يرجى إدخال بريد إلكتروني صحيح")
  }
  

  if (!data.password || data.password.length < 6) {
    errors.push("كلمة المرور يجب أن تكون 6 أحرف على الأقل")
  }

  return errors
}

function validateRegisterForm(data) {
  const errors = []

  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.push("يرجى إدخال الاسم الأول (حرفين على الأقل)")
  }

  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.push("يرجى إدخال الاسم الأخير (حرفين على الأقل)")
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.push("يرجى إدخال بريد إلكتروني صحيح")
  }

  if (!data.password || data.password.length < 8) {
    errors.push("كلمة المرور يجب أن تكون 8 أحرف على الأقل")
  }

  if (data.password !== data.confirmPassword) {
    errors.push("كلمة المرور وتأكيد كلمة المرور غير متطابقتين")
  }

  if (!data.terms) {
    errors.push("يجب الموافقة على الشروط والأحكام")
  }

  return errors
}

// Utility Functions (moved to utils.js)
// validateEmail is now provided globally from utils.js


