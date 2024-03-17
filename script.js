function levelToXP(currentLevel = 0) {
    let level = 0;
    let xp = 0;
    while (level < currentLevel - 1) {
        xp += 45 * level * (Math.floor(level / 10) + 1);
        level++;
    }
    return xp;
}

function xpToLevel(currentXP = 0) {
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

$(document).ready(function() {
    $("#levelUpBlock input").keypress(function(event) {
        if (event.key === "Enter" || event.which === 13) {
            calculate();
        }
    });
    $("#customXP").keypress(function(event) {
        if (event.key === "Enter" || event.which === 13) {
            customXPToLevel();
        }
    });
    $("#customLevel").keypress(function(event) {
        if (event.key === "Enter" || event.which === 13) {
            customLevelToXP();
        }
    });
});

function calculate() {
    let currentXP = parseInt($("#currentXP").val()) || 0;
    let targetLevelXP = levelToXP(parseInt($("#targetLevel").val())) || 0;
    if (targetLevelXP !== 0) {
        let xpResult = Math.max(targetLevelXP - currentXP, 0);
        let minMessages = Math.ceil(xpResult / 11);
        let avgMessages = Math.ceil(minMessages / 2);
        $("#xpResult").text(`${xpResult} more`);
        $("#levelResult").text($("#targetLevel").val());
        $("#levelTotal").text(targetLevelXP);
        $("#minMessages").text(minMessages);
        $("#avgMessages").text(avgMessages);
    } else {
        $("#xpResult").text("Less than 45");
        $("#levelResult").text($("#targetLevel").val() || "0");
        $("#levelTotal").text("<45");
        $("#minMessages").text(0);
        $("#avgMessages").text(0);
    }
}

function customXPToLevel() {
    let xp = $("#customXP").val() || 0;
    let level = xpToLevel(xp);
    $("#customResult").text(`${xp} XP is level ${level}`);
}

function customLevelToXP() {
    let level = $("#customLevel").val() || 0;
    let xp = levelToXP(level);
    $("#customResult").text(`Level ${level} is ${xp} XP`);
}

function switchModes() {
    $("#levelUpBlock, #levelUpButtons").toggleClass("hidden");
    $("#customBlock, #customButtons").toggleClass("hidden");
}