# GronkhTV-Reacts-Addon

- **Name:** GronkhTV Reacts
- **Version:** 0.1
- **Typ:** User Script (JavaScript)
- **Beschreibung:** Fügt der Kapitelübersicht auf Gronkh.tv Reacts hinzu, um die Navigation und den Überblick über die Streams zu verbessern.
- **Autor:** Support Hotline
- **Kompatibilität:** Funktioniert auf allen Seiten unter `https://gronkh.tv/streams/*`

**Funktionen:**
- **Automatische Kapitel-Erstellung:** Das Skript sucht nach bestimmten Kommentaren im Format `timestamp | SegmentName | SegmentTitle` und erstellt basierend darauf neue Kapitel-Buttons.
- **Anpassbarer Sicherheitsfilter:** Nur Kommentare von autorisierten Nutzern werden berücksichtigt, um Missbrauch zu verhindern.
- **Visuelle Anpassung:** Nutzt ein standardisiertes Thumbnail (aus Twitch) für die Kapitelanzeige.

**Wie es funktioniert:**
- Das Skript durchsucht die Kommentarsektion nach spezifischen Kommentaren, die Kapitelinformationen enthalten.
- Es extrahiert die Segmentnamen, Titel und Zeitstempel aus diesen Kommentaren.
- Anschließend fügt es diese Informationen als interaktive Kapitel-Buttons in die Videobeschreibung ein, was eine verbesserte Navigation innerhalb des Videos ermöglicht.

**Nutzung:**
- Installiere [Tampermonkey](https://www.tampermonkey.net) oder ein ähnliches Addon in deinem Browser, füge dieses Skript hinzu und besuche `gronkh.tv/streams/*` um die neuen Kapitel-Buttons zu sehen.
- Oder füge das Bookmarklet zu deinen Lesezeichen hinzu. Auf diesem Wege muss das Lesezeichen manuell nach dem Seitenbesuch angeklickt werden.

**Anpassungen durch Nutzer:**
- **Variablen anpassen:** Nutzer können die Liste der erlaubten Nutzer (`_AllowedUsers`) nach ihren Wünschen anpassen und das Thumbnail (`_ThumbnailUrl`) personalisieren.

**Hinweise:**
- Aktuell ist mir leider die einbindung der Kapitel in die Zeitleiste noch nicht möglich.
- Das Script wird mit einer 5 sekündigen Verzögerung geladen um abzuwarten, bis alle Seitenelemente geladen sind, da leider mit dem MutationObserver einige Bugs entstehen.
