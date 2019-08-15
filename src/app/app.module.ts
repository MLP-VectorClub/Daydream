import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, makeStateKey } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { fallbackLanguage, supportedLanguages } from 'app/app.config';
import { CoreModule } from 'app/core/core.module';
import { ErrorModule } from 'app/error/error.module';
import { FooterModule } from 'app/footer/footer.module';
import { HeaderModule } from 'app/header/header.module';
import { environment } from 'environments/environment';
import noop from 'lodash-es/noop';
import { InViewportModule } from 'ng-in-viewport';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { metaReducers, reducers } from './store/reducers';

export const NGRX_STATE = makeStateKey('NGRX_STATE');

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'mlpvectorclub' }),
    InViewportModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    environment.production ? [] : StoreDevtoolsModule.instrument({
      maxAge: 20,
    }),
    EffectsModule.forRoot([AppEffects]),
    TranslateModule.forRoot(),
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    HeaderModule,
    FooterModule,
    ErrorModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: (translate: TranslateService) => () => new Promise(resolve => {
        translate.addLangs(supportedLanguages);
        supportedLanguages.forEach(lang => {
          translate.setTranslation(lang, require(`../assets/i18n/${lang}.json`));
        });
        translate.use(fallbackLanguage).subscribe(noop, noop, resolve);
      }),
      deps: [TranslateService],
    },
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
