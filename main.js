async function launch() {
    // Load the JSON data
    const httpResponse = await fetch('dunkinDonuts.json');
    const dunkinData = await httpResponse.json();

    let data = dunkinData.data;
    // states = []

    var obj = {};

    //parse through dataset and add states to new object and iterate value each time once added
    data.forEach(element => {
        if (obj.hasOwnProperty(`${element.state}`)){
            obj[element.state]++
        } else {
            obj[element.state] = 1;
        }
    })

    //Unneccesary code to convert the object to an array and sort it
    let sortable = [];
    for (var item in obj) {
     sortable.push([item, obj[item]]);
    }

    sortable.sort(function(a, b) {
     return a[1] - b[1];
    });

    //reconstructing array to sorted object  
    let objSorted = {}
    sortable.forEach(function(item){
        objSorted[item[0]]=item[1]
    })
    

    // Chart
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(objSorted),
            datasets: [{
                label: 'Dunkin Donuts Franchises',
                data: Object.values(objSorted),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            layout: {
                padding: 30
            },
            plugins: {
                title: {
                    display: true,
                    text: "Distribution of Dunkin Donuts' Franchises across US States",
                    font: {
                        size: 30
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'US States',
                        font: {
                            size: 20
                        },
                        padding: 10
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Number of Dunkin Donuts Franchises',
                        font: {
                            size: 20
                        },
                        padding: 10
                    }
                }
                
            }
        }
    })
}

launch()