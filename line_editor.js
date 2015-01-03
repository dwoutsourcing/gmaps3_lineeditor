if(!dw) var dw = {google:{maps:{}}};


dw.google.maps.LineEditor = function(polyline, removeCallback) {
	this.set('enabled', true);
	this.set('polyline', polyline);
	
	if(!removeCallback) removeCallback = function() {return confirm('Are you sure to delete this point?');};
	this.setRemoveCallback(removeCallback);
};

dw.google.maps.LineEditor.prototype = new google.maps.MVCObject;

dw.google.maps.LineEditor.prototype.setRemoveCallback = function(fn) {
	this.removeCallback = fn;
};

dw.google.maps.LineEditor.prototype.getPath = function() {
	return this.get('polyline').getPath();
};
dw.google.maps.LineEditor.prototype.setPath = function(mvcArray) {
	this.get('polyline').setPath(mvcArray);
};

dw.google.maps.LineEditor.prototype.setPolyline = function(polyline) {
	this.set('polyline', polyline);
};
dw.google.maps.LineEditor.prototype.getPolyline = function() {
	return this.get('polyline');
};

dw.google.maps.LineEditor.prototype.polyline_changed = function() {
	var self = this;
	var polyline = this.get('polyline');
	
	this.unbindAll();
	
	if(!polyline)
		return;
	
	polyline.bindTo('editable', this, 'enabled');
	
	var map = polyline.getMap();
	if(map)
		self.initMap_(map);

	polyline.map_changed = function() {
		self.initMap_(polyline.getMap());
	};
		
    google.maps.event.addListener(polyline, 'click', function(event) {
    	if(event.vertex !== undefined)
    		self.onVertexClick_(event);
    	else if(event.edge !== undefined)
    		self.onEdgeClick_(event);
    });
};

dw.google.maps.LineEditor.prototype.initMap_ = function(map) {
	var self = this;
	
	google.maps.event.addListener(map, 'click', function(event) {
		self.onMapClick_(event);
	});
};

dw.google.maps.LineEditor.prototype.onMapClick_ = function(event) {
	this.getPath().push(event.latLng);
};
dw.google.maps.LineEditor.prototype.onVertexClick_ = function(event) {
	if(this.removeCallback(event))
		this.getPath().removeAt(event.vertex);
};
dw.google.maps.LineEditor.prototype.onEdgeClick_ = function(event) {
	this.getPath().insertAt(event.edge + 1, event.latLng);
};