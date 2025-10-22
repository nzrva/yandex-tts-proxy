export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const { text } = req.body;

  const response = await fetch("https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize", {
    method: "POST",
    headers: {
      "Authorization": "AQWJbjp64T3Vw-B0SW_6X9GfxSl2ss-lZDhRzssh",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      text,
      lang: "kk-KZ",  // Казахский
      voice: "kseniya",
      format: "oggopus"
    }),
  });

  const audioBuffer = await response.arrayBuffer();
  res.setHeader("Content-Type", "audio/ogg");
  res.send(Buffer.from(audioBuffer));
}
