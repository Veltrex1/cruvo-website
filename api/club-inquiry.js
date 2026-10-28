/* global process */

const MAX_BODY_BYTES = 20000;
const CLUB_TYPES = { motorcycle: 'Motorcycle club', car: 'Car club', both: 'Motorcycle and car club' };
const LIMITS = { clubName: 120, name: 120, email: 200, members: 40, message: 4000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function readField(body, field) {
  const value = typeof body[field] === 'string' ? body[field].trim() : '';
  return value.slice(0, LIMITS[field]);
}

export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    response.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = request.body && typeof request.body === 'object' ? request.body : {};
  if (JSON.stringify(body).length > MAX_BODY_BYTES) {
    response.status(413).json({ error: 'Request too large' });
    return;
  }

  // Hidden field that real visitors never fill in. Pretend success so bots do not retry.
  if (typeof body.website === 'string' && body.website.trim()) {
    response.status(200).json({ ok: true });
    return;
  }

  const clubName = readField(body, 'clubName');
  const name = readField(body, 'name');
  const email = readField(body, 'email');
  const members = readField(body, 'members');
  const message = readField(body, 'message');
  const clubType = CLUB_TYPES[body.clubType] ? body.clubType : null;

  if (!clubName || !name || !message || !clubType || !EMAIL_PATTERN.test(email)) {
    response.status(400).json({ error: 'Please fill in every required field with a valid email address.' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CLUB_INQUIRY_FROM;
  const to = process.env.CLUB_INQUIRY_TO || 'info@cruvo.co';
  if (!apiKey || !from) {
    response.status(503).json({ error: 'Club requests are not configured yet.' });
    return;
  }

  const rows = [
    ['Club', clubName],
    ['Contact', name],
    ['Email', email],
    ['Type of club', CLUB_TYPES[clubType]],
    ['Members', members || 'Not given'],
  ];
  const text = [...rows.map(([label, value]) => `${label}: ${value}`), '', message].join('\n');
  const html = `${rows
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join('')}<p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;

  let result;
  try {
    result = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Club request: ${clubName}`.slice(0, 200),
        text,
        html,
      }),
    });
  } catch {
    response.status(502).json({ error: 'Could not send the request. Please try again.' });
    return;
  }

  if (!result.ok) {
    response.status(502).json({ error: 'Could not send the request. Please try again.' });
    return;
  }

  response.status(200).json({ ok: true });
}
