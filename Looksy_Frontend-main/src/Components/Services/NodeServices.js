import axios from "axios";

const ServerURL = "http://localhost:8080"; // Spring Boot Backend

const postData = async (url, body, isFile = false) => {
  try {
    let config = {};

    if (isFile) {
      // For file uploads, don't set Content-Type header
      // Let axios set it automatically with boundary for multipart/form-data
      config = {
        headers: {
          // Don't set content-type for multipart, axios will handle it
        },
      };
    } else {
      config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    console.log(`Making POST request to: ${ServerURL}/${url}`);
    console.log("Request body:", isFile ? "FormData (with files)" : body);

    const response = await axios.post(`${ServerURL}/${url}`, body, config);
    console.log("Response received:", response.data);
    return response.data;
  } catch (error) {
    console.error("POST Error Details:", {
      url: `${ServerURL}/${url}`,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });

    // Return more specific error information
    if (error.response?.data) {
      return {
        status: false,
        error:
          error.response.data.error ||
          error.response.data.message ||
          "Server error",
        details: error.response.data,
      };
    }

    return {
      status: false,
      error: error.message || "Network error or server unavailable",
    };
  }
};

const getData = async (url) => {
  try {
    console.log(`Making GET request to: ${ServerURL}/${url}`);
    const response = await fetch(`${ServerURL}/${url}`);

    if (!response.ok) {
      console.error(
        `GET request failed: ${response.status} ${response.statusText}`
      );
      return {
        status: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
      };
    }

    const data = await response.json();
    console.log("GET Response:", data);
    return data;
  } catch (error) {
    console.error("GET Error:", error);
    return { status: false, error: error.message || "Network error" };
  }
};

const getToken = async () => {
  try {
    const response = await fetch(`${ServerURL}/admin/getToken`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const result = await response.json();
    return result.token;
  } catch (error) {
    console.error("getToken Error:", error);
    return null;
  }
};

const isValidAuth = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return { auth: false, message: "No token found" };

    const response = await fetch(`${ServerURL}/admin/isUserAuth`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      return { auth: false, message: `HTTP ${response.status}` };
    }

    return await response.json();
  } catch (error) {
    console.error("Auth check error:", error);
    return { auth: false, message: "Auth check failed" };
  }
};

const clearToken = async () => {
  try {
    const response = await fetch(`${ServerURL}/admin/cleartoken`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("clearToken Error:", error);
    return null;
  }
};

export { ServerURL, postData, getData, isValidAuth, clearToken, getToken };
