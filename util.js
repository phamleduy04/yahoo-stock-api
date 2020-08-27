module.exports = {
    dateToUnix: function(date) {
        if (!date) throw new Error('date is not provided!');
        return Math.round(Date.parse(date) / 1000);
    },
    handleError: function(error) {
        return {
            error: true,
            message: error.message
        }
    },
    handleResponse: function(response, currency) {
        if (!response) throw new Error('Response is not provided');
        return {
            error: false,
            currency: `${currency ? currency : null}`,
            response: response
        }
    }
}