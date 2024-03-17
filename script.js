function calculate() {
    let xpResult = getLevel(document.getElementById("targetLevel").value) - getLevel(document.getElementById("currentLevel").value);
    let maxMessages = Math.ceil(xpResult / 11);
    let avgMessages = Math.ceil(xpResult / 5.5);
    document.getElementById("xpResult").innerHTML = xpResult.toString();
    document.getElementById("maxMessages").innerHTML = maxMessages.toString();
    document.getElementById("avgMessages").innerHTML = avgMessages.toString();
}

function getLevel(currentXp = 0) {
    let level = 0;
    let xp = 0;
    while (level < (currentXp - 1)) {
        xp = xp + 45 * level * (Math.floor(level / 10)+1);
        level++;
    }
    return xp;
}