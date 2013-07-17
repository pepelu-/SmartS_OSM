var map;
function initmap() {
	map = new L.Map('map');
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © openstreetmap contributors';
	var osm = new L.TileLayer(osmUrl,{minZoom:8,maxZoom:20,attribution:osmAttrib});

	map.setView(new L.LatLng(43.472064, -3.800288),18);
	map.addLayer(osm);

	var markers = new L.MarkerClusterGroup();

    for (var i = 0; i < addressPoints.length; i++) {
			var a = addressPoints[i];
			var title = a[2];
			var marker = L.marker(new L.LatLng(a[0], a[1]), { title: title });
			marker.bindPopup(title);
			markers.addLayer(marker);
	}
	map.addLayer(markers);
	
	var imageUrl = 'leaflet/images/lab_uc.png',
		imageBounds = [[43.472445,-3.800889], [43.471628, -3.799767]];
	var lab = new L.imageOverlay(imageUrl, imageBounds);

	map.on('zoomend', function(e) {
		var zoom = map.getZoom();
		if (zoom >= 18) {
	        map.addLayer(lab);
		}
		else {
			map.removeLayer(lab);
		}

	});
	
	var baselayer = {
		//"OpenStreetMaps": osm
	};
	
	// beta
	var park = new L.imageOverlay();
	var temper = new L.imageOverlay(); 
	var noise = new L.imageOverlay();
	
	var overlays = {
			"Laboratorio": lab,
			"Parking": park,
			"Temperature": temper,
			"Noise": noise
	};
	
	L.control.layers(baselayer, overlays).addTo(map);
	
	var scala = new L.control.scale();
	scala.addTo(map);
	
}
