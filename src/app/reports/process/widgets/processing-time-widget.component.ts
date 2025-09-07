import { Component, Input, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSharedModule } from '@abp/ng.theme.shared'; 
import { ReportService } from '../../../proxy/report/report.service';
import { ApplicationProcessingTimeDto } from '../../../proxy/reports/models';



@Component({
  standalone: true,
  selector: 'app-processing-time-widget',
  templateUrl: './processing-time-widget.component.html',
  imports: [CommonModule, ThemeSharedModule], 
})
export class ProcessingTimeWidgetComponent {
  private reportService = inject(ReportService);
  private cdr = inject(ChangeDetectorRef);

  @Input() height = 200;
  data?: ApplicationProcessingTimeDto;

  /** Inserted by Angular inject() migration for backwards compatibility */
  constructor(...args: unknown[]);

  constructor() {}

  draw({ startDate, endDate }: { startDate: string; endDate: string }) {
    this.reportService.getApplicationProcessingTime(startDate, endDate).subscribe((res) => {
      this.data = res;
      this.cdr.detectChanges();
    });

  }
}
