import * as React from "react"
import { useEffect, useState } from "react"
import { Feature, Map, MapBrowserEvent, View } from "ol";
import { fromLonLat, useGeographic } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import { OSM, Vector } from "ol/source";

import "ol/ol.css";
import { FeatureLike } from "ol/Feature";
import VectorLayer from "ol/layer/Vector";
import { GeoJSON } from "ol/format";
import { Fill, Icon, Stroke, Style, Text } from "ol/style";
import PinInfo from "./Components/PinInfo/PinInfo";
import ClearButton from "./Components/ClearButton/ClearButton";
import { Coordinate } from "ol/coordinate";

const geoJson = new GeoJSON()

const mapPinStyle = new Style({
    image: new Icon({
        src: "/img/map-pin-blue.png",
        scale: 25 / 50,
        anchor: [0.5, 1.0]
    }),
    text: new Text({
        font: 'bold 12px "Open Sans", "Arial Unicode MS", "sans-serif"',
        placement: 'point',
        fill: new Fill({ color: "#fff" }),
        stroke: new Stroke({ color: '#000', width: 2 }),
    })
});

type ApiRequestModel = {
    lat: String,
    long: String,
    location: String,
    name: String
}

interface ApiResponeModel extends Response {
    addresstype: String
    name: String
    display_name: String
    address: {
        railway: String
        road: String
        suburb: String
        city_district: String
        city: String
        state_district: String
        state: String
        postcode: String
        country: String
        country_code: String
    },
    boundingbox: String[]
}

export const MapView: React.FC = () => {

    const [map, setMap] = useState<Map | undefined>(undefined)
    const [featureLayer, setFeatureLayer] = useState<VectorLayer | undefined>()
    const [features, setFeatures] = useState<FeatureLike[]>([])
    const [clicked, setClicked] = useState<boolean>(false)
    const [displayData, setDisplayData] = useState<ApiRequestModel>({ long: "", lat: "", location: "", name: "" })
    const [coordinates, setCoordinates] = useState<number[]>([])

    useEffect(() => {
        useGeographic()
        const map = new Map({
            target: "map",
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            view: new View({
                center: [-0.023758, 51.547504],
                zoom: 13,
                minZoom: 6,
                maxZoom: 18
            })
        })
        map.on("click", onMapClick);

        setMap(map)
        loadFeatureData()
    }, [])

    useEffect(() => {
        if (map) {
            setFeatureLayer(addFeatureLayer(featureLayer, features))
        }
    }, [map, features])

    useEffect(() => {
        postAndFetchData(coordinates);
    }, [displayData])

    const loadFeatureData = () => {
        fetch("/api/geo-json")
            .then(response => response.json())
            .then(json => setFeatures(geoJson.readFeatures(json)))
    }

    var styleFunction = function (feature: any) {
        mapPinStyle.getText().setText(feature.get('pointLabel'));
        return mapPinStyle;
    }

    const addFeatureLayer = (previousLayer: VectorLayer, features: FeatureLike[]): VectorLayer => {
        const newLayer = previousLayer ? previousLayer : new VectorLayer({
            style: styleFunction
        });

        if (previousLayer != undefined) {
            previousLayer.getSource().clear();
        } else {
            map.addLayer(newLayer);
        }

        (newLayer as any).tag = "features";

        const source = new Vector({
            format: geoJson,
            features: features as Feature<any>[],

        });

        newLayer.setSource(source);

        return newLayer
    }

    const postAndFetchData = (coordinates: number[]) => {

        fetch("api/geo-json/add", {
            method: "POST",
            body: JSON.stringify({ coordinates: coordinates, pointLabel: displayData.name }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(() => loadFeatureData())
    }

    const getLocationAddress = (address: String,displayName:String) => {
        let response = '';
        address.split(', ').forEach((item) => {
            if (item === "undefined") return;
            response += item + " ";
        })
        if (response === "") {
            let strArray: String[] = [];
            displayName.split(', ').forEach((item) => {
                if (strArray.length < 3) {
                    strArray.push(item + " ")
                }
                response = strArray.join("").trim().replace(" ",", ")
            })
                return response
        }
        return response;
    };


    const onMapClick = (e: MapBrowserEvent) => {
        console.log(e)
        setCoordinates(e.coordinate)
        fetch(`https://nominatim.openstreetmap.org/reverse.php?lat=${e.coordinate[1]}&lon=${e.coordinate[0]}&zoom=18&format=jsonv2`)
            .then(response => response.json())
            .then((resp: ApiResponeModel) => setDisplayData({ lat: e.coordinate[1].toString(), long: e.coordinate[0].toString(), location: resp.display_name, name: resp.name ? resp.name : getLocationAddress(`${resp.address.road}, ${resp.address.suburb}, ${resp.address.city_district}`,resp.display_name) }))
        setClicked(true)

    }

    const clearPinPoints = () => {
        fetch("api/geo-json/clear", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(() => loadFeatureData())
        setClicked(false)

    }

    return <div>
        <ClearButton onClick={() => clearPinPoints()} />
        <div id="map" style={{ height: window.innerHeight, width: window.innerWidth }} />
        <PinInfo isVisible={clicked} data={displayData} setIsVisible={() => setClicked(!clicked)} />
    </div>
}