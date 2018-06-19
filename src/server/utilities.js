function validateDateString(dateString) {
    const date = new Date(dateString);

    return date instanceof Date && !isNaN(date);
}

module.exports = {
    validateDateString: validateDateString
}