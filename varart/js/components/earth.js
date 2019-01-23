/* global AFRAME*/

AFRAME.registerComponent('earth', {
	schema: {
		earthRotation: {type: 'number', default: 1.0}
	},

	init: function() {
		this.data.yRotation = 0;
	},

	tick: function(time, timeDelta) {
		this.rotate();
	},

	rotate: function() {
		var currentRotation = this.el.getAttribute('rotation');
		currentRotation.y += this.data.earthRotation;
		this.el.setAttribute('rotation', currentRotation);		
	},

});