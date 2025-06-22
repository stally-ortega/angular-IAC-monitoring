import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'financial-performance',
        loadComponent: () => import('@features/financial-performance.component/financial-performance.component').then(m => m.FinancialPerformanceComponent)
    }
];
