function addMapLayer(data,id){
	const longitude = data.fullAddress.longitude || 0;
	const latitude = data.fullAddress.latitude || 0;
	console.log(longitude,latitude);
	var map = new ol.Map({
		target: 'map' + id,
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		view: new ol.View({
			center: ol.proj.fromLonLat([longitude,latitude]),
			zoom: 19
		})
	});

	
var layermarkers = new ol.layer.Vector({
	source: new ol.source.Vector(),
	style : styleFunction(data.typeOfReport)
});


map.addLayer(layermarkers);

var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([longitude,latitude])));
marker.ol_uid= id;
			  
marker.style = styleFunction(data.typeOfReport);
marker.comments= data.description;

marker.mobile_no= data.phone.subscriberNumber;

marker.type= data.typeOfReport;

marker.status= data.status;

layermarkers.getSource().addFeature(marker);

var overlayContainerElement = document.getElementById('popup' + id);
var overlayLayer = new ol.Overlay({element:overlayContainerElement});
map.addOverlay(overlayLayer);
map.on('click',function(e){
overlayContainerElement.innerHTML = "";
overlayLayer.setPosition(undefined);
map.forEachFeatureAtPixel(e.pixel,function(feature,layer){
	const markerInfos = ['comments','mobile_no','status','type'];
	for(var i = 0; i< markerInfos.length;i++){
		let info = document.createElement('h6');
		info.innerHTML = feature[markerInfos[i]] || '';
		overlayContainerElement.appendChild(info);
	}
	overlayLayer.setPosition(e.coordinate);
	console.log(overlayContainerElement);

});
});

}

function styleFunction(feature) {
	var fire = new ol.style.Style({
		image: new ol.style.Icon({
			anchor: [0.5, 1],
			src: 'fire3.png'
		})
		});
		
		var others = new ol.style.Style({
		image: new ol.style.Icon({
			anchor: [0.5, 1],
			src: 'marker.png'
		})
		});
		
		var crime = new ol.style.Style({
		image: new ol.style.Icon({
			anchor: [0.5, 1],
			src: 'crime.png'
		})
		});
		
		var health = new ol.style.Style({
		image: new ol.style.Icon({
			anchor: [0.5, 1],
			src: 'health.png'
		})
		});
	if (feature === "Fire Emergency")
	{
		return fire;
	}
	else if (feature === "Health Emergency")
	{
		return health;
	}
	else if (feature === "Crime Incident")
	{
		return crime;
	}
	else if (feature === "Others")
	{
		return others;
	}
}