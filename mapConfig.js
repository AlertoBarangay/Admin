  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
      var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([120.97617, 14.42307]),
          zoom: 17
        })
      });
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
		  
	var layermarkers = new ol.layer.Vector({
		  source: new ol.source.Vector(),
		  
		});
		
		
		map.addLayer(layermarkers);

		