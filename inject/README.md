#Pasos para generar inject de aplicaciones

### 1.- Generar archivos de configuracion de istio-inject

```
kubectl -n istio-system get configmap istio-sidecar-injector -o=jsonpath='{.data.config}' > inject-config.yaml
kubectl -n istio-system get configmap istio-sidecar-injector -o=jsonpath='{.data.values}' > inject-values.yaml
kubectl -n istio-system get configmap istio -o=jsonpath='{.data.mesh}' > mesh-config.yaml
```

### 2.- Generar el archivo con la configuracion del inject necesaria

```
istioctl kube-inject \
    --injectConfigFile inject-config.yaml \
    --meshConfigFile mesh-config.yaml \
    --valuesFile inject-values.yaml \
    --filename app.yaml >> app-inject.yaml
```


### 3.- Reemplazar el archivo app-inject.yaml con el tolerations requerido en *tolerations.value*

```
    tolerations:
    - key: api.mkt.nodeType
      operator: Equal
      value: <toleration>
      effect: NoSchedule
```