function buildMetadata(sample) {
  // Use `d3.json` to fetch the metadata for a sample
  d3.json("sample_metadata.json").then((data) => {
    // Use d3 to select the panel with id of `#sample-metadata`
    var metaSample = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    metaSample.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    Object.entries(data).forEach(function([key, value]) {
      console.log(key, value);
        var panel  = metaSample.append("div");
        panel.text(key, value);
    });
  };
}

function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json("data.json").then((data)) => {
    
    var top10sample_values = data.sample_values;
    var TopSample_values = top10sample_values.slice(0, 10);
    
    var top10otu_labels = data.otu_labels;
    var TopOTU_labels = top10otu_labels.slice(0, 10);
    
    var top10otu_ids = data.otu_ids;
    var TopOTU_ids = top10otu_ids.slice(0, 10)
    
    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      x: [TopOTU_ids],
      y: [TopSample_values],
      mode: 'markers',
      marker: {
        size: [topSample_values]
      }
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Bubble Chart',
      showlegend: false,
      height: 600,
      width: 600
    };
    
    Plotly.newPlot('bubble', data, layout);
      
    }
    // @TODO: Build a Pie Chart
    var trace2 = {
    labels: TopOTU_labels,
    values: TopSample_values,
    type: 'pie'
    };

    var data2 = [trace2];
    
    var layout2 = {
      title: "Pie Chart",
    };

    Plotly.newPlot("pie", data2, layout2);
  };
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
