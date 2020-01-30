import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>m3tube</strong> developed by{" "}
          <a href="https://github.com/m3alamin/">m3alamin</a>. Powered By{" "}
          <a
            href="https://developers.google.com/youtube/v3"
            target="_blank"
            rel="noopener noreferrer"
          >
            youtube data api v3
          </a>
          .
        </p>
      </div>
    </footer>
  );
}

export default Footer;
