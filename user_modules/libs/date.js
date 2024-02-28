/**
 * Function to convert a given date from any time zone to Indian Standard Time (IST).
 *
 * @returns {Date} The converted date in Indian Standard Time (IST).
 */
function getISTDate() {
    // e.g. "UTC"
    const timeZoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Create a new Date object with the input date and time zone
    const inputDate = new Date(new Date().toLocaleString('en-US', { timeZoneName: timeZoneName }));

    // Get the UTC time of the input date
    const utcTime = inputDate.getTime() + (inputDate.getTimezoneOffset() * 60000);

    // Define the offset for Indian Standard Time (IST) in milliseconds (UTC+5:30)
    const istOffset = 5.5 * 60 * 60000;

    // Calculate the IST time by adding the IST offset to the UTC time
    const istTime = new Date(utcTime + istOffset);

    // IST date object
    return istTime;
}

module.exports = getISTDate;