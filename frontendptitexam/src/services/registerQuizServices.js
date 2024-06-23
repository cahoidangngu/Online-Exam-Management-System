import axios from "axios";

export async function saveRegisterQuiz(registerQuiz) {
  try {
    const response = await axios.post(
      "http://localhost:9999/api/registerQuizzes",
      registerQuiz
    );
    return response; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to save register quiz:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findOneRegisterQuiz(registerQuizId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/registerQuizzes/${registerQuizId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch register quiz:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllRegisterQuizzes() {
  try {
    const response = await axios.get(
      "http://localhost:9999/api/registerQuizzes/"
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch register quizzes:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllByQuiz(quizId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/registerQuizzes/quiz/${quizId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch register quizzes:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllByUser(userId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/registerQuizzes/user/${userId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch register quizzes:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllByStatus(status) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/registerQuizzes/status/${status}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch register quizzes:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}
