function XPFromLevel(currentLevel = 0) {
    let level = 0;
    let xp = 0;
    while (level < (currentLevel - 1)) {
        xp = xp + 45 * level * (Math.floor(level / 10) + 1);
        level++;
    }
    return xp;
}

function levelFromXP(currentXP = 0) {
    let level = 0;
    let xp = 0;

    while (true) {
        const nextXp = xp + 45 * level * (Math.floor(level / 10) + 1);
        if (nextXp > currentXP) {
            return level + 1;
        }
        xp = nextXp;
        level++;
    }
}

function calculate() {
    let currentXP = document.getElementById("currentXP").value;
    if (currentXP === "") currentXP = 0;
    let targetLevelXP = XPFromLevel(document.getElementById("targetLevel").value);
    if (currentXP !== "" && targetLevelXP !== 0) {
        let xpResult = Math.max((targetLevelXP - currentXP), 0);
        let minMessages = Math.ceil(xpResult / 11);
        let avgMessages = Math.ceil(xpResult / 5.5);
        document.getElementById("xpResult").innerHTML = xpResult.toString();
        document.getElementById("levelResult").innerHTML = document.getElementById("targetLevel").value.toString();
        document.getElementById("levelTotal").innerHTML = targetLevelXP.toString();
        document.getElementById("minMessages").innerHTML = minMessages.toString();
        document.getElementById("avgMessages").innerHTML = avgMessages.toString();
    } else if (targetLevelXP === 0) {
        document.getElementById("xpResult").innerHTML = "Less than 45";
        document.getElementById("levelResult").innerHTML = document.getElementById("targetLevel").value.toString();
        document.getElementById("levelTotal").innerHTML = "<45";
    }
}

function customXP() {
    level = document.getElementById("customLevel").value;
    if (level !== "") {
        xp = XPFromLevel(level);
        document.getElementById("customResult").innerHTML = "Level " + level + " is " + xp + " XP";
    }
}

function customLevel() {
    xp = document.getElementById("customXP").value;
    if (xp !== "") {
        level = levelFromXP(xp);
        document.getElementById("customResult").innerHTML = xp + " XP is level " + level;
    }
}

const luc = document.getElementById("levelUpBlock");
const lub = document.getElementById("levelUpButtons");
const cc = document.getElementById("customBlock");
const cb = document.getElementById("customButtons");
function switchmodes() {
    if (luc.classList.contains("hidden")) {
        luc.classList.remove("hidden");
        lub.classList.remove("hidden");
        cc.classList.add("hidden");
        cb.classList.add("hidden");
    } else {
        luc.classList.add("hidden");
        lub.classList.add("hidden");
        cc.classList.remove("hidden");
        cb.classList.remove("hidden");
    }
}

let inputs = document.querySelectorAll(".inputBlock input");
inputs.forEach(function(input) {
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            calculate();
        }
    });
});