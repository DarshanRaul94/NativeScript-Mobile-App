import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DetailComponent } from "./detail/detail.component";
import { MainComponent } from "./maindashboard/main.component";
import { S3Component } from "./s3/s3.component";
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        DetailComponent,
        MainComponent,
        S3Component


    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
