clearArray = function (A) {
	while(A.length > 0) {
	    A.pop();
	}
};

createLoyaltyCardPointPerPriceDatatable = function(gridId) {
	
	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"if><"clear">',
		"bPaginate": false,
		"bAutoWidth" : false,
		"columnDefs": [
		    {"sortable": false, "aTargets": [ 0, 1, 2 ] }
		]
	}).rowGrouping({bExpandableGrouping: true});
	
	return oTable;
	
};

createSendingsDatatable = function (gridId, url, fnDrawCallback) {

	var oTable = $('#' + gridId).dataTable({
		
		"dom": 'rt<"bottom"iflp><"clear">',
		"stateSave": true,
		"bServerSide": true,
		"paging": true,
		"sAjaxSource" : url,
		"bAutoWidth" : false,
		"aaSorting": [[ 1, "desc" ]],
		"columnDefs": [
			{
				"render": function (data, type, row) {
					
					var disp = "<span class='pull-right'>";
					if (row.ispush == true) {
						disp += "<img src='/images/2me/mini.png' data-placement='left' alt='2me' rel='tooltip' data-original-title='envio por 2me' />";
					}
					if (row.issms == true) {
						disp += "<i class='fa fa-fw fa-mobile' data-placement='left' rel='tooltip' data-original-title='envio por sms'></i>";
					}
					if (row.ismail == true) {
						disp += "<i class='fa fa-fw fa-envelope' data-placement='left' rel='tooltip' data-original-title='envio por email'></i>";
					}
					disp += "</span>";
					
					var row2 = "<div class='row' style='height:42px;overflow:hidden'>" +
					
						"<div class='col-xs-11 col-sm-11 col-md-10 col-lg-10'>" +
							
							"<span class='badge bg-color-orange' style='position:absolute;left:34px;top:0px;'>" +
								row.nusers +
							"</span>" +
							
							"<img src='/images/smartadmin/avatars/users.png' class='img-rounded' style='width:37px;float:left;border:solid 1px gray;margin-right:20px;margin-top:1px;'>" +
							
							"<b>" + row.subject + "</b>" +
							
						"</div>" +
						
						"<div class='col-xs-1 col-sm-1 col-md-2 col-lg-2'>" + disp + "</div>" +
						
					"</div>";
					
				     return row2;
				},
				"targets": 0
			},{
				"render": function (data, type, row) {
					return row.date;
				},
				"targets": 1
			},
			{ "sortable": false, "targets": [ 0 ] },
            { "sType": "date-euro", "sClass": "small-td", "aTargets": [ 1 ] }
		],
		"fnPreDrawCallback": function() {

            $('#loading-mask').show();
            
        },
		"fnDrawCallback": function() {
			
			$('#loading-mask').hide();
			
			$('#' + gridId + ' > tbody > tr').click(function(e) {
				navigateURL("/manage/sendings/view?id=" + $(this).attr('id'), $('#content'));
			});
			
			nav_page_height();

			$("[rel=tooltip]").tooltip();
			
			if (fnDrawCallback != null) {
				fnDrawCallback();
			}
			
		}
	});

	oTable.fnFilterOnReturn();
	
	return oTable;
	
};


createUserMessagesDatatable = function (gridId, url) {
	
	oTable = $('#' + gridId).dataTable({
		"dom": '<"dataTables_filter"f>rt<"bottom"ip><"clear">',
		"bAutoWidth" : false,
		"bServerSide": true,
		"stateSave": true,
		"paging": true,
		"sAjaxSource" : url,
		"aaSorting": [[ 2, "desc" ]],
		"columnDefs": [
			{
				"render": function (data, type, row) {
					
					var disp = "<span class='pull-right'>";
					if (row.ispush == true) {
						disp += "<img src='/images/2me/mini.png' data-placement='left' alt='2me' rel='tooltip' data-original-title='envio por 2me' />";
					}
					if (row.issms == true) {
						disp += "<i class='fa fa-fw fa-mobile' data-placement='left' rel='tooltip' data-original-title='envio por sms'></i>";
					}
					if (row.ismail == true) {
						disp += "<i class='fa fa-fw fa-envelope' data-placement='left' rel='tooltip' data-original-title='envio por email'></i>";
					}
					disp += "</span>";
					
					var type;
					if (row.receiver) {
						type = "<i class='fa fa-arrow-left'></i>";
					}
					else {
						type = "<i class='fa fa-arrow-right'></i>";
					}
					
					var row2 =
						"<div class='col-sm-2 col-md-1 col-lg-1'>" +
							"<div class='message-type'>" + type + "</div>" +
						"</div>" +
						"<div class='col-sm-10 col-md-11 col-lg-11'>" +
							disp +
							"<span>" + row.subject + "<br/><small>" + row.message + "</small></span>" +
						"</div>";
						
				     return row2;
				},
				"targets": 0
			},{
				"render": function (data, type, row) {
					
					if (row.hasdoc == '1') {
						
						return '<div><a class="txt-color-darken" data-placement="left" rel="tooltip" href="javascript:void(0);"><i class="fa fa-paperclip fa-lg"></i></a></div>';
					}
					else {
						return '';
					}
				},
				"targets": 1
			},{
				"render": function (data, type, row) {
					return row.date;
				},
				"targets": 2
			},{
				"render": function (data, type, row) {
					return row.dreceived;
				},
				"targets": 3
			},{
				"render": function (data, type, row) {
					return row.dread;
				},
				"targets": 4
			},
			{ "sType": "date-euro", "sClass": "small-td", "aTargets": [ 2, 3, 4 ] },
			{ "sortable": false, "targets": [ 0, 1 ] }
		],
		"fnPreDrawCallback": function() {

            $('#loading-mask').show();
            
        },
		"fnDrawCallback": function() {

			$('#loading-mask').hide();
			
			function getMessage($this) {
				
				showMessage($this.attr('id'));
				
				if ($this.hasClass('message-unread')) {
					
					$this.removeClass('message-unread');
					
					getUnreadMessages();
				}
			}
			
			$("#" + gridId + " > tbody > tr").click(function() {
				getMessage($(this));
			});
			
			$("[rel=tooltip]").tooltip();
			
			nav_page_height();
		}
	});

	oTable.fnFilterOnReturn();
	
	return oTable;
};

createLogDatatable = function(gridId, url, fnDrawCallback) {
	
	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"ip><"clear">',
		"bAutoWidth" : false,
		"bServerSide": true,
		"stateSave": true,
		"paging": true,
		"sAjaxSource": url,
		"columnDefs": [
 		{
 			"render": function (data, type, row) {
 					var usuario = row.usuario;
 				    return usuario;
 			}, 
 			"targets": 0
 				
 		},{
			"render": function (data, type, row) {
				var fecha = row.fecha;
			    return fecha;
			},
			"targets": 1
		},{
			"render": function (data, type, row) {
				var operacion = row.operacion;
			    return operacion;
			},
			"targets": 2
		},{
			"render": function (data, type, row) {
				var fichero = "";
				if(row.operacion.substring(0, 1) =='I') {
					fichero= '<a onclick=' + '"javascript:getCSV(\''+ row.id +'\',\''+ row.operacion +'\')" class="glyphicon glyphicon-indent-right"></a>';
				}
				else {
					fichero= '---';
				}
				return fichero;
			},
			"targets": 3
		},{
			"render": function (data, type, row) {
				var resultado = "";
				if(row.operacion.substring(0, 1) =='I') {
					resultado = '<a onclick="javascript:getXML(\''+ row.id +'\',\''+ row.operacion +'\')" class="glyphicon glyphicon-indent-right"></a>';
				}
				else {
					resultado = '---';
				}
			    return resultado;
			},
			"targets": 4
		},{
			"render": function (data, type, row) {	
				var descargar = '<a href="/manage/import/getLogFile?id=' + row.id + '&data-id=' + row.id + '"><span class="glyphicon glyphicon-floppy-save"></span></a>';
				return descargar;
			},
			"targets": 5
		},
		{ "sortable": false, "targets": [ 0, 1, 2, 3, 4, 5] }
 		],
		"fnPreDrawCallback": function() {

            $('#loading-mask').show();
            
        },
		"fnDrawCallback": function() {

			$('#loading-mask').hide();

			if (fnDrawCallback != null) {
				fnDrawCallback();
			}
			
			$("[rel=tooltip]").tooltip();
			
			nav_page_height();
		}
	});
	
	return oTable;
	
};


createUsersDatatable = function(gridId, url, fnDrawCallback, selectionArray) {
	
	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"ip><"clear">',
		"bServerSide": true,
		"stateSave": true,
		"paging": true,
		"sAjaxSource": url,
		"bAutoWidth" : false,
		"aaSorting": [[ 1, "desc" ]],
		"fnRowCallback": function ( row, data, index ) {
			
			if (data.blo == 1) {
				$(row).addClass('disabled-row');
			}
			
			if (data.is2me == 0 && data.isapp == 0) {
				$(row).addClass('disabled-row');
			}
         },
		"columnDefs": [
			{
				"render": function (data, type, row ) {
					
					if (selectionArray && selectionArray.indexOf(row.id) != -1) {
						
						return "<label class='checkbox'><input type='checkbox' id='" + row.id + "' checked='checked' /><i></i></label>";
					}
					else {
						
						return "<label class='checkbox'><input type='checkbox' id='" + row.id + "' /><i></i></label>";
					}
				},
				"className": "smart-form",
				"targets": 0
			},{
				"render": function (data, type, row) {
					
					var mail = "";
					if (row.mail != '') {
						mail = "<span style='font-weight: normal; color: #333333;'>" +
							"<br/> <small>&#60;" + row.mail + "&#62;</small>" + 
						"</span>";
					}
					
					var mobile = "";
					if (row.name == '') {
						if (row.mob) {
							mobile = '(+' + row.pre + ') ' + row.mob;
						}
					}
					else {
						if (row.mob) {
							mobile = ' - ' + '(+' + row.pre + ') ' + row.mob;
						}
					}
					
					var type = "";
					if (row.is2me == true) {
						type = "<img class='pull-right' src='/images/2me/mini.png' alt='2me' data-original-title='Usuario 2me' data-placement='left' rel='tooltip' />";
					}
					if (row.isapp == true) {
						type += "<i class='fa fa-user pull-right' data-original-title='Usuario propio' data-placement='left' rel='tooltip'></i>";
					}
					
					var row2 = "<img style='width:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;' class='img-rounded' src='/manage/users/logo?id=" + row.id + "' />" +
						"<div>" +
							row.name + "<small>" + mobile + "</small>" + mail + type +
						"</div>";
					
				     return row2;
				},
				"targets": 1
			},{
				"render": function (data, type, row) {
					if(row.is2me == 1)
						return "Sí";
					else
						return "No";
				},
				"targets": 2
			},{
				"render": function (data, type, row) {
					if(row.isapp == 1)
						return "Sí";
					else
						return "No";
					
				},
				"targets": 3
			},{
				"render": function (data, type, row) {
					if(row.blo == 1)
						return "Sí";
					else
						return "No";
					
				},
				"targets": 4
			},{
				"render": function (data, type, row) {
					if(row.adm == 1)
						return "Sí";
					else
						return "No";
				},
				"targets": 5
			},{
				"render": function (data, type, row) {
					return row.m1;
				}, "targets": 6
			},{
				"render": function (data, type, row) {
					return row.m2;
				},"targets": 7
			},{
				"render": function (data, type, row) {
					return row.m3;
				},"targets": 8
			},{
				"render": function (data, type, row) {
					return row.m4;
				},"targets": 9
			},
            { "sortable": false, "targets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] }
		],
		"fnPreDrawCallback": function() {

            $('#loading-mask').show();
            
        },
		"fnDrawCallback": function() {

			$('#loading-mask').hide();

			if (fnDrawCallback != null) {
				fnDrawCallback();
			}
			
			$("[rel=tooltip]").tooltip();
			
			nav_page_height();
		}
	});

    // Variables del datatable
    var table = $('#' + gridId).DataTable();
    var oSettings = oTable.fnSettings();
    
	// Filters
    
    $('#' + gridId + ' tfoot th').each(function(i) {

    	var table = $('#' + gridId).DataTable();
    	
    	var textFilters = [1, 6, 7, 8, 9];
    	var selectFilters = [2, 3, 4, 5];
		
    	if ($.inArray($(this).index(), textFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;

    		var title = $('#' + gridId + ' thead th').eq($(this).index()).text().trim();
    		$(this).html('<input type="text" value="' + search_string + '" placeholder="' + title + '" class="search_init text_filter form-control width" />');
    	}
    	else if ($.inArray($(this).index(), selectFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;
    		
    		var select = '<select class="search_init select_filter form-control width"><option value=""></option>';
    		if (search_string == 'Sí') {
    			select += '<option value="Sí" selected="selected">Sí</option>';
    		}
    		else {
    			select += '<option value="Sí">Sí</option>';
    		}
    		if (search_string == 'No') {
    			select += '<option value="No" selected="selected">No</option>';
    		}
    		else {
    			select += '<option value="No">No</option>';
    		}
    		select += '</select>';
    		
    		$(select)
	            .appendTo( $(this).empty() )
	            .on( 'change', function () {
	                table.column(i)
	                    .search($(this).val(), true, false)
	                    .draw();
	            });
    	}
    	
    });
    
    // Eventos
    
    $('#' + gridId + " tfoot input").on( 'keypress', function (e) {
    	if (e.which == 13) {
	        table
	            .column( $(this).parent().index() + ':visible' )
	            .search( this.value )
	            .draw();
    	}
    });
    
    $('#' + gridId + " > thead > tr > th > div > ul > li > .select-all").click(function () {
	    	
		clearArray(selectionArray);
		
     	$('#' + gridId + ' > tbody > tr ').each(function(e) {
     		
			$(this).find('input:checkbox:first').prop('checked', true);
		});
		
		$.ajax({
			type: "POST",
			url: '/manage/users/getAllNotifierUsers',
			data: {
				'sSearch_1': $('#' + gridId + ' > tfoot > tr > #sSearch_1 > span > input').val(),
				'sSearch_2': $('#' + gridId + ' > tfoot > tr > #sSearch_2 > span > input').val(),
				'sSearch_3': $('#' + gridId + ' > tfoot > tr > #sSearch_3 > span > input').val(),
				'sSearch_4': $('#' + gridId + ' > tfoot > tr > #sSearch_4 > span > input').val(),
				'sSearch_5': $('#' + gridId + ' > tfoot > tr > #sSearch_5 > span > input').val(),
				'sSearch_6': $('#' + gridId + ' > tfoot > tr > #sSearch_6 > span > input').val(),
				'sSearch_7': $('#' + gridId + ' > tfoot > tr > #sSearch_7 > span > input').val(),
				'sSearch_8': $('#' + gridId + ' > tfoot > tr > #sSearch_8 > span > input').val(),
				'sSearch_9': $('#' + gridId + ' > tfoot > tr > #sSearch_9 > span > input').val()
			},
			success: function(response) {
				
				var obj = jQuery.parseJSON(response);
				
				$.each(obj, function(key,value) {
					
					selectionArray.push(value.ID);
				});
			}
		});
    });
    
    $('#' + gridId + " > thead > tr > th > div > ul > li > .select-none").click(function () {

		clearArray(selectionArray);
    	
    	$('#' + gridId + ' > tbody > tr ').each(function(e) {
    		
			$(this).find('input:checkbox:first').prop('checked', false);
		});
    });
	
    $('#' + gridId + " > thead > tr > th > label > input").click(function () {
    	
    	if ($('#' + gridId + ' > thead > tr > th > label > input').is(':checked')) {
    		
	    	$('#' + gridId + ' > tbody > tr ').each(function(e) {
	    		
				$(this).find('input:checkbox:first').prop('checked', true);

				var index = selectionArray.indexOf($(this).attr('id'));
				
				if (index == -1) {
					selectionArray.push($(this).attr('id'));
				}
			});
    	}
    	else {
    		
    		$('#' + gridId + ' > tbody > tr ').each(function(e) {
	    		
				$(this).find('input:checkbox:first').prop('checked', false);
				
				var index = selectionArray.indexOf($(this).attr('id'));
				
				if (index != -1) {
					selectionArray.splice(index, 1);
				}
				else {
					selectionArray.push($(this).attr('id'));
				}
			});
    	}
    });
    
    table.columns.adjust().draw();
    
	return oTable;
};


createUsersCardDatatable = function(gridId, url, fnDrawCallback) {
	
	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"ip><"clear">',
		"bServerSide": true,
		"stateSave": true,
		"paging": true,
		"sAjaxSource": url,
		"bAutoWidth" : false,
		"aaSorting": [[ 0, "desc" ]],
		"columnDefs": [
			{
				"render": function (data, type, row) {
					
					var mail = "";
					if (row.mail != '') {
						mail = "<span style='font-weight: normal; color: #333333;'>" +
							"<br/> <small>&#60;" + row.mail + "&#62;</small>" + 
						"</span>";
					}
					
					var mobile = "";
					if (row.name == '') {
						if (row.mob) {
							mobile = '(+' + row.pre + ') ' + row.mob;
						}
					}
					else {
						if (row.mob) {
							mobile = ' - ' + '(+' + row.pre + ') ' + row.mob;
						}
					}
					
					var row2 = "<img style='width:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;' class='img-rounded' src='/manage/users/logo?id=" + row.id + "' />" +
						"<div>" +
							row.name + "<small>" + mobile + "</small>" + mail +
						"</div>";
					
				     return row2;
				},
				"targets": 0
			},
			{
				"render": function (data, type, row) {
					
				     return row.card;
				},
				"targets": 1
			},
            { "sortable": false, "targets": [ 0, 1 ] }
		],
		"fnPreDrawCallback": function() {

            $('#loading-mask').show();
            
        },
		"fnDrawCallback": function() {

			$('#loading-mask').hide();

			if (fnDrawCallback != null) {
				fnDrawCallback();
			}
			
			$("[rel=tooltip]").tooltip();
			
			nav_page_height();
		}
	});

    // Variables del datatable
    var table = $('#' + gridId).DataTable();
    var oSettings = oTable.fnSettings();
    
	// Filters
    
    $('#' + gridId + ' tfoot th').each(function(i) {
    	
    	var textFilters = [0, 1];
		
    	if ($.inArray($(this).index(), textFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;

    		var title = $('#' + gridId + ' thead th').eq($(this).index()).text().trim();
    		$(this).html('<input type="text" value="' + search_string + '" placeholder="' + title + '" class="search_init text_filter form-control width" />');
    	}
    	
    });
    
    // Eventos
    
    $('#' + gridId + " tfoot input").on( 'keypress', function (e) {
    	if (e.which == 13) {
	        table
	            .column( $(this).parent().index()+1 + ':visible' )
	            .search( this.value )
	            .draw();
    	}
    });
    
    table.columns.adjust().draw();
    
	return oTable;
};



createUsersToExchangeDatatable = function(gridId, url, fnDrawCallback) {
	
	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"ip><"clear">',
		"bServerSide": true,
		"stateSave": true,
		"paging": true,
		"sAjaxSource": url,
		"bAutoWidth" : false,
		"aaSorting": [[ 1, "desc" ]],
		"fnRowCallback": function ( row, data, index ) {
			
			if (data.blo == 1) {
				$(row).addClass('disabled-row');
			}
			
			if (data.is2me == 0 && data.isapp == 0) {
				$(row).addClass('disabled-row');
			}
         },
		"columnDefs": [
			{
				"render": function (data, type, row) {
					
					var mail = "";
					if (row.mail != '') {
						mail = "<span style='font-weight: normal; color: #333333;'>" +
							"<br/> <small>&#60;" + row.mail + "&#62;</small>" + 
						"</span>";
					}
					
					var mobile = "";
					if (row.name == '') {
						if (row.mob) {
							mobile = '(+' + row.pre + ') ' + row.mob;
						}
					}
					else {
						if (row.mob) {
							mobile = ' - ' + '(+' + row.pre + ') ' + row.mob;
						}
					}
					
					
					var row2 = "<img style='width:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;' class='img-rounded' src='/manage/users/logo?id=" + row.id + "' />" +
						"<div>" +
							row.name + "<small>" + mobile + "</small>" + mail + 
						"</div>" +
					"</div>";
					
				     return row2;
				},
				"targets": 0
			},{
				"render": function (data, type, row) {
					if(row.is2me == 1)
						return "Sí";
					else
						return "No";
				},
				"targets": 1
			},{
				"render": function (data, type, row) {
					if(row.isapp == 1)
						return "Sí";
					else
						return "No";
					
				},
				"targets": 2
			},{
				"render": function (data, type, row) {
					if(row.blo == 1)
						return "Sí";
					else
						return "No";
					
				},
				"targets": 3
			},{
				"render": function (data, type, row) {
					if(row.adm == 1)
						return "Sí";
					else
						return "No";
				},
				"targets": 4
			},{
				"render": function (data, type, row) {
					return row.m1;
				}, "targets": 5
			},{
				"render": function (data, type, row) {
					return row.m2;
				},"targets": 6
			},{
				"render": function (data, type, row) {
					return row.m3;
				},"targets": 7
			},{
				"render": function (data, type, row) {
					return row.m4;
				},"targets": 8
			},
            { "sortable": false, "targets": [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ] }
		],
		"fnPreDrawCallback": function() {

            $('#loading-mask').show();
            
        },
		"fnDrawCallback": function() {

			$('#loading-mask').hide();

			if (fnDrawCallback != null) {
				fnDrawCallback();
			}
			
			$("[rel=tooltip]").tooltip();
			
			nav_page_height();
		}
	});

    // Variables del datatable
    var table = $('#' + gridId).DataTable();
    var oSettings = oTable.fnSettings();
    
	// Filters
    
    $('#' + gridId + ' tfoot th').each(function(i) {

    	var table = $('#' + gridId).DataTable();
    	
    	var textFilters = [0, 5, 6, 7, 8];
    	var selectFilters = [1, 2, 3, 4];
		
    	if ($.inArray($(this).index(), textFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;
    
    		var title = $('#' + gridId + ' thead th').eq($(this).index()).text().trim();
    		$(this).html('<input type="text" value="' + search_string + '" placeholder="' + title + '" class="search_init text_filter form-control width" />');
    	}
    	else if ($.inArray($(this).index(), selectFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;
    		
    		var select = '<select class="search_init select_filter form-control width"><option value=""></option>';
    		if (search_string == 'Sí') {
    			select += '<option value="Sí" selected="selected">Sí</option>';
    		}
    		else {
    			select += '<option value="Sí">Sí</option>';
    		}
    		if (search_string == 'No') {
    			select += '<option value="No" selected="selected">No</option>';
    		}
    		else {
    			select += '<option value="No">No</option>';
    		}
    		select += '</select>';
    		
    		$(select)
	            .appendTo( $(this).empty() )
	            .on( 'change', function () {
	                table.column(i+1)
	                    .search($(this).val(), true, false)
	                    .draw();
	            });
    	}
    	
    });
    
    // Eventos
    
    $('#' + gridId + " tfoot input").on( 'keypress', function (e) {
    	if (e.which == 13) {
    	
	        table
	            .column( $(this).parent().index()+1 + ':visible' )
	            .search( this.value )
	            .draw();
    	}
    });
    
    table.columns.adjust().draw();
    
	return oTable;
};


createGroupsDatatable = function(gridId) {
	
	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"iflp><"clear">',
		"aaSorting": [[ 1, "desc" ]],
		"bAutoWidth" : false,
        "columnDefs": [{ "sortable": true, "targets": [ 1, 2, 3 ] },
                         { "sortable": false, "targets": [ 0 ] },
                         { "width": "20", "targets": [ 0 ] },
                         { "width": "40", "targets": [ 1 ] }]
	});
	
	$('#' + gridId + ' > thead > tr > th > label > input').click(function(e) {
		
		var value = $(e.target).is(':checked');
		
		$('#' + gridId + ' > tbody > tr').each(function (i, row) {
		
			var $row = $(row);
			$checkedBoxes = $row.find('input');
			
			$checkedBoxes.each(function (i, checkbox) {

				var $checkbox = $(checkbox);
				$checkbox.prop('checked', value);
				
			});
		});
	});
	
	return oTable;
	
};

createTemplatesDatatable = function(gridId) {
	
	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"iflp><"clear">',
		"aaSorting": [[ 1, "desc" ]],
		"bAutoWidth" : false,
        "columnDefs": [{ "sortable": true, "targets": [ 1, 2, 3 ] },
                       { "sortable": false, "targets": [ 0 ] },
                       { "width": "20", "targets": [ 0 ] },
                       { "width": "40", "targets": [ 1 ] },
                       { "width": "300", "targets": [ 2 ] },
                       { "width": "600", "targets": [ 3 ] }]
	});
	
	$('#' + gridId + ' > thead > tr > th > label > input').click(function(e) {
		
		var value = $(e.target).is(':checked');
		
		$('#' + gridId + ' > tbody > tr').each(function (i, row) {
		
			var $row = $(row);
			$checkedBoxes = $row.find('input');
			
			$checkedBoxes.each(function (i, checkbox) {

				var $checkbox = $(checkbox);
				$checkbox.prop('checked', value);
				
			});
		});
	});
	
	return oTable;
	
};

showSIPValidateModal = function (id) {

	$("#validate-sip-form").trigger("reset");
	$("#sip_validate_id").val(id);
		
	$("#modal-validate-sip-user-form").modal('show');
};

createSIPSDatatable = function(gridId, url, fnDrawCallback, selectionArray) {
	
	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"ip><"clear">',
		"bServerSide": true,
		"stateSave": true,
		"paging": true,
		"sAjaxSource": url,
		"bAutoWidth" : false,
		"aaSorting": [[ 1, "asc" ]],
		"fnRowCallback": function ( row, data, index ) {

			if (data.cancelDate != '') {
				$(row).addClass('disabled-row');
			}
         },
         "columnDefs": [{
				"render": function (data, type, row) {
					
					if (selectionArray && selectionArray.indexOf(row.DT_RowId) != -1) {

						return "<label class='checkbox'><input type='checkbox' checked='checked' /><i></i></label>";
					}
					else {
						
						return "<label class='checkbox'><input type='checkbox' /><i></i></label>";
					}
				},
				"className": "smart-form",
				"width": 15,
				"targets": 0
			},{
				"render": function (data, type, row) {
				     return row.number;
				},
				"width": 90,
				"targets": 1
			},{
				"render": function (data, type, row) {
				     return row.name;
				},
				"targets": 2
			},{
				"render": function (data, type, row) {
					
					var mail = "";
					if (row.userMail != '') {
						mail = "<span style='font-weight: normal; color: #333333;'>" +
							"<br/> <small>&#60;" + row.userMail + "&#62;</small>" + 
						"</span>";
					}
					
					var mobile = "";
					if (row.userName == '') {
						if (row.userMobile) {
							mobile = '(+' + row.userPrefix + ') ' + row.userMobile;
						}
					}
					else {
						if (row.userMobile) {
							mobile = ' - ' + '(+' + row.userPrefix + ') ' + row.userMobile;
						}
					}
					
					var type = "";
					if (row.userIs2me == true) {
						type = "<img class='pull-right' src='/images/2me/mini.png' alt='2me' data-original-title='Usuario 2me' data-placement='left' rel='tooltip' />";
					}
					if (row.userIsApp == true) {
						type += "<i class='fa fa-user pull-right' data-original-title='Usuario propio' data-placement='left' rel='tooltip'></i>";
					}
					
					var row2 = 
						"<div onclick='document.location.href=\"#/manage/users/view?id= " + row.userId + "\"'>" +
							"<img style='width:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;' class='img-rounded' src='/manage/users/logo?id=" + row.userId + "' />" +
							"<div>" +
								row.userName + "<small>" + mobile + "</small>" + mail + type +
							"</div>" +
						"</div>";
					
				     return row2;
					
				},
				"targets": 3
			},{
				"render": function (data, type, row) {
					if(row.validated == 1) {
						return "Sí";
					}
					else {
						return "No<br/><a href='javascript:showSIPValidateModal(" + row.userId + ");'>Activar</a>";
					}
				},
				"width": 50,
				"targets": 4
			},{
				"render": function (data, type, row) {
					return row.cancelDate;
				},
				"width": 100,
				"targets": 5
			},
			{"sortable": false, "aTargets": [ 0, 1, 2, 3, 4, 5] }
		],
		"fnPreDrawCallback": function() {

            $('#loading-mask').show();
            
        },
		"fnDrawCallback": function() {

			$('#loading-mask').hide();

			if (fnDrawCallback != null) {
				fnDrawCallback();
			}
			
			$("[rel=tooltip]").tooltip();
			
			nav_page_height();
		}
	});
	
	// Variables del datatable
	
    var table = $('#' + gridId).DataTable();
    var oSettings = oTable.fnSettings();
    
	// Filters
    
    $('#' + gridId + ' tfoot th').each(function(i) {

    	var table = $('#' + gridId).DataTable();
    	
    	var textFilters = [1, 2, 3, 5];
    	var selectFilters = [4];
		
    	if ($.inArray($(this).index(), textFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;

    		var title = $('#' + gridId + ' thead th').eq($(this).index()).text().trim();
    		$(this).html('<input type="text" value="' + search_string + '" placeholder="' + title + '" class="search_init text_filter form-control width" />');
    	}
    	else if ($.inArray($(this).index(), selectFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;
    		
    		var select = '<select class="search_init select_filter form-control width"><option value=""></option>';
    		if (search_string == 'Sí') {
    			select += '<option value="Sí" selected="selected">Sí</option>';
    		}
    		else {
    			select += '<option value="Sí">Sí</option>';
    		}
    		if (search_string == 'No') {
    			select += '<option value="No" selected="selected">No</option>';
    		}
    		else {
    			select += '<option value="No">No</option>';
    		}
    		select += '</select>';
    		
    		$(select)
	            .appendTo( $(this).empty() )
	            .on( 'change', function () {
	                table.column(i)
	                    .search($(this).val(), true, false)
	                    .draw();
	            });
    	}
    	
    });
    
    // Eventos
    
    $('#' + gridId + " tfoot input").on( 'keypress', function (e) {
    	if (e.which == 13) {
	        table
	            .column( $(this).parent().index() + ':visible' )
	            .search( this.value )
	            .draw();
    	}
    });
	
    $('#' + gridId + " > thead > tr > th > label > input").click(function () {
    	
    	if ($('#' + gridId + ' > thead > tr > th > label > input').is(':checked')) {
    		
	    	$('#' + gridId + ' > tbody > tr ').each(function(e) {
	    		
				$(this).find('input:checkbox:first').prop('checked', true);
				
				var index = selectionArray.indexOf($(this).attr('id'));
				
				if (index == -1) {
					selectionArray.push($(this).attr('id'));
				}
			});
    	}
    	else {
    		
    		$('#' + gridId + ' > tbody > tr ').each(function(e) {
	    		
				$(this).find('input:checkbox:first').prop('checked', false);
				
				var index = selectionArray.indexOf($(this).attr('id'));
				
				if (index != -1) {
					selectionArray.splice(index, 1);
				}
				else {
					selectionArray.push($(this).attr('id'));
				}
			});
    	}
    });
    
    oTable.fnFilterOnReturn();
    
	return oTable;
	
};


createGroupedMessagesDatatable = function(gridId, url) {
	
	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"iflp><"clear">',
		"stateSave": true,
		"bServerSide": true,
		"paging": true,
		"sAjaxSource" : url,
		"bAutoWidth" : false,
		"columnDefs": [
			{
				"render": function (data, type, row) {
					
					var mail = "";
					if (row.mail != '') {
						mail = "<span style='font-weight: normal; color: #333333;'>" +
							"<br/> <small>&#60;" + row.mail + "&#62;</small>" + 
						"</span>";
					}
					
					var mobile = "";
					if (row.name == '') {
						mobile = row.mob;
					}
					else {
						mobile = ' - ' + row.mob;
					}
					
					var type = "";
					if (row.is2me == true) {
						type = "<img class='pull-right' src='/images/2me/mini.png' alt='2me' data-original-title='Usuario 2me' data-placement='left' rel='tooltip' />";
					}
					if (row.isapp == true) {
						type += "<i class='fa fa-user pull-right' data-original-title='Usuario propio' data-placement='left' rel='tooltip'></i>";
					}
					
					var row2 =
						"<div class='col-xs-4 col-sm-4 col-md-3 col-lg-2'>" +
							"<img style='width:35px;border:solid 1px gray;margin-top:1px;' class='img-rounded' src='manage/users/logo?id=" + row.id + "' />" +
						"</div>" +
						"<div class='col-xs-8 col-sm-8 col-md-9 col-lg-10'>" +
							row.name + "<small>" + mobile + "</small>" + mail + type +
						"</div>" +
					"</div>";
					
					return row2;
					
				},
				"targets": 0
			},{
				"render": function (data, type, row) {
					
					var subject = "";
					if ((row.received - row.receivedRead) == 0) {
						subject = row.subject;
					}
					else {
						subject = '<b>' + row.subject + '</b>';
					}
					
					var message = row.message;
					if (message.length == 80) {
						message += "...";
					}
					
					var classLogo = "logo-div";
					if ((row.received - row.receivedRead) == 0) {
						classLogo = "logo-div-disabled";
					}
					
					var row3 =
						"<div class='col-xs-9 col-sm-9 col-md-9 col-lg-10'>" +
							subject + "<br/><small>" + message + '</small>' +
						"</div>" +
						"<div class='col-xs-3 col-sm-3 col-md-3 col-lg-2 " + classLogo + "'>" +
							"<b data-original-title='Mensajes Pendientes de Leer' data-placement='right' rel='tooltip'>" + 
								(row.received - row.receivedRead) + 
							"</b>" +
						"</div>";
						
					"</div>";
					
					return row3;
					
				},
				"targets": 1
			},{
				"render": function (data, type, row) {
					
					return row.date;
				},
				"targets": 2
			},
			{ "type": "html", "targets": [ 0 ] },
            { "sortable": false, "targets": [ 0, 1, 2 ] },
            { "type": "date-euro", "sClass": "small-td", "targets": [ 2 ] }
		],
		"fnPreDrawCallback": function() {

            $('#loading-mask').show();
            
        },
		"fnDrawCallback": function() {
			
			$('#loading-mask').hide();
			
			$('#' + gridId + '> tbody > tr').click(function(e) {
				navigateURL("/manage/users/view?id=" + $(this).attr('id'), $('#content'));
			});
			
			$("[rel=tooltip]").tooltip();
			
			nav_page_height();
		}
	});
	
	oTable.fnFilterOnReturn();
	
	return oTable;
};

createLoyaltyCardsDatatable  = function(gridId, url, fnDrawCallback) {
	
	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"ip><"clear">',
		"bServerSide": true,
		"stateSave": true,
		"paging": true,
		"sAjaxSource": url,
		"bAutoWidth" : false,
		"aaSorting": [[ 0, "desc" ]],
		"columnDefs": [
			{
				"render": function (data, type, row) {
					
					var row2 = "<img style='width:60px;float:left;border:solid 1px gray;margin-right:10px;' class='img-rounded' src='/manage/promotions/card/preview?id=" + row.id + "' />" +
						"<div>" + row.name + "</div>";
					
				     return row2;
				},
				"targets": 0
			},{
				"render": function (data, type, row) {
					return row.notes;
				},
				"targets": 1
			},
            { "sortable": false, "targets": [ 0, 1 ] }
		],
		"fnPreDrawCallback": function() {

            $('#loading-mask').show();
            
        },
		"fnDrawCallback": function() {

			$('#loading-mask').hide();

			if (fnDrawCallback != null) {
				fnDrawCallback();
			}
			
			$("[rel=tooltip]").tooltip();
			
			nav_page_height();
		}
	});

    // Variables del datatable
	
    var table = $('#' + gridId).DataTable();
    var oSettings = oTable.fnSettings();
    
	// Filters
    
    $('#' + gridId + ' tfoot th').each(function(i) {
    	
    	var textFilters = [0, 1];
		
    	if ($.inArray($(this).index(), textFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;

    		var title = $('#' + gridId + ' thead th').eq($(this).index()).text().trim();
    		$(this).html('<input type="text" value="' + search_string + '" placeholder="' + title + '" class="search_init text_filter form-control width" />');
    	}
    });
    
    // Eventos
    
    $('#' + gridId + " tfoot input").on( 'keypress', function (e) {
    	if (e.which == 13) {
	        table
	            .column( $(this).parent().index() + ':visible' )
	            .search( this.value )
	            .draw();
    	}
    });
    
    table.columns.adjust().draw();
    
	return oTable;
};

createProductsDatatable = function(gridId, url, fnDrawCallback, selectionArray) {
	 
	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"ip><"clear">',
		"bServerSide": true,
		"stateSave": true,
		"paging": true,
		"sAjaxSource": url,
		"bAutoWidth" : false,
		"aaSorting": [[ 1, "desc" ]],
                       
		"columnDefs": [
			{
				"render": function (data, type, row ) {
					if (selectionArray && selectionArray.indexOf(row.id) != -1) {
							return "<label class='checkbox'><input type='checkbox' id='" + row.id + "' checked='checked' /><i></i></label>";
					}
					else {
						if(row.contain_child){
							return "<label class='checkbox'><input type='checkbox' id='" + row.id + "' disabled ='disabled' /><i></i></label>";
						}
						else{
							return "<label class='checkbox'><input type='checkbox' id='" + row.id + "' /><i></i></label>";
						}
						
					}
				},"width": "30",
				"targets": 0
			},
			{
				"render": function (data, type, row) {
					if (row.cuantos=="0"){
							if(row.puntos==""){
								var row2 = "<img style='width:35px;height:35px; min-height:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;' class='img-rounded' src='/images/default/icon-product-gray.png' />" +
								"<div style='color:#C46A69'>" +
								row.name + "<br/> " +
								" <i>REF: " +  row.id + "</i><br/> " +   
								"</div>" +
								"</div>";

								return row2;

							}
							else{
								var row2 = "<img style='width:35px;height:35px;min-height:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;' class='img-rounded' src='/images/default/icon-product-gray.png' />" +
								"<div>" +
								row.name + "<br/> " +
								" <i>REF: " +  row.id + "</i><br/> " +   
								"</div>" +
								"</div>";

								return row2;

							}
					}
					else{
						if(row.puntos==""){
							
							var row2 = "<img style='width:35px;height:35px;min-height:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;' class='img-rounded' src='/manage/promotions/product/image?p=" +row.id + 
							"&n=" + row.id_n + "&t=1' />" +
							"<div style='color:#C46A69'>" +
							row.name + "<br/> " +
							" <i>REF: " +  row.id + "</i><br/> " +   
							"</div>" +
							"</div>";
						
							return row2;
						}
						else{
							var row2 = "<img style='width:35px;height:35px;min-height:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;' class='img-rounded' src='/manage/promotions/product/image?p=" +row.id + 
							"&n=" + row.id_n + "&t=1' />" +
							"<div>" +
							row.name + "<br/> " +
							" <i>REF: " +  row.id + "</i><br/> " +   
							"</div>" +
							"</div>";
						
							return row2;
						}
					}
				},
				"targets": 1
			},

			{
				"render": function (data, type, row) {
					if(row.puntos=="")
						return "<div style='color:#C46A69'>Puntos Sin Asignar</div>";
					else
						return row.puntos;
				},
				"width": "100",
				"targets": 2
			},
			{
				"render": function (data, type, row) {
					if(row.puntos=="")
						return "<div style='color:#C46A69'></div>";
					else
						return row.ffrom;
				},
				"width": "50",
				"targets": 3
			},
			{
				"render": function (data, type, row) {
					if(row.puntos=="")
						return "<div style='color:#C46A69'></div>";
					else
						return row.fto;
						
				},
				"width": "50",
				"targets": 4
			},
			{
				"render": function (data, type, row) {
					if(row.discount == 1){
						if(row.puntos=="")
							return "<div style='color:#C46A69'><span class='glyphicon glyphicon-ok'></span></div>";
						else
							return "<div><span class='glyphicon glyphicon-ok'></span></div>";
					}
						
					else
						if(row.puntos=="")
							return "<div style='color:#C46A69'><span class='glyphicon glyphicon-remove'></span></div>";
						else
							return "<div><span class='glyphicon glyphicon-remove'></span></div>";
						
				},
				"width": "70",
				"targets": 5
			},
			{ "sortable": false, "targets": [ 0, 1, 2, 3, 4, 5] }
		],
		"fnPreDrawCallback": function() {

            $('#loading-mask').show();
            
        },
		"fnDrawCallback": function() {

			$('#loading-mask').hide();

			if (fnDrawCallback != null) {
				fnDrawCallback();
			}
			
			$("[rel=tooltip]").tooltip();
			
			nav_page_height();
		}
	});
	
	// Variables del datatable
	
    var table = $('#' + gridId).DataTable();
    var oSettings = oTable.fnSettings();
    
    // Filters
    
    $('#' + gridId + ' tfoot th').each(function(i) {

    	var table = $('#' + gridId).DataTable();
    	
    	var textFilters = [1, 2, 3, 4];
    	var selectFilters = [5];
		
    	if ($.inArray($(this).index(), textFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;

    		var title = $('#' + gridId + ' thead th').eq($(this).index()).text().trim();
    		$(this).html('<input type="text" value="' + search_string + '" placeholder="' + title + '" class="search_init text_filter form-control width" />');
    	}
    	
    	else if ($.inArray($(this).index(), selectFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;
    		
    		var select = '<select class="search_init select_filter form-control width"><option value=""></option>';
    		if (search_string == 'Sí') {
    			select += '<option value="1" selected="selected">Sí</option>';
    		}
    		else {
    			select += '<option value="1">Sí</option>';
    		}
    		if (search_string == 'No') {
    			select += '<option value="0" selected="selected">No</option>';
    		}
    		else {
    			select += '<option value="0">No</option>';
    		}
    		select += '</select>';
    		
    		$(select)
	            .appendTo( $(this).empty() )
	            .on( 'change', function () {
	                table.column(i)
	                    .search($(this).val(), true, false)
	                    .draw();
	            });
    	}
    });
 
    // Eventos
    
    $('#' + gridId + " tfoot input").on( 'keypress', function (e) {
    	if (e.which == 13) {
	        table
	            .column( $(this).parent().index() + ':visible' )
	            .search( this.value )
	            .draw();
    	}
    });
    
	$('#' + gridId + " > thead > tr > th > div > ul > li > .select-all").click(function () {
		
		clearArray(selectionArray);
		
		$('#' + gridId + ' > tbody > tr ').each(function(e) {
			
			$(this).find('input:checkbox:first:enabled').prop('checked', true);
		});
     	
		
		$.ajax({
			type: "POST",
			url: '/manage/promotions/products/getAllNotifierProducts',
			data: {
				'sSearch_1': $('#' + gridId + ' > tfoot > tr > #sSearch_1 > span > input').val(),
				'sSearch_2': $('#' + gridId + ' > tfoot > tr > #sSearch_2 > span > input').val(),
				'sSearch_3': $('#' + gridId + ' > tfoot > tr > #sSearch_3 > span > input').val(),
				'sSearch_4': $('#' + gridId + ' > tfoot > tr > #sSearch_4 > span > input').val(),
				'sSearch_5': $('#' + gridId + ' > tfoot > tr > #sSearch_1 > span > input').val()
			},
			success: function(response) {
				
				var obj = jQuery.parseJSON(response);
				
				$.each(obj, function(key,value) {
					if(!value.contain_child){	
						selectionArray.push(value.ID);
					}
				});
			}
		});
    });
    
    $('#' + gridId + " > thead > tr > th > div > ul > li > .select-none").click(function () {
		clearArray(selectionArray);
    	
    	$('#' + gridId + ' > tbody > tr ').each(function(e) {
    		
			$(this).find('input:checkbox:first').prop('checked', false);
		});
    });
	
    $('#' + gridId + " > thead > tr > th > input").click(function () {
    	
    	if ($('#' + gridId + ' > thead > tr > th > input').is(':checked')) {
    		
	    	$('#' + gridId + ' > tbody > tr ').each(function(e) {
	    		
				$(this).find('input:checkbox:first:enabled').prop('checked', true);
				
				selectionArray.push($(this).attr('id'));
			});
    	}
    	else {
    		
    		$('#' + gridId + ' > tbody > tr ').each(function(e) {
	    		
				$(this).find('input:checkbox:first:enabled').prop('checked', false);
				
				var index = selectionArray.indexOf($(this).attr('id'));
				
				if (index != -1) {
					selectionArray.splice(index, 1);
				}
				else {
					selectionArray.push($(this).attr('id'));
				}
			});
    	}
	});
	
	return oTable;
};


createProductsToExchangeDatatable = function(gridId, url, fnDrawCallback, selectionArray) {
	 
	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"ip><"clear">',
		"bServerSide": true,
		"stateSave": true,
		"paging": true,
		"sAjaxSource": url,
		"bAutoWidth" : false,
		"aaSorting": [[ 1, "desc" ]],
		"columnDefs": [
			{
				"render": function (data, type, row ) {
					if (selectionArray && selectionArray.indexOf(row.id) != -1) {
							return "<label class='input enabled'><input type='checkbox' id='" + row.id + "' checked='checked' /></label>";
					}
					else {
							return "<label class='input enabled'><input type='checkbox' id='" + row.id + "' /></label>";
					}
				},"width": "30",
				"targets": 0
			},
			{
				"render": function (data, type, row) {
					if (row.cuantos=="0"){
							if(row.puntos==""){
								var row2 = "<img style='width:35px;height:35px; min-height:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;' class='img-rounded' src='/images/default/icon-product-gray.png' />" +
								"<div style='color:#C46A69'>" +
								row.name + "<br/> " +
								" <i>REF: " +  row.id + "</i><br/> " +   
								"</div>" +
								"</div>";

								return row2;

							}
							else{
								var row2 = "<img style='width:35px;height:35px;min-height:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;' class='img-rounded' src='/images/default/icon-product-gray.png' />" +
								"<div>" +
								row.name + "<br/> " +
								" <i>REF: " +  row.id + "</i><br/> " +   
								"</div>" +
								"</div>";

								return row2;

							}
					}
					else{
						if(row.puntos==""){
							var row2 = "<img style='width:35px;height:35px;min-height:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;' class='img-rounded' src='/manage/promotions/product/image?p=" +row.id + 
							"&n=" + row.id_n + "&t=1' />" +
							"<div style='color:#C46A69'>" +
							row.name + "<br/> " +
							" <i>REF: " +  row.id + "</i><br/> " +   
							"</div>" +
							"</div>";
						
							return row2;
						}
						else{
							var row2 = "<img style='width:35px;height:35px;min-height:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;' class='img-rounded' src='/manage/promotions/product/image?p=" +row.id + 
							"&n=" + row.id_n + "&t=1' />" +
							"<div>" +
							row.name + "<br/> " +
							" <i>REF: " +  row.id + "</i><br/> " +   
							"</div>" +
							"</div>";
						
							return row2;
						}
					}
				},
				"targets": 1
			},

			{
				"render": function (data, type, row) {
					if(row.puntos=="")
						return "<div style='color:#C46A69'>Puntos Sin Asignar</div>";
					else
						return row.puntos;
				},
				"targets": 2
			},
			{
				"render": function (data, type, row) {
					if(row.puntos=="")
						return "<div style='color:#C46A69'></div>";
					else
						return row.ffrom;
				},
				"targets": 3
			},
			{
				"render": function (data, type, row) {
					if(row.puntos=="")
						return "<div style='color:#C46A69'></div>";
					else
						return row.fto;
						
				},
				"targets": 4
			},
			{
				"render": function (data, type, row) {
					if(row.discount == 1){
						if(row.puntos=="")
							return "<div style='color:#C46A69'><span class='glyphicon glyphicon-ok'></span></div>";
						else
							return "<div><span class='glyphicon glyphicon-ok'></span></div>";
					}
						
					else
						if(row.puntos=="")
							return "<div style='color:#C46A69'><span class='glyphicon glyphicon-remove'></span></div>";
						else
							return "<div><span class='glyphicon glyphicon-remove'></span></div>";
						
				},
				"targets": 5
			},
			{ "sortable": false, "targets": [ 0, 1, 2, 3, 4, 5] }
		],
		"fnPreDrawCallback": function() {

            $('#loading-mask').show();
            
        },
		"fnDrawCallback": function() {

			$('#loading-mask').hide();

			if (fnDrawCallback != null) {
				fnDrawCallback();
			}
			
			$("[rel=tooltip]").tooltip();
			
			nav_page_height();
		}
	});
	
	// Variables del datatable
	
    var table = $('#' + gridId).DataTable();
    var oSettings = oTable.fnSettings();
    
    // Filters
    
    $('#' + gridId + ' tfoot th').each(function(i) {

    	var table = $('#' + gridId).DataTable();
    	
    	var textFilters = [1, 2, 3, 4];
    	var selectFilters = [5];
		
    	if ($.inArray($(this).index(), textFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;

    		var title = $('#' + gridId + ' thead th').eq($(this).index()).text().trim();
    		$(this).html('<input type="text" value="' + search_string + '" placeholder="' + title + '" class="search_init text_filter form-control width" />');
    	}
    	
    	else if ($.inArray($(this).index(), selectFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;
    		
    		var select = '<select class="search_init select_filter form-control width"><option value=""></option>';
    		if (search_string == 'Sí') {
    			select += '<option value="1" selected="selected">Sí</option>';
    		}
    		else {
    			select += '<option value="1">Sí</option>';
    		}
    		if (search_string == 'No') {
    			select += '<option value="0" selected="selected">No</option>';
    		}
    		else {
    			select += '<option value="0">No</option>';
    		}
    		select += '</select>';
    		
    		$(select)
	            .appendTo( $(this).empty() )
	            .on( 'change', function () {
	                table.column(i)
	                    .search($(this).val(), true, false)
	                    .draw();
	            });
    	}
    });
 
    // Eventos
    
    $('#' + gridId + " tfoot input").on( 'keypress', function (e) {
    	if (e.which == 13) {
	        table
	            .column( $(this).parent().index() + ':visible' )
	            .search( this.value )
	            .draw();
    	}
    });
    
	$('#' + gridId + " > thead > tr > th > div > ul > li > .select-all").click(function () {
		
		clearArray(selectionArray);
		
		$('#' + gridId + ' > tbody > tr ').each(function(e) {
			
			$(this).find('input:checkbox:first').prop('checked', true);
		});
     	
		
		$.ajax({
			type: "POST",
			url: '/manage/promotions/products/getAllNotifierProducts',
			data: {
				'sSearch_1': $('#' + gridId + ' > tfoot > tr > #sSearch_1 > span > input').val(),
				'sSearch_2': $('#' + gridId + ' > tfoot > tr > #sSearch_2 > span > input').val(),
				'sSearch_3': $('#' + gridId + ' > tfoot > tr > #sSearch_3 > span > input').val(),
				'sSearch_4': $('#' + gridId + ' > tfoot > tr > #sSearch_4 > span > input').val(),
				'sSearch_5': $('#' + gridId + ' > tfoot > tr > #sSearch_1 > span > input').val()
			},
			success: function(response) {
				
				var obj = jQuery.parseJSON(response);
				
				$.each(obj, function(key,value) {
					if(!value.contain_child){	
						selectionArray.push(value.ID);
					}
				});
			}
		});
    });
    
    $('#' + gridId + " > thead > tr > th > div > ul > li > .select-none").click(function () {
		clearArray(selectionArray);
    	
    	$('#' + gridId + ' > tbody > tr ').each(function(e) {
    		
			$(this).find('input:checkbox:first').prop('checked', false);
		});
    });
	
    $('#' + gridId + " > thead > tr > th > input").click(function () {
    	
    	if ($('#' + gridId + ' > thead > tr > th > input').is(':checked')) {
    		
	    	$('#' + gridId + ' > tbody > tr ').each(function(e) {
	    		
				$(this).find('input:checkbox:first').prop('checked', true);
				
				selectionArray.push($(this).attr('id'));
			});
    	}
    	else {
    		
    		$('#' + gridId + ' > tbody > tr ').each(function(e) {
	    		
				$(this).find('input:checkbox:first').prop('checked', false);
				
				var index = selectionArray.indexOf($(this).attr('id'));
				
				if (index != -1) {
					selectionArray.splice(index, 1);
				}
				else {
					selectionArray.push($(this).attr('id'));
				}
			});
    	}
	});
	
	return oTable;
};

createRangesDatatable = function(gridId) {

	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"ip><"clear">',
		"bAutoWidth" : false,
		"aaSorting": [[ 1, "desc" ]],
        "columnDefs": [{ "width": "20", "sortable": false, "targets": [ 0 ] }]
	});
	
	$('#' + gridId + ' > thead > tr > th > label > input').click(function(e) {
		var value = $(e.target).is(':checked');
		
		$('#' + gridId + ' > tbody > tr').each(function (i, row) {
		
			var $row = $(row);
			$checkedBoxes = $row.find('input:enabled');
			
			$checkedBoxes.each(function (i, checkbox) {
				
				var $checkbox = $(checkbox);
				$checkbox.prop('checked', value);
				
			});
		});
	});
		
	return oTable;
		
};

createCanjesDatatable = function(gridId, url, fnDrawCallback, selectionArray) {

	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"ip><"clear">',
		"bServerSide": true,
		"stateSave": true,
		"paging": true,
		"sAjaxSource": url,
		"bAutoWidth" : false,
		"aaSorting": [[ 1, "desc" ]],
		"columnDefs": [
			{
				"render": function (data, type, row) {
					
					var mail = "";
					if (row.mail != '') {
						mail = "<span style='font-weight: normal; color: #333333;'>" +
							"<br/> <small>&#60;" + row.mail + "&#62;</small>" + 
						"</span>";
					}
					
					var mobile = "";
					if (row.name == '') {
						if (row.mob) {
							mobile = '(+' + row.pre + ') ' + row.mob;
						}
					}
					else {
						if (row.mob) {
							mobile = ' - ' + '(+' + row.pre + ') ' + row.mob;
						}
					}
					
					var row2 = "<img style='width:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;' class='img-rounded' src='/manage/users/logo?id=" + row.userId + "' />" +
						"<div>" +
							row.name + "<small>" + mobile + "</small>" + mail + 
						"</div>";
					
				     return row2;
				},
				"targets": 0
			},
			{
				"render": function (data, type, row) {
					return row.date;
				},
				"width": "100",
				"targets": 1
			},
			{
				"render": function (data, type, row) {
					return row.points;
				},
				"width": "80",
				"targets": 2
			},
			{
				"render": function (data, type, row) {
					return row.price;
				},
				"width": "100",
				"targets": 3
			},
			{
				"render": function (data, type, row) {
					return row.cost;
				},
				"width": "80",
				"targets": 4
			},
			{
				"render": function (data, type, row) {
					return row.given;
				},
				"width": "80",
				"targets": 5
			},
			{
				"render": function (data, type, row) {
					return row.taken;
				},
				"width": "105",
				"targets": 6
			},
			{ "sortable": false, "targets": [ 0, 1, 2, 3, 4, 5, 6] }
		],
		"fnPreDrawCallback": function() {

            $('#loading-mask').show();
            
        },
		"fnDrawCallback": function() {

			$('#loading-mask').hide();

			if (fnDrawCallback != null) {
				fnDrawCallback();
			}
			
			$("[rel=tooltip]").tooltip();
			
			nav_page_height();
		}
	});
	
	// Variables del datatable
	
    var table = $('#' + gridId).DataTable();
    var oSettings = oTable.fnSettings();
    
    // Filters
    
    $('#' + gridId + ' tfoot th').each(function(i) {

    	var table = $('#' + gridId).DataTable();
    	
    	var textFilters = [0, 1, 2, 3, 4, 5, 6];
    	var selectFilters = [];
		
    	if ($.inArray($(this).index(), textFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;

    		var title = $('#' + gridId + ' thead th').eq($(this).index()).text().trim();
    		$(this).html('<input type="text" value="' + search_string + '" placeholder="' + title + '" class="search_init text_filter form-control width" />');
    	}
    	
    	
    	else if ($.inArray($(this).index(), selectFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;
    		
    		var select = '<select class="search_init select_filter form-control width"><option value=""></option>';
    		if (search_string == 'Sí') {
    			select += '<option value="Sí" selected="selected">Sí</option>';
    		}
    		else {
    			select += '<option value="Sí">Sí</option>';
    		}
    		if (search_string == 'No') {
    			select += '<option value="No" selected="selected">No</option>';
    		}
    		else {
    			select += '<option value="No">No</option>';
    		}
    		select += '</select>';
    		
    		$(select)
	            .appendTo( $(this).empty() )
	            .on( 'change', function () {
	                table.column(i)
	                    .search($(this).val(), true, false)
	                    .draw();
	            });
    	}
    });
    
    // Eventos
    
    $('#' + gridId + " tfoot input").on( 'keypress', function (e) {
    	if (e.which == 13) {
	        table
	            .column( $(this).parent().index() +1 + ':visible' )
	            .search( this.value )
	            .draw();
    	}
    });
	
	return oTable;
};


createNotifiersDatatable = function(gridId, url, fnDrawCallback, selectionArray) {
	
	var oTable = $('#' + gridId).dataTable({
		"dom": 'rt<"bottom"ip><"clear">',
		"bServerSide": true,
		"stateSave": true,
		"paging": true,
		"sAjaxSource": url,
		"bAutoWidth" : false,
		"aaSorting": [[ 1, "desc" ]],
		"columnDefs": [
			{
				"render": function (data, type, row ) {
					
					if (selectionArray && selectionArray.indexOf(row.id) != -1) {
						
						return "<label class='checkbox'><input type='checkbox' id='" + row.id + "' checked='checked' /><i></i></label>";
					}
					else {
						
						return "<label class='checkbox'><input type='checkbox' id='" + row.id + "' /><i></i></label>";
					}
				},
				"className": "smart-form",
				"targets": 0
			},{
				"render": function (data, type, row) {
					
					var row2 = '<img style="width:35px;float:left;border:solid 1px gray;margin-right:10px;margin-top:1px;" class="img-rounded" src="/manage/logo?id=' + row.id + '&thumbnail=1" id="avatar_preview"/>';
					
					if(row.name){
						row2 += '<div>'+ row.name;
					}
					else{
						row2 += '<div style="color:red">Sin informar';
					}
					if(row.prefix && row.phone){
						row2 += '<small> - (+'+ row.prefix +')'+ row.phone+'</small>';
					}
					else{
						row2 += '<small style="color:red"> - Sin informar</small>';
					}
					 
					if(row.mail){
						row2 +='<span style="font-weight: normal; color: #333333;"><br> <small>&lt;' + row.mail + '&gt;</small></span></div>';	
					}	
					else{
						row2 +='<span style="font-weight: normal; color: #333333;"><br> <small style="color:red">&lt; Sin informar &gt;</small></span></div>';
					}
				return row2;
				},
				"targets": 1
			},{
				"render": function (data, type, row) {
					var row2 ="";
					var nothing=1;
					if(row.country){
						row2 += row.country;
						nothing = 0;
					}
					if(row.region){
						if(nothing==0){
							row2 += ' - ' + row.region;
						}
						else{
							row2 += row.region;
						}
						nothing=0;
					}
					if(row.city){
						if(nothing==0){
							row2 += ' - ' + row.city;
						}
						else{
							row2 += row.city;
						}
						nothing=0;
					}
					if(nothing==1){
						return '<div style="color:red">Sin informar</div>';
					}
					else{
						return row2;
					}
					
					
				},
				"targets": 2
			},{
				"render": function (data, type, row) {
					if(row.validated == 1)
						return "Sí";
					else
						return "No";
					
				},
				"targets": 3
			},{
				"render": function (data, type, row) {
					if(row.validatedSicof == 1)
						return "Sí";
					else
						return "No";
					
				},
				"targets": 4
			},
            { "sortable": false, "targets": [ 0, 1, 2, 3, 4] }
		],
		"fnPreDrawCallback": function() {

            $('#loading-mask').show();
            
        },
		"fnDrawCallback": function() {

			$('#loading-mask').hide();

			if (fnDrawCallback != null) {
				fnDrawCallback();
			}
			
			$("[rel=tooltip]").tooltip();
			
			nav_page_height();
		}
	});

    // Variables del datatable
    var table = $('#' + gridId).DataTable();
    var oSettings = oTable.fnSettings();
    
	// Filters
    
    $('#' + gridId + ' tfoot th').each(function(i) {

    	var table = $('#' + gridId).DataTable();
    	
    	var textFilters = [1, 2];
    	var selectFilters = [3, 4];
		
    	if ($.inArray($(this).index(), textFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;

    		var title = $('#' + gridId + ' thead th').eq($(this).index()).text().trim();
    		$(this).html('<input type="text" value="' + search_string + '" placeholder="' + title + '" class="search_init text_filter form-control width" />');
    	}
    	else if ($.inArray($(this).index(), selectFilters) >= 0) {
    		
    		search_string = oSettings.aoPreSearchCols[$(this).index()].sSearch;
    		
    		var select = '<select class="search_init select_filter form-control width"><option value=""></option>';
    		if (search_string == 'Sí') {
    			select += '<option value="Sí" selected="selected">Sí</option>';
    		}
    		else {
    			select += '<option value="Sí">Sí</option>';
    		}
    		if (search_string == 'No') {
    			select += '<option value="No" selected="selected">No</option>';
    		}
    		else {
    			select += '<option value="No">No</option>';
    		}
    		select += '</select>';
    		
    		$(select)
	            .appendTo( $(this).empty() )
	            .on( 'change', function () {
	                table.column(i)
	                    .search($(this).val(), true, false)
	                    .draw();
	            });
    	}
    	
    });
    
    // Eventos
    
    $('#' + gridId + " tfoot input").on( 'keypress', function (e) {
    	if (e.which == 13) {
	        table
	            .column( $(this).parent().index() + ':visible' )
	            .search( this.value )
	            .draw();
    	}
    });
    
    $('#' + gridId + " > thead > tr > th > div > ul > li > .select-all").click(function () {
	    	
		clearArray(selectionArray);
		
     	$('#' + gridId + ' > tbody > tr ').each(function(e) {
     		
			$(this).find('input:checkbox:first').prop('checked', true);
		});
		
		$.ajax({
			type: "POST",
			url: '/manage/users/getAllNotifierUsers',
			data: {
				'sSearch_1': $('#' + gridId + ' > tfoot > tr > #sSearch_1 > span > input').val(),
				'sSearch_2': $('#' + gridId + ' > tfoot > tr > #sSearch_2 > span > input').val(),
				'sSearch_3': $('#' + gridId + ' > tfoot > tr > #sSearch_3 > span > input').val(),
				'sSearch_4': $('#' + gridId + ' > tfoot > tr > #sSearch_4 > span > input').val()
			},
			success: function(response) {
				
				var obj = jQuery.parseJSON(response);
				
				$.each(obj, function(key,value) {
					
					selectionArray.push(value.ID);
				});
			}
		});
    });
    
    $('#' + gridId + " > thead > tr > th > div > ul > li > .select-none").click(function () {

		clearArray(selectionArray);
    	
    	$('#' + gridId + ' > tbody > tr ').each(function(e) {
    		
			$(this).find('input:checkbox:first').prop('checked', false);
		});
    });
	
    $('#' + gridId + " > thead > tr > th > label > input").click(function () {
    	
    	if ($('#' + gridId + ' > thead > tr > th > label > input').is(':checked')) {
    		
	    	$('#' + gridId + ' > tbody > tr ').each(function(e) {
	    		
				$(this).find('input:checkbox:first').prop('checked', true);

				var index = selectionArray.indexOf($(this).attr('id'));
				
				if (index == -1) {
					selectionArray.push($(this).attr('id'));
				}
			});
    	}
    	else {
    		
    		$('#' + gridId + ' > tbody > tr ').each(function(e) {
	    		
				$(this).find('input:checkbox:first').prop('checked', false);
				
				var index = selectionArray.indexOf($(this).attr('id'));
				
				if (index != -1) {
					selectionArray.splice(index, 1);
				}
				else {
					selectionArray.push($(this).attr('id'));
				}
			});
    	}
    });
    
    table.columns.adjust().draw();
    
	return oTable;
};
