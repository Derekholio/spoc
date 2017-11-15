var mainWindow = fin.desktop.Window.getCurrent();
var mainApplication = fin.desktop.Application.getCurrent();

document.addEventListener('DOMContentLoaded', function () {
	//OpenFin is ready
	fin.desktop.main(function () {

		fin.desktop.System.getVersion(function (version) {
			$("#doc-link").html("<a target='_blank' href='https://developer.openfin.co/jsdocs/" + version + "'>" + version + " Documentation</a>");
			$("#OpenFinVersion").html(version);
		});

		fin.desktop.Application.createFromManifest('http://localhost:9001/config/OpenFinCenter.json', function (app) {
			console.log("Trying to launch OpenFinCenter");

			app.run(function(){
				console.log("Success launching OpenFinCenter!");
			}, function(err){
				console.log("Error Launching OpenFinCenter", err);
			});
			
		}, function (error) {
			console.error('Failed to create app from manifest: ', error);
		});
	});

	$("#actionButton1").click(function () {
		new fin.desktop.Notification.Notification2("my title", "blah blah");
	});

	$("#actionButton2").click(function () {
		new fin.desktop.Notification.Notification2("Some Title", "Its a lot of information!");
	});

	$("#actionButton3").click(function () {
		new fin.desktop.Notification.Notification2("Information", "Mateusz is learning plugins and Javascript.  He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! He loves it! ");
	});

});	