import { SearchBar } from "tns-core-modules/ui/search-bar";
import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular/router";
import { S3Service } from "../services/s3.service"
@Component({
	selector: "Main",
	moduleId: module.id,
	templateUrl: "./main.component.html",
	styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
	searchPhrase: string;
	onSearchSubmit(args): void {
		let searchBar = <SearchBar>args.object;
		console.log("You are searching for " + searchBar.text);
	}

	bucketcount = this.s3service.bucketlist.length;
	constructor(page: Page, private routerExtensions: RouterExtensions, private s3service: S3Service) {
		page.actionBarHidden = true;
		page.statusBarStyle = "light";
	}
	onS3Tap(): void {
		this.routerExtensions.navigate(["/s3"]);
	}
	ngOnInit(): void {
		this.getcounts();
	}

	getcounts() {
		(async () => {

			//load a progress bar here
			await this.delay(5000);

			// Do something after
			console.log('after delay')
			this.bucketcount = this.s3service.bucketlist.length;
		})();


	}

	delay(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}