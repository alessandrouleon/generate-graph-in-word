// import { Injectable } from '@nestjs/common';
// import { ChartConfiguration } from 'chart.js';
// import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

// @Injectable()
// export class LinesChartUseCase {
//   private readonly chartJSNodeCanvas: ChartJSNodeCanvas;

//   constructor() {
//     this.chartJSNodeCanvas = new ChartJSNodeCanvas({
//       width: 1000, // Largura do gráfico
//       height: 400, // Altura do gráfico
//     });
//   }

//   // Método para obter os dados
//   private getData() {
//     return {
//       timestamps: [
//         '31/10 7:00',
//         '31/10 7:30',
//         '31/10 8:00',
//         '31/10 8:30',
//         '01/11 9:00',
//         '01/11 9:30',
//         '01/11 10:00',
//         '01/11 10:30',
//       ],
//       internalTemperatures: [10, 12, 13, 15, 16, 19, 18, 19],
//       externalTemperatures: [30, 28, 27, 25, 70, 24, 25, 26],
//       limit: 25, // Limite de temperatura
//     };
//   }

//   // Método para gerar a imagem do gráfico
//   async getChartImage(): Promise<Buffer> {
//     const data = this.getData(); // Obtém os dados
//     const configuration: ChartConfiguration<'line'> = {
//       type: 'line',
//       data: {
//         labels: data.timestamps,
//         datasets: [
//           {
//             label: `Limite (<${data.limit}°C)`,
//             data: Array(data.timestamps.length).fill(data.limit),
//             borderColor: 'red',
//             borderDash: [10, 5],
//             borderWidth: 2,
//             fill: false,
//           },
//           {
//             label: 'Interno',
//             data: data.internalTemperatures,
//             borderColor: 'green',
//             borderWidth: 2,
//             fill: false,
//           },
//           {
//             label: 'Externo',
//             data: data.externalTemperatures,
//             borderColor: 'blue',
//             borderWidth: 2,
//             fill: false,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: { display: true, position: 'top' },
//           title: {
//             display: true,
//             text: 'Amostra 1.1.1 - Gráfico de Temperatura do sensor interno e sensor externo',
//             font: { size: 16 },
//           },
//         },
//         scales: {
//           x: {
//             title: { display: true, text: 'Data Hora' },
//             ticks: {
//               maxRotation: 90,
//               minRotation: 45,
//             },
//           },
//           y: {
//             title: { display: true, text: 'Temperatura (°C)' },
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

@Injectable()
export class LinesChartUseCase {
  private readonly chartJSNodeCanvas: ChartJSNodeCanvas;

  constructor() {
    this.chartJSNodeCanvas = new ChartJSNodeCanvas({
      width: 1000, // Largura do gráfico
      height: 400, // Altura do gráfico
    });
  }

  // Método para gerar a imagem do gráfico com dados dinâmicos
  async getChartImage(data: {
    timestamps: string[];
    internalTemperatures: number[];
    externalTemperatures: number[];
    limit: number;
  }): Promise<Buffer> {
    const configuration: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: data.timestamps,
        datasets: [
          {
            label: `Limite (<${data.limit}°C)`,
            data: Array(data.timestamps.length).fill(data.limit),
            borderColor: 'red',
            borderDash: [10, 5],
            borderWidth: 2,
            fill: false,
          },
          {
            label: 'Interno',
            data: data.internalTemperatures,
            borderColor: 'green',
            borderWidth: 2,
            fill: false,
          },
          {
            label: 'Externo',
            data: data.externalTemperatures,
            borderColor: 'blue',
            borderWidth: 2,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' },
          title: {
            display: true,
            text: 'Amostra 1.1.1 - Gráfico de Temperatura do sensor interno e sensor externo',
            font: { size: 16 },
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'Data Hora' },
            ticks: {
              maxRotation: 90,
              minRotation: 45,
            },
          },
          y: {
            title: { display: true, text: 'Temperatura (°C)' },
            beginAtZero: true,
          },
        },
      },
    };

    return this.chartJSNodeCanvas.renderToBuffer(configuration);
  }
}
