const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'base_docker',
    password: '1234',
    port: 5432,
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota para lidar com a inserção de dados
app.post('/submit', async (req, res) => {
    const { name, email } = req.body;

    try {
        await pool.query('INSERT INTO usuarios (name, email) VALUES ($1, $2)', [name, email]);
        res.json({ message: 'Dados inseridos com sucesso!' });
    } catch (err) {
        console.error('Erro ao inserir dados:', err);
        res.status(500).json({ message: 'Erro ao inserir dados' });
    }
});

// Rota padrão para servir o arquivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
