# Run instructions

## Before run

- Make sure you have [Kubernetes](https://kubernetes.io/), [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) and [Skaffold](https://skaffold.dev/) installed on your machine

- If you are running on linux, you must setup a [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) cluster or use a hosted cluster, for mac and windows users, just enable Kubernetes on [Docker Desktop](https://www.docker.com/products/docker-desktop)

- You need enable [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/) in your cluster

- Make sure you have the secrets created on kubernetes

```
    kubectl create secret generic jwt-secret --from-literal=JWT_SECRET=1234
```

## Run

```
    skaffold dev
```
