let filter = document.querySelector('#filter');
let div123 = document.querySelector('#div123');
let formIngridient = document.querySelector('#formIngridient');
let arr = [];

const deleteIngridient = (elem) => {

}

const addIngridientsInForm = (elem) => {
        let divFormIngridients = document.createElement('div');
        divFormIngridients.className = "btn-group alert-dismissable";
        formIngridient.appendChild(divFormIngridients);
        
        let inputFormIngridients = document.createElement('input');
        inputFormIngridients.className = "btn btn-outline-dark w-full";
        inputFormIngridients.value = `${elem.product}`
        inputFormIngridients.name = `${elem.product}`
        inputFormIngridients.disabled = true
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
    const resp = await fetch(`http://127.0.0.1:8000/drink/get/${filter.value}`, {
      method: 'GET',
    });
    const result = await resp.json();
    arr = result;
    console.log(arr);
    div123.innerHTML = ''

   

    arr.map((elem, index) => {
        let button = document.createElement('button');
        button.className = 'btn btn-outline-dark df';
        button.addEventListener('click', () => addIngridientsInForm(elem) ); 
        /*button.onclick = (elem) => {
            let divFormIngridients = document.createElement('div');
            divFormIngridients.className = "btn-group alert-dismissable";
            formIngridient.appendChild(divFormIngridients);
            
            let inputFormIngridients = document.createElement('input');
            inputFormIngridients.className = "btn btn-outline-dark w-full";
            inputFormIngridients.value = `${elem.product}`
            divFormIngridients.appendChild(inputFormIngridients);

            let buttonFormIngridients = document.createElement('button');
            buttonFormIngridients.className = "btn btn-outline-danger";
            divFormIngridients.appendChild(buttonFormIngridients);
        }*/

        button.innerText = `${elem.product}`
        div123.appendChild(button);
    })
}

filter.addEventListener('input',  Filter)
    
   // filter.addEventListener('onclick', upDatevalue);


 
/*filter.addEventListener('onkeydawn', function Filter() {
    arr.map((elem, index)=>{
        let button = document.createElement('button');
        button.className = 'btn btn-outline-dark';
        button.innerHTML = `${elem.product}`
        div123.appendChild(button);
        console.log(arr);
    })
})*/

    

    /*return (
        el.title.toLowerCase().indexOf(inpFiltr.toLowerCase()) > -1 ||
        el.news.toLowerCase().indexOf(inpFiltr.toLowerCase()) > -1
      );*/
