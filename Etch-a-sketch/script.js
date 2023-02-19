var pixelCount = 16;
size = "32px"
let cadre = document.getElementById("cadre");
let black = "#d08159";
let white = "#ffecd6";
let color = black;
let mode = "draw";
let cadreSize = cadre.offsetWidth;


function gridGeneration(){
    cadreSize = cadre.offsetWidth;
    let gridText = document.getElementById("grid-value");
    var pixel = document.querySelectorAll(".pixel");
    pixel.forEach(element => {
        element.remove();
    });
    let size;
    let value = parseInt(slider.value);
    switch (value){
        case 1:
        pixelCount = 8;
        size = cadreSize/8;
        size = size + "px";
        console.log(size);
        break;

        case 2:
        pixelCount = 16;
        size = cadreSize/16;
        size = size + "px";
        break;

        case 3:
        pixelCount = 32;
        size = cadreSize/32;
        size = size + "px";
        break;
    }
    generationPixel(pixelCount, size);
    pixel = document.querySelectorAll(".pixel");
    gridText.innerHTML = pixelCount + " x " + pixelCount;
}

var pixel = document.querySelectorAll(".pixel");
const slider = document.getElementById("sliderGrid");
slider.addEventListener("click", function(){
    gridGeneration();
});

gridGeneration();

window.addEventListener("resize", function(){
    let cadreResize = cadre.offsetWidth;
    if (cadreSize != cadreResize){
        gridGeneration();     
    }
});

function generationPixel(pixelCount, size){
    for (i = 0; i < pixelCount*pixelCount; i++){
        const pixel = document.createElement("div");
        pixel.classList.add("pixel");

        pixel.style.width = size;
        pixel.style.height = size;
        pixel.style.backgroundColor = white;
        pixel.style.zIndex = 1;
        cadre.appendChild(pixel);
    }
    pixel = document.querySelectorAll(".pixel");
    cadre.addEventListener("mousedown", selectionPixel(pixel));
}


const draw = document.getElementById("button-draw");
const erase = document.getElementById("button-erase");
const clean = document.getElementById("button-clean");
const randomised = document.getElementById("button-randomised");

function deleteClass(butme){
    for (i = 0; i < arrayButton.length; i++){
        if (arrayButton[i] != butme){
            arrayButton[i].classList.remove("toggled");
        }
    }
}

draw.addEventListener("click",function(){
    mode = "draw";
    draw.classList.add("toggled");
    deleteClass(draw);
});
erase.addEventListener("click",function(){
    mode = "erase";
    color = white;
    erase.classList.add("toggled");
    deleteClass(erase);
});

clean.addEventListener("click",function(){
    Clean(pixel);
});
randomised.addEventListener("click",function(){
    mode = "randomised";
    randomised.classList.add("toggled");
    deleteClass(randomised);
});

let arrayButton = [ draw, erase, clean, randomised ];



function Dessin(element){
    if (mode == "draw"){
        color = black;
    }
    if (mode == "erase"){
        color = white;
    }
    if (mode == "randomised"){
        color = RandomColor();
    }
    if (element.style.backgroundColor = white){
        element.style.backgroundColor = color;
    }
}

function Clean(pixel){
    pixel.forEach(element => {
        if (element.style.backgroundColor != white){
            element.style.backgroundColor = white;
        }
    });  
}

function RandomColor(){
    let rdm = Math.floor(Math.random() * 6);
    switch (rdm){
        case 0:
            return "#0d2b45";
        case 1:
            return "#203c56";        
        case 2:
            return  "#544e68";       

        case 3:
            return "#8d697a";

        case 4:
            return  "#d08159";    

        case 5:
            return "#ffaa5e";

        case 6:
            return  "#ffd4a3";
    }
}

function selectionPixel(pixel){
    pixel.forEach(element => {
            element.addEventListener("mouseover", function(e){
                if (e.buttons == 1 || e.buttons == 3){
                    Dessin(element);
                }
            });
            element.addEventListener("mouseup", function(){
                Dessin(element);
            });
    })
}