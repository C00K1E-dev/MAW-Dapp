import React, { useEffect, useState } from "react";
import PopupMessage from "./PopupMessage";

const CookieConsent = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClose = () => {
    setShowPopup(false);
    // Set a cookie to remember that the user has accepted the cookies
    document.cookie =
      "cookies_accepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
  };

  const handleClick = (file) => {
    window.open(`/docs/${file}.html`, "_blank");
  };

  useEffect(() => {
    // Check if the user has previously accepted the cookies
    const cookiesAccepted =
      document.cookie.indexOf("cookies_accepted=true") !== -1;

    // Show the pop-up if cookies have not been accepted
    if (!cookiesAccepted) {
      setShowPopup(true);
    }
  }, []);

  if (!showPopup) {
    return null; // If the popup is closed or cookies are already accepted, don't show the component
  }

  return (
    <PopupMessage
      message={
        <>
          We collect cookies to analyze our website traffic and performance. WE NEVER COLLECT ANY PERSONAL DATA. By using this website, you agree to our{" "}
          <button className="btn-link privacy-btn" onClick={() => handleClick("Privacy")}>Privacy Policy</button>,{" "}
          <button className="btn-link terms-btn" onClick={() => handleClick("Terms")}>Terms</button>, and{" "}
          <button className="btn-link disclaimer-btn" onClick={() => handleClick("Disclaimer")}>Disclaimer</button>.
        </>
      }
      onClose={handleClose}
    />
  );
};

export default CookieConsent;
