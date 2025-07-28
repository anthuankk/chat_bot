function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();
    if (message === "") return;
  
    addMessage("user", message);
    input.value = "";
  
    setTimeout(() => {
      const response = getBotResponse(message.toLowerCase());
      addMessage("bot", response);
      speak(response);
    }, 600);
  }
  
  function addMessage(sender, text) {
    const chatBox = document.getElementById("chat-box");
  
    const message = document.createElement("div");
    message.classList.add("message", sender);
  
    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.src = sender === "user" ? "https://i.imgur.com/4ZQZ4ZP.png" : "https://i.imgur.com/HR1pA4A.png";
  
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.textContent = text;
  
    message.appendChild(avatar);
    message.appendChild(bubble);
    chatBox.appendChild(message);
  
    chatBox.scrollTop = chatBox.scrollHeight;
  }
  
  function getBotResponse(input) {
    if (input.includes("hola")) return "¡Hey humano! ¿Qué necesitas?";
    if (input.includes("Como estas?")) return "Funcionando al 100%. ¿Y tú?";
    if (input.includes("tu nombre")) return "Ricardo, cerebro digital a tu servicio.";
    if (input.includes("hora")) return `Ahora mismo son las ${new Date().toLocaleTimeString()}.`;
    if (input.includes("chiste")) return "¿Qué le dice un bit a otro? Nos vemos en el bus de datos.";
    if (input.includes("gracias")) return "¡Para eso estoy! ";
    if (input.includes("adiós") || input.includes("bye")) return "¡Hasta pronto, viajero digital!";
    return "No entendí eso... prueba con otra frase ";
  }
  
  function speak(text) {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = "es-ES";
    window.speechSynthesis.speak(speech);
  }
  
  function startListening() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "es-ES";
  
    recognition.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript;
      document.getElementById("user-input").value = voiceInput;
      sendMessage();
    };
  
    recognition.onerror = (event) => {
      console.error("🎤 Error:", event.error);
    };
  
    recognition.start();
  }
  function setBackgroundByTime() {
    const hour = new Date().getHours();
    const body = document.body;
  
    if (hour >= 6 && hour < 12) {
      // Mañana
      body.style.background = "url('https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1350&q=80') no-repeat center center fixed";
    } else if (hour >= 12 && hour < 18) {
      // Tarde
      body.style.background = "url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1350&q=80') no-repeat center center fixed";
    } else {
      // Noche
      body.style.background = "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80') no-repeat center center fixed";
    }
  
    body.style.backgroundSize = "cover";
  }
  
  // Ejecutar al cargar
  window.onload = setBackgroundByTime;
  