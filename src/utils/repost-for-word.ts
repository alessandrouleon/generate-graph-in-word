//Dados para o Gráfico de linha
const lineChirtData = {
  mean: 15,
  stdDev: 5,
};

//Dados para o Gráfico de Linhas
const lineChartData = {
  timestamps: [
    '31/10 7:00',
    '31/10 7:30',
    '31/10 8:00',
    '31/10 8:30',
    '01/11 9:00',
    '01/11 9:30',
    '01/11 10:00',
    '01/11 10:30',
  ],
  internalTemperatures: [10, 12, 13, 15, 16, 19, 18, 19],
  externalTemperatures: [30, 28, 27, 25, 27, 24, 25, 26],
  limit: 25, // Limite de temperatura
};

const barChartData = {
  temperatures: [
    '1.98-3.95',
    '3.96-5.93',
    '5.94-7.91',
    '7.92-9.89',
    '9.90-11.87',
    '11.88-13.85',
    '13.86-15.83',
    '15.84-17.81',
    '17.82-19.79',
    '19.80-21.77',
    '21.78-23.75',
    '23.76-25.73',
    '25.74-27.71',
    '27.72-29.69',
    '29.70-31.67',
    '31.68-33.65',
    '33.66-35.40',
  ],
  frequencies: [
    10, 20, 50, 120, 300, 500, 700, 800, 600, 400, 200, 100, 50, 20, 10, 5, 2,
  ],
};

const BarChartData = [300, 50, 100];

export const word = {
  table1: {
    revision: '1.0.0',
    date: '29/06/2023',
    resumoDasMudancas: 'Versão inicial',
    necessarioTreinamento: 'Não',
    necessarioAvaliacaoDeEficacia: 'Não Aplicável',
    cargosParaTreinamento: 'Operador',
  },
  applicationField: {
    department: 'Empresa',
    area: 'Nome da Área',
  },
  lines: lineChartData,
  bars: barChartData,
  line: lineChirtData,
  piers: BarChartData,
};
