import {Component} from "@angular/core";
import {Http, Response} from "@angular/http";

@Component({
    selector: "simple-http",
    template: `
        <h2>Basic Request</h2>
        <button type="button" (click)="makeRequest()">Make Request</button>
        <div *ngIf="loading">loading...</div>
        <pre>{{data | json}}</pre>
    `
})

export class SimpleHTTPComponent {
    data: Object;
    loading: boolean;

    constructor(public http: Http) {

    }

    makeRequest(): void {
        this.loading = true;
        this.http.request("http://jsonplaceholder.typicode.com/posts/1")
            .subscribe((response: Response) => {
                this.data = response.json();
                this.loading = false;
            })
    }
}