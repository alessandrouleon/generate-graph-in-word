import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportInWordUseCase } from '../usecase/report-in-word.usecase';

@Controller('word-report')
export class ReporInWordController {
  constructor(private readonly reportService: ReportInWordUseCase) {}

  @Get()
  async generateReport(@Res() res: Response) {
    const reportBuffer = await this.reportService.gerarRelatorio();
    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Content-Disposition': 'attachment; filename=word_report.docx',
    });
    res.send(reportBuffer);
  }
}
