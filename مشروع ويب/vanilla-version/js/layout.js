// Inject shared dashboard layout (sidebar + header) into pages
// Usage: place <div id="app-layout"><aside data-slot="sidebar"></aside><header data-slot="header"></header><main class="main-content">...</main></div>

(function () {
  document.addEventListener("DOMContentLoaded", async () => {
    try {
      await ensureAuth();
      await injectSidebar();
      await injectHeader();
      setActiveNavigation();
      hydrateHeaderMeta();
      restoreSidebarState();
      setupSidebarToggle();
      // Initialize global AI chat widget
      initChatWidget();
    } catch (e) {
      console.error("Layout init error:", e);
    }
  });

  async function fetchPartial(path) {
    const res = await fetch(path, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to fetch ${path}`);
    return res.text();
  }

  async function injectSidebar() {
    const slot = document.querySelector('[data-slot="sidebar"]');
    if (!slot) return;
    const base = getBase();
    const html = await fetchPartial(base + "/partials/sidebar.html");
    slot.outerHTML = html; // replace placeholder with actual sidebar
  }

  async function injectHeader() {
    const slot = document.querySelector('[data-slot="header"]');
    if (!slot) return;
    const base = getBase();
    const html = await fetchPartial(base + "/partials/header.html");
    slot.outerHTML = html;
  }

  function getBase() {
    // pages/*.html live one level under root, so base is .. from pages
    // index.html lives at root — it should not load this layout.js for now
    const path = window.location.pathname;
    return path.includes("/pages/") ? ".." : ".";
  }

  async function ensureAuth() {
    let user = localStorage.getItem("user");
    if (!user) {
      const guestUser = { name: "ضيف", role: "guest", loginTime: new Date().toISOString() };
      localStorage.setItem("user", JSON.stringify(guestUser));
    }
  }

  function hydrateHeaderMeta() {
    const titleEl = document.querySelector(".page-title");
    const subtitleEl = document.querySelector(".page-subtitle");
    const h1OnPage = document.querySelector("[data-page-title-text]");
    const subtitleOnPage = document.querySelector("[data-page-subtitle-text]");

    if (h1OnPage && titleEl) titleEl.textContent = h1OnPage.textContent.trim();
    if (subtitleOnPage && subtitleEl) subtitleEl.textContent = subtitleOnPage.textContent.trim();

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const profileName = document.querySelector(".profile-name");
      if (profileName) {
        const name = user.name || (user.email ? user.email.split("@")[0] : "ضيف");
        profileName.textContent = name;
      }
    } catch {}
  }

  function setActiveNavigation() {
    const current = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-link").forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === current);
    });
  }

  function setupSidebarToggle() {
    const sidebarToggle = document.getElementById("sidebarToggle");
    const sidebar = document.getElementById("sidebar");
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener("click", () => {
        sidebar.classList.toggle("collapsed");
        localStorage.setItem("sidebarCollapsed", sidebar.classList.contains("collapsed"));
      });
    }

    // Mobile sidebar open/close
    document.addEventListener("click", (e) => {
      const sb = document.getElementById("sidebar");
      const btn = document.getElementById("sidebarToggle");
      if (!sb || !btn) return;
      if (!sb.contains(e.target) && !btn.contains(e.target)) {
        sb.classList.remove("open");
      }
    });

    if (window.innerWidth <= 768) {
      const sb = document.getElementById("sidebar");
      const btn = document.getElementById("sidebarToggle");
      if (btn) {
        btn.addEventListener("click", () => sb && sb.classList.toggle("open"));
      }
    }
  }

  function restoreSidebarState() {
    const sidebar = document.getElementById("sidebar");
    const isCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
    if (sidebar && isCollapsed) sidebar.classList.add("collapsed");
  }

  // ------------------ AI Chat Widget ------------------
  function initChatWidget() {
    if (document.getElementById("ai-chat-widget")) return; // already added

    // Styles
    const style = document.createElement("style");
    style.id = "ai-chat-styles";
    style.textContent = `
      #ai-chat-widget { position: fixed; bottom: 20px; left: 20px; z-index: 9999; font-family: inherit; }
      #ai-chat-widget .ai-chat-button { width: 56px; height: 56px; border-radius: 50%; border: none; cursor: pointer; box-shadow: 0 6px 18px rgba(0,0,0,0.18); background: linear-gradient(135deg, #4F46E5, #06B6D4); color: #fff; display: inline-flex; align-items: center; justify-content: center; }
      #ai-chat-widget .ai-chat-avatar { font-size: 26px; line-height: 1; }
      #ai-chat-widget .ai-chat-panel { position: absolute; bottom: 70px; left: 0; width: min(360px, 90vw); max-height: min(70vh, 620px); background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; box-shadow: 0 12px 32px rgba(0,0,0,0.18); display: flex; flex-direction: column; overflow: hidden; }
      #ai-chat-widget .ai-chat-panel[hidden] { display: none !important; }
      #ai-chat-widget .ai-chat-header { padding: 10px 12px; background: #f8fafc; border-bottom: 1px solid #e5e7eb; display: flex; align-items: center; justify-content: space-between; font-weight: 600; color: #111827; }
      #ai-chat-widget .ai-chat-close { background: transparent; border: none; font-size: 20px; line-height: 1; cursor: pointer; color: #6b7280; }
      #ai-chat-widget .ai-chat-messages { padding: 12px; gap: 8px; display: flex; flex-direction: column; overflow: auto; background: #fff; }
      #ai-chat-widget .ai-chat-msg { padding: 8px 10px; border-radius: 10px; max-width: 85%; word-wrap: break-word; }
      #ai-chat-widget .ai-chat-msg.user { align-self: flex-end; background: #4F46E5; color: #fff; border-bottom-right-radius: 4px; }
      #ai-chat-widget .ai-chat-msg.bot { align-self: flex-start; background: #f3f4f6; color: #111827; border-bottom-left-radius: 4px; }
      #ai-chat-widget .ai-chat-input { display: flex; padding: 10px; gap: 8px; border-top: 1px solid #e5e7eb; background: #fff; }
      #ai-chat-widget .ai-chat-input input { flex: 1; border: 1px solid #e5e7eb; border-radius: 8px; padding: 10px 12px; outline: none; }
      #ai-chat-widget .ai-chat-input button { background: #4F46E5; color: #fff; border: none; border-radius: 8px; padding: 10px 14px; cursor: pointer; }
      @media (max-width: 480px) {
        #ai-chat-widget { left: 12px; bottom: 12px; }
        #ai-chat-widget .ai-chat-panel { width: min(92vw, 360px); }
      }
    `;

    // Container
    const container = document.createElement("div");
    container.id = "ai-chat-widget";
    container.innerHTML = `
      <button class="ai-chat-button" aria-label="المساعد الذكي">
        <span class="ai-chat-avatar" title="المساعد">🤖</span>
      </button>
      <div class="ai-chat-panel" hidden>
        <div class="ai-chat-header">
          <span>المساعد الذكي</span>
          <button class="ai-chat-close" title="إغلاق">×</button>
        </div>
        <div class="ai-chat-messages">
          <div class="ai-chat-msg bot">مرحباً! كيف أستطيع مساعدتك؟</div>
        </div>
        <form class="ai-chat-input" autocomplete="off">
          <input type="text" placeholder="اكتب سؤالك..." required />
          <button type="submit">إرسال</button>
        </form>
      </div>
    `;

    document.body.appendChild(style);
    document.body.appendChild(container);

    const btn = container.querySelector('.ai-chat-button');
    const panel = container.querySelector('.ai-chat-panel');
    const closeBtn = container.querySelector('.ai-chat-close');
    const form = container.querySelector('.ai-chat-input');
    const input = container.querySelector('.ai-chat-input input');
    const messages = container.querySelector('.ai-chat-messages');

    const toggle = (show) => {
      const shouldShow = show === undefined ? panel.hasAttribute('hidden') : show;
      if (shouldShow) {
        panel.removeAttribute('hidden');
        input && setTimeout(() => input.focus(), 0);
      } else {
        panel.setAttribute('hidden', '');
      }
    };

    btn.addEventListener('click', () => toggle(true));
    closeBtn.addEventListener('click', () => toggle(false));

    // Close when clicking outside the panel
    document.addEventListener('click', (e) => {
      const isOpen = !panel.hasAttribute('hidden');
      if (!isOpen) return;
      const clickedInside = panel.contains(e.target) || btn.contains(e.target);
      if (!clickedInside) toggle(false);
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      appendMessage('user', text);
      input.value = '';
      // Mock assistant reply for now
      setTimeout(() => {
        appendMessage('bot', 'سأفكر في ذلك... هل يمكن توضيح المطلوب أكثر؟');
      }, 400);
    });

    function appendMessage(role, text) {
      const div = document.createElement('div');
      div.className = `ai-chat-msg ${role}`;
      div.textContent = text;
      messages.appendChild(div);
      messages.scrollTop = messages.scrollHeight;
    }
  }
})();