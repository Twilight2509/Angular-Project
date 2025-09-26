import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxApexchartsModule } from 'ngx-apexcharts';
import { IconDefinition } from '@ant-design/icons-angular';
import { HomeOutline, DashboardOutline } from '@ant-design/icons-angular/icons';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';

const icons: IconDefinition[] = [HomeOutline, DashboardOutline];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    importProvidersFrom(NzIconModule.forRoot(icons), NgxApexchartsModule)
  ]
}).catch(err => console.error(err));
