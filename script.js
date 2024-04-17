document.addEventListener('DOMContentLoaded', () => {
  const themeToggleButton = document.getElementById('theme-toggle');
  const reduceMotionBtn = document.getElementById('reduce-motion-btn');
  const signNowButton = document.getElementById('sign-now-button');
  const closeModalBtn = document.getElementById('close-modal-btn');


  themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  reduceMotionBtn.addEventListener('click', toggleReduceMotion);

  signNowButton.addEventListener('click', function(event) {
    event.preventDefault();  // Prevent form from submitting traditionally
    if (validateForm()) {
      const person = {
        name: document.getElementById('name').value.trim(),
        hometown: document.getElementById('hometown').value.trim(),
        email: document.getElementById('email').value.trim()
      };
      addSignature(person);
      toggleModal(person);
    }
  });

  closeModalBtn.addEventListener('click', closeTheModal);

  window.addEventListener('scroll', reveal);
  initRevealableContainers();
});

let count = 3;
let scaleFactor = 1;
let intervalId = null;
let animation = {
    revealDistance: 150,
    initialOpacity: 0,
    transitionDelay: 0,
    transitionDuration: '2s',
    transitionProperty: 'all',
    transitionTimingFunction: 'ease',
    reducedMotion: false
};

function addSignature(person) {
  const signatureList = document.getElementById('signature-list');
  const counter = document.getElementById('counter');
  const listItem = document.createElement('li');
  listItem.textContent = `${person.name} from ${person.hometown}, email: ${person.email} supports this.`;
  signatureList.appendChild(listItem);
  count++;
  counter.textContent = `🖊️ ${count} people have signed this petition and support this cause.`;

  document.getElementById('name').value = '';
  document.getElementById('hometown').value = '';
  document.getElementById('email').value = '';
}

function validateForm() {
  let containsErrors = false;
  const petitionInputs = document.getElementById("sign-petition").elements;
  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.trim().length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    } else {
      petitionInputs[i].classList.remove('error');
    }
  }

  const email = document.getElementById('email');
  if (!/^\S+@\S+\.\S+$/.test(email.value)) { // Using a basic regex for email validation
    email.classList.add('error');
    containsErrors = true;
  } else {
    email.classList.remove('error');
  }

  return !containsErrors;
}

function toggleModal(person) {
  const modal = document.getElementById('thanks-modal');
  const modalContent = document.getElementById('thanks-modal-content');
  modalContent.textContent = `Thank you so much ${person.name} from ${person.hometown}!`;

  modal.style.display = 'flex';
  clearInterval(intervalId);
  intervalId = setInterval(scaleImage, 500);

  setTimeout(() => {
    modal.style.display = 'none';
    clearInterval(intervalId);
  }, 4000);
}

function scaleImage() {
  scaleFactor = (scaleFactor === 1) ? 0.8 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
}

function reveal() {
  let windowHeight = window.innerHeight;
  const revealableContainers = document.querySelectorAll('.revealable');
  revealableContainers.forEach(container => {
    let top = container.getBoundingClientRect().top;
    if (top < windowHeight - animation.revealDistance) {
      container.classList.add('active');
    } else {
      container.classList.remove('active');
    }
  });
}

function toggleReduceMotion() {
  animation.reducedMotion = !animation.reducedMotion;
  animation.transitionDuration = animation.reducedMotion ? '0s' : '2s';
  const revealableContainers = document.querySelectorAll('.revealable');
  revealableContainers.forEach(container => {
    container.style.transition = `opacity ${animation.transitionDuration}, transform ${animation.transitionDuration}`;
  });
}

function closeTheModal() {
  const modal = document.getElementById('thanks-modal');
  modal.style.display = 'none';
  clearInterval(intervalId);
}

function initRevealableContainers() {
  const revealableContainers = document.querySelectorAll('.revealable');
  revealableContainers.forEach(container => {
    container.style.transition = `opacity ${animation.transitionDuration}, transform ${animation.transitionDuration}`;
  });
}
