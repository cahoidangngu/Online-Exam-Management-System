import axios from "axios";

export async function saveParticipantAttempt(participantAttempt) {
  try {
    const response = await axios.post(
      "http://localhost:9999/api/participantAttempts",
      participantAttempt
    );
    return response; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to save participant attempt:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findOneParticipantAttempt(participantAttemptId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/participantAttempts/${participantAttemptId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch participant attempt:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllParticipantAttempts() {
  try {
    const response = await axios.get(
      "http://localhost:9999/api/participantAttempts/"
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch participant attempts:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllByRegisterQuiz(registerQuizId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/participantAttempts/registerQuiz/${registerQuizId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch participant attempts:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllByQuiz(quizId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/participantAttempts/quiz/${quizId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch participant attempts:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllByUser(userId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/participantAttempts/user/${userId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch participant attempts:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllByUserAndQuiz(userId, quizId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/participantAttempts/user_quiz/${userId}/${quizId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch participant attempts:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}
