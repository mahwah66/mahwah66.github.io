//TouchCoords object : store mouse/touch coords object
//can be used by multiple objects to track touch locations
//compatible for both mouse and touch (one touch only) tracking
var TouchCoords = function(){
	
	//private variables
	var startX, startY,
	    dragX, dragY,
	    momentumX, momentumY,
	    istouched, isdragged;
	    
	//initialize property values to null/false	
	this.reset();
};
TouchCoords.prototype = {
	
	//works for both touch and mouse events. currently handles only single touch gestures
	//requires original event variable to be passed as an argument
	capture : function(e){
		if(e){
			var type = e.type;
			e = e.originalEvent || e;		// 'e' should reference original event if touch event and property exists.
			
			//if touch event, set event reference to first touch item (e.touches[0]);			
			if(type == 'touchstart'){e = e.touches[0];}
			else if(type == 'touchmove'){e = e.changedTouches[0];}
		
			//touchstart/mousedown initial event - gathers initial offset coordinate of event. set istouched flag to true
			if((type == 'mousedown' || type == 'touchstart') && !this.istouched){
				this.reset();
				this.istouched = true;
				this.startX = e.pageX || e.clientX;
				this.startY = e.pageY || e.clientY;
			}
			//mousemove/touchmove handler - sets relative offset coordinate values for X/Y. set isdragged flag to true
			else if((type == 'mousemove' || type=='touchmove') && this.istouched){			
				this.isdragged = true;
				
				var offsetX = e.pageX || e.clientX,
				    offsetY = e.pageY || e.clientY,
				    prevX = this.dragX || 0,
				    prevY = this.dragY || 0;
			
				this.dragX = (this.startX - offsetX);
				this.dragY = (this.startY - offsetY);
				
				this.momentumX = prevX - this.dragX;
				this.momentumY = prevY - this.dragY;
			}
			//mouseup/touchend should behave similarly to mouseout - reset values
			else if(type == 'mouseout' || type == 'mouseup' || type == 'touchend'){
				this.reset();
			}
			//console.log(this.dragX + "," +this.dragY);
		}
	},
	
	//clears all instance keys to null
	reset : function(){
		Object.keys(this).forEach(function(property){
			this[property] = null;
		}.bind(this));
	}
};