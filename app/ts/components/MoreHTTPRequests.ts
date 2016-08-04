import {Component, Injectable, Inject, bind, OnInit, ElementRef, EventEmitter} from "@angular/core";
import {Http, Response} from "@angular/http";
import {JsonPipe, CORE_DIRECTIVES} from "@angular/common";

@Component({
    selector: "more-http",
    template: `
        <h2>More Requests</h2>
        <button type="button" (click)="makePost()">Make Post</button>
        <button type="button" (click)="makeDelete()">Make Delete</button>
        <button type="button" (click)="makeHeaders()">Make Headers</button>
        <div *ngIf="loading">loading...</div>
        <pre>{{data | json}}</pre>
    `,
    directives: [CORE_DIRECTIVES],
    pipes: [JsonPipe]
})

export class MoreHTTPRequests {
    data: Object;
    loading: boolean;

    constructor(public http: Http) {}

    makePost(): void {

    }

    makeDelete(): void {
        this.loading = true;
        this.http.delete("http://jsonplaceholder.typicode.com/posts/1")
            .subscribe((res: Response) => {
                this.data = res.json();
                this.loading = false;
            })
    }

    makeHeaders(): void {

    }
}