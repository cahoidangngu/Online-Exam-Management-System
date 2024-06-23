import axios from "axios";

export async function saveQuiz(quiz) {
  try {
    console.log(quiz);
    const response = await axios.post(
      "http://localhost:9999/api/quizzes",
      quiz
    );
    return response; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to save quiz:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findOneQuiz(quizId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/quizzes/${quizId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch quizzes:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllQuizzes() {
  try {
    const response = await axios.get("http://localhost:9999/api/quizzes/");
    console.log(response);
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch quizzes:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function findAllByHostId(hostId) {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/quizzes/host/${hostId}`
    );
    return response.data; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to fetch quizzes:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}

export async function deleteQuiz(quizId) {
  try {
    const response = await axios.delete(
      `http://localhost:9999/api/quizzes/${quizId}`
    );
    return response; // Axios automatically handles JSON parsing
  } catch (error) {
    console.error("Failed to delete quiz:", error);
    // Handle errors, such as by returning an empty array or a specific error message
    return []; // or throw error;
  }
}
