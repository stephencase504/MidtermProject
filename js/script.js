// Get the prev button element from the DOM
const prevButton = document.getElementById("prevButton");

// Get the next button element from the DOM
const nextButton = document.getElementById("nextButton");

// Get the gallery element from the DOM
const gallery = document.querySelector(".gallery");

// Get the caption element from the DOM
const captions = Array.from(document.querySelectorAll(".caption-text"));

// Index to keep track of the current image
let currentIndex = 0;

// Function to display an image given its index
function displayImage(index) {
  const images = gallery.querySelectorAll("img");
  images.forEach((image, i) => {
    if (i === index) {
      setTimeout(() => {
        image.classList.add("active");
        image.style.animation = "fadeIn .5s forwards";
      }, 500); // Delay the start of the second animation
    } else if (image.classList.contains("active")) {
      image.style.animation = "fadeOut .5s forwards";
      setTimeout(() => {
        image.classList.remove("active");
      }, 500);
    }
  });
  captions.forEach((caption, i) => {
    if (i === index) {
      caption.style.display = "block";
    } else {
      caption.style.display = "none";
    }
  });
}

// Display the first image
displayImage(currentIndex);

// Event listener for the previous button click
prevButton.addEventListener("click", function () {
  currentIndex = (currentIndex - 1 + captions.length) % captions.length;
  displayImage(currentIndex);
});

// Event listener for the next button click
nextButton.addEventListener("click", function () {
  currentIndex = (currentIndex + 1) % captions.length;
  displayImage(currentIndex); // Display the new image
});

// Keydown event for the whole document
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % captions.length; // Calculate the new index
    displayImage(currentIndex); // Display the new image
  } else if (event.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + captions.length) % captions.length; // Calculate the new index
    displayImage(currentIndex); // Display the new image
  }
});

// Function to fade in the page
function fadeInPage() {
    const pageContainer = document.querySelector('.page-container');
    pageContainer.style.opacity = 1;
}

// Function to fade out the page
function fadeOutPage() {
    const pageContainer = document.querySelector('.page-container');
    pageContainer.style.opacity = 0;
}

// Example: Listen for link clicks and initiate the fade effect
const links = document.querySelectorAll('a'); // Selects all anchor selectors
links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        fadeOutPage(); // Fade out the current page
        setTimeout(() => {
            window.location.href = link.href; // Navigate to the new page
        }, 350); // Adjust the delay to match your transition duration
    });
});

// When the new page loads, call fadeInPage()
window.addEventListener('load', fadeInPage);

// Function for back to top button
const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top");

// Function to check scroll position and show/hide the button
const handleScroll = () => {
    const scrollPosition = scrollContainer().scrollTop;
    if (scrollPosition >= showOnPx) {
        backToTopButton.classList.remove("hidden");
    } else {
        backToTopButton.classList.add("hidden");
    }
};

// Attach the scroll event listener
window.addEventListener("scroll", handleScroll);

// Function to scroll to the top when the button is clicked
const scrollToTop = () => {
    scrollContainer().scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

// Attach the click event listener to the button
backToTopButton.addEventListener("click", scrollToTop);

// Helper function to get the scroll container (either document or body)
const scrollContainer = () => {
    return document.documentElement || document.body;
};

// Before the page unloads (e.g., when a link is clicked), store the scroll position
window.addEventListener("beforeunload", () => {
    localStorage.setItem("scrollPosition", window.pageYOffset);
});

// On page load, check if there's a stored scroll position
const storedScrollPosition = localStorage.getItem("scrollPosition");
if (storedScrollPosition !== null) {
    // Scroll to the stored position
    window.scrollTo(0, parseInt(storedScrollPosition));
}
