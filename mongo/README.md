# Mongo

Para configurar MongoDB se requiere lo siguiente:

1.- Crear el namespace

```
kubectl apply -f mongo-ns.yaml
```

1.1.- Deshabilitar el auto inject en el ns storage

```
kubectl label namespace storage istio-injection=disabled --overwrite
kubectl get namespace -L istio-injection
```

2.- Crear el secret para dar de alta el usuario y contraseña admin

```
kubectl apply -f mongo-secret.yaml
```

**Nota:** Es necesario configurar el storageClass antes de crear el pvc, consultar dentro de la ruta raiz el archivo(storageclass.yaml).
 
3.- Dar de alta el persisten volume claim --- NO SE USA

```
kubectl apply -f mongo-pvc.yaml
```

4.- Crear el deployment y el servicio para consumo interno

```
kubectl apply -f mongo-deployment.yaml
```

### Opcional
En caso de ser necesario ejecutar las instrucciones(primera vez) para dar de alta los usuarios en la base de datos y importar el dump de la base de datos, consultar el archivo **mongo-db-init.js**