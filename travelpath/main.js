onload = function() {
  var container1 = document.getElementById('mynetwork1');
  var text1 = document.getElementById('text1');
  var text2 = document.getElementById('text2');
  var genNew = document.getElementById('new-graph');
  var container2 = document.getElementById('mynetwork2');
  var solution = document.getElementById('solution');
  var options = {
    edges: {
      labelHighlightBold: true,
      font: {
        size: 16
      }
    },
    nodes: {
      font: '15px arial red',
      shape: 'icon',
      icon: {
        face: 'FontAwesome',
        code: '\uf1ad',
        size: 35,
        color: '#991133',
      }
    }
  };
  var curr_data;
  var sz;
  const cities = ['Delhi', 'Mumbai', 'Bbsr', 'Goa', 'Roorkee', 'Srinagar', 'Hyderabad', 'Bangalore', 'Chennai', 'Mysore'];

  var network1 = new vis.Network(container1);
  network1.setOptions(options);
  var network2 = new vis.Network(container2);
  network2.setOptions(options);

  function generateData() {
    sz = Math.floor(Math.random() * 8) + 3;
    let nodes = [];
    for (let i = 1; i <= sz; i++) {
      nodes.push({
        id: i,
        label: cities[i - 1]
      })
    }
    nodes = new vis.DataSet(nodes);

    let edges = [];
    for (let i = 2; i <= sz; i++) {
      let neighbor = i - Math.floor(Math.random() * Math.min(i - 1, 3) + 1);
      edges.push({
        from: i,
        to: neighbor,
        color: 'blue',
        label: String(Math.floor(Math.random() * 64) + 37)
      });
    }

    src = 1;
    dst = sz;

    for (let i = 1; i <= sz / 2;) {
      let n1 = Math.floor(Math.random() * sz) + 1;
      let n2 = Math.floor(Math.random() * sz) + 1;
      if (n1 != n2) {
        if (n1 < n2) {
          let tmp = n1;
          n1 = n2;
          n2 = tmp;
        }
        edges.push({
          from: n1,
          to: n2,
          color: 'blue',
          label: String(Math.floor(Math.random() * 45) + 6)
        });
        i++;
      }
    }

    let values = {
      nodes: nodes,
      edges: edges
    };
    curr_data = values;
  }

  genNew.onclick = function() {
    generateData();
    network1.setData(curr_data);
    container2.style.display = "none";
    text2.innerText = 'Minimum time path from ' + cities[src - 1] + ' to ' + cities[dst - 1];

    text2.style.display = "inline";
    text1.style.display = "inline";

  };

  solution.onclick = function() {
    text1.style.display = "none";
    container2.style.display = "inline";
    text2.style.display = "none";

    network2.setData(solveData(sz));
  };

  function dijkstra(graph, sz, src) {
    let vis = Array(sz).fill(0);
    let dist = [];
    for (let i = 0; i < sz; i++)
      dist.push([15000, -1]);
    dist[src][0] = 0;

    for (let i = 0; i < sz - 1; i++) {
      let min = -1;
      for (let j = 0; j < sz; j++) {
        if (vis[j] === 0) {
          if (min === -1 || min === -1)
            min = j;
        }
      }

      vis[min] = 1;
      for (let j in graph[min]) {
        let edge = graph[min][j];
        if (vis[edge[0]] === 0 && dist[edge[0]][0] > dist[min][0] + edge[1]) {
          dist[edge[0]][0] = dist[min][0] + edge[1];
          dist[edge[0]][1] = min;
        }
      }
    }

    return dist;
  }

  function solveData(sz) {
    let data = curr_data;
    let graph = [];
    for (let i = 1; i <= sz; i++) {
      graph.push([]);
    }

    for (let i = 0; i < data['edges'].length; i++) {
      let edge = data['edges'][i];
      graph[edge['to'] - 1].push([edge['from'] - 1, parseInt(edge['label'])]);
      graph[edge['from'] - 1].push([edge['to'] - 1, parseInt(edge['label'])]);
    }

    let dist = dijkstra(graph, sz, src - 1);
    new_edges = [];
    var curr = dst - 1;

    while (dist[curr][0] != 0) {
      let near = dist[curr][1];
      new_edges.push({
        arrows: {
          to: {
            enabled: true
          }
        },
        from: near + 1,
        to: curr + 1,
        color: 'blue',
        label: String(dist[curr][0] - dist[near][0])
      });
      curr = near;
    }
    values = {
      nodes: data['nodes'],
      edges: new_edges
    };
    return values;
  }
  genNew.click();
};
