import axios from "axios";

export async function findOneQuestion(questionId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/questions/${questionId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch question:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllQuestions() {
  try {
    const response = await axios.get("http://localhost:9999/api/questions/");
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllByQuiz(quizId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/questions/quiz/${quizId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllByRegisterQuiz(registerQuizId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/questions/registerQuiz/${registerQuizId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllByParticipantAttempt(participantAttemptId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/questions/participantAttempt/${participantAttemptId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch questions:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}
