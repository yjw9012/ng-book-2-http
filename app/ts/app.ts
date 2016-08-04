/*
 * Angular
 */
import {
  Component
} from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';

/*
 * Components
 */
import { SimpleHTTPComponent } from 'components/SimpleHTTPComponent';
import { YouTubeSearchComponent } from 'components/YouTubeSearchComponent';
import { MoreHTTPRequests } from 'components/MoreHTTPRequests';

/*
 * Injectables
 */
import { youtubeServiceInjectables } from "components/YouTubeSearchComponent";

/*
 * Webpack
 */
require('css/styles.scss');

@Component({
    selector: 'http-app',
    directives: [
        SimpleHTTPComponent, YouTubeSearchComponent, MoreHTTPRequests
    ],
    template: `
        <div class="container">
            <simple-http></simple-http>
            <youtube-search></youtube-search>
            <more-http></more-http>
        </div>
    `
})

class HttpApp {
}

bootstrap(HttpApp, [
  HTTP_PROVIDERS,  youtubeServiceInjectables
]);
