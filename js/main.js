$(document).ready(function() {

    $.ajax({
        url: 'server.php',
        method: 'GET',
        success: function(data) {
            var mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
            var ctx = $('#line-chart');
            var chart = new Chart(ctx, {
                // The type of chart we want to create
                type: 'line',

                // The data for our dataset
                data: {
                    labels: mesi,
                    datasets: [{
                        label: 'Vendite',
                        backgroundColor: 'rgb(62,95,138)',
                        borderColor: '#1D1E33',
                        data: data
                    }]
                }
            });
        },
        error: function() {
            alert('ERRORE');
        }
    });


    $.ajax({
        url: 'server-2.php',
        method: 'GET',
        success: function(data) {
            var grafici = data;
            console.log(grafici);

            graficoLinea(grafici);
            graficoTorta(grafici);



        },
        error: function() {
            alert('ERRORE');
        }
    });






    function graficoLinea(grafici) {
        var graficoFatturato = grafici.fatturato;
        var data = graficoFatturato.data;
        var type = graficoFatturato.type;

        var mesi = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'];
        var ctx = $('#2nd-lineChart');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: type,

            // The data for our dataset
            data: {
                labels: mesi,
                datasets: [{
                    label: 'Fatturato',
                    backgroundColor: '#4E5754',
                    borderColor: 'rgb(62,95,138)',
                    data: data
                }]
            }
        });
    }


    function graficoTorta(grafici) {
        var graficoTorta = grafici.fatturato_by_agent;
        var datiTorta = graficoTorta.data;

        var arrayNomi = Object.keys(graficoTorta.data);
        var arrayDati = Object.values(graficoTorta.data);
        console.log(arrayNomi);
        console.log(arrayDati);

        var ctx = $('#pie-chart');
        var chart = new Chart(ctx, {
          type: graficoTorta.type,
          data: {
            datasets: [{
              data: arrayDati,
              backgroundColor: ['rgb(62,95,138)', '#CDA434', '#C35831', 'lightgreen']
            }],
            labels: arrayNomi
          }
        });
    }

});
