// registration functionality
document.getElementById('register').addEventListener('click', event => {
  event.preventDefault()

  // hit register function w/ Axios, reference userRoutes, and hand it the info from the form
  axios.post('/api/users/register', {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    username: document.getElementById('rUsername').value,
    password: document.getElementById('rPassword').value
  })
    .then(() => {
      // little pop up alert to confirm registration
      Toastify({
        text: 'Registered! Please sign in!',
        backgroundColor: 'green',
        duration: 3000
      }).showToast()

      // clear form
      document.getElementById('name').value = ''
      document.getElementById('email').value = ''
      document.getElementById('rUsername').value = ''
      document.getElementById('rPassword').value = ''
    })
    .catch(err => {
      console.error(err)
      // can indicate an error on the front end when the back end submission didn't work
      Toastify({
        text: 'Whoops! Something went wrong. Try again.',
        backgroundColor: 'red',
        duration: 3000
      }).showToast()
    })
})

// sign in functionality
document.getElementById('signIn').addEventListener('click', event => {
  event.preventDefault()

  // users log in route, sends this info
  axios.post('/api/users/login', {
    username: document.getElementById('username').value,
    password: document.getElementById('password').value
  })
    // hands back data (aka, the token)
    .then(({ data: token }) => {
      if (token) {
        // store token in localStorage
        localStorage.setItem('user', token)
        // navigate to main page of application
        window.location = '/index.html'
      } else {
        // log in error
        Toastify({
          text: 'Invalid username or password.',
          backgroundColor: 'red',
          duration: 3000
        }).showToast()
      }
    })
    .catch(err => {
      console.error(err)
      Toastify({
        text: 'Whoops! Something went wrong. Try again.',
        backgroundColor: 'red',
        duration: 3000
      }).showToast()
    })
})
