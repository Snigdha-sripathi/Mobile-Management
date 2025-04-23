import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RoutesRecognized } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // ✅ Add this import
 // ✅ Import your routes 
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideRouter(appRoutes)  // ✅ Add this line to enable HTTP requests
  ]
};
