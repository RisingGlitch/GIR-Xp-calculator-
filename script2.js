function chargen(length) { // string
    const characters = "0123456789ABCDEF";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function calculate() { // void
    setTimeout(() => {
        document.getElementById("result").textContent="Contacting Havoc Servers...";
    }, 1000);
    setTimeout(() => {
        document.getElementById("result").textContent="Retriving Package DB";
    }, 2000);
    setTimeout(() => {
        document.getElementById("result").textContent="Decrypting Database...";
    }, 2500);
    setTimeout(() => {
        document.getElementById("result").textContent="Retrived Havoc Package ID! Contacting Havoc Gift Handler..."
    }, 3000);
    setTimeout(() => {
        document.getElementById("result").textContent="Providing Package ID..."
    }, 6000);
    setTimeout(() => {
        document.getElementById("result").textContent="Decrypting Response..."
    }, 7000);
    setTimeout(() => {
        document.getElementById("result").textContent="Havoc Code Generated! Code: " + chargen(32);
    }, 11000);
}
