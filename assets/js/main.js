

/* DEBUG
var baseUrl = "http://localhost/project-diesel/Access-Toolkit-Guide/dev/";
var veeva = {
	gotoSlide: function(slide) {
		var target = slide.replace(".zip", "");

		window.location.href = baseUrl + target + "/" + target + ".html";
	},
	next: function() {
		console.log(slideLookup["slide-" + (slideIndex + 1)]);
		window.location.href =
			baseUrl +
			slideLookup["slide-" + (slideIndex + 2)] +
			"/" +
			slideLookup["slide-" + (slideIndex + 2)] +
			".html";
	},
	prev: function() {
		window.location.href =
			baseUrl +
			slideLookup["slide-" + slideIndex] +
			"/" +
			slideLookup["slide-" + slideIndex] +
			".html";
	}
};

window.onkeypress = function(event) {
	if (event.keyCode == 37 && slideIndex > 0) {
		veeva.prev();
	}
	if (event.keyCode == 39 && slideIndex < Object.keys(slideLookup).length - 1) {
		veeva.next();
	}
};
//*/

var dragger;
var slidthing={id:'',starth:0};

$(document).ready(function() {
	window.onresize = function(e) {
		resetguy();
	};

	dragger=new TouchCoords();
	$(document).on('mousedown touchstart', function(e){
		e.preventDefault();
		dragger.capture(e);
	}).on('mousemove touchmove', function(e){
		e.preventDefault();
		dragger.capture(e);
	}).on('mouseup touchend', function(e){
		e.preventDefault();
		dragger.capture(e);
	});
	$('.slide').on('mousedown touchstart', function(e){
		e.preventDefault();
		slidthing.id=$(this).attr('id');
		slidthing.starth=$(this).height();
	}).on('mousemove touchmove', function(e){
		e.preventDefault();
		if (slidthing.id===$(this).attr('id')){
			var dy=dragger.dragY;
			var nh=(slidthing.id==='layer1' || slidthing.id==='layer3' )? (slidthing.starth-dy):(slidthing.starth+dy);
			var htotal=$('#base').height();
			nh=Math.max(nh,10); 
			nh=Math.min(nh, htotal);
			$(this).css('height',nh+'px');
		}
	}).on('mouseup touchend', function(e){
		e.preventDefault();
		slidthing.id='';
	});
	
	filltext();
	$('#txt').on('mousedown touchstart', function(e){
		e.preventDefault();
		$(this).addClass('hide');
		$('.slide-background').removeClass('hide');
	})
});


	
function resetguy(){
		//console.log('reset me!');
		filltext();
		$('.slide').css({'width':'100%','height':'100%'});
}

function filltext(){
		$('.slide-background').addClass('hide');
		var tarr=["I like women. I don't understand them, but I like them.","I have always hated that damn James Bond. I'd like to kill him.","There are women who take it to the wire. That's what they are looking for, the ultimate confrontation. They want a smack.","There is nothing like a challenge to bring out the best in man.","Laughter kills fear, and without fear there can be no faith. For without fear of the devil there is no need for God."];
		var mystr=tarr[Math.floor(Math.random()*tarr.length)];
		$('#txt').html(mystr).removeClass('hide');
}