const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const winston = require('winston');

app.use(express.json());
app.use(cors());

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});


const validateNumbers = (num1, num2, allowZeroInSecond = true) => {
    if (num1 === '' || num2 === '' || num1 == null || num2 == null) {
        return "One or both of the numbers is missing or empty.";
    }
    if (isNaN(num1) || isNaN(num2)) {
        return 'One or both inputs are not valid numbers.';
    }
    if (!allowZeroInSecond && parseFloat(num2) === 0) {
        return 'The second number can not be zero.';
    }
    return false;
};

const validateSquareRootNumber = (num1) => {
    if (num1 === '' || num1 == null ) {
        return "The number is missing or empty.";
    }
    if (isNaN(num1)) {
        return 'The input is not a valid number.';
    }
    if (parseFloat(num1) < 0) {
        return 'Square root of a negative number is not defined in real numbers.';
    }
    return false;
};

app.post('/addition', (req, res) => {
    try {
        const { num1, num2 } = req.body;
        logger.info(`Addition request: ${num1}, ${num2}`);
        const error = validateNumbers(num1, num2);
        if (error) {
            return res.status(400).json({ error });
        }
        let result = parseFloat(num1) + parseFloat(num2);
        res.json({ result });
    } catch (e) {
        logger.error(`Error processing addition: ${e.message}`);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

app.post('/subtraction', (req, res) => {
    try {
        const { num1, num2 } = req.body;
        logger.info(`Subtraction request: ${num1}, ${num2}`);
        const error = validateNumbers(num1, num2);
        if (error) {
            return res.status(400).json({ error });
        }
        let result = parseFloat(num1) - parseFloat(num2);
        res.json({ result });
    } catch (e) {
        logger.error(`Error processing addition: ${e.message}`);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

app.post('/multiplication', (req, res) => {
    try {
        const { num1, num2 } = req.body;
        logger.info(`Multiplication request: ${num1}, ${num2}`);
        const error = validateNumbers(num1, num2);
        if (error) {
            return res.status(400).json({ error });
        }
        let result = parseFloat(num1) * parseFloat(num2);
        res.json({ result });
    } catch (e) {
        logger.error(`Error processing addition: ${e.message}`);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

app.post('/division', (req, res) => {
    try {
        const { num1, num2 } = req.body;
        logger.info(`Division request: ${num1}, ${num2}`);
        const error = validateNumbers(num1, num2, false);
        if (error) {
            return res.status(400).json({ error });
        }
        let result = parseFloat(num1) / parseFloat(num2);
        res.json({ result });
    } catch (e) {
        logger.error(`Error processing addition: ${e.message}`);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

app.post('/exponentiation', (req, res) => {
    try {
        const { num1, num2 } = req.body;
        logger.info(`Exponentiation request: ${num1}, ${num2}`);
        const error = validateNumbers(num1, num2);
        if (error) {
            return res.status(400).json({ error });
        }
        let result = Math.pow(parseFloat(num1), parseFloat(num2));
        res.json({ result });
    } catch (e) {
        logger.error(`Error processing addition: ${e.message}`);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

app.post('/squareroot', (req, res) => {
    try {
        const { num1 } = req.body;
        logger.info(`Squareroot request: ${num1}`);
        const error = validateSquareRootNumber(num1); 
        if (error) {
            return res.status(400).json({ error });
        }
        let result = Math.sqrt(parseFloat(num1));
        res.json({ result });
    } catch (e) {
        logger.error(`Error processing addition: ${e.message}`);
        res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});

app.post('/modulo', (req, res) => {
    try {
        const { num1, num2 } = req.body;
        logger.info(`Modulo request: ${num1}, ${num2}`);
        const error = validateNumbers(num1, num2, false);
        if (error) {
            return res.status(400).json({ error });
        }
        let result = parseFloat(num1) % parseFloat(num2);
        res.json({ result });
    } catch (e) {
        logger.error(`Error processing addition: ${e.message}`);
        res.status(500).json({error: 'An unexpected error occurred.' });

    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
