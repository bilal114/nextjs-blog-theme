document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('features'))
    document.getElementById('features').onclick = function myFunction(e) {
      e.preventDefault();
    };

  const popups = [document.getElementById('dropdown-features')];

  window.addEventListener('click', ({ target }) => {
    const popup = target.closest('#dropdown-features');

    const clickedOnClosedPopup = popup && !popup.classList.contains('active-tab');

    popups.forEach((p) => p.classList.remove('active-tab'));

    if (clickedOnClosedPopup) popup.classList.add('active-tab');
  });
});
