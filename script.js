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

function calculate() {
    let currentXP = parseInt($("#currentXP").val()) || 0;
    let targetLevelXP = levelToXP(parseInt($("#targetLevel").val())) || 0;
    if (targetLevelXP !== 0) {
        let xpResult = Math.max(targetLevelXP - currentXP, 0);
        let minMessages = Math.ceil(xpResult / 11);
        $("#xpResult").text(`${xpResult} more`);
        $("#levelResult").text($("#targetLevel").val());
        $("#levelTotal").text(targetLevelXP);
        $("#minMessages").text(minMessages);
        $("#avgMessages").text(minMessages * 2);
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
    if (xp < 45) {
        $("#customResult").text("XP below 45 cannot be converted to level");
    } else {
        $("#customResult").text(`${xp} XP is level ${xpToLevel(xp)}`);
    }
}

function customLevelToXP() {
    let level = $("#customLevel").val() || 0;
    $("#customResult").text(`Level ${level} is ${levelToXP(level)} XP`);
}

var isMainBlock = true;
function switchModes() {
    isMainBlock = !isMainBlock;
    $("#xpResult, #levelResult, #levelTotal, #minMessages, #avgMessages").text(0);
    $("#currentXP, #targetLevel, #customXP, #customLevel").val("");
    $("#customResult").text("No results");
    $("#levelUpBlock, #levelUpButtons").toggleClass("hidden");
    $("#customBlock, #customButtons").toggleClass("hidden");
    if (isMainBlock) {
        $("#modeButton").text("Custom Mode");
    } else {
        $("#modeButton").text("Normal Mode");
    }
}

function toggleCredits() {
    $("#credits").toggleClass("hidden");
}