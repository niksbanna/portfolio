import { motion } from 'framer-motion';
import {
  Monitor,
  Shield,
  Key,
  User,
  ShoppingCart,
  CreditCard,
  Bell,
  Layers,
  Zap,
  Database,
} from 'lucide-react';
import type { ServiceNode as ServiceNodeType, ServiceStatus } from './types';

const iconMap: Record<string, React.ElementType> = {
  monitor: Monitor,
  shield: Shield,
  key: Key,
  user: User,
  'shopping-cart': ShoppingCart,
  'credit-card': CreditCard,
  bell: Bell,
  layers: Layers,
  zap: Zap,
  database: Database,
};

const typeColors: Record<string, { bg: string; border: string; icon: string }> = {
  external: {
    bg: 'bg-slate-100 dark:bg-slate-700',
    border: 'border-slate-300 dark:border-slate-500',
    icon: 'text-slate-600 dark:text-slate-300',
  },
  gateway: {
    bg: 'bg-blue-100 dark:bg-blue-900/40',
    border: 'border-blue-400 dark:border-blue-500',
    icon: 'text-blue-600 dark:text-blue-400',
  },
  service: {
    bg: 'bg-green-100 dark:bg-green-900/40',
    border: 'border-green-400 dark:border-green-500',
    icon: 'text-green-600 dark:text-green-400',
  },
  database: {
    bg: 'bg-purple-100 dark:bg-purple-900/40',
    border: 'border-purple-400 dark:border-purple-500',
    icon: 'text-purple-600 dark:text-purple-400',
  },
  queue: {
    bg: 'bg-orange-100 dark:bg-orange-900/40',
    border: 'border-orange-400 dark:border-orange-500',
    icon: 'text-orange-600 dark:text-orange-400',
  },
};

const statusStyles: Record<ServiceStatus, string> = {
  idle: '',
  processing: 'ring-4 ring-yellow-400 ring-opacity-75',
  success: 'ring-4 ring-green-400 ring-opacity-75',
  error: 'ring-4 ring-red-400 ring-opacity-75',
};

interface Props {
  service: ServiceNodeType;
  status: ServiceStatus;
  currentAction?: string;
  currentData?: Record<string, unknown>;
  scale?: number;
}

export default function ServiceNode({
  service,
  status,
  currentAction,
  currentData,
  onDragEnd,
  scale = 1,
}: Props & { onDragEnd?: (id: string, point: { x: number; y: number }) => void }) {
  const Icon = iconMap[service.icon] || Database;
  const colors = typeColors[service.type];

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        left: service.x * scale,
        top: service.y * scale,
        touchAction: 'none',
      }}
      drag
      dragMomentum={false}
      onDragEnd={(_, info) => {
        if (onDragEnd) {
          // Calculate new position based on drag delta
          // Note: Framer motion drag offset needs to be added to original position
          // But since we are updating state which triggers re-render, we need to be careful
          // Simplest way for controlled drag is to just use the offset
           onDragEnd(service.id, {
            x: service.x + info.offset.x / scale,
            y: service.y + info.offset.y / scale
          });
        }
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: 0, // Reset transform on re-render to avoid acquiring accumulated offset
        y: 0 
      }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={`
          relative flex flex-col items-center p-3 rounded-lg border-2
          ${colors.bg} ${colors.border} ${statusStyles[status]}
          transition-all duration-300 min-w-[90px]
          transform -translate-x-1/2 -translate-y-1/2
        `}
      >
        <div className={`p-2 rounded-full ${colors.bg}`}>
          <Icon className={`h-5 w-5 ${colors.icon}`} />
        </div>
        <span className="mt-1 text-xs font-semibold text-gray-800 dark:text-gray-200 text-center whitespace-nowrap">
          {service.name}
        </span>
        <span className="text-[10px] text-gray-500 dark:text-gray-400 text-center">
          {service.description}
        </span>

        {status === 'processing' && (
          <motion.div
            className="absolute inset-0 rounded-lg ring-2 ring-yellow-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        )}

        {status === 'processing' && currentAction && (
          <motion.div
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-lg max-w-[180px]">
              <div className="font-semibold text-yellow-400">{currentAction}</div>
              {currentData && (
                <pre className="mt-1 text-[10px] text-gray-300 overflow-hidden max-h-16">
                  {JSON.stringify(currentData, null, 1)}
                </pre>
              )}
            </div>
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
