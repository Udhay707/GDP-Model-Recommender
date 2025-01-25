const chatWithGemini = require('../service/chat.service')

const chatController = async (req, res)  => {
    const userMessage = req.body.message;
    if (!userMessage) {
      return res.status(400).json({ error: 'Message is required' });
    }
    try{
        const result = await chatWithGemini(userMessage);
        res.status(200);
        res.json(typeof result === 'object' ? result : {message:result})
    } catch (error) {
      console.error('Error generating response:', error);
      res.status(400);
      res.json({message:error.message})
      res.end();
    }
} 

module.exports = chatController;