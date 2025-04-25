// src/components/KnowledgeGraph/KnowledgeGraph.tsx
import React, { useCallback, useRef, useState, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { GraphData } from "../../services/api";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Info,
  Share2,
  Download,
  Command,
  User,
  FileText,
  Tag,
} from "lucide-react";

interface KnowledgeGraphProps {
  data: GraphData;
  height?: number;
  interactive?: boolean;
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  data,
  height = 600,
  interactive = true,
}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipContent, setTooltipContent] = useState({ title: "", type: "" });
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [infoOpen, setInfoOpen] = useState(false);
  const graphRef = useRef<any>();

  // Node colors based on type
  const nodeColors = {
    user: {
      base: "#6a3de8",
      hover: "#845ef7",
      border: "#4c22c0",
    },
    document: {
      base: "#9c6dff",
      hover: "#b197fc",
      border: "#7950f2",
    },
    tag: {
      base: "#4dabf7",
      hover: "#74c0fc",
      border: "#228be6",
    },
    default: {
      base: "#a78bfa",
      hover: "#c0a5fa",
      border: "#8b5cf6",
    },
  };

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNodeClick = useCallback(
    (node: any) => {
      if (!interactive) return;

      // Center view on node
      const distance = 40;
      const distRatio = 1 + distance / Math.hypot(node.x, node.y);

      if (graphRef.current) {
        graphRef.current.centerAt(node.x, node.y, 1000);
        graphRef.current.zoom(2, 1000);
      }
    },
    [interactive]
  );

  const handleNodeHover = useCallback(
    (node: any, position: { x: number; y: number }) => {
      if (!interactive) return;

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
    [interactive]
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

  const toggleInfo = () => {
    setInfoOpen(!infoOpen);
  };

  // Get node color based on type
  const getNodeColor = (node: any) => {
    const type = node.type as keyof typeof nodeColors;
    return nodeColors[type]?.base || nodeColors.default.base;
  };

  // Get node border color based on type
  const getNodeBorderColor = (node: any) => {
    const type = node.type as keyof typeof nodeColors;
    return nodeColors[type]?.border || nodeColors.default.border;
  };

  // Custom node painting function
  const paintNode = (
    node: any,
    ctx: CanvasRenderingContext2D,
    globalScale: number
  ) => {
    const label = node.name || node.id;
    const fontSize = 12 / globalScale;
    ctx.font = `${fontSize}px Inter, sans-serif`;

    // Node circle with glow effect
    const r = 5;

    // Glow effect
    const nodeColor = getNodeColor(node);
    ctx.shadowColor = nodeColor;
    ctx.shadowBlur = 15 / globalScale;

    // Main circle
    ctx.beginPath();
    ctx.arc(node.x, node.y, r, 0, 2 * Math.PI);
    ctx.fillStyle = nodeColor;
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Border
    ctx.strokeStyle = getNodeBorderColor(node);
    ctx.lineWidth = 1.5 / globalScale;
    ctx.stroke();

    // Only render labels if zoomed in enough
    if (globalScale >= 0.8) {
      const textWidth = ctx.measureText(label).width;
      const bgPadding = 2;

      // Text background
      ctx.fillStyle = "rgba(26, 26, 38, 0.8)";
      ctx.fillRect(
        node.x - textWidth / 2 - bgPadding,
        node.y + 8,
        textWidth + bgPadding * 2,
        fontSize + bgPadding * 2
      );

      // Text
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#ffffff";
      ctx.fillText(label, node.x, node.y + 8 + fontSize / 2 + bgPadding);

      // Type indicator (small dot)
      const typeColor = getNodeColor(node);
      ctx.beginPath();
      ctx.arc(
        node.x - textWidth / 2 + bgPadding,
        node.y + 8 + (fontSize + bgPadding * 2) / 2,
        2,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = typeColor;
      ctx.fill();
    }
  };

  if (isLoading) {
    return (
      <div className="glass-card-dark min-h-[400px] border border-white/10 rounded-xl overflow-hidden flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-secondary-600/20 border-t-secondary-600 rounded-full animate-spin mb-4"></div>
          <p className="text-white/70">Loading knowledge graph...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card-dark border border-white/10 rounded-xl overflow-hidden relative">
      {/* Graph container */}
      <div style={{ height: `${height}px` }} className="bg-dark-950/70">
        <ForceGraph2D
          ref={graphRef}
          graphData={data}
          nodeLabel={null} // Disable default tooltip
          nodeColor={getNodeColor}
          nodeRelSize={6}
          linkColor={() => "rgba(106, 61, 232, 0.2)"}
          linkWidth={(link: any) => (link.value || 1) * 1.5}
          linkDirectionalParticles={2}
          linkDirectionalParticleWidth={2}
          linkDirectionalParticleSpeed={0.005}
          linkDirectionalParticleColor={() => "#6a3de8"}
          onNodeClick={handleNodeClick}
          onNodeHover={(node: any, position: any) =>
            position && handleNodeHover(node, position)
          }
          cooldownTicks={100}
          onEngineStop={() =>
            interactive && graphRef.current?.zoomToFit(400, 50)
          }
          warmupTicks={100}
          nodeCanvasObject={paintNode}
          backgroundColor="rgba(0,0,0,0)"
        />
      </div>

      {/* Custom tooltip */}
      {tooltipVisible && (
        <div
          className="absolute bg-dark-900/90 backdrop-blur-md border border-white/10 px-3 py-2 rounded-lg text-white text-sm pointer-events-none z-10 shadow-xl transform -translate-x-1/2 -translate-y-full animate-fade-in"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y - 10,
          }}
        >
          <div className="font-medium mb-1">{tooltipContent.title}</div>
          <div className="flex items-center gap-1.5 text-xs text-white/70">
            {tooltipContent.type === "user" && <User size={12} />}
            {tooltipContent.type === "document" && <FileText size={12} />}
            {tooltipContent.type === "tag" && <Tag size={12} />}
            <span>{tooltipContent.type}</span>
          </div>
        </div>
      )}

      {interactive && (
        <>
          {/* Legend - toggleable */}
          <div
            className={`absolute top-4 left-4 bg-dark-900/90 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden transition-all duration-300 ${
              infoOpen ? "opacity-100 max-h-80" : "opacity-0 max-h-0"
            }`}
          >
            <div className="p-3">
              <h3 className="text-white text-sm font-medium mb-2">
                Graph Legend
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: nodeColors.user.base }}
                  ></span>
                  <span className="text-white/80">User</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: nodeColors.document.base }}
                  ></span>
                  <span className="text-white/80">Document</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: nodeColors.tag.base }}
                  ></span>
                  <span className="text-white/80">Tag</span>
                </div>
              </div>
              <hr className="border-white/10 my-2" />
              <div className="text-white/60 text-xs">
                <div className="flex items-center gap-1 mb-1">
                  <Command size={10} />
                  <span>Click on a node to focus</span>
                </div>
                <div className="flex items-center gap-1">
                  <Command size={10} />
                  <span>Hover to see details</span>
                </div>
              </div>
            </div>
          </div>

          {/* Info button - toggles legend */}
          <button
            onClick={toggleInfo}
            className={`absolute top-4 left-4 p-2 rounded-full bg-dark-900/70 backdrop-blur-md border transition-colors z-20 ${
              infoOpen
                ? "border-secondary-600 text-secondary-500"
                : "border-white/10 text-white/70 hover:text-white hover:bg-dark-800/70"
            }`}
            aria-label="Graph information"
          >
            <Info size={18} />
          </button>

          {/* Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-full bg-dark-900/70 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-dark-800/70 transition-colors"
              aria-label="Zoom in"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-full bg-dark-900/70 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-dark-800/70 transition-colors"
              aria-label="Zoom out"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-full bg-dark-900/70 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-dark-800/70 transition-colors"
              aria-label="Reset view"
            >
              <RotateCcw size={18} />
            </button>
          </div>

          {/* Export/Share buttons */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button
              className="p-2 rounded-full bg-dark-900/70 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-dark-800/70 transition-colors"
              aria-label="Share graph"
            >
              <Share2 size={18} />
            </button>
            <button
              className="p-2 rounded-full bg-dark-900/70 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-dark-800/70 transition-colors"
              aria-label="Download graph"
            >
              <Download size={18} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
