import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DetailComponent } from "./detail/detail.component";
import { MainComponent } from "./maindashboard/main.component";
import { S3Component } from "./s3/s3.component";
import { IamComponent } from "./iam/iam.component";
import { Ec2Component } from "./ec2/ec2.component";
import { NgShadowModule } from "./nativescript-ng-shadow";

import { S3Service } from "./services/s3.service";
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        NgShadowModule
    ],
    declarations: [
        AppComponent,
        DetailComponent,
        MainComponent,
        S3Component,
        IamComponent,
        Ec2Component


    ],
    providers: [S3Service]
    ,
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
