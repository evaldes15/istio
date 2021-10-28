#Kiali

### 1.- Desplegar servicio

```
kubectl apply -f prometheus.yaml
kubectl apply -f kiali.yaml
```

### 2.- Crear usuario dyd

```
kubectl apply -f kiali-dyd-account.yaml
```

### 2.1.- Obtener secret token dyd

```
kubectl get secret -n istio-system `kubectl get secret -n istio-system | grep mx-work-dyd-apis-token | awk '{print $1}'` -o jsonpath="{.data.token}" | base64 --decode >> dyd-token-work.txt
```
### 2.2.- Login

Utilizar el token del archivo *dyd-token.txt* para hacer login

### 3.- Crear usuario devops

```
kubectl apply -f kiali-devops-account.yaml
```

### 3.1.- Obtener secret token devops

```
kubectl get secret -n istio-system `kubectl get secret -n istio-system | grep mx-work-devops-apis-token | awk '{print $1}'` -o jsonpath="{.data.token}" | base64 --decode >> devops-token-work.txt
```

### 3.2.- Login

Utilizar el token del archivo *devops-token.txt* para hacer login