// Components, functions, plugins
import { Component, ChangeDetectionStrategy, ChangeDetectorRef, NgModule } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { Database } from './../../providers/database/database';
import { Localstorage } from './../../providers/localstorage/localstorage';

// Pages
import { NotesDetailsPage } from '../notesdetails/notesdetails';

declare var dateFormat: any;

@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NotesPage {

	public day1Items: any[] = [];
	public day2Items: any[] = [];
	public day3Items: any[] = [];
	public day4Items: any[] = [];
	public day5Items: any[] = [];

	public Day1Show = false;
	public Day2Show = false;
	public Day3Show = false;
	public Day4Show = false;
	public Day5Show = false;
	
	public Day1Label: string;
	public Day2Label: string;
	public Day3Label: string;
	public Day4Label: string;
	public Day5Label: string;

	public EntryTerms: string;

	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				private storage: Storage,
				private databaseprovider: Database,
				private cd: ChangeDetectorRef,
				public loadingCtrl: LoadingController,
				private localstorage: Localstorage) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad: NotesPage');
	}

	ionViewDidEnter() {
		console.log('ionViewDidEnter: NotesPage');
		
		// Load / refresh data when coming to this page
		this.LoadData();
	}

	LoadData() {

		// Load initial data set here

		//let loading = this.loadingCtrl.create({
		//	spinner: 'crescent',
		//	content: 'Please wait...'
		//});


		// Blank and show loading info
		this.day1Items = [];
		this.day2Items = [];
		this.day3Items = [];
		this.day4Items = [];
		this.day5Items = [];
		this.cd.markForCheck();
		
		// Temporary use variables
		var flags;
		var DisplayLocation = "";
		var dbEventDateTime;
		var SQLDate;
		var DisplayDateTime;
		var AgendaButtonText;
		var visEventName;
		var ButtonStyle = "";
		var visEventNote = "";
		var DisplayDayLabel;
        var DisplayDay1Label;
        var DisplayDay2Label;
        var DisplayDay3Label;
        var DisplayDay4Label;
        var DisplayDay5Label;
		
		var AgendaDays = this.localstorage.getLocalValue("AgendaDays");
		var AgendaDates = this.localstorage.getLocalValue("AgendaDates");

		var DayLabels = AgendaDates.split("|");


		switch(AgendaDays) {
			case "1":
				this.Day1Show = true;
				this.Day2Show = false;
				this.Day3Show = false;
				this.Day4Show = false;
				this.Day5Show = false;
				dbEventDateTime = new Date(DayLabels[0] + "T05:00:00Z");
				DisplayDay1Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day1Label = DisplayDay1Label;
				this.Day2Label = "";
				this.Day3Label = "";
				this.Day4Label = "";
				this.Day5Label = "";
				break;
			case "2":
				this.Day1Show = true;
				this.Day2Show = true;
				this.Day3Show = false;
				this.Day4Show = false;
				this.Day5Show = false;
				dbEventDateTime = new Date(DayLabels[0] + "T05:00:00Z");
				DisplayDay1Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day1Label = DisplayDay1Label;
				dbEventDateTime = new Date(DayLabels[1] + "T05:00:00Z");
				DisplayDay2Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day2Label = DisplayDay2Label;
				this.Day3Label = "";
				this.Day4Label = "";
				this.Day5Label = "";
				break;
			case "3":
				this.Day1Show = true;
				this.Day2Show = true;
				this.Day3Show = true;
				this.Day4Show = false;
				this.Day5Show = false;
				dbEventDateTime = new Date(DayLabels[0] + "T05:00:00Z");
				DisplayDay1Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day1Label = DisplayDay1Label;
				dbEventDateTime = new Date(DayLabels[1] + "T05:00:00Z");
				DisplayDay2Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day2Label = DisplayDay2Label;
				dbEventDateTime = new Date(DayLabels[2] + "T05:00:00Z");
				DisplayDay3Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day3Label = DisplayDay3Label;
				this.Day4Label = "";
				this.Day5Label = "";
				break;
			case "4":
				this.Day1Show = true;
				this.Day2Show = true;
				this.Day3Show = true;
				this.Day4Show = true;
				this.Day5Show = false;
				dbEventDateTime = new Date(DayLabels[0] + "T05:00:00Z");
				DisplayDay1Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day1Label = DisplayDay1Label;
				dbEventDateTime = new Date(DayLabels[1] + "T05:00:00Z");
				DisplayDay2Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day2Label = DisplayDay2Label;
				dbEventDateTime = new Date(DayLabels[2] + "T05:00:00Z");
				DisplayDay3Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day3Label = DisplayDay3Label;
				dbEventDateTime = new Date(DayLabels[3] + "T05:00:00Z");
				DisplayDay4Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day4Label = DisplayDay4Label;
				this.Day5Label = "";
				break;
			case "5":
				this.Day1Show = true;
				this.Day2Show = true;
				this.Day3Show = true;
				this.Day4Show = true;
				this.Day5Show = true;
				dbEventDateTime = new Date(DayLabels[0] + "T05:00:00Z");
				DisplayDay1Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day1Label = DisplayDay1Label;
				dbEventDateTime = new Date(DayLabels[1] + "T05:00:00Z");
				DisplayDay2Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day2Label = DisplayDay2Label;
				dbEventDateTime = new Date(DayLabels[2] + "T05:00:00Z");
				DisplayDay3Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day3Label = DisplayDay3Label;
				dbEventDateTime = new Date(DayLabels[3] + "T05:00:00Z");
				DisplayDay4Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day4Label = DisplayDay4Label;
				dbEventDateTime = new Date(DayLabels[4] + "T05:00:00Z");
				DisplayDay5Label = dateFormat(dbEventDateTime, "dddd, mmmm d");
				this.Day5Label = DisplayDay5Label;
				break;
		}	

		// Get the data
		var AttendeeID = this.localstorage.getLocalValue('AttendeeID');

		if (AttendeeID !='' && AttendeeID != null) {
			
			//loading.present();

			// -------------------
			// Get data: Day 1
			// -------------------
			flags = DayLabels[0] + "|li";
			//flags = "2018-06-09|li";
			
			this.databaseprovider.getNotesData(flags, AttendeeID).then(data => {
				
				//console.log("getNotesData: " + JSON.stringify(data));

				if (data['length']>0) {
					
					for (var i = 0; i < data['length']; i++) {

						// Display start time
						dbEventDateTime = data[i].StartDateTime.substring(0, 19);
						dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
						dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
						SQLDate = new Date(dbEventDateTime);
						DisplayDateTime = dateFormat(SQLDate, "mm/dd h:MMtt");

						visEventName = data[i].MeetingTitle;
						visEventNote = "Note: " + data[i].Note.substr(0, 30) + " ...";
						
						console.log("EventID: " + data[i].meetingID);
						
						this.day1Items.push({
							CourseName: visEventName,
							visEventTimeframe: DisplayDateTime,
							EventID: data[i].meetingID,
							NoteBeginning: visEventNote
						});

					}


				} else {
					
					this.day1Items.push({
						CourseName: "No notes have been taken for meetings on this day",
						visEventTimeframe: "",
						EventID: 0,
						NoteBeginning: ""
					});

				}

				this.cd.markForCheck();

				// -------------------
				// Get data: Day 2
				// -------------------
				flags = DayLabels[1] + "|li";
				
				this.databaseprovider.getNotesData(flags, AttendeeID).then(data => {
					
					//console.log("getNotesData: " + JSON.stringify(data));

					if (data['length']>0) {
						
						for (var i = 0; i < data['length']; i++) {

							// Display start time
							dbEventDateTime = data[i].StartDateTime.substring(0, 19);
							dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
							dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
							SQLDate = new Date(dbEventDateTime);
							DisplayDateTime = dateFormat(SQLDate, "mm/dd h:MMtt");

							visEventName = data[i].MeetingTitle;
							visEventNote = "Note: " + data[i].Note.substr(0, 30) + " ...";
							
							console.log("EventID: " + data[i].meetingID);
							
							this.day2Items.push({
								CourseName: visEventName,
								visEventTimeframe: DisplayDateTime,
								EventID: data[i].meetingID,
								NoteBeginning: visEventNote
							});

						}


					} else {
						
						this.day2Items.push({
							CourseName: "No notes have been taken for meetings on this day",
							visEventTimeframe: "",
							EventID: 0,
							NoteBeginning: ""
						});

					}

					this.cd.markForCheck();

					// -------------------
					// Get data: Day 3
					// -------------------
					flags = DayLabels[2] + "|li";
					
					this.databaseprovider.getNotesData(flags, AttendeeID).then(data => {
						
						//console.log("getNotesData: " + JSON.stringify(data));

						if (data['length']>0) {
							
							for (var i = 0; i < data['length']; i++) {

								// Display start time
								dbEventDateTime = data[i].StartDateTime.substring(0, 19);
								dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
								dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
								SQLDate = new Date(dbEventDateTime);
								DisplayDateTime = dateFormat(SQLDate, "mm/dd h:MMtt");

								visEventName = data[i].MeetingTitle;
								visEventNote = "Note: " + data[i].Note.substr(0, 30) + " ...";

								this.day3Items.push({
									CourseName: visEventName,
									visEventTimeframe: DisplayDateTime,
									EventID: data[i].meetingID,
									NoteBeginning: visEventNote
								});

							}


						} else {
							
							this.day3Items.push({
								CourseName: "No notes have been taken for meetings on this day",
								visEventTimeframe: "",
								EventID: 0,
								NoteBeginning: ""
							});

						}

						this.cd.markForCheck();
						
						// -------------------
						// Get data: Day 4
						// -------------------
						flags = DayLabels[3] + "|li";
						
						this.databaseprovider.getNotesData(flags, AttendeeID).then(data => {
							
							//console.log("getNotesData: " + JSON.stringify(data));

							if (data['length']>0) {
								
								for (var i = 0; i < data['length']; i++) {

									// Display start time
									dbEventDateTime = data[i].StartDateTime.substring(0, 19);
									dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
									dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
									SQLDate = new Date(dbEventDateTime);
									DisplayDateTime = dateFormat(SQLDate, "mm/dd h:MMtt");

									visEventName = data[i].MeetingTitle;
									visEventNote = "Note: " + data[i].Note.substr(0, 30) + " ...";

									this.day4Items.push({
										CourseName: visEventName,
										visEventTimeframe: DisplayDateTime,
										EventID: data[i].meetingID,
										NoteBeginning: visEventNote
									});

								}


							} else {
								
								this.day4Items.push({
									CourseName: "No notes have been taken for meetings on this day",
									visEventTimeframe: "",
									EventID: 0,
									NoteBeginning: ""
								});

							}

							this.cd.markForCheck();

							// -------------------
							// Get data: Day 5
							// -------------------
							flags = DayLabels[4] + "|li";
							
							this.databaseprovider.getNotesData(flags, AttendeeID).then(data => {
								
								//console.log("getNotesData: " + JSON.stringify(data));

								if (data['length']>0) {
									
									for (var i = 0; i < data['length']; i++) {

										// Display start time
										dbEventDateTime = data[i].StartDateTime.substring(0, 19);
										dbEventDateTime = dbEventDateTime.replace(/-/g, '/');
										dbEventDateTime = dbEventDateTime.replace(/T/g, ' ');
										SQLDate = new Date(dbEventDateTime);
										DisplayDateTime = dateFormat(SQLDate, "mm/dd h:MMtt");

										visEventName = data[i].MeetingTitle;
										visEventNote = "Note: " + data[i].Note.substr(0, 30) + " ...";

										this.day5Items.push({
											CourseName: visEventName,
											visEventTimeframe: DisplayDateTime,
											EventID: data[i].meetingID,
											NoteBeginning: visEventNote
										});

									}


								} else {
									
									this.day5Items.push({
										CourseName: "No notes have been taken for meetings on this day",
										visEventTimeframe: "",
										EventID: 0,
										NoteBeginning: ""
									});

								}

								this.cd.markForCheck();

								//loading.dismiss();

							}).catch(function () {
								console.log("Day 5 Promise Rejected");
							});

						}).catch(function () {
							console.log("DAy 4 Promise Rejected");
						});

					}).catch(function () {
						console.log("Day 3 Promise Rejected");
					});
					
				}).catch(function () {
					console.log("Day 2 Promise Rejected");
				});

			}).catch(function () {
				console.log("Day 1 Promise Rejected");
			});
			
		} else {
			console.log('User not logged in');
			//loading.dismiss();
		}
			
	}

    NoteDetails(EventID) {
		
		console.log("NoteDetails: " + EventID);
		
        if (EventID != 0) {
            // Navigate to Notes Details page
			this.localstorage.setLocalValue('EventID', EventID);
			this.navCtrl.push(NotesDetailsPage, {EventID: EventID}, {animate: true, direction: 'forward'});
        }

    };

    GetSearchResults() {

        var SearchTerms = this.EntryTerms;

        if ((SearchTerms == undefined) || (SearchTerms == "")) {
            // Do nothing or show message
			
        } else {

            this.localstorage.setLocalValue("SearchTerms", SearchTerms);
			this.navCtrl.push('SearchResultsPage', {SearchTerms: SearchTerms}, {animate: true, direction: 'forward'});

        }
    };

}
