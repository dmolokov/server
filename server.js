const http = require('http');
const url = require('url');
const fs = require('fs');
const server = http.createServer();
const PORT = process.env.PORT || 3000;
var wharehouse = {};
var global_identifier = 0;

class Product {
	constructor(id, name, quantity){
		this.id = id;
		this.name = name;
		this.quantity = quantity - 0;
	}
};

function handler(req, res)
{
	var query = url.parse(req.url,true).query;
	switch(query.method)	{
		case 'register':
			//Запрашиваемые параметры:
			//•	Название позиции. Тип - строка. Обязательный - да.
			//•	Количество. Тип - число. Обязательный - да.
			//
			//Ответ:
			//•	Идентификатор новой позиции. Тип - число.
			//•	Название позиции. Тип - строка.
			//•	Количество. Тип - число.
			wharehouse[ ++global_identifier ] = new Product(global_identifier, query.item, query.quantity);
			res.end(JSON.stringify(wharehouse[global_identifier]));
			break;
		case 'add':
			//Запрашиваемые параметры:
			//•	Id позиции. Тип - число. Обязательный - да.
			//•	Количество. Тип - число. Обязательный - да.
			//
			//Ответ:
			//•	Идентификатор новой позиции. Тип - число.
			//•	Название позиции. Тип - строка.
			//•	Количество. Тип - число.
			wharehouse[ query.position_id ].quantity += parseInt(query.quantity);
			res.end(JSON.stringify(wharehouse[ query.position_id ]));
			break;
		case 'delete':
			//Запрашиваемые параметры:
			//•	Id позиции. Тип - число. Обязательный - да.
			//•	Количество. Тип - число. Обязательный - да.
			//
			//Ответ:
			//•	Идентификатор новой позиции. Тип - число.
			//•	Название позиции. Тип - строка.
			//•	Количество. Тип - число.
			wharehouse[ query.position_id ].quantity -= parseInt(query.quantity);
			res.end(JSON.stringify(wharehouse[ query.position_id ]));
			break;
		case 'list':
			//Запрашиваемые параметры:
			//Ответ:
			//•	Список позиций. Тип - массив объектов (id, название позиции, остаток)
			res.end(JSON.stringify(wharehouse));
			break;
		default:
			break;
	}
}

server
	.listen(PORT)
	.on('error', err => console.error(err))
	.on('request', handler)
	.on('listening', () => { console.log('Start HTTP on port %d', PORT); })