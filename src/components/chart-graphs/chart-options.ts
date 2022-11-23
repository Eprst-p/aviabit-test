
export const createChartOptions = (titleName: string) => ({
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
             text: `График фактического и планового налета за ${titleName}`,
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
             title: {
                 display: true,
                 text: 'время в часах',
                 color: "white",
                 padding: 1,
                 font: {
                     size: 17,
                 }
             },

             ticks: {
                 color: "white",
                 font: {
                     size: 15,
                 }
             },
         },
     },
    options: {
         responsive: true,
        maintainAspectRatio: false,
    }
});
