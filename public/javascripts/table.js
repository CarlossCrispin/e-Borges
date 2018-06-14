
// $(document).ready( function() {
// 	$('#datatable').dynatable({
// 		table: {
// 		  defaultColumnIdStyle: 'lowercase'
// 		},
// 		features: {
// 		  paginate: true,
// 		  search: true,
// 		  recordCount: false,
// 		  perPageSelect: true
// 		},
		
// 	  });    	
// });
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
