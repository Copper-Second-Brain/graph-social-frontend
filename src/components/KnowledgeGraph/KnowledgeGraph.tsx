// src/components/KnowledgeGraph/KnowledgeGraph.tsx
import React, { useCallback, useRef, useState, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import styled from "styled-components";
import { GraphData } from "../../services/api";

interface KnowledgeGraphProps {
  data: GraphData;
}

const GraphContainer = styled.div`
  width: 100%;
  height: 600px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(106, 61, 232, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  position: relative;
`;

const NodeTooltip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(106, 61, 232, 0.2);
  font-size: 0.875rem;
  color: #4a2b9e;
  pointer-events: none;
  transform: translate(-50%, -100%);
  margin-top: -10px;
  z-index: 10;
  min-width: 150px;
  opacity: 0;
  transition: opacity 0.2s ease;

  &.visible {
    opacity: 1;
  }
`;

const GraphControls = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
  z-index: 5;
`;

const GraphButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(var(--blur-amount));
  border: 1px solid rgba(106, 61, 232, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #6a3de8;
  transition: all 0.2s ease;
  box-shadow: 0 2px 10px rgba(106, 61, 232, 0.1);

  &:hover {
    background: rgba(106, 61, 232, 0.1);
    transform: translateY(-2px);
  }
`;

const GraphLegend = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(var(--blur-amount));
  -webkit-backdrop-filter: blur(var(--blur-amount));
  border-radius: 8px;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #4a2b9e;
  box-shadow: 0 2px 10px rgba(106, 61, 232, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.4);
  z-index: 5;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({ data }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({ title: "", type: "" });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const graphRef = useRef<any>();

  // Node colors
  const nodeColors = {
    user: "#6a3de8",
    document: "#9c6dff",
  };

  const handleNodeClick = useCallback((node: any) => {
    // Center view on node
    const distance = 40;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y);

    if (graphRef.current) {
      graphRef.current.centerAt(node.x, node.y, 1000);
      graphRef.current.zoom(2, 1000);
    }
  }, []);

  const handleNodeHover = useCallback(
    (node: any, position: { x: number; y: number }) => {
      if (node) {
        setTooltipContent({
          title: node.name || node.id,
          type: node.type || "Unknown",
        });
        setTooltipPosition({ x: position.x, y: position.y });
        setTooltipVisible(true);
      } else {
        setTooltipVisible(false);
      }
    },
    []
  );

  const handleZoomIn = () => {
    if (graphRef.current) {
      graphRef.current.zoom(graphRef.current.zoom() * 1.2, 400);
    }
  };

  const handleZoomOut = () => {
    if (graphRef.current) {
      graphRef.current.zoom(graphRef.current.zoom() / 1.2, 400);
    }
  };

  const handleReset = () => {
    if (graphRef.current) {
      graphRef.current.centerAt(0, 0, 1000);
      graphRef.current.zoom(1, 1000);
    }
  };

  useEffect(() => {
    if (graphRef.current && data.nodes.length > 0) {
      // Add slight repulsion for better visualization
      setTimeout(() => {
        graphRef.current.d3Force("charge").strength(-100);
      }, 100);
    }
  }, [data]);

  return (
    <GraphContainer>
      <ForceGraph2D
        ref={graphRef}
        graphData={data}
        nodeLabel={null} // Disable default tooltip
        nodeColor={(node: any) =>
          nodeColors[node.type as keyof typeof nodeColors] || "#a78bfa"
        }
        nodeRelSize={6}
        linkColor={() => "rgba(106, 61, 232, 0.2)"}
        linkWidth={(link: any) => link.value * 2}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.005}
        linkDirectionalParticleColor={() => "#6a3de8"}
        onNodeClick={handleNodeClick}
        onNodeHover={(node: any, position: any) =>
          position && handleNodeHover(node, position)
        }
        cooldownTicks={100}
        onEngineStop={() => graphRef.current?.zoomToFit(400, 50)}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name || node.id;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Inter`;

          // Node circle
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI);
          ctx.fillStyle =
            nodeColors[node.type as keyof typeof nodeColors] || "#a78bfa";
          ctx.fill();

          ctx.strokeStyle = "white";
          ctx.lineWidth = 1.5 / globalScale;
          ctx.stroke();

          // Only render labels if zoomed in enough
          if (globalScale >= 0.8) {
            const textWidth = ctx.measureText(label).width;
            const bgPadding = 2;

            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.fillRect(
              node.x - textWidth / 2 - bgPadding,
              node.y + 8,
              textWidth + bgPadding * 2,
              fontSize + bgPadding * 2
            );

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "#4a2b9e";
            ctx.fillText(label, node.x, node.y + 8 + fontSize / 2 + bgPadding);
          }
        }}
      />

      <NodeTooltip
        className={tooltipVisible ? "visible" : ""}
        style={{
          transform: `translate(${tooltipPosition.x}px, ${
            tooltipPosition.y - 20
          }px)`,
        }}
      >
        <div style={{ fontWeight: 600 }}>{tooltipContent.title}</div>
        <div>Type: {tooltipContent.type}</div>
      </NodeTooltip>

      <GraphLegend>
        <LegendItem>
          <LegendColor color={nodeColors.user} />
          <span>User</span>
        </LegendItem>
        <LegendItem>
          <LegendColor color={nodeColors.document} />
          <span>Document</span>
        </LegendItem>
      </GraphLegend>

      <GraphControls>
        <GraphButton onClick={handleZoomIn}>+</GraphButton>
        <GraphButton onClick={handleZoomOut}>-</GraphButton>
        <GraphButton onClick={handleReset}>⟲</GraphButton>
      </GraphControls>
    </GraphContainer>
  );
};
