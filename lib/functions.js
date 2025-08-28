const axios = require('axios');

/**
 * Fetches a buffer from a given URL.
 * @param {string} url - The URL to fetch the buffer from.
 * @returns {Promise<Buffer>} - The fetched buffer.
 */
const getBuffer = async (url) => {
    try {
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) {
        console.error(`Error fetching buffer: ${error}`);
        throw error;
    }
};

/**
 * Gets the admins from a group participant list.
 * @param {Array} participants - The list of group participants.
 * @returns {Array} - The list of admin JIDs.
 */
const getGroupAdmins = (participants) => {
    const admins = [];
    for (const participant of participants) {
        if (participant.admin === 'admin' || participant.admin === 'superadmin') {
            admins.push(participant.id);
        }
    }
    return admins;
};

/**
 * Generates a random string with the given extension.
 * @param {string} ext - The file extension.
 * @returns {string} - The random string with the extension.
 */
const getRandom = (ext) => {
    return `${Math.floor(Math.random() * 10000)}${ext}`;
};

/**
 * Formats a number with commas (e.g., 1000 -> 1,000).
 * @param {number} number - The number to format.
 * @returns {string} - The formatted number.
 */
const h2k = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Checks if a string is a valid URL.
 * @param {string} url - The string to check.
 * @returns {boolean} - True if the string is a valid URL, false otherwise.
 */
const isUrl = (url) => {
    const regex = /^(https?:\/\/[^\s]+)/;
    return regex.test(url);
};

/**
 * Converts an object to a pretty JSON string.
 * @param {Object} obj - The object to convert.
 * @returns {string} - The pretty JSON string.
 */
const Json = (obj) => {
    return JSON.stringify(obj, null, 2);
};

/**
 * Calculates the runtime in HH:MM:SS format.
 * @param {number} seconds - The runtime in seconds.
 * @returns {string} - The formatted runtime.
 */
const runtime = (seconds) => {
    const pad = (s) => (s < 10 ? '0' + s : s);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};

/**
 * Pauses execution for a given number of milliseconds.
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>} - A promise that resolves after the given time.
 */
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Fetches JSON data from a given URL.
 * @param {string} url - The URL to fetch JSON from.
 * @returns {Promise<Object>} - The fetched JSON data.
 */
const fetchJson = async (url) => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error(`Error fetching JSON: ${error}`);
        throw error;
    }
};

module.exports = {
    getBuffer,
    getGroupAdmins,
    getRandom,
    h2k,
    isUrl,
    Json,
    runtime,
    sleep,
    fetchJson,
};
