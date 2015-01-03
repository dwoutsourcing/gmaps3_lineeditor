gmaps3_lineeditor
=================

An polyline editor for Google Maps V3

This editor extends "editable" native polyline functionality.
It simply adds a few but useful capabilities:
1. Click on map to add a new point.
2. Click on a polyline vortex to delete the point.
3. Click on an edge marker to add an equidistant new point.

LineEditor is a google.maps.MVCObject. It exposes two bindable properties:
- enabled (boolean): bound to editable polyline's property.
- polyline (google.maps.Polyline)

LineEditor constructor:
new dw.google.maps.LineEditor(polyline, removeCallback);
Both arguments are optional. 

polyline is a google.maps.Polyline instance
removeCallback is a callback function to be called before removing a point. This function must return a boolean value (if true, point will be deleted)
An event (a MouseEvent instance) parameter will be passed to the callback function as the unique argument.