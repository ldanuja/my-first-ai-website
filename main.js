// Fills the page with the details in content.json.
// If the JSON can't be loaded, the text already written in index.html stays as-is.

const ICONS = {
  car: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0D5C8A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 13l2-5a2 2 0 0 1 1.9-1.4h10.2A2 2 0 0 1 19 8l2 5v4a1 1 0 0 1-1 1h-1.5M3 13v4a1 1 0 0 0 1 1h1.5M3 13h18"/><circle cx="7.5" cy="17.5" r="1.8"/><circle cx="16.5" cy="17.5" r="1.8"/></svg>',
  sparkle: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0D5C8A" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.8 4.6L18.5 9l-4.7 1.4L12 15l-1.8-4.6L5.5 9l4.7-1.4z"/><path d="M19 15l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z"/></svg>'
};

// Look up "a.b.c" inside an object.
function get(obj, path) {
  return path.split('.').reduce((o, key) => (o == null ? undefined : o[key]), obj);
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function fillFields(data) {
  // Any element with data-field="business.name" etc. gets that value as its text.
  document.querySelectorAll('[data-field]').forEach((node) => {
    const value = get(data, node.dataset.field);
    if (typeof value === 'string' && value) node.textContent = value;
  });

  if (data.business && data.business.name) {
    document.title = data.business.name + ' — Car Wash & Detailing';
  }

  const contact = data.contact || {};
  const tel = document.getElementById('call-link');
  if (tel && contact.phone) tel.href = 'tel:' + contact.phone.replace(/[^\d+]/g, '');
  const wa = document.getElementById('whatsapp-link');
  if (wa && contact.whatsapp) wa.href = 'https://wa.me/' + contact.whatsapp.replace(/\D/g, '');
}

function renderServices(services) {
  const list = document.getElementById('services-list');
  if (!list || !Array.isArray(services) || !services.length) return;
  list.replaceChildren(
    ...services.map((s) => {
      const card = el('article', s.featured ? 'card card-featured' : 'card');
      if (s.featured) card.append(el('p', 'badge', 'Most popular'));
      else if (ICONS[s.icon]) card.insertAdjacentHTML('beforeend', ICONS[s.icon]);
      card.append(el('h3', null, s.name), el('p', null, s.description), el('p', 'price', s.price));
      return card;
    })
  );
}

function renderHours(hours) {
  const list = document.getElementById('hours-list');
  if (!list || !Array.isArray(hours) || !hours.length) return;
  list.replaceChildren(
    ...hours.map((h) => {
      const li = el('li');
      li.append(el('span', null, h.days + ': '), document.createTextNode(h.time));
      return li;
    })
  );
}

document.getElementById('year').textContent = new Date().getFullYear();

fetch('content.json')
  .then((res) => {
    if (!res.ok) throw new Error('content.json not found');
    return res.json();
  })
  .then((data) => {
    fillFields(data);
    renderServices(data.services);
    renderHours(data.hours);
  })
  .catch((err) => console.warn('Using the built-in page text:', err.message));
