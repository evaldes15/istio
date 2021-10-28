#Pasos para instalar istio

### 1.- Crear Namespace

```
kubectl apply -f ns-istio-system.yaml
```

### 2.- Instalar istio (CustomResources, Roles, RoleBinding y Istiod deployment)

```
kubectl apply -f istio.yaml
```

### 3.- Añadir tolerations para que el coredns puede ser desplegado en los nodos de la infraestructura

```
kubectl patch deployment coredns -n kube-system --patch "$(cat coredns-tolerations.yaml)"
```

### 4.- Crear el storageClass para el cluster

```
kubectl apply -f storageclass.yaml
```

### 5.- Habilitar el auto inject en el ns default

```
kubectl label namespace default istio-injection=enabled --overwrite
```

## Opcional
### 6.- Crear el ingress gateway (CustomResources, Roles, RoleBinding y ingress-gateway deployment) 

```
kubectl apply -f istio-ingress.yaml
```

### 7.- Crear el certificado ssl para ingressgateway

```
kubectl create -n istio-system secret tls istio-ingressgateway-certs --key ./certs/istio-demobancomer_com.key --cert ./certs/istio-demobancomer_com.pem
```

### 8.- Crear el gateway asociado al ingressgateway

```
kubectl apply -f istio-gateway.yaml
```

**Nota**: Cada que se realice un cambio en el gateway, se necesita borrar el pod del ingressgateway dentro del namespace **istio-system** para que tome los cambios.

```
kubectl delete pod `kubectl get pods -n istio-system | grep ingressgateway | awk '{print $1}'` -n istio-system
```

### 9.- Habilitar metrics server para usar escalabilidad

```
kubectl apply -f metrics-server.yaml
```