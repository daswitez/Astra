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
  ReactFlowProvider,
  useOnSelectionChange
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Database, Server, Globe, ArrowRight, Zap, Shield, Smartphone, ArrowLeft, Play, Settings, HelpCircle, CheckCircle, FileText, Trash2, Layers, Cloud, User, Square, Camera, X, Send, FolderTree, Hash } from 'lucide-react';
import { toPng } from 'html-to-image';
import { motion, AnimatePresence } from 'framer-motion';

// --- ASTRA GLASSMORPHIC CUSTOM NODES ---

const GlassNode = ({ 
  data, 
  icon: Icon, 
  colorClass 
}: { 
  data: any, 
  icon: any, 
  colorClass: string 
}) => {
  return (
    <div className={`
      relative group rounded-xl w-64 p-5 
      bg-white/[0.02] backdrop-blur-xl border border-white/[0.05] shadow-lg
      hover:bg-white/[0.04] transition-colors
    `}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white border-2 border-[#1a1a1a]" />
      
      <div className="flex items-start gap-4 relative z-10">
        <div className={`w-10 h-10 rounded-xl bg-white/[0.02] flex items-center justify-center shrink-0 border border-white/[0.05] ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-medium text-white/90 mb-1">{data.label}</h4>
          <p className="text-[11px] text-white/40 leading-relaxed">{data.description}</p>
        </div>
      </div>
      
      {data.status && data.status !== 'None' && (
        <div className="mt-4 pt-4 border-t border-white/[0.05] flex items-center justify-between">
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Status</span>
          <span className={`text-[10px] font-mono flex items-center gap-1.5 ${data.statusColor}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${data.statusBgColor}`} />
            {data.status}
          </span>
        </div>
      )}

      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-white border-2 border-[#1a1a1a]" />
    </div>
  );
};

// Node Definitions using the wrapper
const StartNode = ({ data }: { data: any }) => <GlassNode data={data} icon={Play} colorClass="text-emerald-400" />;
const ProcessNode = ({ data }: { data: any }) => <GlassNode data={data} icon={Settings} colorClass="text-blue-400" />;
const DecisionNode = ({ data }: { data: any }) => <GlassNode data={data} icon={HelpCircle} colorClass="text-amber-400" />;
const EndNode = ({ data }: { data: any }) => <GlassNode data={data} icon={CheckCircle} colorClass="text-purple-400" />;
const NoteNode = ({ data }: { data: any }) => <GlassNode data={data} icon={FileText} colorClass="text-pink-400" />;
const DatabaseNode = ({ data }: { data: any }) => <GlassNode data={data} icon={Database} colorClass="text-teal-400" />;
const BlankNode = ({ data }: { data: any }) => <GlassNode data={data} icon={Square} colorClass="text-gray-400" />;
const SubprocessNode = ({ data }: { data: any }) => <GlassNode data={data} icon={Layers} colorClass="text-indigo-400" />;
const APINode = ({ data }: { data: any }) => <GlassNode data={data} icon={Zap} colorClass="text-yellow-400" />;
const CloudNode = ({ data }: { data: any }) => <GlassNode data={data} icon={Cloud} colorClass="text-cyan-400" />;
const UserInputNode = ({ data }: { data: any }) => <GlassNode data={data} icon={User} colorClass="text-orange-400" />;

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
  { id: 'e-start-proc1', source: 'start', target: 'process-1', type: 'smoothstep', style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 } },
  { id: 'e-proc1-dec1', source: 'process-1', target: 'decision-1', type: 'smoothstep', style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 } },
  { id: 'e-dec1-proc2', source: 'decision-1', target: 'process-2', type: 'smoothstep', style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 } },
  { id: 'e-dec1-end1', source: 'decision-1', target: 'end-1', type: 'smoothstep', style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 } },
  { id: 'e-proc2-proc1', source: 'process-2', target: 'process-1', type: 'smoothstep', style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 } },
];

// Extracted inner component so `useReactFlow` context works
function FlowchartCanvas({ onBack }: { onBack?: () => void }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { screenToFlowPosition } = useReactFlow();
  
  // Track selected node for properties panel
  const [selectedNodeId, setSelectedNodeId] = React.useState<string | null>(null);

  // Export & Sharing Modal State
  const [isCapturing, setIsCapturing] = React.useState(false);
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
  const [showSaveModal, setShowSaveModal] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [modalData, setModalData] = React.useState({
    title: 'New Architecture Flow',
    category: 'System Design',
    destination: 'team_workspace' // 'team_workspace' | 'storage_vault'
  });

  const handleCapture = useCallback(() => {
    const viewportNode = document.querySelector('.react-flow__viewport') as HTMLElement;
    if (!viewportNode) return;

    setIsCapturing(true);
    toPng(viewportNode, { 
      backgroundColor: '#050505',
      pixelRatio: 2,
      // Filter out cross-origin fonts to prevent SecurityError and TypeError
      filter: (node) => {
        if (node.tagName === 'LINK' && (node as HTMLLinkElement).rel === 'stylesheet') {
          const href = (node as HTMLLinkElement).href;
          if (href && (href.includes('fonts.googleapis.com') || href.includes('fonts.gstatic.com'))) {
            return false;
          }
        }
        return true;
      },
      fontEmbedCSS: '', // Bypass font embedding to prevent trim() error on undefined fonts
    })
      .then((dataUrl) => {
        setCapturedImage(dataUrl);
        setShowSaveModal(true);
      })
      .catch((err) => {
        console.error('Failed to capture schematic', err);
      })
      .finally(() => {
        setIsCapturing(false);
      });
  }, []);

  const handleSendSchematic = () => {
    setIsSending(true);
    // Simulate network delay for uploading schematic to specific channel
    setTimeout(() => {
      setIsSending(false);
      setShowSaveModal(false);
      setCapturedImage(null);
    }, 1500);
  };

  useOnSelectionChange({
    onChange: ({ nodes }) => {
      if (nodes.length === 1) {
        setSelectedNodeId(nodes[0].id);
      } else {
        setSelectedNodeId(null);
      }
    },
  });

  const selectedNode = React.useMemo(() => 
    nodes.find((n) => n.id === selectedNodeId),
  [nodes, selectedNodeId]);

  const updateNodeData = useCallback((id: string, newData: any) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          // Keep existing data, overwrite with new specific fields
          return { ...node, data: { ...node.data, ...newData } };
        }
        return node;
      })
    );
  }, [setNodes]);

  const deleteNode = useCallback((id: string) => {
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    setSelectedNodeId(null);
  }, [setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, type: 'smoothstep', style: { stroke: 'rgba(255,255,255,0.2)', strokeWidth: 2 } }, eds)),
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
          status: ['noteNode', 'blankNode', 'databaseNode', 'cloudNode', 'apiNode', 'userInputNode', 'subprocessNode'].includes(type) ? 'None' : 'Draft',
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
    noteNode: NoteNode,
    databaseNode: DatabaseNode,
    blankNode: BlankNode,
    subprocessNode: SubprocessNode,
    apiNode: APINode,
    cloudNode: CloudNode,
    userInputNode: UserInputNode
  }), []);

  return (
    <div className="w-full h-full relative bg-[#050505] overflow-hidden">
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
              
              <div className="h-8 w-px bg-white/10 mx-2" />
              
              <button
                onClick={handleCapture}
                disabled={isCapturing}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Camera className="w-4 h-4" />
                <span className="text-sm font-medium">{isCapturing ? 'Capturing...' : 'Save & Share Map'}</span>
              </button>
            </div>
          </div>
        </Panel>

        {/* Side Panel: Either Tool Palette or Properties Editor */}
        <Panel position="top-right" className="m-6 z-10 w-80">
          <div className="flex flex-col bg-black/80 backdrop-blur-2xl border border-white/[0.08] p-5 rounded-2xl shadow-2xl w-full">
            {selectedNode ? (
              <div className="flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-white/90">Edit Node</h4>
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{selectedNode.type}</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/50 px-1">Label</label>
                  <input 
                    type="text"
                    value={(selectedNode.data.label as string) || ''}
                    onChange={(e) => updateNodeData(selectedNode.id, { label: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors w-full"
                    placeholder="Enter node label..."
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/50 px-1">Description</label>
                  <textarea 
                    value={(selectedNode.data.description as string) || ''}
                    onChange={(e) => updateNodeData(selectedNode.id, { description: e.target.value })}
                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors w-full min-h-[80px] resize-none"
                    placeholder="Describe this step..."
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-white/50 px-1">Status</label>
                  <select 
                    value={(selectedNode.data.status as string) || 'Draft'}
                    onChange={(e) => {
                      const status = e.target.value;
                      let statusColor = "text-white/40";
                      let statusBgColor = "bg-white/40";
                      
                      if (status === 'Completed') { statusColor = 'text-emerald-400'; statusBgColor = 'bg-emerald-400'; }
                      else if (status === 'In Progress') { statusColor = 'text-blue-400'; statusBgColor = 'bg-blue-400'; }
                      else if (status === 'Pending' || status === 'Waiting') { statusColor = 'text-amber-400'; statusBgColor = 'bg-amber-400'; }
                      else if (status === 'None') { statusColor = 'transparent'; statusBgColor = 'transparent'; }

                      updateNodeData(selectedNode.id, { status, statusColor, statusBgColor });
                    }}
                    className="bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors w-full appearance-none"
                  >
                    <option value="None" className="bg-[#111]">None (No Badge)</option>
                    <option value="Draft" className="bg-[#111]">Draft</option>
                    <option value="Not Started" className="bg-[#111]">Not Started</option>
                    <option value="Pending" className="bg-[#111]">Pending</option>
                    <option value="In Progress" className="bg-[#111]">In Progress</option>
                    <option value="Waiting" className="bg-[#111]">Waiting</option>
                    <option value="Completed" className="bg-[#111]">Completed</option>
                  </select>
                </div>

                <div className="h-px w-full bg-white/10 my-2" />

                <button 
                  onClick={() => deleteNode(selectedNode.id)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Delete Node</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-200">
                <h4 className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1 px-1">Tool Palette</h4>
                <p className="text-[11px] text-white/30 px-1 leading-relaxed border-b border-white/10 pb-3 mb-1">
                  Drag and drop nodes onto the canvas to construct your logic flow. Click any node to edit its properties.
                </p>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div 
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/reactflow', 'startNode');
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    draggable
                  >
                    <Play className="w-5 h-5 text-emerald-400" />
                    <span className="text-[10px] font-medium text-white/60">Start</span>
                  </div>

                  <div 
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/reactflow', 'processNode');
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    draggable
                  >
                    <Settings className="w-5 h-5 text-blue-400" />
                    <span className="text-[10px] font-medium text-white/60">Process</span>
                  </div>

                  <div 
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/reactflow', 'decisionNode');
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    draggable
                  >
                    <HelpCircle className="w-5 h-5 text-amber-400" />
                    <span className="text-[10px] font-medium text-white/60">Decision</span>
                  </div>

                  <div 
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/reactflow', 'blankNode');
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    draggable
                  >
                    <Square className="w-5 h-5 text-gray-400" />
                    <span className="text-[10px] font-medium text-white/60">Blank</span>
                  </div>

                  <div 
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/reactflow', 'subprocessNode');
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    draggable
                  >
                    <Layers className="w-5 h-5 text-indigo-400" />
                    <span className="text-[10px] font-medium text-white/60">System</span>
                  </div>

                  <div 
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/reactflow', 'apiNode');
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    draggable
                  >
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-[10px] font-medium text-white/60">API</span>
                  </div>

                  <div 
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/reactflow', 'cloudNode');
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    draggable
                  >
                    <Cloud className="w-5 h-5 text-cyan-400" />
                    <span className="text-[10px] font-medium text-white/60">Cloud</span>
                  </div>

                  <div 
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/reactflow', 'databaseNode');
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    draggable
                  >
                    <Database className="w-5 h-5 text-teal-400" />
                    <span className="text-[10px] font-medium text-white/60">Data</span>
                  </div>

                  <div 
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/reactflow', 'userInputNode');
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    draggable
                  >
                    <User className="w-5 h-5 text-orange-400" />
                    <span className="text-[10px] font-medium text-white/60">User</span>
                  </div>

                  <div 
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/reactflow', 'noteNode');
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    draggable
                  >
                    <FileText className="w-5 h-5 text-pink-400" />
                    <span className="text-[10px] font-medium text-white/60">Note</span>
                  </div>

                  <div 
                    className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] cursor-grab active:cursor-grabbing transition-colors"
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/reactflow', 'endNode');
                      e.dataTransfer.effectAllowed = 'move';
                    }}
                    draggable
                  >
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    <span className="text-[10px] font-medium text-white/60">End</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Panel>

        <Controls 
          className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl fill-white/50" 
        />
        <MiniMap 
          className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl" 
          nodeColor="rgba(255,255,255,0.05)"
          maskColor="rgba(0,0,0,0.5)"
        />

        {/* Save & Share Modal Overlay */}
        <AnimatePresence>
          {showSaveModal && capturedImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <Camera className="w-4 h-4 text-blue-400" />
                    </div>
                    <h2 className="text-base font-semibold text-white/90">Save & Distribute Schematic</h2>
                  </div>
                  <button 
                    onClick={() => !isSending && setShowSaveModal(false)}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/40 hover:text-white/80 transition-colors disabled:opacity-50"
                    disabled={isSending}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row h-full">
                  {/* Left: Image Preview */}
                  <div className="w-full md:w-1/2 p-6 border-r border-white/5 bg-black/20 flex flex-col gap-3 justify-center items-center">
                    <span className="self-start text-[10px] font-mono uppercase tracking-widest text-white/40">Canvas Preview</span>
                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-inner bg-[#050505] relative flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={capturedImage} alt="Schematic Preview" className="max-w-full max-h-full object-contain" />
                    </div>
                  </div>

                  {/* Right: Metadata & Routing Form */}
                  <div className="w-full md:w-1/2 p-6 flex flex-col gap-5">
                    
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-white/50 px-1">Schematic Title</label>
                      <input 
                        type="text"
                        value={modalData.title}
                        onChange={(e) => setModalData(prev => ({ ...prev, title: e.target.value }))}
                        className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-colors w-full"
                        placeholder="e.g. Authentication Flow V2"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-white/50 px-1">Category / Tag</label>
                      <div className="relative">
                        <FolderTree className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <select 
                          value={modalData.category}
                          onChange={(e) => setModalData(prev => ({ ...prev, category: e.target.value }))}
                          className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-colors w-full appearance-none"
                        >
                          <option value="System Design" className="bg-[#111]">System Design</option>
                          <option value="Database Schemas" className="bg-[#111]">Database Schemas</option>
                          <option value="Frontend Architecture" className="bg-[#111]">Frontend Architecture</option>
                          <option value="Business Logic" className="bg-[#111]">Business Logic</option>
                          <option value="Marketing Funnels" className="bg-[#111]">Marketing Funnels</option>
                          <option value="Create New..." className="bg-[#111] italic text-blue-400">-- Create New Category --</option>
                        </select>
                      </div>
                    </div>

                    <div className="h-px w-full bg-white/5 my-1" />

                    <div className="flex flex-col gap-3">
                      <label className="text-xs text-white/50 px-1">Distribute To (Channel Route)</label>
                      
                      <div className="flex flex-col gap-2">
                        {/* Option 1: Team Workspace */}
                        <button
                          onClick={() => setModalData(prev => ({ ...prev, destination: 'team_workspace' }))}
                          className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                            modalData.destination === 'team_workspace' 
                              ? 'bg-blue-500/10 border-blue-500/30' 
                              : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
                          }`}
                        >
                          <div className={`mt-0.5 rounded-full p-1 ${modalData.destination === 'team_workspace' ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-white/40'}`}>
                            <Hash className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className={`block text-sm font-medium ${modalData.destination === 'team_workspace' ? 'text-blue-400' : 'text-white/80'}`}>#TeamWorkspace</span>
                            <span className="block text-[11px] text-white/40 mt-0.5">Post preview image to general engineering chat to discuss with the team.</span>
                          </div>
                        </button>

                        {/* Option 2: Storage Vault */}
                        <button
                          onClick={() => setModalData(prev => ({ ...prev, destination: 'storage_vault' }))}
                          className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                            modalData.destination === 'storage_vault' 
                              ? 'bg-purple-500/10 border-purple-500/30' 
                              : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
                          }`}
                        >
                          <div className={`mt-0.5 rounded-full p-1 ${modalData.destination === 'storage_vault' ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-white/40'}`}>
                            <Database className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className={`block text-sm font-medium ${modalData.destination === 'storage_vault' ? 'text-purple-400' : 'text-white/80'}`}>#StorageVault</span>
                            <span className="block text-[11px] text-white/40 mt-0.5">Save quietly to the dedicated files and diagrams directory. No chat ping.</span>
                          </div>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-white/5 bg-black/40">
                  <button 
                    onClick={() => setShowSaveModal(false)}
                    disabled={isSending}
                    className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSendSchematic}
                    disabled={isSending}
                    className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium transition-all ${
                      isSending 
                        ? 'bg-white/10 text-white/50 cursor-wait' 
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                    }`}
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                        Routing Data...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Save & Distribute
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
