// Active dot highlight on scroll
const sections = document.querySelectorAll("section");
const dots = document.querySelectorAll(".side-nav a");




window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  dots.forEach(dot => {
    dot.classList.remove("active");
    if (dot.getAttribute("href").substring(1) === current) {
      dot.classList.add("active");
    }
  });
});

const chatbotButton = document.getElementById("chatbotButton");
const chatbotPanel = document.getElementById("chatbotPanel");
const closeChatbot = document.getElementById("closeChatbot");
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatArea = document.getElementById("chatArea");

// Open panel
chatbotButton.addEventListener("click", () => {
  chatbotPanel.classList.toggle("active");
});

// Close panel
closeChatbot.addEventListener("click", () => {
  chatbotPanel.classList.remove("active");
});

// Send message
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Display user message
  const userMsg = document.createElement("div");
  userMsg.className = "user-message";
  userMsg.textContent = message;
  chatArea.appendChild(userMsg);
  chatArea.scrollTop = chatArea.scrollHeight;

  // Send to n8n webhook
  fetch("http://localhost:5678/webhook/4a682316-2566-47c2-96bd-0215ff26b629/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  })
    .then(res => res.json())
    .then(data => {
      const botMsg = document.createElement("div");
      botMsg.className = "bot-message";
      botMsg.textContent = data.reply;  // assuming n8n returns { reply: "..." }
      chatArea.appendChild(botMsg);
      chatArea.scrollTop = chatArea.scrollHeight;
    })
    .catch(() => {
      const errorMsg = document.createElement("div");
      errorMsg.className = "bot-message";
      errorMsg.textContent = "Sorry, something went wrong!";
      chatArea.appendChild(errorMsg);
      chatArea.scrollTop = chatArea.scrollHeight;
    });

  userInput.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const menuLinks = document.querySelectorAll('.nav__menu a');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  // Close menu when any link is clicked
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('show');
    });
  });
});
