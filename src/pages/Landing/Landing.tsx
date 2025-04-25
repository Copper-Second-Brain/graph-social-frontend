// src/pages/Landing/Landing.tsx
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LandingContainer = styled.div`
  min-height: 100vh;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 8rem 2rem 4rem;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(
      circle at center,
      rgba(106, 61, 232, 0.1) 0%,
      rgba(0, 0, 0, 0) 70%
    );
    z-index: -1;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  max-width: 800px;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  max-width: 600px;
  color: #6d6a7c;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ButtonPrimary = styled(Link)`
  background: linear-gradient(90deg, #6a3de8 0%, #9c6dff 100%);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(106, 61, 232, 0.2);
  }
`;

const ButtonSecondary = styled(Link)`
  background: rgba(106, 61, 232, 0.1);
  color: #6a3de8;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;

  &:hover {
    background: rgba(106, 61, 232, 0.2);
    transform: translateY(-3px);
  }
`;

const FeatureSection = styled.section`
  padding: 4rem 2rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background: var(--card-background);
  backdrop-filter: blur(var(--blur-amount));
  border-radius: 16px;
  padding: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 8px 30px rgba(106, 61, 232, 0.1);

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(106, 61, 232, 0.15);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #6a3de8 0%, #9c6dff 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  font-size: 24px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #4a2b9e;
`;

const GraphSection = styled.section`
  padding: 4rem 2rem;
  background: rgba(246, 242, 255, 0.7);
  text-align: center;
`;

const GraphImageContainer = styled.div`
  max-width: 1000px;
  margin: 3rem auto;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(106, 61, 232, 0.15);
`;

const GraphImage = styled.div`
  background: linear-gradient(135deg, #6a3de8 10%, #9c6dff 90%);
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

const CTASection = styled.section`
  padding: 6rem 2rem;
  text-align: center;
`;

const GradientCircle = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  z-index: -1;
`;

const TopRightCircle = styled(GradientCircle)`
  top: -100px;
  right: -100px;
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(156, 109, 255, 0.3) 0%,
    rgba(156, 109, 255, 0) 70%
  );
`;

const BottomLeftCircle = styled(GradientCircle)`
  bottom: -100px;
  left: -100px;
  width: 350px;
  height: 350px;
  background: radial-gradient(
    circle,
    rgba(106, 61, 232, 0.3) 0%,
    rgba(106, 61, 232, 0) 70%
  );
`;

export const Landing: React.FC = () => {
  return (
    <LandingContainer>
      <div className="gradient-bg"></div>
      <TopRightCircle />
      <BottomLeftCircle />

      <HeroSection>
        <HeroTitle>Connect Knowledge, Discover Insights</HeroTitle>
        <HeroSubtitle>
          A new way to share and discover knowledge through intelligent graph
          connections
        </HeroSubtitle>
        <ButtonGroup>
          <ButtonPrimary to="/login">Get Started</ButtonPrimary>
          <ButtonSecondary to="/about">Learn More</ButtonSecondary>
        </ButtonGroup>
      </HeroSection>

      <FeatureSection>
        <div className="container">
          <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>
            Key Features
          </h2>
          <FeatureGrid>
            <FeatureCard>
              <FeatureIcon>📊</FeatureIcon>
              <FeatureTitle>Knowledge Graph Visualization</FeatureTitle>
              <p>
                Visualize your knowledge connections and see how ideas relate to
                each other through interactive graphs.
              </p>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🧠</FeatureIcon>
              <FeatureTitle>Smart Recommendations</FeatureTitle>
              <p>
                Discover relevant content and connect with like-minded users
                through our advanced recommendation engine.
              </p>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🔗</FeatureIcon>
              <FeatureTitle>Automatic Connections</FeatureTitle>
              <p>
                Our system automatically identifies and creates connections
                between similar documents and topics.
              </p>
            </FeatureCard>

            <FeatureCard>
              <FeatureIcon>🔍</FeatureIcon>
              <FeatureTitle>Semantic Search</FeatureTitle>
              <p>
                Find information based on meaning, not just keywords, with our
                advanced retrieval system.
              </p>
            </FeatureCard>
          </FeatureGrid>
        </div>
      </FeatureSection>

      <GraphSection>
        <div className="container">
          <h2>Our Knowledge Graph Model</h2>
          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto 2rem",
              color: "#6d6a7c",
            }}
          >
            Based on advanced graph theory and embedding techniques, our system
            creates meaningful connections between documents and users.
          </p>

          <GraphImageContainer>
            <GraphImage>Interactive Knowledge Graph Visualization</GraphImage>
          </GraphImageContainer>

          <div
            style={{
              maxWidth: "800px",
              margin: "2rem auto",
              textAlign: "left",
            }}
          >
            <h3 style={{ marginBottom: "1rem" }}>How It Works</h3>
            <p style={{ marginBottom: "1rem", color: "#6d6a7c" }}>
              Our system uses a specialized GCN (Graph Convolutional Network) to
              analyze the relationships between documents and users, creating a
              rich knowledge graph.
            </p>
            <p style={{ color: "#6d6a7c" }}>
              By analyzing both content similarity and user interactions, we
              build a network that makes discovering valuable connections
              intuitive and efficient.
            </p>
          </div>
        </div>
      </GraphSection>

      <CTASection>
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p
            style={{
              maxWidth: "600px",
              margin: "1rem auto 2rem",
              color: "#6d6a7c",
            }}
          >
            Join our knowledge-sharing community and start discovering
            meaningful connections today.
          </p>
          <ButtonPrimary to="/login" style={{ padding: "1rem 3rem" }}>
            Sign Up Now
          </ButtonPrimary>
        </div>
      </CTASection>
    </LandingContainer>
  );
};

export default Landing;
