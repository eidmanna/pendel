(function() {
    // initial parameter
    
    var timeFactor = 1000;
    
    var v0 = 0.3;
    var w0 = 0;
    var alfa = 0.9;
    var beta = 2.0;

    var domainMin = -2
    var domainMax = 2;

    var range = 600;

    var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = range - margin.left - margin.right,
    height = range - margin.top - margin.bottom;

    
    var alfa1 = alfa / (beta * beta);
    
    var t0 = Date.now() / timeFactor;
    
    // grafic stuff
    var svg = d3.select("svg")

    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var circle0 = svg.append("circle").attr("r", 5);
    var circle1 = svg.append("circle").attr("r", 5);
    
    var line = svg.append("line").attr("stroke-width", 2)
    .attr("stroke", "black");
    
    // scale function
    var scale = d3.scale.linear()
    .domain([domainMin, domainMax])
    .range([0, height]);

    // axis
    var xAxis = d3.svg.axis()
    .scale(scale)
    .orient("top");

    var yAxis = d3.svg.axis()
    .scale(scale)
    .orient("left");
    
    svg.append("g")
      .attr("class", "x axis")      
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
    
    // main loop
    d3.timer(function() {
        
        var t = Date.now() / timeFactor;
        var dt = (t - t0);
        
        var v = v0 - (alfa * Math.cos(beta * t) + 1.0) * Math.sin(w0) * dt;
        var w = w0 + v0 * dt;
        var x = Math.sin(w);
        var ya = alfa1 * Math.cos(beta * t);
        var y = Math.cos(w) + ya;
        var xa = 0.0;
        // store for next loop
        v0 = v;
        w0 = w;
        t0 = t;
        
        // shift and zoom
        xa = scale(xa);
        ya = scale(ya);
        x = scale(x);
        y = scale(y);
        
        // grafic stuff
        // set x and y
        line.attr("x1", xa).attr("y1", ya).attr("x2", x).attr("y2", y);
        circle0.attr("cx", x).attr("cy", y);
        circle1.attr("cx", xa).attr("cy", ya);
    
    }
    );

}
)();
