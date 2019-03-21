import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page } from "ui/page";
import { IAMService } from "../services/iam.service"
@Component({
	selector: "Iam",
	moduleId: module.id,
	templateUrl: "./iam.component.html",
	styleUrls: ['./iam.component.css']
})
export class IamComponent implements OnInit {
	dialogOpen = false;



	counter = 0;
	userlist: String[] = this.iamservice.userlist;
	grouplist: String[] = this.iamservice.grouplist;
	constructor(page: Page, private http: HttpClient, private iamservice: IAMService) {
		page.actionBarHidden = true;
		page.statusBarStyle = "light";
	}


	ngOnInit(): void {
		this.getusers();

	}
	public OPTION: string;
	selected = false;
	onLongPress(args) {
		console.log("LongPress!");
		this.selected = true;
	}
	createBucketDialog() {
		this.OPTION = "CREATE";
		this.showDialog();
	}
	deleteBucketDialog() {
		this.getusers()
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

	CreateBucket(bucketname) {

		console.log(bucketname);
		this.postData(bucketname).subscribe((result) => {

			console.log(result);
		}, (error) => {
			console.log(error);
		});

		this.closeDialog()
		this.OPTION = "SUCCESS";
		this.showDialog();
	}
	DeleteBucket(bucketname) {

		console.log(bucketname);
		this.deleteData(bucketname).subscribe((result) => {

			console.log(result);
		}, (error) => {
			console.log(error);
		});
	}
	getusers() {

		(async () => {
			// Do something before delay
			console.log('before delay')
			this.iamservice.getusers();

			await this.delay(3000);

			// Do something after
			console.log('after delay')
			this.userlist = this.iamservice.userlist
		})();



	}
	delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	getgroups() {


		this.getgroupData().subscribe((result) => {
			this.grouplist = [];
			result['groups'].forEach(element => {
				console.log(element['Name']);
				this.grouplist.push(element['Name']);
			});
		}, (error) => {
			console.log(error);
		});

	}

	getgroupData() {
		let headers = this.createRequestHeader();
		return this.http.get('https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/iam/groups?profile=darshan', { headers: headers });
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

		return this.http.delete(`https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets/${data}?profile=madhavi`,
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
