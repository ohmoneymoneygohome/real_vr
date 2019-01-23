/* global AFRAME*/

AFRAME.registerComponent('moon', {
	schema: {
		timeParameter: {type: 'number', default: 1},
		timeParameterDelta: {type: 'number', default: 2 * Math.PI / 1000.0},
		orbitRadius: {type: 'number', default: 20}
	},

	init: function() {
	},


	tick: function(time, timeDelta) {
		this.data.timeParameter += this.data.timeParameterDelta;
		if (this.data.timeParameter > 2 * Math.PI) {
			this.data.timeParameter -= (2 * Math.PI);
		}
		this.newPosition();
	},

	newPosition: function() {
		var currentPosition = this.el.getAttribute('position');
		currentPosition.z = this.data.orbitRadius * Math.cos(this.data.timeParameter);
		currentPosition.x = this.data.orbitRadius * Math.sin(this.data.timeParameter);
		this.el.setAttribute('position', currentPosition);		
		
		var currentRotation = this.el.getAttribute('rotation');
		currentRotation.y = this.data.timeParameter * 180.0 / Math.PI;
		this.el.setAttribute('rotation', currentRotation);
	},

});