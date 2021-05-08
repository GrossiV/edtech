import '../css/style.css'
const axios = require('axios');

function insertUser() {
  let newUserName = document.getElementById('inputUser').value
  if (newUserName){
    axios.post('http://localhost:3000/users',
      {
        name: newUserName
      }
    )
    .then((response) => {
      appendNodeElement(newUserName);
      document.getElementById('inputUser').value = ""
    })
    .catch((error) => {
      console.error(error);
    })
  }
}
// Exposes the function to global scope
window.insertUser = insertUser;
// todo
// Think about how to optimize this function, it should not need to call axios 2 times.
// I could create a JSON object on window.load and have in the client-side a clone of the DB
// That way, I could save the ID associated with the user names.
function deleteUser(parent, child) {
  axios.get(`http://localhost:3000/users?name=${child.textContent}`)
  .then((response) => {
    axios.delete(`http://localhost:3000/users/${response.data[0].id}`)
    .then(function (response) {
      parent.removeChild(child.nextSibling);
      parent.removeChild(child);
    })
    .catch(function (error) {
      console.error(error);
    })
  })
  .catch((error) => {
    console.error(error);
  })
}

function appendNodeElement(user) {
  let parent = document.getElementById('usersList');
  let childNode = document.createElement("li");
  let childText = document.createTextNode(user);
  childNode.appendChild(childText);
  parent.appendChild(childNode);
  let buttonNode = document.createElement("button");
  let buttonText = document.createTextNode('Excluir');
  buttonNode.appendChild(buttonText);
  buttonNode.onclick = () => deleteUser(parent,childNode);
  parent.appendChild(buttonNode);
}

window.onload = () => {
  axios.get('http://localhost:3000/users')
  .then((response) => {
    for (let item of response.data){
      appendNodeElement(item.name)
    }
  })
  .catch((error) => {
    console.error(error);
  })
}
