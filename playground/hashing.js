const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id:4
}

var token  = jwt.sign(data,'secret');
console.log(token);


var decoded = jwt.verify(token, 'secret');
console.log(decoded);

//
// const test = 'Use to cript';
// const crypt = SHA256(test).toString();
// console.log(`Original ${test}`);
// console.log(`hash ${crypt}`);
//
// var data = {
//     id:4
// }
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data +'secret')).toString()
// }
//
// console.log('token :' , token);
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString()
//
// const compare = SHA256(JSON.stringify(data +'secret')).toString();
// if( compare === token.hash){
//     console.log('data was not changed');
// }else{
//     console.log('data was changed');
// }