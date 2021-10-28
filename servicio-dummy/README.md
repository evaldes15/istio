#Dummy service

### 1.- Crear Namespace

```
kubectl apply -f test-ns.yaml
```

### 2.- Deshabilitar el auto inject en el ns test

```
kubectl label namespace test istio-injection=disabled --overwrite
kubectl get namespace -L istio-injection
```

### 3.- Hacer el role binding para poder leer los configmaps por parte de los microservicios

```
kubectl apply -f role-binding.yaml
```

### 4.- Crear el configmap base

```
kubectl apply -f configmap-test.yaml
```

### 5.- Crear el configmap del servicio

```
kubectl apply -f configmap-demo-service.yaml
```

### 6.- Crear el servicio

```
kubectl apply -f demo-service.yaml
```