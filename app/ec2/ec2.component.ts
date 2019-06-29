import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page } from "ui/page";
import { ChangeDetectionStrategy } from "@angular/core";

// IMPORTING THE SERVICES
import { S3Service } from "../services/s3.service"

import { EC2Service } from "../services/ec2.service"


//DECLARING THE COMPONENT
@Component({
	selector: "Ec2",
	moduleId: module.id,
	templateUrl: "./ec2.component.html",
	styleUrls: ['./ec2.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})



export class Ec2Component implements OnInit {



	dialogOpen = false; //FOR THE ACTION DIALOG. FALSE BY DEFAULT. TRUE WHEN CLICKED


	counter = 0;
	//INITIALZING THE LISTS WITH SERVICE VALUES
	keypairlist = this.ec2service.keypairlist;
	bucketlist = this.s3service.bucketlist;
	bucketcount = this.s3service.bucketlist.length;
	//EMPTY DELETE LIST
	deletelist = []

	constructor(page: Page, private http: HttpClient, private s3service: S3Service, private ec2service: EC2Service) {
		page.actionBarHidden = true;
		page.statusBarStyle = "light";


	}

	url = "https://s3.ap-south-1.amazonaws.com/awsiconsng/ubuntu.png"

	ngOnInit(): void {


	}

	selectos(os) {
		console.log(os);
		switch (os) {
			case "ubuntu":
				{
					this.url = "https://s3.ap-south-1.amazonaws.com/awsiconsng/ubuntu.png";
				}
			case "redhat":
				{
					this.url = "https://s3.ap-south-1.amazonaws.com/awsiconsng/redhat.png";
				}

		}



	}

	public sliderValue1 = 0;

	public OPTION: string;
	selected = false;


// COPY OF S3 FUCNTIONS AS PLACEHOLDERS WILL EDIT

	onLongPress(bucketname) {
		console.log(this.deletelist);
		//this.selected = true;
		this.deletelist.push(bucketname);
	}
	createInstanceDialog() {
		this.OPTION = "CREATE";
		this.showDialog();
	}
	deleteBucketDialog() {

		this.OPTION = "DELETE";
		this.showDialog();
	}
	showDialog() {
		console.log("clicked");
		this.dialogOpen = true;
	}

	closeDialog() {
		this.dialogOpen = false;
	}

	getbuckets(milliseconds) {
		(async () => {
			// Do something before delay
			console.log('before delay')
			this.s3service.getbuckets();

			await this.delay(milliseconds);

			// Do something after
			console.log('after delay')

			this.bucketlist = this.s3service.bucketlist;
			this.bucketcount = this.s3service.bucketlist.length;
		})();



	}
	delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	CreateBucket(bucketlist) {

		(async () => {
			var bucketarray: String[] = bucketlist.split(',');
			for (var i = 0; i < bucketarray.length; i++) {
				this.s3service.postData({ "bucket_name": bucketarray[i] }).subscribe((result) => {

					console.log(result);
				}, (error) => {
					console.log(error);
				});

			}
			//load a progress bar here
			await this.delay(5000);

			// Do something after
			console.log('after delay')
			this.getbuckets(3000);
			this.closeDialog()
			this.OPTION = "SUCCESS";
			this.showDialog();
		})();
	}
	DeleteBucket() {
		(async () => {
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
			console.log('after delay')
			this.getbuckets(3000);
			this.closeDialog()
			this.OPTION = "SUCCESS";
			this.showDialog();
		})();
	}


}