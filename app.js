const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const base_url = `http://${process.env.SHELLY_DEVICE_IP}/light/0`;
// const base_url = 'https://shelly-134-eu.shelly.cloud/device/relay/control';

const controlBulb = async (state, rgbw = { red: 0, green: 0, blue: 0 }) => {
  try {
    const response = await axios.get(`${base_url}/`, {
      params: {
        // id: process.env.SHELLY_DEVICE_ID,
        // auth_key: process.env.SHELLY_AUTH_TOKEN,
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
  console.log("change bulb color to :", color);

  controlBulb('on', color)
    .then(() => res.status(200).send('Bulb updated'))
    .catch((err) => res.status(500).send(err.message));
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () =>
  console.log(`Bulb control server running on port ${PORT}`)
);
