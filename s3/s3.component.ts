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
		this.getbuckets()
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


		var bucketarray :String[]= bucketlist.split(',');
		for (var i = 0; i < bucketarray.length; i++) {
			this.postData(bucketarray[i]).subscribe((result) => {

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
	getbuckets() {


		this.getData().subscribe((result) => {
			this.bucketlist = result['buckets'];
			console.log(this.bucketlist);
		}, (error) => {
			console.log(error);
		});

	}

	getData() {
		let headers = this.createRequestHeader();
		return this.http.get('https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets?profile=darshan', { headers: headers });
	}

	private createRequestHeader() {
		// set headers here e.g.
		let headers = new HttpHeaders({

			"Content-Type": "application/json",
		});

		return headers;
	}
	postData(data: any) {
		console.log(data)

		return this.http.post(`https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets/${data}?profile=darshan`, data,
			{

			});
	}

	deleteData(data: any) {
		console.log(data)

		return this.http.delete(`https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets/${data}?profile=darshan`,
			{

			});
	}

	private createRequestOptions() {
		let headers = new HttpHeaders({
			"Content-Type": "application/json"
		});
		return headers;
	}
}