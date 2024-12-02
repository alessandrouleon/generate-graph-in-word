// import { Injectable } from '@nestjs/common';
// import { createReport } from 'docx-templates';
// import * as fs from 'fs';
// import * as path from 'path';
// import { word } from 'src/utils/repost-for-word';
// import { BarChartUseCase } from './bar-chart.usecase';
// import { LineChartUseCase } from './line-chart.usecase';
// import { LinesChartUseCase } from './lines-chart.usecase';
// import { PieChartUseCase } from './pie-chart.usecase';

// @Injectable()
// export class ReportInWordUseCase {
//   constructor(
//     private readonly linesChartUseCase: LinesChartUseCase,
//     private readonly barChartUseCase: BarChartUseCase,
//     private readonly lineChartUseCase: LineChartUseCase,
//     private readonly pieChartUseCase: PieChartUseCase,
//   ) {}

//   private data = {
//     ...word,
//     dynamicDefinition: 'Testo dinâmico.',
//   };

//   async gerarRelatorio(): Promise<Buffer> {
//     const templatePath = path.resolve(process.cwd(), 'template.docx');
//     const template = fs.readFileSync(templatePath);

//     // Obter gráficos dinamicamente gerados
//     const chart1Buffer = await this.linesChartUseCase.getChartImage(); // Chama o método que gera o gráfico
//     const chart2Buffer = await this.barChartUseCase.getChartImage();
//     const chart3Buffer = await this.lineChartUseCase.getChartImage(); // Ou gere outro gráfico se necessário
//     const chart4Buffer = await this.pieChartUseCase.getChartImage();

//     // Função para converter gráficos gerados em base64
//     const getDynamicGraphImage = (
//       buffer: Buffer,
//       width: number,
//       height: number,
//     ) => {
//       const base64Data = buffer.toString('base64');
//       return {
//         width, // Largura em cm
//         height, // Altura em cm
//         data: base64Data,
//         extension: '.png',
//       };
//     };

//     // Imagens dinâmicas
//     const dynamicImage1 = () => getDynamicGraphImage(chart1Buffer, 16, 8);
//     const dynamicImage2 = () => getDynamicGraphImage(chart2Buffer, 16, 8);
//     const dynamicImage3 = () => getDynamicGraphImage(chart3Buffer, 16, 8);
//     const dynamicImage4 = () => getDynamicGraphImage(chart4Buffer, 16, 8);

//     try {
//       const uint8Array = await createReport({
//         template,
//         data: this.data,
//         additionalJsContext: {
//           staticImage1: dynamicImage1, // Substitui pela imagem dinâmica 1
//           staticImage2: dynamicImage2, // Substitui pela imagem dinâmica 2
//           staticImage3: dynamicImage3, // Substitui pela imagem dinâmica 3
//           staticImage4: dynamicImage4, // Substitui pela imagem dinâmica 4
//         },
//       });

//       const buffer = Buffer.from(uint8Array);
//       return buffer;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

import { Injectable } from '@nestjs/common';
import { createReport } from 'docx-templates';
import * as fs from 'fs';
import * as path from 'path';
import { word } from 'src/utils/repost-for-word';
import { BarChartUseCase } from './bar-chart.usecase';
import { LineChartUseCase } from './line-chart.usecase';
import { LinesChartUseCase } from './lines-chart.usecase';
import { PieChartUseCase } from './pie-chart.usecase';
@Injectable()
export class ReportInWordUseCase {
  constructor(
    private readonly linesChartUseCase: LinesChartUseCase,
    private readonly barChartUseCase: BarChartUseCase,
    private readonly lineChartUseCase: LineChartUseCase,
    private readonly pieChartUseCase: PieChartUseCase,
  ) {}

  private data = {
    ...word,
  };

  async gerarRelatorio(): Promise<Buffer> {
    const templatePath = path.resolve(process.cwd(), 'template.docx');
    const template = fs.readFileSync(templatePath);

    // Geração do gráfico com dados dinâmicos
    const chart1Buffer = await this.linesChartUseCase.getChartImage(word.lines);
    const chart2Buffer = await this.barChartUseCase.getChartImage(word.bars);
    const chart3Buffer = await this.lineChartUseCase.getChartImage(word.line);
    const chart4Buffer = await this.pieChartUseCase.getChartImage(word.piers);

    const getDynamicGraphImage = (
      buffer: Buffer,
      width: number,
      height: number,
    ) => {
      const base64Data = buffer.toString('base64');
      return {
        width, // Largura em cm
        height, // Altura em cm
        data: base64Data,
        extension: '.png',
      };
    };

    const dynamicImage1 = () => getDynamicGraphImage(chart1Buffer, 16, 8);
    const dynamicImage2 = () => getDynamicGraphImage(chart2Buffer, 16, 8);
    const dynamicImage3 = () => getDynamicGraphImage(chart3Buffer, 16, 8);
    const dynamicImage4 = () => getDynamicGraphImage(chart4Buffer, 16, 8);

    try {
      const uint8Array = await createReport({
        template,
        data: this.data,
        additionalJsContext: {
          staticImage1: dynamicImage1,
          staticImage2: dynamicImage2,
          staticImage3: dynamicImage3,
          staticImage4: dynamicImage4,
        },
      });

      const buffer = Buffer.from(uint8Array);
      return buffer;
    } catch (error) {
      throw error;
    }
  }
}
