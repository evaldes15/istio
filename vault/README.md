# Vault

## Instalación

Para configurar vault se requiere lo siguiente:

1.- Crear el namespace

```
kubectl apply -f vault-ns.yaml
```

1.1.- Deshabilitar el auto inject en el ns vault

```
kubectl label namespace vault istio-injection=disabled --overwrite
kubectl get namespace -L istio-injection
```

2.- Crear el deployment y añadir el EBS para la persistencia

```
kubectl apply -f vault-deployment.yaml
```


## Configuracion

Al iniciar vault, se solicitara la cantidad de tokens que se crean y cuantos tokens se necesitan para **unseal** vault, para esta configuración se ingresaron 5 y 3 respectivamente.

Posterior, devuelve los tokens correspondientes:

**root token**
s.XXXXXXX

**keys**
oW5WSSSSSSS
T48wXXXXXXX
QEksYYYYYYY
O5c/ZZZZZZZ
4gU6WWWWWWW


## Configurar roles y politicas

1.- Crear un kvsecret engine
Version: **1**
Path: **istio-demo.appid**


2.- Crear  una politica para ser utilizada por un approle

Nombre: **istio-demo**

```
path "istio-demo.appid/*" {
   capabilities = ["read", "list"]
}
```

3.- Habilitar el acceso por **approle**, dentro del apartado, **Auth Methods** de la pestaña **access**.

Con la configuracion por defecto.

4.- Crear credenciales de acceso para un approle existente, se emplea el approle creado en el paso 2(**istio-demo**). 

Documentacion:

https://learn.hashicorp.com/tutorials/vault/approle

```
vault write auth/approle/role/istio-demo token_policies="istio-demo" token_ttl=1h token_max_ttl=4h
```

```
vault read auth/approle/role/istio-demo/role-id
```

Eso genera una salida con el id del role-id. 

Por ejemplo:
**997cb576-5f0a-7b42-3cc7-d9452d43ec58**

```
vault write -force auth/approle/role/istio-demo/secret-id
```

Eso genera una salida con las credenciales para conectarse por approle con un **secret_id**.

Key: Value 
**secret_id**: a96bafcd-02a4-28fa-8159-96b3a7414198
secret_id_accessor: 4c0b8f87-b701-2c55-0461-e9eebcc92fa7

Para probar el approle, desde la consola se puede hacer un login de la siguiente forma:

```
vault write auth/approle/login role_id="997cb576-5f0a-7b42-3cc7-d9452d43ec58" secret_id="a96bafcd-02a4-28fa-8159-96b3a7414198"
```

5.- Habilitar el acceso por **userpass**, para vault.

Ejecutar los siguientes comandos desde la terminal del UI:

```
vault auth enable userpass

vault write auth/userpass/users/<user> password=<password> policies=<policy>
```

Documentación de consulta para el apartado de politicas:

https://www.vaultproject.io/docs/concepts/policies