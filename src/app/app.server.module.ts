import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { UniversalInterceptor } from 'app/universal-interceptor';
import { en_US, NZ_I18N, NzI18nModule } from 'ng-zorro-antd/i18n';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    HttpClientModule,
    NoopAnimationsModule,
    NzI18nModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UniversalInterceptor,
      multi: true,
    },
    { provide: NZ_I18N, useValue: en_US },
  ],
})
export class AppServerModule {
}
