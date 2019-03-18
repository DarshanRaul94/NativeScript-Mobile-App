import { SearchBar } from "tns-core-modules/ui/search-bar";
import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { RouterExtensions } from "nativescript-angular/router";

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


	constructor(page: Page, private routerExtensions: RouterExtensions) {
		page.actionBarHidden = true;
		page.statusBarStyle = "light";
	}
	onS3Tap(): void {
		this.routerExtensions.navigate(["/s3"]);
	}
	ngOnInit(): void {
	}
}