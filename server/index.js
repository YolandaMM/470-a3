const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'cmpt470'
});
connection.connect(err => {
    if(err){
        return err;
    }
});

console.log('connection');

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello');
});

// Display all users' information
const select_all_table = `SELECT * from users`;
app.get('/users', (req, res) => {
    connection.query(select_all_table, (err, results) => {
        if(err){
            return res.send(err);
        }else{
            return res.json({
                data: results
            })
        }
    });
});

// Create new users
app.get('/users/create', (req, res) => {
    const {name, email, age, gender, description} = req.query;
    const insert_query = `INSERT INTO users (name, email, age, gender, description) VALUES ('${name}', '${email}', '${age}', '${gender}', '${description}')`;
    connection.query(insert_query, (err, results) => {
        if(err) {
            return res.send(err);
        }else{
            return res.send('successfully add user');
        }
    });
});

// Delete existing users
app.get('/users/delete', (req, res) => {
    const {id} = req.query;
    const insert_query = `DELETE FROM users WHERE id="${id}"`;
    connection.query(insert_query, (err, results) => {
        if(err) {
            return res.send(err);
        }else{
            return res.send('successfully remove user');
        }
    });
})

// Search and return the id to specific user
app.get('/users/search', (req, res) => {
    const {name, email, age} = req.query;
    const insert_query = `SELECT id FROM users WHERE name="${name}" AND email="${email}" AND age=${age}`;
    connection.query(insert_query, (err, results) => {
        if(err) {
            return res.send(err);
        }else{
            return res.send(results);
        }
    });
})

// Change attributes of any of the users
app.get('/users/change', (req, res) => {
    const {id, name, email, age, gender, description} = req.query;
    // Careful to distinguish int & varchar!
    // **************************************************************************
    // ex: http://localhost:4000/users/change?id=1&old_attr=email&new_data=brian@gmail.com
    const insert_query = `UPDATE users SET name="${name}", email="${email}", age="${age}", gender="${gender}", description="${description}" WHERE id=${id}`;
    // **************************************************************************
    connection.query(insert_query, (err, results) => {
        if(err) {
            return res.send(err);
        }else{
            return res.send('successfully change attr');
        }
    });
})

// Sort Ascend
app.get('/users/ASC_sort', (req, res) => {
    const {column_name} = req.query;
    const insert_query = `SELECT * FROM users ORDER BY ${column_name}`;
    connection.query(insert_query, (err, results) => {
        if(err) {
            return res.send(err);
        }else{
            return res.send(results);
        }
    });
})

// Sort Descend
app.get('/users/DESC_sort', (req, res) => {
    const {column_name} = req.query;
    const insert_query = `SELECT * FROM users ORDER BY ${column_name} DESC`;
    connection.query(insert_query, (err, results) => {
        if(err) {
            return res.send(err);
        }else{
            return res.send(results);
        }
    });
})




app.listen(4000, () => {
    console.log('Web is listening on port 4000')
});