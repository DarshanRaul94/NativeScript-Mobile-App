import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { DetailComponent } from "./detail/detail.component";
import { MainComponent } from "./maindashboard/main.component";
import { IamComponent } from "./iam/iam.component";
import { Ec2Component } from "./ec2/ec2.component";
import { S3Component } from "./s3/s3.component";

const routes: Routes = [
    { path: "", redirectTo: "/main", pathMatch: "full" },
    { path: 'main', component: MainComponent },
    { path: 's3', component: S3Component },
    { path: 'iam', component: IamComponent },
    { path: 'ec2', component: Ec2Component }



];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
