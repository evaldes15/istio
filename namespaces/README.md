#Creación de namespaces

## Definir ambiente y rol para vault

### Definir el namespace que se desea crear:

- NAMESPACE=dev
- NAMESPACE=test
- NAMESPACE=qa


### Crear la configuracion para vault:

work:

VAULT_ROLE=d4027333
VAULT_SECRET=994b733


## Configuración del Namespace

### 1.- Crear el Namespace

```
cat ns.yaml | sed "s/{{NAMESPACE}}/$NAMESPACE/g" | kubectl apply -f -
```

### 2.- Habilitar el auto inject en el ns

```
kubectl label namespace $NAMESPACE istio-injection=disabled --overwrite
```

### 3.- Hacer el role binding para poder leer los configmaps por parte de los microservicios

```
cat role-binding.yaml | sed "s/{{NAMESPACE}}/$NAMESPACE/g" | kubectl apply -f -
```

### 4.- Crear el configmap base

```
cat configmap-base.yaml | sed "s/{{NAMESPACE}}/$NAMESPACE/g" | sed "s/{{VAULT_ROLE}}/$VAULT_ROLE/g" | sed "s/{{VAULT_SECRET}}/$VAULT_SECRET/g" | kubectl apply -f -
```