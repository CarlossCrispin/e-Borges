
$(document).ready(function() {
	$('#example').dynatable({
			table: {
					defaultColumnIdStyle: 'lowercase'
				},
				features: {
					paginate: true,
					search: true,
					recordCount: true,
					perPageSelect: true
				},
	});
} );
