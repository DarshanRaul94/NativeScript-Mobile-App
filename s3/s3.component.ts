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
	bucketcount = this.bucketlist.length;
	deletelist = []
	constructor(page: Page, private http: HttpClient, private s3service: S3Service) {
		page.actionBarHidden = true;
		page.statusBarStyle = "light";

	}


	ngOnInit(): void {
		//	this.getbuckets();

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
		this.s3service.getbuckets()
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

	CreateBucket(bucketlist) {


		var bucketarray: String[] = bucketlist.split(',');
		for (var i = 0; i < bucketarray.length; i++) {
			this.postData({ "bucket_name": bucketarray[i] }).subscribe((result) => {

				console.log(result);
			}, (error) => {
				console.log(error);
			});

		}
		this.closeDialog()
		this.OPTION = "SUCCESS";
		this.showDialog();
	}
	DeleteBucket() {

		for (var i = 0; i < this.deletelist.length; i++) {
			this.deleteData(this.deletelist[i]).subscribe((result) => {

				console.log(result);
			}, (error) => {
				console.log(error);
			});
		}
	}


	postData(data: any) {
		let options = this.createRequestOptions();

		return this.http.post(`https://2f7wr.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets`, JSON.stringify(data),
			{
				headers: options
			});
	}

	deleteData(bucket_name) {
		console.log(bucket_name)
		let options = this.createRequestOptions();

		return this.http.delete(`https://2f7wrz7.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets/${bucket_name}`,
			{
				headers: options
			});
	}

	private createRequestOptions() {
		let headers = new HttpHeaders({
			"Content-Type": "application/json",
			"profile": "darshan"
		});
		return headers;
	}
}
