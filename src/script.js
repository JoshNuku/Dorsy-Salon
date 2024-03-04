"use strict";
//const axios = 'https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'
const nav = document.querySelector("nav");

nav.addEventListener("click", (e) => {
  console.dir(e.target);
  console.log([...e.target.parentElement.children]);
  [...e.target.parentElement.children].forEach((el) => {
    if (el !== e.target) el.classList.remove("active");
  });

  if (e.target.classList.contains("sect")) {
    e.target.scrollIntoView({ behavior: "smooth" });
    e.target.classList.add("active");
  }
});

//Reveal sections
const allSections = document.querySelectorAll(".section");

function revealSectionsOnScroll() {
  allSections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Check if the section is in the viewport
    if (sectionTop - windowHeight <= 0) {
      // Remove the "blur" class to reveal the section
      section.classList.remove("section--hidden");

      // Remove the scroll event listener once the section is revealed (optional)
      //window.removeEventListener("scroll", revealSectionsOnScroll);
    }
  });
}

// Attach the scroll event listener
window.addEventListener("scroll", revealSectionsOnScroll);

const revealSection = function (entries, observer) {
  const [entry] = entries;

  const sect = document.querySelector("." + entry.target.id);
  if (!entry.isIntersecting) {
    sect && sect.classList.remove("active");
    return;
  } else {
    entry.target.classList.remove("section--hidden");
    console.log(sect);
    sect && sect.classList.add("active");
    console.dir(entry.target);
    // observer.unobserve(entry.target);
  }
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Get all the images with the "lazy-img" class
const blurredImages = document.querySelectorAll(".lazy-img");

function revealImagesOnScroll() {
  blurredImages.forEach((image) => {
    const imageTop = image.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    // Check if the image is in the viewport
    if (imageTop - windowHeight <= 0) {
      // Remove the "blur" class to reveal the image
      image.classList.remove("lazy-img");

      // Remove the scroll event listener once the image is revealed (optional)
      //window.removeEventListener("scroll", revealImagesOnScroll);
    }
  });
}

// Attach the scroll event listener
window.addEventListener("scroll", revealImagesOnScroll);

const email = document.getElementById("email");
const message = document.getElementById("message");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const form = document.getElementById("form-send");
const sendEmail = async (e) => {
  try {
    const data = await axios.post(
      "https://optimal-moon-412201.uc.r.appspot.com/salon",
      {
        email: email.value,
        message: message.value,
        firstName: firstName.value,
        lastName: lastName.value,
      }
    );
    console.log(data);
  } catch (e) {
    console.log(e);
  }
};

form.addEventListener("submit", sendEmail);
