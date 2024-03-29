const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard'); // go to dash after logging in
    } else {
      alert('Failed to log in');
      const d = await response.json();
      console.log(d);
    }
  }
};

document
.querySelector('#login-form')
.addEventListener('submit', loginFormHandler);