#!/bin/node
var express= require("express"),
	fs= require("fs"),
	Builder= require("./lib/builder").Builder,
	Path= require("path"),
	mustache= require("mustache");

var app = express.createServer()
	,articleHash= {}
	,articles= []
	,article_path= "./article/"
	,template_path= "./template/"
	,tags= {}
	,latestMtime= 0
	;
	
app.get('/', function(req, res){
	var callback= function(req, res) {
		fs.readFile(template_path+"index.html",function(err,template) {
			template=template.toString();
			res.send(mustache.to_html(template, {articles: articles}));
		});
	};
	/*
    loadAllArticles(res, function() {
		callback(req, res);
	});
	*/
	res.send("hello there");
});
app.get('/article/:filename', function(req, res){
	loadAllArticles(res,function() {
		var filename= req.params.filename;
		fs.readFile(template_path+"article.html",function(err,template) {
			template=template.toString();
			res.send(mustache.to_html(template, articleHash[filename]));
		});
	});
});
function asyncMap (list, fn, cb_) {
  if (typeof cb_ !== "function") throw new Error(
    "No callback provided to asyncMap")
  var data = []
    , errState = null
    , l = list.length
  if (!l) return cb_(null, [])
  function cb (er, d) {
    if (errState) return
    if (arguments.length > 1) data = data.concat(d)
    if (er) return cb_(errState = er, data)
    else if (-- l === 0) cb_(errState, data)
  }
  list.forEach(function (ar) { fn(ar, cb) })
}
var loadAllArticles= function(res, callback) {
	fs.stat(article_path,function(err, stat) {
		var now= (new Date(stat.mtime)).getTime();
		console.info(now, latestMtime);
		if(now > latestMtime) {
			latestMtime= now;
		}else {
			callback();
			return;		
		}
		fs.readdir(article_path, function(err, list){
			asyncMap(list, function(fileName, _cb) {
				var path= article_path + fileName;
				if(Path.extname(path)!=".md") {
					_cb();
					return;
				}
				fs.readFile(path, function(err, content) {
					var content_string= (content.toString("utf8"));
					var fileInfo= (new Builder(content_string)).fileInfo;
					articleHash[fileInfo.filename]= fileInfo;
					articles.push(fileInfo);
					_cb();
				});
			}, function() {
				articles.sort(function(a,b) {
					return a.date<b.date?1:-1;
				});
				console.info(articles);
				callback();
			});
		});
	});
};
console.info("listening at port 3000");
app.listen(80);

