import { showAlertModal  } from "../login.js";
const nameElement = document.getElementById('name');
const emailElement = document.getElementById('email');
const messageElement = document.getElementById('message');
const submitButton = document.getElementById('js-submit');

if(nameElement && emailElement && messageElement && submitButton){
  submitButton.addEventListener('click', (e)=>{
    if(nameElement.value !== '' && emailElement.value !== '' 
      && messageElement.value !== '')
    { 
      e.preventDefault();
      sendToMail(nameElement.value, emailElement.value, messageElement.value); 
    } else {
      showAlertModal('Error', 'Please fill in all fields.', 'person-add-outline');
    }
  })
}

function sendToMail(name, email, messages){ 
  const myGmail = 'jibrilbalogun15@gmail.com'; 
  
  let message = `Name: \n${name}\n`; 
  message += `------------\n`; 
  message += `Email:\n${email}\n`; 
  message += `---------\n`; 
  message += `Message:\n${messages}\n`; 
  message += `---------`; 
  
  const encodedMessage = encodeURIComponent(message);
  const subject = encodeURIComponent("New Contact Form Submission");
  
  
  const gmailUrl = `https://google.com${myGmail}&su=${subject}&body=${encodedMessage}`;
  
  window.open(gmailUrl, '_blank');
}
