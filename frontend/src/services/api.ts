import axios from "axios";
import type {
  AnalyzeRequest,
  FeedbackRequest,
  NegotiationRequest,
  StartupAnalysis,
  SharkFeedback,
  NegotiationResponse,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 60000,
});

apiClient.interceptors.request.use(
  (config) => {
    console.log(`[PitchPilot] ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[PitchPilot API Error]", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export async function analyzeStartup(
  data: AnalyzeRequest
): Promise<StartupAnalysis> {
  const response = await apiClient.post<StartupAnalysis>("/analyze", data);
  return response.data;
}

export async function getInvestorFeedback(
  data: FeedbackRequest
): Promise<{ sharks: SharkFeedback[] }> {
  const response = await apiClient.post<{ sharks: SharkFeedback[] }>(
    "/investor-feedback",
    data
  );
  return response.data;
}

export async function negotiate(
  data: NegotiationRequest
): Promise<NegotiationResponse> {
  const response = await apiClient.post<NegotiationResponse>(
    "/negotiation",
    data
  );
  return response.data;
}

export async function healthCheck(): Promise<boolean> {
  try {
    await apiClient.get("/health");
    return true;
  } catch {
    return false;
  }
}

export default apiClient;