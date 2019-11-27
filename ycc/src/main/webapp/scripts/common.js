
function highlight(node) {
	initialize();
	var innerDiv = document.createElement('div');
	innerDiv.className = 'menu-highlight';
	if (document.getElementById(node) != null) {
		document.getElementById(node).appendChild(innerDiv);
	}

	var field = document.getElementById(node);
	if (field && field.getElementsByTagName("span")) {
		field.getElementsByTagName("span")[0].className = "menu-active";
	}
};

function initialize() {
	var fields = document.getElementsByClassName('menu-highlight');
	for (var i = 0; i < fields.length; i++) {
		fields[i].parentNode.removeChild(fields[i]);
	}

	fields = document.getElementsByClassName('menu-active');
	for (var i = 0; i < fields.length; i++) {
		fields[i].className = "menu-passive";
	}
};
