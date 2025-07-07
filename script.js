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
