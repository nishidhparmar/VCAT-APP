var con = require("./database");
var arrlogin=[];
// con.query("SELECT email FROM users", function (err, result) {
//         if (err) throw err;
//         result.forEach(email => arr.push( email.email));
//         console.log(arr);
//         if(arr.includes('nishidh@gmail.com')){
//             console.log("exist");
//         }else{
//             console.log("not");
//         }
        
//     });

var email = 'nishidh@gmail.com'
var pass = '123';

// con.query(`SELECT email FROM users`, function (err, result) {
//     if (err) throw err;
//     result.forEach(email => arrlogin.push( email.email));
//     // console.log(arrlogin);
//     if(!arrlogin.includes(email)){
//         console.log("notexist");
//     }else{
//         console.log("exist");
//     }
//   });
// con.query( `SELECT password FROM users WHERE email='${email}'`, function (err, result) {
//     if (err) throw err;
//     var password = result[0].password;
//     if (pass !== password) {
//         console.log(false);
        
//     }else{
//         console.log("true");
//     }
//   });

//   con.query(`SELECT name FROM users WHERE email='${email}'`, function (err, result) {
//     if (err) throw err;
//     console.log(result[0]);
// });

var validator = require("email-validator");
 
var email = validator.validate("test@s"); // true
console.log(email);