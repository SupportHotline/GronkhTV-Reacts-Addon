// ==UserScript==
// @name         GronkhTV Reacts
// @version      0.1-Delay
// @description  Fügt der Kapitelübersicht auf Gronkh.tv Reacts hinzu, um die Navigation und den Überblick über die Streams zu verbessern.
// @author       Support Hotline
// @match        https://gronkh.tv/streams/*
// @icon         https://gronkh.tv/assets/favicon/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  //### SETTINGS ###
  const _Delay = 5000; //Verzögerung um das vollständige laden der Seite abzuwarten.
  const _AllowedUsers = ["Support Hotline", "HackenPorsche"]; //Und jeden anderen Nutzer den du Traust
  const _ThumbnailUrl =
    "https://static-cdn.jtvnw.net/ttv-boxart/509658-48x64.jpg"; //Kapitel Thumbnail

  // Funktion zum Hinzufügen eines Buttons
  function addChapterButton(segmentName, segmentTitle, timeStamp) {
    // Das Ziel-Element finden
    const parentDiv = document.querySelector(
      "div.g-video-description-flex-list.ng-tns-c83-18.ng-star-inserted"
    );

    if (!parentDiv) {
      console.error("Das Ziel-Element wurde nicht gefunden!");
      return;
    }

    // Existierendes Button-Element finden, um das dynamische Attribut zu kopieren
    const existingButton = parentDiv.querySelector(
      "button.g-video-description-chapter"
    );
    if (!existingButton) {
      console.error(
        "Kein existierender Button gefunden, um das Attribut zu kopieren!"
      );
      return;
    }

    // Dynamisches Attribut extrahieren
    const dynamicAttribute = Array.from(existingButton.attributes).find(
      (attr) => attr.name.startsWith("_ngcontent")
    );
    if (!dynamicAttribute) {
      console.error("Dynamisches Attribut wurde nicht gefunden!");
      return;
    }

    // Button-Element erstellen
    const button = document.createElement("button");
    button.setAttribute(dynamicAttribute.name, dynamicAttribute.value);
    button.className =
      "g-video-description-chapter ng-tns-c83-18 ng-star-inserted";
    button.title = segmentTitle;
    button.onclick = () => jumpToVideoTime(timeStamp);

    // Bild-Element erstellen
    const img = document.createElement("img");
    img.setAttribute(dynamicAttribute.name, dynamicAttribute.value);
    img.className =
      "g-video-description-chapter-image ng-tns-c83-18 ng-star-inserted";
    img.setAttribute("alt", "Kapitel Thumbnail");
    img.setAttribute("src", _ThumbnailUrl);

    // Info-Container erstellen
    const infoDiv = document.createElement("div");
    infoDiv.setAttribute(dynamicAttribute.name, dynamicAttribute.value);
    infoDiv.className = "g-video-description-chapter-info ng-tns-c83-18";

    // Titel-Div erstellen
    const titleDiv = document.createElement("div");
    titleDiv.setAttribute(dynamicAttribute.name, dynamicAttribute.value);
    titleDiv.className = "g-video-description-chapter-info-title ng-tns-c83-18";
    titleDiv.textContent = segmentName;

    // Zeitstempel-Div erstellen
    const timeDiv = document.createElement("div");
    timeDiv.setAttribute(dynamicAttribute.name, dynamicAttribute.value);
    timeDiv.className = "g-video-description-chapter-info-time ng-tns-c83-18";
    timeDiv.textContent = timeStamp;

    // Elemente zusammenfügen
    infoDiv.appendChild(titleDiv);
    infoDiv.appendChild(timeDiv);
    button.appendChild(img);
    button.appendChild(infoDiv);
    parentDiv.appendChild(button);
  }

  /**
   * Convert a timestamp string (HH:MM:SS) to seconds.
   * @param {string} timestampString - The time in HH:MM:SS format.
   * @returns {number} - The time in seconds.
   */
  function convertTimestampToSeconds(timestampString) {
    const parts = timestampString.split(":").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) {
      console.error("Invalid timestamp format. Use HH:MM:SS.");
      return null;
    }
    const [hours, minutes, seconds] = parts;
    return hours * 3600 + minutes * 60 + seconds;
  }

  /**
   * Find the first video element on the page and jump to the specified timestamp.
   * @param {string} timestampString - The time in HH:MM:SS format to jump to in the video.
   */
  function jumpToVideoTime(timestampString) {
    // Convert the timestamp string to seconds
    const timestamp = convertTimestampToSeconds(timestampString);
    if (timestamp === null) return;

    // Find the first video element on the page
    const video = document.querySelector("video");

    if (!video) {
      console.error("No video element found on the page.");
      return;
    }

    // Ensure the video metadata is loaded before jumping to the timestamp
    video.addEventListener("loadedmetadata", function () {
      if (timestamp > video.duration) {
        console.error(
          `Timestamp exceeds video duration (${video.duration} seconds).`
        );
        return;
      }
      video.currentTime = timestamp;
      video.play(); // Optionally start playing the video
    });

    // If metadata is already loaded, we can jump directly
    if (video.readyState >= 1) {
      if (timestamp <= video.duration) {
        video.currentTime = timestamp;
        video.play(); // Optionally start playing the video
      } else {
        console.error(
          `Timestamp exceeds video duration (${video.duration} seconds).`
        );
      }
    }
  }

  // Kommentar suche und neue Kapitel erstellen
  setTimeout(() => {
    const commentWrappers = document.querySelectorAll(
      "div.g-video-comment-wrapper.ng-star-inserted"
    );

    commentWrappers.forEach((node) => {
      const commentDiv = node.querySelector("div.g-video-comment-content");
      const timeButton = node.querySelector("div.g-video-comment-time button");
      const authorSpan = node.querySelector("span.ng-star-inserted");

      if (commentDiv && timeButton && authorSpan) {
        const comment = commentDiv.innerText;
        const author = authorSpan.innerText;
        if (
          comment.includes("timestamp | ") &&
          stringMatchesAny(author, _AllowedUsers)
        ) {
          const parts = comment.split("|");

          // Leerzeichen am Anfang oder Ende der Teile entfernen
          const segmentName = parts[1].trim();
          const segmentTitle = parts[2].trim();
          const timeText = timeButton.innerText.trim();

          // Buttons einfügen
          addChapterButton(
            segmentName, // SegmentName
            segmentTitle, // SegmentTitle
            timeText // TimeStamp
          );
        }
      }
    });
  }, _Delay); // Verzögerung

  function stringMatchesAny(str, array) {
    return array.some((element) => str === element);
  }

  //EndOfCode
})();
