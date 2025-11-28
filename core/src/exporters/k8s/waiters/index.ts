import { DeploymentWaiter } from "./DeploymentWaiter.js";

export const WAITERS = [
    new DeploymentWaiter(),
];

export * from './DeploymentWaiter.js';
export * from './ResourceWaiter.js';