const passwordGenerate = (length) => {
    let characters = "qwertyuiopl23kjWE%^&*OPL6K1JHGF7D5SAA)(*&^%$#@}{P|}hgfd98sazxcvbnm0,NBVCXS";
    let password = "";
    for (let i = 0; i < length; i++) {
       password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return password;
};


module.exports = passwordGenerate;