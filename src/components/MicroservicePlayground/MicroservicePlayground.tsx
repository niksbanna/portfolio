import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, GitBranch, Info, CheckCircle, FastForward } from 'lucide-react';
import ServiceNode from './ServiceNode';
import { services as initialServices, connections, flows } from './architecture';
import type { ServiceStatus, FlowStep, MicroserviceFlow, ServiceNode as ServiceNodeType } from './types';



export default function MicroservicePlayground() {
  const [nodes, setNodes] = useState<ServiceNodeType[]>(initialServices);
  const [selectedFlow, setSelectedFlow] = useState<MicroserviceFlow>(flows[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [serviceStatuses, setServiceStatuses] = useState<Record<string, ServiceStatus>>({});
  const [activeConnections, setActiveConnections] = useState<string[][]>([]);
  const [completedSteps, setCompletedSteps] = useState<FlowStep[]>([]);
  const [totalTime, setTotalTime] = useState(0);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        // Limit scale to be between 0.6 and 1 to ensure readability on mobile
        const newScale = Math.max(0.35, Math.min(1, width / 780));
        setScale(newScale);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const reset = useCallback(() => {
    setIsPlaying(false);
    setCurrentStepIndex(-1);
    setServiceStatuses({});
    setNodes(initialServices); // Reset positions on reset
    setActiveConnections([]);
    setCompletedSteps([]);
    setTotalTime(0);
  }, []);

  const playFlow = useCallback(async () => {
    reset();
    setIsPlaying(true);

    let elapsed = 0;

    for (let i = 0; i < selectedFlow.steps.length; i++) {
      const step = selectedFlow.steps[i];
      setCurrentStepIndex(i);

      setServiceStatuses((prev) => ({
        ...prev,
        [step.serviceId]: 'processing',
      }));

      if (i > 0) {
        const prevServiceId = selectedFlow.steps[i - 1].serviceId;
        setActiveConnections((prev) => [...prev, [prevServiceId, step.serviceId]]);
      }

      await new Promise((resolve) => setTimeout(resolve, step.duration / speedMultiplier));
      elapsed += step.duration;
      setTotalTime(elapsed);

      setServiceStatuses((prev) => ({
        ...prev,
        [step.serviceId]: 'success',
      }));

      setCompletedSteps((prev) => [...prev, step]);
    }

    setCurrentStepIndex(-1);
    setIsPlaying(false);
  }, [selectedFlow, reset, nodes, speedMultiplier]);

  const handleNodeDrag = (id: string, point: { x: number; y: number }) => {
    setNodes((prev) =>
      prev.map((node) => (node.id === id ? { ...node, x: point.x, y: point.y } : node))
    );
  };

  const handleFlowChange = (flowId: string) => {
    const flow = flows.find((f) => f.id === flowId);
    if (flow) {
      reset();
      setSelectedFlow(flow);
    }
  };

  const currentStep = currentStepIndex >= 0 ? selectedFlow.steps[currentStepIndex] : null;

  // Generate path that routes through gaps between nodes
  const getConnectionPath = (fromId: string, toId: string) => {
    const fromNode = nodes.find((s) => s.id === fromId);
    const toNode = nodes.find((s) => s.id === toId);
    if (!fromNode || !toNode) return { path: '', startPoint: { x: 0, y: 0 }, endPoint: { x: 0, y: 0 } };

    const startX = fromNode.x;
    const startY = fromNode.y;
    const endX = toNode.x;
    const endY = toNode.y;

    // Bezier Curve
    const deltaX = endX - startX;
    
    // Control points for smooth S-curve
    // We want the line to exit horizontally if possible
    const cp1x = startX + deltaX * 0.5;
    const cp1y = startY;
    const cp2x = endX - deltaX * 0.5;
    const cp2y = endY;

    const path = `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`;

    return { path, startPoint: { x: startX, y: startY }, endPoint: { x: endX, y: endY } };
  };

  return (
    <section id="microservices" className="py-24 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl flex items-center justify-center gap-3">
            <GitBranch className="h-8 w-8" />
            Microservice Architecture
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto text-center">
            Interactive visualization of service communication patterns
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 min-w-0 overflow-hidden">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 overflow-hidden min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 mb-4">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
                  <select
                    value={selectedFlow.id}
                    onChange={(e) => handleFlowChange(e.target.value)}
                    disabled={isPlaying}
                    className="px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-600 text-gray-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {flows.map((flow) => (
                      <option key={flow.id} value={flow.id}>
                        {flow.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={playFlow}
                    disabled={isPlaying}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs sm:text-sm"
                  >
                    <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="hidden xs:inline">{isPlaying ? 'Running...' : 'Run Flow'}</span>
                    <span className="xs:hidden">{isPlaying ? '...' : 'Run'}</span>
                  </button>

                  <button
                    onClick={reset}
                    disabled={isPlaying}
                    className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition-colors text-xs sm:text-sm"
                  >
                    <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4" />
                    Reset
                  </button>
                  
                  <div className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-600 rounded-md">
                    <FastForward className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-300" />
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.5"
                      value={speedMultiplier}
                      onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                      className="w-16 sm:w-24 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-500 accent-blue-600"
                    />
                    <span className="text-[10px] sm:text-xs font-mono w-6 sm:w-8">{speedMultiplier}x</span>
                  </div>
                </div>

                {totalTime > 0 && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Total: <span className="font-mono font-bold">{totalTime}ms</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                <Info className="h-4 w-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {selectedFlow.description}
                </p>
              </div>

              <div
                ref={containerRef}
                className="relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-600"
                style={{ height: `${420 * scale}px` }}
              >
                {/* Scrollable container for the diagram if scale forces it to be larger than view */}
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                {/* Row labels */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
                >
                  {/* Data Layer label */}
                  <text x={15} y={80} className="fill-purple-400 dark:fill-purple-500 text-[10px] font-medium">
                    DATA LAYER
                  </text>
                  {/* Request Flow label */}
                  <text x={15} y={200} className="fill-blue-400 dark:fill-blue-500 text-[10px] font-medium">
                    REQUEST FLOW
                  </text>
                  {/* Event Layer label */}
                  <text x={15} y={320} className="fill-orange-400 dark:fill-orange-500 text-[10px] font-medium">
                    EVENT LAYER
                  </text>
                </svg>

                {/* Connection lines */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}
                >
                  <defs>
                    <marker
                      id="arrow"
                      markerWidth="8"
                      markerHeight="6"
                      refX="7"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 8 3, 0 6" fill="#9ca3af" />
                    </marker>
                    <marker
                      id="arrow-active"
                      markerWidth="8"
                      markerHeight="6"
                      refX="7"
                      refY="3"
                      orient="auto"
                    >
                      <polygon points="0 0, 8 3, 0 6" fill="#10b981" />
                    </marker>
                  </defs>

                  {connections.map((conn, idx) => {
                    const isActive = activeConnections.some(
                      ([from, to]) =>
                        (from === conn.from && to === conn.to) ||
                        (from === conn.to && to === conn.from)
                    );

                    const { path, startPoint, endPoint } = getConnectionPath(conn.from, conn.to);

                    return (
                      <g key={idx}>
                        <path
                          d={path}
                          fill="none"
                          stroke={isActive ? '#10b981' : '#cbd5e1'}
                          strokeWidth={isActive ? 2 : 1.5}
                          strokeDasharray={isActive ? undefined : '4 3'}
                          markerEnd={isActive ? 'url(#arrow-active)' : 'url(#arrow)'}
                          className="transition-all duration-300"
                        />
                        {isActive && (
                          <motion.circle
                            r={4}
                            fill="#10b981"
                            filter="drop-shadow(0 0 3px #10b981)"
                            initial={{
                               cx: startPoint.x,
                               cy: startPoint.y,
                               opacity: 0
                            }}
                            animate={{
                               cx: endPoint.x,
                               cy: endPoint.y,
                               opacity: [0, 1, 1, 0]
                            }}
                            transition={{ duration: 0.5 / speedMultiplier, ease: 'easeInOut' }}
                          />
                        )}
                      </g>
                    );
                  })}
                </svg>

                {/* Service nodes */}
                <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                  {nodes.map((service) => (
                    <ServiceNode
                      key={service.id}
                      service={service}
                      status={serviceStatuses[service.id] || 'idle'}
                      currentAction={
                        currentStep?.serviceId === service.id ? currentStep.action : undefined
                      }
                      currentData={
                        currentStep?.serviceId === service.id ? currentStep.data : undefined
                      }
                      onDragEnd={handleNodeDrag}
                    />
                  ))}
                </div>
                </div>
              </div>

              {/* Legend */}
              <div className="mt-4 flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-slate-400"></div>
                  <span className="text-gray-600 dark:text-gray-400">Client</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-blue-500"></div>
                  <span className="text-gray-600 dark:text-gray-400">Gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-500"></div>
                  <span className="text-gray-600 dark:text-gray-400">Services</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-purple-500"></div>
                  <span className="text-gray-600 dark:text-gray-400">Database/Cache</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-orange-500"></div>
                  <span className="text-gray-600 dark:text-gray-400">Message Queue</span>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                  <div className="w-6 h-0 border-t-2 border-dashed border-gray-400"></div>
                  <span className="text-gray-500">async</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flow Steps Panel */}
          <div className="space-y-4 min-w-0 overflow-hidden">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 min-w-0 overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Execution Steps
              </h3>
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin scroll-smooth">
                <AnimatePresence mode="popLayout">
                  {selectedFlow.steps.map((step, idx) => {
                    const isCompleted = completedSteps.includes(step);
                    const isCurrent = currentStepIndex === idx;
                    const service = nodes.find((s) => s.id === step.serviceId);

                    return (
                      <motion.div
                        key={`${step.serviceId}-${idx}`}
                        initial={{ opacity: 0.4 }}
                        animate={{
                          opacity: isCompleted || isCurrent ? 1 : 0.4,
                          scale: isCurrent ? 1.01 : 1,
                        }}
                        className={`
                          p-2.5 rounded-md border text-sm transition-colors
                          ${
                            isCurrent
                              ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/30'
                              : isCompleted
                                ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/20'
                                : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800'
                          }
                        `}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 flex items-center justify-center text-[10px] font-mono bg-gray-200 dark:bg-gray-600 rounded text-gray-600 dark:text-gray-300">
                              {idx + 1}
                            </span>
                            <span className="font-medium text-gray-900 dark:text-white text-xs">
                              {service?.name}
                            </span>
                          </div>
                          {isCompleted && <CheckCircle className="h-3.5 w-3.5 text-green-500" />}
                          {isCurrent && (
                            <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse"></div>
                          )}
                        </div>
                        <p className="mt-1 text-gray-600 dark:text-gray-300 text-xs pl-7 font-mono">
                          {step.action}
                        </p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Architecture Concepts */}
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow p-4 min-w-0 overflow-hidden">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Patterns Demonstrated
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 font-bold">→</span>
                  <span>API Gateway for auth & routing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 font-bold">→</span>
                  <span>Synchronous service-to-service calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">→</span>
                  <span>Cache-aside pattern (Redis)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 font-bold">→</span>
                  <span>Async events via message queue</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
