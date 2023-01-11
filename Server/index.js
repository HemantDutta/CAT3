const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const conn = mysql.createConnection({
   host: "localhost",
   user: "root",
   password: "admin",
   database: "infosys" 
});

conn.connect((err)=>{
    if (err) throw err;
    console.log('Database Connected');
})

const port = 3005;

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, ()=>{
    console.log('Server is listening on http://localhost:'+port);
});


app.get("/", (req,res)=>{
    let selectSQL = `select * from spring`;

    conn.query(selectSQL, (err,rows)=>{
        if (err) throw err;
        res.send(rows);
        // console.log(rows);
    });
})


app.post('/add', (req,res)=>{
    res.status(200);
    res.setHeader('Content-Type', 'application/json');

    let data = req.body;
    console.log(data);

    let addSQL = `insert into spring values(${data.id}, '${data.name}', '${data.desg}', '${data.dept}', ${data.sal}, '${data.loc}')`;

    conn.query(addSQL, (err)=>{
        if (err) throw err;

        res.send('inserted');
        res.end();
    })
});

app.post('/update', (req,res)=>{
    res.status(200);
    res.setHeader('Content-Type', 'application/json');

    let data = req.body;
    console.log(data);

    let updSQL = `update spring set emp_name='${data.name}', emp_desg='${data.desg}', emp_dept='${data.dept}', emp_salary=${data.sal}, emp_loc='${data.loc}' where emp_id=${data.id}`;
    conn.query(updSQL, (err)=>{
        if (err) throw err;

        res.send('inserted');
        res.end();
    })

});

app.post('/delete', (req,res)=>{
    res.status(200);
    res.setHeader('Content-Type', 'application/json');

    let data = req.body;
    console.log(data);

    let delSQL = `delete from spring where emp_id=${data.id}`;

    conn.query(delSQL, (err)=>{
        if (err) throw err;

        res.send('inserted');
        res.end();
    })
})