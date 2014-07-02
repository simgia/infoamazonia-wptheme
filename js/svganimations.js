(function($) {

	$(document).ready(function() {

		var animatePath = function(path, fps, cb) {

			fps = fps || 100;

			var current = 0,
				handle = 0,
				length = path[0].getTotalLength();

			path.css({
				strokeDasharray: length + ' ' + length,
				strokeDashoffset: length
			});

			var draw = function() {
				var progress = current/fps;
				if(progress > 1) {
					window.cancelAnimationFrame(handle);
					if(typeof cb == 'function')
						cb();
				} else {
					current++;
					path.css({
						strokeDashoffset: Math.floor(length * (1 - progress))
					});
					handle = window.requestAnimationFrame(draw);
				}
			};

			draw();

		}

		var animateSvgPaths = function(svg, fps) {

			var paths = svg.find('path');

			paths.each(function() {
				animatePath($(this), fps);
			});

		};

		/*
		 * DATA
		 */

		(function() {

			// snap
			var svg = $('#svg_data');

			svg.find('.chart,.data-container').each(function() {
				var l = $(this)[0].getTotalLength();
				$(this).css({
					strokeDasharray: l + ' ' + l,
					strokeDashoffset: l
				});
			});

			var sVBars = [
				Snap('.v-bar-1'),
				Snap('.v-bar-2'),
				Snap('.v-bar-3')
			];

			var sVVals = [
				[22.013, 15.918],
				[13.493, 24.438],
				[5.5050001, 32.425999]
			];

			_.each(sVBars, function(sVBar, i) {

				sVBar.attr({
					height: 0,
					y: sVVals[i][1] - sVVals[i][0]
				});

				sVBar.animate({height: sVVals[i][0], y: sVVals[i][1]}, 1000);

			});

			var sHBars = [
				Snap('.h-bar-1'),
				Snap('.h-bar-2'),
				Snap('.h-bar-3')
			];

			_.each(sHBars, function(sHBar, i) {

				sHBar.attr({width: 0});

				var timeBtwn = i * 100;

				var duration = 1000 - timeBtwn;

				setTimeout(function() {

					sHBar.animate({width: 37.807999}, duration);

				}, timeBtwn);

			});

			Snap('.data-container').attr({'fill-opacity': 0});
			Snap('.chart.part-1').attr({'fill-opacity':0});
			Snap('.chart.part-2').attr({'fill-opacity':0});
			Snap('.chart.part-3').attr({'fill-opacity':0});

			setTimeout(function() {
				animatePath(svg.find('.chart'), 40, function() {
					Snap('.chart.part-1').animate({'fill-opacity': '1', 'stroke-width': 0}, 500);
					Snap('.chart.part-2').animate({'fill-opacity': '1', 'stroke-width': 0}, 500);
					Snap('.chart.part-3').animate({'fill-opacity': '1', 'stroke-width': 0}, 500);
					animatePath(svg.find('.data-container'), 100, function() {
						Snap('.data-container').animate({'fill-opacity': '1', 'stroke-width': 0}, 500);
					});
				});

			}, 1000);
		})(jQuery);

		/*
		 * MAP + DESIGN + DATA
		 */

		(function() {
			var id = '#svg_map_data_design';
			var svg = $(id);
			Snap(id + ' .amazon').attr({'fill-opacity': 0});
			Snap(id + ' .data-content').attr({'fill-opacity': 0});
			Snap(id + ' .data-content').attr({'stroke-opacity': 0});
			Snap(id + ' .plus tspan').attr({'fill-opacity': 0});
			Snap(id + ' .design-content').attr({'fill-opacity': 0});
			Snap(id + ' .design-content').attr({'stroke-opacity': 0});
			animatePath(svg.find('.amazon'), 100, function() {
				Snap(id + ' .amazon').animate({
					'fill-opacity': .1
				}, 500);
				Snap(id + ' .data-content').animate({
					'transform': 'translate(10,0)',
					'fill-opacity': .7
				}, 500);
				Snap(id + ' .design-content').animate({
					'transform': 'translate(-10,0)',
					'fill-opacity': .7
				}, 500);
				setTimeout(function() {
					Snap(id + ' .plus tspan').animate({
						'fill-opacity': 1
					}, 500);
				}, 500);
			});
		})();


	});

})(jQuery);