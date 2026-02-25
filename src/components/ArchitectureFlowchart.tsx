"use client";

import React, { useMemo, useCallback } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap,
  Node,
  Edge,
  Handle,
  Position,
  BackgroundVariant,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  useReactFlow,
  ReactFlowProvider
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Database, Server, Globe, ArrowRight, Zap, Shield, Smartphone, ArrowLeft, Play, Settings, HelpCircle, CheckCircle } from 'lucide-react';

// --- ASTRA GLASSMORPHIC CUSTOM NODES ---

const GlassNode = ({ 
  data, 
  icon: Icon, 
  colorClass, 
  glowClass 
}: { 
  data: any, 
  icon: any, 
  colorClass: string, 
  glowClass: string 
}) => {
  return (
    <div className={`
      relative group rounded-2xl w-64 p-5 
      bg-black/40 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.6)]
      hover:border-white/[0.2] transition-colors
    `}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white/20 border-2 border-black" />
      
      {/* Ambient Inner Glow */}
      <div className={`absolute -inset-1 ${glowClass} blur-xl opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none rounded-3xl`} />
      
      <div className="flex items-start gap-4 relative z-10">
        <div className={`w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center shrink-0 border border-white/[0.1] ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white/90 mb-1">{data.label}</h4>
          <p className="text-[11px] text-white/40 leading-relaxed">{data.description}</p>
        </div>
      </div>
      
      {data.status && (
        <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Status</span>
          <span className={`text-[10px] font-mono flex items-center gap-1 ${data.statusColor}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${data.statusBgColor} animate-pulse`} />
            {data.status}
          </span>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-white/20 border-2 border-black" />
    </div>
  );
};

// Node Definitions using the wrapper
const StartNode = ({ data }: { data: any }) => <GlassNode data={data} icon={Play} colorClass="text-emerald-400" glowClass="bg-emerald-500" />;
const ProcessNode = ({ data }: { data: any }) => <GlassNode data={data} icon={Settings} colorClass="text-blue-400" glowClass="bg-blue-500" />;
const DecisionNode = ({ data }: { data: any }) => <GlassNode data={data} icon={HelpCircle} colorClass="text-amber-400" glowClass="bg-amber-500" />;
const EndNode = ({ data }: { data: any }) => <GlassNode data={data} icon={CheckCircle} colorClass="text-purple-400" glowClass="bg-purple-500" />;

// --- INITIAL GRAPH DATA ---

const initialNodes: Node[] = [
  {
    id: 'start',
    type: 'startNode',
    position: { x: 250, y: 0 },
    data: { 
      label: 'Project Initialization', 
      description: 'Kickoff meeting and requirements gathering phase.',
      status: 'Completed',
      statusColor: 'text-emerald-400',
      statusBgColor: 'bg-emerald-400'
    },
  },
  {
    id: 'process-1',
    type: 'processNode',
    position: { x: 250, y: 200 },
    data: { 
      label: 'Design & Prototyping', 
      description: 'Creating high-fidelity wireframes and UX flows.',
      status: 'In Progress',
      statusColor: 'text-blue-400',
      statusBgColor: 'bg-blue-400'
    },
  },
  {
    id: 'decision-1',
    type: 'decisionNode',
    position: { x: 250, y: 400 },
    data: { 
      label: 'Client Approval?', 
      description: 'Review cycle with stakeholders for design sign-off.',
      status: 'Pending',
      statusColor: 'text-amber-400',
      statusBgColor: 'bg-amber-400'
    },
  },
  {
    id: 'process-2',
    type: 'processNode',
    position: { x: 50, y: 600 },
    data: { 
      label: 'Revisions', 
      description: 'Iterating on feedback and adjusting prototypes.',
      status: 'Waiting',
      statusColor: 'text-amber-400',
      statusBgColor: 'bg-amber-400'
    },
  },
  {
    id: 'end-1',
    type: 'endNode',
    position: { x: 450, y: 600 },
    data: { 
      label: 'Development Handover', 
      description: 'Assets prepared and tasks assigned to engineering.',
      status: 'Not Started',
      statusColor: 'text-white/40',
      statusBgColor: 'bg-white/40'
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e-start-proc1', source: 'start', target: 'process-1', animated: true, style: { stroke: 'rgba(52,211,153,0.5)', strokeWidth: 2 } },
  { id: 'e-proc1-dec1', source: 'process-1', target: 'decision-1', animated: true, style: { stroke: 'rgba(59,130,246,0.5)', strokeWidth: 2 } },
  { id: 'e-dec1-proc2', source: 'decision-1', target: 'process-2', style: { stroke: 'rgba(251,191,36,0.5)', strokeWidth: 2 } },
  { id: 'e-dec1-end1', source: 'decision-1', target: 'end-1', animated: true, style: { stroke: 'rgba(168,85,247,0.5)', strokeWidth: 2 } },
  { id: 'e-proc2-proc1', source: 'process-2', target: 'process-1', type: 'step', style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 } },
];

// Extracted inner component so `useReactFlow` context works
function FlowchartCanvas({ onBack }: { onBack?: () => void }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: 'rgba(255,255,255,0.4)', strokeWidth: 2 } }, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `node_${Math.random().toString(36).substr(2, 9)}`,
        type,
        position,
        data: { 
          label: `New ${type.replace('Node', '')}`,
          description: 'Custom description here.',
          status: 'Draft',
          statusColor: 'text-white/40',
          statusBgColor: 'bg-white/40'
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes],
  );

  const nodeTypes = useMemo(() => ({
    startNode: StartNode,
    processNode: ProcessNode,
    decisionNode: DecisionNode,
    endNode: EndNode,
  }), []);

  return (
    <div className="w-full h-full relative rounded-3xl overflow-hidden border border-white/[0.03] bg-gradient-to-b from-[#0a0a0a] to-[#050505]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        fitView
        className="touch-none"
        minZoom={0.2}
        maxZoom={1.5}
      >
        {/* Tool Header Overlay */}
        <Panel position="top-left" className="m-6 z-10 w-fit">
          <div className="flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/[0.05] p-2 rounded-2xl shadow-xl">
            <div className="flex items-center gap-4">
              {onBack && (
                <>
                  <button 
                    onClick={onBack}
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-white/70" />
                  </button>
                  <div className="h-8 w-px bg-white/10" />
                </>
              )}
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Globe className="w-5 h-5 text-blue-400" />
              </div>
              <div className="pr-4">
                <h3 className="text-sm font-semibold text-white/90">Project Lifecycle Draft</h3>
                <p className="text-[11px] text-white/40">Read-only map synced from #TeamWorkspace</p>
              </div>
            </div>
          </div>
        </Panel>

        {/* Drag and Drop Tool Palette */}
        <Panel position="top-right" className="m-6 z-10 w-64">
          <div className="flex flex-col gap-3 bg-black/60 backdrop-blur-xl border border-white/[0.05] p-4 rounded-2xl shadow-2xl w-full">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2 px-1">Tool Palette</h4>
            
            <div 
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
              onDragStart={(e) => {
                e.dataTransfer.setData('application/reactflow', 'startNode');
                e.dataTransfer.effectAllowed = 'move';
              }}
              draggable
            >
              <Play className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-white/80">Start Node</span>
            </div>

            <div 
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
              onDragStart={(e) => {
                e.dataTransfer.setData('application/reactflow', 'processNode');
                e.dataTransfer.effectAllowed = 'move';
              }}
              draggable
            >
              <Settings className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-white/80">Process</span>
            </div>

            <div 
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
              onDragStart={(e) => {
                e.dataTransfer.setData('application/reactflow', 'decisionNode');
                e.dataTransfer.effectAllowed = 'move';
              }}
              draggable
            >
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-white/80">Decision</span>
            </div>

            <div 
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
              onDragStart={(e) => {
                e.dataTransfer.setData('application/reactflow', 'endNode');
                e.dataTransfer.effectAllowed = 'move';
              }}
              draggable
            >
              <CheckCircle className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-white/80">End Node</span>
            </div>
          </div>
        </Panel>

        <Controls 
          className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl fill-white/50" 
        />
      </ReactFlow>
    </div>
  );
}

// Wrapper to provide React Flow context to the main app layout
export default function ArchitectureFlowchart({ onBack }: { onBack?: () => void }) {
  return (
    <ReactFlowProvider>
      <FlowchartCanvas onBack={onBack} />
    </ReactFlowProvider>
  );
}
