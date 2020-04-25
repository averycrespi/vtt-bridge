console.log("Loaded dmv.js");
document.body.style.border = "5px solid red";

const interval = setInterval(() => {
  if (document.getElementsByClassName("character-name").length > 0) {
    clearInterval(interval);
    onLoad();
  }
}, 100);

const onLoad = () => {
  hookAbilityScores();
  hookSkills();
};

const onClick = (payload) => alert(JSON.stringify(payload));

const hookAbilityScores = () => {
  const root = document.querySelector(".ability-scores");
  for (const child of root.children) {
    const name = child.querySelector("span").innerText;
    const score = child.querySelector(".ability-score").innerText;
    const modifier = child.querySelector(".ability-score-modifier").innerText;
    child.addEventListener("click", function () {
      onClick({ name, score, modifier });
    });
  }
  console.log("Hooked ability scores");
};

const hookSkills = () => {
  const root = document.querySelector(".skills");
  const rows = root.querySelectorAll("tr");
  for (const row of rows) {
    const name = row.querySelector("span").innerText;
    const bonus = row.querySelector(".skillbonus").innerText;
    row.addEventListener("click", function () {
      onClick({ name, bonus });
    });
  }
  console.log("Hooked skills");
};
