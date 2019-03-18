import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { Page } from "ui/page";

@Component({
	selector: "Ec2",
	moduleId: module.id,
	templateUrl: "./ec2.component.html",
	styleUrls: ['./ec2.component.css']
})
export class Ec2Component implements OnInit {

	constructor(page: Page, private http: HttpClient) {
		page.actionBarHidden = true;
		page.statusBarStyle = "light";
	}
	ngOnInit(): void {
	}
}