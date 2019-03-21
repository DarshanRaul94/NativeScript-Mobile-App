import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page } from "ui/page";

import { S3Service } from "../services/s3.service"
@Component({
	selector: "S3",
	moduleId: module.id,
	templateUrl: "./s3.component.html",
	styleUrls: ['./s3.component.css']
})
export class S3Component implements OnInit {
	dialogOpen = false;



	counter = 0;
	bucketlist = this.s3service.bucketlist;
	bucketcount = this.s3service.bucketlist.length;
	deletelist = []
	constructor(page: Page, private http: HttpClient, private s3service: S3Service) {
		page.actionBarHidden = true;
		page.statusBarStyle = "light";

	}


	ngOnInit(): void {


	}
	public OPTION: string;
	selected = false;
	onLongPress(bucketname) {
		console.log(this.deletelist);
		//this.selected = true;
		this.deletelist.push(bucketname);
	}
	createBucketDialog() {
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