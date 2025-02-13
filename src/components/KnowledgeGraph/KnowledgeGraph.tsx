// src/components/KnowledgeGraph/KnowledgeGraph.tsx
import React, { useCallback } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { GraphContainer } from "./KnowledgeGraph.styles";
import { GraphData } from "../../services/api";

interface KnowledgeGraphProps {
  data: GraphData;
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ data }) => {
  const handleNodeClick = useCallback((node: any) => {
    console.log("Clicked node:", node);
    // Add node click handling logic here
  }, []);

  const handleLinkClick = useCallback((link: any) => {
    console.log("Clicked link:", link);
    // Add link click handling logic here
  }, []);

  return (
    <GraphContainer>
      <ForceGraph2D
        graphData={data}
        nodeLabel="title"
        nodeAutoColorBy="group"
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkWidth={(link: any) => link.value}
        onNodeClick={handleNodeClick}
        onLinkClick={handleLinkClick}
      />
    </GraphContainer>
  );
};
