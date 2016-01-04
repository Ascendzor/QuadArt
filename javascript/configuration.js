var leOriginalCanvas = document.getElementById('leOriginalCanvas');
var leOriginalContext = leOriginalCanvas.getContext('2d');

var leCanvas = document.getElementById('leCanvas');
var leContext = leCanvas.getContext('2d');

var leImage = new Image();
leImage.onload = function () {
	leOriginalCanvas.width = leImage.width;
	leOriginalCanvas.height = leImage.height;
	leOriginalContext.drawImage(leImage, 0, 0, leImage.width, leImage.height);
	
	leCanvas.width = leImage.width;
	leCanvas.height = leImage.height;
	
	fractate();
}

leImage.crossOrigin="anonymous" //<-- wtf? I need this and to use imgur.....?

//leImage.src = 'http://i.imgur.com/WHDKDu3.jpg';
leImage.src = 'http://i.imgur.com/FgfHa1I.jpg?1';
