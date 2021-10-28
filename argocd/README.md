# Argo CD

## Instalación

Para configurar Argo CD se requiere lo siguiente:

1.- Crear el namespace

```
kubectl apply -f argocd-ns.yaml
```

2.- Ejecutar los yamls para argocd, dependiendo los requisitos.

```
kubectl apply -f argocd-core.yaml
```

*Opcional* Si se requiere de la interfaz grafica para su administración.

```
kubectl apply -f argocd-ui.yaml
```
*Opcional* Si se requiere tener el objeto aplicationset que nos permite tener sincronizadas multiples aplicaciones a partir de un repositorio.

```
kubectl apply -f argocd-aplicationset.yaml
```

## Configuracion

3.- Obtener la contraseña para cuenta admin

```
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -D && echo
```

Se requiere guardar la salida del comando ya que es la contraseña de la cuenta que posteriormente se va a necesitar(<password-admin>).

4.- Cambiar la contraseña para cuenta admin

Ingresamos al contenedor de argocd

```
kubectl exec -it `kubectl get pods -n argocd | grep argocd-server | awk '{print $1}'` -n argocd /bin/bash
```

Se hace login con el password obtenido en el paso 3.

```
argocd login localhost:8080 --username admin --password <password-admin>
```

Se actualiza la contraseña con el valor deseado(<new-password>).

```
argocd account update-password --current-password <password-admin> --new-password <new-password>
```

5.- Borrar el secreto por defecto, para evitar que quede expuesta la información.

```
kubectl delete Secret -n argocd argocd-initial-admin-secret 
```

6.- Realizar port-forward para ingresar a la aplicacion con el password actualizado

```
kubectl port-forward svc/argocd-server -n argocd 8080
```

## Conexión para repositorios de un applicationset

7.- Crear el secreto para poder conectarse al repositorio de bitbucket. 
*Nota:* La información del secreto debe estar codificada en base64

```
kubectl apply -f argocd-secret.yaml
```

8.- Crear el proyecto y applicationset para el entorno requerido.

```
kubectl apply -f project.yaml
kubectl apply -f applicationset.yaml
```