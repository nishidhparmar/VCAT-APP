const express = require('express');
const app = express();
var bodyParser = require('body-parser');
var con = require("./database");
var validator = require("email-validator");
const session = require('express-session');

var arr = [];
var arrlogin = [];

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "vcat" }));

app.get('/', (req, res) => {
    res.render('index');
});

app.get("/signup", (req, res) => {
    res.render('signup', { error: "none", email_wrong: "none" });
});

app.get('/login', (req, res) => {
    res.render('login', { error: "none", pass: "none" })
});

app.get('/vcat', (req, res) => {
    var name = req.session.name;
    res.render('vcat', { name: name })
});

app.post("/signupdata", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var pass = req.body.pass;
    if (validator.validate(email)) {
        con.query("SELECT email FROM users", function (err, result) {
            if (err) throw err;
            result.forEach(email => arr.push(email.email));

            if (arr.includes(email)) {
                res.render('signup', { error: "email is exists", email_wrong: "none" });
                console.log("true");
            } else {
                var sql = `INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${pass}')`;
                con.query(sql, function (err, result) {
                    if (err) throw err;
                    console.log("Inserted");
                    res.redirect('/login')
                });
                console.log("false");
            }
        });
    } else {
        res.render('signup', { email_wrong: "email is worng", error: "none" });
    }


});


app.post("/logindata", (req, res) => {
    var email = req.body.email;
    var pass = req.body.pass;

    con.query(`SELECT email FROM users`, function (err, result) {
        if (err) throw err;
        result.forEach(email => arrlogin.push(email.email));
        if (!arrlogin.includes(email)) {
            console.log("notexist");
            res.render('login', { error: "email is not exists", pass: "none" })
        } else {
            con.query(`SELECT password FROM users WHERE email='${email}'`, function (err, result) {
                if (err) throw err;
                var password = result[0].password;
                if (pass !== password) {
                    console.log(false);
                    res.render('login', { pass: "password is wrong", error: "none" })

                } else {
                    con.query(`SELECT name FROM users WHERE email='${email}'`, function (err, result) {
                        if (err) throw err;
                        req.session.name = result[0].name;
                        res.redirect('/vcat');
                    });
                }
            });
        }
    });
    console.log(email, pass);
});



app.listen(3000, () => {
    console.log("server is running on port 3000");
});