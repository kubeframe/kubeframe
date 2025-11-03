import { APIResource } from "./APIResource.js";

export type FactoryFunction = (json: unknown) => APIResource;
