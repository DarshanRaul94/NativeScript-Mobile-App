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
    // initilaze empty bucket strng arrays
    bucketlist: String[] = [];
    constructor(private http: HttpClient) { }
    // Function to send the  GET buckets call
    getbuckets() {


        this.getData().subscribe((result) => {
            this.bucketlist = result['buckets'];
            console.log(this.bucketlist);
        }, (error) => {
            console.log(error);
        });

    }
    // Function that actually sends the GET buckets call
    getData() {
        let headers = this.createRequestHeader();
        return this.http.get('https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets', { headers: headers });
    }

    // Common function used to create the HTTP headers
    private createRequestHeader() {
        // set headers here e.g.
        let headers = new HttpHeaders({

            "Content-Type": "application/json",
            "profile": "darshan"// TODO: Is static till now have to make it dynamic
        });

        return headers;
    }
    // Function that actually sends the POST buckets call
    postData(data: any) {
        let options = this.createRequestOptions();

        return this.http.post(`https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets`, JSON.stringify(data),
            {
                headers: options
            });
    }
    // Function that actually sends the DEL buckets call
    deleteData(bucket_name) {
        console.log(bucket_name)
        let options = this.createRequestOptions();

        return this.http.delete(`https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/s3/buckets/${bucket_name}`,
            {
                headers: options
            });
    }
    // Common function used to create the HTTP headers options
    private createRequestOptions() {
        let headers = new HttpHeaders({
            "Content-Type": "application/json",// TODO: Is static till now have to make it dynamic
            "profile": "darshan"
        });
        return headers;
    }
}