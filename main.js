document.getElementById('getunicorns').addEventListener('click', getUnicorns)
document.getElementById('createunicorns').addEventListener('submit', createUnicorns)
let submitBtn = document.getElementById('submit')
let updateBtn = document.getElementById('update')

const API_KEY = 'e04ceee1fe30404a9da84d725c1ff275'
const API_ENDPOINT = `https://crudcrud.com/api/${API_KEY}/unicorns`
const spinner = document.getElementById('spinner')

async function getUnicorns() {
    let res = await fetch(API_ENDPOINT, {
        method: "GET"
    })
    let data = await res.json()
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
        deleteBtn.id = 'delete-btn'
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
    let nameObject = document.getElementById('name')
    let ageObject = document.getElementById('age')
    let colourObject = document.getElementById('colour')

    let name = nameObject.value
    let age = ageObject.value
    let colour = document.getElementById('colour').value

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
    let submit = document.getElementById('submit')

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
    let buttonParent = deltBtn.parentElement.parentElement
    console.log(buttonParent)
    buttonParent.remove()
    let id = buttonParent.firstElementChild.textContent
    console.log(id)
    buttonParent.remove()

    fetch(API_ENDPOINT + '/' + id, {
        method: 'DELETE'
    });
}

function updateButton(event) {
    let updateMain = event.target
    let upadateParent = updateMain.parentElement.parentElement
    console.log("update button clicked")

    let id = upadateParent.firstElementChild
    let idValue = id.textContent
    console.log('id', idValue
    )
    let name = id.nextSibling
    let nameValue = name.textContent
    console.log('name', nameValue)

    let colour = name.nextSibling
    let colourValue = colour.textContent
    console.log('colour', colourValue)

    let age = colour.nextSibling
    let ageValue = age.textContent
    console.log('age', ageValue)

    let nameObject = document.getElementById('name')
    nameObject.value = nameValue
    let ageObject = document.getElementById('age')
    ageObject.value = ageValue
    let colourObject = document.getElementById('colour')
    colourObject.value = colourValue

    submitBtn.style.display = 'none'
    updateBtn.style.display = 'block'

    fetch(API_ENDPOINT + '/' + id, {
        method : 'PUT'
    });
}