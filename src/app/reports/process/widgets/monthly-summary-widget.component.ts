import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportService } from '../../../proxy/report/report.service';
import { DailySummaryDto } from '../../../proxy/reports/models';

import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexLegend,
  ApexTooltip,
  ApexGrid,
  ApexMarkers,
} from 'ng-apexcharts';

@Component({
  standalone: true,
  selector: 'app-monthly-summary-widget',
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './monthly-summary-widget.component.html',
})
export class MonthlySummaryWidgetComponent implements OnChanges {
  @Input() height = 300;

  tableData: DailySummaryDto[] = [];

  // Apex options
  series: ApexAxisChartSeries = [];
  chart: ApexChart = {
    type: 'line',
    height: 300,
    toolbar: { show: false },
    zoom: { enabled: false },
    animations: { enabled: true }
  };
  xaxis: ApexXAxis = {
    categories: [],
    tickPlacement: 'on',
    labels: { rotate: -45 }
  };
  dataLabels: ApexDataLabels = { enabled: false };
  stroke: ApexStroke = { curve: 'smooth', width: 2 };
  legend: ApexLegend = { position: 'top', horizontalAlign: 'left' };
  tooltip: ApexTooltip = { x: { format: 'yyyy-MM-dd' } };
  grid: ApexGrid = { strokeDashArray: 4, padding: { left: 12, right: 12 } };
  markers: ApexMarkers = { size: 0 };
  colors: string[] = ['#4caf50', '#2196f3', '#ff9800']; // Yeni Kullanıcılar / Başvurular / Ödemeler

  constructor(private reportService: ReportService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['height']) {
      this.chart = { ...this.chart, height: this.height || 300 };
    }
  }

  draw({ startDate, endDate }: { startDate: string; endDate: string }) {
    this.reportService.getMonthlySummary(startDate, endDate).subscribe((data) => {
      this.tableData = data;

      const labels = data.map(x => x.date);
      const yeniKullanicilar = data.map(x => x.newUsers);
      const yeniBasvurular   = data.map(x => x.newApplications);
      const yeniOdemeler     = data.map(x => x.newPayments);

      this.series = [
        { name: 'Yeni Kullanıcılar', data: yeniKullanicilar },
        { name: 'Yeni Başvurular',   data: yeniBasvurular },
        { name: 'Yeni Ödemeler',     data: yeniOdemeler },
      ];
      this.xaxis = { ...this.xaxis, categories: labels };
      this.chart = { ...this.chart, height: this.height || 300 };
    });
  }
}
