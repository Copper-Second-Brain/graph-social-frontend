// src/pages/Home/Home.tsx
import React, { useEffect, useState } from "react";
import { apiService, Document } from "../../services/api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineLink,
  AiOutlineCalendar,
  AiOutlineSearch,
} from "react-icons/ai";

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(106, 61, 232, 0.2);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6d6a7c;
  font-size: 1.25rem;
`;

const DocumentsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

const DocumentCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 8px 30px rgba(106, 61, 232, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(106, 61, 232, 0.15);
  }
`;

const DocumentTitle = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  color: #4a2b9e;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DocumentContent = styled.p`
  color: #6d6a7c;
  margin-bottom: 1rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const DocumentMeta = styled.div`
  display: flex;
  align-items: center;
  margin-top: auto;
  color: #6d6a7c;
  font-size: 0.8rem;
  gap: 1rem;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const Tag = styled.span`
  display: inline-block;
  background: rgba(106, 61, 232, 0.1);
  color: #6a3de8;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
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

const ErrorContainer = styled.div`
  background: rgba(255, 0, 0, 0.1);
  color: #d00;
  padding: 1.5rem;
  border-radius: 8px;
  text-align: center;
  margin: 2rem 0;
  border: 1px solid rgba(255, 0, 0, 0.2);
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(var(--blur-amount));
  border-radius: 16px;
  box-shadow: 0 8px 30px rgba(106, 61, 232, 0.1);
  text-align: center;
`;

const EmptyStateTitle = styled.h3`
  margin: 1rem 0;
  color: #4a2b9e;
`;

const CreateButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, #6a3de8 0%, #9c6dff 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(106, 61, 232, 0.2);
  }
`;

// Function to extract tags from content
const extractTags = (content: string): string[] => {
  // For this demo, we'll extract simple words as tags
  const words = content.split(/\s+/).filter((word) => word.length > 5);
  // Get unique words and limit to 3
  return [...new Set(words)].slice(0, 3);
};

export const Home: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await apiService.getDocuments();
        setDocuments(docs);
        setFilteredDocuments(docs);
      } catch (err) {
        console.error("Error loading documents:", err);
        setError("Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = documents.filter(
        (doc) =>
          doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doc.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredDocuments(filtered);
    } else {
      setFilteredDocuments(documents);
    }
  }, [searchTerm, documents]);

  if (loading) {
    return <LoadingContainer>Loading documents...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  if (filteredDocuments.length === 0 && !searchTerm) {
    return (
      <EmptyStateContainer>
        <AiOutlineLink size={48} color="#6a3de8" />
        <EmptyStateTitle>No documents found</EmptyStateTitle>
        <p>Get started by creating your first document</p>
        <CreateButton to="/create">Create Document</CreateButton>
      </EmptyStateContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader>
        <h1>Knowledge Feed</h1>
        <SearchContainer>
          <SearchIcon>
            <AiOutlineSearch />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
      </PageHeader>

      {filteredDocuments.length === 0 && searchTerm ? (
        <EmptyStateContainer>
          <AiOutlineSearch size={48} color="#6a3de8" />
          <EmptyStateTitle>No results found</EmptyStateTitle>
          <p>Try different keywords or browse all documents</p>
          <button onClick={() => setSearchTerm("")} className="button">
            Clear Search
          </button>
        </EmptyStateContainer>
      ) : (
        <DocumentsGrid>
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id}>
              <DocumentTitle>{doc.title}</DocumentTitle>

              <TagsContainer>
                {extractTags(doc.content).map((tag, index) => (
                  <Tag key={index}>{tag}</Tag>
                ))}
              </TagsContainer>

              <DocumentContent>{doc.content}</DocumentContent>

              <DocumentMeta>
                <MetaItem>
                  <AiOutlineUser />
                  {doc.author_id}
                </MetaItem>

                <MetaItem>
                  <AiOutlineLink />
                  {doc.linkedDocuments?.length || 0} links
                </MetaItem>
              </DocumentMeta>
            </DocumentCard>
          ))}
        </DocumentsGrid>
      )}
    </PageContainer>
  );
};

export default Home;
