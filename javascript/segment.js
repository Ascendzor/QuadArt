var deltas = function() {
	this.lowRed = 256;
	this.highRed = -1;
	this.lowGreen = 256;
	this.highGreen = -1;
	this.lowBlue = 256;
	this.highBlue = -1;
}

var segment = function(life, x, y, width, height) {
	var self = this;
	
	this.life = life;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.leDeltas = new deltas();
	
	this.calculate = function() {
		self.leColours = leOriginalContext.getImageData(x, y, width, height);
		var leTotalRed = [];
		var leTotalBlue = [];
		var leTotalGreen = [];
		var leRedSubTotal = 0;
		var leGreenSubTotal = 0;
		var leBlueSubTotal = 0;
		
		var deltaCounter = 0;
		for(datum=0; datum < self.leColours.data.length;) {
			leRedSubTotal += self.leColours.data[datum]; //red
			if(self.leDeltas.lowRed > self.leColours.data[datum]) {
				self.leDeltas.lowRed = self.leColours.data[datum];
			}
			if(self.leDeltas.highRed < self.leColours.data[datum]) {
				self.leDeltas.highRed = self.leColours.data[datum];
			}
			datum++;
			leGreenSubTotal += self.leColours.data[datum]; //green
			if(self.leDeltas.lowBlue > self.leColours.data[datum]) {
				self.leDeltas.lowBlue = self.leColours.data[datum];
			}
			if(self.leDeltas.highBlue < self.leColours.data[datum]) {
				self.leDeltas.highBlue = self.leColours.data[datum];
			}
			datum++;
			leBlueSubTotal += self.leColours.data[datum]; //blue
			if(self.leDeltas.lowGreen > self.leColours.data[datum]) {
				self.leDeltas.lowGreen = self.leColours.data[datum];
			}
			if(self.leDeltas.highGreen < self.leColours.data[datum]) {
				self.leDeltas.highGreen = self.leColours.data[datum];
			}
			datum++;
			datum++; //skip alpha
			if(self.leColours.data.length > 8191) {
				if((datum % 8192) == 0) {
					leTotalRed.push(leRedSubTotal/2048);
					leTotalGreen.push(leGreenSubTotal/2048);
					leTotalBlue.push(leBlueSubTotal/2048);
					leRedSubTotal = 0;
					leGreenSubTotal = 0;
					leBlueSubTotal = 0;
				}
			} else {
				if(datum == self.leColours.data.length) {
					var leFraction = datum/4;
					leTotalRed.push(leRedSubTotal/leFraction);
					leTotalGreen.push(leGreenSubTotal/leFraction);
					leTotalBlue.push(leBlueSubTotal/leFraction);
				}
			}
		}
		self.leAverageRed = 0;
		self.leAverageGreen = 0;
		self.leAverageBlue = 0;
		for(datum in leTotalRed) {
			self.leAverageRed += leTotalRed[datum];
		}
		for(datum in leTotalGreen) {
			self.leAverageGreen += leTotalGreen[datum];
		}
		for(datum in leTotalBlue) {
			self.leAverageBlue += leTotalBlue[datum];
		}
		self.leAverageRed /= leTotalRed.length;
		self.leAverageGreen /= leTotalGreen.length;
		self.leAverageBlue /= leTotalBlue.length;
		
		for(datum=0; datum < self.leColours.data.length;) {
			self.leColours.data[datum] = self.leAverageRed; //red
			datum++;
			self.leColours.data[datum] = self.leAverageGreen; //green
			datum++;
			self.leColours.data[datum] = self.leAverageBlue; //blue
			datum++;
			datum++; //skip alpha
		}
	}
	
	this.draw = function() {
		leContext.putImageData(self.leColours, self.x, self.y);
	}
	
	this.fractate = function() {
		var sensitivity = 1;
		if((self.leDeltas.highRed - self.leDeltas.lowRed) < 100) {
			if((self.leDeltas.highBlue - self.leDeltas.lowBlue) < 100) {
				if((self.leDeltas.highGreen - self.leDeltas.lowGreen) < 100) {
					return;
				}
			}
		}
		
		setTimeout(function() {
			var leSegments = [];
			leSegments.push(new segment(self.life-1, self.x, self.y, self.width/2, self.height/2));
			leSegments.push(new segment(self.life-1, self.x+self.width/2, self.y, self.width/2, self.height/2));
			leSegments.push(new segment(self.life-1, self.x, self.y+self.height/2, self.width/2, self.height/2));
			leSegments.push(new segment(self.life-1, self.x+self.width/2, self.y+self.height/2, self.width/2, self.height/2));
			
			for(leSegment in leSegments) {
				leSegments[leSegment].calculate();
			}
			
			for(leSegment in leSegments) {
				leSegments[leSegment].draw();
			}
			
			for(leSegment in leSegments) {
				leSegments[leSegment].fractate();
			}
		}, 1000);
	}
}