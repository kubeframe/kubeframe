
import { APIResourceFactory } from '@kubeframe/k8s/base';
import * as crds from './index.js';
export function registerCRDs() {
    console.info('Registering CRDs');
    APIResourceFactory.registerResource('monitoring.coreos.com/v1/ServiceMonitor', (json: any) => new crds.monitoring.coreos.com.v1.ServiceMonitor(json));
    APIResourceFactory.registerResource('monitoring.coreos.com/v1/PrometheusRule', (json: any) => new crds.monitoring.coreos.com.v1.PrometheusRule(json));
    APIResourceFactory.registerResource('monitoring.coreos.com/v1alpha1/AlertmanagerConfig', (json: any) => new crds.monitoring.coreos.com.v1alpha1.AlertmanagerConfig(json));
    APIResourceFactory.registerResource('monitoring.coreos.com/v1/Alertmanager', (json: any) => new crds.monitoring.coreos.com.v1.Alertmanager(json));
    APIResourceFactory.registerResource('monitoring.coreos.com/v1/PodMonitor', (json: any) => new crds.monitoring.coreos.com.v1.PodMonitor(json));
    APIResourceFactory.registerResource('monitoring.coreos.com/v1/Probe', (json: any) => new crds.monitoring.coreos.com.v1.Probe(json));
    APIResourceFactory.registerResource('bitnami.com/v1alpha1/SealedSecret', (json: any) => new crds.bitnami.com.v1alpha1.SealedSecret(json));
    APIResourceFactory.registerResource('sloth.slok.dev/v1/PrometheusServiceLevel', (json: any) => new crds.sloth.slok.dev.v1.PrometheusServiceLevel(json));
    
}
