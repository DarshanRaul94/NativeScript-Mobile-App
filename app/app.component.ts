import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {

    constructor(private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
    }

    onS3Tap(): void {
        this.routerExtensions.navigate(["/s3"]);
    }
    onMainTap(): void {
        this.routerExtensions.navigate(["/main"]);
    }




}
