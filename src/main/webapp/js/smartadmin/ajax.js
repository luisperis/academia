
showMessage = function (id) {

	loadURL('/manage/messages/view?id=' + id, $('#modal-view-message-body'));
	
	$('#modal-view-message').modal('show');
	
};
