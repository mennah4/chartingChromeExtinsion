
'use strict';
window.onload = (event) => {
    console.log('page is fully loaded');

    //get the table 
    let el = document.querySelector(".archives");
    el.style.position = "relative";
    //create a button and set attributes
    let button = document.createElement("button");
    button.setAttribute("id", "button1");
    let buttonText = document.createTextNode("VISUALIZE");
    // el.style.backgroundColor = "yellow";

    button.appendChild(buttonText);
    el.appendChild(button);
    let chartsDiv = document.createElement("canvas");
    chartsDiv.setAttribute("id", "chartsDiv");
    chartsDiv.setAttribute("height", "250");
    chartsDiv.setAttribute("width", "250")
    el.appendChild(chartsDiv);
    let backdrop;
    let modal;
    let xAxis;
    let yAxis;
    let x = "";
    let y = "";
    let type = "";
    let chartType = "";
    function closeModal() {
        if (backdrop) {
            backdrop.remove();
        }

        if (modal) {
            modal.remove();
        }
    }
    // onClick's logic below:
    document.getElementById('button1').addEventListener('click', function () {



        //get the table, header, row and data using query selectors once the user clicks the button

        let th = document.querySelectorAll("table th")
        //console.log(th[3])
        let tr = document.querySelectorAll("table tr")
        //let td = tr[1].querySelectorAll("td")
        //console.log(td)

        //create the backdrop element
        backdrop = document.createElement('div');
        backdrop.setAttribute("class", "backDrop");
        backdrop.classList.add('backdrop');
        backdrop.addEventListener('click', closeModal);
        el.insertBefore(backdrop, chartsDiv.nextSibling);

        //creating the modal
        modal = document.createElement('div');

        modal.setAttribute("class", "modal");
        modal.classList.add('backdrop');

        let modalHeading = document.createElement('h1');
        modalHeading.textContent = 'Visualise the table';
        modal.appendChild(modalHeading);

        let inputsContainer = document.createElement('div');
        inputsContainer.classList.add('modal-input');
        modal.appendChild(inputsContainer);

        //creating inputs
        let xAxisInput = document.createElement('input');//x-axix
        let xAxisLabel = document.createElement('label');
        xAxisLabel.textContent = 'please enter index for x-asix between [0-' + th.length + ")";//max number of columns
        xAxisInput.placeholder = 'x-asix value';
        xAxisInput.addEventListener('input', function () {
            xAxis = xAxisInput.value;
        });
        xAxisInput.value = x;
        inputsContainer.appendChild(xAxisLabel);
        inputsContainer.appendChild(xAxisInput);

        let yAxisInput = document.createElement('input');//y-axix
        let yAxisLabel = document.createElement('label');
        yAxisLabel.textContent = 'please enter index for x-asix between [0-' + th.length + ")";
        yAxisInput.placeholder = 'y-asix value';
        yAxisInput.addEventListener('input', function () {
            yAxis = yAxisInput.value;
        });
        yAxisInput.value = y;
        inputsContainer.appendChild(yAxisLabel);
        inputsContainer.appendChild(yAxisInput);

        let chartTypeInput = document.createElement('input');//chart type
        let chartTypeLabel = document.createElement('label');
        chartTypeLabel.textContent = 'please Enter a chart type (line/pie/bar)';
        chartTypeInput.placeholder = 'chart type value';
        chartTypeInput.addEventListener('input', function () {
            chartType = chartTypeInput.value;
        });
        chartTypeInput.value = type;
        inputsContainer.appendChild(chartTypeLabel);
        inputsContainer.appendChild(chartTypeInput);

        let modalActionsContainer = document.createElement('div');
        modalActionsContainer.classList.add('modal-actions');
        modal.appendChild(modalActionsContainer);

        let confirmButton = document.createElement('button');
        confirmButton.setAttribute('type', 'button');
        confirmButton.classList.add('btn-confirm');
        confirmButton.textContent = 'Done';
        confirmButton.addEventListener('click', function () {//done => onClick
            // x = xAxis;
            //inputs validation
            console.log(chartType)
            if (isNaN(xAxis)) {

                alert("Please input a number");
            } else if (xAxis >= th.length) {
                alert("x-axis vlue must input be within the index range");
            }

            let xAxixArray = [];
            tr.forEach(t => {
                if (t.querySelectorAll("td")[xAxis] !== undefined) {
                    let data = t.querySelectorAll("td")[xAxis].innerText

                    data = data.replace(/,/g, '')
                    //parse if data is numeric
                    if (data === parseInt(data, 10)) {
                        data = parseInt(data)
                    }
                    parseInt(data)
                    console.log(typeof data)
                    xAxixArray.push(data)
                }
            })
            let xAxisLabel = th[xAxis].textContent;
            //console.log(xAxixArray)

            // y = yAxis;
            //y-axis validation
            if (isNaN(yAxis)) {

                alert("Must input numbers");
            } else if (yAxis >= th.length) {
                alert("y-axis must input be within the index range");
            }

            let yAxixArray = [];
            tr.forEach(t => {
                if (t.querySelectorAll("td")[yAxis] !== undefined) {
                    let data = t.querySelectorAll("td")[yAxis].innerText

                    data = data.replace(/,/g, '')
                    //parse if data is numeric
                    if (data === parseInt(data, 10)) {
                        data = parseInt(data)
                    }
                    yAxixArray.push(data)
                }
            })
            let yAxisLabel = th[yAxis].textContent;
            //console.log(yAxixArray)
            //chart's logic
            var chartData = {
                labels: xAxixArray,
                datasets: [
                    {
                        label: chartType + " chart for " + xAxisLabel + " vs " + yAxisLabel,
                        data: yAxixArray,
                        backgroundColor: [
                            "#878BB6",
                            "#4ACAB4",
                            "#FF8153",
                            "#FFEA88",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(255, 159, 64, 0.6)",
                            "rgba(220,220,220, 0.6)",
                            "rgba(176,196,222, 0.6)",
                            "rgba(219,112,147, 0.6)",
                            "rgba(221,160,221, 0.6)",
                            "rgba(72,209,204, 0.6)",
                            "rgba(100,149,237, 0.6)",
                            "rgba(60,179,113, 0.6)",
                            "rgba(255, 206, 80, 0.6)",
                            "rgba(0,139,139, 0.6)",
                            "rgba(255, 99, 135, 0.6)",
                        ]
                    }]
            };

            var ctx = document.getElementById("chartsDiv").getContext("2d");

            var chartData = new Chart(ctx, {
                type: chartType,
                data: chartData
            });

            closeModal();//closing the modal after finishing 

        });
        modalActionsContainer.appendChild(confirmButton);

        el.insertBefore(modal, chartsDiv.nextSibling);

    });

};
