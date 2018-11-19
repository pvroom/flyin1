// Components, functions, plugins
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Platform, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import { Localstorage } from './../../providers/localstorage/localstorage';

declare var formatTime: any;
declare var dateFormat: any;

// ------------------------
// Index to functions
// 
// Agenda			1875
// Database Stats	2492
// Evaluations		478
// Messaging		3122
// Misc				2171
// Notes			2327
// Program Guide	958
// Settings			886
// Speakers			1478
// 
// ------------------------


// Global URL and conference year referenceused for all AJAX-to-MySQL calls
var APIURLReference: string = "https://demoflyin.convergence-us.com/flyinPlanner.php?";

@Injectable()
export class Database {

	/* Setup page variables */
    private storage: SQLite;
	private db: SQLiteObject;
	 
    public constructor(public pltfrm: Platform, 
						public httpCall: Http,
						public alertCtrl: AlertController,
						private sqlite: SQLite,
						private localstorage: Localstorage) {

	}

	// -----------------------------------
	// 
	// Congressional Member Database Functions
	// 
	// -----------------------------------
	public getCongressionalData(flags, AttendeeID) {

		console.log("getCongressionalData: flags passed: " + flags);
		var SQLquery = "";
			
			console.log('getCongressionalData: Pull data from MySQL');

			// Perform query against server-based MySQL database
			var url = APIURLReference + "action=cmquery&flags=" + flags + "&AttendeeID=" + AttendeeID;

			return new Promise(resolve => {
				this.httpCall.get(url).subscribe(
					response => {
						console.log("Database: Congressional Member data: " + JSON.stringify(response.json()));
						resolve(response.json());
					},
					err => {
						if (err.status == "412") {
							console.log("App and API versions don't match.");
							var emptyJSONArray = {};
							resolve(emptyJSONArray);
						} else {
							console.log(err.status);
							console.log("API Error: ", err);
						}
					}
				);
			});
    }


	// -----------------------------------
	// 
	// Agenda Database Functions
	// 
	// -----------------------------------
	public getAgendaData(flags, AttendeeID) {

		console.log("getAgendaData: flags passed: " + flags);
		console.log("getAgendaData: AttendeeID passed: " + AttendeeID);
			
			// Perform query against server-based MySQL database
			var url = APIURLReference + "action=agendaquery&flags=" + flags + "&AttendeeID=" + AttendeeID;
			console.log('Database: URL call: ' + url);
			
			return new Promise(resolve => {
				this.httpCall.get(url).subscribe(
					response => {resolve(response.json());
					},
					err => {
						if (err.status == "412") {
							console.log("App and API versions don't match.");
							var emptyJSONArray = {};
							resolve(emptyJSONArray);
						} else {
							console.log(err.status);
							console.log("API Error: ", err);
						}
					}
				);
			});
			
	}

	public getSearchData(flags, AttendeeID) {

		console.log("flags passed: " + flags);
		console.log("AttendeeID passed: " + AttendeeID);
		
		var searchTerms = flags || '';
		
		// Perform query against server-based MySQL database
		var url = APIURLReference + "action=searchquery&flags=" + flags + "&AttendeeID=" + AttendeeID;

		return new Promise(resolve => {
			this.httpCall.get(url).subscribe(
				response => {resolve(response.json());
				},
				err => {
					if (err.status == "412") {
						console.log("App and API versions don't match.");
						var emptyJSONArray = {};
						resolve(emptyJSONArray);
					} else {
						console.log(err.status);
						console.log("API Error: ", err);
					}
				}
			);
		});
			
	}

	public getNotesData(flags, AttendeeID) {

		console.log("flags passed: " + flags);
		console.log("AttendeeID passed: " + AttendeeID);

		var flagValues = flags.split("|");
		var selectedDay = flagValues[0];    
		var listingType = flagValues[1];
		var EventID = flagValues[2];    
		var NoteID = flagValues[3];    
		var NoteText = flagValues[4];    
		var LastUpdated = flagValues[5];    
		var SQLquery = "";
		
		// Perform query against server-based MySQL database
		var url = APIURLReference + "action=notesquery&flags=" + flags + "&AttendeeID=" + AttendeeID;

		return new Promise(resolve => {
			this.httpCall.get(url).subscribe(
				response => {resolve(response.json());
				},
				err => {
					if (err.status == "412") {
						console.log("App and API versions don't match.");
						var emptyJSONArray = {};
						resolve(emptyJSONArray);
					} else {
						console.log(err.status);
						console.log("API Error: ", err);
					}
				}
			);
		});
			
	}

	public getDatabaseStats(flags, AttendeeID) {

		console.log("flags passed: " + flags);
		console.log("AttendeeID passed: " + AttendeeID);

		var flagValues = flags.split("|");
		var listingType = flagValues[0];
		var listingParameter = flagValues[1];
		var listingValue = flagValues[2];
		var AttendeeProfileTitle = flagValues[3];
		var AttendeeProfileOrganization = flagValues[4];
		
		// Perform query against server-based MySQL database
		var url = APIURLReference + "action=statsquery&flags=" + flags + "&AttendeeID=" + AttendeeID;

		return new Promise(resolve => {
			this.httpCall.get(url).subscribe(
				response => {resolve(response.json());
				},
				err => {
					if (err.status == "412") {
						console.log("App and API versions don't match.");
						var emptyJSONArray = {};
						resolve(emptyJSONArray);
					} else {
						console.log(err.status);
						console.log("API Error: ", err);
					}
				}
			);
		});
			
	}

	// -----------------------------------
	// 
	// Messaging Functions
	// 
	// -----------------------------------
	public getMessagingData(flags, AttendeeID) {

		console.log("flags passed: " + flags);
		console.log("AttendeeID passed: " + AttendeeID);

		var flagValues = flags.split("|");
		var listingType = flagValues[0];
		var sortingType = flagValues[1];
		var receiverID = flagValues[2];
		var pnTitle = flagValues[3];
		var pnMessage = flagValues[4];
		var DateTimeReceived = flagValues[5];
		
		// Perform query against server-based MySQL database
		var url = APIURLReference + "action=msgquery&flags=" + flags + "&AttendeeID=" + AttendeeID;

		return new Promise(resolve => {
			this.httpCall.get(url).subscribe(
				response => {
					console.log('msgquery response: ' + JSON.stringify(response.json()));
					resolve(response.json());
				},
				err => {
					if (err.status == "412") {
						console.log("App and API versions don't match.");
						var emptyJSONArray = {};
						resolve(emptyJSONArray);
					} else {
						console.log(err.status);
						console.log("API Error: ", err);
					}
				}
			);
		});
			
	}

	// -----------------------------------
	// 
	// Help Database Functions
	// 
	// -----------------------------------
	public sendHelpData(flags, AttendeeID) {

		console.log("sendHelpData: flags passed: " + flags);
		var SQLquery = "";
			
			console.log('sendHelpData: Push data to MySQL');

			// Perform query against server-based MySQL database
			var url = APIURLReference + "action=hlpquery&flags=" + flags + "&AttendeeID=" + AttendeeID;
			console.log(url);
			
			return new Promise(resolve => {
				this.httpCall.get(url).subscribe(
					response => {
						console.log("Database: sendHelpData data: " + JSON.stringify(response.json()));
						resolve(response.json());
					},
					err => {
						if (err.status == "412") {
							console.log("App and API versions don't match.");
							var emptyJSONArray = {};
							resolve(emptyJSONArray);
						} else {
							console.log(err.status);
							console.log("API Error: ", err);
						}
					}
				);
			});
    }

}