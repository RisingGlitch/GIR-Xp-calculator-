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
    let xpResult = Math.max((XPFromLevel(document.getElementById("targetLevel").value) - currentXP), 0);
    let minMessages = Math.ceil(xpResult / 11);
    let avgMessages = Math.ceil(xpResult / 5.5);
    document.getElementById("xpResult").innerHTML = xpResult.toString();
    document.getElementById("minMessages").innerHTML = minMessages.toString();
    document.getElementById("avgMessages").innerHTML = avgMessages.toString();
}

let inputs = document.querySelectorAll(".inputBlock input")
inputs.forEach(function(input) {
    input.addEventListener("keypress", function(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            calculate();
        }
    });
});