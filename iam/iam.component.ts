import {
	Component,
	OnInit
} from "@angular/core";
import {
	HttpClient,
	HttpHeaders
} from "@angular/common/http";
import * as dialogs from "tns-core-modules/ui/dialogs";
import {
	Page
} from "ui/page";
import {
	IAMService
} from "../services/iam.service"
@Component({
	selector: "Iam",
	moduleId: module.id,
	templateUrl: "./iam.component.html",
	styleUrls: ['./iam.component.css']
})
export class IamComponent implements OnInit {
	dialogOpen = false;

	deletelist = []

	counter = 0;
	userlist: String[] = this.iamservice.userlist;
	grouplist: String[] = this.iamservice.grouplist;
	constructor(page: Page, private http: HttpClient, private iamservice: IAMService) {
		page.actionBarHidden = true;
		page.statusBarStyle = "light";
	}


	ngOnInit(): void {

	}
	public OPTION: string;
	selected = false;
	onLongPress(username) {
		console.log(username);
		//this.selected = true;
		this.deletelist.push(username);
	}
	createUserDialog() {
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

	CreateUser(userlist) {


		var userarray: String[] = userlist.split(',');
		for (var i = 0; i < userarray.length; i++) {
			this.postData(userarray[i]).subscribe((result) => {

				console.log(result);
			}, (error) => {
				console.log(error);
			});

		}
		this.closeDialog()
		this.OPTION = "SUCCESS";
		this.showDialog();
	}
	DeleteUser() {

		for (var i = 0; i < this.deletelist.length; i++) {
			this.deleteData(this.deletelist[i]).subscribe((result) => {

				console.log(result);
			}, (error) => {
				console.log(error);
			});
		}
	}
	getusers() {


		this.getuserData().subscribe((result) => {
			this.userlist = [];
			result['users'].forEach(element => {
				console.log(element['Username']);
				this.userlist.push(element['Username']);
			});
		}, (error) => {
			console.log(error);
		});

	}

	getuserData() {
		let headers = this.createRequestHeader();
		return this.http.get('https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/iam/users?profile=darshan', {
			headers: headers
		});
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
		return this.http.get('https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/iam/groups?profile=darshan', {
			headers: headers
		});
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

		return this.http.post(`https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/iam/users/${data}?profile=darshan`, data, {

		});
	}

	deleteData(data: any) {
		console.log(data)

		return this.http.delete(`https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/iam/users/${data}?profile=darshan`, {

		});
	}

	private createRequestOptions() {
		let headers = new HttpHeaders({
			"Content-Type": "application/json"
		});
		return headers;
	}
}