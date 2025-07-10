document.getElementById('download-cv').addEventListener('click', () => {
  const cvUrl = 'assets/resume.pdf';

  fetch(cvUrl)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.blob();
    })
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'My_CV.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      showMessage('Your CV has been downloaded successfully!');
    })
    .catch(err => {
      showMessage('Download failed: ' + err.message);
    });
});

function showMessage(text) {
  const msg = document.createElement('div');
  msg.innerText = text;
  msg.style.position = 'fixed';
  msg.style.bottom = '20px';
  msg.style.right = '20px';
  msg.style.padding = '10px 20px';
  msg.style.background = '#9a7b4f';
  msg.style.color = '#fff';
  msg.style.borderRadius = '5px';
  msg.style.boxShadow = '0 2px 6px rgba(112, 13, 13, 0.9)';
  msg.style.transition = 'opacity 0.5s ease';
  document.body.appendChild(msg);

  setTimeout(() => {
    msg.classList.add('fade-out');
    msg.addEventListener('transitionend', () => msg.remove());
  }, 4000);
}

  


const skills = [
  { name: "HTML", percent: 90, icon: "html5" },
  { name: "CSS", percent: 80, icon: "css3" },
  { name: "JavaScript", percent: 80, icon: "javascript" },
  { name: "React", percent: 50, icon: "react" },
  { name: "Node.js", percent: 40, icon: "nodejs" },
  { name: "VS Code", percent: 99, icon: "vscode" },
  { name: "Git", percent: 80, icon: "git" },
  { name: "GitHub", percent: 90, icon: "github" },
];

const grid = document.querySelector(".skills-grid");

skills.forEach(skill => {
  const card = document.createElement("div");
  card.className = "skill-card";

  const img = document.createElement("img");
  img.src = `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}/${skill.icon}-original.svg`;
  img.alt = skill.name;
  img.onerror = () => {
    img.src = "https://cdn-icons-png.flaticon.com/512/732/732212.png";
  };

  const circle = document.createElement("div");
  circle.className = "circle";
  circle.dataset.percent = skill.percent;
  circle.textContent = "0%";

  const label = document.createElement("p");
  label.textContent = skill.name;

  card.appendChild(img);
  card.appendChild(circle);
  card.appendChild(label);
  grid.appendChild(card);
});

// === Function to Animate Circles ===
function animateCircle(circle, percent) {
  let current = 0;
  circle.textContent = "0%";
  const interval = setInterval(() => {
    current++;
    circle.style.background = `conic-gradient(#5c4033 ${current * 3.6}deg, #e0e0e0 0deg)`;
    circle.textContent = `${current}%`;
    if (current >= percent) clearInterval(interval);
  }, 20);
}

// === Intersection Observer Setup ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const circle = entry.target;
      const percent = parseInt(circle.dataset.percent);
      animateCircle(circle, percent);
    }
  });
}, {
  threshold: 0.5
});

// Observe each skill circle
document.querySelectorAll(".circle").forEach(circle => {
  observer.observe(circle);
});

 // Show message on page load
    window.addEventListener('load', () => {
      const message = document.getElementById('toggleMessage');
      message.style.display = 'block';

      // Hide after 3 seconds
      setTimeout(() => {
        message.style.display = 'none';
      }, 5000);
    });

 document.addEventListener("DOMContentLoaded", () => {
  const faders = document.querySelectorAll(".fade-in");

  // Scroll-based observer
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
  });

  // Remove all .show initially
  faders.forEach(el => el.classList.remove("show"));

  // Check if user navigated directly to #contact
  if (window.location.hash === "#contact") {
    // Wait till browser completes scroll jump
    requestAnimationFrame(() => {
      setTimeout(() => {
        faders.forEach(el => {
          const rect = el.getBoundingClientRect();
          const inView = rect.top < window.innerHeight && rect.bottom >= 0;
          if (inView) {
            el.classList.add("show");
          } else {
            observer.observe(el); // for rest elements
          }
        });
      }, 100); // Small delay after jump scroll
    });
  } else {
    // Default case: use observer
    faders.forEach(el => observer.observe(el));
  }
});


  const textArray = ["I'm a Web Developer", "Let's build something awesome!"];
  const typedText = document.getElementById("typed-text");
  let textIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textIndex].length) {
      typedText.textContent += textArray[textIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);
    } else {
      setTimeout(erase, 1500); // Pause before erase
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedText.textContent = textArray[textIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 40);
    } else {
      textIndex = (textIndex + 1) % textArray.length;
      setTimeout(type, 300);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
  });

