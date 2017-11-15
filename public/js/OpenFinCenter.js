var mainWindow = fin.desktop.Window.getCurrent();
var mainApplication = fin.desktop.Application.getCurrent();
var notificationQueue = [];
// Holding for decision to not use OpenFin notifications when window is minimized
/*notificationWindow = new fin.desktop.Window(
	{
		name: "OpenFinCenter_NotificationWindow",
		url: "http://localhost:9001/OpenFinCenter_NotificationWindow.html",
		defaultWidth: 300,
		defaultHeight: 600,
		defaultTop: 10,
		defaultLeft: 10,
		frame: false,
		resizable: false,
		state: "normal",
		autoShow: true,
		alwaysOnTop: true,
		saveWindowState: false,
		alphaMask: {
			"red": 200,
			"blue": 200,
			"green": 200
		}
	}, function () {
		console.log("OpenFinCenter_NotificationWindow Success");
		//notificationWindow.moveTo((screen.availWidth - document.body.clientWidth) - 15, (screen.availHeight - document.body.clientHeight - 110));
	}
);*/

document.addEventListener('DOMContentLoaded', function () {
	//OpenFin is ready
	fin.desktop.main(function () {
		
		//moves window into "notification" area specs
		mainWindow.resizeTo(300, screen.availHeight, "top-left", function () {
			mainWindow.moveTo((screen.availWidth - document.body.clientWidth), (screen.availHeight - $(window).height()));
		});

		//Adds jquery link handlers for menu
		AddLinkHandlers();
		
		//creates trayIcon and applies click listener
		mainApplication.setTrayIcon("http://localhost:9001/config/openfino.ico", function (clickInfo) {

			//hides or shows the window on tray icon click
			mainWindow.isShowing(function (showing) {
				if (showing) {
					mainWindow.hide();
				} else {
					//closes any open OpenFin notifications on window show
					notificationQueue.forEach(function (note) {
						note.close();
					});

					mainWindow.show();
				}
			});
		});

		// creates subscription to fin.desktop.Notification.Notification2 IAB messages
		fin.desktop.InterApplicationBus.subscribe("*", "notification2", function (message, uuid, name) {
			console.log("The application " + uuid + " sent this message: " + JSON.stringify(message));

			//wraps sending application to get its icon
			var application = fin.desktop.Application.wrap(uuid);

			application.getManifest(function (manifest) {
				
				var icon = manifest.startup_app.icon || "../image/openfino.ico";

				// add notification to window regardless if open or closed window.
				notificationSlab(icon, uuid, message.title, message.text);

				//hides or shows the window on tray icon click
				mainWindow.isShowing(function (showing) {
					if (!showing) {
						// if window is closed then show default OpenFin notification
						notificationQueue.push(new fin.desktop.Notification({
							url: "http://localhost:9001/OpenFinCenter_NotificationWindow.html",
							message: {icon: icon, app: uuid, title: message.title, text: message.text}
						}, function () {
							console.log("Notification successfully created");
						}, function (error) {
							console.log("Error creating notification:", error);
						}));
					}
				});
			});
		});

	});

});


// creates notifications in the window
function notificationSlab(icon, app, title, text) {
	console.log(icon, app, title, text);

	$("#notification-inbox-list").prepend('<li class="list-group-item flex-column align-items-start"><div class="d-flex w-100 justify-content-between"><small class="mb-1"><img src="' + icon + '" class="mr-1 notification-small-img">' + app + '</small><small>2d ago<img src="image/close-x.png" class="ml-1 notification-close-x"></small></div><p class="mb-1" class="notification-title">' + title + '</p><small>' + text + '</small></li>');

	// notification close listener
	/*$(".notification-close-x").click(function () {
		$(this).parent().parent().parent().remove();
	});*/
} 

// Apply click Handlers
function AddLinkHandlers(){
	//Menu Clicks

	//"Dark Theme"
	$("#darkThemeSwitch").click(function(){
		switchTheme("dark.css");
	});

	//"Light Theme"
	$("#lightThemeSwitch").click(function(){
		switchTheme("light.css");
	});

	//"Exit"
	$("#exitLink").click(function(){
		fin.desktop.Application.getCurrent().close();
	});

	//Other Clicks

	//Closes notifications
	$('body').on('click', '.notification-close-x', function () {
		$(this).parent().parent().parent().remove();
   });

}

function switchTheme(theme){
	console.log("Switching Theme to: "+theme);

	$("#themeCss").attr("href", "../css/themes/"+theme);
}