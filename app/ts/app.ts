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

/*
 * Webpack
 */
require('css/styles.scss');

@Component({
    selector: 'http-app',
    directives: [
        SimpleHTTPComponent
    ],
    template: `
        <div class="container">
            <simple-http></simple-http>
        </div>
    `
})

class HttpApp {
}

bootstrap(HttpApp, [
  HTTP_PROVIDERS
]);
