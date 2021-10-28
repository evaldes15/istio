# Fluentd

Para dar de alta Fluentd se necesita ejecutar lo siguiente:


1.- Crear el namespace

```
kubectl apply -f fluentd-ns.yaml
```

1.1.- Deshabilitar el auto inject en el ns storage

```
kubectl label namespace fluentd istio-injection=disabled --overwrite
kubectl get namespace -L istio-injection
```

2.- Configurar el daemonset

```
kubectl apply -f fluentd-daemonset.yaml
```

### output.conf para pruebas

```
  output.conf: |-
    # Format logs into valid json structure
    <filter **.mx-istio-demo**>
      @type parse_log
    </filter>
    # Match only the logs from files of microservices cointainers
    <match **.mx-istio-demo**>
      @type stdout
      output_type json
    </match>
```

### inject

istioctl kube-inject     --injectConfigFile ../inject/inject-config.yaml     --meshConfigFile ../inject/mesh-config.yaml     --valuesFile ../inject/inject-values.yaml     --filename fluentd-daemonset.yaml >> fluentd-daemonset-inject.yaml