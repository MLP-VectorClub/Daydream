import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { fallbackLanguage, localStorageKeys, supportedLanguages } from 'app/app.config';
import { CoreModule } from 'app/core/core.module';
import { ErrorModule } from 'app/error/error.module';
import { FooterModule } from 'app/footer/footer.module';
import { HeaderModule } from 'app/header/header.module';
import { noop } from 'lodash';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppEffects } from './app.effects';
import { metaReducers, reducers } from './store/reducers';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
        let useLanguage = localStorage.getItem(localStorageKeys.language);
        if (!supportedLanguages.includes(useLanguage))
          useLanguage = fallbackLanguage;
        translate.use(useLanguage).subscribe(noop, noop, resolve);
      }),
      deps: [TranslateService],
    },
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
