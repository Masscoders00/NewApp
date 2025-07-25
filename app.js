let key = "e9b8b3233545d502a15cfc629d3d2056";
let cardData = document.querySelector(".cardData");
let SearchBtn = document.getElementById("searchBtn");
let inputData = document.getElementById("inputData");
let searchType = document.getElementById("type");

const getData = async(input) =>{
    let res = await fetch(
    `https://gnews.io/api/v4/search?q=${input}&token=${key}&lang=en`);

    let jsonData = await res.json();
    console.log(jsonData.articles);

    searchType.innerText = "Search : " + input;
    inputData.value = "";
    cardData.innerHTML = "";

    jsonData.articles.forEach(function(article){
        console.log(article);
        
        let divs = document.createElement("div");
        divs.classList.add("card");
        cardData.appendChild(divs);

        divs.innerHTML = `
        <img src="${article.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="">
        <h3>${article.title}</h3>
        <p>${article.description}</p>
        `;

        divs.addEventListener("click", function(){
            window.open(article.url, "_blank");
        });
    });
}

window.addEventListener("load", function(){
    getData("India");
});

SearchBtn.addEventListener("click", function(){
    let inputText = inputData.value;
    if (inputText.trim() !== "") {
        getData(inputText);
    }
});

function navClick(navName){
    ["politics", "sports", "technology"].forEach(cat => {
        document.getElementById(cat).style.color = (cat === navName) ? "rgb(0, 140, 255)" : "white";
    });
    getData(navName);
}
