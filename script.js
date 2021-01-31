const form = document.querySelector('#form');
const output = document.querySelector('#output');
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const email = document.querySelector('#email');

let users = [];

const renderUsers = () => {

  output.innerHTML = '';
  users.forEach(user => {

    let html = `
    <div class="user">
      <div class="text">
        <h3>${user.firstName} ${user.lastName}</h3>
        <small>${user.email}</small>
      </div>
    </div>
`
    output.innerHTML += html
  })
}

const validateText = id => { //validera
  const input = document.querySelector('#'+id);
  const error = document.querySelector('#'+id+'-error');

  if(input.value === '') {
    error.innerText = 'Du måste ange ett namn';
    return false;
  } else if(input.value.length < 2) {
    error.innerText = 'Namnet måste vara minst 2 tecken'
    return false;
  }
  else {
    error.innerText = '';
    return true;
  }
}

const validateEmail = id => { //validera email
  const input = document.querySelector('#'+id);
  const error = document.querySelector('#'+id+'-error');

  let regEx = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/

  if(regEx.test(input.value)) {
    error.innerText = '';
    return true;
  } else {
    error.innerText = 'Du måste ange en giltig email adress'
    return false;
  }
}

const validate = () => {

  document.querySelectorAll('input').forEach(input => {
  
    if(input.type === "text") {
      validateText(input.id);
    }
  
    if(input.type === "email") {
      validateEmail(input.id);
    }
    
  })
}

const createUser = (firstName, lastName, email) => {
  let user = {
    id: Date.now().toString(),
    firstName,
    lastName,
    email
  }

  users.push(user);
  console.log(users);
}

renderUsers();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  

  validate();

  if(validateText('firstName') && validateText('lastName') && validateEmail('email')) {
    
    createUser(firstName.value, lastName.value, email.value);
    renderUsers();

  }


})