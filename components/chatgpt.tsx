const API_URL = `sk-proj-4WNy22TVSpS01EFLJG6oT3BlbkFJZe3aPBBU5iPRvtBf8tat`; // Replace with your ChatGPT API endpoint

export const createChatGPTRequest = async (userInput: any) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add any necessary authentication headers here
      },
      body: JSON.stringify({ input: userInput }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch response from ChatGPT');
    }

    const data = await response.json();
    return data.output; // Assuming the API response contains an 'output' field with the bot's response
  } catch (error) {
    throw new Error('Error communicating with ChatGPT API');
  }
};
