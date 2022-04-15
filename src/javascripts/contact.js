/* eslint-disable no-underscore-dangle */
import $ from 'jquery';

window.jQuery = $;
window.$ = $;

function init() {
  const env = window.__NODE_CONFIG_ENV;
  const isProdEnvironment = env === 'production';

  (() => {
    // contact form
    function getFormData($form) {
      const unindexedArray = $form.serializeArray();
      const indexedArray = {};

      $.map(unindexedArray, function getArray(n) {
        indexedArray[n.name] = n.value;
      });

      return indexedArray;
    }

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }

    $('#demoForm').submit(function submitcontactForm(e) {
      e.preventDefault();
      const that = this;

      let actionurl = '';
      if (isProdEnvironment) {
        // eslint-disable-next-line no-eval
        actionurl = eval(
          atob(
            'YXRvYigiYUhSMGNITTZMeTloY0drdWFITm1iM0p0Y3k1amIyMHZjM1ZpYldsemMybHZibk12ZGpNdmFXNTBaV2R5WVhScGIyNHZjM1ZpYldsMEx6WTROVGMwTURndk1tWXlOMlZqWVRjdFptUTRaQzAwWkRCbUxUaGpZV0V0TkdSaVptSTNOV0ZrWldWbSIp',
          ),
        );
      }

      const formData = getFormData($('#demoForm'));

      if (!validateEmail(formData.email)) {
        return;
      }

      if (window.analytics && window.analytics.track) {
        window.analytics.identify(formData.email, { plan: 'Partner', createdAt: new Date().toISOString() });
        window.analytics.track('Requested Partner Demo');
      }

      const dataToSend = {
        fields: [
          {
            name: 'email',
            value: formData.email,
          },
          {
            name: 'firstname',
            value: formData.firstName,
          },
          {
            name: 'lastname',
            value: formData.lastName,
          },
          {
            name: 'company',
            value: formData.company,
          },
          {
            name: 'state',
            value: formData.state,
          },
          {
            name: 'message',
            value: formData.message,
          },
        ],
        context: {
          pageUri: 'https://joingerald.com/partners.html',
          pageName: 'Partners - Gerald Wallet',
        },
      };

      $.ajax({
        url: actionurl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataToSend),
        complete: function complete() {
          // eslint-disable-next-line no-alert
          alert("Thank you for your message! We'll reach out to you soon.");
          $(that)[0].reset();
        },
      }).then(() => {});
    });

    $('#advisorForm').submit(function submitcontactForm(e) {
      e.preventDefault();
      const that = this;

      let actionurl = '';
      if (isProdEnvironment) {
        // eslint-disable-next-line no-eval
        actionurl = eval(
          atob(
            'YXRvYigiYUhSMGNITTZMeTloY0drdWFITm1iM0p0Y3k1amIyMHZjM1ZpYldsemMybHZibk12ZGpNdmFXNTBaV2R5WVhScGIyNHZjM1ZpYldsMEx6WTROVGMwTURndk56UTNPREJtWlRVdE5tUTFNQzAwWXpZeExUazJOV1V0WldKaE5EUXlORGN5TURFeCIp',
          ),
        );
      }

      const formData = getFormData($('#advisorForm'));

      if (!validateEmail(formData.email)) {
        return;
      }

      if (window.analytics && window.analytics.track) {
        window.analytics.identify(formData.email, { plan: 'CAB', createdAt: new Date().toISOString() });
        window.analytics.track('Joined CAB');
      }

      const dataToSend = {
        fields: [
          {
            name: 'email',
            value: formData.email,
          },
        ],
        context: {
          pageUri: 'https://joingerald.com/about-us.html',
          pageName: 'Customer Advisory Board - About Us',
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: 'I agree with the handling of my data in accordance with the Gerald privacy policy.',
            communications: [
              {
                value: true,
                subscriptionTypeId: 7918218,
                text: 'I agree to receive marketing communications from Gerald Technologies Inc.',
              },
            ],
          },
        },
      };

      $.ajax({
        url: actionurl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataToSend),
        complete: function complete() {
          // eslint-disable-next-line no-alert
          alert('Your message has been sent!');
          $(that)[0].reset();
        },
      }).then(() => {});
    });

    function handleSubmitWaitlistForm(actionurl, dataToSend, that) {
      $.ajax({
        url: actionurl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataToSend),
        complete: function complete() {
          // eslint-disable-next-line no-alert
          window.location.replace('/thank-you.html');
          $(that)[0].reset();
          // close the modal
          const modal = document.getElementById('modal');
          modal.style.display = 'none';
          modal.style.overflow = 'auto';
          document.body.style.overflow = 'auto';
        },
      }).then(() => {});
    }

    $('#waitlistForm').submit(function submitcontactForm(e) {
      e.preventDefault();
      const that = this;

      let actionurl = '';
      let ipdatakey = '';
      if (isProdEnvironment) {
        // eslint-disable-next-line no-eval
        actionurl = eval(
          atob(
            'YXRvYigiYUhSMGNITTZMeTloY0drdWFITm1iM0p0Y3k1amIyMHZjM1ZpYldsemMybHZibk12ZGpNdmFXNTBaV2R5WVhScGIyNHZjM1ZpYldsMEx6WTROVGMwTURndk0yVXlOREUyTldZdFlqVmlNUzAwWkRZMkxXRTNZVGN0TUdNME1qTXhNalUyWWpJNSIp',
          ),
        );
        // eslint-disable-next-line no-eval
        ipdatakey = eval(
          atob(
            'YXRvYignWlRBNE9XWTJaREF6WlRNNU1tVmlNbVExWkRJek0yTmhPVFk0WWpZMk5EbGtPRGMwTmpSak16RTFORFpoTnpnd04yVTRaVFl5T1RVPScp',
          ),
        );
      }

      const formData = getFormData($('#waitlistForm'));

      if (window.analytics && window.analytics.track) {
        window.analytics.identify(formData.email, {
          plan: 'Premium',
          revenue: 9.99,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          createdAt: new Date().toISOString(),
        });
        window.analytics.track('Joined Waitlist');
      }

      const dataToSend = {
        fields: [
          {
            name: 'email',
            value: formData.email,
          },
          {
            name: 'firstname',
            value: formData.firstName,
          },
          {
            name: 'lastname',
            value: formData.lastName,
          },
        ],
        context: {
          pageUri: 'https://joingerald.com/',
          pageName: 'Waitlist - Gerald Wallet',
        },
      };

      if (isProdEnvironment && ipdatakey) {
        $.get(
          `https://api.ipdata.co?api-key=${ipdatakey}`,
          (response) => {
            if (response.country_code === 'US') {
              handleSubmitWaitlistForm(actionurl, dataToSend, that);
            } else {
              const errorEl = document.querySelector('.modal__error');
              if (errorEl) {
                errorEl.style.display = 'block';
              }
            }
          },
          'jsonp',
        );
      } else {
        handleSubmitWaitlistForm(actionurl, dataToSend, that);
      }
    });
  })();
}

document.addEventListener('DOMContentLoaded', function DOMContentLoaded() {
  init();
});
