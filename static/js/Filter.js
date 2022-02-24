let filter = document.querySelector('#filter');
let div123 = document.querySelector('#div123');
let formIngridient = document.querySelector('#formIngridient');
let thead = document.querySelector('#thead');
const cocktailListEl = document.querySelector('#cocktail-list');
const formIngridientSubmitBtnEl = document.querySelector('#form-ingrident-submit-btn');
let arr = [];

const deleteIngridient = (elem) => {

}

const addIngridientsInForm = (elem) => {
        let divFormIngridients = document.createElement('div');
        divFormIngridients.className = "btn-group alert-dismissable w-full";
        formIngridient.appendChild(divFormIngridients);
        
        let inputFormIngridients = document.createElement('input');
        inputFormIngridients.className = "btn btn-outline-dark w-full";
        inputFormIngridients.value = `${elem.product}`
        inputFormIngridients.name = `${elem.product}`
        inputFormIngridients.disabled = true;
        inputFormIngridients.setAttribute("data-selected-ingridient", elem.product)
        inputFormIngridients.setAttribute("id-selected-ingridient", elem.id)
        divFormIngridients.appendChild(inputFormIngridients);

        let buttonFormIngridients = document.createElement('button');
        buttonFormIngridients.className = "btn btn-outline-danger";
        buttonFormIngridients.innerHTML = 'del'
        buttonFormIngridients.addEventListener('click', function deleteIngridient(elem) {
            formIngridient.removeChild(divFormIngridients);
        })
        divFormIngridients.appendChild(buttonFormIngridients);
}

const Filter = async () => {
    if (filter.value == "") {
        div123.innerHTML = ''
        return
    }
    const resp = await fetch(`http://127.0.0.1:8000/drink/get/${filter.value}`, {
    method: 'GET',
    });
    const result = await resp.json();
    arr = result;

    div123.innerHTML = ''

    arr.map((elem, index) => {
        let button = document.createElement('button');
        button.className = 'btn btn-outline-dark df';
        button.addEventListener('click', () => addIngridientsInForm(elem) ); 
     

        button.innerText = `${elem.product}`
        div123.appendChild(button);
    })
}

filter.addEventListener('input',  Filter);

const fetchProductIngridients = (id) => {
    return fetch(`http://127.0.0.1:8000/drink/get/${id}/ingridients`).then(res => res.json());
}

formIngridientSubmitBtnEl.addEventListener("click", async (e) => {
    const selectedIngridientElems = document.querySelectorAll("[id-selected-ingridient]");
    const selectedIngridients = Array.from(selectedIngridientElems).map(elem => elem.getAttribute("id-selected-ingridient"));
    const query = selectedIngridients.map(ingridient => `${ingridient}=1`).join("&");

    const data = await fetch(`http://127.0.0.1:8000/drink/cocktails?${query}`).then(res => res.json());

    const rawElems = data.map(dataItem => {
        return `<button type="button" data-id="${dataItem.id}" class="btn btn-outline-dark w-full mb-1">${dataItem.name} </button>`

        // let button = document.querySelector('.btn btn-outline-dark w-full mb-1');
        
        // button.addEventListener('click', showProductIngridients(dataItem.id));

    })
    /*`<button type="button" data-id="${dataItem.id}" class="btn btn-outline-dark w-full mb-1">${dataItem.name} onclick=`showProductIngridients(dataItem.id)` </button>`)*/
    console.log(data);
    cocktailListEl.innerHTML = rawElems.join('');
});

const renderProductIngridientsList = (ingridients, buttonName) => {
    let sumPrice = 0;
    let tbody = document.querySelector('#tbody');
    let count = 0
    console.log("ingridients", ingridients);
        const arrIngridients = ingridients.map(ingridient => {
            let key = Object.keys(ingridient)
            let value = Object.values(ingridient)
            console.log(key)
            count++
            sumPrice += +value
        return `<tr>
            <th scope="row">${count}</th>
            <td>${key}</td>
            <td class="t-r">${value}</td>
            <td class="t-l"><sub>ml</sub></td>
        </tr>`
    })
    tbody.innerHTML = arrIngridients.join('');

    const tHead = `  <tr>
    <th scope="col">#</th>
    <th scope="col">${buttonName}</th>
    <th scope="col" class="t-r">${sumPrice}</th>
    <th scope="col" class="t-l"><sub>gr</sub></th>
  </tr>`

  thead.innerHTML = tHead;
}

cocktailListEl.addEventListener("click", async (e) => {
    const buttonName = e.target.innerHTML
    const cocktailId = e.target.getAttribute("data-id");
    if (cocktailId) {
       const productIngridients = await fetchProductIngridients(cocktailId);
      
       renderProductIngridientsList(productIngridients, buttonName);
    }

   
});

