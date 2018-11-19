// Components, functions, plugins
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from './../../providers/localstorage/localstorage';
import { LeafletDirective } from '@asymmetrik/ngx-leaflet/dist';

import * as L from "leaflet";

@Component({
  selector: 'page-floorplanmapping',
  templateUrl: 'floorplanmapping.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FloorplanMappingPage {

	// Leaflet mapping variables
	myMapFP: any;
	public BoothX;
	public BoothY;
	public ExhibitorName = "Test Exhibitor";
	

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private storage: Storage,
				private databaseprovider: Database,
				private cd: ChangeDetectorRef,
				public loadingCtrl: LoadingController,
				private localstorage: Localstorage) {
		
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ExhibitorDetailsPage');
	}

	AdjustPosition(Incrementer) {
	
		console.log('Incrementer: ' + Incrementer);
		
		switch(Incrementer) {
			case "XMinus":
				this.BoothX = this.BoothX - 1;
				break;
			case "YMinus":
				this.BoothY = this.BoothY - 1;
				break;
			case "XPlus":
				this.BoothX = this.BoothX + 1;
				break;
			case "YPlus":
				this.BoothY = this.BoothY + 1;
				break;
		}
		
		console.log('New Coordinates: X: ' + this.BoothX + ', Y: ' + this.BoothY);
		
	}
	
	RefreshMap() {
				
		//this.myMap.removeLayer(Exhibitor);
		
		var Exhibitor = L.latLng([this.BoothY, this.BoothX]);

		L.marker(Exhibitor).addTo(this.myMapFP)
			.bindPopup('X: ' + this.BoothX + ', Y: ' + this.BoothY)
			.openPopup();

		this.myMapFP.setView([this.BoothY, this.BoothX], 1);

	}
	
	onMapClick(e) {
        var popLocation= e.latlng;
        //var popup = L.popup()
		//	.setLatLng(popLocation)
		//	.setContent('X: ' + e.latlng.lng + ', Y: ' + e.latlng.lat)
		//	.openOn(this.myMapFP);        
        var popupmarker = L.marker(popLocation).addTo(this.myMapFP)
		//	.setLatLng(popLocation)
			.bindPopup('X: ' + e.latlng.lng + ', Y: ' + e.latlng.lat)
			.openPopup();        
		console.log(e.latlng.lng, e.latlng.lat);
	}
	
	ngOnInit() {

		if (this.BoothX === null || this.BoothX == undefined) {
			this.BoothX = 0;
			this.BoothY = 0;
		}
		
		// Simple coordinate system mapping
		this.myMapFP = L.map('mapFP', {
			crs: L.CRS.Simple,
			minZoom: -2,
			maxZoom: 2,
			zoomControl: false
		});

        var bounds = L.latLngBounds([0, 0], [1000, 2000]);    // Normally 1000, 1000; stretched to 2000,1000 for AACD 2017
		//var bounds = [[0, 0], [1500, 2000]];    // Normally 1000, 1000;

		var image = L.imageOverlay('../assets/img/OfficesSenate.jpg', bounds, {
			attribution: 'Convergence'
		}).addTo(this.myMapFP);

		this.myMapFP.fitBounds(bounds);

		var Exhibitor = L.latLng([this.BoothY, this.BoothX]);

		L.marker(Exhibitor, {riseOnHover: true, draggable: true}).addTo(this.myMapFP)
			.bindPopup('X: ' + this.BoothX + ', Y: ' + this.BoothY)
			.openPopup();

		this.myMapFP.setView([this.BoothY, this.BoothX], 1);
		
		this.myMapFP.on('click', (e)=>{this.onMapClick(e)});
		
	}

}
