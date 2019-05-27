var width = window.innerWidth; 
var height = window.innerHeight; 
//var timerID = 0;
var c = document.getElementById('canvas')
var ctx = c.getContext('2d');
c.width = width;
c.height = height;


	var speed = 8;
	var size = 8;
	var lines = [];
	var totalLines = 10;
	
	var init = function(){
	
		for (var i = 0; i < totalLines; i++) {
		
			lines.push({
				x: Math.random() * width,
				y: Math.random() * height,
				v: {
					x: Math.random() * 2 - 1,
					y: Math.random() * 2 - 1
				},
				c: 'rgba(' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ', 1.0)'
			});
		}
		setInterval(update, 40);	
	}
	
	var calculateDistance = function(v1, v2){
		x = Math.abs(v1.x - v2.x);
		y = Math.abs(v1.y - v2.y);
		
		return Math.sqrt((x * x) + (y * y));
	}
	
	var checkWallCollisions = function(index){
		if (lines[index].x > width) {
			lines[index].x = 0;
		}
		else 
			if (lines[index].x < 0) {
				lines[index].x = width;
			}
		
		if (lines[index].y > height) {
			lines[index].y = 0;
		}
		else 
			if (lines[index].y < 0) {
				lines[index].y = height;
			}
	}
	
	var addForce = function(index, force){
	
		lines[index].v.x += force.x;
		lines[index].v.y += force.y;
		
		magnitude = calculateDistance({
			x: 0,
			y: 0
		}, {
			x: lines[index].v.x,
			y: lines[index].v.y
		});
		
		lines[index].v.x = lines[index].v.x / magnitude;
		lines[index].v.y = lines[index].v.y / magnitude;
	}
	
	//This should be in multiple functions, but this will
	//save tons of looping - Gross!
	var applyForces = function(index){
		percievedCenter = {
			x: 0,
			y: 0
		};
		flockCenter = {
			x: 0,
			y: 0
		};
		percievedVelocity = {
			x: 0,
			y: 0
		};
		count = 0;
		for (var i = 0; i < lines.length; i++) {
			if (i != index) {
			
				//Allignment
				dist = calculateDistance(lines[index], lines[i]);
				
				//console.log(dist);
				if (dist > 0 && dist < 50) {
					count++;
					
					//Alignment
					percievedCenter.x += lines[i].x;
					percievedCenter.y += lines[i].y;
					
					//Cohesion
					percievedVelocity.x += lines[i].v.x;
					percievedVelocity.y += lines[i].v.y;
					//Seperation
					if (calculateDistance(lines[i], lines[index]) < 12) {
						flockCenter.x -= (lines[i].x - lines[index].x);
						flockCenter.y -= (lines[i].y - lines[index].y);
					}
				}
			}
		}
		if (count > 0) {
			percievedCenter.x = percievedCenter.x / count;
			percievedCenter.y = percievedCenter.y / count;
			
			percievedCenter.x = (percievedCenter.x - lines[index].x) / 400;
			percievedCenter.y = (percievedCenter.y - lines[index].y) / 400;
			
			percievedVelocity.x = percievedVelocity.x / count;
			percievedVelocity.y = percievedVelocity.y / count;
			
			flockCenter.x /= count;
			flockCenter.y /= count;
		}
		
		addForce(index, percievedCenter);
		
		addForce(index, percievedVelocity);
		
		addForce(index, flockCenter);
	}
	
	var update = function(){
	
		for (var i = 0; i < lines.length; i++) {
		
			//Draw boid
			
			ctx.beginPath();
			ctx.strokeStyle = lines[i].c;

			ctx.lineWidth = size;
			ctx.moveTo(lines[i].x, lines[i].y);
			lines[i].x += lines[i].v.x * speed;
			lines[i].y += lines[i].v.y * speed;
			applyForces(i);
			ctx.lineTo(lines[i].x, lines[i].y);
			ctx.stroke();
			ctx.fill();
			
			checkWallCollisions(i);	
			
		}
	}
	
	//Gui uses this to clear the canvas
	 var clearCanvas = function(){
		ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
		ctx.beginPath();
		ctx.rect(0, 0, width, height);
		ctx.closePath();
		ctx.fill();
	}
    
    init();