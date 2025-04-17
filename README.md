💡Emotion-Based Smart Bulb Controller <br>
This backend app integrates a lightweight AI facial detection service with Shelly Cloud to create a smart lighting experience that reacts to human emotions in real-time.

🧠 How It Works <br>
Emotion Detection (AI Integration)

A deployed facial analysis API receives a user’s image and returns their detected emotion (e.g., happy, sad, angry).

The image is sent via a POST request to the AI server hosted on Azure. <br>

Response: { emotion: "sad" }, for example.

Smart Bulb Color Control (Shelly Cloud Integration)

The backend uses the detected emotion to change the color of a smart bulb via the Shelly Cloud API.

For instance:

😊 happy → Yellow

😢 sad → Blue

😠 angry → Red

```
{
  "color": { "red": 0, "green": 0, "blue": 255 }
}
```
⚠️ Note: The Shelly Cloud API requires Content-Type: application/x-www-form-urlencoded rather than JSON. Be sure to format the body accordingly using key=value pairs.

Response:
```
{
  "ison": true,
  "red": 0,
  "green": 0,
  "blue": 255,
  ...
}
```
The Shelly device is authenticated using your device ID and auth key, stored securely in .env.
🛠 .env Example
```
PORT=3333
SHELLY_DEVICE_ID=your_device_id
SHELLY_AUTH_TOKEN=your_auth_token
```

📦 API Endpoint
POST /control-bulb
Change the bulb color based on detected emotion.


