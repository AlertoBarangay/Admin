function addMapLayer(data,id,allData){
	const longitude = data.fullAddress.longitude || 0;
	const latitude = data.fullAddress.latitude || 0;
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

	

	for(var key in allData){
		const currentData = allData[key];

		var layermarkers = new ol.layer.Vector({
			source: new ol.source.Vector(),
			style : styleFunction(currentData.typeOfReport)
		});
		map.addLayer(layermarkers);
		var marker = new ol.Feature(new ol.geom.Point(ol.proj.fromLonLat([currentData.fullAddress.longitude,currentData.fullAddress.latitude])));
		marker.ol_uid= key;
						
		marker.style = styleFunction(currentData.typeOfReport);
		marker.comments= currentData.description;

		marker.mobile_no= currentData.phone.subscriberNumber;

		marker.type= currentData.typeOfReport;

		marker.status= currentData.status;

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
		});
		});

	}


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