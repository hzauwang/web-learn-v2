## Highcharts介绍
根据[Highcharts](https://www.highcharts.com.cn/)中的[子弹图](https://www.highcharts.com.cn/demo/highcharts/bullet-graph)绘制基因结构图。

## 绘制基因结构图

![基因结构图](../images/gene.png)

=== "JavaScript"
    ```html
    <script type="text/javascript" charset="utf8" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" charset="utf8" src="https://cdn.highcharts.com.cn/highcharts/highcharts.js"></script>

    <div style="width:1350px;">
      <div id="bullet" style="height:45px;width:1300px"></div>
      <div id="container2" style="height:50px;width:1300px"></div>
    </div>

    <script>
    $(document).ready(function() {
      draw()
    })
    function draw() {
      //以下配置根据实际图形进行调整
      //data 存储基因信息
      var data = [
        {
          "from": 1,
          "to": 657,
          "color": "#0083B7",
          "zIndex": 20,
          "name": "CDS"
        },
        {
          "from": 1926,
          "to": 2012,
          "color": "#0083B7",
          "zIndex": 20,
          "name": "CDS"
        }
      ]
      //scatter 存储snp信息
      var scatter = [
        {
          "name": "pos:143777||ref/alt:C/T(0.96/0.04)||type:missense_variant MODERATE",
          "x": 196,
          "y": 5,
          "chengdu": "MODERATE",
          "color": "#EE7600"
        },
        {
          "name": "pos:144199||ref/alt:T/G(0.91/0.09)||type:synonymous_variant LOW",
          "x": 618,
          "y": 5,
          "chengdu": "LOW"
        },
        {
          "name": "pos:144767||ref/alt:C/T(0.90/0.10)||type:downstream_gene_variant MODIFIER",
          "x": 1186,
          "y": 5,
          "chengdu": "MODIFIER",
          "color": "#303030\t"
        },
        {
          "name": "pos:144875||ref/alt:G/GGACTATCACTCTGACCC(0.97/0.03)||type:downstream_gene_variant MODIFIER",
          "x": 1294,
          "y": 5,
          "chengdu": "MODIFIER",
          "color": "#303030\t"
        },
        {
          "name": "pos:145290||ref/alt:A/C(0.83/0.17)||type:downstream_gene_variant MODIFIER",
          "x": 1709,
          "y": 5,
          "chengdu": "MODIFIER",
          "color": "#303030\t"
        },
        {
          "name": "pos:145538||ref/alt:C/G(0.91/0.09)||type:missense_variant MODERATE",
          "x": 1957,
          "y": 5,
          "chengdu": "MODERATE",
          "color": "#EE7600"
        }
      ]
      //长度
      var len = 2012
      //基因方向
      var strand = '+'
      //添加基因方向
      var from_min = Math.min.apply(Math, data.map(item => { return item.from }))
      var to_max = Math.max.apply(Math, data.map(item => { return item.to }))
      if (strand == "+") {
        var plot_num = to_max;
        var plot_text = '→';
        var x = 0;
        var y = 22;
      }
      if (strand == "-") {
        var plot_num = from_min;
        var plot_text = '←';
        var x = -25;
        var y = 22;
      }

      Highcharts.Renderer.prototype.symbols.line = function(x, y, width, height) {
        return ['M', x, y + width / 2, 'L', x + height, y + width / 2];
      };
      Highcharts.setOptions({
        chart: {
          type: 'bar',
          width: 1300,
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        title: {
          text: ''
        },
        xAxis: {
          tickLength: 0,
          lineColor: '#0083B7',
          lineWidth: 0,
          labels: {
            style: {
              fontWeight: 'bold'
            }
          }
        },
        yAxis: {
          min: 0,
          minPadding: 0,
          maxPadding: 0,
          tickColor: '#ccc',
          tickWidth: 1,
          tickLength: 3,
          gridLineWidth: 0,
          endOnTick: true,
          title: {
            text: ''
          },
          labels: {
            y: 10,
            style: {
              fontSize: '8px'
            },

          }
        },
        plotOptions: {
          bar: {
            color: '#333333',
            shadow: false,
            borderWidth: 0,
          },
        }
      });
      var chart1 = new Highcharts.Chart({
        chart: {
          renderTo: 'bullet',
          width: 1300,
          marginLeft: 50,
          marginRight: 50,
          marginTop: 19,
          marginBottom: -1
        },
        tooltip: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        xAxis: {
          text: {
            title: ''
          },
          visible: false,
          labels: {
            enabled: false
          },
        },
        yAxis: {
          plotLines: [
            {
              value: plot_num,
              width: 0,
              color: 'black',
              zIndex: 100,
              label: {
                rotation: 0,
                align: 'bottom',
                x: x,
                y: y,
                style: {
                  fontSize: '27px'
                },
                text: plot_text
              }
            },
          ],
          labels: {
            enabled: false
          },
          endOnTick: false,
          plotBands: data,
        },
        series: [
          {
            "data": [
              len
            ],
            "pointWidth": 1,
            "name": "Measure"
          }
        ],
      });
      var chart2 = new Highcharts.Chart({
        chart: {
          renderTo: 'container2',
          width: 1250,
          marginBottom: 26,
          marginTop: 10,
          marginLeft: 50,
          type: 'scatter',
          zoomType: 'xy'
        },
        title: {
          text: 'Ghi_A01G00036 in region A01:143582..145593 ± 0 kb',
          y: 34,
          style: {
            fontSize: '14px'
          }
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        xAxis: {
          title: {
            enabled: false,
            text: ''
          },
          startOnTick: false,
          endOnTick: false,
          showLastLabel: true,
          min: 1,
          max: len,
          visible: false,
        },
        yAxis: {
          visible: false,
          min: 4,
          max: 5
        },
        plotOptions: {
          scatter: {
            marker: {
              radius: 6,
              symbol: 'triangle-down',
            },
            tooltip: {
              headerFormat: '',
              pointFormat: '{point.name}'
            }
          },
          series: {
            cursor: 'pointer',
            point: {
              events: {
                click: function() {
                  //散点的点击事件
                  console.log(this.options.name)
                }
              }
            }
          }
        },
        series: [{
          data: scatter
        }
        ]
      });
    }
    </script>
    ```

=== "Vue"
    ```html
    <!-- npm install highcharts --save -->
    <template>
      <div>
        <div id="container1" style="height:45px;width:1300px"></div>
        <div id="container2" style="height:50px;width:1250px"></div>
      </div>
    </template>
    <script>
      import Highcharts from 'highcharts'
      export default {
        name: 'geneStructure',
        components: {},
        data() {
          return {
            title: '"Glyma.08G367700 in region Chr08:47792490..47793777 ± 0kb"',
            plotbands: [
              {
                from: 0,
                to: 702,
                name: '-',
                color: '#C9C9C9',
                zIndex: 20,
                label: {
                  align: 'bottom',
                  x: -24,
                  y: 22,
                  style: { fontSize: '30px' },
                  text: '←'
                }
              },
              { from: 703, to: 889, name: '-', color: '#0083B7', zIndex: 20 },
              { from: 994, to: 1106, name: '-', color: '#0083B7', zIndex: 20 },
              { from: 1107, to: 1287, name: '-', color: '#C9C9C9', zIndex: 20 }
            ],
            region_len: 1287,
            scatterData: [
              {
                name:
                  '1: pos:47792721||ref/alt:C/T(0.39/0.61)||type:3_prime_UTR_variant MODIFIER',
                x: 232,
                y: 5,
                chengdu: 'MODIFIER',
                color: '#303030\t'
              },
              {
                name:
                  '2: pos:47793019||ref/alt:C/T(0.39/0.61)||type:3_prime_UTR_variant MODIFIER',
                x: 530,
                y: 5,
                chengdu: 'MODIFIER',
                color: '#303030\t'
              },
              {
                name:
                  '3: pos:47793093||ref/alt:G/GAA(0.39/0.61)||type:3_prime_UTR_variant MODIFIER',
                x: 604,
                y: 5,
                chengdu: 'MODIFIER',
                color: '#303030\t'
              }
            ]
          }
        },
        mounted() {
          this.draw()
        },
        methods: {
          draw() {
            var that = this
            Highcharts.setOptions({
              chart: {
                width: 1300,
                type: 'bar'
              },
              title: {
                text: null
              },
              legend: {
                enabled: false
              },
              xAxis: {
                tickLength: 0,
                lineColor: '#FFFFFF',
                lineWidth: 0,
                labels: {
                  style: { fontWeight: 'bold' }
                }
              },
              yAxis: {
                min: 0,
                minPadding: 0,
                maxPadding: 0,
                tickColor: '#FFFFFF',
                tickWidth: 1,
                tickLength: 3,
                gridLineWidth: 0,
                endOnTick: true,
                title: { text: '' },
                labels: {
                  y: 10,
                  style: {
                    fontSize: '8px'
                  }
                }
              },
              plotOptions: {
                bar: {
                  color: '#333333',
                  shadow: false,
                  borderWidth: 0
                }
              },
              credits: {
                enabled: false
              },
              exporting: {
                enabled: false
              }
            })
            Highcharts.chart('container1', {
              chart: {
                marginBottom: -1,
                marginLeft: 50,
                marginRight: 50,
                marginTop: 19,
                width: 1300
              },
              tooltip: {
                enabled: false
              },
              xAxis: {
                visible: false
              },
              yAxis: {
                endOnTick: false,
                labels: {
                  enabled: false
                },
                plotBands: this.plotbands,
                plotLines: [
                  {
                    value: this.region_len,
                    width: 0,
                    color: 'black',
                    zIndex: 100
                  }
                ],
                title: null
              },
              series: [
                {
                  data: [this.region_len],
                  pointWidth: 1
                }
              ]
            })
            new Highcharts.Chart('container2', {
              chart: {
                width: 1250,
                marginBottom: 26,
                marginTop: 10,
                marginLeft: 50,
                type: 'scatter',
                zoomType: 'xy'
              },
              title: {
                text: this.title,
                y: 34,
                style: {
                  fontSize: '14px'
                }
              },
              credits: {
                enabled: false
              },
              exporting: {
                enabled: false
              },
              legend: {
                enabled: false
              },
              xAxis: {
                title: {
                  enabled: false,
                  text: ''
                },
                startOnTick: false,
                endOnTick: false,
                showLastLabel: true,
                min: 0,
                max: this.region_len - 1,
                visible: false
              },
              yAxis: {
                visible: false,
                min: 4,
                max: 5
              },
              plotOptions: {
                scatter: {
                  marker: {
                    radius: 6,
                    symbol: 'triangle-down'
                  },
                  tooltip: {
                    headerFormat: '',
                    pointFormat: '{point.name}'
                  }
                },
                series: {
                  cursor: 'pointer',
                  point: {
                    events: {
                      click: function() {
                        console.log(this.options.name)
                      }
                    }
                  }
                }
              },
              series: [
                {
                  data: this.scatterData
                }
              ]
            })
          }
        }
      }
    </script>
    ```