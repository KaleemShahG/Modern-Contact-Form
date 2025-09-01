const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const successEl = document.getElementById('success');

// helper: set error text for a field
function setError(fieldEl, message){
  const wrap = fieldEl.closest('[data-field]');
  const err = wrap.querySelector('.error');
  wrap.classList.add('invalid');
  err.textContent = message || 'This field is required';
}

// helper: clear error
function clearError(fieldEl){
  const wrap = fieldEl.closest('[data-field]');
  const err = wrap.querySelector('.error');
  wrap.classList.remove('invalid');
  err.textContent = '';
}

// email check
function isValidEmail(v){
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
}

// per-field validators
function validateField(el){
  const id = el.id;
  const v = el.value.trim();

  if(id === 'name'){
    if(v.length < 2) return setError(el, 'Please enter your full name');
  }
  if(id === 'email'){
    if(!isValidEmail(v)) return setError(el, 'Enter a valid email (e.g. you@example.com)');
  }
  if(id === 'subject'){
    if(v.length < 3) return setError(el, 'Subject must be at least 3 characters');
  }
  if(id === 'message'){
    if(v.length < 10) return setError(el, 'Message must be at least 10 characters');
  }
  clearError(el);
}

// live validation
['input','blur'].forEach(evt=>{
  form.addEventListener(evt, (e)=>{
    const t = e.target;
    if(t.matches('input, textarea')) validateField(t);
  }, true);
});

// on submit
form.addEventListener('submit', (e)=>{
  e.preventDefault();
  successEl.hidden = true;

  const fields = [...form.querySelectorAll('input, textarea')];
  fields.forEach(validateField);

  // if any invalid, stop
  if(form.querySelector('.invalid')) return;

  // simulate sending…
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  setTimeout(()=>{
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Message';
    form.reset();
    successEl.hidden = false;
    // for demo: show in console
    console.log('Form sent ✅');
  }, 700);
});