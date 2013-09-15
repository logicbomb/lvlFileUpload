var express = require('express');
var app = express();
app.use(express.bodyParser());

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);

app.post('/files', function(req, res){
	if (req.body) {
		console.log(JSON.stringify(req.body));
	}

	var data = {
		msg: "/files/post"
	};

	data.msg = Object.keys(req.files).length + " files posted";
	Object.keys(req.files).forEach(function(key) {
		var file = req.files[key];
		console.log('Found a file named ' + key + ', it is ' + file.size + ' bytes');
	});

  	res.send(data);
});

app.listen(3000);