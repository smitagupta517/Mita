 // Based on a pen by Siddharth Thevaril
// https://codepen.io/NomNom99/pen/RGNPwG

var points = [];
var historyLength = 30;
var time = 0;
var lifeTime = 400;
var iP = false;

function setup() {
	iP = isPreviewEmbed();
}

function drawBackground() {
	var w = 60;
	var h = w;
	var xCount = ceil(width / w);
	var yCount = ceil(height / h);
	var xOffset = -xCount * w * 0.5 + w * 0.5;
	var yOffset = -yCount * h * 0.5 + h * 0.5;
	beginPath();
	for (var y = 0; y < yCount; y++) {
		for (var x = 0; x < xCount; x++) {
			circle(x * w + xOffset, y * h + yOffset, 2);
		}
	}
	fill(hsl(0, 0, 0));
}

function handleHistory() {
	if (points.length > historyLength) {
		points = points.slice(-historyLength);
		lifeTime = floor((time - points[0].timestamp) * 0.01) * 100;
	}
}

function addPoint(v) {
	v.timestamp = time;
	points.push(v);
}

function drawPoint(v, m) {
	beginPath();
	line(v.x, v.y, m.x, m.y);
	stroke(hsl(343, 85, 53, 1 - (time - v.timestamp) / lifeTime));
}

function draw(e) {
	time = e;
	drawBackground();
	lineWidth(!iP ? 1.4 : 2.5);
	var m = mousePos.copy().sub(width_half, height_half);
	points.forEach(function (n) {return drawPoint(n, !iP ? m : n.copy().mult(0.3));});
	addPoint(!iP ? mousePos.copy().sub(width_half, height_half) : createVector(cos(e * 0.005), sin(e * 0.003)).mult(height_half * 0.8));
	handleHistory();
}



// Swipe Gesture for mobiles
function detectswipe(el,func) {
      swipe_det = new Object();
      swipe_det.sX = 0;
      swipe_det.sY = 0;
      swipe_det.eX = 0;
      swipe_det.eY = 0;
      var min_x = 20;  //min x swipe for horizontal swipe
      var max_x = 40;  //max x difference for vertical swipe
      var min_y = 40;  //min y swipe for vertical swipe
      var max_y = 50;  //max y difference for horizontal swipe
      var direc = "";
      ele = document.getElementById(el);
      ele.addEventListener('touchstart',function(e){
        var t = e.touches[0];
        swipe_det.sX = t.screenX; 
        swipe_det.sY = t.screenY;
      },false);
      ele.addEventListener('touchmove',function(e){
        e.preventDefault();
        var t = e.touches[0];
        swipe_det.eX = t.screenX; 
        swipe_det.eY = t.screenY;    
      },false);
      ele.addEventListener('touchend',function(e){
        //horizontal detection
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y)))) {
          if(swipe_det.eX > swipe_det.sX) direc = "r";
          else direc = "l";
        }
        //vertical detection - We do not need vertical directions for this yet
        // if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x)))) {
        //   if(swipe_det.eY > swipe_det.sY) direc = "d";
        //   else direc = "u";
        // }
    
        if (direc != "") {
          if(typeof func == 'function') func(el,direc);
        }
        direc = "";
      },false);  
    }

    function myfunction(el,d) {
    	var inputs = document.getElementById("cbox");
      if (d === 'l') {
      	inputs.checked = true;
      }
      else if (d === 'r') {
      	inputs.checked = false;
      }
    }



    detectswipe('body',myfunction);