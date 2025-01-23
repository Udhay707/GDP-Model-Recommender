const axios = require("axios");
const HUGGING_FACE_KEY = process.env.HUGGING_FACE_KEY

const { GoogleGenerativeAI } =  require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const HUGGING_FACE_URL = process.env.HUGGING_FACE_API;


async function chatWithGemini(userRequirement){
    try{
        const tasks = await getHuggingFaceCategories();
        const categories = new Set(tasks);
        const prompt = getPrompt(userRequirement, categories);
        const response = await getGeminiResponse(prompt)
        const category = checkAndGetCategory(response, categories);
        const models = await getHuggingFaceModels(category);
        return {models: models};
    } catch (error) {
        console.error('Error in chatWithGemini:', error);
        throw error;
      } 
}

async function getGeminiResponse(prompt) {
    const result = await model.generateContent(prompt);
    const resultCategory = result.response.candidates[0]?.content?.parts[0]?.text;

    if (!resultCategory) {
        console.error("An error in getting message from Gemini");
        throw new Error("No response received from Gemini");
    }
    return resultCategory;
}

function getPrompt(userRequirement, categories) {
    let prompt = "Help the user to choose the appropriate and most relevant category from Hugging Face Tasks that perfectly suits the user requirements";
    prompt = prompt + "Below are the list of available categories: \n";
    prompt = prompt + categories;
    prompt = prompt + "\nThe user's requirement is given as below \n";
    prompt = prompt + userRequirement;
    prompt = prompt + "Provide only the most suited category as response, don't generate unnecessary explaination";
    return prompt;
}

async function getHuggingFaceCategories() {
    try {
        const response = await axios.get(`${HUGGING_FACE_URL}/tasks`, {
            headers: {
                Authorization: `Bearer ${HUGGING_FACE_KEY}`,
            },
        });
  
        const categories = Object.keys(response.data);
        console.log('Categories:', categories);
        return categories;
    } catch (error) {
        console.error('Error fetching categories:', error.response ? error.response.data : error.message);
    }
}

async function getHuggingFaceModels(category){
    try{

        const response = await axios.get(`${HUGGING_FACE_URL}/models`,{
            params: {
                filter: category,
                sort: "likes",
                limit: 5
            },
            headers: {
                Authorization: `Bearer ${HUGGING_FACE_KEY}`,
            },
        });
        const models = response.data;
        const modelsList = [];
        for(let model of models){
            modelsList.push(model.id);
        }
        return modelsList;

    }catch(error){
        console.error(error);
        throw new Error("An Error while getting the models from hugging face")
    }
}

function checkAndGetCategory(response, categories){
    response = response.toLowerCase().replace(' ', '-');
    for(let category of categories){
        if(response.includes(category))
            return category;
    }
    throw new Error("No matching category found");
}


module.exports=chatWithGemini;
