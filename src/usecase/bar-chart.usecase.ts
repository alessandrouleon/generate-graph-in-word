// import { Injectable } from '@nestjs/common';
// import { ChartConfiguration } from 'chart.js';
// import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

// @Injectable()
// export class BarChartUseCase {
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
//       temperatures: [
//         '1.98-3.95',
//         '3.96-5.93',
//         '5.94-7.91',
//         '7.92-9.89',
//         '9.90-11.87',
//         '11.88-13.85',
//         '13.86-15.83',
//         '15.84-17.81',
//         '17.82-19.79',
//         '19.80-21.77',
//         '21.78-23.75',
//         '23.76-25.73',
//         '25.74-27.71',
//         '27.72-29.69',
//         '29.70-31.67',
//         '31.68-33.65',
//         '33.66-35.40',
//       ],
//       frequencies: [
//         10, 20, 50, 120, 300, 500, 700, 800, 600, 400, 200, 100, 50, 20, 10, 5,
//         2,
//       ],
//     };
//   }

//   // Método para gerar a imagem do gráfico
//   async getChartImage(): Promise<Buffer> {
//     const data = this.getData(); // Obtém os dados
//     const configuration: ChartConfiguration<'bar'> = {
//       type: 'bar',
//       data: {
//         labels: data.temperatures, // Faixas de temperatura
//         datasets: [
//           {
//             label: 'Frequência de Temperaturas Registradas',
//             data: data.frequencies, // Frequências correspondentes
//             backgroundColor: 'rgba(54, 162, 235, 0.7)', // Cor das barras
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 1,
//           },
//         ],
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: { display: false }, // Remove a legenda
//           title: {
//             display: true,
//             text: 'Histograma: Dados de temperaturas registradas no sensor externo',
//             font: { size: 16 },
//           },
//         },
//         scales: {
//           x: {
//             title: { display: true, text: 'Temperatura (°C)' },
//           },
//           y: {
//             title: { display: true, text: 'Frequência' },
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
export class BarChartUseCase {
  private readonly chartJSNodeCanvas: ChartJSNodeCanvas;

  constructor() {
    this.chartJSNodeCanvas = new ChartJSNodeCanvas({
      width: 1000, // Largura do gráfico
      height: 400, // Altura do gráfico
    });
  }

  // Método para gerar a imagem do gráfico
  async getChartImage(data: {
    temperatures: string[];
    frequencies: number[];
  }): Promise<Buffer> {
    const configuration: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: data.temperatures, // Faixas de temperatura
        datasets: [
          {
            label: 'Frequência de Temperaturas Registradas',
            data: data.frequencies, // Frequências correspondentes
            backgroundColor: 'rgba(54, 162, 235, 0.7)', // Cor das barras
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }, // Remove a legenda
          title: {
            display: true,
            text: 'Histograma: Dados de temperaturas registradas no sensor externo',
            font: { size: 16 },
          },
        },
        scales: {
          x: {
            title: { display: true, text: 'Temperatura (°C)' },
          },
          y: {
            title: { display: true, text: 'Frequência' },
            beginAtZero: true,
          },
        },
      },
    };

    return this.chartJSNodeCanvas.renderToBuffer(configuration);
  }
}
