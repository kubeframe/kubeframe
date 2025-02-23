import { k8s, NamespacedAPIResource } from "@kubeframe/k8s";

interface AlertmanagerSpec {

    /**
     * AdditionalPeers allows injecting a set of additional Alertmanagers to peer with to form a highly available cluster.
     */
    additionalPeers?: string[];

    /**
     * If specified, the pod's scheduling constraints.
     */
    affinity?: {
      /**
       * Describes node affinity scheduling rules for the pod.
       */
      nodeAffinity?: {
        /**
         * The scheduler will prefer to schedule pods to nodes that satisfy
         * the affinity expressions specified by this field, but it may choose
         * a node that violates one or more of the expressions. The node that is
         * most preferred is the one with the greatest sum of weights, i.e.
         * for each node that meets all of the scheduling requirements (resource
         * request, requiredDuringScheduling affinity expressions, etc.),
         * compute a sum by iterating through the elements of this field and adding
         * "weight" to the sum if the node matches the corresponding matchExpressions; the
         * node(s) with the highest sum are the most preferred.
         */
        preferredDuringSchedulingIgnoredDuringExecution?: {
          /**
           * A node selector term, associated with the corresponding weight.
           */
          preference: {
            /**
             * A list of node selector requirements by node's labels.
             */
            matchExpressions?: {
              /**
               * The label key that the selector applies to.
               */
              key: string;
              /**
               * Represents a key's relationship to a set of values.
               * Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.
               */
              operator: string;
              /**
               * An array of string values. If the operator is In or NotIn,
               * the values array must be non-empty. If the operator is Exists or DoesNotExist,
               * the values array must be empty. If the operator is Gt or Lt, the values
               * array must have a single element, which will be interpreted as an integer.
               * This array is replaced during a strategic merge patch.
               */
              values?: string[];
            }[];
            /**
             * A list of node selector requirements by node's fields.
             */
            matchFields?: {
              /**
               * The label key that the selector applies to.
               */
              key: string;
              /**
               * Represents a key's relationship to a set of values.
               * Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.
               */
              operator: string;
              /**
               * An array of string values. If the operator is In or NotIn,
               * the values array must be non-empty. If the operator is Exists or DoesNotExist,
               * the values array must be empty. If the operator is Gt or Lt, the values
               * array must have a single element, which will be interpreted as an integer.
               * This array is replaced during a strategic merge patch.
               */
              values?: string[];
            }[];
          };
          /**
           * Weight associated with matching the corresponding nodeSelectorTerm, in the range 1-100.
           */
          weight: number;
        }[];
        /**
         * If the affinity requirements specified by this field are not met at
         * scheduling time, the pod will not be scheduled onto the node.
         * If the affinity requirements specified by this field cease to be met
         * at some point during pod execution (e.g. due to an update), the system
         * may or may not try to eventually evict the pod from its node.
         */
        requiredDuringSchedulingIgnoredDuringExecution?: {
          /**
           * Required. A list of node selector terms. The terms are ORed.
           */
          nodeSelectorTerms: {
            /**
             * A list of node selector requirements by node's labels.
             */
            matchExpressions?: {
              /**
               * The label key that the selector applies to.
               */
              key: string;
              /**
               * Represents a key's relationship to a set of values.
               * Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.
               */
              operator: string;
              /**
               * An array of string values. If the operator is In or NotIn,
               * the values array must be non-empty. If the operator is Exists or DoesNotExist,
               * the values array must be empty. If the operator is Gt or Lt, the values
               * array must have a single element, which will be interpreted as an integer.
               * This array is replaced during a strategic merge patch.
               */
              values?: string[];
            }[];
            /**
             * A list of node selector requirements by node's fields.
             */
            matchFields?: {
              /**
               * The label key that the selector applies to.
               */
              key: string;
              /**
               * Represents a key's relationship to a set of values.
               * Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.
               */
              operator: string;
              /**
               * An array of string values. If the operator is In or NotIn,
               * the values array must be non-empty. If the operator is Exists or DoesNotExist,
               * the values array must be empty. If the operator is Gt or Lt, the values
               * array must have a single element, which will be interpreted as an integer.
               * This array is replaced during a strategic merge patch.
               */
              values?: string[];
            }[];
          }[];
        };
      };
      /**
       * Describes pod affinity scheduling rules (e.g. co-locate this pod in the same node, zone, etc. as some other pod(s)).
       */
      podAffinity?: {
        /**
         * The scheduler will prefer to schedule pods to nodes that satisfy
         * the affinity expressions specified by this field, but it may choose
         * a node that violates one or more of the expressions. The node that is
         * most preferred is the one with the greatest sum of weights, i.e.
         * for each node that meets all of the scheduling requirements (resource
         * request, requiredDuringScheduling affinity expressions, etc.),
         * compute a sum by iterating through the elements of this field and adding
         * "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the
         * node(s) with the highest sum are the most preferred.
         */
        preferredDuringSchedulingIgnoredDuringExecution?: {
          /**
           * Required. A pod affinity term, associated with the corresponding weight.
           */
          podAffinityTerm: {
            /**
             * A label query over a set of resources, in this case pods.
             * If it's null, this PodAffinityTerm matches with no Pods.
             */
            labelSelector?: {
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
             * MatchLabelKeys is a set of pod label keys to select which pods will
             * be taken into consideration. The keys are used to lookup values from the
             * incoming pod labels, those key-value labels are merged with `labelSelector` as `key in (value)`
             * to select the group of existing pods which pods will be taken into consideration
             * for the incoming pod's pod (anti) affinity. Keys that don't exist in the incoming
             * pod labels will be ignored. The default value is empty.
             * The same key is forbidden to exist in both matchLabelKeys and labelSelector.
             * Also, matchLabelKeys cannot be set when labelSelector isn't set.
             * This is a beta field and requires enabling MatchLabelKeysInPodAffinity feature gate (enabled by default).
             */
            matchLabelKeys?: string[];
            /**
             * MismatchLabelKeys is a set of pod label keys to select which pods will
             * be taken into consideration. The keys are used to lookup values from the
             * incoming pod labels, those key-value labels are merged with `labelSelector` as `key notin (value)`
             * to select the group of existing pods which pods will be taken into consideration
             * for the incoming pod's pod (anti) affinity. Keys that don't exist in the incoming
             * pod labels will be ignored. The default value is empty.
             * The same key is forbidden to exist in both mismatchLabelKeys and labelSelector.
             * Also, mismatchLabelKeys cannot be set when labelSelector isn't set.
             * This is a beta field and requires enabling MatchLabelKeysInPodAffinity feature gate (enabled by default).
             */
            mismatchLabelKeys?: string[];
            /**
             * A label query over the set of namespaces that the term applies to.
             * The term is applied to the union of the namespaces selected by this field
             * and the ones listed in the namespaces field.
             * null selector and null or empty namespaces list means "this pod's namespace".
             * An empty selector ({}) matches all namespaces.
             */
            namespaceSelector?: {
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
             * namespaces specifies a static list of namespace names that the term applies to.
             * The term is applied to the union of the namespaces listed in this field
             * and the ones selected by namespaceSelector.
             * null or empty namespaces list and null namespaceSelector means "this pod's namespace".
             */
            namespaces?: string[];
            /**
             * This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching
             * the labelSelector in the specified namespaces, where co-located is defined as running on a node
             * whose value of the label with key topologyKey matches that of any node on which any of the
             * selected pods is running.
             * Empty topologyKey is not allowed.
             */
            topologyKey: string;
          };
          /**
           * weight associated with matching the corresponding podAffinityTerm,
           * in the range 1-100.
           */
          weight: number;
        }[];
        /**
         * If the affinity requirements specified by this field are not met at
         * scheduling time, the pod will not be scheduled onto the node.
         * If the affinity requirements specified by this field cease to be met
         * at some point during pod execution (e.g. due to a pod label update), the
         * system may or may not try to eventually evict the pod from its node.
         * When there are multiple elements, the lists of nodes corresponding to each
         * podAffinityTerm are intersected, i.e. all terms must be satisfied.
         */
        requiredDuringSchedulingIgnoredDuringExecution?: {
          /**
           * A label query over a set of resources, in this case pods.
           * If it's null, this PodAffinityTerm matches with no Pods.
           */
          labelSelector?: {
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
           * MatchLabelKeys is a set of pod label keys to select which pods will
           * be taken into consideration. The keys are used to lookup values from the
           * incoming pod labels, those key-value labels are merged with `labelSelector` as `key in (value)`
           * to select the group of existing pods which pods will be taken into consideration
           * for the incoming pod's pod (anti) affinity. Keys that don't exist in the incoming
           * pod labels will be ignored. The default value is empty.
           * The same key is forbidden to exist in both matchLabelKeys and labelSelector.
           * Also, matchLabelKeys cannot be set when labelSelector isn't set.
           * This is a beta field and requires enabling MatchLabelKeysInPodAffinity feature gate (enabled by default).
           */
          matchLabelKeys?: string[];
          /**
           * MismatchLabelKeys is a set of pod label keys to select which pods will
           * be taken into consideration. The keys are used to lookup values from the
           * incoming pod labels, those key-value labels are merged with `labelSelector` as `key notin (value)`
           * to select the group of existing pods which pods will be taken into consideration
           * for the incoming pod's pod (anti) affinity. Keys that don't exist in the incoming
           * pod labels will be ignored. The default value is empty.
           * The same key is forbidden to exist in both mismatchLabelKeys and labelSelector.
           * Also, mismatchLabelKeys cannot be set when labelSelector isn't set.
           * This is a beta field and requires enabling MatchLabelKeysInPodAffinity feature gate (enabled by default).
           */
          mismatchLabelKeys?: string[];
          /**
           * A label query over the set of namespaces that the term applies to.
           * The term is applied to the union of the namespaces selected by this field
           * and the ones listed in the namespaces field.
           * null selector and null or empty namespaces list means "this pod's namespace".
           * An empty selector ({}) matches all namespaces.
           */
          namespaceSelector?: {
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
           * namespaces specifies a static list of namespace names that the term applies to.
           * The term is applied to the union of the namespaces listed in this field
           * and the ones selected by namespaceSelector.
           * null or empty namespaces list and null namespaceSelector means "this pod's namespace".
           */
          namespaces?: string[];
          /**
           * This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching
           * the labelSelector in the specified namespaces, where co-located is defined as running on a node
           * whose value of the label with key topologyKey matches that of any node on which any of the
           * selected pods is running.
           * Empty topologyKey is not allowed.
           */
          topologyKey: string;
        }[];
      };
      /**
       * Describes pod anti-affinity scheduling rules (e.g. avoid putting this pod in the same node, zone, etc. as some other pod(s)).
       */
      podAntiAffinity?: {
        /**
         * The scheduler will prefer to schedule pods to nodes that satisfy
         * the anti-affinity expressions specified by this field, but it may choose
         * a node that violates one or more of the expressions. The node that is
         * most preferred is the one with the greatest sum of weights, i.e.
         * for each node that meets all of the scheduling requirements (resource
         * request, requiredDuringScheduling anti-affinity expressions, etc.),
         * compute a sum by iterating through the elements of this field and adding
         * "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the
         * node(s) with the highest sum are the most preferred.
         */
        preferredDuringSchedulingIgnoredDuringExecution?: {
          /**
           * Required. A pod affinity term, associated with the corresponding weight.
           */
          podAffinityTerm: {
            /**
             * A label query over a set of resources, in this case pods.
             * If it's null, this PodAffinityTerm matches with no Pods.
             */
            labelSelector?: {
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
             * MatchLabelKeys is a set of pod label keys to select which pods will
             * be taken into consideration. The keys are used to lookup values from the
             * incoming pod labels, those key-value labels are merged with `labelSelector` as `key in (value)`
             * to select the group of existing pods which pods will be taken into consideration
             * for the incoming pod's pod (anti) affinity. Keys that don't exist in the incoming
             * pod labels will be ignored. The default value is empty.
             * The same key is forbidden to exist in both matchLabelKeys and labelSelector.
             * Also, matchLabelKeys cannot be set when labelSelector isn't set.
             * This is a beta field and requires enabling MatchLabelKeysInPodAffinity feature gate (enabled by default).
             */
            matchLabelKeys?: string[];
            /**
             * MismatchLabelKeys is a set of pod label keys to select which pods will
             * be taken into consideration. The keys are used to lookup values from the
             * incoming pod labels, those key-value labels are merged with `labelSelector` as `key notin (value)`
             * to select the group of existing pods which pods will be taken into consideration
             * for the incoming pod's pod (anti) affinity. Keys that don't exist in the incoming
             * pod labels will be ignored. The default value is empty.
             * The same key is forbidden to exist in both mismatchLabelKeys and labelSelector.
             * Also, mismatchLabelKeys cannot be set when labelSelector isn't set.
             * This is a beta field and requires enabling MatchLabelKeysInPodAffinity feature gate (enabled by default).
             */
            mismatchLabelKeys?: string[];
            /**
             * A label query over the set of namespaces that the term applies to.
             * The term is applied to the union of the namespaces selected by this field
             * and the ones listed in the namespaces field.
             * null selector and null or empty namespaces list means "this pod's namespace".
             * An empty selector ({}) matches all namespaces.
             */
            namespaceSelector?: {
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
             * namespaces specifies a static list of namespace names that the term applies to.
             * The term is applied to the union of the namespaces listed in this field
             * and the ones selected by namespaceSelector.
             * null or empty namespaces list and null namespaceSelector means "this pod's namespace".
             */
            namespaces?: string[];
            /**
             * This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching
             * the labelSelector in the specified namespaces, where co-located is defined as running on a node
             * whose value of the label with key topologyKey matches that of any node on which any of the
             * selected pods is running.
             * Empty topologyKey is not allowed.
             */
            topologyKey: string;
          };
          /**
           * weight associated with matching the corresponding podAffinityTerm,
           * in the range 1-100.
           */
          weight: number;
        }[];
        /**
         * If the anti-affinity requirements specified by this field are not met at
         * scheduling time, the pod will not be scheduled onto the node.
         * If the anti-affinity requirements specified by this field cease to be met
         * at some point during pod execution (e.g. due to a pod label update), the
         * system may or may not try to eventually evict the pod from its node.
         * When there are multiple elements, the lists of nodes corresponding to each
         * podAffinityTerm are intersected, i.e. all terms must be satisfied.
         */
        requiredDuringSchedulingIgnoredDuringExecution?: {
          /**
           * A label query over a set of resources, in this case pods.
           * If it's null, this PodAffinityTerm matches with no Pods.
           */
          labelSelector?: {
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
           * MatchLabelKeys is a set of pod label keys to select which pods will
           * be taken into consideration. The keys are used to lookup values from the
           * incoming pod labels, those key-value labels are merged with `labelSelector` as `key in (value)`
           * to select the group of existing pods which pods will be taken into consideration
           * for the incoming pod's pod (anti) affinity. Keys that don't exist in the incoming
           * pod labels will be ignored. The default value is empty.
           * The same key is forbidden to exist in both matchLabelKeys and labelSelector.
           * Also, matchLabelKeys cannot be set when labelSelector isn't set.
           * This is a beta field and requires enabling MatchLabelKeysInPodAffinity feature gate (enabled by default).
           */
          matchLabelKeys?: string[];
          /**
           * MismatchLabelKeys is a set of pod label keys to select which pods will
           * be taken into consideration. The keys are used to lookup values from the
           * incoming pod labels, those key-value labels are merged with `labelSelector` as `key notin (value)`
           * to select the group of existing pods which pods will be taken into consideration
           * for the incoming pod's pod (anti) affinity. Keys that don't exist in the incoming
           * pod labels will be ignored. The default value is empty.
           * The same key is forbidden to exist in both mismatchLabelKeys and labelSelector.
           * Also, mismatchLabelKeys cannot be set when labelSelector isn't set.
           * This is a beta field and requires enabling MatchLabelKeysInPodAffinity feature gate (enabled by default).
           */
          mismatchLabelKeys?: string[];
          /**
           * A label query over the set of namespaces that the term applies to.
           * The term is applied to the union of the namespaces selected by this field
           * and the ones listed in the namespaces field.
           * null selector and null or empty namespaces list means "this pod's namespace".
           * An empty selector ({}) matches all namespaces.
           */
          namespaceSelector?: {
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
           * namespaces specifies a static list of namespace names that the term applies to.
           * The term is applied to the union of the namespaces listed in this field
           * and the ones selected by namespaceSelector.
           * null or empty namespaces list and null namespaceSelector means "this pod's namespace".
           */
          namespaces?: string[];
          /**
           * This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching
           * the labelSelector in the specified namespaces, where co-located is defined as running on a node
           * whose value of the label with key topologyKey matches that of any node on which any of the
           * selected pods is running.
           * Empty topologyKey is not allowed.
           */
          topologyKey: string;
        }[];
      };
    };

    /**
     * AlertmanagerConfigMatcherStrategy defines how AlertmanagerConfig objects
     * process incoming alerts.
     */
    alertmanagerConfigMatcherStrategy?: {
      /**
       * AlertmanagerConfigMatcherStrategyType defines the strategy used by
       * AlertmanagerConfig objects to match alerts in the routes and inhibition
       * rules.
       *
       * The default value is `OnNamespace`.
       */
      type?: "OnNamespace" | "None";
    };

    /**
     * Namespaces to be selected for AlertmanagerConfig discovery. If nil, only
     * check own namespace.
     */
    alertmanagerConfigNamespaceSelector?: {
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
     * AlertmanagerConfigs to be selected for to merge and configure Alertmanager with.
     */
    alertmanagerConfigSelector?: {
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
     * alertmanagerConfiguration specifies the configuration of Alertmanager.
     *
     * If defined, it takes precedence over the `configSecret` field.
     *
     * This is an *experimental feature*, it may change in any upcoming release
     * in a breaking way.
     */
    alertmanagerConfiguration?: {
      /**
       * Defines the global parameters of the Alertmanager configuration.
       */
      global?: {
        /**
         * HTTP client configuration.
         */
        httpConfig?: {
          /**
           * Authorization header configuration for the client.
           * This is mutually exclusive with BasicAuth and is only available starting from Alertmanager v0.22+.
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
           * BasicAuth for the client.
           * This is mutually exclusive with Authorization. If both are defined, BasicAuth takes precedence.
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
           * The secret's key that contains the bearer token to be used by the client
           * for authentication.
           * The secret needs to be in the same namespace as the Alertmanager
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
           * FollowRedirects specifies whether the client should follow HTTP 3xx redirects.
           */
          followRedirects?: boolean;
          /**
           * `noProxy` is a comma-separated string that can contain IPs, CIDR notation, domain names
           * that should be excluded from proxying. IP and domain names can
           * contain port numbers.
           *
           * It requires Prometheus >= v2.43.0 or Alertmanager >= 0.25.0.
           */
          noProxy?: string;
          /**
           * OAuth2 client credentials used to fetch a token for the targets.
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
           * TLS configuration for the client.
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
        };
        /**
         * The default OpsGenie API Key.
         */
        opsGenieApiKey?: {
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
         * The default OpsGenie API URL.
         */
        opsGenieApiUrl?: {
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
         * The default Pagerduty URL.
         */
        pagerdutyUrl?: string;
        /**
         * ResolveTimeout is the default value used by alertmanager if the alert does
         * not include EndsAt, after this time passes it can declare the alert as resolved if it has not been updated.
         * This has no impact on alerts from Prometheus, as they always include EndsAt.
         */
        resolveTimeout?: string;
        /**
         * The default Slack API URL.
         */
        slackApiUrl?: {
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
         * Configures global SMTP parameters.
         */
        smtp?: {
          /**
           * SMTP Auth using PLAIN
           */
          authIdentity?: string;
          /**
           * SMTP Auth using LOGIN and PLAIN.
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
           * SMTP Auth using CRAM-MD5.
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
           * SMTP Auth using CRAM-MD5, LOGIN and PLAIN. If empty, Alertmanager doesn't authenticate to the SMTP server.
           */
          authUsername?: string;
          /**
           * The default SMTP From header field.
           */
          from?: string;
          /**
           * The default hostname to identify to the SMTP server.
           */
          hello?: string;
          /**
           * The default SMTP TLS requirement.
           * Note that Go does not support unencrypted connections to remote SMTP endpoints.
           */
          requireTLS?: boolean;
          /**
           * The default SMTP smarthost used for sending emails.
           */
          smartHost?: {
            /**
             * Defines the host's address, it can be a DNS name or a literal IP address.
             */
            host: string;
            /**
             * Defines the host's port, it can be a literal port number or a port name.
             */
            port: string;
          };
        };
      };
      /**
       * The name of the AlertmanagerConfig resource which is used to generate the Alertmanager configuration.
       * It must be defined in the same namespace as the Alertmanager object.
       * The operator will not enforce a `namespace` label for routes and inhibition rules.
       */
      name?: string;
      /**
       * Custom notification templates.
       */
      templates?: {
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
      }[];
    };

    /**
     * AutomountServiceAccountToken indicates whether a service account token should be automatically mounted in the pod.
     * If the service account has `automountServiceAccountToken: true`, set the field to `false` to opt out of automounting API credentials.
     */
    automountServiceAccountToken?: boolean;

    /**
     * Base image that is used to deploy pods, without tag.
     * Deprecated: use 'image' instead.
     */
    baseImage?: string;

    /**
     * ClusterAdvertiseAddress is the explicit address to advertise in cluster.
     * Needs to be provided for non RFC1918 [1] (public) addresses.
     * [1] RFC1918: https://tools.ietf.org/html/rfc1918
     */
    clusterAdvertiseAddress?: string;

    /**
     * Interval between gossip attempts.
     */
    clusterGossipInterval?: string;

    /**
     * Defines the identifier that uniquely identifies the Alertmanager cluster.
     * You should only set it when the Alertmanager cluster includes Alertmanager instances which are external to this Alertmanager resource. In practice, the addresses of the external instances are provided via the `.spec.additionalPeers` field.
     */
    clusterLabel?: string;

    /**
     * Timeout for cluster peering.
     */
    clusterPeerTimeout?: string;

    /**
     * Interval between pushpull attempts.
     */
    clusterPushpullInterval?: string;

    /**
     * ConfigMaps is a list of ConfigMaps in the same namespace as the Alertmanager
     * object, which shall be mounted into the Alertmanager Pods.
     * Each ConfigMap is added to the StatefulSet definition as a volume named `configmap-<configmap-name>`.
     * The ConfigMaps are mounted into `/etc/alertmanager/configmaps/<configmap-name>` in the 'alertmanager' container.
     */
    configMaps?: string[];

    /**
     * ConfigSecret is the name of a Kubernetes Secret in the same namespace as the
     * Alertmanager object, which contains the configuration for this Alertmanager
     * instance. If empty, it defaults to `alertmanager-<alertmanager-name>`.
     *
     * The Alertmanager configuration should be available under the
     * `alertmanager.yaml` key. Additional keys from the original secret are
     * copied to the generated secret and mounted into the
     * `/etc/alertmanager/config` directory in the `alertmanager` container.
     *
     * If either the secret or the `alertmanager.yaml` key is missing, the
     * operator provisions a minimal Alertmanager configuration with one empty
     * receiver (effectively dropping alert notifications).
     */
    configSecret?: string;

    /**
     * Containers allows injecting additional containers. This is meant to
     * allow adding an authentication proxy to an Alertmanager pod.
     * Containers described here modify an operator generated container if they
     * share the same name and modifications are done via a strategic merge
     * patch. The current container names are: `alertmanager` and
     * `config-reloader`. Overriding containers is entirely outside the scope
     * of what the maintainers will support and by doing so, you accept that
     * this behaviour may break at any time without notice.
     */
    containers?: {
      /**
       * Arguments to the entrypoint.
       * The container image's CMD is used if this is not provided.
       * Variable references $(VAR_NAME) are expanded using the container's environment. If a variable
       * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
       * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
       * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
       * of whether the variable exists or not. Cannot be updated.
       * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
       */
      args?: string[];
      /**
       * Entrypoint array. Not executed within a shell.
       * The container image's ENTRYPOINT is used if this is not provided.
       * Variable references $(VAR_NAME) are expanded using the container's environment. If a variable
       * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
       * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
       * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
       * of whether the variable exists or not. Cannot be updated.
       * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
       */
      command?: string[];
      /**
       * List of environment variables to set in the container.
       * Cannot be updated.
       */
      env?: {
        /**
         * Name of the environment variable. Must be a C_IDENTIFIER.
         */
        name: string;
        /**
         * Variable references $(VAR_NAME) are expanded
         * using the previously defined environment variables in the container and
         * any service environment variables. If a variable cannot be resolved,
         * the reference in the input string will be unchanged. Double $$ are reduced
         * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e.
         * "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)".
         * Escaped references will never be expanded, regardless of whether the variable
         * exists or not.
         * Defaults to "".
         */
        value?: string;
        /**
         * Source for the environment variable's value. Cannot be used if value is not empty.
         */
        valueFrom?: {
          /**
           * Selects a key of a ConfigMap.
           */
          configMapKeyRef?: {
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
           * Selects a field of the pod: supports metadata.name, metadata.namespace, `metadata.labels['<KEY>']`, `metadata.annotations['<KEY>']`,
           * spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP, status.podIPs.
           */
          fieldRef?: {
            /**
             * Version of the schema the FieldPath is written in terms of, defaults to "v1".
             */
            apiVersion?: string;
            /**
             * Path of the field to select in the specified API version.
             */
            fieldPath: string;
          };
          /**
           * Selects a resource of the container: only resources limits and requests
           * (limits.cpu, limits.memory, limits.ephemeral-storage, requests.cpu, requests.memory and requests.ephemeral-storage) are currently supported.
           */
          resourceFieldRef?: {
            /**
             * Container name: required for volumes, optional for env vars
             */
            containerName?: string;
            /**
             * Specifies the output format of the exposed resources, defaults to "1"
             */
            divisor?: number | string;
            /**
             * Required: resource to select
             */
            resource: string;
          };
          /**
           * Selects a key of a secret in the pod's namespace
           */
          secretKeyRef?: {
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
      }[];
      /**
       * List of sources to populate environment variables in the container.
       * The keys defined within a source must be a C_IDENTIFIER. All invalid keys
       * will be reported as an event when the container is starting. When a key exists in multiple
       * sources, the value associated with the last source will take precedence.
       * Values defined by an Env with a duplicate key will take precedence.
       * Cannot be updated.
       */
      envFrom?: {
        /**
         * The ConfigMap to select from
         */
        configMapRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the ConfigMap must be defined
           */
          optional?: boolean;
        };
        /**
         * An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.
         */
        prefix?: string;
        /**
         * The Secret to select from
         */
        secretRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the Secret must be defined
           */
          optional?: boolean;
        };
      }[];
      /**
       * Container image name.
       * More info: https://kubernetes.io/docs/concepts/containers/images
       * This field is optional to allow higher level config management to default or override
       * container images in workload controllers like Deployments and StatefulSets.
       */
      image?: string;
      /**
       * Image pull policy.
       * One of Always, Never, IfNotPresent.
       * Defaults to Always if :latest tag is specified, or IfNotPresent otherwise.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
       */
      imagePullPolicy?: string;
      /**
       * Actions that the management system should take in response to container lifecycle events.
       * Cannot be updated.
       */
      lifecycle?: {
        /**
         * PostStart is called immediately after a container is created. If the handler fails,
         * the container is terminated and restarted according to its restart policy.
         * Other management of the container blocks until the hook completes.
         * More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
         */
        postStart?: {
          /**
           * Exec specifies a command to execute in the container.
           */
          exec?: {
            /**
             * Command is the command line to execute inside the container, the working directory for the
             * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
             * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
             * a shell, you need to explicitly call out to that shell.
             * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
             */
            command?: string[];
          };
          /**
           * HTTPGet specifies an HTTP GET request to perform.
           */
          httpGet?: {
            /**
             * Host name to connect to, defaults to the pod IP. You probably want to set
             * "Host" in httpHeaders instead.
             */
            host?: string;
            /**
             * Custom headers to set in the request. HTTP allows repeated headers.
             */
            httpHeaders?: {
              /**
               * The header field name.
               * This will be canonicalized upon output, so case-variant names will be understood as the same header.
               */
              name: string;
              /**
               * The header field value
               */
              value: string;
            }[];
            /**
             * Path to access on the HTTP server.
             */
            path?: string;
            /**
             * Name or number of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
            /**
             * Scheme to use for connecting to the host.
             * Defaults to HTTP.
             */
            scheme?: string;
          };
          /**
           * Sleep represents a duration that the container should sleep.
           */
          sleep?: {
            /**
             * Seconds is the number of seconds to sleep.
             */
            seconds: number;
          };
          /**
           * Deprecated. TCPSocket is NOT supported as a LifecycleHandler and kept
           * for backward compatibility. There is no validation of this field and
           * lifecycle hooks will fail at runtime when it is specified.
           */
          tcpSocket?: {
            /**
             * Optional: Host name to connect to, defaults to the pod IP.
             */
            host?: string;
            /**
             * Number or name of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
          };
        };
        /**
         * PreStop is called immediately before a container is terminated due to an
         * API request or management event such as liveness/startup probe failure,
         * preemption, resource contention, etc. The handler is not called if the
         * container crashes or exits. The Pod's termination grace period countdown begins before the
         * PreStop hook is executed. Regardless of the outcome of the handler, the
         * container will eventually terminate within the Pod's termination grace
         * period (unless delayed by finalizers). Other management of the container blocks until the hook completes
         * or until the termination grace period is reached.
         * More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
         */
        preStop?: {
          /**
           * Exec specifies a command to execute in the container.
           */
          exec?: {
            /**
             * Command is the command line to execute inside the container, the working directory for the
             * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
             * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
             * a shell, you need to explicitly call out to that shell.
             * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
             */
            command?: string[];
          };
          /**
           * HTTPGet specifies an HTTP GET request to perform.
           */
          httpGet?: {
            /**
             * Host name to connect to, defaults to the pod IP. You probably want to set
             * "Host" in httpHeaders instead.
             */
            host?: string;
            /**
             * Custom headers to set in the request. HTTP allows repeated headers.
             */
            httpHeaders?: {
              /**
               * The header field name.
               * This will be canonicalized upon output, so case-variant names will be understood as the same header.
               */
              name: string;
              /**
               * The header field value
               */
              value: string;
            }[];
            /**
             * Path to access on the HTTP server.
             */
            path?: string;
            /**
             * Name or number of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
            /**
             * Scheme to use for connecting to the host.
             * Defaults to HTTP.
             */
            scheme?: string;
          };
          /**
           * Sleep represents a duration that the container should sleep.
           */
          sleep?: {
            /**
             * Seconds is the number of seconds to sleep.
             */
            seconds: number;
          };
          /**
           * Deprecated. TCPSocket is NOT supported as a LifecycleHandler and kept
           * for backward compatibility. There is no validation of this field and
           * lifecycle hooks will fail at runtime when it is specified.
           */
          tcpSocket?: {
            /**
             * Optional: Host name to connect to, defaults to the pod IP.
             */
            host?: string;
            /**
             * Number or name of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
          };
        };
      };
      /**
       * Periodic probe of container liveness.
       * Container will be restarted if the probe fails.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       */
      livenessProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: string[];
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: {
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }[];
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Name of the container specified as a DNS_LABEL.
       * Each container in a pod must have a unique name (DNS_LABEL).
       * Cannot be updated.
       */
      name: string;
      /**
       * List of ports to expose from the container. Not specifying a port here
       * DOES NOT prevent that port from being exposed. Any port which is
       * listening on the default "0.0.0.0" address inside a container will be
       * accessible from the network.
       * Modifying this array with strategic merge patch may corrupt the data.
       * For more information See https://github.com/kubernetes/kubernetes/issues/108255.
       * Cannot be updated.
       */
      ports?: {
        /**
         * Number of port to expose on the pod's IP address.
         * This must be a valid port number, 0 < x < 65536.
         */
        containerPort: number;
        /**
         * What host IP to bind the external port to.
         */
        hostIP?: string;
        /**
         * Number of port to expose on the host.
         * If specified, this must be a valid port number, 0 < x < 65536.
         * If HostNetwork is specified, this must match ContainerPort.
         * Most containers do not need this.
         */
        hostPort?: number;
        /**
         * If specified, this must be an IANA_SVC_NAME and unique within the pod. Each
         * named port in a pod must have a unique name. Name for the port that can be
         * referred to by services.
         */
        name?: string;
        /**
         * Protocol for port. Must be UDP, TCP, or SCTP.
         * Defaults to "TCP".
         */
        protocol?: string;
      }[];
      /**
       * Periodic probe of container service readiness.
       * Container will be removed from service endpoints if the probe fails.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       */
      readinessProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: string[];
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: {
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }[];
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Resources resize policy for the container.
       */
      resizePolicy?: {
        /**
         * Name of the resource to which this resource resize policy applies.
         * Supported values: cpu, memory.
         */
        resourceName: string;
        /**
         * Restart policy to apply when specified resource is resized.
         * If not specified, it defaults to NotRequired.
         */
        restartPolicy: string;
      }[];
      /**
       * Compute Resources required by this container.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
       */
      resources?: {
        /**
         * Claims lists the names of resources, defined in spec.resourceClaims,
         * that are used by this container.
         *
         * This is an alpha field and requires enabling the
         * DynamicResourceAllocation feature gate.
         *
         * This field is immutable. It can only be set for containers.
         */
        claims?: {
          /**
           * Name must match the name of one entry in pod.spec.resourceClaims of
           * the Pod where this field is used. It makes that resource available
           * inside a container.
           */
          name: string;
          /**
           * Request is the name chosen for a request in the referenced claim.
           * If empty, everything from the claim is made available, otherwise
           * only the result of this request.
           */
          request?: string;
        }[];
        /**
         * Limits describes the maximum amount of compute resources allowed.
         * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
         */
        limits?: {
          [k: string]: number | string;
        };
        /**
         * Requests describes the minimum amount of compute resources required.
         * If Requests is omitted for a container, it defaults to Limits if that is explicitly specified,
         * otherwise to an implementation-defined value. Requests cannot exceed Limits.
         * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
         */
        requests?: {
          [k: string]: number | string;
        };
      };
      /**
       * RestartPolicy defines the restart behavior of individual containers in a pod.
       * This field may only be set for init containers, and the only allowed value is "Always".
       * For non-init containers or when this field is not specified,
       * the restart behavior is defined by the Pod's restart policy and the container type.
       * Setting the RestartPolicy as "Always" for the init container will have the following effect:
       * this init container will be continually restarted on
       * exit until all regular containers have terminated. Once all regular
       * containers have completed, all init containers with restartPolicy "Always"
       * will be shut down. This lifecycle differs from normal init containers and
       * is often referred to as a "sidecar" container. Although this init
       * container still starts in the init container sequence, it does not wait
       * for the container to complete before proceeding to the next init
       * container. Instead, the next init container starts immediately after this
       * init container is started, or after any startupProbe has successfully
       * completed.
       */
      restartPolicy?: string;
      /**
       * SecurityContext defines the security options the container should be run with.
       * If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
       * More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
       */
      securityContext?: {
        /**
         * AllowPrivilegeEscalation controls whether a process can gain more
         * privileges than its parent process. This bool directly controls if
         * the no_new_privs flag will be set on the container process.
         * AllowPrivilegeEscalation is true always when the container is:
         * 1) run as Privileged
         * 2) has CAP_SYS_ADMIN
         * Note that this field cannot be set when spec.os.name is windows.
         */
        allowPrivilegeEscalation?: boolean;
        /**
         * appArmorProfile is the AppArmor options to use by this container. If set, this profile
         * overrides the pod's appArmorProfile.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        appArmorProfile?: {
          /**
           * localhostProfile indicates a profile loaded on the node that should be used.
           * The profile must be preconfigured on the node to work.
           * Must match the loaded name of the profile.
           * Must be set if and only if type is "Localhost".
           */
          localhostProfile?: string;
          /**
           * type indicates which kind of AppArmor profile will be applied.
           * Valid options are:
           *   Localhost - a profile pre-loaded on the node.
           *   RuntimeDefault - the container runtime's default profile.
           *   Unconfined - no AppArmor enforcement.
           */
          type: string;
        };
        /**
         * The capabilities to add/drop when running containers.
         * Defaults to the default set of capabilities granted by the container runtime.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        capabilities?: {
          /**
           * Added capabilities
           */
          add?: string[];
          /**
           * Removed capabilities
           */
          drop?: string[];
        };
        /**
         * Run container in privileged mode.
         * Processes in privileged containers are essentially equivalent to root on the host.
         * Defaults to false.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        privileged?: boolean;
        /**
         * procMount denotes the type of proc mount to use for the containers.
         * The default value is Default which uses the container runtime defaults for
         * readonly paths and masked paths.
         * This requires the ProcMountType feature flag to be enabled.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        procMount?: string;
        /**
         * Whether this container has a read-only root filesystem.
         * Default is false.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        readOnlyRootFilesystem?: boolean;
        /**
         * The GID to run the entrypoint of the container process.
         * Uses runtime default if unset.
         * May also be set in PodSecurityContext.  If set in both SecurityContext and
         * PodSecurityContext, the value specified in SecurityContext takes precedence.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        runAsGroup?: number;
        /**
         * Indicates that the container must run as a non-root user.
         * If true, the Kubelet will validate the image at runtime to ensure that it
         * does not run as UID 0 (root) and fail to start the container if it does.
         * If unset or false, no such validation will be performed.
         * May also be set in PodSecurityContext.  If set in both SecurityContext and
         * PodSecurityContext, the value specified in SecurityContext takes precedence.
         */
        runAsNonRoot?: boolean;
        /**
         * The UID to run the entrypoint of the container process.
         * Defaults to user specified in image metadata if unspecified.
         * May also be set in PodSecurityContext.  If set in both SecurityContext and
         * PodSecurityContext, the value specified in SecurityContext takes precedence.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        runAsUser?: number;
        /**
         * The SELinux context to be applied to the container.
         * If unspecified, the container runtime will allocate a random SELinux context for each
         * container.  May also be set in PodSecurityContext.  If set in both SecurityContext and
         * PodSecurityContext, the value specified in SecurityContext takes precedence.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        seLinuxOptions?: {
          /**
           * Level is SELinux level label that applies to the container.
           */
          level?: string;
          /**
           * Role is a SELinux role label that applies to the container.
           */
          role?: string;
          /**
           * Type is a SELinux type label that applies to the container.
           */
          type?: string;
          /**
           * User is a SELinux user label that applies to the container.
           */
          user?: string;
        };
        /**
         * The seccomp options to use by this container. If seccomp options are
         * provided at both the pod & container level, the container options
         * override the pod options.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        seccompProfile?: {
          /**
           * localhostProfile indicates a profile defined in a file on the node should be used.
           * The profile must be preconfigured on the node to work.
           * Must be a descending path, relative to the kubelet's configured seccomp profile location.
           * Must be set if type is "Localhost". Must NOT be set for any other type.
           */
          localhostProfile?: string;
          /**
           * type indicates which kind of seccomp profile will be applied.
           * Valid options are:
           *
           * Localhost - a profile defined in a file on the node should be used.
           * RuntimeDefault - the container runtime default profile should be used.
           * Unconfined - no profile should be applied.
           */
          type: string;
        };
        /**
         * The Windows specific settings applied to all containers.
         * If unspecified, the options from the PodSecurityContext will be used.
         * If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
         * Note that this field cannot be set when spec.os.name is linux.
         */
        windowsOptions?: {
          /**
           * GMSACredentialSpec is where the GMSA admission webhook
           * (https://github.com/kubernetes-sigs/windows-gmsa) inlines the contents of the
           * GMSA credential spec named by the GMSACredentialSpecName field.
           */
          gmsaCredentialSpec?: string;
          /**
           * GMSACredentialSpecName is the name of the GMSA credential spec to use.
           */
          gmsaCredentialSpecName?: string;
          /**
           * HostProcess determines if a container should be run as a 'Host Process' container.
           * All of a Pod's containers must have the same effective HostProcess value
           * (it is not allowed to have a mix of HostProcess containers and non-HostProcess containers).
           * In addition, if HostProcess is true then HostNetwork must also be set to true.
           */
          hostProcess?: boolean;
          /**
           * The UserName in Windows to run the entrypoint of the container process.
           * Defaults to the user specified in image metadata if unspecified.
           * May also be set in PodSecurityContext. If set in both SecurityContext and
           * PodSecurityContext, the value specified in SecurityContext takes precedence.
           */
          runAsUserName?: string;
        };
      };
      /**
       * StartupProbe indicates that the Pod has successfully initialized.
       * If specified, no other probes are executed until this completes successfully.
       * If this probe fails, the Pod will be restarted, just as if the livenessProbe failed.
       * This can be used to provide different probe parameters at the beginning of a Pod's lifecycle,
       * when it might take a long time to load data or warm a cache, than during steady-state operation.
       * This cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       */
      startupProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: string[];
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: {
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }[];
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Whether this container should allocate a buffer for stdin in the container runtime. If this
       * is not set, reads from stdin in the container will always result in EOF.
       * Default is false.
       */
      stdin?: boolean;
      /**
       * Whether the container runtime should close the stdin channel after it has been opened by
       * a single attach. When stdin is true the stdin stream will remain open across multiple attach
       * sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the
       * first client attaches to stdin, and then remains open and accepts data until the client disconnects,
       * at which time stdin is closed and remains closed until the container is restarted. If this
       * flag is false, a container processes that reads from stdin will never receive an EOF.
       * Default is false
       */
      stdinOnce?: boolean;
      /**
       * Optional: Path at which the file to which the container's termination message
       * will be written is mounted into the container's filesystem.
       * Message written is intended to be brief final status, such as an assertion failure message.
       * Will be truncated by the node if greater than 4096 bytes. The total message length across
       * all containers will be limited to 12kb.
       * Defaults to /dev/termination-log.
       * Cannot be updated.
       */
      terminationMessagePath?: string;
      /**
       * Indicate how the termination message should be populated. File will use the contents of
       * terminationMessagePath to populate the container status message on both success and failure.
       * FallbackToLogsOnError will use the last chunk of container log output if the termination
       * message file is empty and the container exited with an error.
       * The log output is limited to 2048 bytes or 80 lines, whichever is smaller.
       * Defaults to File.
       * Cannot be updated.
       */
      terminationMessagePolicy?: string;
      /**
       * Whether this container should allocate a TTY for itself, also requires 'stdin' to be true.
       * Default is false.
       */
      tty?: boolean;
      /**
       * volumeDevices is the list of block devices to be used by the container.
       */
      volumeDevices?: {
        /**
         * devicePath is the path inside of the container that the device will be mapped to.
         */
        devicePath: string;
        /**
         * name must match the name of a persistentVolumeClaim in the pod
         */
        name: string;
      }[];
      /**
       * Pod volumes to mount into the container's filesystem.
       * Cannot be updated.
       */
      volumeMounts?: {
        /**
         * Path within the container at which the volume should be mounted.  Must
         * not contain ':'.
         */
        mountPath: string;
        /**
         * mountPropagation determines how mounts are propagated from the host
         * to container and the other way around.
         * When not set, MountPropagationNone is used.
         * This field is beta in 1.10.
         * When RecursiveReadOnly is set to IfPossible or to Enabled, MountPropagation must be None or unspecified
         * (which defaults to None).
         */
        mountPropagation?: string;
        /**
         * This must match the Name of a Volume.
         */
        name: string;
        /**
         * Mounted read-only if true, read-write otherwise (false or unspecified).
         * Defaults to false.
         */
        readOnly?: boolean;
        /**
         * RecursiveReadOnly specifies whether read-only mounts should be handled
         * recursively.
         *
         * If ReadOnly is false, this field has no meaning and must be unspecified.
         *
         * If ReadOnly is true, and this field is set to Disabled, the mount is not made
         * recursively read-only.  If this field is set to IfPossible, the mount is made
         * recursively read-only, if it is supported by the container runtime.  If this
         * field is set to Enabled, the mount is made recursively read-only if it is
         * supported by the container runtime, otherwise the pod will not be started and
         * an error will be generated to indicate the reason.
         *
         * If this field is set to IfPossible or Enabled, MountPropagation must be set to
         * None (or be unspecified, which defaults to None).
         *
         * If this field is not specified, it is treated as an equivalent of Disabled.
         */
        recursiveReadOnly?: string;
        /**
         * Path within the volume from which the container's volume should be mounted.
         * Defaults to "" (volume's root).
         */
        subPath?: string;
        /**
         * Expanded path within the volume from which the container's volume should be mounted.
         * Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container's environment.
         * Defaults to "" (volume's root).
         * SubPathExpr and SubPath are mutually exclusive.
         */
        subPathExpr?: string;
      }[];
      /**
       * Container's working directory.
       * If not specified, the container runtime's default will be used, which
       * might be configured in the container image.
       * Cannot be updated.
       */
      workingDir?: string;
    }[];

    /**
     * Defines the DNS configuration for the pods.
     */
    dnsConfig?: {
      /**
       * A list of DNS name server IP addresses.
       * This will be appended to the base nameservers generated from DNSPolicy.
       */
      nameservers?: string[];
      /**
       * A list of DNS resolver options.
       * This will be merged with the base options generated from DNSPolicy.
       * Resolution options given in Options
       * will override those that appear in the base DNSPolicy.
       */
      options?: {
        /**
         * Name is required and must be unique.
         */
        name: string;
        /**
         * Value is optional.
         */
        value?: string;
      }[];
      /**
       * A list of DNS search domains for host-name lookup.
       * This will be appended to the base search paths generated from DNSPolicy.
       */
      searches?: string[];
    };

    /**
     * Defines the DNS policy for the pods.
     */
    dnsPolicy?: "ClusterFirstWithHostNet" | "ClusterFirst" | "Default" | "None";

    /**
     * Enable access to Alertmanager feature flags. By default, no features are enabled.
     * Enabling features which are disabled by default is entirely outside the
     * scope of what the maintainers will support and by doing so, you accept
     * that this behaviour may break at any time without notice.
     *
     * It requires Alertmanager >= 0.27.0.
     */
    enableFeatures?: string[];

    /**
     * The external URL the Alertmanager instances will be available under. This is
     * necessary to generate correct URLs. This is necessary if Alertmanager is not
     * served from root of a DNS name.
     */
    externalUrl?: string;

    /**
     * ForceEnableClusterMode ensures Alertmanager does not deactivate the cluster mode when running with a single replica.
     * Use case is e.g. spanning an Alertmanager cluster across Kubernetes clusters with a single replica in each.
     */
    forceEnableClusterMode?: boolean;

    /**
     * Pods' hostAliases configuration
     */
    hostAliases?: {
      /**
       * Hostnames for the above IP address.
       */
      hostnames: string[];
      /**
       * IP address of the host file entry.
       */
      ip: string;
    }[];

    /**
     * Image if specified has precedence over baseImage, tag and sha
     * combinations. Specifying the version is still necessary to ensure the
     * Prometheus Operator knows what version of Alertmanager is being
     * configured.
     */
    image?: string;

    /**
     * Image pull policy for the 'alertmanager', 'init-config-reloader' and 'config-reloader' containers.
     * See https://kubernetes.io/docs/concepts/containers/images/#image-pull-policy for more details.
     */
    imagePullPolicy?: "" | "Always" | "Never" | "IfNotPresent";

    /**
     * An optional list of references to secrets in the same namespace
     * to use for pulling prometheus and alertmanager images from registries
     * see http://kubernetes.io/docs/user-guide/images#specifying-imagepullsecrets-on-a-pod
     */
    imagePullSecrets?: {
      /**
       * Name of the referent.
       * This field is effectively required, but due to backwards compatibility is
       * allowed to be empty. Instances of this type with an empty value here are
       * almost certainly wrong.
       * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
       */
      name?: string;
    }[];

    /**
     * InitContainers allows adding initContainers to the pod definition. Those can be used to e.g.
     * fetch secrets for injection into the Alertmanager configuration from external sources. Any
     * errors during the execution of an initContainer will lead to a restart of the Pod. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
     * InitContainers described here modify an operator
     * generated init containers if they share the same name and modifications are
     * done via a strategic merge patch. The current init container name is:
     * `init-config-reloader`. Overriding init containers is entirely outside the
     * scope of what the maintainers will support and by doing so, you accept that
     * this behaviour may break at any time without notice.
     */
    initContainers?: {
      /**
       * Arguments to the entrypoint.
       * The container image's CMD is used if this is not provided.
       * Variable references $(VAR_NAME) are expanded using the container's environment. If a variable
       * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
       * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
       * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
       * of whether the variable exists or not. Cannot be updated.
       * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
       */
      args?: string[];
      /**
       * Entrypoint array. Not executed within a shell.
       * The container image's ENTRYPOINT is used if this is not provided.
       * Variable references $(VAR_NAME) are expanded using the container's environment. If a variable
       * cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced
       * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will
       * produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless
       * of whether the variable exists or not. Cannot be updated.
       * More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell
       */
      command?: string[];
      /**
       * List of environment variables to set in the container.
       * Cannot be updated.
       */
      env?: {
        /**
         * Name of the environment variable. Must be a C_IDENTIFIER.
         */
        name: string;
        /**
         * Variable references $(VAR_NAME) are expanded
         * using the previously defined environment variables in the container and
         * any service environment variables. If a variable cannot be resolved,
         * the reference in the input string will be unchanged. Double $$ are reduced
         * to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e.
         * "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)".
         * Escaped references will never be expanded, regardless of whether the variable
         * exists or not.
         * Defaults to "".
         */
        value?: string;
        /**
         * Source for the environment variable's value. Cannot be used if value is not empty.
         */
        valueFrom?: {
          /**
           * Selects a key of a ConfigMap.
           */
          configMapKeyRef?: {
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
           * Selects a field of the pod: supports metadata.name, metadata.namespace, `metadata.labels['<KEY>']`, `metadata.annotations['<KEY>']`,
           * spec.nodeName, spec.serviceAccountName, status.hostIP, status.podIP, status.podIPs.
           */
          fieldRef?: {
            /**
             * Version of the schema the FieldPath is written in terms of, defaults to "v1".
             */
            apiVersion?: string;
            /**
             * Path of the field to select in the specified API version.
             */
            fieldPath: string;
          };
          /**
           * Selects a resource of the container: only resources limits and requests
           * (limits.cpu, limits.memory, limits.ephemeral-storage, requests.cpu, requests.memory and requests.ephemeral-storage) are currently supported.
           */
          resourceFieldRef?: {
            /**
             * Container name: required for volumes, optional for env vars
             */
            containerName?: string;
            /**
             * Specifies the output format of the exposed resources, defaults to "1"
             */
            divisor?: number | string;
            /**
             * Required: resource to select
             */
            resource: string;
          };
          /**
           * Selects a key of a secret in the pod's namespace
           */
          secretKeyRef?: {
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
      }[];
      /**
       * List of sources to populate environment variables in the container.
       * The keys defined within a source must be a C_IDENTIFIER. All invalid keys
       * will be reported as an event when the container is starting. When a key exists in multiple
       * sources, the value associated with the last source will take precedence.
       * Values defined by an Env with a duplicate key will take precedence.
       * Cannot be updated.
       */
      envFrom?: {
        /**
         * The ConfigMap to select from
         */
        configMapRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the ConfigMap must be defined
           */
          optional?: boolean;
        };
        /**
         * An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.
         */
        prefix?: string;
        /**
         * The Secret to select from
         */
        secretRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
          /**
           * Specify whether the Secret must be defined
           */
          optional?: boolean;
        };
      }[];
      /**
       * Container image name.
       * More info: https://kubernetes.io/docs/concepts/containers/images
       * This field is optional to allow higher level config management to default or override
       * container images in workload controllers like Deployments and StatefulSets.
       */
      image?: string;
      /**
       * Image pull policy.
       * One of Always, Never, IfNotPresent.
       * Defaults to Always if :latest tag is specified, or IfNotPresent otherwise.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/containers/images#updating-images
       */
      imagePullPolicy?: string;
      /**
       * Actions that the management system should take in response to container lifecycle events.
       * Cannot be updated.
       */
      lifecycle?: {
        /**
         * PostStart is called immediately after a container is created. If the handler fails,
         * the container is terminated and restarted according to its restart policy.
         * Other management of the container blocks until the hook completes.
         * More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
         */
        postStart?: {
          /**
           * Exec specifies a command to execute in the container.
           */
          exec?: {
            /**
             * Command is the command line to execute inside the container, the working directory for the
             * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
             * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
             * a shell, you need to explicitly call out to that shell.
             * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
             */
            command?: string[];
          };
          /**
           * HTTPGet specifies an HTTP GET request to perform.
           */
          httpGet?: {
            /**
             * Host name to connect to, defaults to the pod IP. You probably want to set
             * "Host" in httpHeaders instead.
             */
            host?: string;
            /**
             * Custom headers to set in the request. HTTP allows repeated headers.
             */
            httpHeaders?: {
              /**
               * The header field name.
               * This will be canonicalized upon output, so case-variant names will be understood as the same header.
               */
              name: string;
              /**
               * The header field value
               */
              value: string;
            }[];
            /**
             * Path to access on the HTTP server.
             */
            path?: string;
            /**
             * Name or number of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
            /**
             * Scheme to use for connecting to the host.
             * Defaults to HTTP.
             */
            scheme?: string;
          };
          /**
           * Sleep represents a duration that the container should sleep.
           */
          sleep?: {
            /**
             * Seconds is the number of seconds to sleep.
             */
            seconds: number;
          };
          /**
           * Deprecated. TCPSocket is NOT supported as a LifecycleHandler and kept
           * for backward compatibility. There is no validation of this field and
           * lifecycle hooks will fail at runtime when it is specified.
           */
          tcpSocket?: {
            /**
             * Optional: Host name to connect to, defaults to the pod IP.
             */
            host?: string;
            /**
             * Number or name of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
          };
        };
        /**
         * PreStop is called immediately before a container is terminated due to an
         * API request or management event such as liveness/startup probe failure,
         * preemption, resource contention, etc. The handler is not called if the
         * container crashes or exits. The Pod's termination grace period countdown begins before the
         * PreStop hook is executed. Regardless of the outcome of the handler, the
         * container will eventually terminate within the Pod's termination grace
         * period (unless delayed by finalizers). Other management of the container blocks until the hook completes
         * or until the termination grace period is reached.
         * More info: https://kubernetes.io/docs/concepts/containers/container-lifecycle-hooks/#container-hooks
         */
        preStop?: {
          /**
           * Exec specifies a command to execute in the container.
           */
          exec?: {
            /**
             * Command is the command line to execute inside the container, the working directory for the
             * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
             * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
             * a shell, you need to explicitly call out to that shell.
             * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
             */
            command?: string[];
          };
          /**
           * HTTPGet specifies an HTTP GET request to perform.
           */
          httpGet?: {
            /**
             * Host name to connect to, defaults to the pod IP. You probably want to set
             * "Host" in httpHeaders instead.
             */
            host?: string;
            /**
             * Custom headers to set in the request. HTTP allows repeated headers.
             */
            httpHeaders?: {
              /**
               * The header field name.
               * This will be canonicalized upon output, so case-variant names will be understood as the same header.
               */
              name: string;
              /**
               * The header field value
               */
              value: string;
            }[];
            /**
             * Path to access on the HTTP server.
             */
            path?: string;
            /**
             * Name or number of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
            /**
             * Scheme to use for connecting to the host.
             * Defaults to HTTP.
             */
            scheme?: string;
          };
          /**
           * Sleep represents a duration that the container should sleep.
           */
          sleep?: {
            /**
             * Seconds is the number of seconds to sleep.
             */
            seconds: number;
          };
          /**
           * Deprecated. TCPSocket is NOT supported as a LifecycleHandler and kept
           * for backward compatibility. There is no validation of this field and
           * lifecycle hooks will fail at runtime when it is specified.
           */
          tcpSocket?: {
            /**
             * Optional: Host name to connect to, defaults to the pod IP.
             */
            host?: string;
            /**
             * Number or name of the port to access on the container.
             * Number must be in the range 1 to 65535.
             * Name must be an IANA_SVC_NAME.
             */
            port: number | string;
          };
        };
      };
      /**
       * Periodic probe of container liveness.
       * Container will be restarted if the probe fails.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       */
      livenessProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: string[];
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: {
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }[];
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Name of the container specified as a DNS_LABEL.
       * Each container in a pod must have a unique name (DNS_LABEL).
       * Cannot be updated.
       */
      name: string;
      /**
       * List of ports to expose from the container. Not specifying a port here
       * DOES NOT prevent that port from being exposed. Any port which is
       * listening on the default "0.0.0.0" address inside a container will be
       * accessible from the network.
       * Modifying this array with strategic merge patch may corrupt the data.
       * For more information See https://github.com/kubernetes/kubernetes/issues/108255.
       * Cannot be updated.
       */
      ports?: {
        /**
         * Number of port to expose on the pod's IP address.
         * This must be a valid port number, 0 < x < 65536.
         */
        containerPort: number;
        /**
         * What host IP to bind the external port to.
         */
        hostIP?: string;
        /**
         * Number of port to expose on the host.
         * If specified, this must be a valid port number, 0 < x < 65536.
         * If HostNetwork is specified, this must match ContainerPort.
         * Most containers do not need this.
         */
        hostPort?: number;
        /**
         * If specified, this must be an IANA_SVC_NAME and unique within the pod. Each
         * named port in a pod must have a unique name. Name for the port that can be
         * referred to by services.
         */
        name?: string;
        /**
         * Protocol for port. Must be UDP, TCP, or SCTP.
         * Defaults to "TCP".
         */
        protocol?: string;
      }[];
      /**
       * Periodic probe of container service readiness.
       * Container will be removed from service endpoints if the probe fails.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       */
      readinessProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: string[];
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: {
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }[];
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Resources resize policy for the container.
       */
      resizePolicy?: {
        /**
         * Name of the resource to which this resource resize policy applies.
         * Supported values: cpu, memory.
         */
        resourceName: string;
        /**
         * Restart policy to apply when specified resource is resized.
         * If not specified, it defaults to NotRequired.
         */
        restartPolicy: string;
      }[];
      /**
       * Compute Resources required by this container.
       * Cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
       */
      resources?: {
        /**
         * Claims lists the names of resources, defined in spec.resourceClaims,
         * that are used by this container.
         *
         * This is an alpha field and requires enabling the
         * DynamicResourceAllocation feature gate.
         *
         * This field is immutable. It can only be set for containers.
         */
        claims?: {
          /**
           * Name must match the name of one entry in pod.spec.resourceClaims of
           * the Pod where this field is used. It makes that resource available
           * inside a container.
           */
          name: string;
          /**
           * Request is the name chosen for a request in the referenced claim.
           * If empty, everything from the claim is made available, otherwise
           * only the result of this request.
           */
          request?: string;
        }[];
        /**
         * Limits describes the maximum amount of compute resources allowed.
         * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
         */
        limits?: {
          [k: string]: number | string;
        };
        /**
         * Requests describes the minimum amount of compute resources required.
         * If Requests is omitted for a container, it defaults to Limits if that is explicitly specified,
         * otherwise to an implementation-defined value. Requests cannot exceed Limits.
         * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
         */
        requests?: {
          [k: string]: number | string;
        };
      };
      /**
       * RestartPolicy defines the restart behavior of individual containers in a pod.
       * This field may only be set for init containers, and the only allowed value is "Always".
       * For non-init containers or when this field is not specified,
       * the restart behavior is defined by the Pod's restart policy and the container type.
       * Setting the RestartPolicy as "Always" for the init container will have the following effect:
       * this init container will be continually restarted on
       * exit until all regular containers have terminated. Once all regular
       * containers have completed, all init containers with restartPolicy "Always"
       * will be shut down. This lifecycle differs from normal init containers and
       * is often referred to as a "sidecar" container. Although this init
       * container still starts in the init container sequence, it does not wait
       * for the container to complete before proceeding to the next init
       * container. Instead, the next init container starts immediately after this
       * init container is started, or after any startupProbe has successfully
       * completed.
       */
      restartPolicy?: string;
      /**
       * SecurityContext defines the security options the container should be run with.
       * If set, the fields of SecurityContext override the equivalent fields of PodSecurityContext.
       * More info: https://kubernetes.io/docs/tasks/configure-pod-container/security-context/
       */
      securityContext?: {
        /**
         * AllowPrivilegeEscalation controls whether a process can gain more
         * privileges than its parent process. This bool directly controls if
         * the no_new_privs flag will be set on the container process.
         * AllowPrivilegeEscalation is true always when the container is:
         * 1) run as Privileged
         * 2) has CAP_SYS_ADMIN
         * Note that this field cannot be set when spec.os.name is windows.
         */
        allowPrivilegeEscalation?: boolean;
        /**
         * appArmorProfile is the AppArmor options to use by this container. If set, this profile
         * overrides the pod's appArmorProfile.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        appArmorProfile?: {
          /**
           * localhostProfile indicates a profile loaded on the node that should be used.
           * The profile must be preconfigured on the node to work.
           * Must match the loaded name of the profile.
           * Must be set if and only if type is "Localhost".
           */
          localhostProfile?: string;
          /**
           * type indicates which kind of AppArmor profile will be applied.
           * Valid options are:
           *   Localhost - a profile pre-loaded on the node.
           *   RuntimeDefault - the container runtime's default profile.
           *   Unconfined - no AppArmor enforcement.
           */
          type: string;
        };
        /**
         * The capabilities to add/drop when running containers.
         * Defaults to the default set of capabilities granted by the container runtime.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        capabilities?: {
          /**
           * Added capabilities
           */
          add?: string[];
          /**
           * Removed capabilities
           */
          drop?: string[];
        };
        /**
         * Run container in privileged mode.
         * Processes in privileged containers are essentially equivalent to root on the host.
         * Defaults to false.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        privileged?: boolean;
        /**
         * procMount denotes the type of proc mount to use for the containers.
         * The default value is Default which uses the container runtime defaults for
         * readonly paths and masked paths.
         * This requires the ProcMountType feature flag to be enabled.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        procMount?: string;
        /**
         * Whether this container has a read-only root filesystem.
         * Default is false.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        readOnlyRootFilesystem?: boolean;
        /**
         * The GID to run the entrypoint of the container process.
         * Uses runtime default if unset.
         * May also be set in PodSecurityContext.  If set in both SecurityContext and
         * PodSecurityContext, the value specified in SecurityContext takes precedence.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        runAsGroup?: number;
        /**
         * Indicates that the container must run as a non-root user.
         * If true, the Kubelet will validate the image at runtime to ensure that it
         * does not run as UID 0 (root) and fail to start the container if it does.
         * If unset or false, no such validation will be performed.
         * May also be set in PodSecurityContext.  If set in both SecurityContext and
         * PodSecurityContext, the value specified in SecurityContext takes precedence.
         */
        runAsNonRoot?: boolean;
        /**
         * The UID to run the entrypoint of the container process.
         * Defaults to user specified in image metadata if unspecified.
         * May also be set in PodSecurityContext.  If set in both SecurityContext and
         * PodSecurityContext, the value specified in SecurityContext takes precedence.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        runAsUser?: number;
        /**
         * The SELinux context to be applied to the container.
         * If unspecified, the container runtime will allocate a random SELinux context for each
         * container.  May also be set in PodSecurityContext.  If set in both SecurityContext and
         * PodSecurityContext, the value specified in SecurityContext takes precedence.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        seLinuxOptions?: {
          /**
           * Level is SELinux level label that applies to the container.
           */
          level?: string;
          /**
           * Role is a SELinux role label that applies to the container.
           */
          role?: string;
          /**
           * Type is a SELinux type label that applies to the container.
           */
          type?: string;
          /**
           * User is a SELinux user label that applies to the container.
           */
          user?: string;
        };
        /**
         * The seccomp options to use by this container. If seccomp options are
         * provided at both the pod & container level, the container options
         * override the pod options.
         * Note that this field cannot be set when spec.os.name is windows.
         */
        seccompProfile?: {
          /**
           * localhostProfile indicates a profile defined in a file on the node should be used.
           * The profile must be preconfigured on the node to work.
           * Must be a descending path, relative to the kubelet's configured seccomp profile location.
           * Must be set if type is "Localhost". Must NOT be set for any other type.
           */
          localhostProfile?: string;
          /**
           * type indicates which kind of seccomp profile will be applied.
           * Valid options are:
           *
           * Localhost - a profile defined in a file on the node should be used.
           * RuntimeDefault - the container runtime default profile should be used.
           * Unconfined - no profile should be applied.
           */
          type: string;
        };
        /**
         * The Windows specific settings applied to all containers.
         * If unspecified, the options from the PodSecurityContext will be used.
         * If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
         * Note that this field cannot be set when spec.os.name is linux.
         */
        windowsOptions?: {
          /**
           * GMSACredentialSpec is where the GMSA admission webhook
           * (https://github.com/kubernetes-sigs/windows-gmsa) inlines the contents of the
           * GMSA credential spec named by the GMSACredentialSpecName field.
           */
          gmsaCredentialSpec?: string;
          /**
           * GMSACredentialSpecName is the name of the GMSA credential spec to use.
           */
          gmsaCredentialSpecName?: string;
          /**
           * HostProcess determines if a container should be run as a 'Host Process' container.
           * All of a Pod's containers must have the same effective HostProcess value
           * (it is not allowed to have a mix of HostProcess containers and non-HostProcess containers).
           * In addition, if HostProcess is true then HostNetwork must also be set to true.
           */
          hostProcess?: boolean;
          /**
           * The UserName in Windows to run the entrypoint of the container process.
           * Defaults to the user specified in image metadata if unspecified.
           * May also be set in PodSecurityContext. If set in both SecurityContext and
           * PodSecurityContext, the value specified in SecurityContext takes precedence.
           */
          runAsUserName?: string;
        };
      };
      /**
       * StartupProbe indicates that the Pod has successfully initialized.
       * If specified, no other probes are executed until this completes successfully.
       * If this probe fails, the Pod will be restarted, just as if the livenessProbe failed.
       * This can be used to provide different probe parameters at the beginning of a Pod's lifecycle,
       * when it might take a long time to load data or warm a cache, than during steady-state operation.
       * This cannot be updated.
       * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
       */
      startupProbe?: {
        /**
         * Exec specifies a command to execute in the container.
         */
        exec?: {
          /**
           * Command is the command line to execute inside the container, the working directory for the
           * command  is root ('/') in the container's filesystem. The command is simply exec'd, it is
           * not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use
           * a shell, you need to explicitly call out to that shell.
           * Exit status of 0 is treated as live/healthy and non-zero is unhealthy.
           */
          command?: string[];
        };
        /**
         * Minimum consecutive failures for the probe to be considered failed after having succeeded.
         * Defaults to 3. Minimum value is 1.
         */
        failureThreshold?: number;
        /**
         * GRPC specifies a GRPC HealthCheckRequest.
         */
        grpc?: {
          /**
           * Port number of the gRPC service. Number must be in the range 1 to 65535.
           */
          port: number;
          /**
           * Service is the name of the service to place in the gRPC HealthCheckRequest
           * (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).
           *
           * If this is not specified, the default behavior is defined by gRPC.
           */
          service?: string;
        };
        /**
         * HTTPGet specifies an HTTP GET request to perform.
         */
        httpGet?: {
          /**
           * Host name to connect to, defaults to the pod IP. You probably want to set
           * "Host" in httpHeaders instead.
           */
          host?: string;
          /**
           * Custom headers to set in the request. HTTP allows repeated headers.
           */
          httpHeaders?: {
            /**
             * The header field name.
             * This will be canonicalized upon output, so case-variant names will be understood as the same header.
             */
            name: string;
            /**
             * The header field value
             */
            value: string;
          }[];
          /**
           * Path to access on the HTTP server.
           */
          path?: string;
          /**
           * Name or number of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
          /**
           * Scheme to use for connecting to the host.
           * Defaults to HTTP.
           */
          scheme?: string;
        };
        /**
         * Number of seconds after the container has started before liveness probes are initiated.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        initialDelaySeconds?: number;
        /**
         * How often (in seconds) to perform the probe.
         * Default to 10 seconds. Minimum value is 1.
         */
        periodSeconds?: number;
        /**
         * Minimum consecutive successes for the probe to be considered successful after having failed.
         * Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.
         */
        successThreshold?: number;
        /**
         * TCPSocket specifies a connection to a TCP port.
         */
        tcpSocket?: {
          /**
           * Optional: Host name to connect to, defaults to the pod IP.
           */
          host?: string;
          /**
           * Number or name of the port to access on the container.
           * Number must be in the range 1 to 65535.
           * Name must be an IANA_SVC_NAME.
           */
          port: number | string;
        };
        /**
         * Optional duration in seconds the pod needs to terminate gracefully upon probe failure.
         * The grace period is the duration in seconds after the processes running in the pod are sent
         * a termination signal and the time when the processes are forcibly halted with a kill signal.
         * Set this value longer than the expected cleanup time for your process.
         * If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this
         * value overrides the value provided by the pod spec.
         * Value must be non-negative integer. The value zero indicates stop immediately via
         * the kill signal (no opportunity to shut down).
         * This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate.
         * Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.
         */
        terminationGracePeriodSeconds?: number;
        /**
         * Number of seconds after which the probe times out.
         * Defaults to 1 second. Minimum value is 1.
         * More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes
         */
        timeoutSeconds?: number;
      };
      /**
       * Whether this container should allocate a buffer for stdin in the container runtime. If this
       * is not set, reads from stdin in the container will always result in EOF.
       * Default is false.
       */
      stdin?: boolean;
      /**
       * Whether the container runtime should close the stdin channel after it has been opened by
       * a single attach. When stdin is true the stdin stream will remain open across multiple attach
       * sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the
       * first client attaches to stdin, and then remains open and accepts data until the client disconnects,
       * at which time stdin is closed and remains closed until the container is restarted. If this
       * flag is false, a container processes that reads from stdin will never receive an EOF.
       * Default is false
       */
      stdinOnce?: boolean;
      /**
       * Optional: Path at which the file to which the container's termination message
       * will be written is mounted into the container's filesystem.
       * Message written is intended to be brief final status, such as an assertion failure message.
       * Will be truncated by the node if greater than 4096 bytes. The total message length across
       * all containers will be limited to 12kb.
       * Defaults to /dev/termination-log.
       * Cannot be updated.
       */
      terminationMessagePath?: string;
      /**
       * Indicate how the termination message should be populated. File will use the contents of
       * terminationMessagePath to populate the container status message on both success and failure.
       * FallbackToLogsOnError will use the last chunk of container log output if the termination
       * message file is empty and the container exited with an error.
       * The log output is limited to 2048 bytes or 80 lines, whichever is smaller.
       * Defaults to File.
       * Cannot be updated.
       */
      terminationMessagePolicy?: string;
      /**
       * Whether this container should allocate a TTY for itself, also requires 'stdin' to be true.
       * Default is false.
       */
      tty?: boolean;
      /**
       * volumeDevices is the list of block devices to be used by the container.
       */
      volumeDevices?: {
        /**
         * devicePath is the path inside of the container that the device will be mapped to.
         */
        devicePath: string;
        /**
         * name must match the name of a persistentVolumeClaim in the pod
         */
        name: string;
      }[];
      /**
       * Pod volumes to mount into the container's filesystem.
       * Cannot be updated.
       */
      volumeMounts?: {
        /**
         * Path within the container at which the volume should be mounted.  Must
         * not contain ':'.
         */
        mountPath: string;
        /**
         * mountPropagation determines how mounts are propagated from the host
         * to container and the other way around.
         * When not set, MountPropagationNone is used.
         * This field is beta in 1.10.
         * When RecursiveReadOnly is set to IfPossible or to Enabled, MountPropagation must be None or unspecified
         * (which defaults to None).
         */
        mountPropagation?: string;
        /**
         * This must match the Name of a Volume.
         */
        name: string;
        /**
         * Mounted read-only if true, read-write otherwise (false or unspecified).
         * Defaults to false.
         */
        readOnly?: boolean;
        /**
         * RecursiveReadOnly specifies whether read-only mounts should be handled
         * recursively.
         *
         * If ReadOnly is false, this field has no meaning and must be unspecified.
         *
         * If ReadOnly is true, and this field is set to Disabled, the mount is not made
         * recursively read-only.  If this field is set to IfPossible, the mount is made
         * recursively read-only, if it is supported by the container runtime.  If this
         * field is set to Enabled, the mount is made recursively read-only if it is
         * supported by the container runtime, otherwise the pod will not be started and
         * an error will be generated to indicate the reason.
         *
         * If this field is set to IfPossible or Enabled, MountPropagation must be set to
         * None (or be unspecified, which defaults to None).
         *
         * If this field is not specified, it is treated as an equivalent of Disabled.
         */
        recursiveReadOnly?: string;
        /**
         * Path within the volume from which the container's volume should be mounted.
         * Defaults to "" (volume's root).
         */
        subPath?: string;
        /**
         * Expanded path within the volume from which the container's volume should be mounted.
         * Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container's environment.
         * Defaults to "" (volume's root).
         * SubPathExpr and SubPath are mutually exclusive.
         */
        subPathExpr?: string;
      }[];
      /**
       * Container's working directory.
       * If not specified, the container runtime's default will be used, which
       * might be configured in the container image.
       * Cannot be updated.
       */
      workingDir?: string;
    }[];

    /**
     * ListenLocal makes the Alertmanager server listen on loopback, so that it
     * does not bind against the Pod IP. Note this is only for the Alertmanager
     * UI, not the gossip communication.
     */
    listenLocal?: boolean;

    /**
     * Log format for Alertmanager to be configured with.
     */
    logFormat?: "" | "logfmt" | "json";

    /**
     * Log level for Alertmanager to be configured with.
     */
    logLevel?: "" | "debug" | "info" | "warn" | "error";

    /**
     * Minimum number of seconds for which a newly created pod should be ready
     * without any of its container crashing for it to be considered available.
     * Defaults to 0 (pod will be considered available as soon as it is ready)
     * This is an alpha field from kubernetes 1.22 until 1.24 which requires enabling the StatefulSetMinReadySeconds feature gate.
     */
    minReadySeconds?: number;

    /**
     * Define which Nodes the Pods are scheduled on.
     */
    nodeSelector?: {
      [k: string]: string;
    };

    /**
     * If set to true all actions on the underlying managed objects are not
     * goint to be performed, except for delete actions.
     */
    paused?: boolean;

    /**
     * The field controls if and how PVCs are deleted during the lifecycle of a StatefulSet.
     * The default behavior is all PVCs are retained.
     * This is an alpha field from kubernetes 1.23 until 1.26 and a beta field from 1.26.
     * It requires enabling the StatefulSetAutoDeletePVC feature gate.
     */
    persistentVolumeClaimRetentionPolicy?: {
      /**
       * WhenDeleted specifies what happens to PVCs created from StatefulSet
       * VolumeClaimTemplates when the StatefulSet is deleted. The default policy
       * of `Retain` causes PVCs to not be affected by StatefulSet deletion. The
       * `Delete` policy causes those PVCs to be deleted.
       */
      whenDeleted?: string;
      /**
       * WhenScaled specifies what happens to PVCs created from StatefulSet
       * VolumeClaimTemplates when the StatefulSet is scaled down. The default
       * policy of `Retain` causes PVCs to not be affected by a scaledown. The
       * `Delete` policy causes the associated PVCs for any excess pods above
       * the replica count to be deleted.
       */
      whenScaled?: string;
    };

    /**
     * PodMetadata configures labels and annotations which are propagated to the Alertmanager pods.
     *
     * The following items are reserved and cannot be overridden:
     * * "alertmanager" label, set to the name of the Alertmanager instance.
     * * "app.kubernetes.io/instance" label, set to the name of the Alertmanager instance.
     * * "app.kubernetes.io/managed-by" label, set to "prometheus-operator".
     * * "app.kubernetes.io/name" label, set to "alertmanager".
     * * "app.kubernetes.io/version" label, set to the Alertmanager version.
     * * "kubectl.kubernetes.io/default-container" annotation, set to "alertmanager".
     */
    podMetadata?: {
      /**
       * Annotations is an unstructured key value map stored with a resource that may be
       * set by external tools to store and retrieve arbitrary metadata. They are not
       * queryable and should be preserved when modifying objects.
       * More info: http://kubernetes.io/docs/user-guide/annotations
       */
      annotations?: {
        [k: string]: string;
      };
      /**
       * Map of string keys and values that can be used to organize and categorize
       * (scope and select) objects. May match selectors of replication controllers
       * and services.
       * More info: http://kubernetes.io/docs/user-guide/labels
       */
      labels?: {
        [k: string]: string;
      };
      /**
       * Name must be unique within a namespace. Is required when creating resources, although
       * some resources may allow a client to request the generation of an appropriate name
       * automatically. Name is primarily intended for creation idempotence and configuration
       * definition.
       * Cannot be updated.
       * More info: http://kubernetes.io/docs/user-guide/identifiers#names
       */
      name?: string;
    };

    /**
     * Port name used for the pods and governing service.
     * Defaults to `web`.
     */
    portName?: string;

    /**
     * Priority class assigned to the Pods
     */
    priorityClassName?: string;

    /**
     * Size is the expected size of the alertmanager cluster. The controller will
     * eventually make the size of the running cluster equal to the expected
     * size.
     */
    replicas?: number;

    /**
     * Define resources requests and limits for single Pods.
     */
    resources?: {
      /**
       * Claims lists the names of resources, defined in spec.resourceClaims,
       * that are used by this container.
       *
       * This is an alpha field and requires enabling the
       * DynamicResourceAllocation feature gate.
       *
       * This field is immutable. It can only be set for containers.
       */
      claims?: {
        /**
         * Name must match the name of one entry in pod.spec.resourceClaims of
         * the Pod where this field is used. It makes that resource available
         * inside a container.
         */
        name: string;
        /**
         * Request is the name chosen for a request in the referenced claim.
         * If empty, everything from the claim is made available, otherwise
         * only the result of this request.
         */
        request?: string;
      }[];
      /**
       * Limits describes the maximum amount of compute resources allowed.
       * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
       */
      limits?: {
        [k: string]: number | string;
      };
      /**
       * Requests describes the minimum amount of compute resources required.
       * If Requests is omitted for a container, it defaults to Limits if that is explicitly specified,
       * otherwise to an implementation-defined value. Requests cannot exceed Limits.
       * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
       */
      requests?: {
        [k: string]: number | string;
      };
    };

    /**
     * Time duration Alertmanager shall retain data for. Default is '120h',
     * and must match the regular expression `[0-9]+(ms|s|m|h)` (milliseconds seconds minutes hours).
     */
    retention?: string;

    /**
     * The route prefix Alertmanager registers HTTP handlers for. This is useful,
     * if using ExternalURL and a proxy is rewriting HTTP routes of a request,
     * and the actual ExternalURL is still true, but the server serves requests
     * under a different route prefix. For example for use with `kubectl proxy`.
     */
    routePrefix?: string;

    /**
     * Secrets is a list of Secrets in the same namespace as the Alertmanager
     * object, which shall be mounted into the Alertmanager Pods.
     * Each Secret is added to the StatefulSet definition as a volume named `secret-<secret-name>`.
     * The Secrets are mounted into `/etc/alertmanager/secrets/<secret-name>` in the 'alertmanager' container.
     */
    secrets?: string[];

    /**
     * SecurityContext holds pod-level security attributes and common container settings.
     * This defaults to the default PodSecurityContext.
     */
    securityContext?: {
      /**
       * appArmorProfile is the AppArmor options to use by the containers in this pod.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      appArmorProfile?: {
        /**
         * localhostProfile indicates a profile loaded on the node that should be used.
         * The profile must be preconfigured on the node to work.
         * Must match the loaded name of the profile.
         * Must be set if and only if type is "Localhost".
         */
        localhostProfile?: string;
        /**
         * type indicates which kind of AppArmor profile will be applied.
         * Valid options are:
         *   Localhost - a profile pre-loaded on the node.
         *   RuntimeDefault - the container runtime's default profile.
         *   Unconfined - no AppArmor enforcement.
         */
        type: string;
      };
      /**
       * A special supplemental group that applies to all containers in a pod.
       * Some volume types allow the Kubelet to change the ownership of that volume
       * to be owned by the pod:
       *
       * 1. The owning GID will be the FSGroup
       * 2. The setgid bit is set (new files created in the volume will be owned by FSGroup)
       * 3. The permission bits are OR'd with rw-rw----
       *
       * If unset, the Kubelet will not modify the ownership and permissions of any volume.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      fsGroup?: number;
      /**
       * fsGroupChangePolicy defines behavior of changing ownership and permission of the volume
       * before being exposed inside Pod. This field will only apply to
       * volume types which support fsGroup based ownership(and permissions).
       * It will have no effect on ephemeral volume types such as: secret, configmaps
       * and emptydir.
       * Valid values are "OnRootMismatch" and "Always". If not specified, "Always" is used.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      fsGroupChangePolicy?: string;
      /**
       * The GID to run the entrypoint of the container process.
       * Uses runtime default if unset.
       * May also be set in SecurityContext.  If set in both SecurityContext and
       * PodSecurityContext, the value specified in SecurityContext takes precedence
       * for that container.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      runAsGroup?: number;
      /**
       * Indicates that the container must run as a non-root user.
       * If true, the Kubelet will validate the image at runtime to ensure that it
       * does not run as UID 0 (root) and fail to start the container if it does.
       * If unset or false, no such validation will be performed.
       * May also be set in SecurityContext.  If set in both SecurityContext and
       * PodSecurityContext, the value specified in SecurityContext takes precedence.
       */
      runAsNonRoot?: boolean;
      /**
       * The UID to run the entrypoint of the container process.
       * Defaults to user specified in image metadata if unspecified.
       * May also be set in SecurityContext.  If set in both SecurityContext and
       * PodSecurityContext, the value specified in SecurityContext takes precedence
       * for that container.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      runAsUser?: number;
      /**
       * seLinuxChangePolicy defines how the container's SELinux label is applied to all volumes used by the Pod.
       * It has no effect on nodes that do not support SELinux or to volumes does not support SELinux.
       * Valid values are "MountOption" and "Recursive".
       *
       * "Recursive" means relabeling of all files on all Pod volumes by the container runtime.
       * This may be slow for large volumes, but allows mixing privileged and unprivileged Pods sharing the same volume on the same node.
       *
       * "MountOption" mounts all eligible Pod volumes with `-o context` mount option.
       * This requires all Pods that share the same volume to use the same SELinux label.
       * It is not possible to share the same volume among privileged and unprivileged Pods.
       * Eligible volumes are in-tree FibreChannel and iSCSI volumes, and all CSI volumes
       * whose CSI driver announces SELinux support by setting spec.seLinuxMount: true in their
       * CSIDriver instance. Other volumes are always re-labelled recursively.
       * "MountOption" value is allowed only when SELinuxMount feature gate is enabled.
       *
       * If not specified and SELinuxMount feature gate is enabled, "MountOption" is used.
       * If not specified and SELinuxMount feature gate is disabled, "MountOption" is used for ReadWriteOncePod volumes
       * and "Recursive" for all other volumes.
       *
       * This field affects only Pods that have SELinux label set, either in PodSecurityContext or in SecurityContext of all containers.
       *
       * All Pods that use the same volume should use the same seLinuxChangePolicy, otherwise some pods can get stuck in ContainerCreating state.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      seLinuxChangePolicy?: string;
      /**
       * The SELinux context to be applied to all containers.
       * If unspecified, the container runtime will allocate a random SELinux context for each
       * container.  May also be set in SecurityContext.  If set in
       * both SecurityContext and PodSecurityContext, the value specified in SecurityContext
       * takes precedence for that container.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      seLinuxOptions?: {
        /**
         * Level is SELinux level label that applies to the container.
         */
        level?: string;
        /**
         * Role is a SELinux role label that applies to the container.
         */
        role?: string;
        /**
         * Type is a SELinux type label that applies to the container.
         */
        type?: string;
        /**
         * User is a SELinux user label that applies to the container.
         */
        user?: string;
      };
      /**
       * The seccomp options to use by the containers in this pod.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      seccompProfile?: {
        /**
         * localhostProfile indicates a profile defined in a file on the node should be used.
         * The profile must be preconfigured on the node to work.
         * Must be a descending path, relative to the kubelet's configured seccomp profile location.
         * Must be set if type is "Localhost". Must NOT be set for any other type.
         */
        localhostProfile?: string;
        /**
         * type indicates which kind of seccomp profile will be applied.
         * Valid options are:
         *
         * Localhost - a profile defined in a file on the node should be used.
         * RuntimeDefault - the container runtime default profile should be used.
         * Unconfined - no profile should be applied.
         */
        type: string;
      };
      /**
       * A list of groups applied to the first process run in each container, in
       * addition to the container's primary GID and fsGroup (if specified).  If
       * the SupplementalGroupsPolicy feature is enabled, the
       * supplementalGroupsPolicy field determines whether these are in addition
       * to or instead of any group memberships defined in the container image.
       * If unspecified, no additional groups are added, though group memberships
       * defined in the container image may still be used, depending on the
       * supplementalGroupsPolicy field.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      supplementalGroups?: number[];
      /**
       * Defines how supplemental groups of the first container processes are calculated.
       * Valid values are "Merge" and "Strict". If not specified, "Merge" is used.
       * (Alpha) Using the field requires the SupplementalGroupsPolicy feature gate to be enabled
       * and the container runtime must implement support for this feature.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      supplementalGroupsPolicy?: string;
      /**
       * Sysctls hold a list of namespaced sysctls used for the pod. Pods with unsupported
       * sysctls (by the container runtime) might fail to launch.
       * Note that this field cannot be set when spec.os.name is windows.
       */
      sysctls?: {
        /**
         * Name of a property to set
         */
        name: string;
        /**
         * Value of a property to set
         */
        value: string;
      }[];
      /**
       * The Windows specific settings applied to all containers.
       * If unspecified, the options within a container's SecurityContext will be used.
       * If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.
       * Note that this field cannot be set when spec.os.name is linux.
       */
      windowsOptions?: {
        /**
         * GMSACredentialSpec is where the GMSA admission webhook
         * (https://github.com/kubernetes-sigs/windows-gmsa) inlines the contents of the
         * GMSA credential spec named by the GMSACredentialSpecName field.
         */
        gmsaCredentialSpec?: string;
        /**
         * GMSACredentialSpecName is the name of the GMSA credential spec to use.
         */
        gmsaCredentialSpecName?: string;
        /**
         * HostProcess determines if a container should be run as a 'Host Process' container.
         * All of a Pod's containers must have the same effective HostProcess value
         * (it is not allowed to have a mix of HostProcess containers and non-HostProcess containers).
         * In addition, if HostProcess is true then HostNetwork must also be set to true.
         */
        hostProcess?: boolean;
        /**
         * The UserName in Windows to run the entrypoint of the container process.
         * Defaults to the user specified in image metadata if unspecified.
         * May also be set in PodSecurityContext. If set in both SecurityContext and
         * PodSecurityContext, the value specified in SecurityContext takes precedence.
         */
        runAsUserName?: string;
      };
    };

    /**
     * ServiceAccountName is the name of the ServiceAccount to use to run the
     * Prometheus Pods.
     */
    serviceAccountName?: string;

    /**
     * SHA of Alertmanager container image to be deployed. Defaults to the value of `version`.
     * Similar to a tag, but the SHA explicitly deploys an immutable container image.
     * Version and Tag are ignored if SHA is set.
     * Deprecated: use 'image' instead. The image digest can be specified as part of the image URL.
     */
    sha?: string;

    /**
     * Storage is the definition of how storage will be used by the Alertmanager
     * instances.
     */
    storage?: {
      /**
       * Deprecated: subPath usage will be removed in a future release.
       */
      disableMountSubPath?: boolean;
      /**
       * EmptyDirVolumeSource to be used by the StatefulSet.
       * If specified, it takes precedence over `ephemeral` and `volumeClaimTemplate`.
       * More info: https://kubernetes.io/docs/concepts/storage/volumes/#emptydir
       */
      emptyDir?: {
        /**
         * medium represents what type of storage medium should back this directory.
         * The default is "" which means to use the node's default medium.
         * Must be an empty string (default) or Memory.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
         */
        medium?: string;
        /**
         * sizeLimit is the total amount of local storage required for this EmptyDir volume.
         * The size limit is also applicable for memory medium.
         * The maximum usage on memory medium EmptyDir would be the minimum value between
         * the SizeLimit specified here and the sum of memory limits of all containers in a pod.
         * The default is nil which means that the limit is undefined.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
         */
        sizeLimit?: number | string;
      };
      /**
       * EphemeralVolumeSource to be used by the StatefulSet.
       * This is a beta field in k8s 1.21 and GA in 1.15.
       * For lower versions, starting with k8s 1.19, it requires enabling the GenericEphemeralVolume feature gate.
       * More info: https://kubernetes.io/docs/concepts/storage/ephemeral-volumes/#generic-ephemeral-volumes
       */
      ephemeral?: {
        /**
         * Will be used to create a stand-alone PVC to provision the volume.
         * The pod in which this EphemeralVolumeSource is embedded will be the
         * owner of the PVC, i.e. the PVC will be deleted together with the
         * pod.  The name of the PVC will be `<pod name>-<volume name>` where
         * `<volume name>` is the name from the `PodSpec.Volumes` array
         * entry. Pod validation will reject the pod if the concatenated name
         * is not valid for a PVC (for example, too long).
         *
         * An existing PVC with that name that is not owned by the pod
         * will *not* be used for the pod to avoid using an unrelated
         * volume by mistake. Starting the pod is then blocked until
         * the unrelated PVC is removed. If such a pre-created PVC is
         * meant to be used by the pod, the PVC has to updated with an
         * owner reference to the pod once the pod exists. Normally
         * this should not be necessary, but it may be useful when
         * manually reconstructing a broken cluster.
         *
         * This field is read-only and no changes will be made by Kubernetes
         * to the PVC after it has been created.
         *
         * Required, must not be nil.
         */
        volumeClaimTemplate?: {
          /**
           * May contain labels and annotations that will be copied into the PVC
           * when creating it. No other fields are allowed and will be rejected during
           * validation.
           */
          metadata?: {};
          /**
           * The specification for the PersistentVolumeClaim. The entire content is
           * copied unchanged into the PVC that gets created from this
           * template. The same fields as in a PersistentVolumeClaim
           * are also valid here.
           */
          spec: {
            /**
             * accessModes contains the desired access modes the volume should have.
             * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
             */
            accessModes?: string[];
            /**
             * dataSource field can be used to specify either:
             * * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot)
             * * An existing PVC (PersistentVolumeClaim)
             * If the provisioner or an external controller can support the specified data source,
             * it will create a new volume based on the contents of the specified data source.
             * When the AnyVolumeDataSource feature gate is enabled, dataSource contents will be copied to dataSourceRef,
             * and dataSourceRef contents will be copied to dataSource when dataSourceRef.namespace is not specified.
             * If the namespace is specified, then dataSourceRef will not be copied to dataSource.
             */
            dataSource?: {
              /**
               * APIGroup is the group for the resource being referenced.
               * If APIGroup is not specified, the specified Kind must be in the core API group.
               * For any other third-party types, APIGroup is required.
               */
              apiGroup?: string;
              /**
               * Kind is the type of resource being referenced
               */
              kind: string;
              /**
               * Name is the name of resource being referenced
               */
              name: string;
            };
            /**
             * dataSourceRef specifies the object from which to populate the volume with data, if a non-empty
             * volume is desired. This may be any object from a non-empty API group (non
             * core object) or a PersistentVolumeClaim object.
             * When this field is specified, volume binding will only succeed if the type of
             * the specified object matches some installed volume populator or dynamic
             * provisioner.
             * This field will replace the functionality of the dataSource field and as such
             * if both fields are non-empty, they must have the same value. For backwards
             * compatibility, when namespace isn't specified in dataSourceRef,
             * both fields (dataSource and dataSourceRef) will be set to the same
             * value automatically if one of them is empty and the other is non-empty.
             * When namespace is specified in dataSourceRef,
             * dataSource isn't set to the same value and must be empty.
             * There are three important differences between dataSource and dataSourceRef:
             * * While dataSource only allows two specific types of objects, dataSourceRef
             *   allows any non-core object, as well as PersistentVolumeClaim objects.
             * * While dataSource ignores disallowed values (dropping them), dataSourceRef
             *   preserves all values, and generates an error if a disallowed value is
             *   specified.
             * * While dataSource only allows local objects, dataSourceRef allows objects
             *   in any namespaces.
             * (Beta) Using this field requires the AnyVolumeDataSource feature gate to be enabled.
             * (Alpha) Using the namespace field of dataSourceRef requires the CrossNamespaceVolumeDataSource feature gate to be enabled.
             */
            dataSourceRef?: {
              /**
               * APIGroup is the group for the resource being referenced.
               * If APIGroup is not specified, the specified Kind must be in the core API group.
               * For any other third-party types, APIGroup is required.
               */
              apiGroup?: string;
              /**
               * Kind is the type of resource being referenced
               */
              kind: string;
              /**
               * Name is the name of resource being referenced
               */
              name: string;
              /**
               * Namespace is the namespace of resource being referenced
               * Note that when a namespace is specified, a gateway.networking.k8s.io/ReferenceGrant object is required in the referent namespace to allow that namespace's owner to accept the reference. See the ReferenceGrant documentation for details.
               * (Alpha) This field requires the CrossNamespaceVolumeDataSource feature gate to be enabled.
               */
              namespace?: string;
            };
            /**
             * resources represents the minimum resources the volume should have.
             * If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements
             * that are lower than previous value but must still be higher than capacity recorded in the
             * status field of the claim.
             * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
             */
            resources?: {
              /**
               * Limits describes the maximum amount of compute resources allowed.
               * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
               */
              limits?: {
                [k: string]: number | string;
              };
              /**
               * Requests describes the minimum amount of compute resources required.
               * If Requests is omitted for a container, it defaults to Limits if that is explicitly specified,
               * otherwise to an implementation-defined value. Requests cannot exceed Limits.
               * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
               */
              requests?: {
                [k: string]: number | string;
              };
            };
            /**
             * selector is a label query over volumes to consider for binding.
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
            /**
             * storageClassName is the name of the StorageClass required by the claim.
             * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1
             */
            storageClassName?: string;
            /**
             * volumeAttributesClassName may be used to set the VolumeAttributesClass used by this claim.
             * If specified, the CSI driver will create or update the volume with the attributes defined
             * in the corresponding VolumeAttributesClass. This has a different purpose than storageClassName,
             * it can be changed after the claim is created. An empty string value means that no VolumeAttributesClass
             * will be applied to the claim but it's not allowed to reset this field to empty string once it is set.
             * If unspecified and the PersistentVolumeClaim is unbound, the default VolumeAttributesClass
             * will be set by the persistentvolume controller if it exists.
             * If the resource referred to by volumeAttributesClass does not exist, this PersistentVolumeClaim will be
             * set to a Pending state, as reflected by the modifyVolumeStatus field, until such as a resource
             * exists.
             * More info: https://kubernetes.io/docs/concepts/storage/volume-attributes-classes/
             * (Beta) Using this field requires the VolumeAttributesClass feature gate to be enabled (off by default).
             */
            volumeAttributesClassName?: string;
            /**
             * volumeMode defines what type of volume is required by the claim.
             * Value of Filesystem is implied when not included in claim spec.
             */
            volumeMode?: string;
            /**
             * volumeName is the binding reference to the PersistentVolume backing this claim.
             */
            volumeName?: string;
          };
        };
      };
      /**
       * Defines the PVC spec to be used by the Prometheus StatefulSets.
       * The easiest way to use a volume that cannot be automatically provisioned
       * is to use a label selector alongside manually created PersistentVolumes.
       */
      volumeClaimTemplate?: {
        /**
         * APIVersion defines the versioned schema of this representation of an object.
         * Servers should convert recognized schemas to the latest internal value, and
         * may reject unrecognized values.
         * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
         */
        apiVersion?: string;
        /**
         * Kind is a string value representing the REST resource this object represents.
         * Servers may infer this from the endpoint the client submits requests to.
         * Cannot be updated.
         * In CamelCase.
         * More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
         */
        kind?: string;
        /**
         * EmbeddedMetadata contains metadata relevant to an EmbeddedResource.
         */
        metadata?: {
          /**
           * Annotations is an unstructured key value map stored with a resource that may be
           * set by external tools to store and retrieve arbitrary metadata. They are not
           * queryable and should be preserved when modifying objects.
           * More info: http://kubernetes.io/docs/user-guide/annotations
           */
          annotations?: {
            [k: string]: string;
          };
          /**
           * Map of string keys and values that can be used to organize and categorize
           * (scope and select) objects. May match selectors of replication controllers
           * and services.
           * More info: http://kubernetes.io/docs/user-guide/labels
           */
          labels?: {
            [k: string]: string;
          };
          /**
           * Name must be unique within a namespace. Is required when creating resources, although
           * some resources may allow a client to request the generation of an appropriate name
           * automatically. Name is primarily intended for creation idempotence and configuration
           * definition.
           * Cannot be updated.
           * More info: http://kubernetes.io/docs/user-guide/identifiers#names
           */
          name?: string;
        };
        /**
         * Defines the desired characteristics of a volume requested by a pod author.
         * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
         */
        spec?: {
          /**
           * accessModes contains the desired access modes the volume should have.
           * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
           */
          accessModes?: string[];
          /**
           * dataSource field can be used to specify either:
           * * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot)
           * * An existing PVC (PersistentVolumeClaim)
           * If the provisioner or an external controller can support the specified data source,
           * it will create a new volume based on the contents of the specified data source.
           * When the AnyVolumeDataSource feature gate is enabled, dataSource contents will be copied to dataSourceRef,
           * and dataSourceRef contents will be copied to dataSource when dataSourceRef.namespace is not specified.
           * If the namespace is specified, then dataSourceRef will not be copied to dataSource.
           */
          dataSource?: {
            /**
             * APIGroup is the group for the resource being referenced.
             * If APIGroup is not specified, the specified Kind must be in the core API group.
             * For any other third-party types, APIGroup is required.
             */
            apiGroup?: string;
            /**
             * Kind is the type of resource being referenced
             */
            kind: string;
            /**
             * Name is the name of resource being referenced
             */
            name: string;
          };
          /**
           * dataSourceRef specifies the object from which to populate the volume with data, if a non-empty
           * volume is desired. This may be any object from a non-empty API group (non
           * core object) or a PersistentVolumeClaim object.
           * When this field is specified, volume binding will only succeed if the type of
           * the specified object matches some installed volume populator or dynamic
           * provisioner.
           * This field will replace the functionality of the dataSource field and as such
           * if both fields are non-empty, they must have the same value. For backwards
           * compatibility, when namespace isn't specified in dataSourceRef,
           * both fields (dataSource and dataSourceRef) will be set to the same
           * value automatically if one of them is empty and the other is non-empty.
           * When namespace is specified in dataSourceRef,
           * dataSource isn't set to the same value and must be empty.
           * There are three important differences between dataSource and dataSourceRef:
           * * While dataSource only allows two specific types of objects, dataSourceRef
           *   allows any non-core object, as well as PersistentVolumeClaim objects.
           * * While dataSource ignores disallowed values (dropping them), dataSourceRef
           *   preserves all values, and generates an error if a disallowed value is
           *   specified.
           * * While dataSource only allows local objects, dataSourceRef allows objects
           *   in any namespaces.
           * (Beta) Using this field requires the AnyVolumeDataSource feature gate to be enabled.
           * (Alpha) Using the namespace field of dataSourceRef requires the CrossNamespaceVolumeDataSource feature gate to be enabled.
           */
          dataSourceRef?: {
            /**
             * APIGroup is the group for the resource being referenced.
             * If APIGroup is not specified, the specified Kind must be in the core API group.
             * For any other third-party types, APIGroup is required.
             */
            apiGroup?: string;
            /**
             * Kind is the type of resource being referenced
             */
            kind: string;
            /**
             * Name is the name of resource being referenced
             */
            name: string;
            /**
             * Namespace is the namespace of resource being referenced
             * Note that when a namespace is specified, a gateway.networking.k8s.io/ReferenceGrant object is required in the referent namespace to allow that namespace's owner to accept the reference. See the ReferenceGrant documentation for details.
             * (Alpha) This field requires the CrossNamespaceVolumeDataSource feature gate to be enabled.
             */
            namespace?: string;
          };
          /**
           * resources represents the minimum resources the volume should have.
           * If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements
           * that are lower than previous value but must still be higher than capacity recorded in the
           * status field of the claim.
           * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
           */
          resources?: {
            /**
             * Limits describes the maximum amount of compute resources allowed.
             * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
             */
            limits?: {
              [k: string]: number | string;
            };
            /**
             * Requests describes the minimum amount of compute resources required.
             * If Requests is omitted for a container, it defaults to Limits if that is explicitly specified,
             * otherwise to an implementation-defined value. Requests cannot exceed Limits.
             * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
             */
            requests?: {
              [k: string]: number | string;
            };
          };
          /**
           * selector is a label query over volumes to consider for binding.
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
          /**
           * storageClassName is the name of the StorageClass required by the claim.
           * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1
           */
          storageClassName?: string;
          /**
           * volumeAttributesClassName may be used to set the VolumeAttributesClass used by this claim.
           * If specified, the CSI driver will create or update the volume with the attributes defined
           * in the corresponding VolumeAttributesClass. This has a different purpose than storageClassName,
           * it can be changed after the claim is created. An empty string value means that no VolumeAttributesClass
           * will be applied to the claim but it's not allowed to reset this field to empty string once it is set.
           * If unspecified and the PersistentVolumeClaim is unbound, the default VolumeAttributesClass
           * will be set by the persistentvolume controller if it exists.
           * If the resource referred to by volumeAttributesClass does not exist, this PersistentVolumeClaim will be
           * set to a Pending state, as reflected by the modifyVolumeStatus field, until such as a resource
           * exists.
           * More info: https://kubernetes.io/docs/concepts/storage/volume-attributes-classes/
           * (Beta) Using this field requires the VolumeAttributesClass feature gate to be enabled (off by default).
           */
          volumeAttributesClassName?: string;
          /**
           * volumeMode defines what type of volume is required by the claim.
           * Value of Filesystem is implied when not included in claim spec.
           */
          volumeMode?: string;
          /**
           * volumeName is the binding reference to the PersistentVolume backing this claim.
           */
          volumeName?: string;
        };
        /**
         * Deprecated: this field is never set.
         */
        status?: {
          /**
           * accessModes contains the actual access modes the volume backing the PVC has.
           * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
           */
          accessModes?: string[];
          /**
           * allocatedResourceStatuses stores status of resource being resized for the given PVC.
           * Key names follow standard Kubernetes label syntax. Valid values are either:
           * 	* Un-prefixed keys:
           * 		- storage - the capacity of the volume.
           * 	* Custom resources must use implementation-defined prefixed names such as "example.com/my-custom-resource"
           * Apart from above values - keys that are unprefixed or have kubernetes.io prefix are considered
           * reserved and hence may not be used.
           *
           * ClaimResourceStatus can be in any of following states:
           * 	- ControllerResizeInProgress:
           * 		State set when resize controller starts resizing the volume in control-plane.
           * 	- ControllerResizeFailed:
           * 		State set when resize has failed in resize controller with a terminal error.
           * 	- NodeResizePending:
           * 		State set when resize controller has finished resizing the volume but further resizing of
           * 		volume is needed on the node.
           * 	- NodeResizeInProgress:
           * 		State set when kubelet starts resizing the volume.
           * 	- NodeResizeFailed:
           * 		State set when resizing has failed in kubelet with a terminal error. Transient errors don't set
           * 		NodeResizeFailed.
           * For example: if expanding a PVC for more capacity - this field can be one of the following states:
           * 	- pvc.status.allocatedResourceStatus['storage'] = "ControllerResizeInProgress"
           *      - pvc.status.allocatedResourceStatus['storage'] = "ControllerResizeFailed"
           *      - pvc.status.allocatedResourceStatus['storage'] = "NodeResizePending"
           *      - pvc.status.allocatedResourceStatus['storage'] = "NodeResizeInProgress"
           *      - pvc.status.allocatedResourceStatus['storage'] = "NodeResizeFailed"
           * When this field is not set, it means that no resize operation is in progress for the given PVC.
           *
           * A controller that receives PVC update with previously unknown resourceName or ClaimResourceStatus
           * should ignore the update for the purpose it was designed. For example - a controller that
           * only is responsible for resizing capacity of the volume, should ignore PVC updates that change other valid
           * resources associated with PVC.
           *
           * This is an alpha field and requires enabling RecoverVolumeExpansionFailure feature.
           */
          allocatedResourceStatuses?: {
            /**
             * When a controller receives persistentvolume claim update with ClaimResourceStatus for a resource
             * that it does not recognizes, then it should ignore that update and let other controllers
             * handle it.
             */
            [k: string]: string;
          };
          /**
           * allocatedResources tracks the resources allocated to a PVC including its capacity.
           * Key names follow standard Kubernetes label syntax. Valid values are either:
           * 	* Un-prefixed keys:
           * 		- storage - the capacity of the volume.
           * 	* Custom resources must use implementation-defined prefixed names such as "example.com/my-custom-resource"
           * Apart from above values - keys that are unprefixed or have kubernetes.io prefix are considered
           * reserved and hence may not be used.
           *
           * Capacity reported here may be larger than the actual capacity when a volume expansion operation
           * is requested.
           * For storage quota, the larger value from allocatedResources and PVC.spec.resources is used.
           * If allocatedResources is not set, PVC.spec.resources alone is used for quota calculation.
           * If a volume expansion capacity request is lowered, allocatedResources is only
           * lowered if there are no expansion operations in progress and if the actual volume capacity
           * is equal or lower than the requested capacity.
           *
           * A controller that receives PVC update with previously unknown resourceName
           * should ignore the update for the purpose it was designed. For example - a controller that
           * only is responsible for resizing capacity of the volume, should ignore PVC updates that change other valid
           * resources associated with PVC.
           *
           * This is an alpha field and requires enabling RecoverVolumeExpansionFailure feature.
           */
          allocatedResources?: {
            [k: string]: number | string;
          };
          /**
           * capacity represents the actual resources of the underlying volume.
           */
          capacity?: {
            [k: string]: number | string;
          };
          /**
           * conditions is the current Condition of persistent volume claim. If underlying persistent volume is being
           * resized then the Condition will be set to 'Resizing'.
           */
          conditions?: {
            /**
             * lastProbeTime is the time we probed the condition.
             */
            lastProbeTime?: string;
            /**
             * lastTransitionTime is the time the condition transitioned from one status to another.
             */
            lastTransitionTime?: string;
            /**
             * message is the human-readable message indicating details about last transition.
             */
            message?: string;
            /**
             * reason is a unique, this should be a short, machine understandable string that gives the reason
             * for condition's last transition. If it reports "Resizing" that means the underlying
             * persistent volume is being resized.
             */
            reason?: string;
            /**
             * Status is the status of the condition.
             * Can be True, False, Unknown.
             * More info: https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/persistent-volume-claim-v1/#:~:text=state%20of%20pvc-,conditions.status,-(string)%2C%20required
             */
            status: string;
            /**
             * Type is the type of the condition.
             * More info: https://kubernetes.io/docs/reference/kubernetes-api/config-and-storage-resources/persistent-volume-claim-v1/#:~:text=set%20to%20%27ResizeStarted%27.-,PersistentVolumeClaimCondition,-contains%20details%20about
             */
            type: string;
          }[];
          /**
           * currentVolumeAttributesClassName is the current name of the VolumeAttributesClass the PVC is using.
           * When unset, there is no VolumeAttributeClass applied to this PersistentVolumeClaim
           * This is a beta field and requires enabling VolumeAttributesClass feature (off by default).
           */
          currentVolumeAttributesClassName?: string;
          /**
           * ModifyVolumeStatus represents the status object of ControllerModifyVolume operation.
           * When this is unset, there is no ModifyVolume operation being attempted.
           * This is a beta field and requires enabling VolumeAttributesClass feature (off by default).
           */
          modifyVolumeStatus?: {
            /**
             * status is the status of the ControllerModifyVolume operation. It can be in any of following states:
             *  - Pending
             *    Pending indicates that the PersistentVolumeClaim cannot be modified due to unmet requirements, such as
             *    the specified VolumeAttributesClass not existing.
             *  - InProgress
             *    InProgress indicates that the volume is being modified.
             *  - Infeasible
             *   Infeasible indicates that the request has been rejected as invalid by the CSI driver. To
             * 	  resolve the error, a valid VolumeAttributesClass needs to be specified.
             * Note: New statuses can be added in the future. Consumers should check for unknown statuses and fail appropriately.
             */
            status: string;
            /**
             * targetVolumeAttributesClassName is the name of the VolumeAttributesClass the PVC currently being reconciled
             */
            targetVolumeAttributesClassName?: string;
          };
          /**
           * phase represents the current phase of PersistentVolumeClaim.
           */
          phase?: string;
        };
      };
    };

    /**
     * Tag of Alertmanager container image to be deployed. Defaults to the value of `version`.
     * Version is ignored if Tag is set.
     * Deprecated: use 'image' instead. The image tag can be specified as part of the image URL.
     */
    tag?: string;

    /**
     * If specified, the pod's tolerations.
     */
    tolerations?: {
      /**
       * Effect indicates the taint effect to match. Empty means match all taint effects.
       * When specified, allowed values are NoSchedule, PreferNoSchedule and NoExecute.
       */
      effect?: string;
      /**
       * Key is the taint key that the toleration applies to. Empty means match all taint keys.
       * If the key is empty, operator must be Exists; this combination means to match all values and all keys.
       */
      key?: string;
      /**
       * Operator represents a key's relationship to the value.
       * Valid operators are Exists and Equal. Defaults to Equal.
       * Exists is equivalent to wildcard for value, so that a pod can
       * tolerate all taints of a particular category.
       */
      operator?: string;
      /**
       * TolerationSeconds represents the period of time the toleration (which must be
       * of effect NoExecute, otherwise this field is ignored) tolerates the taint. By default,
       * it is not set, which means tolerate the taint forever (do not evict). Zero and
       * negative values will be treated as 0 (evict immediately) by the system.
       */
      tolerationSeconds?: number;
      /**
       * Value is the taint value the toleration matches to.
       * If the operator is Exists, the value should be empty, otherwise just a regular string.
       */
      value?: string;
    }[];

    /**
     * If specified, the pod's topology spread constraints.
     */
    topologySpreadConstraints?: {
      /**
       * LabelSelector is used to find matching pods.
       * Pods that match this label selector are counted to determine the number of pods
       * in their corresponding topology domain.
       */
      labelSelector?: {
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
       * MatchLabelKeys is a set of pod label keys to select the pods over which
       * spreading will be calculated. The keys are used to lookup values from the
       * incoming pod labels, those key-value labels are ANDed with labelSelector
       * to select the group of existing pods over which spreading will be calculated
       * for the incoming pod. The same key is forbidden to exist in both MatchLabelKeys and LabelSelector.
       * MatchLabelKeys cannot be set when LabelSelector isn't set.
       * Keys that don't exist in the incoming pod labels will
       * be ignored. A null or empty list means only match against labelSelector.
       *
       * This is a beta field and requires the MatchLabelKeysInPodTopologySpread feature gate to be enabled (enabled by default).
       */
      matchLabelKeys?: string[];
      /**
       * MaxSkew describes the degree to which pods may be unevenly distributed.
       * When `whenUnsatisfiable=DoNotSchedule`, it is the maximum permitted difference
       * between the number of matching pods in the target topology and the global minimum.
       * The global minimum is the minimum number of matching pods in an eligible domain
       * or zero if the number of eligible domains is less than MinDomains.
       * For example, in a 3-zone cluster, MaxSkew is set to 1, and pods with the same
       * labelSelector spread as 2/2/1:
       * In this case, the global minimum is 1.
       * | zone1 | zone2 | zone3 |
       * |  P P  |  P P  |   P   |
       * - if MaxSkew is 1, incoming pod can only be scheduled to zone3 to become 2/2/2;
       * scheduling it onto zone1(zone2) would make the ActualSkew(3-1) on zone1(zone2)
       * violate MaxSkew(1).
       * - if MaxSkew is 2, incoming pod can be scheduled onto any zone.
       * When `whenUnsatisfiable=ScheduleAnyway`, it is used to give higher precedence
       * to topologies that satisfy it.
       * It's a required field. Default value is 1 and 0 is not allowed.
       */
      maxSkew: number;
      /**
       * MinDomains indicates a minimum number of eligible domains.
       * When the number of eligible domains with matching topology keys is less than minDomains,
       * Pod Topology Spread treats "global minimum" as 0, and then the calculation of Skew is performed.
       * And when the number of eligible domains with matching topology keys equals or greater than minDomains,
       * this value has no effect on scheduling.
       * As a result, when the number of eligible domains is less than minDomains,
       * scheduler won't schedule more than maxSkew Pods to those domains.
       * If value is nil, the constraint behaves as if MinDomains is equal to 1.
       * Valid values are integers greater than 0.
       * When value is not nil, WhenUnsatisfiable must be DoNotSchedule.
       *
       * For example, in a 3-zone cluster, MaxSkew is set to 2, MinDomains is set to 5 and pods with the same
       * labelSelector spread as 2/2/2:
       * | zone1 | zone2 | zone3 |
       * |  P P  |  P P  |  P P  |
       * The number of domains is less than 5(MinDomains), so "global minimum" is treated as 0.
       * In this situation, new pod with the same labelSelector cannot be scheduled,
       * because computed skew will be 3(3 - 0) if new Pod is scheduled to any of the three zones,
       * it will violate MaxSkew.
       */
      minDomains?: number;
      /**
       * NodeAffinityPolicy indicates how we will treat Pod's nodeAffinity/nodeSelector
       * when calculating pod topology spread skew. Options are:
       * - Honor: only nodes matching nodeAffinity/nodeSelector are included in the calculations.
       * - Ignore: nodeAffinity/nodeSelector are ignored. All nodes are included in the calculations.
       *
       * If this value is nil, the behavior is equivalent to the Honor policy.
       * This is a beta-level feature default enabled by the NodeInclusionPolicyInPodTopologySpread feature flag.
       */
      nodeAffinityPolicy?: string;
      /**
       * NodeTaintsPolicy indicates how we will treat node taints when calculating
       * pod topology spread skew. Options are:
       * - Honor: nodes without taints, along with tainted nodes for which the incoming pod
       * has a toleration, are included.
       * - Ignore: node taints are ignored. All nodes are included.
       *
       * If this value is nil, the behavior is equivalent to the Ignore policy.
       * This is a beta-level feature default enabled by the NodeInclusionPolicyInPodTopologySpread feature flag.
       */
      nodeTaintsPolicy?: string;
      /**
       * TopologyKey is the key of node labels. Nodes that have a label with this key
       * and identical values are considered to be in the same topology.
       * We consider each <key, value> as a "bucket", and try to put balanced number
       * of pods into each bucket.
       * We define a domain as a particular instance of a topology.
       * Also, we define an eligible domain as a domain whose nodes meet the requirements of
       * nodeAffinityPolicy and nodeTaintsPolicy.
       * e.g. If TopologyKey is "kubernetes.io/hostname", each Node is a domain of that topology.
       * And, if TopologyKey is "topology.kubernetes.io/zone", each zone is a domain of that topology.
       * It's a required field.
       */
      topologyKey: string;
      /**
       * WhenUnsatisfiable indicates how to deal with a pod if it doesn't satisfy
       * the spread constraint.
       * - DoNotSchedule (default) tells the scheduler not to schedule it.
       * - ScheduleAnyway tells the scheduler to schedule the pod in any location,
       *   but giving higher precedence to topologies that would help reduce the
       *   skew.
       * A constraint is considered "Unsatisfiable" for an incoming pod
       * if and only if every possible node assignment for that pod would violate
       * "MaxSkew" on some topology.
       * For example, in a 3-zone cluster, MaxSkew is set to 1, and pods with the same
       * labelSelector spread as 3/1/1:
       * | zone1 | zone2 | zone3 |
       * | P P P |   P   |   P   |
       * If WhenUnsatisfiable is set to DoNotSchedule, incoming pod can only be scheduled
       * to zone2(zone3) to become 3/2/1(3/1/2) as ActualSkew(2-1) on zone2(zone3) satisfies
       * MaxSkew(1). In other words, the cluster can still be imbalanced, but scheduler
       * won't make it *more* imbalanced.
       * It's a required field.
       */
      whenUnsatisfiable: string;
    }[];

    /**
     * Version the cluster should be on.
     */
    version?: string;

    /**
     * VolumeMounts allows configuration of additional VolumeMounts on the output StatefulSet definition.
     * VolumeMounts specified will be appended to other VolumeMounts in the alertmanager container,
     * that are generated as a result of StorageSpec objects.
     */
    volumeMounts?: {
      /**
       * Path within the container at which the volume should be mounted.  Must
       * not contain ':'.
       */
      mountPath: string;
      /**
       * mountPropagation determines how mounts are propagated from the host
       * to container and the other way around.
       * When not set, MountPropagationNone is used.
       * This field is beta in 1.10.
       * When RecursiveReadOnly is set to IfPossible or to Enabled, MountPropagation must be None or unspecified
       * (which defaults to None).
       */
      mountPropagation?: string;
      /**
       * This must match the Name of a Volume.
       */
      name: string;
      /**
       * Mounted read-only if true, read-write otherwise (false or unspecified).
       * Defaults to false.
       */
      readOnly?: boolean;
      /**
       * RecursiveReadOnly specifies whether read-only mounts should be handled
       * recursively.
       *
       * If ReadOnly is false, this field has no meaning and must be unspecified.
       *
       * If ReadOnly is true, and this field is set to Disabled, the mount is not made
       * recursively read-only.  If this field is set to IfPossible, the mount is made
       * recursively read-only, if it is supported by the container runtime.  If this
       * field is set to Enabled, the mount is made recursively read-only if it is
       * supported by the container runtime, otherwise the pod will not be started and
       * an error will be generated to indicate the reason.
       *
       * If this field is set to IfPossible or Enabled, MountPropagation must be set to
       * None (or be unspecified, which defaults to None).
       *
       * If this field is not specified, it is treated as an equivalent of Disabled.
       */
      recursiveReadOnly?: string;
      /**
       * Path within the volume from which the container's volume should be mounted.
       * Defaults to "" (volume's root).
       */
      subPath?: string;
      /**
       * Expanded path within the volume from which the container's volume should be mounted.
       * Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container's environment.
       * Defaults to "" (volume's root).
       * SubPathExpr and SubPath are mutually exclusive.
       */
      subPathExpr?: string;
    }[];

    /**
     * Volumes allows configuration of additional volumes on the output StatefulSet definition.
     * Volumes specified will be appended to other volumes that are generated as a result of
     * StorageSpec objects.
     */
    volumes?: {
      /**
       * awsElasticBlockStore represents an AWS Disk resource that is attached to a
       * kubelet's host machine and then exposed to the pod.
       * Deprecated: AWSElasticBlockStore is deprecated. All operations for the in-tree
       * awsElasticBlockStore type are redirected to the ebs.csi.aws.com CSI driver.
       * More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
       */
      awsElasticBlockStore?: {
        /**
         * fsType is the filesystem type of the volume that you want to mount.
         * Tip: Ensure that the filesystem type is supported by the host operating system.
         * Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
         */
        fsType?: string;
        /**
         * partition is the partition in the volume that you want to mount.
         * If omitted, the default is to mount by volume name.
         * Examples: For volume /dev/sda1, you specify the partition as "1".
         * Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).
         */
        partition?: number;
        /**
         * readOnly value true will force the readOnly setting in VolumeMounts.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
         */
        readOnly?: boolean;
        /**
         * volumeID is unique ID of the persistent disk resource in AWS (Amazon EBS volume).
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore
         */
        volumeID: string;
      };
      /**
       * azureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.
       * Deprecated: AzureDisk is deprecated. All operations for the in-tree azureDisk type
       * are redirected to the disk.csi.azure.com CSI driver.
       */
      azureDisk?: {
        /**
         * cachingMode is the Host Caching mode: None, Read Only, Read Write.
         */
        cachingMode?: string;
        /**
         * diskName is the Name of the data disk in the blob storage
         */
        diskName: string;
        /**
         * diskURI is the URI of data disk in the blob storage
         */
        diskURI: string;
        /**
         * fsType is Filesystem type to mount.
         * Must be a filesystem type supported by the host operating system.
         * Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
         */
        fsType?: string;
        /**
         * kind expected values are Shared: multiple blob disks per storage account  Dedicated: single blob disk per storage account  Managed: azure managed data disk (only in managed availability set). defaults to shared
         */
        kind?: string;
        /**
         * readOnly Defaults to false (read/write). ReadOnly here will force
         * the ReadOnly setting in VolumeMounts.
         */
        readOnly?: boolean;
      };
      /**
       * azureFile represents an Azure File Service mount on the host and bind mount to the pod.
       * Deprecated: AzureFile is deprecated. All operations for the in-tree azureFile type
       * are redirected to the file.csi.azure.com CSI driver.
       */
      azureFile?: {
        /**
         * readOnly defaults to false (read/write). ReadOnly here will force
         * the ReadOnly setting in VolumeMounts.
         */
        readOnly?: boolean;
        /**
         * secretName is the  name of secret that contains Azure Storage Account Name and Key
         */
        secretName: string;
        /**
         * shareName is the azure share Name
         */
        shareName: string;
      };
      /**
       * cephFS represents a Ceph FS mount on the host that shares a pod's lifetime.
       * Deprecated: CephFS is deprecated and the in-tree cephfs type is no longer supported.
       */
      cephfs?: {
        /**
         * monitors is Required: Monitors is a collection of Ceph monitors
         * More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
         */
        monitors: string[];
        /**
         * path is Optional: Used as the mounted root, rather than the full Ceph tree, default is /
         */
        path?: string;
        /**
         * readOnly is Optional: Defaults to false (read/write). ReadOnly here will force
         * the ReadOnly setting in VolumeMounts.
         * More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
         */
        readOnly?: boolean;
        /**
         * secretFile is Optional: SecretFile is the path to key ring for User, default is /etc/ceph/user.secret
         * More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
         */
        secretFile?: string;
        /**
         * secretRef is Optional: SecretRef is reference to the authentication secret for User, default is empty.
         * More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
         */
        secretRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
        };
        /**
         * user is optional: User is the rados user name, default is admin
         * More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it
         */
        user?: string;
      };
      /**
       * cinder represents a cinder volume attached and mounted on kubelets host machine.
       * Deprecated: Cinder is deprecated. All operations for the in-tree cinder type
       * are redirected to the cinder.csi.openstack.org CSI driver.
       * More info: https://examples.k8s.io/mysql-cinder-pd/README.md
       */
      cinder?: {
        /**
         * fsType is the filesystem type to mount.
         * Must be a filesystem type supported by the host operating system.
         * Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
         * More info: https://examples.k8s.io/mysql-cinder-pd/README.md
         */
        fsType?: string;
        /**
         * readOnly defaults to false (read/write). ReadOnly here will force
         * the ReadOnly setting in VolumeMounts.
         * More info: https://examples.k8s.io/mysql-cinder-pd/README.md
         */
        readOnly?: boolean;
        /**
         * secretRef is optional: points to a secret object containing parameters used to connect
         * to OpenStack.
         */
        secretRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
        };
        /**
         * volumeID used to identify the volume in cinder.
         * More info: https://examples.k8s.io/mysql-cinder-pd/README.md
         */
        volumeID: string;
      };
      /**
       * configMap represents a configMap that should populate this volume
       */
      configMap?: {
        /**
         * defaultMode is optional: mode bits used to set permissions on created files by default.
         * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
         * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
         * Defaults to 0644.
         * Directories within the path are not affected by this setting.
         * This might be in conflict with other options that affect the file
         * mode, like fsGroup, and the result can be other mode bits set.
         */
        defaultMode?: number;
        /**
         * items if unspecified, each key-value pair in the Data field of the referenced
         * ConfigMap will be projected into the volume as a file whose name is the
         * key and content is the value. If specified, the listed keys will be
         * projected into the specified paths, and unlisted keys will not be
         * present. If a key is specified which is not present in the ConfigMap,
         * the volume setup will error unless it is marked optional. Paths must be
         * relative and may not contain the '..' path or start with '..'.
         */
        items?: {
          /**
           * key is the key to project.
           */
          key: string;
          /**
           * mode is Optional: mode bits used to set permissions on this file.
           * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
           * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
           * If not specified, the volume defaultMode will be used.
           * This might be in conflict with other options that affect the file
           * mode, like fsGroup, and the result can be other mode bits set.
           */
          mode?: number;
          /**
           * path is the relative path of the file to map the key to.
           * May not be an absolute path.
           * May not contain the path element '..'.
           * May not start with the string '..'.
           */
          path: string;
        }[];
        /**
         * Name of the referent.
         * This field is effectively required, but due to backwards compatibility is
         * allowed to be empty. Instances of this type with an empty value here are
         * almost certainly wrong.
         * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
         */
        name?: string;
        /**
         * optional specify whether the ConfigMap or its keys must be defined
         */
        optional?: boolean;
      };
      /**
       * csi (Container Storage Interface) represents ephemeral storage that is handled by certain external CSI drivers.
       */
      csi?: {
        /**
         * driver is the name of the CSI driver that handles this volume.
         * Consult with your admin for the correct name as registered in the cluster.
         */
        driver: string;
        /**
         * fsType to mount. Ex. "ext4", "xfs", "ntfs".
         * If not provided, the empty value is passed to the associated CSI driver
         * which will determine the default filesystem to apply.
         */
        fsType?: string;
        /**
         * nodePublishSecretRef is a reference to the secret object containing
         * sensitive information to pass to the CSI driver to complete the CSI
         * NodePublishVolume and NodeUnpublishVolume calls.
         * This field is optional, and  may be empty if no secret is required. If the
         * secret object contains more than one secret, all secret references are passed.
         */
        nodePublishSecretRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
        };
        /**
         * readOnly specifies a read-only configuration for the volume.
         * Defaults to false (read/write).
         */
        readOnly?: boolean;
        /**
         * volumeAttributes stores driver-specific properties that are passed to the CSI
         * driver. Consult your driver's documentation for supported values.
         */
        volumeAttributes?: {
          [k: string]: string;
        };
      };
      /**
       * downwardAPI represents downward API about the pod that should populate this volume
       */
      downwardAPI?: {
        /**
         * Optional: mode bits to use on created files by default. Must be a
         * Optional: mode bits used to set permissions on created files by default.
         * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
         * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
         * Defaults to 0644.
         * Directories within the path are not affected by this setting.
         * This might be in conflict with other options that affect the file
         * mode, like fsGroup, and the result can be other mode bits set.
         */
        defaultMode?: number;
        /**
         * Items is a list of downward API volume file
         */
        items?: {
          /**
           * Required: Selects a field of the pod: only annotations, labels, name, namespace and uid are supported.
           */
          fieldRef?: {
            /**
             * Version of the schema the FieldPath is written in terms of, defaults to "v1".
             */
            apiVersion?: string;
            /**
             * Path of the field to select in the specified API version.
             */
            fieldPath: string;
          };
          /**
           * Optional: mode bits used to set permissions on this file, must be an octal value
           * between 0000 and 0777 or a decimal value between 0 and 511.
           * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
           * If not specified, the volume defaultMode will be used.
           * This might be in conflict with other options that affect the file
           * mode, like fsGroup, and the result can be other mode bits set.
           */
          mode?: number;
          /**
           * Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'
           */
          path: string;
          /**
           * Selects a resource of the container: only resources limits and requests
           * (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
           */
          resourceFieldRef?: {
            /**
             * Container name: required for volumes, optional for env vars
             */
            containerName?: string;
            /**
             * Specifies the output format of the exposed resources, defaults to "1"
             */
            divisor?: number | string;
            /**
             * Required: resource to select
             */
            resource: string;
          };
        }[];
      };
      /**
       * emptyDir represents a temporary directory that shares a pod's lifetime.
       * More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
       */
      emptyDir?: {
        /**
         * medium represents what type of storage medium should back this directory.
         * The default is "" which means to use the node's default medium.
         * Must be an empty string (default) or Memory.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
         */
        medium?: string;
        /**
         * sizeLimit is the total amount of local storage required for this EmptyDir volume.
         * The size limit is also applicable for memory medium.
         * The maximum usage on memory medium EmptyDir would be the minimum value between
         * the SizeLimit specified here and the sum of memory limits of all containers in a pod.
         * The default is nil which means that the limit is undefined.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir
         */
        sizeLimit?: number | string;
      };
      /**
       * ephemeral represents a volume that is handled by a cluster storage driver.
       * The volume's lifecycle is tied to the pod that defines it - it will be created before the pod starts,
       * and deleted when the pod is removed.
       *
       * Use this if:
       * a) the volume is only needed while the pod runs,
       * b) features of normal volumes like restoring from snapshot or capacity
       *    tracking are needed,
       * c) the storage driver is specified through a storage class, and
       * d) the storage driver supports dynamic volume provisioning through
       *    a PersistentVolumeClaim (see EphemeralVolumeSource for more
       *    information on the connection between this volume type
       *    and PersistentVolumeClaim).
       *
       * Use PersistentVolumeClaim or one of the vendor-specific
       * APIs for volumes that persist for longer than the lifecycle
       * of an individual pod.
       *
       * Use CSI for light-weight local ephemeral volumes if the CSI driver is meant to
       * be used that way - see the documentation of the driver for
       * more information.
       *
       * A pod can use both types of ephemeral volumes and
       * persistent volumes at the same time.
       */
      ephemeral?: {
        /**
         * Will be used to create a stand-alone PVC to provision the volume.
         * The pod in which this EphemeralVolumeSource is embedded will be the
         * owner of the PVC, i.e. the PVC will be deleted together with the
         * pod.  The name of the PVC will be `<pod name>-<volume name>` where
         * `<volume name>` is the name from the `PodSpec.Volumes` array
         * entry. Pod validation will reject the pod if the concatenated name
         * is not valid for a PVC (for example, too long).
         *
         * An existing PVC with that name that is not owned by the pod
         * will *not* be used for the pod to avoid using an unrelated
         * volume by mistake. Starting the pod is then blocked until
         * the unrelated PVC is removed. If such a pre-created PVC is
         * meant to be used by the pod, the PVC has to updated with an
         * owner reference to the pod once the pod exists. Normally
         * this should not be necessary, but it may be useful when
         * manually reconstructing a broken cluster.
         *
         * This field is read-only and no changes will be made by Kubernetes
         * to the PVC after it has been created.
         *
         * Required, must not be nil.
         */
        volumeClaimTemplate?: {
          /**
           * May contain labels and annotations that will be copied into the PVC
           * when creating it. No other fields are allowed and will be rejected during
           * validation.
           */
          metadata?: {};
          /**
           * The specification for the PersistentVolumeClaim. The entire content is
           * copied unchanged into the PVC that gets created from this
           * template. The same fields as in a PersistentVolumeClaim
           * are also valid here.
           */
          spec: {
            /**
             * accessModes contains the desired access modes the volume should have.
             * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1
             */
            accessModes?: string[];
            /**
             * dataSource field can be used to specify either:
             * * An existing VolumeSnapshot object (snapshot.storage.k8s.io/VolumeSnapshot)
             * * An existing PVC (PersistentVolumeClaim)
             * If the provisioner or an external controller can support the specified data source,
             * it will create a new volume based on the contents of the specified data source.
             * When the AnyVolumeDataSource feature gate is enabled, dataSource contents will be copied to dataSourceRef,
             * and dataSourceRef contents will be copied to dataSource when dataSourceRef.namespace is not specified.
             * If the namespace is specified, then dataSourceRef will not be copied to dataSource.
             */
            dataSource?: {
              /**
               * APIGroup is the group for the resource being referenced.
               * If APIGroup is not specified, the specified Kind must be in the core API group.
               * For any other third-party types, APIGroup is required.
               */
              apiGroup?: string;
              /**
               * Kind is the type of resource being referenced
               */
              kind: string;
              /**
               * Name is the name of resource being referenced
               */
              name: string;
            };
            /**
             * dataSourceRef specifies the object from which to populate the volume with data, if a non-empty
             * volume is desired. This may be any object from a non-empty API group (non
             * core object) or a PersistentVolumeClaim object.
             * When this field is specified, volume binding will only succeed if the type of
             * the specified object matches some installed volume populator or dynamic
             * provisioner.
             * This field will replace the functionality of the dataSource field and as such
             * if both fields are non-empty, they must have the same value. For backwards
             * compatibility, when namespace isn't specified in dataSourceRef,
             * both fields (dataSource and dataSourceRef) will be set to the same
             * value automatically if one of them is empty and the other is non-empty.
             * When namespace is specified in dataSourceRef,
             * dataSource isn't set to the same value and must be empty.
             * There are three important differences between dataSource and dataSourceRef:
             * * While dataSource only allows two specific types of objects, dataSourceRef
             *   allows any non-core object, as well as PersistentVolumeClaim objects.
             * * While dataSource ignores disallowed values (dropping them), dataSourceRef
             *   preserves all values, and generates an error if a disallowed value is
             *   specified.
             * * While dataSource only allows local objects, dataSourceRef allows objects
             *   in any namespaces.
             * (Beta) Using this field requires the AnyVolumeDataSource feature gate to be enabled.
             * (Alpha) Using the namespace field of dataSourceRef requires the CrossNamespaceVolumeDataSource feature gate to be enabled.
             */
            dataSourceRef?: {
              /**
               * APIGroup is the group for the resource being referenced.
               * If APIGroup is not specified, the specified Kind must be in the core API group.
               * For any other third-party types, APIGroup is required.
               */
              apiGroup?: string;
              /**
               * Kind is the type of resource being referenced
               */
              kind: string;
              /**
               * Name is the name of resource being referenced
               */
              name: string;
              /**
               * Namespace is the namespace of resource being referenced
               * Note that when a namespace is specified, a gateway.networking.k8s.io/ReferenceGrant object is required in the referent namespace to allow that namespace's owner to accept the reference. See the ReferenceGrant documentation for details.
               * (Alpha) This field requires the CrossNamespaceVolumeDataSource feature gate to be enabled.
               */
              namespace?: string;
            };
            /**
             * resources represents the minimum resources the volume should have.
             * If RecoverVolumeExpansionFailure feature is enabled users are allowed to specify resource requirements
             * that are lower than previous value but must still be higher than capacity recorded in the
             * status field of the claim.
             * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#resources
             */
            resources?: {
              /**
               * Limits describes the maximum amount of compute resources allowed.
               * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
               */
              limits?: {
                [k: string]: number | string;
              };
              /**
               * Requests describes the minimum amount of compute resources required.
               * If Requests is omitted for a container, it defaults to Limits if that is explicitly specified,
               * otherwise to an implementation-defined value. Requests cannot exceed Limits.
               * More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/
               */
              requests?: {
                [k: string]: number | string;
              };
            };
            /**
             * selector is a label query over volumes to consider for binding.
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
            /**
             * storageClassName is the name of the StorageClass required by the claim.
             * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1
             */
            storageClassName?: string;
            /**
             * volumeAttributesClassName may be used to set the VolumeAttributesClass used by this claim.
             * If specified, the CSI driver will create or update the volume with the attributes defined
             * in the corresponding VolumeAttributesClass. This has a different purpose than storageClassName,
             * it can be changed after the claim is created. An empty string value means that no VolumeAttributesClass
             * will be applied to the claim but it's not allowed to reset this field to empty string once it is set.
             * If unspecified and the PersistentVolumeClaim is unbound, the default VolumeAttributesClass
             * will be set by the persistentvolume controller if it exists.
             * If the resource referred to by volumeAttributesClass does not exist, this PersistentVolumeClaim will be
             * set to a Pending state, as reflected by the modifyVolumeStatus field, until such as a resource
             * exists.
             * More info: https://kubernetes.io/docs/concepts/storage/volume-attributes-classes/
             * (Beta) Using this field requires the VolumeAttributesClass feature gate to be enabled (off by default).
             */
            volumeAttributesClassName?: string;
            /**
             * volumeMode defines what type of volume is required by the claim.
             * Value of Filesystem is implied when not included in claim spec.
             */
            volumeMode?: string;
            /**
             * volumeName is the binding reference to the PersistentVolume backing this claim.
             */
            volumeName?: string;
          };
        };
      };
      /**
       * fc represents a Fibre Channel resource that is attached to a kubelet's host machine and then exposed to the pod.
       */
      fc?: {
        /**
         * fsType is the filesystem type to mount.
         * Must be a filesystem type supported by the host operating system.
         * Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
         */
        fsType?: string;
        /**
         * lun is Optional: FC target lun number
         */
        lun?: number;
        /**
         * readOnly is Optional: Defaults to false (read/write). ReadOnly here will force
         * the ReadOnly setting in VolumeMounts.
         */
        readOnly?: boolean;
        /**
         * targetWWNs is Optional: FC target worldwide names (WWNs)
         */
        targetWWNs?: string[];
        /**
         * wwids Optional: FC volume world wide identifiers (wwids)
         * Either wwids or combination of targetWWNs and lun must be set, but not both simultaneously.
         */
        wwids?: string[];
      };
      /**
       * flexVolume represents a generic volume resource that is
       * provisioned/attached using an exec based plugin.
       * Deprecated: FlexVolume is deprecated. Consider using a CSIDriver instead.
       */
      flexVolume?: {
        /**
         * driver is the name of the driver to use for this volume.
         */
        driver: string;
        /**
         * fsType is the filesystem type to mount.
         * Must be a filesystem type supported by the host operating system.
         * Ex. "ext4", "xfs", "ntfs". The default filesystem depends on FlexVolume script.
         */
        fsType?: string;
        /**
         * options is Optional: this field holds extra command options if any.
         */
        options?: {
          [k: string]: string;
        };
        /**
         * readOnly is Optional: defaults to false (read/write). ReadOnly here will force
         * the ReadOnly setting in VolumeMounts.
         */
        readOnly?: boolean;
        /**
         * secretRef is Optional: secretRef is reference to the secret object containing
         * sensitive information to pass to the plugin scripts. This may be
         * empty if no secret object is specified. If the secret object
         * contains more than one secret, all secrets are passed to the plugin
         * scripts.
         */
        secretRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
        };
      };
      /**
       * flocker represents a Flocker volume attached to a kubelet's host machine. This depends on the Flocker control service being running.
       * Deprecated: Flocker is deprecated and the in-tree flocker type is no longer supported.
       */
      flocker?: {
        /**
         * datasetName is Name of the dataset stored as metadata -> name on the dataset for Flocker
         * should be considered as deprecated
         */
        datasetName?: string;
        /**
         * datasetUUID is the UUID of the dataset. This is unique identifier of a Flocker dataset
         */
        datasetUUID?: string;
      };
      /**
       * gcePersistentDisk represents a GCE Disk resource that is attached to a
       * kubelet's host machine and then exposed to the pod.
       * Deprecated: GCEPersistentDisk is deprecated. All operations for the in-tree
       * gcePersistentDisk type are redirected to the pd.csi.storage.gke.io CSI driver.
       * More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
       */
      gcePersistentDisk?: {
        /**
         * fsType is filesystem type of the volume that you want to mount.
         * Tip: Ensure that the filesystem type is supported by the host operating system.
         * Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
         */
        fsType?: string;
        /**
         * partition is the partition in the volume that you want to mount.
         * If omitted, the default is to mount by volume name.
         * Examples: For volume /dev/sda1, you specify the partition as "1".
         * Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
         */
        partition?: number;
        /**
         * pdName is unique name of the PD resource in GCE. Used to identify the disk in GCE.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
         */
        pdName: string;
        /**
         * readOnly here will force the ReadOnly setting in VolumeMounts.
         * Defaults to false.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk
         */
        readOnly?: boolean;
      };
      /**
       * gitRepo represents a git repository at a particular revision.
       * Deprecated: GitRepo is deprecated. To provision a container with a git repo, mount an
       * EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir
       * into the Pod's container.
       */
      gitRepo?: {
        /**
         * directory is the target directory name.
         * Must not contain or start with '..'.  If '.' is supplied, the volume directory will be the
         * git repository.  Otherwise, if specified, the volume will contain the git repository in
         * the subdirectory with the given name.
         */
        directory?: string;
        /**
         * repository is the URL
         */
        repository: string;
        /**
         * revision is the commit hash for the specified revision.
         */
        revision?: string;
      };
      /**
       * glusterfs represents a Glusterfs mount on the host that shares a pod's lifetime.
       * Deprecated: Glusterfs is deprecated and the in-tree glusterfs type is no longer supported.
       * More info: https://examples.k8s.io/volumes/glusterfs/README.md
       */
      glusterfs?: {
        /**
         * endpoints is the endpoint name that details Glusterfs topology.
         * More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
         */
        endpoints: string;
        /**
         * path is the Glusterfs volume path.
         * More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
         */
        path: string;
        /**
         * readOnly here will force the Glusterfs volume to be mounted with read-only permissions.
         * Defaults to false.
         * More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod
         */
        readOnly?: boolean;
      };
      /**
       * hostPath represents a pre-existing file or directory on the host
       * machine that is directly exposed to the container. This is generally
       * used for system agents or other privileged things that are allowed
       * to see the host machine. Most containers will NOT need this.
       * More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
       */
      hostPath?: {
        /**
         * path of the directory on the host.
         * If the path is a symlink, it will follow the link to the real path.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
         */
        path: string;
        /**
         * type for HostPath Volume
         * Defaults to ""
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath
         */
        type?: string;
      };
      /**
       * image represents an OCI object (a container image or artifact) pulled and mounted on the kubelet's host machine.
       * The volume is resolved at pod startup depending on which PullPolicy value is provided:
       *
       * - Always: the kubelet always attempts to pull the reference. Container creation will fail If the pull fails.
       * - Never: the kubelet never pulls the reference and only uses a local image or artifact. Container creation will fail if the reference isn't present.
       * - IfNotPresent: the kubelet pulls if the reference isn't already present on disk. Container creation will fail if the reference isn't present and the pull fails.
       *
       * The volume gets re-resolved if the pod gets deleted and recreated, which means that new remote content will become available on pod recreation.
       * A failure to resolve or pull the image during pod startup will block containers from starting and may add significant latency. Failures will be retried using normal volume backoff and will be reported on the pod reason and message.
       * The types of objects that may be mounted by this volume are defined by the container runtime implementation on a host machine and at minimum must include all valid types supported by the container image field.
       * The OCI object gets mounted in a single directory (spec.containers[*].volumeMounts.mountPath) by merging the manifest layers in the same way as for container images.
       * The volume will be mounted read-only (ro) and non-executable files (noexec).
       * Sub path mounts for containers are not supported (spec.containers[*].volumeMounts.subpath).
       * The field spec.securityContext.fsGroupChangePolicy has no effect on this volume type.
       */
      image?: {
        /**
         * Policy for pulling OCI objects. Possible values are:
         * Always: the kubelet always attempts to pull the reference. Container creation will fail If the pull fails.
         * Never: the kubelet never pulls the reference and only uses a local image or artifact. Container creation will fail if the reference isn't present.
         * IfNotPresent: the kubelet pulls if the reference isn't already present on disk. Container creation will fail if the reference isn't present and the pull fails.
         * Defaults to Always if :latest tag is specified, or IfNotPresent otherwise.
         */
        pullPolicy?: string;
        /**
         * Required: Image or artifact reference to be used.
         * Behaves in the same way as pod.spec.containers[*].image.
         * Pull secrets will be assembled in the same way as for the container image by looking up node credentials, SA image pull secrets, and pod spec image pull secrets.
         * More info: https://kubernetes.io/docs/concepts/containers/images
         * This field is optional to allow higher level config management to default or override
         * container images in workload controllers like Deployments and StatefulSets.
         */
        reference?: string;
      };
      /**
       * iscsi represents an ISCSI Disk resource that is attached to a
       * kubelet's host machine and then exposed to the pod.
       * More info: https://examples.k8s.io/volumes/iscsi/README.md
       */
      iscsi?: {
        /**
         * chapAuthDiscovery defines whether support iSCSI Discovery CHAP authentication
         */
        chapAuthDiscovery?: boolean;
        /**
         * chapAuthSession defines whether support iSCSI Session CHAP authentication
         */
        chapAuthSession?: boolean;
        /**
         * fsType is the filesystem type of the volume that you want to mount.
         * Tip: Ensure that the filesystem type is supported by the host operating system.
         * Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi
         */
        fsType?: string;
        /**
         * initiatorName is the custom iSCSI Initiator Name.
         * If initiatorName is specified with iscsiInterface simultaneously, new iSCSI interface
         * <target portal>:<volume name> will be created for the connection.
         */
        initiatorName?: string;
        /**
         * iqn is the target iSCSI Qualified Name.
         */
        iqn: string;
        /**
         * iscsiInterface is the interface Name that uses an iSCSI transport.
         * Defaults to 'default' (tcp).
         */
        iscsiInterface?: string;
        /**
         * lun represents iSCSI Target Lun number.
         */
        lun: number;
        /**
         * portals is the iSCSI Target Portal List. The portal is either an IP or ip_addr:port if the port
         * is other than default (typically TCP ports 860 and 3260).
         */
        portals?: string[];
        /**
         * readOnly here will force the ReadOnly setting in VolumeMounts.
         * Defaults to false.
         */
        readOnly?: boolean;
        /**
         * secretRef is the CHAP Secret for iSCSI target and initiator authentication
         */
        secretRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
        };
        /**
         * targetPortal is iSCSI Target Portal. The Portal is either an IP or ip_addr:port if the port
         * is other than default (typically TCP ports 860 and 3260).
         */
        targetPortal: string;
      };
      /**
       * name of the volume.
       * Must be a DNS_LABEL and unique within the pod.
       * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
       */
      name: string;
      /**
       * nfs represents an NFS mount on the host that shares a pod's lifetime
       * More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
       */
      nfs?: {
        /**
         * path that is exported by the NFS server.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
         */
        path: string;
        /**
         * readOnly here will force the NFS export to be mounted with read-only permissions.
         * Defaults to false.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
         */
        readOnly?: boolean;
        /**
         * server is the hostname or IP address of the NFS server.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs
         */
        server: string;
      };
      /**
       * persistentVolumeClaimVolumeSource represents a reference to a
       * PersistentVolumeClaim in the same namespace.
       * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
       */
      persistentVolumeClaim?: {
        /**
         * claimName is the name of a PersistentVolumeClaim in the same namespace as the pod using this volume.
         * More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims
         */
        claimName: string;
        /**
         * readOnly Will force the ReadOnly setting in VolumeMounts.
         * Default false.
         */
        readOnly?: boolean;
      };
      /**
       * photonPersistentDisk represents a PhotonController persistent disk attached and mounted on kubelets host machine.
       * Deprecated: PhotonPersistentDisk is deprecated and the in-tree photonPersistentDisk type is no longer supported.
       */
      photonPersistentDisk?: {
        /**
         * fsType is the filesystem type to mount.
         * Must be a filesystem type supported by the host operating system.
         * Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
         */
        fsType?: string;
        /**
         * pdID is the ID that identifies Photon Controller persistent disk
         */
        pdID: string;
      };
      /**
       * portworxVolume represents a portworx volume attached and mounted on kubelets host machine.
       * Deprecated: PortworxVolume is deprecated. All operations for the in-tree portworxVolume type
       * are redirected to the pxd.portworx.com CSI driver when the CSIMigrationPortworx feature-gate
       * is on.
       */
      portworxVolume?: {
        /**
         * fSType represents the filesystem type to mount
         * Must be a filesystem type supported by the host operating system.
         * Ex. "ext4", "xfs". Implicitly inferred to be "ext4" if unspecified.
         */
        fsType?: string;
        /**
         * readOnly defaults to false (read/write). ReadOnly here will force
         * the ReadOnly setting in VolumeMounts.
         */
        readOnly?: boolean;
        /**
         * volumeID uniquely identifies a Portworx volume
         */
        volumeID: string;
      };
      /**
       * projected items for all in one resources secrets, configmaps, and downward API
       */
      projected?: {
        /**
         * defaultMode are the mode bits used to set permissions on created files by default.
         * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
         * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
         * Directories within the path are not affected by this setting.
         * This might be in conflict with other options that affect the file
         * mode, like fsGroup, and the result can be other mode bits set.
         */
        defaultMode?: number;
        /**
         * sources is the list of volume projections. Each entry in this list
         * handles one source.
         */
        sources?: {
          /**
           * ClusterTrustBundle allows a pod to access the `.spec.trustBundle` field
           * of ClusterTrustBundle objects in an auto-updating file.
           *
           * Alpha, gated by the ClusterTrustBundleProjection feature gate.
           *
           * ClusterTrustBundle objects can either be selected by name, or by the
           * combination of signer name and a label selector.
           *
           * Kubelet performs aggressive normalization of the PEM contents written
           * into the pod filesystem.  Esoteric PEM features such as inter-block
           * comments and block headers are stripped.  Certificates are deduplicated.
           * The ordering of certificates within the file is arbitrary, and Kubelet
           * may change the order over time.
           */
          clusterTrustBundle?: {
            /**
             * Select all ClusterTrustBundles that match this label selector.  Only has
             * effect if signerName is set.  Mutually-exclusive with name.  If unset,
             * interpreted as "match nothing".  If set but empty, interpreted as "match
             * everything".
             */
            labelSelector?: {
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
             * Select a single ClusterTrustBundle by object name.  Mutually-exclusive
             * with signerName and labelSelector.
             */
            name?: string;
            /**
             * If true, don't block pod startup if the referenced ClusterTrustBundle(s)
             * aren't available.  If using name, then the named ClusterTrustBundle is
             * allowed not to exist.  If using signerName, then the combination of
             * signerName and labelSelector is allowed to match zero
             * ClusterTrustBundles.
             */
            optional?: boolean;
            /**
             * Relative path from the volume root to write the bundle.
             */
            path: string;
            /**
             * Select all ClusterTrustBundles that match this signer name.
             * Mutually-exclusive with name.  The contents of all selected
             * ClusterTrustBundles will be unified and deduplicated.
             */
            signerName?: string;
          };
          /**
           * configMap information about the configMap data to project
           */
          configMap?: {
            /**
             * items if unspecified, each key-value pair in the Data field of the referenced
             * ConfigMap will be projected into the volume as a file whose name is the
             * key and content is the value. If specified, the listed keys will be
             * projected into the specified paths, and unlisted keys will not be
             * present. If a key is specified which is not present in the ConfigMap,
             * the volume setup will error unless it is marked optional. Paths must be
             * relative and may not contain the '..' path or start with '..'.
             */
            items?: {
              /**
               * key is the key to project.
               */
              key: string;
              /**
               * mode is Optional: mode bits used to set permissions on this file.
               * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
               * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
               * If not specified, the volume defaultMode will be used.
               * This might be in conflict with other options that affect the file
               * mode, like fsGroup, and the result can be other mode bits set.
               */
              mode?: number;
              /**
               * path is the relative path of the file to map the key to.
               * May not be an absolute path.
               * May not contain the path element '..'.
               * May not start with the string '..'.
               */
              path: string;
            }[];
            /**
             * Name of the referent.
             * This field is effectively required, but due to backwards compatibility is
             * allowed to be empty. Instances of this type with an empty value here are
             * almost certainly wrong.
             * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
             */
            name?: string;
            /**
             * optional specify whether the ConfigMap or its keys must be defined
             */
            optional?: boolean;
          };
          /**
           * downwardAPI information about the downwardAPI data to project
           */
          downwardAPI?: {
            /**
             * Items is a list of DownwardAPIVolume file
             */
            items?: {
              /**
               * Required: Selects a field of the pod: only annotations, labels, name, namespace and uid are supported.
               */
              fieldRef?: {
                /**
                 * Version of the schema the FieldPath is written in terms of, defaults to "v1".
                 */
                apiVersion?: string;
                /**
                 * Path of the field to select in the specified API version.
                 */
                fieldPath: string;
              };
              /**
               * Optional: mode bits used to set permissions on this file, must be an octal value
               * between 0000 and 0777 or a decimal value between 0 and 511.
               * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
               * If not specified, the volume defaultMode will be used.
               * This might be in conflict with other options that affect the file
               * mode, like fsGroup, and the result can be other mode bits set.
               */
              mode?: number;
              /**
               * Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'
               */
              path: string;
              /**
               * Selects a resource of the container: only resources limits and requests
               * (limits.cpu, limits.memory, requests.cpu and requests.memory) are currently supported.
               */
              resourceFieldRef?: {
                /**
                 * Container name: required for volumes, optional for env vars
                 */
                containerName?: string;
                /**
                 * Specifies the output format of the exposed resources, defaults to "1"
                 */
                divisor?: number | string;
                /**
                 * Required: resource to select
                 */
                resource: string;
              };
            }[];
          };
          /**
           * secret information about the secret data to project
           */
          secret?: {
            /**
             * items if unspecified, each key-value pair in the Data field of the referenced
             * Secret will be projected into the volume as a file whose name is the
             * key and content is the value. If specified, the listed keys will be
             * projected into the specified paths, and unlisted keys will not be
             * present. If a key is specified which is not present in the Secret,
             * the volume setup will error unless it is marked optional. Paths must be
             * relative and may not contain the '..' path or start with '..'.
             */
            items?: {
              /**
               * key is the key to project.
               */
              key: string;
              /**
               * mode is Optional: mode bits used to set permissions on this file.
               * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
               * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
               * If not specified, the volume defaultMode will be used.
               * This might be in conflict with other options that affect the file
               * mode, like fsGroup, and the result can be other mode bits set.
               */
              mode?: number;
              /**
               * path is the relative path of the file to map the key to.
               * May not be an absolute path.
               * May not contain the path element '..'.
               * May not start with the string '..'.
               */
              path: string;
            }[];
            /**
             * Name of the referent.
             * This field is effectively required, but due to backwards compatibility is
             * allowed to be empty. Instances of this type with an empty value here are
             * almost certainly wrong.
             * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
             */
            name?: string;
            /**
             * optional field specify whether the Secret or its key must be defined
             */
            optional?: boolean;
          };
          /**
           * serviceAccountToken is information about the serviceAccountToken data to project
           */
          serviceAccountToken?: {
            /**
             * audience is the intended audience of the token. A recipient of a token
             * must identify itself with an identifier specified in the audience of the
             * token, and otherwise should reject the token. The audience defaults to the
             * identifier of the apiserver.
             */
            audience?: string;
            /**
             * expirationSeconds is the requested duration of validity of the service
             * account token. As the token approaches expiration, the kubelet volume
             * plugin will proactively rotate the service account token. The kubelet will
             * start trying to rotate the token if the token is older than 80 percent of
             * its time to live or if the token is older than 24 hours.Defaults to 1 hour
             * and must be at least 10 minutes.
             */
            expirationSeconds?: number;
            /**
             * path is the path relative to the mount point of the file to project the
             * token into.
             */
            path: string;
          };
        }[];
      };
      /**
       * quobyte represents a Quobyte mount on the host that shares a pod's lifetime.
       * Deprecated: Quobyte is deprecated and the in-tree quobyte type is no longer supported.
       */
      quobyte?: {
        /**
         * group to map volume access to
         * Default is no group
         */
        group?: string;
        /**
         * readOnly here will force the Quobyte volume to be mounted with read-only permissions.
         * Defaults to false.
         */
        readOnly?: boolean;
        /**
         * registry represents a single or multiple Quobyte Registry services
         * specified as a string as host:port pair (multiple entries are separated with commas)
         * which acts as the central registry for volumes
         */
        registry: string;
        /**
         * tenant owning the given Quobyte volume in the Backend
         * Used with dynamically provisioned Quobyte volumes, value is set by the plugin
         */
        tenant?: string;
        /**
         * user to map volume access to
         * Defaults to serivceaccount user
         */
        user?: string;
        /**
         * volume is a string that references an already created Quobyte volume by name.
         */
        volume: string;
      };
      /**
       * rbd represents a Rados Block Device mount on the host that shares a pod's lifetime.
       * Deprecated: RBD is deprecated and the in-tree rbd type is no longer supported.
       * More info: https://examples.k8s.io/volumes/rbd/README.md
       */
      rbd?: {
        /**
         * fsType is the filesystem type of the volume that you want to mount.
         * Tip: Ensure that the filesystem type is supported by the host operating system.
         * Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd
         */
        fsType?: string;
        /**
         * image is the rados image name.
         * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
         */
        image: string;
        /**
         * keyring is the path to key ring for RBDUser.
         * Default is /etc/ceph/keyring.
         * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
         */
        keyring?: string;
        /**
         * monitors is a collection of Ceph monitors.
         * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
         */
        monitors: string[];
        /**
         * pool is the rados pool name.
         * Default is rbd.
         * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
         */
        pool?: string;
        /**
         * readOnly here will force the ReadOnly setting in VolumeMounts.
         * Defaults to false.
         * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
         */
        readOnly?: boolean;
        /**
         * secretRef is name of the authentication secret for RBDUser. If provided
         * overrides keyring.
         * Default is nil.
         * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
         */
        secretRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
        };
        /**
         * user is the rados user name.
         * Default is admin.
         * More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it
         */
        user?: string;
      };
      /**
       * scaleIO represents a ScaleIO persistent volume attached and mounted on Kubernetes nodes.
       * Deprecated: ScaleIO is deprecated and the in-tree scaleIO type is no longer supported.
       */
      scaleIO?: {
        /**
         * fsType is the filesystem type to mount.
         * Must be a filesystem type supported by the host operating system.
         * Ex. "ext4", "xfs", "ntfs".
         * Default is "xfs".
         */
        fsType?: string;
        /**
         * gateway is the host address of the ScaleIO API Gateway.
         */
        gateway: string;
        /**
         * protectionDomain is the name of the ScaleIO Protection Domain for the configured storage.
         */
        protectionDomain?: string;
        /**
         * readOnly Defaults to false (read/write). ReadOnly here will force
         * the ReadOnly setting in VolumeMounts.
         */
        readOnly?: boolean;
        /**
         * secretRef references to the secret for ScaleIO user and other
         * sensitive information. If this is not provided, Login operation will fail.
         */
        secretRef: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
        };
        /**
         * sslEnabled Flag enable/disable SSL communication with Gateway, default false
         */
        sslEnabled?: boolean;
        /**
         * storageMode indicates whether the storage for a volume should be ThickProvisioned or ThinProvisioned.
         * Default is ThinProvisioned.
         */
        storageMode?: string;
        /**
         * storagePool is the ScaleIO Storage Pool associated with the protection domain.
         */
        storagePool?: string;
        /**
         * system is the name of the storage system as configured in ScaleIO.
         */
        system: string;
        /**
         * volumeName is the name of a volume already created in the ScaleIO system
         * that is associated with this volume source.
         */
        volumeName?: string;
      };
      /**
       * secret represents a secret that should populate this volume.
       * More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
       */
      secret?: {
        /**
         * defaultMode is Optional: mode bits used to set permissions on created files by default.
         * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
         * YAML accepts both octal and decimal values, JSON requires decimal values
         * for mode bits. Defaults to 0644.
         * Directories within the path are not affected by this setting.
         * This might be in conflict with other options that affect the file
         * mode, like fsGroup, and the result can be other mode bits set.
         */
        defaultMode?: number;
        /**
         * items If unspecified, each key-value pair in the Data field of the referenced
         * Secret will be projected into the volume as a file whose name is the
         * key and content is the value. If specified, the listed keys will be
         * projected into the specified paths, and unlisted keys will not be
         * present. If a key is specified which is not present in the Secret,
         * the volume setup will error unless it is marked optional. Paths must be
         * relative and may not contain the '..' path or start with '..'.
         */
        items?: {
          /**
           * key is the key to project.
           */
          key: string;
          /**
           * mode is Optional: mode bits used to set permissions on this file.
           * Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511.
           * YAML accepts both octal and decimal values, JSON requires decimal values for mode bits.
           * If not specified, the volume defaultMode will be used.
           * This might be in conflict with other options that affect the file
           * mode, like fsGroup, and the result can be other mode bits set.
           */
          mode?: number;
          /**
           * path is the relative path of the file to map the key to.
           * May not be an absolute path.
           * May not contain the path element '..'.
           * May not start with the string '..'.
           */
          path: string;
        }[];
        /**
         * optional field specify whether the Secret or its keys must be defined
         */
        optional?: boolean;
        /**
         * secretName is the name of the secret in the pod's namespace to use.
         * More info: https://kubernetes.io/docs/concepts/storage/volumes#secret
         */
        secretName?: string;
      };
      /**
       * storageOS represents a StorageOS volume attached and mounted on Kubernetes nodes.
       * Deprecated: StorageOS is deprecated and the in-tree storageos type is no longer supported.
       */
      storageos?: {
        /**
         * fsType is the filesystem type to mount.
         * Must be a filesystem type supported by the host operating system.
         * Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
         */
        fsType?: string;
        /**
         * readOnly defaults to false (read/write). ReadOnly here will force
         * the ReadOnly setting in VolumeMounts.
         */
        readOnly?: boolean;
        /**
         * secretRef specifies the secret to use for obtaining the StorageOS API
         * credentials.  If not specified, default values will be attempted.
         */
        secretRef?: {
          /**
           * Name of the referent.
           * This field is effectively required, but due to backwards compatibility is
           * allowed to be empty. Instances of this type with an empty value here are
           * almost certainly wrong.
           * More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
           */
          name?: string;
        };
        /**
         * volumeName is the human-readable name of the StorageOS volume.  Volume
         * names are only unique within a namespace.
         */
        volumeName?: string;
        /**
         * volumeNamespace specifies the scope of the volume within StorageOS.  If no
         * namespace is specified then the Pod's namespace will be used.  This allows the
         * Kubernetes name scoping to be mirrored within StorageOS for tighter integration.
         * Set VolumeName to any name to override the default behaviour.
         * Set to "default" if you are not using namespaces within StorageOS.
         * Namespaces that do not pre-exist within StorageOS will be created.
         */
        volumeNamespace?: string;
      };
      /**
       * vsphereVolume represents a vSphere volume attached and mounted on kubelets host machine.
       * Deprecated: VsphereVolume is deprecated. All operations for the in-tree vsphereVolume type
       * are redirected to the csi.vsphere.vmware.com CSI driver.
       */
      vsphereVolume?: {
        /**
         * fsType is filesystem type to mount.
         * Must be a filesystem type supported by the host operating system.
         * Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.
         */
        fsType?: string;
        /**
         * storagePolicyID is the storage Policy Based Management (SPBM) profile ID associated with the StoragePolicyName.
         */
        storagePolicyID?: string;
        /**
         * storagePolicyName is the storage Policy Based Management (SPBM) profile name.
         */
        storagePolicyName?: string;
        /**
         * volumePath is the path that identifies vSphere volume vmdk
         */
        volumePath: string;
      };
    }[];

    /**
     * Defines the web command line flags when starting Alertmanager.
     */
    web?: {
      /**
       * Maximum number of GET requests processed concurrently. This corresponds to the
       * Alertmanager's `--web.get-concurrency` flag.
       */
      getConcurrency?: number;
      /**
       * Defines HTTP parameters for web server.
       */
      httpConfig?: {
        /**
         * List of headers that can be added to HTTP responses.
         */
        headers?: {
          /**
           * Set the Content-Security-Policy header to HTTP responses.
           * Unset if blank.
           */
          contentSecurityPolicy?: string;
          /**
           * Set the Strict-Transport-Security header to HTTP responses.
           * Unset if blank.
           * Please make sure that you use this with care as this header might force
           * browsers to load Prometheus and the other applications hosted on the same
           * domain and subdomains over HTTPS.
           * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
           */
          strictTransportSecurity?: string;
          /**
           * Set the X-Content-Type-Options header to HTTP responses.
           * Unset if blank. Accepted value is nosniff.
           * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
           */
          xContentTypeOptions?: "" | "NoSniff";
          /**
           * Set the X-Frame-Options header to HTTP responses.
           * Unset if blank. Accepted values are deny and sameorigin.
           * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
           */
          xFrameOptions?: "" | "Deny" | "SameOrigin";
          /**
           * Set the X-XSS-Protection header to all responses.
           * Unset if blank.
           * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection
           */
          xXSSProtection?: string;
        };
        /**
         * Enable HTTP/2 support. Note that HTTP/2 is only supported with TLS.
         * When TLSConfig is not configured, HTTP/2 will be disabled.
         * Whenever the value of the field changes, a rolling update will be triggered.
         */
        http2?: boolean;
      };
      /**
       * Timeout for HTTP requests. This corresponds to the Alertmanager's
       * `--web.timeout` flag.
       */
      timeout?: number;
      /**
       * Defines the TLS parameters for HTTPS.
       */
      tlsConfig?: {
        /**
         * Secret or ConfigMap containing the TLS certificate for the web server.
         *
         * Either `keySecret` or `keyFile` must be defined.
         *
         * It is mutually exclusive with `certFile`.
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
         * Path to the TLS certificate file in the container for the web server.
         *
         * Either `keySecret` or `keyFile` must be defined.
         *
         * It is mutually exclusive with `cert`.
         */
        certFile?: string;
        /**
         * List of supported cipher suites for TLS versions up to TLS 1.2.
         *
         * If not defined, the Go default cipher suites are used.
         * Available cipher suites are documented in the Go documentation:
         * https://golang.org/pkg/crypto/tls/#pkg-constants
         */
        cipherSuites?: string[];
        /**
         * Secret or ConfigMap containing the CA certificate for client certificate
         * authentication to the server.
         *
         * It is mutually exclusive with `clientCAFile`.
         */
        client_ca?: {
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
         * The server policy for client TLS authentication.
         *
         * For more detail on clientAuth options:
         * https://golang.org/pkg/crypto/tls/#ClientAuthType
         */
        clientAuthType?: string;
        /**
         * Path to the CA certificate file for client certificate authentication to
         * the server.
         *
         * It is mutually exclusive with `client_ca`.
         */
        clientCAFile?: string;
        /**
         * Elliptic curves that will be used in an ECDHE handshake, in preference
         * order.
         *
         * Available curves are documented in the Go documentation:
         * https://golang.org/pkg/crypto/tls/#CurveID
         */
        curvePreferences?: string[];
        /**
         * Path to the TLS private key file in the container for the web server.
         *
         * If defined, either `cert` or `certFile` must be defined.
         *
         * It is mutually exclusive with `keySecret`.
         */
        keyFile?: string;
        /**
         * Secret containing the TLS private key for the web server.
         *
         * Either `cert` or `certFile` must be defined.
         *
         * It is mutually exclusive with `keyFile`.
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
         * Maximum TLS version that is acceptable.
         */
        maxVersion?: string;
        /**
         * Minimum TLS version that is acceptable.
         */
        minVersion?: string;
        /**
         * Controls whether the server selects the client's most preferred cipher
         * suite, or the server's most preferred cipher suite.
         *
         * If true then the server's preference, as expressed in
         * the order of elements in cipherSuites, is used.
         */
        preferServerCipherSuites?: boolean;
      };
    };
}

/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The `Alertmanager` custom resource definition (CRD) defines a desired [Alertmanager](https://prometheus.io/docs/alerting) setup to run in a Kubernetes cluster. It allows to specify many options such as the number of replicas, persistent storage and many more.
 *
 * For each `Alertmanager` resource, the Operator deploys a `StatefulSet` in the same namespace. When there are two or more configured replicas, the Operator runs the Alertmanager instances in high-availability mode.
 *
 * The resource defines via label and namespace selectors which `AlertmanagerConfig` objects should be associated to the deployed Alertmanager instances.
 */
export interface AlertmanagerArgs {
  metadata: k8s.meta.v1.NamespacedObjectMeta;
  /**
   * Specification of the desired behavior of the Alertmanager cluster. More info:
   * https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   */
  spec: AlertmanagerSpec;
  /**
   * Most recent observed status of the Alertmanager cluster. Read-only.
   * More info:
   * https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   */
  status?: {
    /**
     * Total number of available pods (ready for at least minReadySeconds)
     * targeted by this Alertmanager cluster.
     */
    availableReplicas: number;
    /**
     * The current state of the Alertmanager object.
     */
    conditions?: {
      /**
       * lastTransitionTime is the time of the last update to the current status property.
       */
      lastTransitionTime: string;
      /**
       * Human-readable message indicating details for the condition's last transition.
       */
      message?: string;
      /**
       * ObservedGeneration represents the .metadata.generation that the
       * condition was set based upon. For instance, if `.metadata.generation` is
       * currently 12, but the `.status.conditions[].observedGeneration` is 9, the
       * condition is out of date with respect to the current state of the
       * instance.
       */
      observedGeneration?: number;
      /**
       * Reason for the condition's last transition.
       */
      reason?: string;
      /**
       * Status of the condition.
       */
      status: string;
      /**
       * Type of the condition being reported.
       */
      type: string;
    }[];
    /**
     * Represents whether any actions on the underlying managed objects are
     * being performed. Only delete actions will be performed.
     */
    paused: boolean;
    /**
     * Total number of non-terminated pods targeted by this Alertmanager
     * object (their labels match the selector).
     */
    replicas: number;
    /**
     * The selector used to match the pods targeted by this Alertmanager object.
     */
    selector?: string;
    /**
     * Total number of unavailable pods targeted by this Alertmanager object.
     */
    unavailableReplicas: number;
    /**
     * Total number of non-terminated pods targeted by this Alertmanager
     * object that have the desired version spec.
     */
    updatedReplicas: number;
  };
}

export class Alertmanager extends NamespacedAPIResource {
    spec: AlertmanagerSpec;
    status?: { availableReplicas: number; conditions?: { lastTransitionTime: string; message?: string; observedGeneration?: number; reason?: string; status: string; type: string; }[]; paused: boolean; replicas: number; selector?: string; unavailableReplicas: number; updatedReplicas: number; };

    constructor(args: AlertmanagerArgs) {
        super('monitoring.coreos.com/v1', 'Alertmanager', args.metadata);
        this.spec = args.spec;
        this.status = args.status;
    }
}
