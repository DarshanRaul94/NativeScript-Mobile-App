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

    CreateBucket(bucketname) {

        console.log(bucketname);
        this.postData(bucketname).subscribe((result) => {

            console.log(result);
        }, (error) => {
            console.log(error);
        });

  
    }
    DeleteBucket(bucketname) {

        console.log(bucketname);
        this.deleteData(bucketname).subscribe((result) => {

            console.log(result);
        }, (error) => {
            console.log(error);
        });
    }
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
        return this.http.get('https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/iam/users?profile=darshan', { headers: headers });
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
        return this.http.get('https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/iam/groups?profile=darshan', { headers: headers });
    }
    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({

            "Content-Type": "application/json",
        });

        return headers;
    }
    postData(data: any) {
        console.log(data)

        return this.http.post(`https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets/${data}?profile=darshan`, data,
            {

            });
    }

    deleteData(data: any) {
        console.log(data)

        return this.http.delete(`https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets/${data}?profile=madhavi`,
            {

            });
    }

    private createRequestOptions() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json"
        });
        return headers;
    }
}