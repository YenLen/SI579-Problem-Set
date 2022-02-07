/*
* Excercise 1
*
*/



/*
* Then write a function that changes the text and the color inside the div
*
*/
const colorblock = document.getElementById("color-block");
const color_name = document.getElementById("color-name");
const color_name_new = "#FFFFFF";

let pressed = false;

colorblock.addEventListener('click', changeColor);
function changeColor(){    
    if(pressed == true){
        colorblock.style.backgroundColor = '#F08080';
        color_name.textContent = "#F08080";
        pressed = false;
    }
    else{
        colorblock.style.backgroundColor = '#FFFFFF';
        color_name.textContent = color_name_new;
        pressed = true;
    }
}


/*
* For excercise 2, you need to write an event handler for the button id "convertbtn"
* on mouse click. For best practice use addEventListener.
*
*/
const f_input = document.getElementById("f-input");
const convert = document.getElementById("convertbtn");

convert.addEventListener("click", convertTemp);

/*
* Then write a function that calculates Fahrenheit to Celsius and display it on the webpage
*
*/

function convertTemp(){
    c_temp = (f_input.value - 32) * 5/9;
    document.getElementById("c-output").innerHTML= c_temp;

    
    //Calculate the temperature here
    //Send the calculated temperature to HTML
}


