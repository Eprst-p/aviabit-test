
export const createChartOptions = (selectedYear: string) => ({
     plugins: {
         legend: {
             position: 'top' as const,
             labels: {
                 color: "white",
                 font: {
                     size: 20,
                 }
             },
         },
         title: {
             display: true,
             text: `График фактического и планового налета за ${selectedYear}`,
             color: "white",
             font: {
                 size: 20,
             }
         },
     },
     scales: {
         xAxes: {
             ticks: {
                 color: "white",
                 font: {
                     size: 15,
                 }
             },
         },
         yAxes: {
             ticks: {
                 color: "white",
                 font: {
                     size: 15,
                 }
             },
         },
     },
});
