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
    // initilaze empty user and group strng arrays
    userlist: String[] = [];
    grouplist: String[] = [];



    constructor(private http: HttpClient) { }

    // Function to send the  GET users call
    getusers() {


        this.getuserData().subscribe((result) => {
            this.userlist = [];
            result['users'].forEach(element => {// Parsing the Usernames from the API response and adding to user array
                console.log(element['Username']);
                this.userlist.push(element['Username']);
            });
        }, (error) => {
            console.log(error);
        });

    }
    // Function that actually sends the GET users call
    getuserData() {
        let headers = this.createRequestHeader();
        return this.http.get('https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/iam/users', { headers: headers });
    }

    // Function to send the  GET groups call
    getgroups() {


        this.getgroupData().subscribe((result) => {
            this.grouplist = [];
            result['groups'].forEach(element => {// Parsing the groupnames from the API response and adding to group array
                console.log(element['Name']);
                this.grouplist.push(element['Name']);
            });
        }, (error) => {
            console.log(error);
        });

    }
    // Function that actually sends the GET groups call
    getgroupData() {
        let headers = this.createRequestHeader();
        return this.http.get('https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/iam/groups', { headers: headers });
    }



    // Common function used to create the HTTP headers
    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({

            "Content-Type": "application/json",
            "profile": "darshan"  // TODO: Is static till now have to make it dynamic
        });

        return headers;
    }


    // Function that actually sends the POST users call
    postuserData(data: any) {
        let options = this.createRequestOptions();

        return this.http.post(`https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/iam/users`, JSON.stringify(data),
            {
                headers: options
            });
    }
    // Function that actually sends the DEL users call
    deleteuserData(user_name) {

        let options = this.createRequestOptions();

        return this.http.delete(`https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/iam/users/${user_name}`,
            {
                headers: options
            });
    }
    // Function that actually sends the POST groups call
    postgroupData(data: any) {
        let options = this.createRequestOptions();

        return this.http.post(`https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/iam/groups`, JSON.stringify(data),
            {
                headers: options
            });
    }
    // Function that actually sends the DEL groups call
    deletegroupData(group_name) {

        let options = this.createRequestOptions();

        return this.http.delete(`https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/iam/groups/${group_name}`,
            {
                headers: options
            });
    }
    // Common function used to create the HTTP headers options
    private createRequestOptions() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "profile": "darshan"
        });
        return headers;
    }
}