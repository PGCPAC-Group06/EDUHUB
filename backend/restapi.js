const exp = require('express')
const app = exp();
const mysql = require('mysql2')
const cors = require('cors')

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root123',
    database : 'newdb'
})

app.use(cors())
app.use(exp.json())

conn.connect((err) => {
    if(err){
        console.log("Connection Failed!!!")
    }

    else{
        console.log("Database Connected Succesfully")
    }
} )


app.post('/login', (req, res) => {

    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username=? AND password=?";
    const values = [username, password];

    conn.query(sql, values, (err, result) => {

        if (err) {
            console.log("Login Failed", err);
            return res.status(500).json({
                message: "Database Error"
            });
        }
        if (result.length === 1) {

            console.log("Login Successful");

            return res.status(200).json({
                user: {
                    userid: result[0].userid,
                    username: result[0].username
                },
                token: "abc123"
            });

        } else {

            return res.status(401).json({
                message: "Username or Password does not match"
            });

        }
    });
});


app.get('/users/:userid', function (req, res) {
  const id = req.params.userid;  

  conn.query(
    'SELECT * FROM books WHERE userid = ?', [id],
    (err, result) => {
      if (!err) {
        res.json(result);
        console.log("Data fetched");
      } 
      
      else {
        console.log("Failed");
      }
    }
  );
});



app.listen(9000 , ()=>{
    console.log("\nServer Started At 9000 Port")
})