// src/pages/Profile/Profile.tsx
import React, { useEffect, useState } from "react";
import { KnowledgeGraph } from "../../components/KnowledgeGraph/KnowledgeGraph";
import { apiService, GraphData, UserRecommendation } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import styled from "styled-components";
import {
  AiOutlineUser,
  AiOutlineNodeIndex,
  AiOutlineTeam,
  AiOutlineLink,
  AiOutlineEdit,
} from "react-icons/ai";

const ProfileContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ProfileHeader = styled.div`
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(106, 61, 232, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ProfileAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6a3de8 0%, #9c6dff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 2.5rem;
  box-shadow: 0 8px 25px rgba(106, 61, 232, 0.25);
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h1`
  margin-bottom: 0.5rem;
`;

const ProfileStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #6d6a7c;

  svg {
    color: #6a3de8;
  }
`;

const SectionTitle = styled.h2`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: #6a3de8;
  }
`;

const Section = styled.div`
  margin-bottom: 3rem;
`;

const RecommendationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

const RecommendationCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 30px rgba(106, 61, 232, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(106, 61, 232, 0.15);
  }
`;

const UserAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6a3de8 0%, #9c6dff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  margin-bottom: 1rem;
`;

const SimilarityScore = styled.div<{ score: number }>`
  height: 8px;
  background: #e0d8ff;
  border-radius: 4px;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${(props) => props.score * 100}%;
    background: linear-gradient(90deg, #6a3de8 0%, #9c6dff 100%);
    border-radius: 4px;
  }
`;

const SharedTopics = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Topic = styled.div`
  background: rgba(106, 61, 232, 0.1);
  color: #6a3de8;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: #6a3de8;
  font-size: 1.25rem;
  font-weight: 500;
`;

const GraphContainer = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(106, 61, 232, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
`;

const ConnectButton = styled.button`
  background: linear-gradient(90deg, #6a3de8 0%, #9c6dff 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(106, 61, 232, 0.2);
  }
`;

export const Profile: React.FC = () => {
  const { currentUser } = useAuth();
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [recommendations, setRecommendations] = useState<UserRecommendation[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [documentCount, setDocumentCount] = useState(0);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Use currentUser.id if available, otherwise fallback to "user1" for demo
        const userId = currentUser?.id || "user1";

        const [graphResponse, recommendationsResponse, documents] =
          await Promise.all([
            apiService.getUserGraph(userId),
            apiService.getUserRecommendations(userId),
            apiService.getDocuments(),
          ]);

        setGraphData(graphResponse);
        setRecommendations(recommendationsResponse);

        // Count documents authored by the current user
        const userDocs = documents.filter((doc) => doc.author_id === userId);
        setDocumentCount(userDocs.length);
      } catch (error) {
        console.error("Error fetching profile data:", error);
        alert("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [currentUser]);

  // For demo purposes: if API returns no recommendations, use mock data
  useEffect(() => {
    if (!loading && recommendations.length === 0) {
      // Mock recommendation data
      setRecommendations([
        {
          user_id: "user3",
          similarity_score: 0.89,
          shared_topics: ["Machine Learning", "AI", "LSTM"],
        },
        {
          user_id: "user4",
          similarity_score: 0.76,
          shared_topics: ["AI", "LLM", "NLP"],
        },
        {
          user_id: "user2",
          similarity_score: 0.68,
          shared_topics: ["Data Visualization", "Data Science"],
        },
      ]);
    }
  }, [loading, recommendations]);

  if (loading) {
    return <LoadingContainer>Loading profile data...</LoadingContainer>;
  }

  // Get the current user's initials for avatar
  const userInitial = currentUser?.username.charAt(0).toUpperCase() || "U";

  return (
    <ProfileContainer>
      <ProfileHeader>
        <ProfileAvatar>{userInitial}</ProfileAvatar>
        <ProfileInfo>
          <UserName>{currentUser?.username || "User"}</UserName>
          <div style={{ color: "#6d6a7c" }}>
            {currentUser?.email || "user@example.com"}
          </div>

          <ProfileStats>
            <StatItem>
              <AiOutlineNodeIndex />
              <span>{documentCount} Documents</span>
            </StatItem>
            <StatItem>
              <AiOutlineTeam />
              <span>{recommendations.length} Connections</span>
            </StatItem>
            <StatItem>
              <AiOutlineLink />
              <span>{graphData?.links.length || 0} Links</span>
            </StatItem>
          </ProfileStats>
        </ProfileInfo>
      </ProfileHeader>

      <Section>
        <SectionTitle>
          <AiOutlineNodeIndex />
          Your Knowledge Graph
        </SectionTitle>
        <p style={{ marginBottom: "1.5rem", color: "#6d6a7c" }}>
          Visualize how your knowledge connects with others in the network.
        </p>
        {graphData && <KnowledgeGraph data={graphData} />}
      </Section>

      <Section>
        <SectionTitle>
          <AiOutlineTeam />
          Recommended Connections
        </SectionTitle>
        <p style={{ marginBottom: "1rem", color: "#6d6a7c" }}>
          Connect with others who share similar knowledge interests.
        </p>

        <RecommendationsGrid>
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.user_id}>
              <UserAvatar>{rec.user_id.charAt(0).toUpperCase()}</UserAvatar>
              <UserInfo>
                <h3 style={{ color: "#4a2b9e" }}>User: {rec.user_id}</h3>
                <div
                  style={{
                    fontSize: "0.875rem",
                    color: "#6d6a7c",
                    marginTop: "0.25rem",
                  }}
                >
                  Similarity Score: {(rec.similarity_score * 100).toFixed(0)}%
                </div>
                <SimilarityScore score={rec.similarity_score} />
              </UserInfo>

              <div
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#4a2b9e",
                }}
              >
                Shared Topics:
              </div>
              <SharedTopics>
                {rec.shared_topics.map((topic, idx) => (
                  <Topic key={idx}>{topic}</Topic>
                ))}
              </SharedTopics>

              <ConnectButton>
                <AiOutlineLink />
                Connect
              </ConnectButton>
            </RecommendationCard>
          ))}
        </RecommendationsGrid>
      </Section>
    </ProfileContainer>
  );
};
