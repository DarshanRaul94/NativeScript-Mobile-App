import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { S3Service } from "./services/s3.service"

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})

export class AppComponent {

    constructor(private routerExtensions: RouterExtensions, private s3service:S3Service) {
    }

    stylelist = [false, false, true, false, false];


    changetabstyle(number) {

        for (let i = 0; i < this.stylelist.length; i++) {

            this.stylelist[i] = false;
            this.stylelist[number] = true;
        }

    }
    ngOnInit(): void {
        this.s3service.getbuckets();
    }

    onS3Tap(): void {
        this.routerExtensions.navigate(["/s3"]);
        this.changetabstyle(1);

    }

    onIamTap(): void {
        this.routerExtensions.navigate(["/iam"]);
        this.changetabstyle(0);

    }

    onEc2Tap(): void {
        this.routerExtensions.navigate(["/ec2"]);
        this.changetabstyle(3);

    }
    onMainTap(): void {
        this.routerExtensions.navigate(["/main"]);
        this.changetabstyle(2);
    }




}
