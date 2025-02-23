import { k8s, NamespacedAPIResource } from "@kubeframe/k8s";

interface PrometheusServiceLevelSpec {

    /**
     * Labels are the Prometheus labels that will have all the recording and alerting rules generated for the service SLOs.
     */
    labels?: {
      [k: string]: string;
    };

    /**
     * Service is the application of the SLOs.
     */
    service: string;

    /**
     * SLOs are the SLOs of the service.
     *
     * @minItems 1
     */
    slos?: [
      {
        /**
         * Alerting is the configuration with all the things related with the SLO alerts.
         */
        alerting: {
          /**
           * Annotations are the Prometheus annotations that will have all the alerts generated by this SLO.
           */
          annotations?: {
            [k: string]: string;
          };
          /**
           * Labels are the Prometheus labels that will have all the alerts generated by this SLO.
           */
          labels?: {
            [k: string]: string;
          };
          /**
           * Name is the name used by the alerts generated for this SLO.
           */
          name?: string;
          /**
           * Page alert refers to the critical alert (check multiwindow-multiburn alerts).
           */
          pageAlert?: {
            /**
             * Annotations are the Prometheus annotations for the specific alert.
             */
            annotations?: {
              [k: string]: string;
            };
            /**
             * Disable disables the alert and makes Sloth not generating this alert. This can be helpful for example to disable ticket(warning) alerts.
             */
            disable?: boolean;
            /**
             * Labels are the Prometheus labels for the specific alert. For example can be useful to route the Page alert to specific Slack channel.
             */
            labels?: {
              [k: string]: string;
            };
          };
          /**
           * TicketAlert alert refers to the warning alert (check multiwindow-multiburn alerts).
           */
          ticketAlert?: {
            /**
             * Annotations are the Prometheus annotations for the specific alert.
             */
            annotations?: {
              [k: string]: string;
            };
            /**
             * Disable disables the alert and makes Sloth not generating this alert. This can be helpful for example to disable ticket(warning) alerts.
             */
            disable?: boolean;
            /**
             * Labels are the Prometheus labels for the specific alert. For example can be useful to route the Page alert to specific Slack channel.
             */
            labels?: {
              [k: string]: string;
            };
          };
        };
        /**
         * Description is the description of the SLO.
         */
        description?: string;
        /**
         * Labels are the Prometheus labels that will have all the recording and alerting rules for this specific SLO. These labels are merged with the previous level labels.
         */
        labels?: {
          [k: string]: string;
        };
        /**
         * Name is the name of the SLO.
         */
        name: string;
        /**
         * Objective is target of the SLO the percentage (0, 100] (e.g 99.9).
         */
        objective: number;
        /**
         * SLI is the indicator (service level indicator) for this specific SLO.
         */
        sli: {
          /**
           * Events is the events SLI type.
           */
          events?: {
            /**
             * ErrorQuery is a Prometheus query that will get the number/count of events that we consider that are bad for the SLO (e.g "http 5xx", "latency > 250ms"...). Requires the usage of `{{.window}}` template variable.
             */
            errorQuery: string;
            /**
             * TotalQuery is a Prometheus query that will get the total number/count of events for the SLO (e.g "all http requests"...). Requires the usage of `{{.window}}` template variable.
             */
            totalQuery: string;
          };
          /**
           * Plugin is the pluggable SLI type.
           */
          plugin?: {
            /**
             * Name is the name of the plugin that needs to load.
             */
            id: string;
            /**
             * Options are the options used for the plugin.
             */
            options?: {
              [k: string]: string;
            };
          };
          /**
           * Raw is the raw SLI type.
           */
          raw?: {
            /**
             * ErrorRatioQuery is a Prometheus query that will get the raw error ratio (0-1) for the SLO.
             */
            errorRatioQuery: string;
          };
        };
      },
      ...{
        /**
         * Alerting is the configuration with all the things related with the SLO alerts.
         */
        alerting: {
          /**
           * Annotations are the Prometheus annotations that will have all the alerts generated by this SLO.
           */
          annotations?: {
            [k: string]: string;
          };
          /**
           * Labels are the Prometheus labels that will have all the alerts generated by this SLO.
           */
          labels?: {
            [k: string]: string;
          };
          /**
           * Name is the name used by the alerts generated for this SLO.
           */
          name?: string;
          /**
           * Page alert refers to the critical alert (check multiwindow-multiburn alerts).
           */
          pageAlert?: {
            /**
             * Annotations are the Prometheus annotations for the specific alert.
             */
            annotations?: {
              [k: string]: string;
            };
            /**
             * Disable disables the alert and makes Sloth not generating this alert. This can be helpful for example to disable ticket(warning) alerts.
             */
            disable?: boolean;
            /**
             * Labels are the Prometheus labels for the specific alert. For example can be useful to route the Page alert to specific Slack channel.
             */
            labels?: {
              [k: string]: string;
            };
          };
          /**
           * TicketAlert alert refers to the warning alert (check multiwindow-multiburn alerts).
           */
          ticketAlert?: {
            /**
             * Annotations are the Prometheus annotations for the specific alert.
             */
            annotations?: {
              [k: string]: string;
            };
            /**
             * Disable disables the alert and makes Sloth not generating this alert. This can be helpful for example to disable ticket(warning) alerts.
             */
            disable?: boolean;
            /**
             * Labels are the Prometheus labels for the specific alert. For example can be useful to route the Page alert to specific Slack channel.
             */
            labels?: {
              [k: string]: string;
            };
          };
        };
        /**
         * Description is the description of the SLO.
         */
        description?: string;
        /**
         * Labels are the Prometheus labels that will have all the recording and alerting rules for this specific SLO. These labels are merged with the previous level labels.
         */
        labels?: {
          [k: string]: string;
        };
        /**
         * Name is the name of the SLO.
         */
        name: string;
        /**
         * Objective is target of the SLO the percentage (0, 100] (e.g 99.9).
         */
        objective: number;
        /**
         * SLI is the indicator (service level indicator) for this specific SLO.
         */
        sli: {
          /**
           * Events is the events SLI type.
           */
          events?: {
            /**
             * ErrorQuery is a Prometheus query that will get the number/count of events that we consider that are bad for the SLO (e.g "http 5xx", "latency > 250ms"...). Requires the usage of `{{.window}}` template variable.
             */
            errorQuery: string;
            /**
             * TotalQuery is a Prometheus query that will get the total number/count of events for the SLO (e.g "all http requests"...). Requires the usage of `{{.window}}` template variable.
             */
            totalQuery: string;
          };
          /**
           * Plugin is the pluggable SLI type.
           */
          plugin?: {
            /**
             * Name is the name of the plugin that needs to load.
             */
            id: string;
            /**
             * Options are the options used for the plugin.
             */
            options?: {
              [k: string]: string;
            };
          };
          /**
           * Raw is the raw SLI type.
           */
          raw?: {
            /**
             * ErrorRatioQuery is a Prometheus query that will get the raw error ratio (0-1) for the SLO.
             */
            errorRatioQuery: string;
          };
        };
      }[]
    ];
}

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * PrometheusServiceLevel is the expected service quality level using Prometheus as the backend used by Sloth.
 */
export interface PrometheusServiceLevelArgs {
  metadata: k8s.meta.v1.NamespacedObjectMeta;
  /**
   * ServiceLevelSpec is the spec for a PrometheusServiceLevel.
   */
  spec?: PrometheusServiceLevelSpec;
  status?: {
    /**
     * LastPromOpRulesGeneration tells the last atemp made for a successful SLO rules generate.
     */
    lastPromOpRulesSuccessfulGenerated?: string;
    /**
     * ObservedGeneration tells the generation was acted on, normally this is required to stop an infinite loop when the status is updated because it sends a watch updated event to the watchers of the K8s object.
     */
    observedGeneration: number;
    /**
     * ProcessedSLOs tells how many SLOs haven been processed for Prometheus operator.
     */
    processedSLOs: number;
    /**
     * PromOpRulesGenerated tells if the rules for prometheus operator CRD have been generated.
     */
    promOpRulesGenerated: boolean;
    /**
     * PromOpRulesGeneratedSLOs tells how many SLOs have been processed and generated for Prometheus operator successfully.
     */
    promOpRulesGeneratedSLOs: number;
  };
}

export class PrometheusServiceLevel extends NamespacedAPIResource {
    spec?: PrometheusServiceLevelSpec;
    status?: { lastPromOpRulesSuccessfulGenerated?: string; observedGeneration: number; processedSLOs: number; promOpRulesGenerated: boolean; promOpRulesGeneratedSLOs: number; };

    constructor(args: PrometheusServiceLevelArgs) {
        super('sloth.slok.dev/v1', 'PrometheusServiceLevel', args.metadata);
        this.spec = args.spec;
        this.status = args.status;
    }
}
