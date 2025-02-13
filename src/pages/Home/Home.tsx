// src/pages/Home/Home.tsx
import React, { useEffect, useState } from "react";
import { apiService, Document } from "../../services/api";
import {
  Container,
  DocumentCard,
  DocumentTitle,
  DocumentMeta,
} from "./Home.styles";

export const Home: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await apiService.getDocuments();
        setDocuments(docs);
      } catch (err) {
        console.error("Error loading documents:", err);
        setError("Failed to load documents.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
    console.log(fetchDocuments());
  }, []);

  if (loading) {
    return <div>Loading documents...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      {documents.map((doc) => (
        <DocumentCard key={doc.id}>
          <DocumentTitle>{doc.title}</DocumentTitle>
          <DocumentMeta>
            <span>{doc.author_id}</span>
          </DocumentMeta>
          <p>{doc.content}</p>
        </DocumentCard>
      ))}
    </Container>
  );
};

export default Home;
