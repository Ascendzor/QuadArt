var fractate = function() {
	var leCanvas = document.getElementById('leCanvas');
	var context = leCanvas.getContext('2d');
	
	var leSegment = new segment(7, 0, 0, leCanvas.width, leCanvas.height);
	leSegment.calculate();
	leSegment.draw();
	leSegment.fractate();
};