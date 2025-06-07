import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para ngIf, ngClass, etc.
import { Kpi } from '../../models/interface/kpi.model';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpi-card.component.html',
  styleUrls: ['./kpi-card.component.scss']
})
export class KpiCardComponent {
  @Input() kpiData?: Kpi; // Recibe los datos del KPI
}
