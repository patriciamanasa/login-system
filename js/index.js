function getUsers() {
  return JSON.parse(localStorage.getItem('users')) || [];
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}

function findUser(email, password) {
  const users = getUsers();
  return users.find(user => user.email === email && user.password === password);
}

function userExists(email) {
  const users = getUsers();
  return users.some(user => user.email === email);
}

/* Signup logic */
document.getElementById('signup-form')?.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!name || !email || !password) {
      alert('All inputs are required.');
      return;
  }

  if (userExists(email)) {
      document.querySelector('.alert-box .alert').innerText = 'Email already exists.';
      document.querySelector('.alert-box .alert').classList.remove('d-none');
      return;
  }

  saveUser({ name, email, password });
  alert('Successfully registered. Please log in.');
  document.getElementById('signup-form').reset();
});

/* Login logic */
document.getElementById('login-form')?.addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
      alert('All inputs are required.');
      return;
  }

  const user = findUser(email, password);

  if (!user) {
      document.querySelector('.alert-box .alert').innerText = 'Incorrect email or password.';
      document.querySelector('.alert-box .alert').classList.remove('d-none');
      return;
  }

  localStorage.setItem('loggedInUser', JSON.stringify(user)); // Save logged-in user
  window.location.href = 'logout.html'; // Redirect to logout page
});

/*Logout logic */
document.querySelector('.logout')?.addEventListener('click', function() {
  localStorage.removeItem('loggedInUser'); // Clear logged-in user
  window.location.href = 'index.html'; // Redirect to login page
});

/*  Display user's name on logout page */
document.addEventListener('DOMContentLoaded', function() {
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (loggedInUser) {
      document.getElementById('user-name').innerText = loggedInUser.name;
  } else if (window.location.pathname.includes('logout.html')) {
      window.location.href = 'index.html'; // Redirect to login if no user is logged in
  }
});
