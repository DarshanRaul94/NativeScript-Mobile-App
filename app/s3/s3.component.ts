import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page } from "ui/page";
// IMPORT THE S3 SERVICE
import { S3Service } from "../services/s3.service"

// INITIALIZE THE COMPOENENT
@Component({
	selector: "S3",
	moduleId: module.id,
	templateUrl: "./s3.component.html",
	styleUrls: ['./s3.component.css']
})
export class S3Component implements OnInit {
	dialogOpen = false; //FOR THE ACTION DIALOG. FALSE BY DEFAULT. TRUE WHEN CLICKED



	counter = 0;
	//INITIALIZING THE S3 SERVICE ARRAYS AND ASSIGNING TO LOCAL ARRAYS
	bucketlist = this.s3service.bucketlist;

	// INITIALIZING THE S3 SERVICE ARRAY COUNTS AND ASSINGING TO LOCAL VARIABLE
	bucketcount = this.s3service.bucketlist.length;
	deletelist = []

	constructor(page: Page, private http: HttpClient, private s3service: S3Service) {
		page.actionBarHidden = true;
		page.statusBarStyle = "light";

	}


	ngOnInit(): void {


	}

	public OPTION: string; //VARIABLE TO HOLD DIALOG OPTIONS

	//TODO::NOT WORKING
	selected = false; // FOR THE TICK MARK ON BUCKET LONG PRESS 


	// THIS FUNCTION IS USED TO SELECT THE BUCKETS TO BE ADDED TO THE DELETE LIST
	onLongPress(bucketname) {
		console.log(this.deletelist);
		//this.selected = true;
		this.deletelist.push(bucketname);
	}
	// FUNCTION TO OPEN THE CREATE BUCKET DIALOG
	createBucketDialog() {
		this.OPTION = "CREATE";
		this.showDialog();
	}
	// FUNCTION TO OPEN THE DELETE BUCKET DIALOG
	deleteBucketDialog() {

		this.OPTION = "DELETE";
		this.showDialog();
	}
	// PARENT FUNCTION TO TOGGLE THE DIALOGOPEN VARIABLE TRUE
	showDialog() {
		console.log("clicked");
		this.dialogOpen = true;
	}
	// PARENT FUNCTION TO TOGGLE THE DIALOGOPEN VARIABLE FALSE
	closeDialog() {
		this.dialogOpen = false;
	}


	/************************************************************************************
	
	DATA CALL FUNCTIONS
	
	************************************************************************************/



	//FUCNTION TO GET BUCKETS
	getbuckets(milliseconds) { // MILIISECONDS VARIABLE USED TO DELAY THE VARIABLE ASSIGNING( REST API RESPONSE TAKES 2-3 SECONDS DELAY )
		(async () => { // ASYNC-AWAIT USED TO HANDLE API RESPONSE DELAY
			// Do something before delay
			console.log('before delay')
			this.s3service.getbuckets();

			await this.delay(milliseconds); // WAIT FOR SOME MILLISECONDS AFTER THE GET CALL IS SENT

			// Do something after
			console.log('after delay')
			// AFTER THE DELAY AS THERE IS NO CONFLICT. ASSIGN THE VARIABLE VALUES.
			this.bucketlist = this.s3service.bucketlist;
			this.bucketcount = this.s3service.bucketlist.length;
		})();



	}

	//ACTUAL FUCNTION TO CAUSE DELAY
	delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}


	/***********************************************************************************/


	// FUNCTION TO CREATE BUCKET
	CreateBucket(bucketlist) {

		(async () => {// ASYNC-AWAIT USED TO HANDLE API RESPONSE DELAY
			var bucketarray: String[] = bucketlist.split(',');
			for (var i = 0; i < bucketarray.length; i++) { // LOOP THROUGH THE BUCKET LIST AND SEND POST CALL FOR EACH BUCKETNAME
				this.s3service.postData({ "bucket_name": bucketarray[i] }).subscribe((result) => { // SEND DATA TO THE S3 POST CALL FUNCTION

					console.log(result);
				}, (error) => {
					console.log(error);
				});

			}
			//load a progress bar here
			await this.delay(5000);

			// Do something after
			console.log('after delay')// AFTER THE DELAY AS THERE IS NO CONFLICT. ASSIGN THE VARIABLE VALUES.
			this.getbuckets(3000);
			this.closeDialog() // CLOSE THE CREATE BUCKET DIALOG
			this.OPTION = "SUCCESS"; // TOGLLE THE SUCCESS DIALOG TRUE
			this.showDialog();// SHOW SUCCESS DAILOG
		})();
	}

	/***********************************************************************************/
	// FUNCTION TO DELETE BUCKET
	DeleteBucket() {
		(async () => {// ASYNC-AWAIT USED TO HANDLE API RESPONSE DELAY
			for (var i = 0; i < this.deletelist.length; i++) {
				this.s3service.deleteData(this.deletelist[i]).subscribe((result) => {

					console.log(result);
				}, (error) => {
					console.log(error);
				});
			}
			//load a progress bar here
			await this.delay(5000);

			// Do something after
			console.log('after delay')// AFTER THE DELAY AS THERE IS NO CONFLICT. ASSIGN THE VARIABLE VALUES.
			
			this.getbuckets(3000);
			this.closeDialog() // CLOSE THE CREATE BUCKET DIALOG
			this.OPTION = "SUCCESS"; // TOGLLE THE SUCCESS DIALOG TRUE
			this.showDialog();// SHOW SUCCESS DAILOG
		})();
	}


}