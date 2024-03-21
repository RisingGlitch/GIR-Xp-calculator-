function calculate() {
    let currentXP = parseInt($("#currentXP").val()) || 0;
    let targetLevelXP = levelToXP(parseInt($("#targetLevel").val())) || 0;
    if (targetLevelXP !== 0 && currentXP !== 0) {
        let xpResult = Math.max(targetLevelXP - currentXP, 0);
        let minMessages = Math.ceil(xpResult / 11);
        $("#xpResult").text(`${xpResult} more`);
        $("#levelResult").text($("#targetLevel").val());
        $("#levelTotal").text(targetLevelXP);
        $("#minMessages").text(minMessages);
        $("#avgMessages").text(minMessages * 2);
    } else {
        $("#xpResult").text("< 45");
        $("#levelResult").text($("#targetLevel").val() || "0");
        $("#levelTotal").text("< 45");
        $("#minMessages").text(0);
        $("#avgMessages").text(0);
    }
}

function customXPToLevel() {
    let xp = $("#customXP").val() || 0;
    if (xp < 45) {
        $("#customResult").text("XP below 45 cannot be converted to level");
    } else {
        let level = xpToLevel(xp);
        let currentLevelBaseXP = levelToXP(level);
        let nextLevelBaseXP = levelToXP(level + 1);
        $("#customResult").html(`${xp} XP translates to level ${xpToLevel(xp)}<br>${nextLevelBaseXP - xp} more XP needed for level ${level + 1}<br>From level ${level} to ${level + 1}, you're ${(((xp - currentLevelBaseXP) / (nextLevelBaseXP - currentLevelBaseXP)) * 100).toFixed(2)}% there`);
    }
}

function customLevelToXP() {
    let level = $("#customLevel").val() || 0;
    if (level < 3) {
        $("#customResult").text("Level below 3 cannot be converted to XP");
    } else {
        let xp = levelToXP(level);
        let minMessages = Math.ceil(xp / 11);
        $("#customResult").html(`Level ${level} requires ${xp} XP total<br>${minMessages} messages minimum (11 XP/msg)<br>${minMessages * 2} messages average (5.5 XP/msg)`);    
    }
}

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
        const nextXP = xp + 45 * level * (Math.floor(level / 10) + 1);
        if (nextXP > currentXP) {
            return level + 1;
        }
        xp = nextXP;
        level++;
    }
}

$(document).ready(function() {
    $("#levelUpBlock input, #customXP, #customLevel").keypress(function(event) {
        if (event.key === "Enter" || event.which === 13) {
            var id = $(this).attr("id");
            switch(id) {
                case "currentXP":
                case "targetLevel":
                    calculate();
                    break;
                case "customXP":
                    customXPToLevel();
                    break;
                case "customLevel":
                    customLevelToXP();
                    break;
            }
        }
    });
});

var isMainBlock = true;
function switchModes() {
    isMainBlock = !isMainBlock;
    $("#xpResult, #levelResult, #levelTotal, #minMessages, #avgMessages").text(0);
    $("#currentXP, #targetLevel, #customXP, #customLevel").val("");
    $("#customResult").text("No results");
    $("#levelUpBlock, #levelUpButtons, #customBlock, #customButtons").toggleClass("hidden");
    if (isMainBlock) {
        $("#page sup").text("Stretch Mode");
    } else {
        $("#page sup").text("Custom Mode");
    }
}

function toggleCredits() {
    $("#credits").toggleClass("hidden");
}