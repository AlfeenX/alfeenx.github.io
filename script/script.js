// ===== PRELOADER =====
window.addEventListener('load', function() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 600);
    }, 2500);
  }
});

// ===== SCROLL ANIMATIONS - Intersection Observer =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all scroll animation elements
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.scroll-fade-up, .scroll-fade-left, .scroll-fade-right').forEach(el => {
    observer.observe(el);
  });
});

// ===== PROJECT LOADING =====
$(document).ready(function () {
  $.getJSON('projects.json', function (data) {
    const $list = $('#project-list');
    if ($list.length) {
      $list.empty();
      data.forEach((project, index) => {
        $list.append(`
          <div class="project-card">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            ${project.link ? `<a href="${project.link}" target="_blank">View Project →</a>` : ''}
          </div>
        `);
        
        const card = $list.find('.project-card').last()[0];
        observer.observe(card);
      });
    }
  });
});


// ===== SMOOTH SCROLLING =====
$('a[href^="#"]').on('click', function(e) {
  e.preventDefault();
  const target = $(this.getAttribute('href'));
  if(target.length) {
    $('html, body').stop().animate({
      scrollTop: target.offset().top - 80
    }, 800, 'easeInOutQuad');
  }
});

if (!jQuery.easing.easeInOutQuad) {
  jQuery.easing.easeInOutQuad = function(x, t, b, c, d) {
    if ((t /= d / 2) < 1) return c / 2 * t * t + b;
    return -c / 2 * ((--t) * (t - 2) - 1) + b;
  };
}

// ===== FORM HANDLING =====
const form = document.getElementById("contact-form");
const btnSubmit = document.querySelector(".btn-submit");
  
  async function handleSubmit(event) {
    event.preventDefault();
    btnSubmit.disabled = true;
    btnSubmit.classList.add("bg-gray-400", "cursor-not-allowed");
    btnSubmit.innerText = "Sending...";
    const status = document.getElementById("contact-form-status");
    const data = new FormData(event.target);
    fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: {
          'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        status.classList.add("success");
        form.reset()
        btnSubmit.disabled = false;
        btnSubmit.classList.remove("bg-gray-400", "cursor-not-allowed");
        btnSubmit.innerText = "Send Message";
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            status.classList.add("error");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form"
            status.classList.add("error");
          }
        })
      }
    }).catch(error => {
      status.innerHTML = "Oops! There was a problem submitting your form"
      status.classList.add("error");
    });
  }
  form.addEventListener("submit", handleSubmit)
