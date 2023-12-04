import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { useLayoutEffect, useRef } from 'react';

export const Chart = (props:any) => {
  const {prediction} = props
  const chartRef = useRef<am5xy.XYChart>();
  console.log("predictionéé")
  const predictions = prediction[0] 
  console.log(predictions)
  useLayoutEffect(() => {
    let root = am5.Root.new('chartdiv');
    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: 'panX',
        wheelY: 'zoomX',
        pinchZoomX: true,
      }),
    );
    let cursor = chart.set('cursor', am5xy.XYCursor.new(root, {}));
    cursor.lineY.set('visible', false);

    let xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
    xRenderer.labels.template.setAll({
      rotation: -90,
      centerY: am5.p50,
      centerX: am5.p100,
      paddingRight: 15,
    });
    xRenderer.grid.template.setAll({
      location: 1,
    });

    let data = [
      {
        disease: 'Vascular Tumors',
        value: 100*predictions[0],
      },
      {
        disease: 'HPV and other STDs',
        value: 100*predictions[1],
      },
      {
        disease: 'Melanoma skin cancer',
        value: 100*predictions[2],
      },
      {
        disease: 'Bullous Disease',
        value: 100*predictions[3],
      },
      {
        disease: 'Exanthems eruption',
        value: 100*predictions[4],
      },
      {
        disease: 'Lupus connective tissuer',
        value: 100*predictions[5],
      }
    ];

    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: 'disease',
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {}),
      }),
    );

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1,
        }),
      }),
    );

    let series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: 'Series 1',
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: 'value',
        sequencedInterpolation: true,
        categoryXField: 'disease',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
      }),
    );
    series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
    series.columns.template.adapters.add('fill', function (fill, target) {
      return chart?.get('colors')?.getIndex(series.columns.indexOf(target));
    });
    series.columns.template.adapters.add('stroke', function (stroke, target) {
      return chart?.get('colors')?.getIndex(series.columns.indexOf(target));
    });

    xAxis.data.setAll(data);
    series.data.setAll(data);

    series.appear(1000);
    chart.appear(1000, 100);

    chartRef.current = chart;

    return () => {
      root.dispose();
    };
  }, []);

  // When the paddingRight prop changes it will update the chart
  useLayoutEffect(() => {
    chartRef.current?.set('paddingRight', 3);
  }, [3]);

  return (
    <div className="container">
      <div id="chartdiv" className="chart"></div>;
    </div>
  );
};