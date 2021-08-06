const express = require('express');
const Contenedor = require('./contenedor');

const PORT = 8080;
const productos = new Contenedor('./src/productos.txt')
const app = express();
app.get('/',(req,res,next)=>{
	res.send('<p><a href="/productos">Ver productos </p><br><p><a href="/productoRandom">Ver producto Random </p>')
})
app.get('/productos',(req,res,next)=>{
	const todos = productos.getAll();
	res.send(JSON.stringify(todos,null,2))
})
app.get('/productoRandom',(req,res,next)=>{
	const todos = productos.getAll();
	const rnd = Math.floor(Math.random()*todos.length)
	res.send(todos[rnd])
})

const server= app.listen(PORT,()=>{
	console.log(`Server running on port ${PORT}`)
})

server.on('error',(err)=>{
	console.log(err)
})

