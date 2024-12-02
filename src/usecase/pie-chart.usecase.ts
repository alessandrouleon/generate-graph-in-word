import { Injectable } from '@nestjs/common';
import { ChartConfiguration, ChartTypeRegistry } from 'chart.js';
import { ChartJSNodeCanvas } from 'chartjs-node-canvas';

@Injectable()
export class PieChartUseCase {
  private readonly chartJSNodeCanvas: ChartJSNodeCanvas;

  constructor() {
    this.chartJSNodeCanvas = new ChartJSNodeCanvas({
      width: 1000, // Largura do gráfico (igual à altura)
      height: 500, // Altura do gráfico (igual à largura)
    });
  }

  // Dados para o gráfico de pizza
  private getData(data: number[]) {
    return {
      labels: ['Dados Fora da media', 'Dados Normais', 'Dados Fracos'],
      datasets: [
        {
          label: 'Gráfico de Pizza',
          data: data,
          backgroundColor: [
            'rgb(255, 99, 132)', // Vermelho
            'rgb(54, 162, 235)', // Azul
            'rgb(255, 205, 86)', // Amarelo
          ],
          hoverOffset: 4,
        },
      ],
    };
  }

  // Configuração do gráfico de pizza
  async getChartImage(data: number[]): Promise<Buffer> {
    const piers = this.getData(data); // Obtém os dados

    const configuration: ChartConfiguration<
      keyof ChartTypeRegistry,
      number[],
      unknown
    > = {
      type: 'pie', // Define o tipo de gráfico
      data: piers,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top', // Legenda no topo
          },
        },
        animation: false, // Desabilita animações, se necessário
      },
    };

    return this.chartJSNodeCanvas.renderToBuffer(configuration);
  }
}
