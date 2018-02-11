var express =  require('express');
var fs = require('fs');
var app = express();
app.use(express.static(__dirname + '/public'));
var camisetasDatos = [
	{Titulo:"Naranja",imagen:"img/camiseta1.png"},
	{Titulo:"Roja",imagen:"img/camiseta2.png"},
	{Titulo:"Azul",imagen:"img/camiseta3.png"},
	{Titulo:"Verde",imagen:"img/camiseta4.png"}
]
app.get('/',function(peticion,respuesta){
	respuesta.render('index.jade');
});
app.get('/tienda',function(peticion,respuesta){
	respuesta.render('tienda.jade',{
		titulo:"Tienda de camisetas",
		camisetas:camisetasDatos
	});
}); 
app.get('/tienda/comprar/:camiseta',function(peticion,respuesta){
	var obj = camisetasDatos.filter(function(obj){
		if (peticion.params.camiseta == obj.Titulo) {
			respuesta.render("compra.jade",obj);
		}
	})[0];
});
app.use(function(peticion,respuesta){
	respuesta.status(400);
	respuesta.render('404.jade',{titulo:"404: pagina no encontrada :("});
});
app.listen(3000,function(){
	console.log("Escucando servidor"); 
});   