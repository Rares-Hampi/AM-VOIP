// Conectare la serverul WebSocket
const ws = new WebSocket("ws://localhost:8765");

// Obiect pentru conexiunea WebRTC
const pc = new RTCPeerConnection();
let localStream;

// Preluare video/audio local și atașare la video tag
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    localStream = stream;
    const localVideo = document.getElementById("localVideo");
    localVideo.srcObject = stream;

    // Adaugă fiecare track la conexiunea WebRTC
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    // Adaugă filtre video
    const filterSelect = document.getElementById("filter");
    filterSelect.addEventListener("change", () => {
      localVideo.style.filter = filterSelect.value;
    });
  });

// Recepționare mesaje de la WebSocket pentru semnalizare
ws.onmessage = async ({ data }) => {
  const msg = JSON.parse(data);

  if (msg.offer) {
    await pc.setRemoteDescription(new RTCSessionDescription(msg.offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    ws.send(JSON.stringify({ answer }));
  } else if (msg.answer) {
    await pc.setRemoteDescription(new RTCSessionDescription(msg.answer));
  } else if (msg.candidate) {
    await pc.addIceCandidate(new RTCIceCandidate(msg.candidate));
  } else if (msg.chatMessage) {
    displayMessage(msg.chatMessage, "remote");
  }
};

// Trimitere ICE candidates prin WebSocket
pc.onicecandidate = (event) => {
  if (event.candidate) {
    ws.send(JSON.stringify({ candidate: event.candidate }));
  }
};

// Afișare stream video de la celălalt peer
pc.ontrack = ({ streams: [stream] }) => {
  const remoteVideo = document.getElementById("remoteVideo");
  remoteVideo.srcObject = stream;

  // Adaugă filtre video pentru remote video
  const filterSelect = document.getElementById("filter");
  filterSelect.addEventListener("change", () => {
    remoteVideo.style.filter = filterSelect.value;
  });
};

// Inițiere apel - se creează un offer
async function startCall() {
  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  ws.send(JSON.stringify({ offer }));
  console.log("Apel inițiat");
}

const startButton = document.getElementById("start-call");
startButton.addEventListener("click", () => {
  startCall();
  console.log("Apel inițiat");
});

// Închiderea conexiunii WebSocket la terminarea apelului
function endCall() {
  ws.close();
  pc.close();
  document.getElementById("localVideo").srcObject = null;
  document.getElementById("remoteVideo").srcObject = null;
}
const endButton = document.getElementById("end-call");
endButton.addEventListener("click", () => {
  endCall();
});

// Închidere cameră
const closeCameraButton = document.getElementById("close-camera");
closeCameraButton.addEventListener("click", () => {
  if (localStream) {
    localStream
      .getVideoTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    closeCameraButton.textContent = localStream.getVideoTracks()[0].enabled
      ? "Close Camera"
      : "Open Camera";
  }
});

// Închidere microfon
const closeMicButton = document.getElementById("close-mic");
closeMicButton.addEventListener("click", () => {
  if (localStream) {
    localStream
      .getAudioTracks()
      .forEach((track) => (track.enabled = !track.enabled));
    closeMicButton.textContent = localStream.getAudioTracks()[0].enabled
      ? "Close Mic"
      : "Open Mic";
  }
});

// Funcționalitate chat
const chatInput = document.getElementById("chat-input");
const sendMessageButton = document.getElementById("send-message");
const messagesContainer = document.getElementById("messages");

sendMessageButton.addEventListener("click", () => {
  const message = chatInput.value.trim();
  if (message) {
    displayMessage(message, "local");
    ws.send(JSON.stringify({ chatMessage: message }));
    chatInput.value = "";
  }
});

function displayMessage(message, sender) {
  const messageElement = document.createElement("div");
  messageElement.textContent =
    sender === "local" ? `You: ${message}` : `Peer: ${message}`;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
