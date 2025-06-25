document.addEventListener("DOMContentLoaded", () => {

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


// n8n chatbot 
  function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    const userMsg = document.createElement("div");
    userMsg.className = "user-message";
    userMsg.textContent = message;
    chatArea.appendChild(userMsg);
    chatArea.scrollTop = chatArea.scrollHeight;

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
        botMsg.textContent = data.reply;
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

  // Nav toggle menu
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');
  const menuLinks = document.querySelectorAll('.nav__menu a');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('show');
    });
  });

});
