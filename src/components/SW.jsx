import React, { useEffect, useState } from "react";

function SW() {
  const [showNotif, setShowNotif] = useState(false);
  const [showInstallReq, setShowInstallReq] = useState(
    JSON.parse(localStorage.getItem("installCondition") ? false : true)
  );
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  useEffect(() => {
    // installation-------------
    if (!localStorage.getItem("installCondition")) {
      setShowInstallReq(true);
    }

    // notification-------------
    if (Notification.permission == "default") {
      setShowNotif(true);
    }
    //this handler triggered when the website content loaded
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      //locate the 'e' values in defferd prompt(deferredPrompt is a glabal variable=>we need the 'e' in othe function)
      setDeferredPrompt(e);
      return false;
    });
  }, []);

  //this handler triggered when the user click on install logo on app
  const handleShowInstallPrompt = () => {
    console.log({ deferredPrompt });
    //we use from 'e' value in beforeinstallPrompt handler here=>deferredPrompt
    if (deferredPrompt) {
      deferredPrompt.prompt();
      setShowInstallReq(false);
      //this method consider if the button that user clicked is 'ok' or 'cancel'
      deferredPrompt.userChoice.then((choiceRes) => {
        localStorage.setItem("installCondition", JSON.parse(true));
        console.log(choiceRes.outcome);
        if (choiceRes.outcome === "accepted") {
          console.log("User accepted the install prompt.");
        } else if (choiceRes.outcome === "dismissed") {
          console.log("User dismissed the install prompt");
        }
      });
      setDeferredPrompt(null);
    }
  };
  //this handler triggered when the user click on notification logo on app
  const handleShowNotifPermission = () => {
    Notification.requestPermission((res) => {
      if (res == "granted") {
        setShowNotif(false);
      } else {
        setShowNotif(false);
      }
    });
  };
  return (
    <div>
      {showNotif && (
        <p onClick={handleShowNotifPermission}>notification??????????</p>
      )}
      {showInstallReq && (
        <p onClick={handleShowInstallPrompt}>install???????????????</p>
      )}
    </div>
  );
}

export default SW;
