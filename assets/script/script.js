//counter animation
const counters = document.querySelectorAll(".count");
const counterContainer = document.querySelector(".counter-container");

const totalDuration = 3000;

const startCounters = () => {
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const increments = Math.floor(totalDuration / 10);
    const increment = target / increments;
    let currentCount = 0;
    const updateCounter = () => {
      currentCount += increment;
      counter.innerText = Math.round(currentCount);
      if (currentCount >= target) {
        counter.innerText = target;
        clearInterval(intervalId);
      }
    };
    const intervalId = setInterval(updateCounter, 10);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounters();
      }
    });
  },
  { threshold: 0.5 }
);

observer.observe(counterContainer);

//navbar sticky on scroll
const navElement = document.getElementById("belated-sticky");

function toggleHiddenClass() {
  const scrollPosition = window.scrollY || document.documentElement.scrollTop;

  if (scrollPosition > 55) {
    navElement.classList.add("sticky");
  } else {
    navElement.classList.remove("sticky");
  }
}
window.addEventListener("scroll", toggleHiddenClass);

//off-canvas close on href
document.addEventListener("DOMContentLoaded", function () {
  const offcanvasLinks = document.querySelectorAll(".offcanvas-body .href");

  offcanvasLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      const offcanvas = document.querySelector(".offcanvas-end");

      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
      offcanvasInstance.hide();
    });
  });
});

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const submitButton = document.getElementById("submitButton");
    submitButton.disabled = true;
    submitButton.textContent = "Submitting...";
    const formData = new FormData(this);

    const jsonData = {};
    formData.forEach((value, key) => {
      jsonData[key] = value;
    });

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("API response:", data);
        this.reset();

        alert("Message sent successfully!");
        submitButton.textContent = "Submit";
        submitButton.disabled = false;
      })
      .catch((error) => {
        console.error("Error sending message:", error);
        alert("Error sending message. Please try again later.");
        submitButton.textContent = "Submit";
        submitButton.disabled = false;
      });
  });
