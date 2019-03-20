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
    bucketlist: String[] = [];
    constructor(private http: HttpClient) { }

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
        return this.http.get('https://2f7wr6b.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets', { headers: headers });
    }

    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({

            "Content-Type": "application/json",
            "profile": "darshan"
        });

        return headers;
    }
    
}
