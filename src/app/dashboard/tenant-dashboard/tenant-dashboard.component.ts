import { Component, OnInit, inject } from '@angular/core';
import { MainBoardReportDto } from '../../proxy/reports/models';
import { ReportService } from '../../proxy/report/report.service';

@Component({
  standalone: true,
  selector: 'app-tenant-dashboard',
  templateUrl: './tenant-dashboard.component.html'
  
})
export class TenantDashboardComponent implements OnInit {
  private reportService = inject(ReportService);

  reports: MainBoardReportDto[] = [];
  loading = true;

  /** Inserted by Angular inject() migration for backwards compatibility */
  

  constructor() {}

  ngOnInit() {
    this.reportService.getMainBoardReport().subscribe({
      next: (data) => {
        this.reports = data;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }
}