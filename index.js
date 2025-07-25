let key = "e9b8b3233545d502a15cfc629d3d2056";

let dataCard = document.querySelector(".dataCard");
let search = document.getElementById("searchBtn");
let inputDatas = document.getElementById("inputData");

let category = document.getElementById("type");

let myFun = async (input) => {
  let res = await fetch(
    `https://gnews.io/api/v4/search?q=${input}&token=${key}&lang=en`
  );

  let jsonData = await res.json(); // FIXED
  console.log(jsonData);

  category.innerHTML = "Search : " + input;
  dataCard.innerHTML = "";
  inputDatas.value = "";

  if (!jsonData.articles || jsonData.articles.length === 0) {
    dataCard.innerHTML = "<p>No articles found.</p>";
    return;
  }

  jsonData.articles.forEach((curVal) => {
    console.log(curVal);

    let divs = document.createElement("div");
    divs.classList.add("cards");
    dataCard.appendChild(divs);

    divs.innerHTML = `
        <img src="${curVal.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="">
        <h3>${curVal.title}</h3>
        <p>${curVal.description}</p>
    `;

    divs.addEventListener("click", function () {
      window.open(curVal.url, "_blank");
    });
  });
};

window.addEventListener("load", () => {
  myFun("India");
});

search.addEventListener("click", getData);

function getData() {
  let inputVal = inputDatas.value;
  if (inputVal.trim() === "") {
    alert("Please Search");
  } else {
    myFun(inputVal);
  }
}

function navItem(navValue) {
  const tabs = ["politics", "sports", "technology"];
  tabs.forEach((tab) => {
    document.getElementById(tab).classList.remove("active");
  });
  document.getElementById(navValue).classList.add("active");

  myFun(navValue);
}
