const apikey = "44e357eb41264927a415614ccedb4ceb";
const url = "https://newsapi.org/v2/everything?q=";

const inputbox=document.querySelector(".searchinput");
const btnsearch=document.querySelector(".searchbutton");
const logo=document.querySelector(".nav-left");
window.addEventListener("load", () => {
    
    fetchnews("maharashtra");
})

logo.addEventListener("click",()=>{
    window.location.reload();
})


async function fetchnews(topic) {
    const element = await fetch(`${url}${topic}&apikey=${apikey}`);
    const data = await element.json();
    console.log(data);
    bindup(data.articles);
}

function bindup(articales) {
    const cardscontainer = document.querySelector(".container");
    const newscardtemplate = document.querySelector(".template-card");
    cardscontainer.innerHTML = '';
    articales.forEach(artical => {
        if (!artical.urlToImage) return;

        const cardclone = newscardtemplate.content.cloneNode(true);
        fillcarddata(cardclone, artical);
        cardscontainer.appendChild(cardclone);
        
    });
}

function fillcarddata(card, data) {
    const newsimg = card.querySelector(".card-image");
    const newsheading = card.querySelector(".card-heading");
    const newssource = card.querySelector(".card-source");
    const newsdesc = card.querySelector(".news-desc");
    const date=new Date(data.publishedAt).toLocaleString("en-US");

    newsimg.src = data.urlToImage;
    newsheading.innerHTML = data.title;
    newssource.innerHTML = `${data.source.name} ${date}`;
    newsdesc.innerHTML = data.description;

    card.firstElementChild.addEventListener("click",()=>{
        const newsurl=data.url;
        window.open(newsurl,"_blank");
    })

}
let currentselectednav=null;
function onmenuclick(search){
    fetchnews(search);
    const navitem=document.getElementById(search);
    currentselectednav?.classList.remove('active');
    currentselectednav=navitem;
    currentselectednav.classList.add('active');

}

btnsearch.addEventListener("click",()=>{
    const query=inputbox.value;
    if(!query) return;
    currentselectednav?.classList.remove('active');
    fetchnews(query);  
    
})



//responsive bar

let navbar=document.querySelector(".nav");
let navcenter=document.querySelector(".nav-center");
let navright=document.querySelector(".nav-right");
let navleft=document.querySelector(".nav-left");
let burger=document.querySelector(".burger");

burger.addEventListener("click",()=>{
    navbar.classList.toggle("respo-height");
    navcenter.classList.toggle("respo-hidden");
    navleft.classList.toggle("respo-hidden");
    navright.classList.toggle("respo-hidden");

})



