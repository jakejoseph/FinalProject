
function drawBMI(dataset) {
    //set years to be displayed for quick access
    var yearIntName = [1872, 1921, 1951, 1980, 1990, 1997, 2002, 2005];
    //sort data by year
    var byYearData = d3.nest()
        .key(function (d) {
            return d['debut'].getUTCFullYear()
        })
        .sortKeys(d3.ascending)
        .entries(dataset);
    //set borders and padding for svg object
    var w = 1400;
    var h = 800;
    var wPadding = 50;
    var hPadding = 50;
    var axisHPadding = 50;
    var axisWPadding = 51;
    //define scales based on max and min of each element - note BMI and height are linear
    //radius is squareroot scale to correct for squared radius impact on size of bubble
    //used extent function to simplfy code
    var yScale = d3.scale.linear()
        .domain(d3.extent(dataset, function (d) { return d.BMI; }))
        .range([h - hPadding, hPadding]);

    var xScale = d3.scale.linear()
        .domain(d3.extent(dataset, function (d) { return d.height; }))
        .range([wPadding, w - wPadding]);

    var rScale = d3.scale.sqrt()
        .domain(d3.extent(dataset, function (d) { return d.weight; }))
        .range([5, 30]);

    // make svg object for all d3 object placement
    var svg = d3.select("body").append("svg");
    svg.attr("width", w)
        .attr("height", h);
    // append axes in separate group at head of document
    // move axes based on axisPadding to allow additional padding for data
    var xAxis = d3.svg.axis();
    xAxis.scale(xScale);
    xAxis.orient("bottom")
    xAxis.ticks(10);
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(-1," + (h - axisHPadding) + ")")
        .call(xAxis);

    var yAxis = d3.svg.axis();
    yAxis.scale(yScale);
    yAxis.orient("right");
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (w - axisWPadding) + ",0)")
        .call(yAxis);
    //abstracted text add function for text-anchor start
    function addText(cls, x, y, string) {
        svg.append("text")
            .attr("class", cls)
            .attr("text-anchor", "start")
            .attr("x", x)
            .attr("y", y)
            .text(string);

    }

    //append title to page
    addText("pageTitle", wPadding - 2, hPadding, "144 Years of the Shapes and Sizes of Baseball Players");

    //append brief description of data source
    addText("reference", wPadding - 2, hPadding + 20, "Data taken from Sean Lahman's Baseball Database.");
    addText("reference", wPadding - 2, hPadding + 35, "Year represents the debut year of the player in the major leagues.");
    addText("reference", wPadding - 2, hPadding + 50, "Each grey circle representsa player who debuted in the majors that year.");
    addText("referenceInst", wPadding - 2, hPadding + 95, "Click on a player for more information.");
    //append labels to page
    //didn't abstract these, because they are different than other text adds
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", w / 2)
        .attr("y", h - 4)
        .text("Height in inches");

    svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", w - 15)
        .attr("y", h / 2)
        .attr("transform", "rotate(270," + (w - 15) + "," + h / 2 + ")")
        .text("BMI");
    // append circle legend to page
    // consists of three overlapping circles with 
    // lines designating the legend
    svg.append("circle")
        .attr("class", "legendCirc")
        .attr("cx", w * .25 + 210)
        .attr("cy", h / 2 + 145)
        .attr("r", rScale(175));

    svg.append("circle")
        .attr("class", "legendCirc")
        .attr("cx", w * .25 + 210)
        .attr("cy", (h / 2 + 145) + 5)
        .attr("r", rScale(225));

    svg.append("circle")
        .attr("class", "legendCirc")
        .attr("cx", w * .25 + 210)
        .attr("cy", (h / 2 + 145) + 9)
        .attr("r", rScale(275));
    // this code defines the lines for legend - the additional
    // subtraction and addition at the end of each line is
    // done to keep the relative position the same as previous 
    // text elements
    svg.append("line")
        .attr("class", "legendLine")
        .attr("x1", w * .25 + 210)
        .attr("x2", w * .25 + 130)
        .attr("y1", (h / 2 + 145) - 18)
        .attr("y2", (h / 2 + 145) - 18);

    svg.append("line")
        .attr("class", "legendLine")
        .attr("x1", w * .25 + 210)
        .attr("x2", w * .25 + 100)
        .attr("y1", (h / 2 + 145) + 17)
        .attr("y2", (h / 2 + 145) + 17);

    svg.append("line")
        .attr("class", "legendLine")
        .attr("x1", w * .25 + 210)
        .attr("x2", w * .25 + 20)
        .attr("y1", (h / 2 + 145) + 26)
        .attr("y2", (h / 2 + 145) + 26);

    svg.append("line")
        .attr("class", "legendLine")
        .attr("x1", w * .25 + 210)
        .attr("x2", w * .25 - 50)
        .attr("y1", (h / 2 + 145) + 35)
        .attr("y2", (h / 2 + 145) + 35);
    //labels for legend
    addText("legendLabel", w * .25 + 105, (h / 2 + 145) + 15, "175 Pounds");
    addText("legendLabel", w * .25 + 25, (h / 2 + 145) + 24, "225 Pounds");
    addText("legendLabel", w * .25 - 45, (h / 2 + 145) + 33, "275 Pounds");
    addText("legendTitle", w * .25 - 50, (h / 2 + 145) - 13, "Player Weight");

    svg.append("text")
        .attr("class", "legendTitle")
        .attr("x", w * .25 - 50)
        .attr("y", (h / 2 + 147))
        .style("fill", "red")
        .text("Red Indicates Average Player");
    // divs for tooltip on data
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    // div for tooltip for navigation spans
    var div2 = d3.select("body").append("div")
        .attr("class", "tooltip2")
        .style("opacity", 0);
    // div for tool tip for slider
    var div4 = d3.select("body").append("div")
        .attr("class", "tooltip3")
        .style("opacity", 0);
    var div5 = d3.select("body").append("div")
        .attr("class", "explanation")
        .style("opacity", 0);

    // function for looping through the dataset
    // clears by year, but keeps persistent average as red
    // circle
    function drawByYear(byYearData, i) {
        // set circles based on year data called from index i
        var circles = svg.selectAll("#wt-circ")
            .data(byYearData[i].values, function (d) {
                return d['playerKey'];
            });
        // take out old data
        circles.exit().remove()
        // draw grey circles for all data
        // note the id attribute, which will clear these id, but not the 
        // average circles
        circles.enter()
            .append("circle")
            .attr("id", "wt-circ")
            .attr("class", function (d) {
                return "wt " + d['nameFirst'] + " " + d['nameLast'] + " " + d['debut'].getUTCFullYear();
            })
            .transition()
            .duration(350)
            .attr("r", function (d) {
                return rScale(d['weight']);
            })
            .attr("cy", function (d) {
                return yScale(d["BMI"]);
            })
            .attr("cx", function (d) {
                return xScale(d["height"]);
            })
            .attr("opacity", ".2")
            .attr("color", "darkgrey")
            .transition()
            .duration(1000)
            .attr("opacity", "0");

        // display the year
        var yearText = svg.selectAll("#yr-text")
            .data(byYearData[i].values, function (d) {
                return d['playerKey'];
            });

        yearText.exit().remove()
        yearText.enter()
            .append("text")
            .attr("id", "yr-text")
            .attr("font-family", "sans-serif")
            .attr("font-size", "50px")
            .attr("x", w * .25 - 50)
            .attr("y", h / 2)
            .attr("fill", "darkgrey")
            .attr("opacity", ".9")
            .text(function (d) {
                return "Year: " + d['debut'].getUTCFullYear();
            })
        // display bmi - note the round function to reduce display size
        var bmiText = svg.selectAll("#bmi-text")

            .data(byYearData[i].values, function (d) {
                return d['nameLast'];
            })
        bmiText.exit().remove();
        bmiText.enter().append("text");
        bmiText.filter(function (d) {
            return d['nameLast'] == "Average";
        })
            .attr("id", "bmi-text")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("x", w * .25 - 50)
            .attr("y", (h / 2) + 100)
            .attr("fill", "darkgrey")
            .attr("opacity", ".9")
            .text(function (d) {
                return "Average BMI:" + ((Math.round(+d['BMI'] * 100)) / 100);
            })
        // display weight - note round function
        var wtText = svg.selectAll("#wt-text")

            .data(byYearData[i].values, function (d) {
                return d['nameLast'];
            })
        wtText.exit().remove();
        wtText.enter().append("text");
        wtText.filter(function (d) {
            return d['nameLast'] == "Average";
        })
            .attr("id", "wt-text")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("x", w * .25 - 50)
            .attr("y", (h / 2) + 75)
            .attr("fill", "darkgrey")
            .attr("opacity", ".9")
            .text(function (d) {
                return "Average Weight in pounds:" + Math.round(+d['weight']);
            })
        // Display height note round function
        var htText = svg.selectAll("#ht-text")

            .data(byYearData[i].values, function (d) {
                return d['nameLast'];
            })
        htText.exit().remove();
        htText.enter().append("text");

        htText.filter(function (d) {
            return d['nameLast'] == "Average";
        })
            .attr("id", "ht-text")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("x", w * .25 - 50)
            .attr("y", (h / 2) + 50)
            .attr("fill", "darkgrey")
            .attr("opacity", ".9")
            .text(function (d) {
                return "Average Height in inches:" + ((Math.round(+d['height'] * 10)) / 10);
            })


            ;
        // display persistent averages
        var avgs = svg.selectAll("dot")
            .data(byYearData[i].values, function (d) {
                return d['nameLast'];
            })
            .enter().append("circle")
        // note - does not remove the previous circle - just updates
        avgs.filter(function (d) {
            return d['nameLast'] == "Average";
        })
            .attr("id", "avg-circ")
            .attr("class", function (d) {
                return "avg " + d['nameFirst'] + " " + d['nameLast'] + " " + d['debut'].getUTCFullYear();
            })
            .attr("r", function (d) {
                return rScale(d['weight']);
            })
            .attr("cy", function (d) {
                return yScale(d["BMI"]);
            })
            .attr("cx", function (d) {
                return xScale(d["height"]);
            })
            .attr("fill", "red")
            .attr("opacity", "0.6");

    }
    //function to run after animation runs.  This function clears all plotting.
    function drawByYearClear(byYearData, i) {

        var circles = svg.selectAll("#wt-circ")
            .data(byYearData[i].values, function (d) {
                return d['playerKey'];
            })

        circles.exit().remove()
        circles.enter()
            .append("circle")
            .attr("id", "wt-circ")
            .attr("class", function (d) {
                return "wt " + d['nameFirst'] + " " + d['nameLast'] + " " + d['debut'].getUTCFullYear();
            })

            .attr("r", function (d) {
                return rScale(d['weight']);
            })
            .attr("cy", function (d) {
                return yScale(d["BMI"]);
            })
            .attr("cx", function (d) {
                return xScale(d["height"]);
            })

            .attr("opacity", ".1")
            .attr("color", "darkgrey")
            // Display tooltips for player data on weight and height
            .on("mouseover", function (d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html((d.nameFirst) + " " + d.nameLast + "<br>BMI: " + (Math.round(+d['BMI'] * 100)) /
                    100 + "<br> Height: " + d.height + " in." + "<br> Weight: " + d.weight + " lbs.")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            })
            // when bubble is clicked, open google search for player with year and baseball keywords
            .on("click", function (d) {
                window.open("https://www.google.com/search?q=baseball+" + d['debut'].getUTCFullYear() + "+" +
                    d['nameLast'] + "+" + d['nameFirst']);
            })



            ;



        // same text updates as in other function
        var yearText = svg.selectAll("#yr-text")
            .data(byYearData[i].values, function (d) {
                return d['playerKey'];
            });

        yearText.exit().remove()
        yearText.enter()
            .append("text")
            .attr("id", "yr-text")
            .attr("font-family", "sans-serif")
            .attr("font-size", "50px")
            .attr("x", w * .25 - 50)
            .attr("y", h / 2)
            .attr("fill", "darkgrey")
            .attr("opacity", ".9")
            .text(function (d) {
                return "Year: " + d['debut'].getUTCFullYear();
            })

        var bmiText = svg.selectAll("#bmi-text")

            .data(byYearData[i].values, function (d) {
                return d['nameLast'];
            })
        bmiText.exit().remove();
        bmiText.enter().append("text");
        bmiText.filter(function (d) {
            return d['nameLast'] == "Average";
        })
            .attr("id", "bmi-text")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("x", w * .25 - 50)
            .attr("y", (h / 2) + 100)
            .attr("fill", "darkgrey")
            .attr("opacity", ".9")
            .text(function (d) {
                return "Average BMI:" + ((Math.round(+d['BMI'] * 100)) / 100);
            })

        var wtText = svg.selectAll("#wt-text")

            .data(byYearData[i].values, function (d) {
                return d['nameLast'];
            })
        wtText.exit().remove();
        wtText.enter().append("text");
        wtText.filter(function (d) {
            return d['nameLast'] == "Average";
        })
            .attr("id", "wt-text")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("x", w * .25 - 50)
            .attr("y", (h / 2) + 75)
            .attr("fill", "darkgrey")
            .attr("opacity", ".9")
            .text(function (d) {
                return "Average Weight in pounds:" + Math.round(+d['weight']);
            })

        var htText = svg.selectAll("#ht-text")

            .data(byYearData[i].values, function (d) {
                return d['nameLast'];
            })
        htText.exit().remove();
        htText.enter().append("text");
        htText.filter(function (d) {
            return d['nameLast'] == "Average";
        })
            .attr("id", "ht-text")
            .attr("font-family", "sans-serif")
            .attr("font-size", "20px")
            .attr("x", w * .25 - 50)
            .attr("y", (h / 2) + 50)
            .attr("fill", "darkgrey")
            .attr("opacity", ".9")
            .text(function (d) {
                return "Average Height in inches:" + ((Math.round(+d['height'] * 10)) / 10);
            });
        // remove all data elements on screen
        // without this code, does not clear 1971?
        d3.selectAll("#avg-circ")
            .remove();
        d3.selectAll("#avg-circ2")
            .remove();
        // add red dots, clear after each 
        var avgs2 = svg.selectAll("dot2")
            .data(byYearData[i].values, function (d) {
                return d['nameLast'];
            })
        avgs2.exit().remove()
        avgs2.enter().append("circle")

        avgs2.filter(function (d) {
            return d['nameLast'] == "Average";
        })
            .attr("id", "avg-circ2")
            .attr("class", function (d) {
                return "avg2 " + d['nameFirst'] + " " + d['nameLast'] + " " + d['debut'].getUTCFullYear();
            })
            .attr("r", function (d) {
                return rScale(d['weight']);
            })
            .attr("cy", function (d) {
                return yScale(d["BMI"]);
            })
            .attr("cx", function (d) {
                return xScale(d["height"]);
            })
            .attr("fill", "red")
            .attr("opacity", "0.8");

    }
    // start year zero for 1871
    // change for testing to speed code
    var yearIdx = 0;

    var yearInterval = setInterval(function () {
        drawByYear(byYearData, yearIdx);
        // sacrifice to get all year span without 
        // taking too long to animate
        // fast animation was complaint in first version
        // this slows animation, shows the whole span without
        // taking as long
        yearIdx = yearIdx + 4;

        if (yearIdx >= byYearData.length) {
            clearInterval(yearInterval);

            var explanation = d3.select(".explanation")

                .style("opacity", "1")
                .html("From 1871 to 1991, the height and weight of baseball players" +
                " increased proportionally. Starting in 1991, players stopped increasing" +
                " in height, yet continued to increase in weight." +
                " As a result the average player's BMI stays relatively stable until 1991, and then" +
                " begins to increase dramatically; as BMI is a representative measure of the" +
                " proportionality of a person's height and weight. The red circles represent the changes" +
                " in an average baseball player's BMI, weight, and height from 1871 to 2015." +
                " To begin exploring the data, click on the buttons or" +
                " slider above.")
                .style("left", "500px")
                .style("top", "75px");

            explanation.on("click", function (d) {
                d3.select(".explanation")
                    .transition()
                    .duration(500)
                    .style("opacity", "0")
                    .style("z-index", "0");
            });

            var buttons = d3.select("body")
                .append("div")
                .attr("class", "years_buttons")
                .selectAll("span")
                .data(yearIntName)
                .enter()
                .append("span")
                .text(function (d) {
                    return d;
                });
            // move to year function for button
            buttons.on("click", function (d) {

                d3.select(".explanation")
                    .transition()
                    .duration(1500)
                    .style("opacity", "0")
                    .style("z-index", "0");
                d3.select(".years_buttons")
                    .selectAll("span")
                    .transition()
                    .duration(500)
                    .style("color", "black")
                    .style("background", "darkgrey");

                d3.select(this)
                    .transition()
                    .duration(500)
                    .style("background", "lightgrey")
                    .style("color", "black");
                drawByYearClear(byYearData, d - 1871)
            })
            // provide info on what button does
            // modeled on d3noob adding tooltips website
            buttons.on("mouseover", function (d) {
                d3.select(".explanation")
                    .transition()
                    .duration(1500)
                    .style("opacity", "0");

                d3.select(this);
                div2.transition()
                    .duration(200)
                    .style("opacity", .9);
                div2.html("Data for " + d)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 17) + "px");
            })
            buttons.on("mouseout", function (d) {
                div2.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
            //label slider text
            d3.select("body")
                .append("div")
                .attr("class", "slider_begin")
                .html("1871");
            //slider to navigate to a specific year
            var slider = d3.select("body")
                .append("div")
                .attr("class", "slider")
                .attr("id", "year_slider")

                .html("<input type ='range' min='1871' max = '2015'> ");
            d3.select('input').on("input", function () {
                drawByYearClear(byYearData, +this.value - 1871);
            })
            // slider text
            d3.select("body")
                .append("div")
                .attr("class", "slider_end")
                .html("2015")
            //label for what slider does
            slider.on("mouseover", function (d) {
                d3.select(".explanation")
                    .transition()
                    .duration(1500)
                    .style("opacity", "0")
                    .style("z-index", "0");
                d3.select(this);
                div4.transition()
                    .duration(200)
                    .style("opacity", .9);
                div4.html("Year Selector")
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY + 17) + "px");
            })
            slider.on("mouseout", function (d) {

                div4.transition()
                    .duration(500)
                    .style("opacity", 0);
            });



        }

    }, 750);


}
