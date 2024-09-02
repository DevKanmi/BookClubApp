const info = (...params) =>{
    console.log(...params);    
} // Logging information to the console

const error =(...params) =>{
    console.log(...params);
    } //Logging Error information to the console

module.exports ={
    info,
    error
}

//Can be tweaked to your desired preference.