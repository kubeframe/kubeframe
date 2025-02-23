import { k8s, NamespacedAPIResource } from "@kubeframe/k8s";

interface ProbeSpec {

    /**
     * Authorization section for this endpoint
     */
    authorization?: {
      /**
       * Selects a key of a Secret in the namespace that contains the credentials for authentication.
       */
      credentials?: {
        /**
         * The key of the secret to select from.  Must be a valid secret key.
         */
        key: string;
        /**
         * Name of the referent.
         * This field is effectively required, but due to backwards compatibility is
         * allowed to be empty. Instances of this type with an empty value here are
         * almost certainly wrong.
         * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
         */
        name?: string;
        /**
         * Specify whether the Secret or its key must be defined
         */
        optional?: boolean;
      };
      /**
       * Defines the authentication type. The value is case-insensitive.
       *
       * "Basic" is not a supported value.
       *
       * Default: "Bearer"
       */
      type?: string;
    };

    /**
     * BasicAuth allow an endpoint to authenticate over basic authentication.
     * More info: https://prometheus.io/docs/operating/configuration/#endpoint
     */
    basicAuth?: {
      /**
       * `password` specifies a key of a Secret containing the password for
       * authentication.
       */
      password?: {
        /**
         * The key of the secret to select from.  Must be a valid secret key.
         */
        key: string;
        /**
         * Name of the referent.
         * This field is effectively required, but due to backwards compatibility is
         * allowed to be empty. Instances of this type with an empty value here are
         * almost certainly wrong.
         * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
         */
        name?: string;
        /**
         * Specify whether the Secret or its key must be defined
         */
        optional?: boolean;
      };
      /**
       * `username` specifies a key of a Secret containing the username for
       * authentication.
       */
      username?: {
        /**
         * The key of the secret to select from.  Must be a valid secret key.
         */
        key: string;
        /**
         * Name of the referent.
         * This field is effectively required, but due to backwards compatibility is
         * allowed to be empty. Instances of this type with an empty value here are
         * almost certainly wrong.
         * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
         */
        name?: string;
        /**
         * Specify whether the Secret or its key must be defined
         */
        optional?: boolean;
      };
    };

    /**
     * Secret to mount to read bearer token for scraping targets. The secret
     * needs to be in the same namespace as the probe and accessible by
     * the Prometheus Operator.
     */
    bearerTokenSecret?: {
      /**
       * The key of the secret to select from.  Must be a valid secret key.
       */
      key: string;
      /**
       * Name of the referent.
       * This field is effectively required, but due to backwards compatibility is
       * allowed to be empty. Instances of this type with an empty value here are
       * almost certainly wrong.
       * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
       */
      name?: string;
      /**
       * Specify whether the Secret or its key must be defined
       */
      optional?: boolean;
    };

    /**
     * The protocol to use if a scrape returns blank, unparseable, or otherwise invalid Content-Type.
     *
     * It requires Prometheus >= v3.0.0.
     */
    fallbackScrapeProtocol?:
      | "PrometheusProto"
      | "OpenMetricsText0.0.1"
      | "OpenMetricsText1.0.0"
      | "PrometheusText0.0.4"
      | "PrometheusText1.0.0";

    /**
     * Interval at which targets are probed using the configured prober.
     * If not specified Prometheus' global scrape interval is used.
     */
    interval?: string;

    /**
     * The job name assigned to scraped metrics by default.
     */
    jobName?: string;

    /**
     * Per-scrape limit on the number of targets dropped by relabeling
     * that will be kept in memory. 0 means no limit.
     *
     * It requires Prometheus >= v2.47.0.
     */
    keepDroppedTargets?: number;

    /**
     * Per-scrape limit on number of labels that will be accepted for a sample.
     * Only valid in Prometheus versions 2.27.0 and newer.
     */
    labelLimit?: number;

    /**
     * Per-scrape limit on length of labels name that will be accepted for a sample.
     * Only valid in Prometheus versions 2.27.0 and newer.
     */
    labelNameLengthLimit?: number;

    /**
     * Per-scrape limit on length of labels value that will be accepted for a sample.
     * Only valid in Prometheus versions 2.27.0 and newer.
     */
    labelValueLengthLimit?: number;

    /**
     * MetricRelabelConfigs to apply to samples before ingestion.
     */
    metricRelabelings?: {
      /**
       * Action to perform based on the regex matching.
       *
       * `Uppercase` and `Lowercase` actions require Prometheus >= v2.36.0.
       * `DropEqual` and `KeepEqual` actions require Prometheus >= v2.41.0.
       *
       * Default: "Replace"
       */
      action?:
        | "replace"
        | "Replace"
        | "keep"
        | "Keep"
        | "drop"
        | "Drop"
        | "hashmod"
        | "HashMod"
        | "labelmap"
        | "LabelMap"
        | "labeldrop"
        | "LabelDrop"
        | "labelkeep"
        | "LabelKeep"
        | "lowercase"
        | "Lowercase"
        | "uppercase"
        | "Uppercase"
        | "keepequal"
        | "KeepEqual"
        | "dropequal"
        | "DropEqual";
      /**
       * Modulus to take of the hash of the source label values.
       *
       * Only applicable when the action is `HashMod`.
       */
      modulus?: number;
      /**
       * Regular expression against which the extracted value is matched.
       */
      regex?: string;
      /**
       * Replacement value against which a Replace action is performed if the
       * regular expression matches.
       *
       * Regex capture groups are available.
       */
      replacement?: string;
      /**
       * Separator is the string between concatenated SourceLabels.
       */
      separator?: string;
      /**
       * The source labels select values from existing labels. Their content is
       * concatenated using the configured Separator and matched against the
       * configured regular expression.
       */
      sourceLabels?: string[];
      /**
       * Label to which the resulting string is written in a replacement.
       *
       * It is mandatory for `Replace`, `HashMod`, `Lowercase`, `Uppercase`,
       * `KeepEqual` and `DropEqual` actions.
       *
       * Regex capture groups are available.
       */
      targetLabel?: string;
    }[];

    /**
     * The module to use for probing specifying how to probe the target.
     * Example module configuring in the blackbox exporter:
     * https://github.com/prometheus/blackbox_exporter/blob/master/example.yml
     */
    module?: string;

    /**
     * If there are more than this many buckets in a native histogram,
     * buckets will be merged to stay within the limit.
     * It requires Prometheus >= v2.45.0.
     */
    nativeHistogramBucketLimit?: number;

    /**
     * If the growth factor of one bucket to the next is smaller than this,
     * buckets will be merged to increase the factor sufficiently.
     * It requires Prometheus >= v2.50.0.
     */
    nativeHistogramMinBucketFactor?: number | string;

    /**
     * OAuth2 for the URL. Only valid in Prometheus versions 2.27.0 and newer.
     */
    oauth2?: {
      /**
       * `clientId` specifies a key of a Secret or ConfigMap containing the
       * OAuth2 client's ID.
       */
      clientId: {
        /**
         * ConfigMap containing data to use for the targets.
         */
        configMap?: {
          /**
           * The key to select.
           */
          key: string;
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the ConfigMap or its key must be defined
           */
          optional?: boolean;
        };
        /**
         * Secret containing data to use for the targets.
         */
        secret?: {
          /**
           * The key of the secret to select from.  Must be a valid secret key.
           */
          key: string;
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the Secret or its key must be defined
           */
          optional?: boolean;
        };
      };
      /**
       * `clientSecret` specifies a key of a Secret containing the OAuth2
       * client's secret.
       */
      clientSecret: {
        /**
         * The key of the secret to select from.  Must be a valid secret key.
         */
        key: string;
        /**
         * Name of the referent.
         * This field is effectively required, but due to backwards compatibility is
         * allowed to be empty. Instances of this type with an empty value here are
         * almost certainly wrong.
         * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
         */
        name?: string;
        /**
         * Specify whether the Secret or its key must be defined
         */
        optional?: boolean;
      };
      /**
       * `endpointParams` configures the HTTP parameters to append to the token
       * URL.
       */
      endpointParams?: {
        [k: string]: string;
      };
      /**
       * `noProxy` is a comma-separated string that can contain IPs, CIDR notation, domain names
       * that should be excluded from proxying. IP and domain names can
       * contain port numbers.
       *
       * It requires Prometheus >= v2.43.0 or Alertmanager >= 0.25.0.
       */
      noProxy?: string;
      /**
       * ProxyConnectHeader optionally specifies headers to send to
       * proxies during CONNECT requests.
       *
       * It requires Prometheus >= v2.43.0 or Alertmanager >= 0.25.0.
       */
      proxyConnectHeader?: {
        [k: string]: {
          /**
           * The key of the secret to select from.  Must be a valid secret key.
           */
          key: string;
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the Secret or its key must be defined
           */
          optional?: boolean;
        }[];
      };
      /**
       * Whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
       *
       * It requires Prometheus >= v2.43.0 or Alertmanager >= 0.25.0.
       */
      proxyFromEnvironment?: boolean;
      /**
       * `proxyURL` defines the HTTP proxy server to use.
       */
      proxyUrl?: string;
      /**
       * `scopes` defines the OAuth2 scopes used for the token request.
       */
      scopes?: string[];
      /**
       * TLS configuration to use when connecting to the OAuth2 server.
       * It requires Prometheus >= v2.43.0.
       */
      tlsConfig?: {
        /**
         * Certificate authority used when verifying server certificates.
         */
        ca?: {
          /**
           * ConfigMap containing data to use for the targets.
           */
          configMap?: {
            /**
             * The key to select.
             */
            key: string;
            /**
             * Name of the referent.
             * This field is effectively required, but due to backwards compatibility is
             * allowed to be empty. Instances of this type with an empty value here are
             * almost certainly wrong.
             * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
             */
            name?: string;
            /**
             * Specify whether the ConfigMap or its key must be defined
             */
            optional?: boolean;
          };
          /**
           * Secret containing data to use for the targets.
           */
          secret?: {
            /**
             * The key of the secret to select from.  Must be a valid secret key.
             */
            key: string;
            /**
             * Name of the referent.
             * This field is effectively required, but due to backwards compatibility is
             * allowed to be empty. Instances of this type with an empty value here are
             * almost certainly wrong.
             * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
             */
            name?: string;
            /**
             * Specify whether the Secret or its key must be defined
             */
            optional?: boolean;
          };
        };
        /**
         * Client certificate to present when doing client-authentication.
         */
        cert?: {
          /**
           * ConfigMap containing data to use for the targets.
           */
          configMap?: {
            /**
             * The key to select.
             */
            key: string;
            /**
             * Name of the referent.
             * This field is effectively required, but due to backwards compatibility is
             * allowed to be empty. Instances of this type with an empty value here are
             * almost certainly wrong.
             * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
             */
            name?: string;
            /**
             * Specify whether the ConfigMap or its key must be defined
             */
            optional?: boolean;
          };
          /**
           * Secret containing data to use for the targets.
           */
          secret?: {
            /**
             * The key of the secret to select from.  Must be a valid secret key.
             */
            key: string;
            /**
             * Name of the referent.
             * This field is effectively required, but due to backwards compatibility is
             * allowed to be empty. Instances of this type with an empty value here are
             * almost certainly wrong.
             * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
             */
            name?: string;
            /**
             * Specify whether the Secret or its key must be defined
             */
            optional?: boolean;
          };
        };
        /**
         * Disable target certificate validation.
         */
        insecureSkipVerify?: boolean;
        /**
         * Secret containing the client key file for the targets.
         */
        keySecret?: {
          /**
           * The key of the secret to select from.  Must be a valid secret key.
           */
          key: string;
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the Secret or its key must be defined
           */
          optional?: boolean;
        };
        /**
         * Maximum acceptable TLS version.
         *
         * It requires Prometheus >= v2.41.0.
         */
        maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
        /**
         * Minimum acceptable TLS version.
         *
         * It requires Prometheus >= v2.35.0.
         */
        minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
        /**
         * Used to verify the hostname for the targets.
         */
        serverName?: string;
      };
      /**
       * `tokenURL` configures the URL to fetch the token from.
       */
      tokenUrl: string;
    };

    /**
     * Specification for the prober to use for probing targets.
     * The prober.URL parameter is required. Targets cannot be probed if left empty.
     */
    prober?: {
      /**
       * Path to collect metrics from.
       * Defaults to `/probe`.
       */
      path?: string;
      /**
       * Optional ProxyURL.
       */
      proxyUrl?: string;
      /**
       * HTTP scheme to use for scraping.
       * `http` and `https` are the expected values unless you rewrite the `__scheme__` label via relabeling.
       * If empty, Prometheus uses the default value `http`.
       */
      scheme?: "http" | "https";
      /**
       * Mandatory URL of the prober.
       */
      url: string;
    };

    /**
     * SampleLimit defines per-scrape limit on number of scraped samples that will be accepted.
     */
    sampleLimit?: number;

    /**
     * The scrape class to apply.
     */
    scrapeClass?: string;

    /**
     * Whether to scrape a classic histogram that is also exposed as a native histogram.
     * It requires Prometheus >= v2.45.0.
     */
    scrapeClassicHistograms?: boolean;

    /**
     * `scrapeProtocols` defines the protocols to negotiate during a scrape. It tells clients the
     * protocols supported by Prometheus in order of preference (from most to least preferred).
     *
     * If unset, Prometheus uses its default value.
     *
     * It requires Prometheus >= v2.49.0.
     */
    scrapeProtocols?: (
      | "PrometheusProto"
      | "OpenMetricsText0.0.1"
      | "OpenMetricsText1.0.0"
      | "PrometheusText0.0.4"
      | "PrometheusText1.0.0"
    )[];

    /**
     * Timeout for scraping metrics from the Prometheus exporter.
     * If not specified, the Prometheus global scrape timeout is used.
     * The value cannot be greater than the scrape interval otherwise the operator will reject the resource.
     */
    scrapeTimeout?: string;

    /**
     * TargetLimit defines a limit on the number of scraped targets that will be accepted.
     */
    targetLimit?: number;

    /**
     * Targets defines a set of static or dynamically discovered targets to probe.
     */
    targets?: {
      /**
       * ingress defines the Ingress objects to probe and the relabeling
       * configuration.
       * If `staticConfig` is also defined, `staticConfig` takes precedence.
       */
      ingress?: {
        /**
         * From which namespaces to select Ingress objects.
         */
        namespaceSelector?: {
          /**
           * Boolean describing whether all namespaces are selected in contrast to a
           * list restricting them.
           */
          any?: boolean;
          /**
           * List of namespace names to select from.
           */
          matchNames?: string[];
        };
        /**
         * RelabelConfigs to apply to the label set of the target before it gets
         * scraped.
         * The original ingress address is available via the
         * `__tmp_prometheus_ingress_address` label. It can be used to customize the
         * probed URL.
         * The original scrape job's name is available via the `__tmp_prometheus_job_name` label.
         * More info: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config
         */
        relabelingConfigs?: {
          /**
           * Action to perform based on the regex matching.
           *
           * `Uppercase` and `Lowercase` actions require Prometheus >= v2.36.0.
           * `DropEqual` and `KeepEqual` actions require Prometheus >= v2.41.0.
           *
           * Default: "Replace"
           */
          action?:
            | "replace"
            | "Replace"
            | "keep"
            | "Keep"
            | "drop"
            | "Drop"
            | "hashmod"
            | "HashMod"
            | "labelmap"
            | "LabelMap"
            | "labeldrop"
            | "LabelDrop"
            | "labelkeep"
            | "LabelKeep"
            | "lowercase"
            | "Lowercase"
            | "uppercase"
            | "Uppercase"
            | "keepequal"
            | "KeepEqual"
            | "dropequal"
            | "DropEqual";
          /**
           * Modulus to take of the hash of the source label values.
           *
           * Only applicable when the action is `HashMod`.
           */
          modulus?: number;
          /**
           * Regular expression against which the extracted value is matched.
           */
          regex?: string;
          /**
           * Replacement value against which a Replace action is performed if the
           * regular expression matches.
           *
           * Regex capture groups are available.
           */
          replacement?: string;
          /**
           * Separator is the string between concatenated SourceLabels.
           */
          separator?: string;
          /**
           * The source labels select values from existing labels. Their content is
           * concatenated using the configured Separator and matched against the
           * configured regular expression.
           */
          sourceLabels?: string[];
          /**
           * Label to which the resulting string is written in a replacement.
           *
           * It is mandatory for `Replace`, `HashMod`, `Lowercase`, `Uppercase`,
           * `KeepEqual` and `DropEqual` actions.
           *
           * Regex capture groups are available.
           */
          targetLabel?: string;
        }[];
        /**
         * Selector to select the Ingress objects.
         */
        selector?: {
          /**
           * matchExpressions is a list of label selector requirements. The requirements are ANDed.
           */
          matchExpressions?: {
            /**
             * key is the label key that the selector applies to.
             */
            key: string;
            /**
             * operator represents a key's relationship to a set of values.
             * Valid operators are In, NotIn, Exists and DoesNotExist.
             */
            operator: string;
            /**
             * values is an array of string values. If the operator is In or NotIn,
             * the values array must be non-empty. If the operator is Exists or DoesNotExist,
             * the values array must be empty. This array is replaced during a strategic
             * merge patch.
             */
            values?: string[];
          }[];
          /**
           * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels
           * map is equivalent to an element of matchExpressions, whose key field is "key", the
           * operator is "In", and the values array contains only "value". The requirements are ANDed.
           */
          matchLabels?: {
            [k: string]: string;
          };
        };
      };
      /**
       * staticConfig defines the static list of targets to probe and the
       * relabeling configuration.
       * If `ingress` is also defined, `staticConfig` takes precedence.
       * More info: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#static_config.
       */
      staticConfig?: {
        /**
         * Labels assigned to all metrics scraped from the targets.
         */
        labels?: {
          [k: string]: string;
        };
        /**
         * RelabelConfigs to apply to the label set of the targets before it gets
         * scraped.
         * More info: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config
         */
        relabelingConfigs?: {
          /**
           * Action to perform based on the regex matching.
           *
           * `Uppercase` and `Lowercase` actions require Prometheus >= v2.36.0.
           * `DropEqual` and `KeepEqual` actions require Prometheus >= v2.41.0.
           *
           * Default: "Replace"
           */
          action?:
            | "replace"
            | "Replace"
            | "keep"
            | "Keep"
            | "drop"
            | "Drop"
            | "hashmod"
            | "HashMod"
            | "labelmap"
            | "LabelMap"
            | "labeldrop"
            | "LabelDrop"
            | "labelkeep"
            | "LabelKeep"
            | "lowercase"
            | "Lowercase"
            | "uppercase"
            | "Uppercase"
            | "keepequal"
            | "KeepEqual"
            | "dropequal"
            | "DropEqual";
          /**
           * Modulus to take of the hash of the source label values.
           *
           * Only applicable when the action is `HashMod`.
           */
          modulus?: number;
          /**
           * Regular expression against which the extracted value is matched.
           */
          regex?: string;
          /**
           * Replacement value against which a Replace action is performed if the
           * regular expression matches.
           *
           * Regex capture groups are available.
           */
          replacement?: string;
          /**
           * Separator is the string between concatenated SourceLabels.
           */
          separator?: string;
          /**
           * The source labels select values from existing labels. Their content is
           * concatenated using the configured Separator and matched against the
           * configured regular expression.
           */
          sourceLabels?: string[];
          /**
           * Label to which the resulting string is written in a replacement.
           *
           * It is mandatory for `Replace`, `HashMod`, `Lowercase`, `Uppercase`,
           * `KeepEqual` and `DropEqual` actions.
           *
           * Regex capture groups are available.
           */
          targetLabel?: string;
        }[];
        /**
         * The list of hosts to probe.
         */
        static?: string[];
      };
    };

    /**
     * TLS configuration to use when scraping the endpoint.
     */
    tlsConfig?: {
      /**
       * Certificate authority used when verifying server certificates.
       */
      ca?: {
        /**
         * ConfigMap containing data to use for the targets.
         */
        configMap?: {
          /**
           * The key to select.
           */
          key: string;
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the ConfigMap or its key must be defined
           */
          optional?: boolean;
        };
        /**
         * Secret containing data to use for the targets.
         */
        secret?: {
          /**
           * The key of the secret to select from.  Must be a valid secret key.
           */
          key: string;
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the Secret or its key must be defined
           */
          optional?: boolean;
        };
      };
      /**
       * Client certificate to present when doing client-authentication.
       */
      cert?: {
        /**
         * ConfigMap containing data to use for the targets.
         */
        configMap?: {
          /**
           * The key to select.
           */
          key: string;
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the ConfigMap or its key must be defined
           */
          optional?: boolean;
        };
        /**
         * Secret containing data to use for the targets.
         */
        secret?: {
          /**
           * The key of the secret to select from.  Must be a valid secret key.
           */
          key: string;
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the Secret or its key must be defined
           */
          optional?: boolean;
        };
      };
      /**
       * Disable target certificate validation.
       */
      insecureSkipVerify?: boolean;
      /**
       * Secret containing the client key file for the targets.
       */
      keySecret?: {
        /**
         * The key of the secret to select from.  Must be a valid secret key.
         */
        key: string;
        /**
         * Name of the referent.
         * This field is effectively required, but due to backwards compatibility is
         * allowed to be empty. Instances of this type with an empty value here are
         * almost certainly wrong.
         * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
         */
        name?: string;
        /**
         * Specify whether the Secret or its key must be defined
         */
        optional?: boolean;
      };
      /**
       * Maximum acceptable TLS version.
       *
       * It requires Prometheus >= v2.41.0.
       */
      maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
      /**
       * Minimum acceptable TLS version.
       *
       * It requires Prometheus >= v2.35.0.
       */
      minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
      /**
       * Used to verify the hostname for the targets.
       */
      serverName?: string;
    };
}

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The `Probe` custom resource definition (CRD) defines how to scrape metrics from prober exporters such as the [blackbox exporter](https://github.com/prometheus/blackbox_exporter).
 *
 * The `Probe` resource needs 2 pieces of information:
 * * The list of probed addresses which can be defined statically or by discovering Kubernetes Ingress objects.
 * * The prober which exposes the availability of probed endpoints (over various protocols such HTTP, TCP, ICMP, ...) as Prometheus metrics.
 *
 * `Prometheus` and `PrometheusAgent` objects select `Probe` objects using label and namespace selectors.
 */
export interface ProbeArgs {
  metadata: k8s.meta.v1.NamespacedObjectMeta;
  /**
   * Specification of desired Ingress selection for target discovery by Prometheus.
   */
  spec: ProbeSpec;
}

export class Probe extends NamespacedAPIResource {
    spec: ProbeSpec;

    constructor(args: ProbeArgs) {
        super('monitoring.coreos.com/v1', 'Probe', args.metadata);
        this.spec = args.spec;
    }
}
