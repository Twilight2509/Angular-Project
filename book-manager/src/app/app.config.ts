// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; // Thêm provideRouter cho routing
import { provideHttpClient } from '@angular/common/http'; // HttpClient
import { routes } from './app.routes'; // Import routes
import { provideAnimations } from '@angular/platform-browser/animations'; // Thêm import này
import { provideNzIcons } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';

const icons = Object.values(AllIcons);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Sử dụng provideRouter thay vì { provide: 'routes', useValue: routes }
    provideHttpClient(), // HttpClient toàn cục
    provideAnimations(),
    provideNzIcons(icons) 
  ]
};