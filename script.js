if(document.URL.endsWith("?codegen")) {
    document.head.innerHTML = "";
    document.body.innerHTML = chargen(32);
}

const now = new Date();
if (now.getHours() === 7 && now.getMinutes() === 30) {
    window.location.href = "https://www.youtube.com/watch?v=G23pr_j_2QQ";
}

function chargen(length) { // string
    const characters = "0123456789ABCDEF";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function calculate() { // void
    let currentXP = parseInt($("#currentXP").val()) || 0;
    let targetLevelXP = levelToXP(parseInt($("#targetLevel").val())) || 0;
    if (targetLevelXP !== 0 && currentXP !== 0) {
        let xpResult = Math.max(targetLevelXP - currentXP, 0);
        let currentLevel = xpToLevel(currentXP);
        let nextRankLevel = getNextRankLevel(currentLevel);
        let nextRankTotalXP = levelToXP(nextRankLevel);
        let baseRankLevelXP = levelToXP(getBaseRankLevel(xpToLevel(currentXP)));
        let rankPercentage = ((currentXP - baseRankLevelXP) / (nextRankTotalXP - baseRankLevelXP)) * 100;
        $("#xpResult").text(`${xpResult} more`);
        $("#levelResult").text($("#targetLevel").val());
        $("#minMessages").text(Math.ceil(xpResult / 11));
        $("#avgMessages").text(Math.ceil(xpResult / 5.5));
        $("#progressBlob").css("background-color", getRoleColor(currentLevel));
        $("#memberRankName").text(getRoleName(nextRankLevel));
        if (Math.sign(nextRankTotalXP - currentXP) === -1) {
            $("#memberRankXPUntil").text(0);
            $("#memberRank").val(100);
            $("#memberRankPercentage").text(100);
        } else {
            $("#memberRankXPUntil").text(nextRankTotalXP - currentXP);
            $("#memberRank").val(Math.trunc(rankPercentage));
            $("#memberRankPercentage").text(rankPercentage.toFixed(2));
        }
        $("#progressBlobNote").text(getRoleNote(currentLevel));
    } else {
        $("#xpResult").text("< 45");
        $("#levelResult").text($("#targetLevel").val() || "0");
        $("#minMessages").text(0);
        $("#avgMessages").text(0);
    }
}

function customXPToLevel() { // void
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

function customLevelToXP() { // void
    let level = $("#customLevel").val() || 0;
    if (level < 3) {
        $("#customResult").text("Level below 3 cannot be converted to XP");
    } else {
        let xp = levelToXP(level);
        $("#customResult").html(`Level ${level} requires ${xp} XP total<br>${Math.ceil(xp / 11)} messages minimum (11 XP/msg)<br>${Math.ceil(xp / 5.5)} messages average (5.5 XP/msg)`);    
    }
}

function levelToXP(currentLevel = 0) { // int
    let level = 0;
    let xp = 0;
    while (level < currentLevel - 1) {
        xp += 45 * level * (Math.floor(level / 10) + 1);
        level++;
    }
    return xp;
}

function xpToLevel(currentXP = 0) { // int
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

const roleColors = {
    0: "#8795A9",
    15: "#A67BE6",
    30: "#C081D1",
    50: "#E69396",
    75: "#7B97CB",
    100: "#F9B856"
};

const roleNames = {
    0: "",
    15: "Plus",
    30: "Pro",
    50: "Edition",
    75: "One",
    100: "Ultra"
};

const roleNotes = {
    0: "🤓",
    15: "+",
    30: "O",
    50: "✨",
    75: "1",
    100: "⚡"
};

function getRoleColor(level) { // string
    if (level < 0) {
        return roleColors[0];
    } else if (level > 100) {
        return roleColors[100];
    } else if (roleColors.hasOwnProperty(level)) {
        return roleColors[level];
    }

    let lastKey = 0;
    for (const key in roleColors) {
        if (level >= parseInt(key)) {
            lastKey = parseInt(key);
        } else {
            break;
        }
    }
    return roleColors[lastKey];
}

function getRoleNote(level) { // string
    if (level < 0) {
        return roleNotes[0];
    } else if (level > 100) {
        return roleNotes[100];
    } else if (roleNotes.hasOwnProperty(level)) {
        return roleNotes[level];
    }

    let lastKey = 0;
    for (const key in roleNotes) {
        if (level >= parseInt(key)) {
            lastKey = parseInt(key);
        } else {
            break;
        }
    }
    return roleNotes[lastKey];
}

function getRoleName(level) { // string
    if (level <= 0) {
        return roleNames[0];
    } else if (level >= 100) {
        return roleNames[100];
    } else if (roleNames.hasOwnProperty(level)) {
        return roleNames[level];
    }

    let lastKey = 0;
    for (const key in roleNames) {
        if (level >= parseInt(key)) {
            lastKey = parseInt(key);
        } else {
            break;
        }
    }
    return roleNames[lastKey];
}

function getNextRankLevel(level) { // int
    if (level <= 0) {
        return 15;
    } else if (level >= 100) {
        return 100;
    }

    let nextKey = 0;
    for (const key in roleColors) {
        if (parseInt(key) > level) {
            nextKey = parseInt(key);
            break;
        }
    }
    return nextKey;
}

function getBaseRankLevel(level) { // int
    if (level <= 0) {
        return 0;
    } else if (level >= 100) {
        return 100;
    }

    let baseLevel = 0;
    for (const key in roleColors) {
        if (parseInt(key) <= level) {
            baseLevel = parseInt(key);
        } else {
            break;
        }
    }
    return baseLevel;
}

$(document).ready(function() { // void
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
function switchModes() { // void
    isMainBlock = !isMainBlock;
    $("#xpResult, #levelResult, #minMessages, #avgMessages, #memberRankPercentage").text(0);
    $("#currentXP, #targetLevel, #customXP, #customLevel").val("");
    $("#customResult").text("No results");
    $("#memberRankName").text("Plus");
    $("#memberRankXPUntil").text(levelToXP(15));
    $("#memberRank").val(0);
    $("#progressBlobNote").text(getRoleNote(0));
    $("#progressBlob").css("background-color", getRoleColor(0));
    $("#levelUpBlock, #levelUpButtons, #customBlock, #customButtons").toggleClass("hidden");
    if (isMainBlock) {
        $("#page > .hrText sup").text("Linear Mode");
    } else {
        $("#page > .hrText sup").text("Custom Mode");
    }
}

function toggleCredits() { // void
    $("#credits").toggleClass("hidden");
}
