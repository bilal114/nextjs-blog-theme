const navModal = document.getElementById('nav-mobile');

function openMobileNav(event) {
  event.preventDefault();
  if (navModal) {
    navModal.style.display = 'block';
    navModal.style.overflow = 'auto';
    document.body.style.overflow = 'hidden';
  }
}

function closeModalNav() {
  if (navModal) {
    navModal.style.display = 'none';
    navModal.style.overflow = 'auto';
    document.body.style.overflow = 'auto';
  }
}

if (navModal) {
  const navIcon = document.getElementById('nav-mobile-icon');
  const signUpHeader = document.getElementById('sign-up-header');
  navIcon.addEventListener('click', openMobileNav);

  const span = document.getElementsByClassName('close')[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = () => {
    closeModalNav();
  };
  if (signUpHeader)
    signUpHeader.onclick = () => {
      closeModalNav();
    };
}
