import {Component, Injectable, Inject, bind, OnInit, ElementRef, EventEmitter} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

class SearchResult {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    videoUrl: string;

    constructor(obj?: any) {
        this.id = obj && obj.id || null;
        this.title = obj && obj.title || null;
        this.description = obj && obj.description || null;
        this.thumbnailUrl = obj && obj.thumbnailUrl || null;
        this.videoUrl = obj && obj.videoUrl || `https://www.youtube.com/watch?v=${this.id}`;
    }
}


export const YOUTUBE_API_KEY: string = "AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk";
export const YOUTUBE_API_URL: string = "https://www.googleapis.com/youtube/v3/search";

@Injectable()
export class YouTubeService {
    constructor(public http: Http,
                @Inject(YOUTUBE_API_KEY) private apiKey: string,
                @Inject(YOUTUBE_API_URL) private apiUrl: string) {
    }

    search(query: string): Observable<SearchResult[]> {
        const params: string[] = [
            `q=${query}`,
            `key=${this.apiKey}`,
            `part=snippet`,
            `type=video`,
            `maxResults=10`,
        ];

        const param: string = params.join("&");
        const queryUrl: string = `${this.apiUrl}?${param}`;

        return this.http.get(queryUrl)
            .map((response: Response) => {
                return response.json().items.map((item) => {
                    return new SearchResult({
                        id: item.id.videoId,
                        title: item.snippet.title,
                        description: item.snippet.description,
                        thumbnailUrl: item.snippet.thumbnails.high.url
                    });
                });
            });
    }
}

export var youtubeServiceInjectables: any[] = [
    bind(YouTubeService).toClass(YouTubeService),
    bind(YOUTUBE_API_KEY).toValue(YOUTUBE_API_KEY),
    bind(YOUTUBE_API_URL).toValue(YOUTUBE_API_URL)
];

@Component({
    selector: "search-box",
    outputs: ["loading", "results"],
    template: `
        <input type="text" class="form-control" autofocus placeholder="Search">
    `
})

export class SearchBoxComponent implements OnInit {
    loading: EventEmitter<boolean> = new EventEmitter<boolean>();
    results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

    constructor(public youtube: YouTubeService, private el: ElementRef) {

    }

    ngOnInit(): void {
        Observable.fromEvent(this.el.nativeElement, "keyup")
            .map((e: any) => e.target.value)
            .filter((text: string) => text.length > 1)
            .debounceTime(250)
            .do(() => this.loading.emit(true))
            .map((query: string) => this.youtube.search(query))
            .switch()
            .subscribe(
                (results: SearchResult[]) => {
                    this.loading.emit(false);
                    this.results.emit(results);
                }, (error: any) => {
                    this.loading.emit(false);
                }, () => {
                    this.loading.emit(false);
                }
            );
    }
}

@Component({
    selector: "search-result",
    inputs: ["result"],
    template: `
        <div class="col-sm-6 col-md-3">
            <div class="thumbnail">
                <img src="{{result.thumbnailUrl}}">
                <div class="caption">
                    <h3>{{result.title}}</h3>
                    <p>{{result.description}}</p>
                    <p><a href="{{result.videoUrl}}" class="btn btn-default" role="button">Watch</a></p>
                </div>
            </div>
        </div>
    `
})

export class SearchResultComponent {
    result: SearchResult;
}


@Component({
    selector: "youtube-search",
    directives: [SearchBoxComponent, SearchResultComponent],
    template: `
        <div class="container">
            <div class="page-header">
                <h1>
                    Youtube Search
                </h1>
            </div>
            <div class="row">
                <div class="input-group input-group-lg col-md-12">
                    <search-box (loading)="loading = $event" (results)="updateResults($event)"></search-box>
                </div>
            </div>
            <div class="row">
                <search-result *ngFor="let result of results" [result]="result"></search-result>
            </div>
        </div>
    `
})

export class YouTubeSearchComponent {
    results: SearchResult[];

    updateResults(results: SearchResult[]): void {
        this.results = results;
    }
}