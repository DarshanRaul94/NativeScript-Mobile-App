//// MAIN MODULE





import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client"; //HTTP module
import { AppRoutingModule } from "./app-routing.module"; //routing module
import { AppComponent } from "./app.component"; //root component
// sub components
import { DetailComponent } from "./detail/detail.component";
import { MainComponent } from "./maindashboard/main.component";
import { S3Component } from "./s3/s3.component";
import { IamComponent } from "./iam/iam.component";
import { Ec2Component } from "./ec2/ec2.component";
import { NgShadowModule } from "./nativescript-ng-shadow";


// Services
import { S3Service } from "./services/s3.service";
import { IAMService } from "./services/iam.service";
import { EC2Service } from "./services/ec2.service";


@NgModule({
    bootstrap: [ //making Appcomponent the bootstrap module
        AppComponent
    ],
    imports: [ // import all the modules
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        NgShadowModule
    ],
    declarations: [ // declare all the components
        AppComponent,
        DetailComponent,
        MainComponent,
        S3Component,
        IamComponent,
        Ec2Component


    ],
    providers: [S3Service, IAMService,EC2Service] // declare all the services
    ,
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule {

//Leaving blank may add later

 }
