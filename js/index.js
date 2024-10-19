/// <reference types="../@types/jquery" />

let show_navTab = 0;


let navTab = document.querySelector('.nav-tab')


$('.open-close-btn').on('click',function(){
    console.log('this',this)
    console.log('show_navTab ',show_navTab)
    if (show_navTab==0){
        let hasclass_dnone = $('.nav-tab').hasClass('d-none')
        console.log('hasclass_dnone',hasclass_dnone)
        if (hasclass_dnone){

            let classJustify = $('.nav-header .open-close-btn .icon').hasClass('fa-align-justify')
            console.log('classJustify is ',classJustify)

            $('.nav-header .open-close-btn .icon').removeClass('fa-align-justify')
            $('.nav-header .open-close-btn .icon').addClass('fa-x')
            $('.nav-tab').removeClass('d-none')
            $('.nav-tab').addClass('d-block')

            show_navTab=1
        }
        console.log('nav-header .open-close-btn i',$('.nav-header .open-close-btn i'))
       
    }
    else{
        console.log('show_navTab222 ',show_navTab)
        console.log('nav-tab222',$('.nav-tab'))
        let hasclass_dblock = $('.nav-tab').hasClass('d-block')
        console.log('hasclass_dnohasclass_dblockne',hasclass_dblock)
        if (hasclass_dblock){
            let classfax = $('.nav-header .open-close-btn .icon').hasClass('fa-x')
            console.log('classfax is ',classfax)

            $('.nav-header .open-close-btn .icon').removeClass('fa-x')
            $('.nav-header .open-close-btn .icon').addClass('fa-align-justify')
            $('.nav-tab').removeClass('d-block')
            $('.nav-tab').addClass('d-none')

            show_navTab=0
        }
    } 

})
// =========

// ======== api======

async function getMealDetails(item=''){
    console.log('in getMealDetails - item ',item)
    try{
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`)
        loadingSreen()
        let mealData = await response.json();
        console.log('data of mealById',mealData);
        let data = mealData.meals;
        // console.log('mealData.meals',mealData.meals);
        // // let mealData = await response.json();
        // // let data = mealData.categories;
        displayMealDetails(data)
    }
    catch (error){
        console.log('eeeeeerrrror in getMealDetails  ',error);
    }
}

function loadingSreen(){
    $('.loading-screen').fadeIn(500,function(){
        $('.sk-chase').fadeIn(500)
        
    })
}

function hideScreen(){
    $('.sk-chase').fadeOut(1000,function(){
        $('.loading-screen').slideUp(1000,function(){
            
        })
    })
}
async function getMeal(searchBy='',item=''){
    console.log('in getMeal - searchBy ',searchBy,'item',item)
    

    try{
        if (searchBy=='name'){
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`)
            loadingSreen()
            let mealData = await response.json();
            let data = mealData.meals;
            console.log('mealData.meals',mealData.meals);
            console.log('mealData.meals.strMeal',mealData.meals[0].strMeal)
            console.log('mealData.meals.strMealThumb',mealData.meals[0].strMealThumb)
            
            
            displayMeal(searchBy,data)
        }
        else if (searchBy=='firstletter'){
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${item}`)
            let mealData = await response.json();
            let data = mealData.meals;
            console.log('mealData.meals',mealData.meals);
            console.log('mealData.meals.strMeal',mealData.meals[0].strMeal)
            console.log('mealData.meals.strMealThumb',mealData.meals[0].strMealThumb)
            displayMeal(searchBy,data)
        }
        else if (searchBy=='bycategory'){
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
            let mealData = await response.json();
            let data = mealData.categories;
            displayMeal(searchBy,data)
        }
        else if (searchBy='MealCategory'){
            console.log('in case search by MealCategory = item is  ',item)
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`)
            let mealData = await response.json();
            let data = mealData.meals;
            console.log('mealData.meals case MealCategory',mealData.meals);
            displayMeal(searchBy,data)
        }
      }

  
    catch (error){
        console.log('eeeeeerrrror is ',error);
    }
}


function getMealsOfCategory(MealCategory){
    console.log('in getMealsOfCategory testttttt- categoryName',MealCategory)
    getMeal(searchBy='MealCategory',item=MealCategory)
}
function displayMealDetails(meal){
    console.log('in displayMealDetails meal is ',meal)
    hideScreen()
    let cartona=``
    for(let i=0;i<meal.length;i++){

        let strTags =  `${meal[i].strTags}`
        console.log('strTags',strTags)
        let sarray = strTags.split(',')
        console.log('sarray',sarray)
        cartona+=`<div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal[i].strMealThumb}" alt="">
        <h2>${meal[i].strMeal}</h2> 
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal[i].strInstructions}
        </p>
        <h3>
            <span class="fw-bolder">Area:</span>
            ${meal[i].strArea}
        </h3>
        <h3>
            <span class="fw-bolder">Category:</span>
            ${meal[i].strCategory}
        </h3>
        <h3>Recipes :</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap ">
             <li class="alert alert-info m-2 p-1">${meal[i].strMeasure1}</li> 
             <li class="alert alert-info m-2 p-1">${meal[i].strMeasure2}</li> 
             <li class="alert alert-info m-2 p-1">${meal[i].strMeasure3}</li> 
             <li class="alert alert-info m-2 p-1">${meal[i].strMeasure4}</li> 
             <li class="alert alert-info m-2 p-1">${meal[i].strMeasure5}</li> 
             <li class="alert alert-info m-2 p-1">${meal[i].strMeasure6}</li> 
           
        </ul>
        <h3>Tags: </h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
        <li class="alert alert-info m-2 p-1">${sarray[i]}</li>
        <li class="alert alert-info m-2 p-1">${sarray[i+1]}</li>
        
        </ul>
        <a class="btn btn-success" target="_blank" href="${meal[i].strSource}">Source</a>
        <a class="btn btn-danger" target="_blank" href="${meal[i].strYoutube}">Youtube</a>
    </div>

`  

    }
        
    

      document.querySelector('#rowData').innerHTML=cartona;


    }
    


function displayMeal(searchBy,meals){
    console.log('in displayMeal searcBy is: searchBy',searchBy)
    console.log('in displayMeal meals is: meals',meals)
    // $('.sk-chase').fadeOut(1000,function(){
    //     $('.loading-screen').slideUp(1000,function(){
            
    //     })
    // })
    hideScreen()
    let cartona = ``;
        if(searchBy=='name' ){
            console.log('case nameeeee - searchBy is:',searchBy)
            for(let i=0;i<meals.length;i++){
            cartona+=`
                <div class="col-md-3" id="${meals[i].idMeal}" onclick="getMealDetails('${meals[i].idMeal}')">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src=${meals[i].strMealThumb} alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
                </div>

            `
            }
        }
       
        else if(searchBy=='firstletter' ){
            console.log('case firstletterrrr - searchBy is:',searchBy)
            for(let i=0;i<meals.length;i++){
            cartona+=`
                <div class="col-md-3" id="${meals[i].idMeal}" onclick="getMealDetails('${meals[i].idMeal}')">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src=${meals[i].strMealThumb} alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
                </div>

            `
            }
        }
       
        else if(searchBy=='bycategory' ){
            
            for(let i=0;i<meals.length;i++){
                MealCategory = `${meals[i].strCategory}`
                console.log('categoryname testttt',MealCategory)
                cartona+=`
                <div class="col-md-3" >
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer"  onclick="getMealsOfCategory('${meals[i].strCategory}')">
                    <img class="w-100" src=${meals[i].strCategoryThumb} alt="">
                    <div class="meal-layer position-absolute text-center text-black p-2" >
                        <h3>${meals[i].strCategory}</h3>
                        <p>${meals[i].strCategoryDescription}</p>
                    </div>
                </div>
                </div>

            `
            }
        }
        
        else if(searchBy=='MealCategory' ){
            console.log('case MealCategory - searchBy is:',searchBy)
            
            for(let i=0;i<meals.length;i++){
                // console.log('case MealCategory - meals i isssssssss:',meals[i])
                cartona+=`
                <div class="col-md-3" id="${meals[i].idMeal}" onclick="getMealDetails('${meals[i].idMeal}')">
                
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src=${meals[i].strMealThumb} alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
                </div>

            `
            }
        }
        else if(searchBy=='area' ){
            console.log('case areaaaa - searchBy is:',searchBy)
            for(let i=0;i<meals.length;i++){
            cartona+=`
                <div class="col-md-3" id="${meals[i].idMeal}" onclick="getMealDetails('${meals[i].idMeal}')">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src=${meals[i].strMealThumb} alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
                </div>

            `
            }
        }
        else if(searchBy=='ingredients' ){
            console.log('case ingredients - searchBy is:',searchBy)
            for(let i=0;i<meals.length;i++){
            cartona+=`
                <div class="col-md-3" id="${meals[i].idMeal}" onclick="getMealDetails('${meals[i].idMeal}')">
                <div class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src=${meals[i].strMealThumb} alt="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meals[i].strMeal}</h3>
                    </div>
                </div>
                </div>

            `
            }
        }
    
    document.querySelector('#rowData').innerHTML=cartona;

}
// =========
function closeSideNav(){
    $('.nav-header .open-close-btn .icon').removeClass('fa-x')
    $('.nav-header .open-close-btn .icon').addClass('fa-align-justify')
    $('.nav-tab').removeClass('d-block')
    $('.nav-tab').addClass('d-none')

    show_navTab=0

}

function showSearchInputs(){
    console.log('in showSearchInputssssss');
    // $('#rowData').hide();
    $('#searchContainer').removeClass('d-none');
    $('#searchContainer').addClass('d-block');

    let searchByNameInput = document.querySelector('#searchContainer #searchByName ');
    let searchByFLetterInput = document.querySelector('#searchContainer #searchByFLetter');
    console.log('searchByNameInput ',searchByNameInput)
    console.log('searchByFLetterInput ',searchByNameInput)
    if (searchByNameInput && searchByFLetterInput) {
        $('#searchContainer #searchByName').on('input',function(){
            let mealName = $('#searchContainer #searchByName').val();
            console.log('meal name :',mealName)
            getMeal('name',mealName)
        })
        $('#searchContainer #searchByFLetter').on('input',function(){
            let fletter = $('#searchContainer #searchByFLetter').val();
            console.log('fletter :',fletter)
            getMeal('firstletter',fletter)
        })
    }
    


}


function getCategories(){
    console.log('in getCategories');
    // $('#rowData').hide();
    getMeal('bycategory','category')
    


}

async function getArea(){
    console.log('in getArea');
    try{
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
            loadingSreen()

            let mealData = await response.json();
            let data = mealData.meals;
            console.log('in getArea data',data);
            displayAreas(data)
    }
    catch (error){
        console.log('eeeeeerrrror in getMealDetails  ',error);
    }
}

function displayAreas (data){
    hideScreen()
    let cartona = ``
    for (let i=0;i<data.length;i++){
        cartona+=`
        <div class="col-md-3">
            <div class="area rounded-2 text-center cursor-pointer" onclick="getAreaMeals('${data[i].strArea}')">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${data[i].strArea}</h3>
            </div>
        </div>    
        `
    }
    document.querySelector('#rowData').innerHTML=cartona;
}


function getMealByArea(searchBy='',item=''){
    console.log('in getMealByArea - searchBy ',searchBy,'item',item)

}
async function getAreaMeals(area){
    console.log('in getAreaMeals area is ',area)
    getMealByArea(searchBy='area',item=area)
    if (searchBy=='area'){
        console.log('in get meal case search by area')
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${item}`)
        loadingSreen()
        let mealData = await response.json();
        let data = mealData.meals;
        console.log('areaaaaa.meals',mealData.meals);
        displayMeal('area',data)

    }
}

function displayIngredients (data){
    console.log('in displayIngredients - data ',data)
    hideScreen()
    let cartona = ``
    for (let i=0;i<data.length;i++){
        cartona+=`
        <div class="col-md-3">
            <div class="area rounded-2 text-center cursor-pointer" onclick="getIngredientsMeals('${data[i].strIngredient}')">
            
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${data[i].strIngredient}</h3>
                <p>${data[i].strDescription}</p>
            </div>
        </div>    
        `
    }
    document.querySelector('#rowData').innerHTML=cartona;
}
async function getIngredientsMeals(ingredients){
    console.log('in getIngredientsMeals tttttttt ingredients is ',ingredients)
    // getMealByArea(searchBy='ingredients',item=area)
    
    console.log('in get meal case search by ingredients')
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    loadingSreen()
    let mealData = await response.json();
    let data = mealData.meals;
    console.log('ingredients.meals tttttttttttttestttt',mealData.meals);
    displayMeal('ingredients',data)

    
}


async function getIngredients(){
    console.log('in getIngredients');
    try{
            let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
            loadingSreen()
            let mealData = await response.json();
            let data = mealData.meals;
            console.log('in getIngredients data',data);
            displayIngredients(data)
    }
    catch (error){
        console.log('eeeeeerrrror in getMealDetails  ',error);
    }
}


function showContacts(){
    hideScreen()
    console.log('in showContacts')
    let cartona =`
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
        <div class="container w-75 text-center">
            <div class="row g-4">
                <div class="col-md-6">
                    <input id="nameInput" type="text"  class="form-control" onkeyup="inputsValidation(this)" placeholder="Enter Your Name">
                        <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                             Special characters and numbers not allowed
                        </div>
                </div>

                <div class="col-md-6">
                    <input id="emailInput" type="email"   class="form-control" onkeyup="inputsValidation(this)" placeholder="Enter Your Email">
                        <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                             Email not valid *exemple@yyy.zzz                
                        </div>
                </div>
                <div class="col-md-6">
                    <input id="phoneInput" type="number"  class="form-control" onkeyup="inputsValidation(this)" placeholder="Enter Your Phone">
                        <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                             Enter valid Phone Number                
                        </div>
                </div>
                 <div class="col-md-6">
                    <input id="ageInput" type="number" class="form-control" onkeyup="inputsValidation(this)" placeholder="Enter Your Age">
                        <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                             Enter valid age                
                        </div>
                </div>
                 <div class="col-md-6">
                    <input id="passwordInput" type="password" class="form-control" onkeyup="inputsValidation(this)" placeholder="Enter Your Password">
                        <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                             Enter valid password *Minimum eight characters, at least one letter and one number:*              
                        </div>
                </div>
                <div class="col-md-6">
                    <input id="repasswordInput" type="password" class="form-control" onkeyup="inputsValidation(this)" placeholder="RePassword">
                        <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                             Enter valid repassword             
                        </div>
                </div>

            </div>
            <button id="submitBtn" class="btn btn-outline-danger px-2 mt-3 disabled" >Submit</button>

        </div>
    </div>
    `

    document.querySelector('#rowData').innerHTML=cartona;


}

function inputsValidation(term){
console.log('in inputsValidation this is',term)
console.log('term val is ',term.value)
console.log('term id is ',term.id)
let btnsubmit= document.getElementById('submitBtn')
console.log('submit button is ',btnsubmit)
var regex = {
    nameInput: /^[a-zA-Z ]{2,30}$/,   
    emailInput:/^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
    phoneInput:/^[\s()+-]*([0-9][\s()+-]*){6,15}$/,
    ageInput:/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
    passwordInput:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
    repasswordInput:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
}
if (regex[term.id].test(term.value)){
    term.classList.add('is-valid');
    term.classList.remove('is-invalid');
    term.nextElementSibling.classList.replace('d-block','d-none');
    
    btnsubmit.classList.remove('disabled')
    // btnsubmit.classList.replace('disabled','');
}
else{
    term.classList.add('is-invalid');
    term.classList.remove('is-valid');
    term.nextElementSibling.classList.replace('d-none','d-block');
    // btnsubmit.classList.add('disabled')
    btnsubmit.classList.add('disabled');
}

}

// ==================== looading ======
$(function(){
    $('.sk-chase').fadeOut(1000,function(){
        $('.loading-screen').slideUp(1000,function(){
            
        })
    })
})