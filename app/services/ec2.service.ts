/*


THIS CODE IS STILL IN PROGRESS

 */






import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable(
    // Instead of providers array you can use provideIn
    // Learn more https://angular.io/guide/providers
    // {
    //     providedIn: "root"
    // }
)
export class EC2Service {
    // initilaze empty keypair strng arrays
    keypairlist: String[] = [];
    constructor(private http: HttpClient) { }

    getkeypairs() {


        this.getkeypairData().subscribe((result) => {
            this.keypairlist = result['keypairs'];
            console.log(this.keypairlist);
        }, (error) => {
            console.log(error);
        });

    }

    getkeypairData() {
        let headers = this.createRequestHeader();
        return this.http.get('https://2f7wrz7c6b.execute-api.ap-south-1.amazonaws.com/dev/ec2/keypairs', { headers: headers });
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