export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const { text, lang = "kk-KZ", voice = "amira" } = req.body;
  const apiKey = process.env.YANDEX_API_KEY;

  const response = await fetch("https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize", {
    method: "POST",
    headers: {
      "Authorization": `Api-Key ${apiKey}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      text,
      lang,
      voice,
      format: "mp3"
    })
  });

  if (!response.ok) {
    const err = await response.text();
    res.status(500).send(err);
    return;
  }

  const buffer = await response.arrayBuffer();
  res.setHeader("Content-Type", "audio/mpeg");
  res.send(Buffer.from(buffer));
}
