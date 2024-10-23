//get total
let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let catogery=document.getElementById('catogery');
let create=document.getElementById('submit');
let mood='create';
let tmp;


function getTotal(){
if(price.value!=''){
    let result=(+price.value+ +taxes.value+ +ads.value) - +discount.value;
    total.innerHTML=result;
    total.style.background='#040'
}
else{
    total.innerHTML='';
    total.style.background='#a00d02'
}
}





//create product
let data;
if(localStorage.product != null){
    data=JSON.parse(localStorage.product);
}
else{
    data=[];
}

create.onclick=function(){
    let newpro ={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        catogery:catogery.value.toLowerCase(),
    }
    if(title.value!=''&&price.value!=''&&catogery.value!=''&&newpro.count<=99){
    if(mood=== 'create'){
    if(newpro.count >1){
        for(let i = 0;i<newpro.count;i++){
            data.push(newpro)
        }
    }
    else{
        data.push(newpro)
    }
}
else{
    data[tmp]=newpro

    mood='create';
    create.innerHTML='create';
    count.style.display='block';

}
clear();
    }
    localStorage.setItem('product',JSON.stringify(data));
   
    show();
   // console.log(nerpro)
}
//save data local storage





//clear inputs
function clear(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    count.value='';
    catogery.value='';
    total.innerHTML='';
}










//read data

function show(){
    getTotal();
    let table = '';
    for(let i=0;i<data.length;i++){
        table+=`
        <tr>
        <td>${i}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].catogery}</td>
        <td><button id="update" onclick="update(${i})">update</button></td>
        <td><button id="delete" onclick="deleteElement(${i})">delete</button></td>
    </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    let btndelete=document.getElementById('deleteAll');
    if(data.length > 0){
        btndelete.innerHTML=` <button onclick="deleteall()"> delete all(${data.length}) </button> `;
    }
    else{
        btndelete.innerHTML='';
    }

}
show();



//delete

function deleteElement(i){
    data.splice(i,1);
    localStorage.product=JSON.stringify(data);
    show();
}


function deleteall(){
    localStorage.clear();
    data.splice(0);
    show();
}


function update(i){
    title.value=data[i].title;
    price.value=data[i].price;
    taxes.value=data[i].taxes;
    ads.value=data[i].ads;
    discount.value=data[i].discount;
   // total.innerHTML=data[i].total;
   getTotal();
    catogery.value=data[i].catogery;
    count.style.display='none';
    create.innerHTML='update';
    mood='update';
    tmp=i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}

let searchMood='title';

function getsearchMood(id){
    let searchvar=document.getElementById('searchvar');
    if(id == 'searchtitle'){
        searchMood='title';
      
    }
    else{
        searchMood='catogery';
       
    }
    searchvar.Placeholder='search by ' + searchMood;
    searchvar.focus();
    searchvar.value='';
    show();
}



function search(value){
    let table=[];
    
    if (searchMood == 'title') {
        for (let i = 0; i < data.length; i++) {
            if (data[i].title.includes(value.toLowerCase())) {
                table += `
            <tr>
            <td>${i}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].catogery}</td>
            <td><button id="update" onclick="update(${i})">update</button></td>
            <td><button id="delete" onclick="deleteElement(${i})">delete</button></td>
        </tr>
            `
            }
        }
    }
  else{
        for (let i = 0; i < data.length; i++) {
            if (data[i].catogery.includes(value.toLowerCase())) {
                table += `
            <tr>
            <td>${i}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].catogery}</td>
            <td><button id="update" onclick="update(${i})">update</button></td>
            <td><button id="delete" onclick="deleteElement(${i})">delete</button></td>
        </tr>
            `
            }
    

        }
  }
  document.getElementById('tbody').innerHTML=table;
 
}















//update
//search
//clean data