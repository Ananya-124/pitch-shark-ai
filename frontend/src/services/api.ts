// import axios from "axios";
// import type {
//   AnalyzeRequest,
//   FeedbackRequest,
//   NegotiationRequest,
//   StartupAnalysis,
//   SharkFeedback,
//   NegotiationResponse,
// } from "@/types";

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// const apiClient = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
//   timeout: 60000,
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     console.log(`[PitchPilot] ${config.method?.toUpperCase()} ${config.url}`);
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error("[PitchPilot API Error]", error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// export async function analyzeStartup(
//   data: AnalyzeRequest
// ): Promise<StartupAnalysis> {
//   const response = await apiClient.post<StartupAnalysis>("/analyze", data);
//   return response.data;
// }

// export async function getInvestorFeedback(
//   data: FeedbackRequest
// ): Promise<{ sharks: SharkFeedback[] }> {
//   const response = await apiClient.post<{ sharks: SharkFeedback[] }>(
//     "/investor-feedback",
//     data
//   );
//   return response.data;
// }

// export async function negotiate(
//   data: NegotiationRequest
// ): Promise<NegotiationResponse> {
//   const response = await apiClient.post<NegotiationResponse>(
//     "/negotiation",
//     data
//   );
//   return response.data;
// }

// export async function healthCheck(): Promise<boolean> {
//   try {
//     await apiClient.get("/health");
//     return true;
//   } catch {
//     return false;
//   }
// }

// export default apiClient;


import axios from "axios";

import type {
  AnalyzeRequest,
  FeedbackRequest,
  NegotiationRequest,
  StartupAnalysis,
  SharkFeedback,
  NegotiationResponse,
} from "@/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 60000,
});


// =========================
// REQUEST LOGGER
// =========================

apiClient.interceptors.request.use(
  (config) => {
    console.log(
      `[PitchPilot API] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`
    );

    return config;
  },
  (error) => Promise.reject(error)
);


// =========================
// RESPONSE LOGGER
// =========================

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    console.error(
      "[PitchPilot API Error]",
      error?.response?.data || error.message
    );

    // Better production error messages
    if (error.code === "ECONNABORTED") {
      throw new Error("Request timeout. Server took too long to respond.");
    }

    if (!error.response) {
      throw new Error("Unable to connect to server.");
    }

    throw error;
  }
);


// =========================
// STARTUP ANALYSIS
// =========================

export async function analyzeStartup(
  data: AnalyzeRequest
): Promise<StartupAnalysis> {
  const response =
    await apiClient.post<StartupAnalysis>(
      "/analyze",
      data
    );

  return response.data;
}


// =========================
// INVESTOR FEEDBACK
// =========================

export async function getInvestorFeedback(
  data: FeedbackRequest
): Promise<{ sharks: SharkFeedback[] }> {
  const response =
    await apiClient.post<{ sharks: SharkFeedback[] }>(
      "/investor-feedback",
      data
    );

  return response.data;
}


// =========================
// NEGOTIATION
// =========================

export async function negotiate(
  data: NegotiationRequest
): Promise<NegotiationResponse> {
  const response =
    await apiClient.post<NegotiationResponse>(
      "/negotiation",
      data
    );

  return response.data;
}


// =========================
// HEALTH CHECK
// =========================

export async function healthCheck(): Promise<boolean> {
  try {
    const response = await apiClient.get("/health");

    return response.status === 200;
  } catch (error) {
    console.error("Health check failed:", error);

    return false;
  }
}

export default apiClient;