# Aplicație WebRTC Video Chat cu Semnalizare WebSocket

## Description

Această aplicație permite realizarea unui apel video peer-to-peer între două browsere, folosind tehnologia WebRTC pentru streaming audio-video și WebSocket pentru schimbul de mesaje de semnalizare (offer, answer, ICE candidates). În plus, oferă o interfață simplă pentru chat text, aplicarea de filtre video și controlul camerei și microfonului.

---

## 🎥 Funcționalități principale

- **Apel video peer-to-peer**: Conexiune WebRTC directă între două utilizatori, fără server media intermediar.
- **Semnalizare prin WebSocket**: Utilizat pentru stabilirea conexiunii WebRTC între utilizatori.
- **Filtre video în timp real**: Utilizatorii pot aplica filtre CSS (`grayscale`, `sepia`, etc.) local și remote.
- **Chat text integrat**: Suport pentru mesaje text între participanți, transmise tot prin WebSocket.
- **Control cameră și microfon**:
  - Oprire/repornire cameră video
  - (TODO) Oprire/repornire microfon
- **Gestionare apel**:
  - Inițiere apel
  - (TODO) Închidere apel și curățare resurse
- **Moderare conținut chat**:
  - (TODO) Cenzurare automată a cuvintelor interzise

---

## ⚙️ Tehnologii utilizate

| Tehnologie        | Rol                                        |
|-------------------|---------------------------------------------|
| **WebRTC**        | Transmisie audio/video între utilizatori    |
| **WebSocket (Python)** | Canal de semnalizare între browsere     |
| **JavaScript (client)** | Control WebRTC, UI, chat, filtre        |
| **HTML/CSS**      | Interfață pentru video, butoane, chat       |

---

## 🧠 Arhitectură

- **Server WebSocket** (Python `websockets`): intermediar pentru mesaje de semnalizare și mesaje text
- **Client JavaScript**: realizează toate operațiile WebRTC, gestionează interfața, stream-uri și interacțiunile utilizatorului

---

## 🚧 Funcționalități în curs de implementare

- Oprirea și repornirea microfonului
- Închiderea completă a apelului (conexiune WebRTC + WebSocket)
- Cenzurarea automată a mesajelor din chat cu cuvinte interzise

---

## 💡 Scop

Această aplicație servește drept demo sau punct de plecare pentru proiecte de tip:
- Aplicații de videochat peer-to-peer
- Sisteme de asistență sau suport video în timp real
- Platforme educaționale interactive cu streaming

## How to run

1. Clone the repository:
   ```bash
   git clone https://github.com/Rares-Hampi/AM-VOIP 
    cd AM-VOIP
   ```
2. Open the project in your IDE.
3. Instal the packages:
   ```bash
   pip install asyncio websockets
   ```
4. Run the server:
   ```bash
    python3 server.py
   ```
5. Run the HTML page:
   Save the HTML file in the same directory as the server and open it in your browser.
