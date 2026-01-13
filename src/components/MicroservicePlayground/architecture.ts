import type { ServiceNode, Connection, MicroserviceFlow } from './types';

// Redesigned layout with clear separation:
// - Row 1 (y=80): Data stores (Cache, Database, Queue)
// - Row 2 (y=200): Main request flow (Client → Gateway → Services → Processing)
// - Row 3 (y=320): Additional services
//
// This allows vertical arrows for data access and horizontal arrows for request flow

export const services: ServiceNode[] = [
  // Main Request Flow (Row 2, y=200) - Horizontal line
  {
    id: 'client',
    name: 'Client App',
    icon: 'monitor',
    description: 'React Frontend',
    x: 70,
    y: 200,
    type: 'external',
  },
  {
    id: 'gateway',
    name: 'API Gateway',
    icon: 'shield',
    description: 'Auth & Routing',
    x: 220,
    y: 200,
    type: 'gateway',
  },
  {
    id: 'auth',
    name: 'Auth Service',
    icon: 'key',
    description: 'JWT & OAuth',
    x: 370,
    y: 200,
    type: 'service',
  },
  {
    id: 'user',
    name: 'User Service',
    icon: 'user',
    description: 'User Management',
    x: 520,
    y: 200,
    type: 'service',
  },
  {
    id: 'payment',
    name: 'Payment',
    icon: 'credit-card',
    description: 'Stripe Integration',
    x: 670,
    y: 200,
    type: 'service',
  },

  // Data Layer (Row 1, y=80) - Above the flow
  {
    id: 'cache',
    name: 'Redis',
    icon: 'zap',
    description: 'Cache & Sessions',
    x: 295,
    y: 80,
    type: 'database',
  },
  {
    id: 'db',
    name: 'PostgreSQL',
    icon: 'database',
    description: 'Primary DB',
    x: 595,
    y: 80,
    type: 'database',
  },

  // Event-Driven Layer (Row 3, y=320) - Below the flow
  {
    id: 'order',
    name: 'Order Service',
    icon: 'shopping-cart',
    description: 'Order Processing',
    x: 370,
    y: 320,
    type: 'service',
  },
  {
    id: 'queue',
    name: 'Kafka',
    icon: 'layers',
    description: 'Message Queue',
    x: 520,
    y: 320,
    type: 'queue',
  },
  {
    id: 'notification',
    name: 'Notification',
    icon: 'bell',
    description: 'Email & SMS',
    x: 670,
    y: 320,
    type: 'service',
  },
];

// Connections represent actual architectural relationships
// Control flow: who calls whom for request handling
// Data flow: where data is read/written (vertical connections)
export const connections: Connection[] = [
  // Request flow (horizontal)
  { from: 'client', to: 'gateway' },
  { from: 'gateway', to: 'auth' },
  { from: 'gateway', to: 'user' },
  { from: 'gateway', to: 'order' },

  // Cache access (vertical - side calls, not pass-through)
  { from: 'gateway', to: 'cache' },  // Rate limiting check
  { from: 'auth', to: 'cache' },     // Session storage

  // Database access (vertical)
  { from: 'user', to: 'db' },
  { from: 'payment', to: 'db' },
  { from: 'order', to: 'db' },

  // Service-to-service calls
  { from: 'order', to: 'payment' },

  // Event-driven (async messaging)
  { from: 'payment', to: 'queue' },
  { from: 'queue', to: 'notification' },
];

export const flows: MicroserviceFlow[] = [
  {
    id: 'user-login',
    name: 'User Login',
    description: 'JWT authentication with session caching',
    steps: [
      {
        serviceId: 'client',
        action: 'POST /auth/login',
        data: { email: 'user@example.com' },
        duration: 200,
      },
      {
        serviceId: 'gateway',
        action: 'Check rate limit',
        data: { endpoint: '/auth/login' },
        duration: 100,
      },
      {
        serviceId: 'cache',
        action: 'GET rate:ip:endpoint',
        data: { remaining: 99, allowed: true },
        duration: 50,
      },
      {
        serviceId: 'gateway',
        action: 'Forward to Auth',
        data: { route: 'auth-service' },
        duration: 50,
      },
      {
        serviceId: 'auth',
        action: 'Validate credentials',
        data: { userId: 'usr_123', valid: true },
        duration: 300,
      },
      {
        serviceId: 'cache',
        action: 'SET session:usr_123',
        data: { ttl: 3600 },
        duration: 50,
      },
      {
        serviceId: 'auth',
        action: 'Return JWT',
        data: { token: 'eyJ...' },
        duration: 100,
      },
      {
        serviceId: 'client',
        action: 'Store token',
        data: { authenticated: true },
        duration: 100,
      },
    ],
    connections: [
      ['client', 'gateway'],
      ['gateway', 'cache'],
      ['gateway', 'auth'],
      ['auth', 'cache'],
    ],
  },
  {
    id: 'create-order',
    name: 'Create Order',
    description: 'Order placement with payment and async notification',
    steps: [
      {
        serviceId: 'client',
        action: 'POST /orders',
        data: { items: ['prod_1'], total: 99.99 },
        duration: 200,
      },
      {
        serviceId: 'gateway',
        action: 'Verify JWT',
        data: { userId: 'usr_123' },
        duration: 100,
      },
      {
        serviceId: 'gateway',
        action: 'Route to Order Service',
        data: { method: 'POST' },
        duration: 50,
      },
      {
        serviceId: 'order',
        action: 'Create order',
        data: { orderId: 'ord_456', status: 'pending' },
        duration: 200,
      },
      {
        serviceId: 'db',
        action: 'INSERT orders',
        data: { orderId: 'ord_456' },
        duration: 100,
      },
      {
        serviceId: 'order',
        action: 'Call Payment Service',
        data: { amount: 99.99 },
        duration: 100,
      },
      {
        serviceId: 'payment',
        action: 'Charge card (Stripe)',
        data: { chargeId: 'ch_789' },
        duration: 800,
      },
      {
        serviceId: 'db',
        action: 'UPDATE payment_status',
        data: { status: 'paid' },
        duration: 100,
      },
      {
        serviceId: 'payment',
        action: 'Publish event',
        data: { event: 'payment.success' },
        duration: 50,
      },
      {
        serviceId: 'queue',
        action: 'Enqueue message',
        data: { topic: 'orders' },
        duration: 50,
      },
      {
        serviceId: 'notification',
        action: 'Send email (async)',
        data: { template: 'order_confirmed' },
        duration: 300,
      },
      {
        serviceId: 'client',
        action: 'Show confirmation',
        data: { orderId: 'ord_456' },
        duration: 100,
      },
    ],
    connections: [
      ['client', 'gateway'],
      ['gateway', 'order'],
      ['order', 'db'],
      ['order', 'payment'],
      ['payment', 'db'],
      ['payment', 'queue'],
      ['queue', 'notification'],
    ],
  },
  {
    id: 'get-user-profile',
    name: 'Get User Profile',
    description: 'Cache-aside pattern: check cache, fallback to DB',
    steps: [
      {
        serviceId: 'client',
        action: 'GET /users/me',
        data: { headers: { Authorization: 'Bearer ...' } },
        duration: 150,
      },
      {
        serviceId: 'gateway',
        action: 'Validate token',
        data: { userId: 'usr_123' },
        duration: 100,
      },
      {
        serviceId: 'gateway',
        action: 'Route to User Service',
        data: { method: 'GET' },
        duration: 50,
      },
      {
        serviceId: 'user',
        action: 'Check cache first',
        data: { key: 'user:123' },
        duration: 50,
      },
      {
        serviceId: 'db',
        action: 'SELECT * FROM users',
        data: { id: 'usr_123' },
        duration: 150,
      },
      {
        serviceId: 'user',
        action: 'Return profile',
        data: { name: 'John Doe', email: 'john@example.com' },
        duration: 50,
      },
      {
        serviceId: 'client',
        action: 'Render profile',
        data: { cached: false },
        duration: 100,
      },
    ],
    connections: [
      ['client', 'gateway'],
      ['gateway', 'user'],
      ['user', 'db'],
    ],
  },
];
