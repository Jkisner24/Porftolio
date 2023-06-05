const form = document.getElementById('myForm');

form.addEventListener('submit', (event) => {
  event.preventDefault(); 

  const formData = new FormData(form);
  const name = formData.get('name');
  const lastName = formData.get('lastName');
  const email = formData.get('email');
  const message = formData.get('message');

  const data = { name, lastName, email, message };
  console.log(data)

  fetch('https://porftolio-jkisner24.vercel.app/guardar', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.text())
    .then(message => {
    })
    .catch(error => {
      console.error('Error al enviar los datos:', error);
    });
});
