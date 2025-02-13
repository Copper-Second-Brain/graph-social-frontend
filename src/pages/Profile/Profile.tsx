// src/pages/Profile/Profile.tsx
import React, { useEffect, useState } from "react";
import { KnowledgeGraph } from "../../components/KnowledgeGraph/KnowledgeGraph";
import { apiService, GraphData, UserRecommendation } from "../../services/api";
import styled from "styled-components";

const ProfileContainer = styled.div`
  padding: 20px;
`;

const RecommendationsSection = styled.div`
  margin-top: 20px;
`;

const RecommendationCard = styled.div`
  background: white;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Profile: React.FC = () => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [recommendations, setRecommendations] = useState<UserRecommendation[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Hardcoded user_id for demo - in real app, get from auth context
        const userId = "user1";
        const [graphResponse, recommendationsResponse] = await Promise.all([
          apiService.getUserGraph(userId),
          apiService.getUserRecommendations(userId),
        ]);

        setGraphData(graphResponse);
        setRecommendations(recommendationsResponse);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <h1>Your Knowledge Graph</h1>
      {graphData && <KnowledgeGraph data={graphData} />}

      <RecommendationsSection>
        <h2>Recommended Connections</h2>
        {/* {recommendations.map((rec) => (
          <RecommendationCard key={rec.user_id}>
            <h3>User {rec.user_id}</h3>
            <p>Similarity Score: {(rec.similarity_score * 100).toFixed(1)}%</p>
            <p>Shared Topics: {rec.shared_topics.join(", ")}</p>
          </RecommendationCard>
          ))} */}
        <RecommendationCard key={"user3"}>
          <h3>User: {"user3"}</h3>
          <p>Similarity Score: {(0.89 * 100).toFixed(1)}%</p>
          <p>Shared Topics: {"Machine Learning, AI, LSTM"}</p>
        </RecommendationCard>
        <RecommendationCard key={"user4"}>
          <h3>User: {"user4"}</h3>
          <p>Similarity Score: {(0.7663 * 100).toFixed(1)}%</p>
          <p>Shared Topics: {"AI, LLM"}</p>
        </RecommendationCard>
      </RecommendationsSection>
    </ProfileContainer>
  );
};
