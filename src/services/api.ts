// src/services/api.ts
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

export interface Document {
  id: string;
  title: string;
  content: string;
  author_id: string;
  linkedDocuments?: string[];
}

export interface GraphData {
  nodes: Array<{
    id: string;
    name: string;
  }>;
  links: Array<{
    source: string;
    target: string;
    value: number;
  }>;
}

export interface UserRecommendation {
  user_id: string;
  similarity_score: number;
  shared_topics: string[];
}

class ApiService {
  async createDocument(document: Omit<Document, "id">): Promise<string> {
    const response = await axios.post(`${API_BASE_URL}/documents`, document);
    return response.data.document_id;
  }

  async getUserRecommendations(userId: string): Promise<UserRecommendation[]> {
    const response = await axios.get(
      `${API_BASE_URL}/users/${userId}/recommendations`
    );
    return response.data;
  }

  async getUserGraph(userId: string): Promise<GraphData> {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/graph`);
    console.log("Fetching garph data");
    console.log(response.data);
    console.log("Fetched Succesfully");
    return response.data;
  }
  // New function to load documents from the backend.
  async getDocuments(): Promise<Document[]> {
    const response = await axios.get(`${API_BASE_URL}/documents`);
    // Assuming the backend returns an object like: { documents: Document[] }
    return response.data.documents;
  }
}

export const apiService = new ApiService();
