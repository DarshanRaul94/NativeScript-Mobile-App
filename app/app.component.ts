import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";


@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})

export class AppComponent {

    constructor(private routerExtensions: RouterExtensions) {
    }
    iamStyle = false;
    s3Style = false;
    awsStyle = true;
    ec2Style = false;
    rdsStyle = false;


    ngOnInit(): void {
    }

    onS3Tap(): void {
        this.routerExtensions.navigate(["/s3"]);
        this.s3Style = true;
        this.awsStyle = false;

    }
    onMainTap(): void {
        this.routerExtensions.navigate(["/main"]);
        this.s3Style = false;
        this.awsStyle = true;
    }




}
