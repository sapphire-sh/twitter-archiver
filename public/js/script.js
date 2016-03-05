function f() {
	$.get('/index', function(data) {
	console.log(data.length);
		if(data.length === 0) {
			setTimeout(f, 2000);
		}
		else {
			var year;
			var month;
			var date;
			
			_.each(data, function(index) {
				var date = new Date(index.date);
				if(year !== date.getFullYear()) {
					year = date.getFullYear();
					$('#accordion').append('<a href="#' + year + '" class="list-group-item" data-toggle="collapse"><span class="glyphicon glyphicon-chevron-right"></span>' + year + '</a>');
					$('#accordion').append('<div class="list-group collapse" id="' + year + '">');
				}
				
				if(month !== date.getMonth() + 1) {
					month = date.getMonth() + 1;
					$('#' + year).append('<a href="#' + year + '-' + month + '" class="list-group-item" data-toggle="collapse"><span class="glyphicon glyphicon-chevron-right"></span>' + year + '-' + (month < 10 ? '0' + month : '' + month) + '</a>');
					$('#' + year).append('<div class="list-group collapse" id="' + year + '-' + month + '">');
				}
				
				$('#' + year + '-' + month).append('<a href="#' + year + '-' + month + '-' + date.getDate() + '" class="list-group-item" data-toggle="collapse"><span class="glyphicon glyphicon-chevron-right"></span>' + year + '-' + (month < 10 ? '0' + month : '' + month) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : '' + date.getDate()) + '</a>');
				$('#' + year + '-' + month).append('<div class="list-group collapse" id="' + year + '-' + month + '-' + date.getDate() + '">');
				
				_.each(index.count, function(count, i) {
					$('#' + year + '-' + month + '-' + date.getDate()).append('<a href="#" class="list-group-item">' + (i < 10 ? '0' + i : '' + i) + '</a>');
				});
			});
		}
	});
}

f();
