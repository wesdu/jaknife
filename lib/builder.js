#!/bin/node
var markdown= require("markdown").markdown;

var Builder= exports.Builder= function() {
	this.init.apply(this,arguments);
};
Builder.prototype= {
	init: function(content) {
		var head= content.split("\n\n");
		var body= content.substr(head[0].length);
		var head= head[0];
		this.fileInfo= {};
		this.initHeader(head);
		this.initBody(body);
	},
	setter: function(k, v) {
		this.fileInfo[k]= v;
	},
	initHeader: function(head) {
		this.head= head;
		var _this= this;
		(head.split("\n")).forEach(function(line) {
			var kv= line.split(":");
			var key= kv[0].toLowerCase();
			var value= line.substr(kv[0].length+1);
			if(_this.parser[key]) {
				_this.parser[key].call(_this, key, value);
			}
		});
	},
	initBody: function(body) {
	    this.body= body; 
		this.setter("markdown", body);
		this.setter("html", markdown.toHTML(body));
	},
	parser: {
		title: function(key, value){
			this.setter(key, value);
			this.setter("filename", value.split(" ").join("_"));
		},
		auth: function(key, value) {
			this.setter(key, value);
		},
		date: function(key, value) {
			this.setter(key, value);
		},
		tag: function(key, value) {
		    var tags= [];
		    value.split(",").forEach(function(tag){
				tags.push(tag);
			});
			this.setter(key, tags);
		}
	}
};

