import { Component } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router"; //extentions router module

// import all the services
import { S3Service } from "./services/s3.service"
import { IAMService } from "./services/iam.service"
import { EC2Service } from "./services/ec2.service";

//declare the component
@Component({
    selector: "ns-app", // use <ns-app> to put this component in html
    templateUrl: "app.component.html" //location of html template of component
})

export class AppComponent {
    // initialze all the services and routers
    constructor(private routerExtensions: RouterExtensions, private s3service: S3Service, private iamservice: IAMService, private ec2service: EC2Service) {
    }
    // this is used to change tab colors when service is selected
    stylelist = [false, false, true, false, false];


    changetabstyle(number) {
        /*This function is used to 
        change the tab colors on service switch*/
        for (let i = 0; i < this.stylelist.length; i++) {

            this.stylelist[i] = false;
            this.stylelist[number] = true;
        }

    }
    // run all the get commands on component initialization
    ngOnInit(): void {
        this.s3service.getbuckets();
        this.iamservice.getusers();
        this.iamservice.getgroups();
        this.ec2service.getkeypairs();
    }



// Functions to switch to the appropriate component when service is selected
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
