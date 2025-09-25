const express = require("express")
const fs = require("fs"); //file system
const path = require("path") // caminho do arquivo do banco de dados
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cros = require("cors");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.listen(port,()=>{
    console.log(`servidor rodando http://localhost:${port}`)
    
})