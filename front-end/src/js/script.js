import '../css/style.css'
const axios = require('axios');

// TODO When handling success on insert, appende node to html

function insertUser() {
  axios.get('http://localhost:3000/users/0')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.error(error);
  })
}
// Exposes the function to global scope
window.insertUser = insertUser;


function deleteUser(parent, child) {
  let userListWithIndex = []
  for (let item of parent.children){
    if (item.tagName === 'LI'){
      userListWithIndex.push(item)
    }
  }

  axios.delete(`http://localhost:3000/users/${userListWithIndex.reverse().indexOf(child)}`)
  .then(function (response) {
    parent.removeChild(child.nextSibling);
    parent.removeChild(child);
  })
  .catch(function (error) {
    console.error(error);
  })


}


function addItem(user) {
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
  .then(function (response) {
    for (let item of response.data){
      addItem(item.name)
    }
  })
  .catch(function (error) {
    console.error(error);
  })
}