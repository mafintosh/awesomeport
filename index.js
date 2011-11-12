#!/usr/bin/env node

var net = require('net');
var available = function(port, callback) {
	var server = net.createServer();

	server.on('error', function() {
		callback(null, false);
	});
	server.listen(port, function() {
		server.close();
		callback(null, true);
	});
};

var ports = [];

for (var i = 7; i < 12; i++) {
	ports.push(i*1000);
}
for (var i = 7; i < 10; i++) {
	ports.push(i*1111);
}
for (var i = 7; i < 10; i++) {
	ports.push(i*1010);
}
for (var i = 7; i < 10; i++) {
	ports.push(i*1001);
}
for (var i = 7; i < 12; i++) {
	ports.push(i*1100);
}
for (var i = 7; i < 11; i++) {
	ports.push(i*1110);
}

var from = 7000;
var i = 0;

var find = function() {
	var current = ports[i++] || from++;

	available(current, function(err, free) {
		if (free) {
			process.stdout.write(''+current+'\n', function() {
				process.exit(0);
			});
			return;
		}
		find();
	});	
};

find();
