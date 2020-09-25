# Run instructions

## Before run

- Make sure you have [Kubernetes](https://kubernetes.io/), [Kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/) and [Skaffold](https://skaffold.dev/) installed on your machine

- If you are running on linux, you must setup a [Minikube](https://kubernetes.io/docs/tasks/tools/install-minikube/) cluster or use a hosted cluster, for mac and windows users, just enable Kubernetes on [Docker Desktop](https://www.docker.com/products/docker-desktop)

- You need enable [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/) in your cluster and [metallb](https://metallb.universe.tf/) (linux only)

- Expose the ingress-nginx-controller (linux only)

```bash
kubectl expose deployment ingress-nginx-controller --target-port=80 --type=LoadBalancer -n kube-system
```

- Make sure you have the secrets created on kubernetes

```bash
    kubectl create secret generic jwt-secret --from-literal=JWT_SECRET=1234
```

- Edit the hosts file, on linux the path is /etc/hosts

```bash
    vi /etc/hosts
```

- And add a new line with content:

```
172.17.0.2 ticketing.dev
```

- Observation: My minukube is running on 172.17.0.2, to discovery the ip of your minikube instance, run:

```bash
minikube ip
```

## Run

```bash
    skaffold dev
```

Open in the browser [ticketing.dev](https://ticketing.dev)
