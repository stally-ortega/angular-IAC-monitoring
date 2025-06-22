import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'financial-performance',
        loadComponent: () => import('@features/financial-performance/financial-performance.component').then(m => m.FinancialPerformanceComponent)
    },
    {
        path: 'model-performance',
        loadComponent: () => import('@features/model-perfomance/model-perfomance.component').then(m => m.ModelPerfomanceComponent)
    }
];
