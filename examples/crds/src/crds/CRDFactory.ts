
    import { APIResourceFactory } from '@kubeframe/kubeframe-version';
    import * as crds from './crds.js';
    export function registerCRDs() {
        APIResourceFactory.registerResource('monitoring.coreos.com/v1/ServiceMonitor', (json: any) => new crds.monitoring.coreos.com.v1.ServiceMonitor(json as crds.monitoring.coreos.com.v1.ServiceMonitorProperties));
        APIResourceFactory.registerResource('monitoring.coreos.com/v1/PrometheusRule', (json: any) => new crds.monitoring.coreos.com.v1.PrometheusRule(json as crds.monitoring.coreos.com.v1.PrometheusRuleProperties));
        APIResourceFactory.registerResource('monitoring.coreos.com/v1alpha1/AlertmanagerConfig', (json: any) => new crds.monitoring.coreos.com.v1alpha1.AlertmanagerConfig(json as crds.monitoring.coreos.com.v1alpha1.AlertmanagerConfigProperties));
        APIResourceFactory.registerResource('monitoring.coreos.com/v1/Alertmanager', (json: any) => new crds.monitoring.coreos.com.v1.Alertmanager(json as crds.monitoring.coreos.com.v1.AlertmanagerProperties));
        APIResourceFactory.registerResource('monitoring.coreos.com/v1/PodMonitor', (json: any) => new crds.monitoring.coreos.com.v1.PodMonitor(json as crds.monitoring.coreos.com.v1.PodMonitorProperties));
        APIResourceFactory.registerResource('monitoring.coreos.com/v1/Probe', (json: any) => new crds.monitoring.coreos.com.v1.Probe(json as crds.monitoring.coreos.com.v1.ProbeProperties));
        APIResourceFactory.registerResource('bitnami.com/v1alpha1/SealedSecret', (json: any) => new crds.bitnami.com.v1alpha1.SealedSecret(json as crds.bitnami.com.v1alpha1.SealedSecretProperties));
        APIResourceFactory.registerResource('sloth.slok.dev/v1/PrometheusServiceLevel', (json: any) => new crds.sloth.slok.dev.v1.PrometheusServiceLevel(json as crds.sloth.slok.dev.v1.PrometheusServiceLevelProperties));
        
    }
    