const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');

const app = express();
app.use(express.json());

dotenv.config();

const base_url = `http://${process.env.SHELLY_DEVICE_IP}/light/0`;

const hexToRgbw = (hex) => {
  // separate hex color to RGB values
  const bigint = parseInt(hex.slice(1), 16);
  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;
  console.log({ red, green, blue });
  return { red, green, blue };
};

const controlBulb = async (
  state,
  rgbw = { red: 0, green: 0, blue: 0 }
) => {
  try {
    const response = await axios.get(`${base_url}/set`, {
      params: {
        turn: state,
        red: rgbw.red,
        green: rgbw.green,
        blue: rgbw.blue,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error controlling bulb:', error.message);
    throw error;
  }
};

app.post('/control-bulb', (req, res) => {
  const { color } = req.body;

  if (color && color.startsWith('#') && color.length === 7) {
    const rgbw = hexToRgbw(color);
    controlBulb('on', rgbw)
      .then(() => res.status(200).send('Bulb updated'))
      .catch((err) => res.status(500).send(err.message));
  } else {
    res.status(400).send('Invalid color format');
  }
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () =>
  console.log(`Bulb control server running on port ${PORT}`)
);
