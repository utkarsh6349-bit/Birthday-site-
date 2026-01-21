export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    response,
    gift,
    name,
    phone,
    address,
    city,
    state,
    pincode,
    maps,
    time
  } = req.body;

  const message = `
🎉 BIRTHDAY WEBSITE RESPONSE 🎉

💌 Proposal Answer:
${response}

🎁 Selected Gift:
${gift}

👤 Details:
Name: ${name}
Phone: ${phone}

📍 Address:
${address}
${city}, ${state} - ${pincode}

🗺️ Maps:
${maps}

⏰ Time:
${time}
`;

  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.CHAT_ID,
          text: message
        })
      }
    );

    if (!telegramRes.ok) {
      throw new Error("Telegram API failed");
    }

    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
