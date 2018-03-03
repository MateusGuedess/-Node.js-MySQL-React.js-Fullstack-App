const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()

const SELECT_ALL_USER_QUERY = 'SELECT * FROM usuarios'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'app_tutorial'
})

connection.connect(err => {
    if(err) {
        return err;
    }
})

app.use(cors())

app.get('/', (req, res) =>{
    res.send('vá para /user para ver os usuarios')
})

app.get('/user', (req, res) => {
    connection.query(SELECT_ALL_USER_QUERY, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: resultados
            })
        }
    })
})

app.get('/user/add', (req, res) => {
    const{ nome, sobrenome, email } = req.query
    const INSERT_USER_QUERY = `INSERT INTO usuarios(nome, sobrenome, email) VALUES('${nome}', '${sobrenome}', '${email}')`
    connection.query(INSERT_USER_QUERY, (err, resultados) => {
        if(err) {
            return res.send(err)
        } else {
            return res.send('usuario adicionado com sucesso')
        }
    })
})


app.listen(4000, () => {
    console.log('o servidor está rodando na porta 4000')
})