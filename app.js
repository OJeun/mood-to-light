const axios = require("axios");

const cloudUrl = "https://shelly-134-eu.shelly.cloud/device/light?id=485519fc0490&auth_key=MmEzNGZjdWlkB44B0B5F51CF40CDED3791BA8AB79868B14C101A69D69AB2634CE690186894BF5C6A428AD55D9CD5"; // Replace with your actual cloud URL
// const authToken = "MmEzNGZjWlkB44B0B5F51CF40CDED3791BA8AB79868B14C101A69D69AB2634CE690186894BF5C6A428AD55D9CD5"; // Replace with your actual auth_key
// const deviceId = "485519fc0490"; // Replace with your actual device_id

const controlBulb = async (state) => {
  try {
    const response = await axios.post(
      cloudUrl,
      {
        ""
      },
    );
    console.log("Bulb control response:", response.data);
  } catch (error) {
    console.error("Error controlling bulb:", error.response?.data || error.message);
  }
};

// // Turn the bulb ON
// controlBulb("on");

// Turn the bulb OFF
controlBulb("off");
