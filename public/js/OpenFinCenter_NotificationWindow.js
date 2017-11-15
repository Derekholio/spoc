fin.desktop.main(function () {
    console.log("NotificationWindow Ready");
    $(".notification-close-x").click(function () {
        var notification = fin.desktop.Notification.getCurrent();
        notification.close();
    });
});


function onNotificationMessage(message) {
    notificationSlab(message.icon, message.app, message.title, message.text);
}

function notificationSlab(icon, app, title, text) {
	console.log(icon, app, title, text);

	$("#notification-inbox-list").prepend('<li class="list-group-item flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><small class="mb-1"><img src="' + icon + '" class="mr-1 notification-small-img">' + app + '</small><small>2d ago<img src="image/close-x.png" class="ml-1 notification-close-x"></small></div><p class="mb-1" class="notification-title">' + title + '</p><small>' + text + '</small></li>');

	$("#tabs-2 ul").prepend($("<li class='notification-inbox'>")
		.html("<img src='" + icon + "' class='notification-inbox-icon' /><p class='notification-inbox-text'>" + text + "</p><button class='notification-inbox-close'>Close</button>"));

	$(".notification-close-x").click(function () {
		$(this).parent().parent().parent().remove();
    });
}