// ==UserScript==
// @name         GronkhTV Reacts
// @version      0.1
// @description  Fügt der Kapitelübersicht auf Gronkh.tv Reacts hinzu, um die Navigation und den Überblick über die Streams zu verbessern.
// @author       Support Hotline
// @match        https://gronkh.tv/streams/*
// @icon         https://gronkh.tv/assets/favicon/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  //### SETTINGS ###
  const _AllowedUsers = ["Support Hotline", "HackenPorsche"]; //Und jeden anderen Nutzer den du Traust
  const _ThumbnailUrl = "https://static-cdn.jtvnw.net/ttv-boxart/509658-48x64.jpg"; //Kapitel Thumbnail

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

  function stringMatchesAny(str, array) {
    return array.some((element) => str === element);
  }

  // Wenn Kapitelübersicht geladen wurde nach Kommentaren suchen
  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        // Prüfen, ob Kapitelübersicht hinzugefügt wurde
        const parentDiv = document.querySelector(
          "div.g-video-comment-wrapper.ng-star-inserted"
        );
        if (parentDiv) {
          // Wenn Kapitelübersicht gefunden dann Kommentaren suchen
          const commentWrappers = document.querySelectorAll(
            "div.g-video-comment-wrapper.ng-star-inserted"
          );

          commentWrappers.forEach((node) => {
            const commentDiv = node.querySelector(
              "div.g-video-comment-content"
            );
            const timeButton = node.querySelector(
              "div.g-video-comment-time button"
            );
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
          // Wenn gefunden observer stoppen
          observer.disconnect();
          break;
        }
      }
    }
  });

  // Observer starten
  observer.observe(document.body, { childList: true, subtree: true });

  //EndOfCode
})();
