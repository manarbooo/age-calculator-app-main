const form = document.querySelector(".form");
const dayInput = document.querySelector("#day");
const monthInput = document.querySelector("#month");
const yearInput = document.querySelector("#year");
const errorSpans = document.querySelectorAll('.errorSpan');
const labels = document.querySelectorAll(".label");
const resultsSpans = document.querySelectorAll(".numericalVal");




form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const dayVal = dayInput.value.trim();
    const monthVal = monthInput.value.trim();
    const yearVal = yearInput.value.trim();
  
    let isValid = true;

    resetErrors();
   
    if(dayVal === ""){
        showError(0, "This field is required");
        isValid = false;
    }else if(!validDay(dayVal, monthVal, yearVal)){
        showError(0, "Must be a valid day");
        isValid = false;
    }


    if(monthVal === ""){
        showError(1, "This field is required");
        isValid = false;
    }else if(!validMonth(monthVal)){
        showError(1, "Must be a valid month");
        isValid = false;
    }

    if(yearVal === ""){
        showError(2, "This field is required");
        isValid = false;
    }else if(!validYear(yearVal)){
        showError(2, "Must be in the past");
        isValid = false;
    }

    
    

    if(isValid){
        calculateAge(dayVal, monthVal, yearVal);
    }

    

    

});




function resetErrors(){
    errorSpans.forEach((span) => {
        span.style.visibility = "hidden";
        span.textContent = "";
    });
    [dayInput, monthInput, yearInput].forEach((input) => {
        input.classList.remove("errorBorder");
    });


    labels.forEach((label) => {
        label.classList.remove("errorLabel"); 
    });

}


function showError(index, message) {
    errorSpans[index].style.visibility = "visible";
    errorSpans[index].textContent = message;

    [dayInput, monthInput, yearInput][index].classList.add("errorBorder"); 
    labels[index].classList.add("errorLabel"); 
}



function validDay(day, month, year){
    const dayNum = parseInt(day);
    return dayNum >= 1 && dayNum <= getDaysInMonth(month, year);
}



function validMonth(month) {
    const monthNum = parseInt(month);
    return monthNum >= 1 && monthNum <= 12;
}



function validYear(year) {
    const yearNum = parseInt(year);
    return yearNum <= new Date().getFullYear();
}




function getDaysInMonth(month, year){
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    return new Date(yearNum, monthNum, 0).getDate();
}



function calculateAge(day, month, year){
    const today = new Date();
    const birthdate = new Date(year, month - 1, day);

    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();

    if(days < 0){
        months -= 1;
        days += getDaysInMonth(today.getMonth(), today.getFullYear());

    }

    if(months < 0){
        years -= 1;
        months += 12;
    }

    animateResult(resultsSpans[0], years);
    animateResult(resultsSpans[1], months);
    animateResult(resultsSpans[2], days);
}




function animateResult(element, endValue){
    anime({
        targets: { value: 0},
        value: endValue,
        round: 1,
        easing: 'easeOutQuad',
        duration: 2000,
        update: function (anim){
            element.textContent = anim.animations[0].currentValue;
        }
    });

}





/*
retrive the data , error state if it exists   -input filds, error spans -
calculate date difference -input values 
update the output div - results years months and days 
the event listner - form 

*/