import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable(
    // Instead of providers array you can use provideIn
    // Learn more https://angular.io/guide/providers
    // {
    //     providedIn: "root"
    // }
)
export class IAMService {

    counter = 0;
    userlist: String[] = [];
    grouplist: String[] = [];

    private serverUrl = "https://httpbin.org/get";

    constructor(private http: HttpClient) { }


    getusers() {


        this.getuserData().subscribe((result) => {
            this.userlist = [];
            result['users'].forEach(element => {
                console.log(element['Username']);
                this.userlist.push(element['Username']);
            });
        }, (error) => {
            console.log(error);
        });

    }

    getuserData() {
        let headers = this.createRequestHeader();
        return this.http.get('https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/iam/users', { headers: headers });
    }
    getgroups() {


        this.getgroupData().subscribe((result) => {
            this.grouplist = [];
            result['groups'].forEach(element => {
                console.log(element['Name']);
                this.grouplist.push(element['Name']);
            });
        }, (error) => {
            console.log(error);
        });

    }

    getgroupData() {
        let headers = this.createRequestHeader();
        return this.http.get('https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/iam/groups', { headers: headers });
    }

    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({

            "Content-Type": "application/json",
            "profile": "darshan"
        });

        return headers;
    }

    postuserData(data: any) {
        let options = this.createRequestOptions();

        return this.http.post(`https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/iam/users`, JSON.stringify(data),
            {
                headers: options
            });
    }

    deleteuserData(user_name) {

        let options = this.createRequestOptions();

        return this.http.delete(`https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/iam/users/${user_name}`,
            {
                headers: options
            });
    }
    postgroupData(data: any) {
        let options = this.createRequestOptions();

        return this.http.post(`https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/iam/groups`, JSON.stringify(data),
            {
                headers: options
            });
    }

    deletegroupData(group_name) {

        let options = this.createRequestOptions();

        return this.http.delete(`https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/iam/groups/${group_name}`,
            {
                headers: options
            });
    }
    private createRequestOptions() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "profile": "darshan"
        });
        return headers;
    }
}