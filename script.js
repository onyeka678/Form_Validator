

const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//show input error message
function showError(input,message){
    const formControl = input.parentElement; //input=username
    formControl.className ='form-control error';
    //querySelector
    const small = formControl.querySelector ('small')
    small.innerText = message;
} 

//Show success outline
function showSuccess(input){
    const formControl = input.parentElement; //input=username
    formControl.className ='form-control success'; //set success class

}

//Check email is valid
function checkEmail(input){
    //copy n paste js email regex
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input.value.trim())){
        showSuccess(input);  

    } else{
        showError(input, 'Email is not valid');
    }
}

//Check required fields
function checkRequired(inputArr){
    //high order array methods u can attach to arrays to do diff stuff
    inputArr.forEach(function(input){
        
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`); //use backticks, put variables inside, wil show id
        } else{
            showSuccess(input);
        }


    });

}

//check input length
function checkLength(input, min, max){
    if(input.value.length < min){
        //backticks allow u to embed variable values into strings
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if(input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    }

}

//Check password
function checkPasswordsMatch(input1,input2){
    if(input1.value !== input2.value || input.2.value == ''){
        showError(input2, "Passwords do not match")
    }else{
        showSuccess(input2);
    }
}

//Get field Name
function getFieldName (input){
    //make first letter capital
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);//starting from index 1
}


//Event listeners
form.addEventListener('submit',function(e) {
    e.preventDefault();

    checkRequired([username, email, password, password2]);//pass an array of all the inputs we want

    checkLength(username, 3, 15);
    checkLength(password, 6, 15);
    checkEmail(email);
    checkPasswordsMatch(password, password2);

});
