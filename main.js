document.getElementById('getunicorns').addEventListener('click', getUnicorns)
document.getElementById('createunicorns').addEventListener('submit', createUnicorns)
var submitBtn = document.getElementById('submit')
var updateBtn = document.getElementById('update')
updateBtn.addEventListener('click', submitChanges)

const API_KEY = '7d9320e4828d439aa3382d3263082d92'
const API_ENDPOINT = `https://crudcrud.com/api/${API_KEY}/unicorns`
const spinner = document.getElementById('spinner')

async function getUnicorns() {
    var res = await fetch(API_ENDPOINT, {
        method: "GET"
    })
    var data = await res.json()
    const container = document.getElementById('unicorn')
    container.innerHTML = ''

    // Create table element
    const table = document.createElement('table');
    table.classList.add('unicorn');

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.style.marginRight = '5px'

    const idHeader = document.createElement('th');
    idHeader.textContent = 'ID';
    headerRow.appendChild(idHeader);

    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Name';
    headerRow.appendChild(nameHeader);

    const colourHeader = document.createElement('th');
    colourHeader.textContent = 'Colour';
    headerRow.appendChild(colourHeader);

    const ageHeader = document.createElement('th');
    ageHeader.textContent = 'Age';
    headerRow.appendChild(ageHeader);

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    data.forEach((unicorn) => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = unicorn._id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = unicorn.name;
        row.appendChild(nameCell);

        const colourCell = document.createElement('td');
        colourCell.textContent = unicorn.colour;
        row.appendChild(colourCell);

        const ageCell = document.createElement('td');
        ageCell.textContent = unicorn.age;
        row.appendChild(ageCell);

        const deleteCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.id = 'devare-btn'
        deleteBtn.classList.add('unicorn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.style.backgroundColor = 'orange';
        deleteBtn.addEventListener('click', deleteButton)
        deleteCell.appendChild(deleteBtn);

        const updateCell = document.createElement('td')
        const updateBtn = document.createElement('button');
        updateBtn.id = 'update-btn'
        updateBtn.classList.add('unicorn');
        updateBtn.textContent = 'Update';
        updateBtn.style.backgroundColor = 'blue';
        updateBtn.addEventListener('click', updateButton)
        updateCell.appendChild(updateBtn)

        row.appendChild(updateCell)
        row.appendChild(deleteCell);
        tbody.appendChild(row);
        deleteBtn.addEventListener('click', deleteButton)
        deleteCell.appendChild(deleteBtn);
        row.appendChild(deleteCell);
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
    table.style.marginBottom = '10px'

}

function createUnicorns(e) {
    var nameObject = document.getElementById('name')
    var ageObject = document.getElementById('age')
    var colourObject = document.getElementById('colour')

    var name = nameObject.value
    var age = ageObject.value
    var colour = document.getElementById('colour').value

    function showSpinner() {
        document.getElementById('spinner').classList.remove('d-none');
    }

    function hideSpinner() {
        document.getElementById('spinner').classList.add('d-none');
    }

    if (name === '' || isNaN(age) || colour === '') {
        alert('Please enter a valid age');
        return;
    }
    var submit = document.getElementById('submit')

    showSpinner()
    submit.disabled = true;
    fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ name: name, age: age, colour: colour })
    })
        .then((res) => res.json())
        .then((data) => {
            nameObject.value = null
            ageObject.value = null
            colourObject.value = null
            getUnicorns()
            hideSpinner()
            submit.disabled = false
        })
        .catch((err) => {
            console.log(err)
            hideSpinner()
            submit.disabled = false
        })
        
}

function deleteButton(event) {
    const deltBtn = event.target
    var buttonParent = deltBtn.parentElement.parentElement
    console.log(buttonParent)
    buttonParent.remove()
    var id = buttonParent.firstElementChild.textContent
    console.log(id)
    buttonParent.remove()

    fetch(API_ENDPOINT + '/' + id, {
        method: 'DELETE'
    });
}
let idValue;
let nameValue;
let colourValue;
let ageValue;
let nameObject;
let colourObject;
let ageObject;

function updateButton(event) {
    var updateMain = event.target
    var upadateParent = updateMain.parentElement.parentElement
    console.log("update button clicked", upadateParent)

    var id = upadateParent.firstElementChild
    var idValue = id.textContent
    console.log('id', idValue)

    var name = id.nextSibling
    nameValue = name.textContent
    console.log('name', nameValue)

    var age = name.nextSibling
    ageValue = age.textContent
    console.log('age', ageValue)

    var colour = age.nextSibling
    colourValue = colour.textContent
    console.log('colour', colourValue)

    nameObject = document.getElementById('name')
    nameObject.value = nameValue
    colourObject = document.getElementById('colour')
    colourObject.value = colourValue
    ageObject = document.getElementById('age')
    ageObject.value = ageValue

    submitBtn.style.display = 'none'
    updateBtn.style.display = 'block'
}

function submitChanges(){
    console.log('heloo')
    fetch(API_ENDPOINT + '/' + idValue, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body : JSON.stringify({name: nameObject.value, colour: colourObject.value, age: ageObject.value})
        })
        .then((res) => res.json())
        .then((data) => {
            nameObject.value = nameValue
            ageObject.value = ageValue
            colourObject.value = colourValue
            console.log(data)
        })
        submitBtn.style.display = 'block'
        updateBtn.style.display = 'none'
    }
