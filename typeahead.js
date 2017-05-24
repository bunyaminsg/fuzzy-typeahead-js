function matchAll(str){
	var results = [];
	for(var i=1;i<=str.length;i++){
		var r = ".{" + i + "}";
		var reg = new RegExp(r,"g");
		for(var j=0;j<str.length;j++){
			reg.lastIndex = j;	
			var s = reg.exec(str);
			if(s) results.push(s[0]);
		}
	}
	return results;
}

function filter(str, list, threshold){
	var strs = str.split(' ');
	var subs = [];
	for(var k=0;k<strs.length;k++){
		subs = subs.concat(matchAll(strs[k]));
	}
	var results = [];
	for(var i=0;i<list.length;i++){
		score = 0.0;
		var len = 0;
		for(var j=0;j<subs.length;j++){
			if(list[i].toLowerCase().indexOf(subs[j].toLowerCase()) !== -1) score += subs[j].length;
			len += subs[j].length;
		}
		score = parseFloat(score) / parseFloat(len);
		if(score >= threshold) {
			results.push({"item": list[i],"score": score});
		}
	}
	return results;
}

var items = ["Helen Thomas","Kenneth Willis","Tyler Robertson","Jordan Bates","Ruth Ferguson","Randy Harris","Larry Cunningham"];

document.addEventListener("DOMContentLoaded", function(){
	document.getElementById("data").innerHTML = "<p><b>Names:</b></p>";
	for(var x=0;x<items.length;x++)
		document.getElementById("data").innerHTML += "<p>" + items[x] + "</p>";
	document.getElementById("input").addEventListener("keyup",function(){
		var str = this.value;
		document.getElementById("output").innerHTML = "";
		var filtered = filter(str,items,0.35);
		filtered.sort(function(b, a) {
			return parseFloat(a.score) - parseFloat(b.score);
		});
		for(var k=0;k<filtered.length;k++)
			document.getElementById("output").innerHTML += "<p>" + filtered[k].item + "</p>";
	});
});
