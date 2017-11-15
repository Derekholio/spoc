fin.desktop.main(function(){
    console.log("Preload: fin.desktop.Notification2.js Loading");
    fin.desktop.Notification.Notification2 = function(title, text){
        fin.desktop.InterApplicationBus.send("OpenFinCenter_Main", "notification2", {
            text: text,
            title: title
        });
    };
    console.log("Preload: fin.desktop.Notification2.js Loaded!");
});
