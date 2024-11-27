const express = require('express');
const dotenv = require('dotenv');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const base_url = `https://shelly-134-eu.shelly.cloud/device/light/control`;

// Function to control the bulb
const controlBulb = async (rgbw = { red: 0, green: 0, blue: 0 }) => {
    const id = process.env.SHELLY_DEVICE_ID;
    const auth_key = process.env.SHELLY_AUTH_TOKEN; // Ensure you're using the correct variable name

    if (!id || !auth_key) {
        throw new Error('Missing Shelly Device ID or Auth Token');
    }

    // Construct the data string exactly like in curl
    const data = `id=${id}&auth_key=${auth_key}&red=${rgbw.red}&green=${rgbw.green}&blue=${rgbw.blue}&brightness=100`;

    try {
        // Send the request with axios
        const response = await axios({
            method: 'post',
            url: base_url,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded', 
            },
            data, 
        });

        return response.data; 
    } catch (error) {
        console.error('Error controlling bulb:', error.response?.data || error.message);
        throw error; 
    }
};

app.post('/control-bulb', (req, res) => {
    const { color } = req.body; 
    console.log('Change bulb color to:', color);

    controlBulb(color)
        .then((result) => res.status(200).json(result))
        .catch((err) => res.status(500).json({ error: err.response?.data || err.message }));
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Bulb control server running on port ${PORT}`);
});
