/**
 * Saundarya Skin Clinic & Laser Centre - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const mobileClose = document.getElementById('mobileClose');
  const overlay = document.getElementById('overlay');

  if (mobileToggle && mobileNav && overlay) {
    mobileToggle.addEventListener('click', () => {
      mobileNav.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    const closeAll = () => {
      mobileNav.classList.remove('open');
      const modals = document.querySelectorAll('.modal');
      modals.forEach(m => m.classList.remove('active'));
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (mobileClose) mobileClose.addEventListener('click', closeAll);
    overlay.addEventListener('click', closeAll);
  }

  // Active Link Highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Service Filter Tabs (on Services Page)
  const tabBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card-item');

  if (tabBtns.length > 0 && serviceCards.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');
        serviceCards.forEach(card => {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Appointment Form Submission Handling via WhatsApp
  const appointmentForm = document.getElementById('appointmentForm');
  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('patientName')?.value || '';
      const phone = document.getElementById('patientPhone')?.value || '';
      const service = document.getElementById('preferredService')?.value || 'General Skin Consultation';
      const date = document.getElementById('preferredDate')?.value || 'As early as possible';
      const notes = document.getElementById('patientNotes')?.value || '';

      if (!name || !phone) {
        alert('Please provide your name and contact phone number.');
        return;
      }

      // Format WhatsApp message
      let message = `*New Appointment Request - सौंदर्य Skin Clinic*\n\n`;
      message += `👤 *Patient Name:* ${name}\n`;
      message += `📞 *Phone Number:* ${phone}\n`;
      message += `🩺 *Service Required:* ${service}\n`;
      message += `📅 *Preferred Date:* ${date}\n`;
      if (notes && notes.trim() !== '') {
        message += `📝 *Notes/Symptoms:* ${notes}\n`;
      }
      message += `\nPlease confirm my appointment slot. Thank you!`;

      const whatsappNumber = '919316572199';
      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');

      // Display Success Modal with direct WhatsApp link backup
      const modal = document.getElementById('successModal');
      if (modal) {
        const msgElement = document.getElementById('modalMsg');
        if (msgElement) {
          msgElement.innerHTML = `Thank you, <strong>${name}</strong>! Your appointment request details have been sent to our WhatsApp desk (+91 93165 72199).<br><br>If WhatsApp did not open automatically, <a href="${whatsappUrl}" target="_blank" style="color:#25D366; font-weight:bold; text-decoration:underline;">Click Here to Open WhatsApp Directly</a>.`;
        }
        modal.classList.add('active');
        if (overlay) overlay.classList.add('active');
      } else {
        alert(`Thank you, ${name}! Redirecting to WhatsApp to send your appointment request.`);
      }
    });
  }

  // Service Card Booking Modal Trigger
  const serviceModal = document.getElementById('serviceBookingModal');
  const serviceModalTitle = document.getElementById('modalServiceTitle');
  const serviceBookingBtns = document.querySelectorAll('.open-service-booking');

  if (serviceBookingBtns.length > 0 && serviceModal) {
    serviceBookingBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const serviceName = btn.getAttribute('data-service') || 'General Dermatology Consultation';
        if (serviceModalTitle) {
          serviceModalTitle.value = serviceName;
        }
        serviceModal.classList.add('active');
        if (overlay) overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  // Service Modal WhatsApp Form Submission
  const serviceModalForm = document.getElementById('serviceModalForm');
  if (serviceModalForm) {
    serviceModalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const service = document.getElementById('modalServiceTitle')?.value || 'Skin & Cosmetology Consultation';
      const name = document.getElementById('modalPatientName')?.value || '';
      const phone = document.getElementById('modalPatientPhone')?.value || '';
      const date = document.getElementById('modalPreferredDate')?.value || 'Earliest available date';
      const notes = document.getElementById('modalPatientNotes')?.value || '';

      if (!name || !phone) {
        alert('Please provide your name and WhatsApp contact number.');
        return;
      }

      // Format WhatsApp message with user requested 'Please accept our appointment request'
      let message = `*Appointment Request - सौंदर्य Skin Clinic*\n\n`;
      message += `Hello Doctor, Please accept our appointment request for consultation.\n\n`;
      message += `🩺 *Selected Service:* ${service}\n`;
      message += `👤 *Patient Name:* ${name}\n`;
      message += `📞 *WhatsApp Phone:* ${phone}\n`;
      message += `📅 *Preferred Date:* ${date}\n`;
      if (notes && notes.trim() !== '') {
        message += `📝 *Patient Notes:* ${notes}\n`;
      }
      message += `\n*Request:* Please accept our appointment request and kindly confirm the available time slot. Thank you!`;

      const whatsappNumber = '919316572199';
      const encodedMsg = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

      // Open WhatsApp directly
      window.open(whatsappUrl, '_blank');

      // Close modal and reset
      serviceModal.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
      serviceModalForm.reset();
    });
  }

  // Modal Close Buttons
  const modalCloseBtns = document.querySelectorAll('.modal-close, .modal-close-trigger');
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modals = document.querySelectorAll('.modal');
      modals.forEach(m => m.classList.remove('active'));
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
      if (appointmentForm) appointmentForm.reset();
      if (serviceModalForm) serviceModalForm.reset();
    });
  });

  // Interactive FAQ Accordion (SEO & AEO)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        // Optional: close other open items for cleaner single-answer view
        faqItems.forEach(other => other.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
});
