for(i=0;i<3;i++){
        card = ``;
        $('#col-cards-events').append(card)
    }
setTimeout(function(){ 
    for(i=0;i<3;i++){
        c3.generate({
                bindto: `#visitor-${i}`,
                data: {
                    columns: [
                        ['Open', 45],
                        ['Clicked', 15],
                        ['Un-opened', 27],
                        ['Bounced', 18],
                    ],
                    type: 'donut',
                    tooltip: {
                    show: true
                }
                },
                donut: {
                    label: {
                        show: false
                    },
                    title: "Ratio",
                    width: 35,
                    
                },
                legend: {
                    hide: true
                    //or hide: 'data1'
                    //or hide: ['data1', 'data2']
                    
                },
                color: {
                    pattern: ['#40c4ff', '#2961ff', '#ff821c', '#7e74fb']
                }
        });
    }   
}, 100); 