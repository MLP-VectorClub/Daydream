import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, makeStateKey } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CSRF_COOKIE_NAME, fallbackLanguage, supportedLanguages } from 'app/app.config';
import { CoreModule } from 'app/core/core.module';
import { ErrorModule } from 'app/error/error.module';
import { FooterModule } from 'app/footer/footer.module';
import { HeaderModule } from 'app/header/header.module';
import { environment } from 'environments/environment';
import { noop } from 'lodash-es';
import { InViewportModule } from 'ng-in-viewport';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { metaReducers, reducers } from './store/reducers';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ENDPOINTS } from './shared/endpoints';
import { CookieService } from 'ngx-cookie-service';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';

export const NGRX_STATE = makeStateKey('NGRX_STATE');

registerLocaleData(en);

const getHighlightLanguages = () => ({
  json: () => import('highlight.js/lib/languages/json'),
});

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    InViewportModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    environment.production ? [] : StoreDevtoolsModule.instrument({
      maxAge: 20,
    }),
    EffectsModule.forRoot([AppEffects]),
    TranslateModule.forRoot(),
    FormsModule,
    HttpClientModule,
    CoreModule,
    HeaderModule,
    FooterModule,
    ErrorModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule,
    HighlightModule,
  ],
  providers: [
    CookieService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (translate: TranslateService, http: HttpClient, cookies: CookieService) => () => new Promise(resolve => {
        translate.addLangs(supportedLanguages);
        supportedLanguages.forEach(lang => {
          translate.setTranslation(lang, require(`../assets/i18n/${lang}.json`));
        });
        translate.use(fallbackLanguage).subscribe(noop, noop, () => {
          if (!cookies.check(CSRF_COOKIE_NAME))
            http.get(ENDPOINTS.CSRF_INIT).subscribe(noop, noop, resolve);
          else resolve();
        });
      }),
      deps: [TranslateService, HttpClient, CookieService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages()
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
