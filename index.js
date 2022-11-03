const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const ageInput = document.getElementById("age");
const statusInput = document.getElementById("status");
let datas;

document.getElementById("submit-btn").addEventListener("click", function (e) {
    e.preventDefault();
    age.value = age.value.trim();
    if (stringValidation(nameInput.value) && stringValidation(surnameInput.value) && stringValidation(statusInput.value) && numInputValidation(ageInput.value)) {
        let participant = {
            id: 11,
            name: nameInput.value,
            surname: surnameInput.value,
            age: age.value,
            status: statusInput.value,
        }
        sendToDB(participant);
    }
})

document.getElementById("fixed-get-data").addEventListener("click", function (e) {
    e.preventDefault();
    $(".line").remove();
    getDatasFromDB();
})



function stringValidation(str) {
    return str.trim().length !== 0;
}

function numInputValidation(num) {
    return num.trim().length !== 0 && num.replace(/[^0-9]/g, '').length === num.length;
}

function sendToDB(element) {
    fetch('https://636398d98a3337d9a2e1d68d.mockapi.io/participant/partp', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(element),
    });
}


function getDatasFromDB() {
    const fetchedData = fetch('https://636398d98a3337d9a2e1d68d.mockapi.io/participant/partp');
    fetchedData.then(response => response.json())
        .then(data => data.forEach(element => {
            createNewLine(element);
        }));
}

function createNewLine(el)
{
    let newDivMain = document.createElement("div");
    let newDivName = document.createElement("div");
    let newDivSurname = document.createElement("div");
    let newDivAge = document.createElement("div");
    let newDivStatus = document.createElement("div");



    newDivMain.classList.add("line");
    newDivName.classList.add("p-name");
    newDivSurname.classList.add("p-surname");
    newDivAge.classList.add("p-age");
    newDivStatus.classList.add("p-status");

    newDivName.innerHTML=el.name;
    newDivSurname.innerHTML=el.surname;
    newDivAge.innerHTML=el.age;
    newDivStatus.innerHTML=el.status;

    newDivMain.appendChild(newDivName);
    newDivMain.appendChild(newDivSurname);
    newDivMain.appendChild(newDivAge);
    newDivMain.appendChild(newDivStatus);

    document.getElementById("table-foot").appendChild(newDivMain);
}