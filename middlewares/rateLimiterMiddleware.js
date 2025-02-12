const rateLimit = require('express-rate-limit');

class rateLimiter  {
    BookingLimiter(){
    return rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            max: 10, // limit each IP to 10 requests per windowMs
            message: {
                status: 429,
                error: 'Too many requests. Please try again after 15 minutes.',
            },
          });
    } 

}

module.exports = new rateLimiter();