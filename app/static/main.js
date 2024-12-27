// Import QR code generation library (e.g., qr-code.js)
async function loadQRCodeLibrary() {
    const script = document.createElement('script');
    script.src = "https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js";
    document.head.appendChild(script);
    await new Promise(resolve => script.onload = resolve);
  }
  
  async function init() {
    await loadQRCodeLibrary();
  
    const startGameButton = document.getElementById('start-game-button');
    const qrCodeContainer = document.getElementById('qr-code-container');
    const qrCodeCanvas = document.getElementById('qr-code');
    const gameLinkElement = document.getElementById('game-link');
  
    // Function to handle "Start New Game" button click
    startGameButton.addEventListener('click', async () => {
      try {
        // Call the backend API to start a new game session
        const response = await fetch('/start-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hostName: 'Host' }) // Replace with dynamic host name if needed
        });
  
        if (!response.ok) {
          throw new Error('Failed to start a new game');
        }
  
        const { session_id } = await response.json();
  
        // Generate the join URL and QR code
        const joinUrl = `${window.location.origin}/join/${session_id}`;
        QRCode.toCanvas(qrCodeCanvas, joinUrl, error => {
          if (error) {
            console.error('QR Code generation failed:', error);
            return;
          }
  
          // Display the QR code and game link
          qrCodeContainer.classList.remove('hidden');
          gameLinkElement.textContent = joinUrl;
        });
      } catch (error) {
        console.error('Error starting a new game:', error);
        alert('Could not start a new game. Please try again.');
      }
    });
  }
  
  // Initialize the app
  init();
  