import { Module } from '@nestjs/common';
import { ReporInWordController } from './controller/report-in-word.controller';
import { BarChartUseCase } from './usecase/bar-chart.usecase';
import { LineChartUseCase } from './usecase/line-chart.usecase';
import { LinesChartUseCase } from './usecase/lines-chart.usecase';
import { PieChartUseCase } from './usecase/pie-chart.usecase';
import { ReportInWordUseCase } from './usecase/report-in-word.usecase';

@Module({
  imports: [],
  controllers: [ReporInWordController],
  providers: [
    ReportInWordUseCase,
    LinesChartUseCase,
    BarChartUseCase,
    LineChartUseCase,
    PieChartUseCase,
  ],
})
export class AppModule {}
