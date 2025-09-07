import { Component, Input, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexLegend,
  ApexTooltip,
  ApexResponsive
} from 'ng-apexcharts';

import { ReportService } from '../../../proxy/report/report.service';
import { SupplierReportDto } from '../../../proxy/reports/models';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  legend?: ApexLegend;
  tooltip?: ApexTooltip;
  responsive?: ApexResponsive[];
};

@Component({
  standalone: true,
  selector: 'app-supplier-report-widget',
  templateUrl: './supplier-report-widget.component.html',
  imports: [CommonModule, NgApexchartsModule],
})
export class SupplierReportWidgetComponent {
  private reportService = inject(ReportService);
  private cdr = inject(ChangeDetectorRef);

  @Input() height = 350;

  chartOptions: Partial<ChartOptions> = {};

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  draw({ startDate, endDate }: { startDate: string; endDate: string }) {
    this.reportService.getSupplierReport(startDate, endDate).subscribe((data: SupplierReportDto[]) => {
      this.chartOptions = {
        series: data.map(x => x.totalPaid),
        labels: data.map(x => x.supplierName),
        chart: {
          type: 'pie',
          height: this.height
        },
        tooltip: {
          y: {
            formatter: val => `€ ${val.toLocaleString()}`
          }
        },
        legend: {
          position: 'right'
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }
        ]
      };

      this.cdr.detectChanges();
    });
  }
}
