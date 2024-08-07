//const BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/';

const BASE_URL ='https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/';//btc.json';

const dropdowns = document.querySelectorAll('.dropdown select');
const btnForm = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');
const perUnitMsg = document.querySelector('.perUnitMsg');

window.addEventListener('load',(evt)=>{
    updateExchangeRate(evt);
});


for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerText=currCode;
        newOption.value=currCode;
        // default selection logic
        if(select.name === 'from' && currCode ==='USD'){
            newOption.selected = 'selected';
        } else if(select.name === 'to' && currCode ==='INR'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    // onchange in dropdown -> invoke change
    select.addEventListener('change', (evt) =>{
        updateFlag(evt.target);
        //console.log(evt.target);
    });
}
//flag change logic
const updateFlag = (element) =>{
     //console.log(element);
     let currCode = element.value;
     let countryCode = countryList[currCode];
     let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
     let img = element.parentElement.querySelector('img');
     img.src = newSrc;
     //img.alt = countryCode+"-"
     console.log('new flag image updated selected =',countryCode);
}

btnForm.addEventListener('click', (evt)=>{
    evt.preventDefault(); // stop stomatic behaviour of form
    updateExchangeRate(evt);
    //console.log(evt.target);

});

const updateExchangeRate = async (evt) =>{
    let amount = document.querySelector('.amount input');
    // default value 1 for invalid input
    let amtVal = amount.value;
    console.log(amtVal);
    if(amtVal ==='' || amtVal <=0){
        amtVal = 1;
        amount.value = '1';
    }

    //country-by-currency-code.json';
    console.log(fromCurr.value, toCurr.value);
    let url = `${BASE_URL}${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    //console.log(data);
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    perUnitMsg.innerText = `1 ${fromCurr.value} = ${rate} ${toCurr.value}`
    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

} 



