#Reloader service

Servicio que permite reiniciar el pod de un servicio en caso que cambie su configmap

### 1.- Crear Namespace

```
kubectl apply -f reloader-ns.yaml
```

### 2.- Crear el servicio para reloader

```
kubectl apply -f reloader.yaml
```