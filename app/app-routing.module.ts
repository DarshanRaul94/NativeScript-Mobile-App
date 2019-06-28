import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";


// Import all the components
import { DetailComponent } from "./detail/detail.component";
import { MainComponent } from "./maindashboard/main.component";
import { IamComponent } from "./iam/iam.component";
import { Ec2Component } from "./ec2/ec2.component";
import { S3Component } from "./s3/s3.component";


// initialize all the routes
const routes: Routes = [
    { path: "", redirectTo: "/main", pathMatch: "full" }, // whenever the app starts MainComponent will open
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
