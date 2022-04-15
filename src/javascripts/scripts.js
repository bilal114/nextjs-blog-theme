import './common';
import './contact';
import './modal';

const year = document.getElementById('year');
if (year) {
  year.innerHTML = `©${new Date().getFullYear()} Gerald`;
}

const acc = document.getElementsByClassName('accordion');

// eslint-disable-next-line no-plusplus
for (let i = 0; i < acc.length; i++) {
  acc[0].nextElementSibling.style.maxHeight = '140px';

  // eslint-disable-next-line func-names
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
}

try {
  /**
   * Add a bb_site_referrer cross-domain cookie if a document.referrer is present AND
   * document.referrer is not joingerald.com
   */
  if (document.referrer) {
    const referrer = new URL(document.referrer).host;
    if (referrer.indexOf('joingerald.com') === -1) {
      document.cookie = `bb_site_referrer=${
        new URL(document.referrer).host
      }; Domain=joingerald.com; SameSite=None; Secure; Path=/`;
    }
  }
} catch (e) {
  //
}

if (window.mixpanel && window.mixpanel.track) {
  const path = window.location.pathname;
  if (path.indexOf('/about-us') >= 0) {
    window.mixpanel.track('lp:about_us:init');
  }
  if (path.indexOf('/partners') >= 0) {
    window.mixpanel.track('lp:partners:init');
  }
  if (path === '/') {
    window.mixpanel.track('lp:home:init');
  }
  if (path.indexOf('/privacy') >= 0) {
    window.mixpanel.track('lp:privacy:init');
  }
  if (path.indexOf('/terms-of-use') >= 0) {
    window.mixpanel.track('lp:terms_of_use:init');
  }
  if (path.indexOf('/bill-tracker') >= 0) {
    window.mixpanel.track('lp:bill_tracker:init');
  }
}

if (window.fbq) {
  const path = window.location.pathname;
  if (path.indexOf('/thank-you') >= 0) {
    window.fbq('track', 'CompleteRegistration');
  }
}

if (window.analytics && window.analytics.track) {
  const signUpHeaderMobile = document.getElementById('sign-up-header');
  window.analytics.trackLink(signUpHeaderMobile, 'Clicked Get Started Button', {
    location: 'homepage_header_mobile',
    action: 'show_waiting_list_modal',
  });

  // Homepage elements
  const getStartedButton = document.getElementById('get-started-hero-button');
  window.analytics.trackLink(getStartedButton, 'Clicked Get Started Button', {
    location: 'homepage_hero',
    action: 'show_waiting_list_modal',
  });

  const signUpHeader = document.getElementById('sign-up-header-home');
  window.analytics.trackLink(signUpHeader, 'Clicked Get Started Button', {
    location: 'homepage_header',
    action: 'show_waiting_list_modal',
  });

  const signUpButton = document.getElementById('signup-section-button');
  window.analytics.trackLink(signUpButton, 'Clicked Get Started Button', {
    location: 'homepage_signup',
    action: 'show_waiting_list_modal',
  });

  // Bill Tracker elements
  const getStartedButtonBillTracker = document.getElementById('get-started-hero-button-bill-tracker');
  window.analytics.trackLink(getStartedButtonBillTracker, 'Clicked Get Started Button', {
    location: 'billTracker_hero',
    action: 'show_waiting_list_modal',
  });

  const signUpHeaderBillTracker = document.getElementById('sign-up-header-bill-tracker');
  window.analytics.trackLink(signUpHeaderBillTracker, 'Clicked Get Started Button', {
    location: 'billTracker_header',
    action: 'show_waiting_list_modal',
  });

  const signUpReadyBillTracker = document.getElementById('ready-section-button-bill-tracker');
  window.analytics.trackLink(signUpReadyBillTracker, 'Clicked Get Started Button', {
    location: 'billTracker_readySection',
    action: 'show_waiting_list_modal',
  });

  const signUpButtonBillTracker = document.getElementById('signup-section-button-bill-tracker');
  window.analytics.trackLink(signUpButtonBillTracker, 'Clicked Get Started Button', {
    location: 'billTracker_signup',
    action: 'show_waiting_list_modal',
  });

  // About Us elements
  const signUpHeaderAboutUs = document.getElementById('sign-up-header-about-us');
  window.analytics.trackLink(signUpHeaderAboutUs, 'Clicked Get Started Button', {
    location: 'aboutUs_header',
    action: 'goto_pricing_section',
  });

  const meetLeadership = document.getElementById('meet-leadership');
  window.analytics.trackLink(meetLeadership, 'Clicked to Meet Leadership', {
    location: 'aboutUs_header',
  });

  const linkedInOla = document.getElementById('linkedin-ola');
  window.analytics.trackLink(linkedInOla, 'Clicked LinkedIn Ola', {
    location: 'aboutUs_leadership',
    action: 'goto_linkedin_ola',
  });

  const linkedInNikos = document.getElementById('linkedin-nikos');
  window.analytics.trackLink(linkedInNikos, 'Clicked LinkedIn Nikos', {
    location: 'aboutUs_leadership',
    action: 'goto_linkedin_nikos',
  });

  // Privacy elements
  const signUpHeaderPrivacy = document.getElementById('sign-up-header-privacy');
  window.analytics.trackLink(signUpHeaderPrivacy, 'Clicked Get Started Button', {
    location: 'privacy_header',
    action: 'goto_pricing_section',
  });

  // Terms of Use elements
  const signUpHeaderTermsOfUse = document.getElementById('sign-up-header-termsOfUse');
  window.analytics.trackLink(signUpHeaderTermsOfUse, 'Clicked Get Started Button', {
    location: 'termsOfUse_header',
    action: 'goto_pricing_section',
  });

  // 404 elements
  const signUpHeader404 = document.getElementById('sign-up-header-404');
  window.analytics.trackLink(signUpHeader404, 'Clicked Get Started Button', {
    location: '404_header',
    action: 'goto_pricing_section',
  });

  // Thank You elements
  const signUpHeaderThankYou = document.getElementById('sign-up-header-thank-you');
  window.analytics.trackLink(signUpHeaderThankYou, 'Clicked Get Started Button', {
    location: 'thankYou_header',
    action: 'goto_pricing_section',
  });

  // Partners elements
  const requestDemoButton = document.getElementById('request-demo-hero-button');
  window.analytics.trackLink(requestDemoButton, 'Clicked Request Demo Button', {
    location: 'partners_hero',
    action: 'show_request_demo_form',
  });
}
