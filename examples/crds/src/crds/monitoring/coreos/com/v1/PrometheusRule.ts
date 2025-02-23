import * as k8s from "@kubeframe/k8s";
import { NamespacedAPIResource } from "@kubeframe/k8s/base";

interface PrometheusRuleSpec {

    /**
     * Content of Prometheus rule file
     */
    groups?: {
      /**
       * Interval determines how often rules in the group are evaluated.
       */
      interval?: string;
      /**
       * Labels to add or overwrite before storing the result for its rules.
       * The labels defined at the rule level take precedence.
       *
       * It requires Prometheus >= 3.0.0.
       * The field is ignored for Thanos Ruler.
       */
      labels?: {
        [k: string]: string;
      };
      /**
       * Limit the number of alerts an alerting rule and series a recording
       * rule can produce.
       * Limit is supported starting with Prometheus >= 2.31 and Thanos Ruler >= 0.24.
       */
      limit?: number;
      /**
       * Name of the rule group.
       */
      name: string;
      /**
       * PartialResponseStrategy is only used by ThanosRuler and will
       * be ignored by Prometheus instances.
       * More info: https://github.com/thanos-io/thanos/blob/main/docs/components/rule.md#partial-response
       */
      partial_response_strategy?: string;
      /**
       * Defines the offset the rule evaluation timestamp of this particular group by the specified duration into the past.
       *
       * It requires Prometheus >= v2.53.0.
       * It is not supported for ThanosRuler.
       */
      query_offset?: string;
      /**
       * List of alerting and recording rules.
       */
      rules?: {
        /**
         * Name of the alert. Must be a valid label value.
         * Only one of `record` and `alert` must be set.
         */
        alert?: string;
        /**
         * Annotations to add to each alert.
         * Only valid for alerting rules.
         */
        annotations?: {
          [k: string]: string;
        };
        /**
         * PromQL expression to evaluate.
         */
        expr: number | string;
        /**
         * Alerts are considered firing once they have been returned for this long.
         */
        for?: string;
        /**
         * KeepFiringFor defines how long an alert will continue firing after the condition that triggered it has cleared.
         */
        keep_firing_for?: string;
        /**
         * Labels to add or overwrite.
         */
        labels?: {
          [k: string]: string;
        };
        /**
         * Name of the time series to output to. Must be a valid metric name.
         * Only one of `record` and `alert` must be set.
         */
        record?: string;
      }[];
    }[];
}

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The `PrometheusRule` custom resource definition (CRD) defines [alerting](https://prometheus.io/docs/prometheus/latest/configuration/alerting_rules/) and [recording](https://prometheus.io/docs/prometheus/latest/configuration/recording_rules/) rules to be evaluated by `Prometheus` or `ThanosRuler` objects.
 *
 * `Prometheus` and `ThanosRuler` objects select `PrometheusRule` objects using label and namespace selectors.
 */
export interface PrometheusRuleArgs {
  metadata: k8s.meta.v1.NamespacedObjectMeta;
  /**
   * Specification of desired alerting rule definitions for Prometheus.
   */
  spec: PrometheusRuleSpec;
}

export class PrometheusRule extends NamespacedAPIResource {
    spec: PrometheusRuleSpec;

    constructor(args: PrometheusRuleArgs) {
        super('monitoring.coreos.com/v1', 'PrometheusRule', args.metadata);
        this.spec = args.spec;
    }
}
