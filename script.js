function calculate() { // void
    let currentUwUs = parseInt($("#currentUwUs").val()) || 0;
    let targetLevelUwUs = levelToUwUs(parseInt($("#targetLevel").val())) || 0;
    if (targetLevelUwUs !== 0 && currentUwUs !== 0) {
        let UwUsResult = Math.max(targetLevelUwUs - currentUwUs, 0);
        let currentLevel = UwUsToLevel(currentUwUs);
        let nextRankLevel = getNextRankLevel(currentLevel);
        let nextRankTotalUwUs = levelToUwUs(nextRankLevel);
        let baseRankLevelUwUs = levelToUwUs(getBaseRankLevel(UwUsToLevel(currentUwUs)));
        let rankPercentage = ((currentUwUs - baseRankLevelUwUs) / (nextRankTotalUwUs - baseRankLevelUwUs)) * 100;
        $("#UwUsResult").text(`${UwUsResult} more`);
        $("#levelResult").text($("#targetLevel").val());
        $("#minMessages").text(Math.ceil(UwUsResult / 11));
        $("#avgMessages").text(Math.ceil(UwUsResult / 5.5));
        $("#progressBlob").css("background-color", getRoleColor(currentLevel));
        $("#memberRankName").text(getRoleName(nextRankLevel));
        if (Math.sign(nextRankTotalUwUs - currentUwUs) === -1) {
            $("#memberRankUwUsUntil").text(0);
            $("#memberRank").val(100);
            $("#memberRankPercentage").text(100);
        } else {
            $("#memberRankUwUsUntil").text(nextRankTotalUwUs - currentUwUs);
            $("#memberRank").val(Math.trunc(rankPercentage));
            $("#memberRankPercentage").text(rankPercentage.toFixed(2));
        }
        $("#progressBlobNote").text(getRoleNote(currentLevel));
    } else {
        $("#UwUsResult").text("< 45");
        $("#levelResult").text($("#targetLevel").val() || "0");
        $("#minMessages").text(0);
        $("#avgMessages").text(0);
    }
}

function customUwUsToLevel() { // void
    let UwUs = $("#customUwUs").val() || 0;
    if (UwUs < 45) {
        $("#customResult").text("UwUs below 45 cannot be converted to level");
    } else {
        let level = UwUsToLevel(UwUs);
        let currentLevelBaseUwUs = levelToUwUs(level);
        let nextLevelBaseUwUs = levelToUwUs(level + 1);
        $("#customResult").html(`${UwUs} UwUs translates to level ${UwUsToLevel(UwUs)}<br>${nextLevelBaseUwUs - UwUs} more UwUs needed for level ${level + 1}<br>From level ${level} to ${level + 1}, you're ${(((UwUs - currentLevelBaseUwUs) / (nextLevelBaseUwUs - currentLevelBaseUwUs)) * 100).toFixed(2)}% there`);
    }
}

function customLevelToUwUs() { // void
    let level = $("#customLevel").val() || 0;
    if (level < 3) {
        $("#customResult").text("Level below 3 cannot be converted to UwUs");
    } else {
        let UwUs = levelToUwUs(level);
        $("#customResult").html(`Level ${level} requires ${UwUs} UwUs total<br>${Math.ceil(UwUs / 11)} messages minimum (11 UwUs/msg)<br>${Math.ceil(UwUs / 5.5)} messages average (5.5 UwUs/msg)`);    
    }
}

function levelToUwUs(currentLevel = 0) { // int
    let level = 0;
    let UwUs = 0;
    while (level < currentLevel - 1) {
        UwUs += 45 * level * (Math.floor(level / 10) + 1);
        level++;
    }
    return UwUs;
}

function UwUsToLevel(currentUwUs = 0) { // int
    let level = 0;
    let UwUs = 0;
    while (true) {
        const nextUwUs = UwUs + 45 * level * (Math.floor(level / 10) + 1);
        if (nextUwUs > currentUwUs) {
            return level + 1;
        }
        UwUs = nextUwUs;
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
    0: "L",
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
    $("#levelUpBlock input, #customUwUs, #customLevel").keypress(function(event) {
        if (event.key === "Enter" || event.which === 13) {
            var id = $(this).attr("id");
            switch(id) {
                case "currentUwUs":
                case "targetLevel":
                    calculate();
                    break;
                case "customUwUs":
                    customUwUsToLevel();
                    break;
                case "customLevel":
                    customLevelToUwUs();
                    break;
            }
        }
    });
});

var isMainBlock = true;
function switchModes() { // void
    isMainBlock = !isMainBlock;
    $("#UwUsResult, #levelResult, #minMessages, #avgMessages").text(0);
    $("#currentUwUs, #targetLevel, #customUwUs, #customLevel").val("");
    $("#customResult").text("No results");
    $("#levelUpBlock, #levelUpButtons, #customBlock, #customButtons").toggleClass("hidden");
    if (isMainBlock) {
        $("#page > .hrText sup").text("Stretch Mode");
    } else {
        $("#page > .hrText sup").text("Custom Mode");
    }
}

function toggleCredits() { // void
    $("#credits").toggleClass("hidden");
}
