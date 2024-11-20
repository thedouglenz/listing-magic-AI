import OpenAI from 'openai';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/description', async (req, res) => {
    try {
        const input = JSON.stringify(req.body.input);
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a real estate agent. Write a compelling real estate property description that highlights the features, benefits, and lifestyle offered by the property. Use a professional, engaging tone designed to attract potential buyers. Include details about the location, key amenities, unique features of the property, and any recent upgrades or renovations. Only use information provided in the input. Ensure the description is no longer than 1000 characters and avoids overly technical jargon. Information about the property will be provided in JSON format',
                },
                {
                    role: 'user',
                    content: input,
                },
            ],
        });
        const description = completion.choices[0].message.content;
        res.json({ description });
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});