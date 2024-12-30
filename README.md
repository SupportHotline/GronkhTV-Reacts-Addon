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
- Oder füge dieses [Bookmarklet](javascript:void%20function(){(function(){%22use%20strict%22;function%20a(a,b,d){const%20e=document.querySelector(%22div.g-video-description-flex-list.ng-tns-c83-18.ng-star-inserted%22);if(!e)return%20void%20console.error(%22Das%20Ziel-Element%20wurde%20nicht%20gefunden!%22);const%20g=e.querySelector(%22button.g-video-description-chapter%22);if(!g)return%20void%20console.error(%22Kein%20existierender%20Button%20gefunden,%20um%20das%20Attribut%20zu%20kopieren!%22);const%20h=Array.from(g.attributes).find(a=%3Ea.name.startsWith(%22_ngcontent%22));if(!h)return%20void%20console.error(%22Dynamisches%20Attribut%20wurde%20nicht%20gefunden!%22);const%20i=document.createElement(%22button%22);i.setAttribute(h.name,h.value),i.className=%22g-video-description-chapter%20ng-tns-c83-18%20ng-star-inserted%22,i.title=b,i.onclick=()=%3Ec(d);const%20j=document.createElement(%22img%22);j.setAttribute(h.name,h.value),j.className=%22g-video-description-chapter-image%20ng-tns-c83-18%20ng-star-inserted%22,j.setAttribute(%22alt%22,%22Kapitel%20Thumbnail%22),j.setAttribute(%22src%22,f);const%20k=document.createElement(%22div%22);k.setAttribute(h.name,h.value),k.className=%22g-video-description-chapter-info%20ng-tns-c83-18%22;const%20l=document.createElement(%22div%22);l.setAttribute(h.name,h.value),l.className=%22g-video-description-chapter-info-title%20ng-tns-c83-18%22,l.textContent=a;const%20m=document.createElement(%22div%22);m.setAttribute(h.name,h.value),m.className=%22g-video-description-chapter-info-time%20ng-tns-c83-18%22,m.textContent=d,k.appendChild(l),k.appendChild(m),i.appendChild(j),i.appendChild(k),e.appendChild(i)}function%20b(a){const%20b=a.split(%22:%22).map(Number);if(3!==b.length||b.some(isNaN))return%20console.error(%22Invalid%20timestamp%20format.%20Use%20HH:MM:SS.%22),null;const[c,d,e]=b;return%203600*c+60*d+e}function%20c(a){const%20c=b(a);if(null===c)return;const%20d=document.querySelector(%22video%22);return%20d%3Fvoid(d.addEventListener(%22loadedmetadata%22,function(){return%20c%3Ed.duration%3Fvoid%20console.error(`Timestamp%20exceeds%20video%20duration%20(${d.duration}%20seconds).`):void(d.currentTime=c,d.play())}),1%3C=d.readyState%26%26(c%3C=d.duration%3F(d.currentTime=c,d.play()):console.error(`Timestamp%20exceeds%20video%20duration%20(${d.duration}%20seconds).`))):void%20console.error(%22No%20video%20element%20found%20on%20the%20page.%22)}function%20d(a,b){return%20b.some(b=%3Ea===b)}const%20e=[%22Support%20Hotline%22,%22HackenPorsche%22],f=%22https://static-cdn.jtvnw.net/ttv-boxart/509658-48x64.jpg%22,g=document.querySelectorAll(%22div.g-video-comment-wrapper.ng-star-inserted%22);g.forEach(b=%3E{const%20c=b.querySelector(%22div.g-video-comment-content%22),f=b.querySelector(%22div.g-video-comment-time%20button%22),g=b.querySelector(%22span.ng-star-inserted%22);if(c%26%26f%26%26g){const%20b=c.innerText,h=g.innerText;if(b.includes(%22timestamp%20|%20%22)%26%26d(h,e)){const%20c=b.split(%22|%22),d=c[1].trim(),e=c[2].trim(),g=f.innerText.trim();a(d,e,g)}}})})()}();) zu deinen Lesezeichen hinzu. Auf diesem Wege muss das Lesezeichen manuell nach dem Seitenbesuch angeklickt werden.

**Anpassungen durch Nutzer:**
- **Variablen anpassen:** Nutzer können die Liste der erlaubten Nutzer (`_AllowedUsers`) nach ihren Wünschen anpassen und das Thumbnail (`_ThumbnailUrl`) personalisieren.

**Hinweise:**
- Aktuell ist mir leider die einbindung der Kapitel in die Zeitleiste noch nicht möglich.
- Das Script wird mit einer 5 sekündigen Verzögerung geladen um abzuwarten, bis alle Seitenelemente geladen sind, da leider mit dem MutationObserver einige Bugs entstehen.
- In seltenen Fällen werden nicht alle Kommentare erfasst. Investigation läuft noch.
