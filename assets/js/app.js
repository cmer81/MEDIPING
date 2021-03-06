/*
 Copyright 2017 Sefa Eyeoglu

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

(function () {
	$(document).ready(function () {
		var wrapper = $('.wrapper');

		//INIT
		var medipingTheme = {
			global: {
				useUTC: false
			},
			colors: ['#F44336', '#03A9F4', '#FFEB3B', '#8BC34A', '#673AB7', '#009688', '#795548', '#00BCD4', '#FF5722', '#3F51B5', '#9C27B0', '#4CAF50', '#CDDC39', '#FFC107', '#FF9800'],
			chart: {
				backgroundColor: '#263238',
				borderWidth: 0,
				borderRadius: 0
			},
			title: {
				style: {
					color: '#ECEFF1',
					font: 'bold 16px "Roboto", "Helvetica", "Verdana", "Arial", sans-serif'
				}
			},
			subtitle: {
				style: {
					color: '#ECEFF1',
					font: 'bold 12px "Roboto", "Helvetica", "Verdana", "Arial", sans-serif'
				}
			},

			legend: {
				itemStyle: {
					font: '9pt "Roboto", "Helvetica", "Verdana", "Arial", sans-serif',
					color: '#ECEFF1'
				},
				itemHoverStyle: {
					color: '#B0BEC5'
				},
				itemHiddenStyle: {
					color: '#B0BEC5'
				}
			},
			xAxis: {
				gridLineWidth: 0,
				lineColor: '#607D8B',
				tickColor: '#607D8B',
				labels: {
					style: {
						color: '#607D8B',
						font: '12px "Roboto", "Helvetica", "Verdana", "Arial", sans-serif'
					}
				},
				title: {
					style: {
						color: '#607D8B',
						font: 'thin 12px "Roboto", "Helvetica", "Verdana", "Arial", sans-serif'
					}
				}
			},
			yAxis: {
				alternateGridColor: null,
				minorTickInterval: null,
				lineColor: '#607D8B',
				tickColor: '#607D8B',
				gridLineColor: '#607D8B',
				minorGridLineColor: '#607D8B',
				lineWidth: 0,
				tickWidth: 0,
				labels: {
					style: {
						color: '#607D8B',
						font: '12px "Roboto", "Helvetica", "Verdana", "Arial", sans-serif'
					}
				},
				title: {
					style: {
						color: '#607D8B',
						font: 'thin 12px "Roboto", "Helvetica", "Verdana", "Arial", sans-serif'
					}
				}
			}
		};
		Highcharts.setOptions(medipingTheme);

		var last1hSeries = [],
			last24hSeries = [],
			last7dSeries = [],
			last365dSeries = [];

		var last1hChart = {
			chart: {
				type: 'spline',
				animation: Highcharts.svg
			},
			title: {
				text: 'last 1h'
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 150
			},
			yAxis: {
				title: {
					text: 'ms'
				}
			},
			tooltip: {
				formatter: function () {
					return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + this.y + "ms";
				}
			},
			legend: {
				enabled: true
			},
			exporting: {
				enabled: false
			},
			series: last1hSeries
		};

		var last24hChart = {
			chart: {
				type: 'spline',
				animation: Highcharts.svg
			},
			title: {
				text: 'last 24h'
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 150
			},
			yAxis: {
				title: {
					text: 'ms'
				}
			},
			tooltip: {
				formatter: function () {
					return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + this.y + "ms";
				}
			},
			legend: {
				enabled: true
			},
			exporting: {
				enabled: false
			},
			series: last24hSeries
		};

		var last7dChart = {
			chart: {
				type: 'spline',
				animation: Highcharts.svg
			},
			title: {
				text: 'last 7d'
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 150
			},
			yAxis: {
				title: {
					text: 'ms'
				}
			},
			tooltip: {
				formatter: function () {
					return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + this.y + "ms";
				}
			},
			legend: {
				enabled: true
			},
			exporting: {
				enabled: false
			},
			series: last7dSeries
		};

		var last365dChart = {
			chart: {
				type: 'spline',
				animation: Highcharts.svg
			},
			title: {
				text: 'last 365d'
			},
			xAxis: {
				type: 'datetime',
				tickPixelInterval: 150
			},
			yAxis: {
				title: {
					text: 'ms'
				}
			},
			tooltip: {
				formatter: function () {
					return '<b>' + this.series.name + '</b><br/>' + Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' + this.y + "ms";
				}
			},
			legend: {
				enabled: true
			},
			exporting: {
				enabled: false
			},
			series: last365dSeries
		};

		$.ajax({
			url: "collectedData.json",
			success: function (data) {
				$.each(data, function (host, hostData) {
					last1hSeries.push({
						name: host,
						data: calculateDisplayedPoints(hostData, 60, 1)
					});

					last24hSeries.push({
						name: host,
						data: calculateDisplayedPoints(hostData, 60 * 24, 2)
					});

					last7dSeries.push({
						name: host,
						data: calculateDisplayedPoints(hostData, 60 * 24 * 7, 15)
					});

					last365dSeries.push({
						name: host,
						data: calculateDisplayedPoints(hostData, 60 * 24 * 365, 720)
					});
				});


				$("body").prepend("<ul class='sidebar'>\n" +
					"<li class='sidebar-header'><h3>MEDIPING</h3></li>\n" +
					"<li><a href='#last1h' data-close='sidebar'>last 1h</a></li>\n" +
					"<li><a href='#last24h' data-close='sidebar'>last 24h</a></li>\n" +
					"<li><a href='#last7d' data-close='sidebar'>last 7d</a></li>\n" +
					"<li><a href='#last365d' data-close='sidebar'>last 365d</a></li>\n" +
					"</ul>\n" +
					"<div class='sidebar-backdrop' data-close='sidebar'></div>\n" +
					"<ul class='navbar'>\n" +
					"<li><button class='sidebar-toggle' data-open='sidebar'></button></li>\n" +
					"</ul>\n");
				wrapper.html("<div class='stat' id='last1h'></div>\n" +
					"<div class='stat' id='last24h'></div>\n" +
					"<div class='stat' id='last7d'></div>\n" +
					"<div class='stat' id='last365d'></div>\n");

				var last1h = $("#last1h"),
					last24h = $("#last24h"),
					last7d = $("#last7d"),
					last365d = $("#last365d");

				last1h.highcharts(last1hChart);
				last24h.highcharts(last24hChart);
				last7d.highcharts(last7dChart);
				last365d.highcharts(last365dChart);
			}
		});
		$("body").on("click", "*", function (e) {
			var self = $(this),
				body = $("body");

			if (self.data("close") === "sidebar") {
				body.removeClass("show-sidebar");
				return;
			} else if (self.data("open") === "sidebar") {
				body.addClass("show-sidebar");
				return;
			}
		});
	});

	/**
	 * Calculates the displayed points of the charts by the arguments.
	 * @param data data, that is probably too big
	 * @param maximumLength maximum time span for the displayed points (now - maximumLength)
	 * @param maximumChunkSize maximum size of the chunks that will be used
	 * @returns {Array} processed array
	 */
	function calculateDisplayedPoints(data, maximumLength, maximumChunkSize) {
		var points = [];
		var displayedData = data;
		if (displayedData.length > maximumLength)
			displayedData = data.slice(data.length - maximumLength);
		if (displayedData.length > 1000 && maximumChunkSize > 1) {
			var tempArray = displayedData.slice;
			do {
				tempArray = averageChunks(displayedData, maximumChunkSize);
				maximumChunkSize--;
			} while (tempArray.length < 500);
			displayedData = tempArray;
		}
		$.each(displayedData, function (i, entry) {
			if (entry.time !== -1) {
				points.push({
					x: entry.timestamp * 1000,
					y: roundToPlaces(entry.time * 1000, 3)
				});
			}
		});
		return points;
	}

	/**
	 * Rounds number to decimal places
	 * Example:
	 * number = 12.45784
	 * places = 3
	 * returns: 12.458
	 * @param number the number to be rounded
	 * @param places the number of places to be rounded to
	 * @returns {number} rounded number as int
	 */
	function roundToPlaces(number, places) {
		var divided = "1";
		for (var i = 0; i < places; i++) {
			divided += "0";
		}
		divided = Number(divided);
		return Math.round(number * divided) / divided
	}

	/**
	 * Calculates averages of the given array which will be split in the specified chunk size
	 * @param data array to be processed
	 * @param chunkSize size of individual chunks
	 * @returns {Array} processed array
	 */
	function averageChunks(data, chunkSize) {
		var processed = [];
		for (var i = 0; i < data.length; i += chunkSize) {
			if (i > data.length)
				i = data.length;
			var tempArray = data.slice(i, i + chunkSize);
			var sum = 0;
			var timestamp = 0;
			$.each(tempArray, function (i, entry) {
				if (entry.time === -1)
					return;
				sum += entry.time;
				timestamp = entry.timestamp; //last timestamp
			});
			var avg = sum / tempArray.length;
			processed.push({
				timestamp: timestamp,
				time: avg
			});
		}
		return processed;
	}

})();