import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable(
    // Instead of providers array you can use provideIn
    // Learn more https://angular.io/guide/providers
    // {
    //     providedIn: "root"
    // }
)
export class S3Service {
    private serverUrl = "https://httpbin.org/get";
    bucketlist;
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
    getbuckets() {


        this.getData().subscribe((result) => {
            this.bucketlist = result['buckets'];
            console.log(this.bucketlist);
        }, (error) => {
            console.log(error);
        });

    }

    getData() {
        let headers = this.createRequestHeader();
        return this.http.get('https://8gyb026tdg.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets?profile=darshan', { headers: headers });
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