import * as k8s from "@kubeframe/k8s";
import { NamespacedAPIResource } from "@kubeframe/k8s/base";

interface PodMonitorSpec {

    /**
     * `attachMetadata` defines additional metadata which is added to the
     * discovered targets.
     *
     * It requires Prometheus >= v2.35.0.
     */
    attachMetadata?: {
      /**
       * When set to true, Prometheus attaches node metadata to the discovered
       * targets.
       *
       * The Prometheus service account must have the `list` and `watch`
       * permissions on the `Nodes` objects.
       */
      node?: boolean;
    };

    /**
     * When defined, bodySizeLimit specifies a job level limit on the size
     * of uncompressed response body that will be accepted by Prometheus.
     *
     * It requires Prometheus >= v2.28.0.
     */
    bodySizeLimit?: string;

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
     * The label to use to retrieve the job name from.
     * `jobLabel` selects the label from the associated Kubernetes `Pod`
     * object which will be used as the `job` label for all metrics.
     *
     * For example if `jobLabel` is set to `foo` and the Kubernetes `Pod`
     * object is labeled with `foo: bar`, then Prometheus adds the `job="bar"`
     * label to all ingested metrics.
     *
     * If the value of this field is empty, the `job` label of the metrics
     * defaults to the namespace and name of the PodMonitor object (e.g. `<namespace>/<name>`).
     */
    jobLabel?: string;

    /**
     * Per-scrape limit on the number of targets dropped by relabeling
     * that will be kept in memory. 0 means no limit.
     *
     * It requires Prometheus >= v2.47.0.
     */
    keepDroppedTargets?: number;

    /**
     * Per-scrape limit on number of labels that will be accepted for a sample.
     *
     * It requires Prometheus >= v2.27.0.
     */
    labelLimit?: number;

    /**
     * Per-scrape limit on length of labels name that will be accepted for a sample.
     *
     * It requires Prometheus >= v2.27.0.
     */
    labelNameLengthLimit?: number;

    /**
     * Per-scrape limit on length of labels value that will be accepted for a sample.
     *
     * It requires Prometheus >= v2.27.0.
     */
    labelValueLengthLimit?: number;

    /**
     * `namespaceSelector` defines in which namespace(s) Prometheus should discover the pods.
     * By default, the pods are discovered in the same namespace as the `PodMonitor` object but it is possible to select pods across different/all namespaces.
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
     * Defines how to scrape metrics from the selected pods.
     */
    podMetricsEndpoints?: {
      /**
       * `authorization` configures the Authorization header credentials to use when
       * scraping the target.
       *
       * Cannot be set at the same time as `basicAuth`, or `oauth2`.
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
       * `basicAuth` configures the Basic Authentication credentials to use when
       * scraping the target.
       *
       * Cannot be set at the same time as `authorization`, or `oauth2`.
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
       * `bearerTokenSecret` specifies a key of a Secret containing the bearer
       * token for scraping targets. The secret needs to be in the same namespace
       * as the PodMonitor object and readable by the Prometheus Operator.
       *
       * Deprecated: use `authorization` instead.
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
       * `enableHttp2` can be used to disable HTTP2 when scraping the target.
       */
      enableHttp2?: boolean;
      /**
       * When true, the pods which are not running (e.g. either in Failed or
       * Succeeded state) are dropped during the target discovery.
       *
       * If unset, the filtering is enabled.
       *
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#pod-phase
       */
      filterRunning?: boolean;
      /**
       * `followRedirects` defines whether the scrape requests should follow HTTP
       * 3xx redirects.
       */
      followRedirects?: boolean;
      /**
       * When true, `honorLabels` preserves the metric's labels when they collide
       * with the target's labels.
       */
      honorLabels?: boolean;
      /**
       * `honorTimestamps` controls whether Prometheus preserves the timestamps
       * when exposed by the target.
       */
      honorTimestamps?: boolean;
      /**
       * Interval at which Prometheus scrapes the metrics from the target.
       *
       * If empty, Prometheus uses the global scrape interval.
       */
      interval?: string;
      /**
       * `metricRelabelings` configures the relabeling rules to apply to the
       * samples before ingestion.
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
       * `oauth2` configures the OAuth2 settings to use when scraping the target.
       *
       * It requires Prometheus >= 2.27.0.
       *
       * Cannot be set at the same time as `authorization`, or `basicAuth`.
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
       * `params` define optional HTTP URL parameters.
       */
      params?: {
        [k: string]: string[];
      };
      /**
       * HTTP path from which to scrape for metrics.
       *
       * If empty, Prometheus uses the default value (e.g. `/metrics`).
       */
      path?: string;
      /**
       * The `Pod` port name which exposes the endpoint.
       *
       * It takes precedence over the `portNumber` and `targetPort` fields.
       */
      port?: string;
      /**
       * The `Pod` port number which exposes the endpoint.
       */
      portNumber?: number;
      /**
       * `proxyURL` configures the HTTP Proxy URL (e.g.
       * "http://proxyserver:2195") to go through when scraping the target.
       */
      proxyUrl?: string;
      /**
       * `relabelings` configures the relabeling rules to apply the target's
       * metadata labels.
       *
       * The Operator automatically adds relabelings for a few standard Kubernetes fields.
       *
       * The original scrape job's name is available via the `__tmp_prometheus_job_name` label.
       *
       * More info: https://prometheus.io/docs/prometheus/latest/configuration/configuration/#relabel_config
       */
      relabelings?: {
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
       * HTTP scheme to use for scraping.
       *
       * `http` and `https` are the expected values unless you rewrite the
       * `__scheme__` label via relabeling.
       *
       * If empty, Prometheus uses the default value `http`.
       */
      scheme?: "http" | "https";
      /**
       * Timeout after which Prometheus considers the scrape to be failed.
       *
       * If empty, Prometheus uses the global scrape timeout unless it is less
       * than the target's scrape interval value in which the latter is used.
       * The value cannot be greater than the scrape interval otherwise the operator will reject the resource.
       */
      scrapeTimeout?: string;
      /**
       * Name or number of the target port of the `Pod` object behind the Service, the
       * port must be specified with container port property.
       *
       * Deprecated: use 'port' or 'portNumber' instead.
       */
      targetPort?: number | string;
      /**
       * TLS configuration to use when scraping the target.
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
       * `trackTimestampsStaleness` defines whether Prometheus tracks staleness of
       * the metrics that have an explicit timestamp present in scraped data.
       * Has no effect if `honorTimestamps` is false.
       *
       * It requires Prometheus >= v2.48.0.
       */
      trackTimestampsStaleness?: boolean;
    }[];

    /**
     * `podTargetLabels` defines the labels which are transferred from the
     * associated Kubernetes `Pod` object onto the ingested metrics.
     */
    podTargetLabels?: string[];

    /**
     * `sampleLimit` defines a per-scrape limit on the number of scraped samples
     * that will be accepted.
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
     * Label selector to select the Kubernetes `Pod` objects to scrape metrics from.
     */
    selector: {
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

    /**
     * Mechanism used to select the endpoints to scrape.
     * By default, the selection process relies on relabel configurations to filter the discovered targets.
     * Alternatively, you can opt in for role selectors, which may offer better efficiency in large clusters.
     * Which strategy is best for your use case needs to be carefully evaluated.
     *
     * It requires Prometheus >= v2.17.0.
     */
    selectorMechanism?: "RelabelConfig" | "RoleSelector";

    /**
     * `targetLimit` defines a limit on the number of scraped targets that will
     * be accepted.
     */
    targetLimit?: number;
}

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The `PodMonitor` custom resource definition (CRD) defines how `Prometheus` and `PrometheusAgent` can scrape metrics from a group of pods.
 * Among other things, it allows to specify:
 * * The pods to scrape via label selectors.
 * * The container ports to scrape.
 * * Authentication credentials to use.
 * * Target and metric relabeling.
 *
 * `Prometheus` and `PrometheusAgent` objects select `PodMonitor` objects using label and namespace selectors.
 */
export interface PodMonitorArgs {
  metadata: k8s.meta.v1.NamespacedObjectMeta;
  /**
   * Specification of desired Pod selection for target discovery by Prometheus.
   */
  spec: PodMonitorSpec;
}

export class PodMonitor extends NamespacedAPIResource {
    spec: PodMonitorSpec;

    constructor(args: PodMonitorArgs) {
        super('monitoring.coreos.com/v1', 'PodMonitor', args.metadata);
        this.spec = args.spec;
    }
}
