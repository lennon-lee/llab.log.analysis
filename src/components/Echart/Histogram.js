import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

class Histogram extends Component {
    getOption = (title, xData, seriesData) => ({
        grid : {
			left : 60,
			right : 50,
			top : 40
		},
		title : {
			text : title || '',
			padding : 10,
			textStyle : {
				fontSize : 14
			}
		},
		tooltip : {
			trigger : 'axis',
			formatter : function(param) {
				return param[0].name + '<br />' + param[0].value;
			}
		},
		dataZoom : [ {
			type : 'inside',
			start : 0,
			end : 100
		}, {
			show : true,
			start : 0,
			end : 100,
			textStyle : {
				fontSize : 6
			}
		} ],
		toolbox : {
			show : true,
			feature : {
				mark : {
					show : true
				},
				magicType : {
					show : true,
					type : [ 'line', 'bar' ],
					title : {
						line : 'line',
						bar : 'bar',
						stack : 'stack',
						tiled : 'tiled'
					}
				},
				restore : {
					show : true,
					title : 'restore'
				},
				saveAsImage : {
					show : true,
					title : 'save'
				}
			}
		},
		xAxis : {
			data : xData
		},
		yAxis : {
			splitArea : {
				show : true
			}
		},
		series : seriesData
    });
    render() {
        const { title, xData, series } = this.props;
        const seriesData = [];
        series.forEach(obj => {            
            seriesData.push({
                name : obj.name || '',
                type : 'bar',
                smooth : true,
                barCategoryGap : '40%',                
                markLine : {
                    silent : true,
                    symbolSize : 5
                },
                data : obj.data
            })
        });

        return (
            <div className="Histogram">
                <ReactEcharts option={this.getOption(title, xData, seriesData)} style={{ height: 300 }} />
            </div>
        );
    }
}
export default Histogram;