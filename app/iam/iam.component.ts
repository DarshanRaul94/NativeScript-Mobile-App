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
	deleteuserlist = []
	deletegrouplist = []
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
	onLongPressuser(username) {

		//this.selected = true;
		this.deleteuserlist.push(username);
		console.log(this.deleteuserlist);
	}
	onLongPressgroup(groupname) {

		//this.selected = true;
		this.deletegrouplist.push(groupname);
		console.log(this.deletegrouplist);
	}
	createUserDialog() {
		this.OPTION = "CREATEUSER";
		this.showDialog();
	}
	deleteUserDialog() {

		this.OPTION = "DELETEUSER";
		this.showDialog();
	}
	createGroupDialog() {
		this.OPTION = "CREATEGROUP";
		this.showDialog();
	}
	deleteGroupDialog() {

		this.OPTION = "DELETEGROUP";
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

		(async () => {
			var userarray: String[] = userlist.split(',');
			for (var i = 0; i < userarray.length; i++) {
				this.iamservice.postuserData({ "user_name": userarray[i] }).subscribe((result) => {

					console.log(result);
				}, (error) => {
					console.log(error);
				});

			}
			//load a progress bar here
			await this.delay(5000);

			// Do something after
			console.log('after delay')
			this.getusers(5000);
			this.closeDialog()
			this.OPTION = "SUCCESS";
			this.showDialog();
		})();
	}
	DeleteUser() {
		(async () => {
			for (var i = 0; i < this.deleteuserlist.length; i++) {
				this.iamservice.deleteuserData(this.deleteuserlist[i]).subscribe((result) => {

					console.log(result);
				}, (error) => {
					console.log(error);
				});
			}
			//load a progress bar here
			await this.delay(5000);

			// Do something after
			console.log('after delay')
			this.getusers(3000);
			this.closeDialog()
			this.OPTION = "SUCCESS";
			this.showDialog();
		})();
	}

	CreateGroup(grouplist) {

		(async () => {
			var grouparray: String[] = grouplist.split(',');
			for (var i = 0; i < grouparray.length; i++) {
				this.iamservice.postgroupData({ "group_name": grouparray[i] }).subscribe((result) => {

					console.log(result);
				}, (error) => {
					console.log(error);
				});

			}
			//load a progress bar here
			await this.delay(5000);

			// Do something after
			console.log('after delay')
			this.getgroups(3000);
			this.closeDialog()
			this.OPTION = "SUCCESS";
			this.showDialog();
		})();
	}
	DeleteGroup() {
		(async () => {
			for (var i = 0; i < this.deletegrouplist.length; i++) {
				this.iamservice.deletegroupData(this.deletegrouplist[i]).subscribe((result) => {

					console.log(result);
				}, (error) => {
					console.log(error);
				});
			}
			//load a progress bar here
			await this.delay(5000);

			// Do something after
			console.log('after delay')
			this.getgroups(3000);
			this.closeDialog()
			this.OPTION = "SUCCESS";
			this.showDialog();
		})();
	}

	getusers(miliseconds) {

		(async () => {
			// Do something before delay
			console.log('before delay')
			this.iamservice.getusers();

			await this.delay(miliseconds);

			// Do something after
			console.log('after delay')
			this.userlist = this.iamservice.userlist
		})();



	}
	getgroups(miliseconds) {

		(async () => {
			// Do something before delay
			console.log('before delay')
			this.iamservice.getgroups();

			await this.delay(miliseconds);

			// Do something after
			console.log('after delay')
			this.grouplist = this.iamservice.grouplist
		})();



	}
	delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}


}