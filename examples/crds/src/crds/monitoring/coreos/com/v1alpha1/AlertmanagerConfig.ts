import { k8s, NamespacedAPIObject } from "@kubeframe/kubeframe-version";

interface AlertmanagerConfigSpec {

    /**
     * inhibitRules defines the list of inhibition rules. The rules will only apply to alerts matching
     * the resource's namespace.
     */
    inhibitRules?: {
      /**
       * equal defines labels that must have an equal value in the source and target alert
       * for the inhibition to take effect. This ensures related alerts are properly grouped.
       */
      equal?: string[];
      /**
       * sourceMatch defines matchers for which one or more alerts have to exist for the inhibition
       * to take effect. The operator enforces that the alert matches the resource's namespace.
       * These are the "trigger" alerts that cause other alerts to be inhibited.
       */
      sourceMatch?: {
        /**
         * matchType defines the match operation available with AlertManager >= v0.22.0.
         * Takes precedence over Regex (deprecated) if non-empty.
         * Valid values: "=" (equality), "!=" (inequality), "=~" (regex match), "!~" (regex non-match).
         */
        matchType?: "!=" | "=" | "=~" | "!~";
        /**
         * name defines the label to match.
         * This specifies which alert label should be evaluated.
         */
        name: string;
        /**
         * regex defines whether to match on equality (false) or regular-expression (true).
         * Deprecated: for AlertManager >= v0.22.0, `matchType` should be used instead.
         */
        regex?: boolean;
        /**
         * value defines the label value to match.
         * This is the expected value for the specified label.
         */
        value?: string;
      }[];
      /**
       * targetMatch defines matchers that have to be fulfilled in the alerts to be muted.
       * The operator enforces that the alert matches the resource's namespace.
       * When these conditions are met, matching alerts will be inhibited (silenced).
       */
      targetMatch?: {
        /**
         * matchType defines the match operation available with AlertManager >= v0.22.0.
         * Takes precedence over Regex (deprecated) if non-empty.
         * Valid values: "=" (equality), "!=" (inequality), "=~" (regex match), "!~" (regex non-match).
         */
        matchType?: "!=" | "=" | "=~" | "!~";
        /**
         * name defines the label to match.
         * This specifies which alert label should be evaluated.
         */
        name: string;
        /**
         * regex defines whether to match on equality (false) or regular-expression (true).
         * Deprecated: for AlertManager >= v0.22.0, `matchType` should be used instead.
         */
        regex?: boolean;
        /**
         * value defines the label value to match.
         * This is the expected value for the specified label.
         */
        value?: string;
      }[];
    }[];

    /**
     * muteTimeIntervals defines the list of MuteTimeInterval specifying when the routes should be muted.
     */
    muteTimeIntervals?: {
      /**
       * name of the time interval
       */
      name: string;
      /**
       * timeIntervals defines a list of TimeInterval
       */
      timeIntervals?: {
        /**
         * daysOfMonth defines a list of DayOfMonthRange
         */
        daysOfMonth?: {
          /**
           * end of the inclusive range
           */
          end?: number;
          /**
           * start of the inclusive range
           */
          start?: number;
        }[];
        /**
         * months defines a list of MonthRange
         */
        months?: string[];
        /**
         * times defines a list of TimeRange
         */
        times?: {
          /**
           * endTime defines the end time in 24hr format.
           */
          endTime?: string;
          /**
           * startTime defines the start time in 24hr format.
           */
          startTime?: string;
        }[];
        /**
         * weekdays defines a list of WeekdayRange
         */
        weekdays?: string[];
        /**
         * years defines a list of YearRange
         */
        years?: string[];
      }[];
    }[];

    /**
     * receivers defines the list of receivers.
     */
    receivers?: {
      /**
       * discordConfigs defines the list of Slack configurations.
       */
      discordConfigs?: {
        /**
         * apiURL defines the secret's key that contains the Discord webhook URL.
         * The secret needs to be in the same namespace as the AlertmanagerConfig
         * object and accessible by the Prometheus Operator.
         */
        apiURL: {
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
         * avatarURL defines the avatar url of the message sender.
         */
        avatarURL?: string;
        /**
         * content defines the template of the content's body.
         */
        content?: string;
        /**
         * httpConfig defines the HTTP client configuration.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * message defines the template of the message's body.
         */
        message?: string;
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
        /**
         * title defines the template of the message's title.
         */
        title?: string;
        /**
         * username defines the username of the message sender.
         */
        username?: string;
      }[];
      /**
       * emailConfigs defines the list of Email configurations.
       */
      emailConfigs?: {
        /**
         * authIdentity defines the identity to use for SMTP authentication.
         * This is typically used with PLAIN authentication mechanism.
         */
        authIdentity?: string;
        /**
         * authPassword defines the secret's key that contains the password to use for authentication.
         * The secret needs to be in the same namespace as the AlertmanagerConfig
         * object and accessible by the Prometheus Operator.
         */
        authPassword?: {
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
         * authSecret defines the secret's key that contains the CRAM-MD5 secret.
         * This is used for CRAM-MD5 authentication mechanism.
         * The secret needs to be in the same namespace as the AlertmanagerConfig
         * object and accessible by the Prometheus Operator.
         */
        authSecret?: {
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
         * authUsername defines the username to use for SMTP authentication.
         * This is used for SMTP AUTH when the server requires authentication.
         */
        authUsername?: string;
        /**
         * from defines the sender address for email notifications.
         * This appears as the "From" field in the email header.
         */
        from?: string;
        /**
         * headers defines additional email header key/value pairs.
         * These override any headers previously set by the notification implementation.
         */
        headers?: {
          /**
           * key defines the key of the tuple.
           * This is the identifier or name part of the key-value pair.
           */
          key: string;
          /**
           * value defines the value of the tuple.
           * This is the data or content associated with the key.
           */
          value: string;
        }[];
        /**
         * hello defines the hostname to identify to the SMTP server.
         * This is used in the SMTP HELO/EHLO command during the connection handshake.
         */
        hello?: string;
        /**
         * html defines the HTML body of the email notification.
         * This allows for rich formatting in the email content.
         */
        html?: string;
        /**
         * requireTLS defines the SMTP TLS requirement.
         * Note that Go does not support unencrypted connections to remote SMTP endpoints.
         */
        requireTLS?: boolean;
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
        /**
         * smarthost defines the SMTP host and port through which emails are sent.
         * Format should be "hostname:port", e.g. "smtp.example.com:587".
         */
        smarthost?: string;
        /**
         * text defines the plain text body of the email notification.
         * This provides a fallback for email clients that don't support HTML.
         */
        text?: string;
        /**
         * tlsConfig defines the TLS configuration for SMTP connections.
         * This includes settings for certificates, CA validation, and TLS protocol options.
         */
        tlsConfig?: {
          /**
           * ca defines the Certificate authority used when verifying server certificates.
           */
          ca?: {
            /**
             * configMap defines the ConfigMap containing data to use for the targets.
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
             * secret defines the Secret containing data to use for the targets.
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
           * cert defines the Client certificate to present when doing client-authentication.
           */
          cert?: {
            /**
             * configMap defines the ConfigMap containing data to use for the targets.
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
             * secret defines the Secret containing data to use for the targets.
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
           * insecureSkipVerify defines how to disable target certificate validation.
           */
          insecureSkipVerify?: boolean;
          /**
           * keySecret defines the Secret containing the client key file for the targets.
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
           * maxVersion defines the maximum acceptable TLS version.
           *
           * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
           */
          maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
          /**
           * minVersion defines the minimum acceptable TLS version.
           *
           * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
           */
          minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
          /**
           * serverName is used to verify the hostname for the targets.
           */
          serverName?: string;
        };
        /**
         * to defines the email address to send notifications to.
         * This is the recipient address for alert notifications.
         */
        to?: string;
      }[];
      /**
       * msteamsConfigs defines the list of MSTeams configurations.
       * It requires Alertmanager >= 0.26.0.
       */
      msteamsConfigs?: {
        /**
         * httpConfig defines the HTTP client configuration for Teams webhook requests.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
        /**
         * summary defines the message summary template for Teams notifications.
         * This provides a brief overview that appears in Teams notification previews.
         * It requires Alertmanager >= 0.27.0.
         */
        summary?: string;
        /**
         * text defines the message body template for Teams notifications.
         * This contains the detailed content of the Teams message.
         */
        text?: string;
        /**
         * title defines the message title template for Teams notifications.
         * This appears as the main heading of the Teams message card.
         */
        title?: string;
        /**
         * webhookUrl defines the MSTeams webhook URL for sending notifications.
         * This is the incoming webhook URL configured in your Teams channel.
         */
        webhookUrl: {
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
      }[];
      /**
       * msteamsv2Configs defines the list of MSTeamsV2 configurations.
       * It requires Alertmanager >= 0.28.0.
       */
      msteamsv2Configs?: {
        /**
         * httpConfig defines the HTTP client configuration for Teams webhook requests.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
        /**
         * text defines the message body template for adaptive card notifications.
         * This contains the detailed content displayed in the Teams adaptive card format.
         */
        text?: string;
        /**
         * title defines the message title template for adaptive card notifications.
         * This appears as the main heading in the Teams adaptive card.
         */
        title?: string;
        /**
         * webhookURL defines the MSTeams incoming webhook URL for adaptive card notifications.
         * This webhook must support the newer adaptive cards format required by Teams flows.
         */
        webhookURL?: {
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
      }[];
      /**
       * name defines the name of the receiver. Must be unique across all items from the list.
       */
      name: string;
      /**
       * opsgenieConfigs defines the list of OpsGenie configurations.
       */
      opsgenieConfigs?: {
        /**
         * actions defines a comma separated list of actions that will be available for the alert.
         * These appear as action buttons in the OpsGenie interface.
         */
        actions?: string;
        /**
         * apiKey defines the secret's key that contains the OpsGenie API key.
         * The secret needs to be in the same namespace as the AlertmanagerConfig
         * object and accessible by the Prometheus Operator.
         */
        apiKey?: {
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
         * apiURL defines the URL to send OpsGenie API requests to.
         * When not specified, defaults to the standard OpsGenie API endpoint.
         */
        apiURL?: string;
        /**
         * description defines the detailed description of the incident.
         * This provides additional context beyond the message field.
         */
        description?: string;
        /**
         * details defines a set of arbitrary key/value pairs that provide further detail about the incident.
         * These appear as additional fields in the OpsGenie alert.
         */
        details?: {
          /**
           * key defines the key of the tuple.
           * This is the identifier or name part of the key-value pair.
           */
          key: string;
          /**
           * value defines the value of the tuple.
           * This is the data or content associated with the key.
           */
          value: string;
        }[];
        /**
         * entity defines an optional field that can be used to specify which domain alert is related to.
         * This helps group related alerts together in OpsGenie.
         */
        entity?: string;
        /**
         * httpConfig defines the HTTP client configuration for OpsGenie API requests.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * message defines the alert text limited to 130 characters.
         * This appears as the main alert title in OpsGenie.
         */
        message?: string;
        /**
         * note defines an additional alert note.
         * This provides supplementary information about the alert.
         */
        note?: string;
        /**
         * priority defines the priority level of alert.
         * Possible values are P1, P2, P3, P4, and P5, where P1 is highest priority.
         */
        priority?: string;
        /**
         * responders defines the list of responders responsible for notifications.
         * These determine who gets notified when the alert is created.
         */
        responders?: {
          /**
           * id defines the unique identifier of the responder.
           * This corresponds to the responder's ID within OpsGenie.
           */
          id?: string;
          /**
           * name defines the display name of the responder.
           * This is used when the responder is identified by name rather than ID.
           */
          name?: string;
          /**
           * type defines the type of responder.
           * Valid values include "user", "team", "schedule", and "escalation".
           * This determines how OpsGenie interprets the other identifier fields.
           */
          type: "team" | "teams" | "user" | "escalation" | "schedule";
          /**
           * username defines the username of the responder.
           * This is typically used for user-type responders when identifying by username.
           */
          username?: string;
        }[];
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
        /**
         * source defines the backlink to the sender of the notification.
         * This helps identify where the alert originated from.
         */
        source?: string;
        /**
         * tags defines a comma separated list of tags attached to the notifications.
         * These help categorize and filter alerts within OpsGenie.
         */
        tags?: string;
        /**
         * updateAlerts defines Whether to update message and description of the alert in OpsGenie if it already exists
         * By default, the alert is never updated in OpsGenie, the new message only appears in activity log.
         */
        updateAlerts?: boolean;
      }[];
      /**
       * pagerdutyConfigs defines the List of PagerDuty configurations.
       */
      pagerdutyConfigs?: {
        /**
         * class defines the class/type of the event.
         */
        class?: string;
        /**
         * client defines the client identification.
         */
        client?: string;
        /**
         * clientURL defines the backlink to the sender of notification.
         */
        clientURL?: string;
        /**
         * component defines the part or component of the affected system that is broken.
         */
        component?: string;
        /**
         * description of the incident.
         */
        description?: string;
        /**
         * details defines the arbitrary key/value pairs that provide further detail about the incident.
         */
        details?: {
          /**
           * key defines the key of the tuple.
           * This is the identifier or name part of the key-value pair.
           */
          key: string;
          /**
           * value defines the value of the tuple.
           * This is the data or content associated with the key.
           */
          value: string;
        }[];
        /**
         * group defines a cluster or grouping of sources.
         */
        group?: string;
        /**
         * httpConfig defines the HTTP client configuration.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * pagerDutyImageConfigs defines a list of image details to attach that provide further detail about an incident.
         */
        pagerDutyImageConfigs?: {
          /**
           * alt is the optional alternative text for the image.
           */
          alt?: string;
          /**
           * href defines the optional URL; makes the image a clickable link.
           */
          href?: string;
          /**
           * src of the image being attached to the incident
           */
          src?: string;
        }[];
        /**
         * pagerDutyLinkConfigs defines a list of link details to attach that provide further detail about an incident.
         */
        pagerDutyLinkConfigs?: {
          /**
           * alt defines the text that describes the purpose of the link, and can be used as the link's text.
           */
          alt?: string;
          /**
           * href defines the URL of the link to be attached
           */
          href?: string;
        }[];
        /**
         * routingKey defines the secret's key that contains the PagerDuty integration key (when using
         * Events API v2). Either this field or `serviceKey` needs to be defined.
         * The secret needs to be in the same namespace as the AlertmanagerConfig
         * object and accessible by the Prometheus Operator.
         */
        routingKey?: {
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
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
        /**
         * serviceKey defines the secret's key that contains the PagerDuty service key (when using
         * integration type "Prometheus"). Either this field or `routingKey` needs to
         * be defined.
         * The secret needs to be in the same namespace as the AlertmanagerConfig
         * object and accessible by the Prometheus Operator.
         */
        serviceKey?: {
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
         * severity of the incident.
         */
        severity?: string;
        /**
         * source defines the unique location of the affected system.
         */
        source?: string;
        /**
         * url defines the URL to send requests to.
         */
        url?: string;
      }[];
      /**
       * pushoverConfigs defines the list of Pushover configurations.
       */
      pushoverConfigs?: {
        /**
         * device defines the name of a specific device to send the notification to.
         * If not specified, the notification is sent to all user's devices.
         */
        device?: string;
        /**
         * expire defines how long your notification will continue to be retried for,
         * unless the user acknowledges the notification. Only applies to priority 2 notifications.
         */
        expire?: string;
        /**
         * html defines whether notification message is HTML or plain text.
         * When true, the message can include HTML formatting tags.
         */
        html?: boolean;
        /**
         * httpConfig defines the HTTP client configuration for Pushover API requests.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * message defines the notification message content.
         * This is the main body text of the Pushover notification.
         */
        message?: string;
        /**
         * priority defines the notification priority level.
         * See https://pushover.net/api#priority for valid values and behavior.
         */
        priority?: string;
        /**
         * retry defines how often the Pushover servers will send the same notification to the user.
         * Must be at least 30 seconds. Only applies to priority 2 notifications.
         */
        retry?: string;
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
        /**
         * sound defines the name of one of the sounds supported by device clients.
         * This overrides the user's default sound choice for this notification.
         */
        sound?: string;
        /**
         * title defines the notification title displayed in the Pushover message.
         * This appears as the bold header text in the notification.
         */
        title?: string;
        /**
         * token defines the secret's key that contains the registered application's API token.
         * See https://pushover.net/apps for application registration.
         * The secret needs to be in the same namespace as the AlertmanagerConfig
         * object and accessible by the Prometheus Operator.
         * Either `token` or `tokenFile` is required.
         */
        token?: {
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
         * tokenFile defines the token file that contains the registered application's API token.
         * See https://pushover.net/apps for application registration.
         * Either `token` or `tokenFile` is required.
         * It requires Alertmanager >= v0.26.0.
         */
        tokenFile?: string;
        /**
         * ttl defines the time to live for the alert notification.
         * This determines how long the notification remains active before expiring.
         */
        ttl?: string;
        /**
         * url defines a supplementary URL shown alongside the message.
         * This creates a clickable link within the Pushover notification.
         */
        url?: string;
        /**
         * urlTitle defines a title for the supplementary URL.
         * If not specified, the raw URL is shown instead.
         */
        urlTitle?: string;
        /**
         * userKey defines the secret's key that contains the recipient user's user key.
         * The secret needs to be in the same namespace as the AlertmanagerConfig
         * object and accessible by the Prometheus Operator.
         * Either `userKey` or `userKeyFile` is required.
         */
        userKey?: {
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
         * userKeyFile defines the user key file that contains the recipient user's user key.
         * Either `userKey` or `userKeyFile` is required.
         * It requires Alertmanager >= v0.26.0.
         */
        userKeyFile?: string;
      }[];
      /**
       * rocketchatConfigs defines the list of RocketChat configurations.
       * It requires Alertmanager >= 0.28.0.
       */
      rocketchatConfigs?: {
        /**
         * actions defines interactive actions to include in the message.
         * These appear as buttons that users can click to trigger responses.
         *
         * @minItems 1
         */
        actions?: [
          {
            /**
             * msg defines the message to send when the button is clicked.
             * This allows the button to post a predefined message to the channel.
             */
            msg?: string;
            /**
             * text defines the button text displayed to users.
             * This is the label that appears on the interactive button.
             */
            text?: string;
            /**
             * url defines the URL the button links to when clicked.
             * This creates a clickable button that opens the specified URL.
             */
            url?: string;
          },
          ...{
            /**
             * msg defines the message to send when the button is clicked.
             * This allows the button to post a predefined message to the channel.
             */
            msg?: string;
            /**
             * text defines the button text displayed to users.
             * This is the label that appears on the interactive button.
             */
            text?: string;
            /**
             * url defines the URL the button links to when clicked.
             * This creates a clickable button that opens the specified URL.
             */
            url?: string;
          }[]
        ];
        /**
         * apiURL defines the API URL for RocketChat.
         * Defaults to https://open.rocket.chat/ if not specified.
         */
        apiURL?: string;
        /**
         * channel defines the channel to send alerts to.
         * This can be a channel name (e.g., "#alerts") or a direct message recipient.
         */
        channel?: string;
        /**
         * color defines the message color displayed in RocketChat.
         * This appears as a colored bar alongside the message.
         */
        color?: string;
        /**
         * emoji defines the emoji to be displayed as an avatar.
         * If provided, this emoji will be used instead of the default avatar or iconURL.
         */
        emoji?: string;
        /**
         * fields defines additional fields for the message attachment.
         * These appear as structured key-value pairs within the message.
         *
         * @minItems 1
         */
        fields?: [
          {
            /**
             * short defines whether this field should be a short field.
             * When true, the field may be displayed inline with other short fields to save space.
             */
            short?: boolean;
            /**
             * title defines the title of this field.
             * This appears as bold text labeling the field content.
             */
            title?: string;
            /**
             * value defines the value of this field, displayed underneath the title.
             * This contains the actual data or content for the field.
             */
            value?: string;
          },
          ...{
            /**
             * short defines whether this field should be a short field.
             * When true, the field may be displayed inline with other short fields to save space.
             */
            short?: boolean;
            /**
             * title defines the title of this field.
             * This appears as bold text labeling the field content.
             */
            title?: string;
            /**
             * value defines the value of this field, displayed underneath the title.
             * This contains the actual data or content for the field.
             */
            value?: string;
          }[]
        ];
        /**
         * httpConfig defines the HTTP client configuration for RocketChat API requests.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * iconURL defines the icon URL for the message avatar.
         * This displays a custom image as the message sender's avatar.
         */
        iconURL?: string;
        /**
         * imageURL defines the image URL to display within the message.
         * This embeds an image directly in the message attachment.
         */
        imageURL?: string;
        /**
         * linkNames defines whether to enable automatic linking of usernames and channels.
         * When true, @username and #channel references become clickable links.
         */
        linkNames?: boolean;
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
        /**
         * shortFields defines whether to use short fields in the message layout.
         * When true, fields may be displayed side by side to save space.
         */
        shortFields?: boolean;
        /**
         * text defines the message text to send.
         * This is optional because attachments can be used instead of or alongside text.
         */
        text?: string;
        /**
         * thumbURL defines the thumbnail URL for the message.
         * This displays a small thumbnail image alongside the message content.
         */
        thumbURL?: string;
        /**
         * title defines the message title displayed prominently in the message.
         * This appears as bold text at the top of the message attachment.
         */
        title?: string;
        /**
         * titleLink defines the URL that the title will link to when clicked.
         * This makes the message title clickable in the RocketChat interface.
         */
        titleLink?: string;
        /**
         * token defines the sender token for RocketChat authentication.
         * This is the personal access token or bot token used to authenticate API requests.
         */
        token: {
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
         * tokenID defines the sender token ID for RocketChat authentication.
         * This is the user ID associated with the token used for API requests.
         */
        tokenID: {
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
      }[];
      /**
       * slackConfigs defines the list of Slack configurations.
       */
      slackConfigs?: {
        /**
         * actions defines a list of Slack actions that are sent with each notification.
         */
        actions?: {
          /**
           * confirm defines an optional confirmation dialog that appears before the action is executed.
           * When set, users must confirm their intent before the action proceeds.
           */
          confirm?: {
            /**
             * dismissText defines the label for the cancel button in the dialog.
             * When not specified, defaults to "Cancel". This button cancels the action.
             */
            dismissText?: string;
            /**
             * okText defines the label for the confirmation button in the dialog.
             * When not specified, defaults to "Okay". This button proceeds with the action.
             */
            okText?: string;
            /**
             * text defines the main message displayed in the confirmation dialog.
             * This should be a clear question or statement asking the user to confirm their action.
             */
            text: string;
            /**
             * title defines the title text displayed at the top of the confirmation dialog.
             * When not specified, a default title will be used.
             */
            title?: string;
          };
          /**
           * name defines a unique identifier for the action within the message.
           * This value is sent back to your application when the action is triggered.
           */
          name?: string;
          /**
           * style defines the visual appearance of the action element.
           * Valid values include "default", "primary" (green), and "danger" (red).
           */
          style?: string;
          /**
           * text defines the user-visible label displayed on the action element.
           * For buttons, this is the button text. For select menus, this is the placeholder text.
           */
          text: string;
          /**
           * type defines the type of interactive component.
           * Common values include "button" for clickable buttons and "select" for dropdown menus.
           */
          type: string;
          /**
           * url defines the URL to open when the action is triggered.
           * Only applicable for button-type actions. When set, clicking the button opens this URL.
           */
          url?: string;
          /**
           * value defines the payload sent when the action is triggered.
           * This data is included in the callback sent to your application.
           */
          value?: string;
        }[];
        /**
         * apiURL defines the secret's key that contains the Slack webhook URL.
         * The secret needs to be in the same namespace as the AlertmanagerConfig
         * object and accessible by the Prometheus Operator.
         */
        apiURL?: {
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
         * callbackId defines an identifier for the message used in interactive components.
         */
        callbackId?: string;
        /**
         * channel defines the channel or user to send notifications to.
         */
        channel?: string;
        /**
         * color defines the color of the left border of the Slack message attachment.
         * Can be a hex color code (e.g., "#ff0000") or a predefined color name.
         */
        color?: string;
        /**
         * fallback defines a plain-text summary of the attachment for clients that don't support attachments.
         */
        fallback?: string;
        /**
         * fields defines a list of Slack fields that are sent with each notification.
         */
        fields?: {
          /**
           * short determines whether this field can be displayed alongside other short fields.
           * When true, Slack may display this field side by side with other short fields.
           * When false or not specified, the field takes the full width of the message.
           */
          short?: boolean;
          /**
           * title defines the label or header text displayed for this field.
           * This appears as bold text above the field value in the Slack message.
           */
          title: string;
          /**
           * value defines the content or data displayed for this field.
           * This appears below the title and can contain plain text or Slack markdown.
           */
          value: string;
        }[];
        /**
         * footer defines small text displayed at the bottom of the message attachment.
         */
        footer?: string;
        /**
         * httpConfig defines the HTTP client configuration.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * iconEmoji defines the emoji to use as the bot's avatar (e.g., ":ghost:").
         */
        iconEmoji?: string;
        /**
         * iconURL defines the URL to an image to use as the bot's avatar.
         */
        iconURL?: string;
        /**
         * imageURL defines the URL to an image file that will be displayed inside the message attachment.
         */
        imageURL?: string;
        /**
         * linkNames enables automatic linking of channel names and usernames in the message.
         * When true, @channel and @username will be converted to clickable links.
         */
        linkNames?: boolean;
        /**
         * mrkdwnIn defines which fields should be parsed as Slack markdown.
         * Valid values include "pretext", "text", and "fields".
         */
        mrkdwnIn?: string[];
        /**
         * pretext defines optional text that appears above the message attachment block.
         */
        pretext?: string;
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
        /**
         * shortFields determines whether fields are displayed in a compact format.
         * When true, fields are shown side by side when possible.
         */
        shortFields?: boolean;
        /**
         * text defines the main text content of the Slack message attachment.
         */
        text?: string;
        /**
         * thumbURL defines the URL to an image file that will be displayed as a thumbnail
         * on the right side of the message attachment.
         */
        thumbURL?: string;
        /**
         * title defines the title text displayed in the Slack message attachment.
         */
        title?: string;
        /**
         * titleLink defines the URL that the title will link to when clicked.
         */
        titleLink?: string;
        /**
         * username defines the slack bot user name.
         */
        username?: string;
      }[];
      /**
       * snsConfigs defines the list of SNS configurations
       */
      snsConfigs?: {
        /**
         * apiURL defines the SNS API URL, e.g. https://sns.us-east-2.amazonaws.com.
         * If not specified, the SNS API URL from the SNS SDK will be used.
         */
        apiURL?: string;
        /**
         * attributes defines SNS message attributes as key-value pairs.
         * These provide additional metadata that can be used for message filtering and routing.
         */
        attributes?: {
          [k: string]: string;
        };
        /**
         * httpConfig defines the HTTP client configuration for SNS API requests.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * message defines the message content of the SNS notification.
         * This is the actual notification text that will be sent to subscribers.
         */
        message?: string;
        /**
         * phoneNumber defines the phone number if message is delivered via SMS in E.164 format.
         * If you don't specify this value, you must specify a value for the TopicARN or TargetARN.
         */
        phoneNumber?: string;
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
        /**
         * sigv4 configures AWS's Signature Verification 4 signing process to sign requests.
         * This includes AWS credentials and region configuration for authentication.
         */
        sigv4?: {
          /**
           * accessKey defines the AWS API key. If not specified, the environment variable
           * `AWS_ACCESS_KEY_ID` is used.
           */
          accessKey?: {
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
           * profile defines the named AWS profile used to authenticate.
           */
          profile?: string;
          /**
           * region defines the AWS region. If blank, the region from the default credentials chain used.
           */
          region?: string;
          /**
           * roleArn defines the named AWS profile used to authenticate.
           */
          roleArn?: string;
          /**
           * secretKey defines the AWS API secret. If not specified, the environment
           * variable `AWS_SECRET_ACCESS_KEY` is used.
           */
          secretKey?: {
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
           * useFIPSSTSEndpoint defines FIPS mode for AWS STS endpoint.
           * It requires Prometheus >= v2.54.0.
           */
          useFIPSSTSEndpoint?: boolean;
        };
        /**
         * subject defines the subject line when the message is delivered to email endpoints.
         * This field is only used when sending to email subscribers of an SNS topic.
         */
        subject?: string;
        /**
         * targetARN defines the mobile platform endpoint ARN if message is delivered via mobile notifications.
         * If you don't specify this value, you must specify a value for the TopicARN or PhoneNumber.
         */
        targetARN?: string;
        /**
         * topicARN defines the SNS topic ARN, e.g. arn:aws:sns:us-east-2:698519295917:My-Topic.
         * If you don't specify this value, you must specify a value for the PhoneNumber or TargetARN.
         */
        topicARN?: string;
      }[];
      /**
       * telegramConfigs defines the list of Telegram configurations.
       */
      telegramConfigs?: {
        /**
         * apiURL defines the Telegram API URL, e.g. https://api.telegram.org.
         * If not specified, the default Telegram API URL will be used.
         */
        apiURL?: string;
        /**
         * botToken defines the Telegram bot token. It is mutually exclusive with `botTokenFile`.
         * The secret needs to be in the same namespace as the AlertmanagerConfig
         * object and accessible by the Prometheus Operator.
         * Either `botToken` or `botTokenFile` is required.
         */
        botToken?: {
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
         * botTokenFile defines the file to read the Telegram bot token from.
         * It is mutually exclusive with `botToken`.
         * Either `botToken` or `botTokenFile` is required.
         * It requires Alertmanager >= v0.26.0.
         */
        botTokenFile?: string;
        /**
         * chatID defines the Telegram chat ID where messages will be sent.
         * This can be a user ID, group ID, or channel ID (with @ prefix for public channels).
         */
        chatID: number;
        /**
         * disableNotifications controls whether Telegram notifications are sent silently.
         * When true, users will receive the message without notification sounds.
         */
        disableNotifications?: boolean;
        /**
         * httpConfig defines the HTTP client configuration for Telegram API requests.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * message defines the message template for the Telegram notification.
         * This is the content that will be sent to the specified chat.
         */
        message?: string;
        /**
         * messageThreadID defines the Telegram Group Topic ID for threaded messages.
         * This allows sending messages to specific topics within Telegram groups.
         * It requires Alertmanager >= 0.26.0.
         */
        messageThreadID?: number;
        /**
         * parseMode defines the parse mode for telegram message formatting.
         * Valid values are "MarkdownV2", "Markdown", and "HTML".
         * This determines how text formatting is interpreted in the message.
         */
        parseMode?: "MarkdownV2" | "Markdown" | "HTML";
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
      }[];
      /**
       * victoropsConfigs defines the list of VictorOps configurations.
       */
      victoropsConfigs?: {
        /**
         * apiKey defines the secret's key that contains the API key to use when talking to the VictorOps API.
         * The secret needs to be in the same namespace as the AlertmanagerConfig
         * object and accessible by the Prometheus Operator.
         */
        apiKey?: {
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
         * apiUrl defines the VictorOps API URL.
         * When not specified, defaults to the standard VictorOps API endpoint.
         */
        apiUrl?: string;
        /**
         * customFields defines additional custom fields for notification.
         * These provide extra metadata that will be included with the VictorOps incident.
         */
        customFields?: {
          /**
           * key defines the key of the tuple.
           * This is the identifier or name part of the key-value pair.
           */
          key: string;
          /**
           * value defines the value of the tuple.
           * This is the data or content associated with the key.
           */
          value: string;
        }[];
        /**
         * entityDisplayName contains a summary of the alerted problem.
         * This appears as the main title or identifier for the incident.
         */
        entityDisplayName?: string;
        /**
         * httpConfig defines the HTTP client's configuration for VictorOps API requests.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * messageType describes the behavior of the alert.
         * Valid values are "CRITICAL", "WARNING", and "INFO".
         */
        messageType?: string;
        /**
         * monitoringTool defines the monitoring tool the state message is from.
         * This helps identify the source system that generated the alert.
         */
        monitoringTool?: string;
        /**
         * routingKey defines a key used to map the alert to a team.
         * This determines which VictorOps team will receive the alert notification.
         */
        routingKey?: string;
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
        /**
         * stateMessage contains a long explanation of the alerted problem.
         * This provides detailed context about the incident.
         */
        stateMessage?: string;
      }[];
      /**
       * webexConfigs defines the list of Webex configurations.
       */
      webexConfigs?: {
        /**
         * apiURL defines the Webex Teams API URL i.e. https://webexapis.com/v1/messages
         */
        apiURL?: string;
        /**
         * httpConfig defines the HTTP client's configuration.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * message defines the message template
         */
        message?: string;
        /**
         * roomID defines the ID of the Webex Teams room where to send the messages.
         */
        roomID: string;
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
      }[];
      /**
       * webhookConfigs defines the List of webhook configurations.
       */
      webhookConfigs?: {
        /**
         * httpConfig defines the HTTP client configuration for webhook requests.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * maxAlerts defines the maximum number of alerts to be sent per webhook message.
         * When 0, all alerts are included in the webhook payload.
         */
        maxAlerts?: number;
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
        /**
         * timeout defines the maximum time to wait for a webhook request to complete,
         * before failing the request and allowing it to be retried.
         * It requires Alertmanager >= v0.28.0.
         */
        timeout?: string;
        /**
         * url defines the URL to send HTTP POST requests to.
         * urlSecret takes precedence over url. One of urlSecret and url should be defined.
         */
        url?: string;
        /**
         * urlSecret defines the secret's key that contains the webhook URL to send HTTP requests to.
         * urlSecret takes precedence over url. One of urlSecret and url should be defined.
         * The secret needs to be in the same namespace as the AlertmanagerConfig
         * object and accessible by the Prometheus Operator.
         */
        urlSecret?: {
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
      }[];
      /**
       * wechatConfigs defines the list of WeChat configurations.
       */
      wechatConfigs?: {
        /**
         * agentID defines the application agent ID within WeChat Work.
         * This identifies which WeChat Work application will send the notifications.
         */
        agentID?: string;
        /**
         * apiSecret defines the secret's key that contains the WeChat API key.
         * The secret needs to be in the same namespace as the AlertmanagerConfig
         * object and accessible by the Prometheus Operator.
         */
        apiSecret?: {
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
         * apiURL defines the WeChat API URL.
         * When not specified, defaults to the standard WeChat Work API endpoint.
         */
        apiURL?: string;
        /**
         * corpID defines the corp id for authentication.
         * This is the unique identifier for your WeChat Work organization.
         */
        corpID?: string;
        /**
         * httpConfig defines the HTTP client configuration for WeChat API requests.
         */
        httpConfig?: {
          /**
           * authorization defines the authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
           */
          authorization?: {
            /**
             * credentials defines a key of a Secret in the namespace that contains the credentials for authentication.
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
             * type defines the authentication type. The value is case-insensitive.
             *
             * "Basic" is not a supported value.
             *
             * Default: "Bearer"
             */
            type?: string;
          };
          /**
           * basicAuth defines the basic authentication credentials for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
           */
          basicAuth?: {
            /**
             * password defines a key of a Secret containing the password for
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
             * username defines a key of a Secret containing the username for
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
           * bearerTokenSecret defines the secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the AlertmanagerConfig
           * object and accessible by the Prometheus Operator.
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
           * enableHttp2 can be used to disable HTTP2.
           */
          enableHttp2?: boolean;
          /**
           * followRedirects specifies whether the client should follow HTTP 3xx redirects.
           * When true, the client will automatically follow redirect responses.
           */
          followRedirects?: boolean;
          /**
           * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          noProxy?: string;
          /**
           * oauth2 defines the OAuth2 client credentials used to fetch a token for the targets.
           * This enables OAuth2 authentication flow for HTTP requests.
           */
          oauth2?: {
            /**
             * clientId defines a key of a Secret or ConfigMap containing the
             * OAuth2 client's ID.
             */
            clientId: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * clientSecret defines a key of a Secret containing the OAuth2
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
             * endpointParams configures the HTTP parameters to append to the token
             * URL.
             */
            endpointParams?: {
              [k: string]: string;
            };
            /**
             * noProxy defines a comma-separated string that can contain IPs, CIDR notation, domain names
             * that should be excluded from proxying. IP and domain names can
             * contain port numbers.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            noProxy?: string;
            /**
             * proxyConnectHeader optionally specifies headers to send to
             * proxies during CONNECT requests.
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
             * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
             *
             * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
             */
            proxyFromEnvironment?: boolean;
            /**
             * proxyUrl defines the HTTP proxy server to use.
             */
            proxyUrl?: string;
            /**
             * scopes defines the OAuth2 scopes used for the token request.
             */
            scopes?: string[];
            /**
             * tlsConfig defines the TLS configuration to use when connecting to the OAuth2 server.
             * It requires Prometheus >= v2.43.0.
             */
            tlsConfig?: {
              /**
               * ca defines the Certificate authority used when verifying server certificates.
               */
              ca?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * cert defines the Client certificate to present when doing client-authentication.
               */
              cert?: {
                /**
                 * configMap defines the ConfigMap containing data to use for the targets.
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
                 * secret defines the Secret containing data to use for the targets.
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
               * insecureSkipVerify defines how to disable target certificate validation.
               */
              insecureSkipVerify?: boolean;
              /**
               * keySecret defines the Secret containing the client key file for the targets.
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
               * maxVersion defines the maximum acceptable TLS version.
               *
               * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
               */
              maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * minVersion defines the minimum acceptable TLS version.
               *
               * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
               */
              minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
              /**
               * serverName is used to verify the hostname for the targets.
               */
              serverName?: string;
            };
            /**
             * tokenUrl defines the URL to fetch the token from.
             */
            tokenUrl: string;
          };
          /**
           * proxyConnectHeader optionally specifies headers to send to
           * proxies during CONNECT requests.
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
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
           * proxyFromEnvironment defines whether to use the proxy configuration defined by environment variables (HTTP_PROXY, HTTPS_PROXY, and NO_PROXY).
           *
           * It requires Prometheus >= v2.43.0, Alertmanager >= v0.25.0 or Thanos >= v0.32.0.
           */
          proxyFromEnvironment?: boolean;
          /**
           * proxyURL defines an optional proxy URL for HTTP requests.
           * If defined, this field takes precedence over `proxyUrl`.
           */
          proxyURL?: string;
          /**
           * proxyUrl defines the HTTP proxy server to use.
           */
          proxyUrl?: string;
          /**
           * tlsConfig defines the TLS configuration for the client.
           * This includes settings for certificates, CA validation, and TLS protocol options.
           */
          tlsConfig?: {
            /**
             * ca defines the Certificate authority used when verifying server certificates.
             */
            ca?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * cert defines the Client certificate to present when doing client-authentication.
             */
            cert?: {
              /**
               * configMap defines the ConfigMap containing data to use for the targets.
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
               * secret defines the Secret containing data to use for the targets.
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
             * insecureSkipVerify defines how to disable target certificate validation.
             */
            insecureSkipVerify?: boolean;
            /**
             * keySecret defines the Secret containing the client key file for the targets.
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
             * maxVersion defines the maximum acceptable TLS version.
             *
             * It requires Prometheus >= v2.41.0 or Thanos >= v0.31.0.
             */
            maxVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * minVersion defines the minimum acceptable TLS version.
             *
             * It requires Prometheus >= v2.35.0 or Thanos >= v0.28.0.
             */
            minVersion?: "TLS10" | "TLS11" | "TLS12" | "TLS13";
            /**
             * serverName is used to verify the hostname for the targets.
             */
            serverName?: string;
          };
        };
        /**
         * message defines the API request data as defined by the WeChat API.
         * This contains the actual notification content to be sent.
         */
        message?: string;
        /**
         * messageType defines the type of message to send.
         * Valid values include "text", "markdown", and other WeChat Work supported message types.
         */
        messageType?: string;
        /**
         * sendResolved defines whether or not to notify about resolved alerts.
         */
        sendResolved?: boolean;
        /**
         * toParty defines the target department(s) to receive the notification.
         * Can be a single department ID or multiple department IDs separated by '|'.
         */
        toParty?: string;
        /**
         * toTag defines the target tag(s) to receive the notification.
         * Can be a single tag ID or multiple tag IDs separated by '|'.
         */
        toTag?: string;
        /**
         * toUser defines the target user(s) to receive the notification.
         * Can be a single user ID or multiple user IDs separated by '|'.
         */
        toUser?: string;
      }[];
    }[];

    /**
     * route defines the Alertmanager route definition for alerts matching the resource's
     * namespace. If present, it will be added to the generated Alertmanager
     * configuration as a first-level route.
     */
    route?: {
      /**
       * activeTimeIntervals is a list of MuteTimeInterval names when this route should be active.
       */
      activeTimeIntervals?: string[];
      /**
       * continue defines the boolean indicating whether an alert should continue matching subsequent
       * sibling nodes. It will always be overridden to true for the first-level
       * route by the Prometheus operator.
       */
      continue?: boolean;
      /**
       * groupBy defines the list of labels to group by.
       * Labels must not be repeated (unique list).
       * Special label "..." (aggregate by all possible labels), if provided, must be the only element in the list.
       */
      groupBy?: string[];
      /**
       * groupInterval defines how long to wait before sending an updated notification.
       * Must match the regular expression`^(([0-9]+)y)?(([0-9]+)w)?(([0-9]+)d)?(([0-9]+)h)?(([0-9]+)m)?(([0-9]+)s)?(([0-9]+)ms)?$`
       * Example: "5m"
       */
      groupInterval?: string;
      /**
       * groupWait defines how long to wait before sending the initial notification.
       * Must match the regular expression`^(([0-9]+)y)?(([0-9]+)w)?(([0-9]+)d)?(([0-9]+)h)?(([0-9]+)m)?(([0-9]+)s)?(([0-9]+)ms)?$`
       * Example: "30s"
       */
      groupWait?: string;
      /**
       * matchers defines the list of matchers that the alert's labels should match. For the first
       * level route, the operator removes any existing equality and regexp
       * matcher on the `namespace` label and adds a `namespace: <object
       * namespace>` matcher.
       */
      matchers?: {
        /**
         * matchType defines the match operation available with AlertManager >= v0.22.0.
         * Takes precedence over Regex (deprecated) if non-empty.
         * Valid values: "=" (equality), "!=" (inequality), "=~" (regex match), "!~" (regex non-match).
         */
        matchType?: "!=" | "=" | "=~" | "!~";
        /**
         * name defines the label to match.
         * This specifies which alert label should be evaluated.
         */
        name: string;
        /**
         * regex defines whether to match on equality (false) or regular-expression (true).
         * Deprecated: for AlertManager >= v0.22.0, `matchType` should be used instead.
         */
        regex?: boolean;
        /**
         * value defines the label value to match.
         * This is the expected value for the specified label.
         */
        value?: string;
      }[];
      /**
       * muteTimeIntervals is a list of MuteTimeInterval names that will mute this route when matched,
       */
      muteTimeIntervals?: string[];
      /**
       * receiver defines the name of the receiver for this route. If not empty, it should be listed in
       * the `receivers` field.
       */
      receiver?: string;
      /**
       * repeatInterval defines how long to wait before repeating the last notification.
       * Must match the regular expression`^(([0-9]+)y)?(([0-9]+)w)?(([0-9]+)d)?(([0-9]+)h)?(([0-9]+)m)?(([0-9]+)s)?(([0-9]+)ms)?$`
       * Example: "4h"
       */
      repeatInterval?: string;
      /**
       * routes defines the child routes.
       */
      routes?: {
        [k: string]: unknown;
      }[];
    };
}

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * AlertmanagerConfig configures the Prometheus Alertmanager,
 * specifying how alerts should be grouped, inhibited and notified to external systems.
 */
export interface AlertmanagerConfigProperties {
  metadata: {};
  /**
   * spec defines the specification of AlertmanagerConfigSpec
   */
  spec: AlertmanagerConfigSpec;
}

export class AlertmanagerConfig extends NamespacedAPIObject {
    spec: AlertmanagerConfigSpec;

    constructor(properties: AlertmanagerConfigProperties) {
        super('monitoring.coreos.com/v1alpha1', 'AlertmanagerConfig', properties.metadata);

            if (properties.spec === undefined) {
                throw new Error('Property spec is required by AlertmanagerConfig');
            } else {
                this['spec'] = properties['spec'];
            }
    }
}
