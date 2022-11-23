
export const createChartOptions = (titleName: string) => ({
     plugins: {
         legend: {
             position: 'top' as const,
             labels: {
                 color: "white",
                 font: {
                     size: 18,
                 }
             },
         },
         title: {
             display: true,
             text: `График фактического и планового налета за ${titleName}`,
             color: "white",
             font: {
                 size: 18,
             }
         },
     },
     scales: {

         xAxes: {
             ticks: {
                 color: "white",
                 font: {
                     size: 13,
                 }
             },
         },
         yAxes: {
             title: {
                 display: true,
                 text: 'время в часах',
                 color: "white",
                 padding: 1,
                 font: {
                     size: 15,
                 }
             },

             ticks: {
                 color: "white",
                 font: {
                     size: 13,
                 }
             },
         },
     },
    responsive: true,
    maintainAspectRatio: false,
});
