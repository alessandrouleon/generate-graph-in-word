// import { Injectable } from '@nestjs/common';
// import { ChartConfiguration } from 'chart.js';
// import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

// @Injectable()
// export class LineChartUseCase {
//   private readonly chartJSNodeCanvas: ChartJSNodeCanvas;

//   constructor() {
//     this.chartJSNodeCanvas = new ChartJSNodeCanvas({
//       width: 1000, // Largura do gráfico
//       height: 400, // Altura do gráfico
//     });
//   }

//   // Método para calcular a distribuição normal
//   private calculateNormalDistribution(
//     mean: number,
//     stdDev: number,
//     xValues: number[],
//   ): number[] {
//     const factor = 1 / (stdDev * Math.sqrt(2 * Math.PI));
//     return xValues.map(
//       (x) => factor * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2)),
//     );
//   }

//   // Método para gerar os dados
//   private getData() {
//     const mean = 15; // Média
//     const stdDev = 5; // Desvio padrão
//     const xValues = Array.from({ length: 100 }, (_, i) => i * 0.35); // Intervalo de temperatura de 0 a 35°C
//     const yValues = this.calculateNormalDistribution(mean, stdDev, xValues);
//     return { xValues, yValues };
//   }

//   // Método para gerar a imagem do gráfico
//   async getChartImage(): Promise<Buffer> {
//     const data = this.getData(); // Obtém os dados
//     const configuration: ChartConfiguration<'line'> = {
//       type: 'line',
//       data: {
//         labels: data.xValues.map((x) => x.toFixed(2)), // Formata os valores do eixo X
//         datasets: [
//           {
//             label: 'Distribuição Normal',
//             data: data.yValues,
//             borderColor: 'red',
//             borderWidth: 2,
//             fill: false, // Remove preenchimento
//             pointRadius: 0, // Remove os pontos no gráfico
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: { display: false },
//           title: {
//             display: true,
//             text: 'Curva de distribuição normal: Dados de temperaturas registradas no sensor externo',
//             font: { size: 16 },
//           },
//         },
//         scales: {
//           x: {
//             title: { display: true, text: 'Temperatura (°C)' },
//           },
//           y: {
//             title: {
//               display: true,
//               text: 'FDM (Função Densidade de Probabilidade)',
//             },
//             beginAtZero: true,
//           },
//         },
//       },
//     };

//     return this.chartJSNodeCanvas.renderToBuffer(configuration);
//   }
// }

import { Injectable } from '@nestjs/common';
import { ChartConfiguration } from 'chart.js';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';
import { LineChirtData } from './word-interface.usecase';

@Injectable()
export class LineChartUseCase {
  private readonly chartJSNodeCanvas: ChartJSNodeCanvas;

  constructor() {
    this.chartJSNodeCanvas = new ChartJSNodeCanvas({
      width: 1000, // Largura do gráfico
      height: 400, // Altura do gráfico
    });
  }

  // Método para calcular a distribuição normal
  private calculateNormalDistribution(
    mean: number,
    stdDev: number,
    xValues: number[],
  ): number[] {
    const factor = 1 / (stdDev * Math.sqrt(2 * Math.PI));
    return xValues.map(
      (x) => factor * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2)),
    );
  }

  // Método para gerar os dados
  private getData({ mean, stdDev }: LineChirtData) {
    const xValues = Array.from({ length: 100 }, (_, i) => i * 0.35); // Intervalo de temperatura de 0 a 35°C
    const yValues = this.calculateNormalDistribution(mean, stdDev, xValues);
    return { xValues, yValues };
  }

  // Método para gerar a imagem do gráfico
  async getChartImage({ mean, stdDev }: LineChirtData): Promise<Buffer> {
    const data = this.getData({ mean, stdDev }); // Obtém os dados
    const configuration: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: data.xValues.map((x) => x.toFixed(2)), // Formata os valores do eixo X
        datasets: [
          {
            label: 'Distribuição Normal',
            data: data.yValues,
            borderColor: 'red',
            borderWidth: 2,
            fill: false, // Remove preenchimento
            pointRadius: 0, // Remove os pontos no gráfico
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Curva de distribuição normal: Dados de temperaturas registradas no sensor externo',
            font: { size: 16 },
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'Temperatura (°C)' },
          },
          y: {
            title: {
              display: true,
              text: 'FDM (Função Densidade de Probabilidade)',
            },
            beginAtZero: true,
          },
        },
      },
    };

    return this.chartJSNodeCanvas.renderToBuffer(configuration);
  }
}
