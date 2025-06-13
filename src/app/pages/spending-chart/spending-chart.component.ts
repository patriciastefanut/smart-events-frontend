import { Component, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { Spending } from '../../models/spending';
import { SpendingState } from '../../states/spending.state';

@Component({
  selector: 'app-spending-chart',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './spending-chart.component.html',
  styleUrl: './spending-chart.component.css'
})
export class SpendingChartComponent {
  spendings: Spending[] = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };
  public barChartType: ChartType = 'bar';

  constructor(private spendingState: SpendingState) {
    effect(() => {
      this.spendings = this.spendingState.spendings();
      this.updateChartData();
    });
  }

  updateChartData() {
    const grouped: Record<string, Map<string, number>> = {
      Cash: new Map(),
      Card: new Map(),
      'Bank Transfer': new Map(),
      Other: new Map()
    };

    for (const spend of this.spendingState.spendings()) {
      const dt = new Date(spend.date);
      const timeLabel = dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const label = `${dt.toISOString().split('T')[0]} ${timeLabel}`;
      const method = spend.paymentMethod;

      if (!grouped[method].has(label)) grouped[method].set(label, 0);
      grouped[method].set(label, grouped[method].get(label)! + spend.amount);
    }

    const allLabels = Array.from(new Set(
      Object.values(grouped).flatMap(map => Array.from(map.keys()))
    )).sort();

    this.barChartData = {
      labels: allLabels,
      datasets: Object.entries(grouped).map(([method, timeMap]) => ({
        data: allLabels.map(label => timeMap.get(label) ?? 0),
        label: method
      }))
    };
  }

}
