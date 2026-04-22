const studentName = document.getElementById('student-name');
const studentDate = document.getElementById('student-DOB');
studentDate.max = new Date().toISOString().split("T")[0];
const genderOption = document.getElementById('gender-option');
const btn = document.getElementById('button');
const clearBtn = document.getElementById('clear-button');
const record = document.getElementsByClassName('record')[0];

let classThree = localStorage.getItem('classThree') ? JSON.parse(localStorage.getItem('classThree')) : [];


classThree.forEach(divMaker);

function divMaker(text){
  var div = document.createElement('div');
  var p_name = document.createElement('p');
  var p_date = document.createElement('p');
  var p_gender = document.createElement('p');

  div.className = 'box';
  div.setAttribute('style', 'margin: 15px 0px; display: flex');

  p_name.setAttribute('style', 'flex: 1; text-align: center');
  p_name.innerHTML = text.name;

  p_date.setAttribute('style', 'flex: 1; text-align: center');
  p_date.innerHTML = text.date;

  p_gender.setAttribute('style', 'flex: 1; text-align: center');
  p_gender.innerHTML = text.gender;

  div.appendChild(p_name);
  div.appendChild(p_date);
  div.appendChild(p_gender);

  record.appendChild(div);
}

btn.addEventListener('click', ()=>{
  classThree.push({
    name: studentName.value,
    date: studentDate.value,
    gender: genderOption.value
  })

  studentName.value = '';
  studentDate.value = '';
  genderOption.value = '';

  console.log(classThree);

  divMaker(classThree[classThree.length - 1]);

  localStorage.setItem('classThree', JSON.stringify(classThree));
});

clearBtn.addEventListener('click', ()=>{
  localStorage.clear();
  record.innerHTML = '';
  classThree = [];
});