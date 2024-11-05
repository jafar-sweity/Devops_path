# Docker Concepts Overview

# Table of Contents

1. [Docker Concepts Overview](#docker-concepts-overview)
   1. [Creating a Simple Image](#creating-a-simple-image)
      - [Building and Running an Image](#building-and-running-an-image)
   2. [Listing and Removing Docker Images](#listing-and-removing-docker-images)
      - [List Available Images](#list-available-images)
      - [Remove an Image](#remove-an-image)
2. [Tags and Versioning](#tags-and-versioning)
3. [Docker Volumes](#docker-volumes)
4. [Networking in Docker](#networking-in-docker)
5. [Docker Compose](#docker-compose)
   1. [Docker Compose Overview](#docker-compose-overview)
   2. [Key Components of docker-compose.yml](#key-components-of-docker-composeyml)
   3. [Docker Compose Commands](#docker-compose-commands)
6. [Docker Orchestration](#docker-orchestration)
   1. [Docker Swarm](#docker-swarm)
7. [CI/CD with Docker](#ci-cd-with-docker)
   1. [CI (Continuous Integration)](#ci-continuous-integration)
   2. [CD (Continuous Deployment)](#cd-continuous-deployment)
8. [Automate Docker Deployment with Watchtower](#automate-docker-deployment-with-watchtower)

## Docker Concepts Overview

### Creating a Simple Image

- The `Dockerfile` is typically named `Dockerfile` for clarity. It starts with a `FROM` instruction, defining the base image.
- The `CMD` instruction specifies the executable for the container.

### Building and Running an Image

- Create an image from a Dockerfile:
  ```bash
  docker build -t <name> .
  ```

## Docker Concepts Overview

### Creating a Simple Image

- The `Dockerfile` can have any name. However, naming it `Dockerfile` helps others understand its purpose and allows us to omit the file name when using the `docker build` command.
- A `Dockerfile` always begins with a `FROM` instruction because every image is based on another base image.

- The `CMD` instruction specifies which executable to run when a container is created using the image and provides optional arguments.

### Building and Running an Image

- To create an image from your Dockerfile, use:

```bash
  docker build -t <name> .
```

- Run the image like any other:

```bash
docker run --rm -it <name>
```

- The -it switch allows you to stop the container using Ctrl-C from the command-line.
- The --rm switch ensures the container is deleted once it stops.
- To view locally available images:

```bash
docker image ls
```

- To delete an image locally:

```bash
docker rmi <image_name>
```

## Tags Matter

### Why Would You Tag Your Images?

- **Rollback:** Easily roll back to a previous version if issues are found with the latest version.
- **Different Environments:** Run different versions in test and production environments.
- **Canary Release:** Route some users to the latest version and others to previous versions.
- **Custom User Deployments:** Deploy different versions to different user groups.

### Parameters as Environment Variables

Use environment variables to customize container behavior during runtime.

### Storage

Use `VOLUME` to persist data across container restarts.

### Networking

The `EXPOSE <port_num>` instruction is for documentation purposes, indicating which ports the application listens to. It does not open the port externally.

## Key Dockerfile Instructions

| Instruction   | Description                                             |
| ------------- | ------------------------------------------------------- |
| `ADD`         | Add local or remote files and directories.              |
| `ARG`         | Use build-time variables.                               |
| `CMD`         | Specify default commands.                               |
| `COPY`        | Copy files and directories.                             |
| `ENTRYPOINT`  | Specify the default executable.                         |
| `ENV`         | Set environment variables.                              |
| `EXPOSE`      | Document which ports the application listens to.        |
| `FROM`        | Create a new build stage from a base image.             |
| `HEALTHCHECK` | Check a container's health on startup.                  |
| `LABEL`       | Add metadata to an image.                               |
| `MAINTAINER`  | Specify the image author.                               |
| `ONBUILD`     | Instructions for when the image is used in a build.     |
| `RUN`         | Execute build commands.                                 |
| `SHELL`       | Set the default shell of an image.                      |
| `STOPSIGNAL`  | Specify the system call signal for exiting a container. |
| `USER`        | Set user and group ID.                                  |
| `VOLUME`      | Create volume mounts.                                   |
| `WORKDIR`     | Change the working directory.                           |

## Docker Image Management

You can have an image available on your machine by either:

- **Building** an image using `docker build`.
- **Pulling** an image from a registry using `docker pull` or implicitly when using `docker run`.

## Docker Hub

Docker Hub is a Docker Registry provided by Docker Inc. You can also use a `.dockerignore` file to exclude files from being added to the image, similar to `.gitignore`.

## Hot Reloading with Docker

To reflect code changes immediately without rebuilding the container image, use the -V flag in docker run:

```bash
 docker run -v <absolute path in your local>:<container workingDir>
 Use :ro for read-only volumes.
```

## Docker Compose Overview

Docker Compose helps run multiple containers of interrelated services with a single command. It defines all dependencies in one file and simplifies running services with `docker-compose up`.

### Key Components of docker-compose.yml

- **Version:** Specifies the version of the docker-compose format.
- **Services:** Defines the Docker images and builds required.
- **Build:** Specifies the Dockerfile location.
- **Ports:** Maps container ports to host machine ports.
- **Volumes:** Mounts disks.
- **Links:** Links one service to another.
- **Environment:** Sets environment variables for services.

### Docker Compose Commands

- `docker-compose build:` Builds images for the services in the docker-compose.yml.
- `docker-compose images:` Lists images built using the current compose file.
- `docker-compose run:` Creates containers from images for a specific service.
- `docker-compose up:` Builds images (if not available locally) and starts containers.
- `docker-compose stop:` Stops running containers of the specified services.
- `docker-compose rm:` Removes the containers created by the current compose file.
- `docker-compose start:` Starts any stopped containers of the services.
- `docker-compose restart:` Restarts the containers of the services.
- `docker-compose ps:` Lists containers for services in the current compose file.
- `docker-compose down:` Stops and cleans up containers, networks, and images.
- `docker-compose logs:` Shows logs from the running services.

```yaml
version: "3.8" # Specify the version of the docker-compose format

services: # Define the services
  web: # Service for the web application
    image: nginx:latest # Use the latest NGINX image
    ports:
      - "8080:80" # Map port 8080 on the host to port 80 in the container
    volumes:
      - ./html:/usr/share/nginx/html # Mount local html directory to the container
    depends_on:
      - redis # This service depends on the Redis service

  redis: # Service for Redis
    image: redis:alpine # Use a lightweight Redis image
    ports:
      - "6379:6379" # Map port 6379 on the host to port 6379 in the container

networks:
  default:
    driver: bridge # Use the default bridge network
```

### Redis and NGINX

- **Redis:** Open-source in-memory data store.
- **NGINX:** Open-source web server used for reverse proxy, load balancing, and caching.

### Load Balancing with NGINX

You can scale your containers using Docker Compose with:

```bash
 docker-compose up --scale <container_name>=<num_instances>
```

## Automate Docker Deployment with Watchtower

Use the watchtower image to automate the updating of your Docker containers when a new image is available.

### CI/CD Concepts

### CI (Continuous Integration)

Continuous Integration (CI) is a software development practice where developers frequently integrate code into a shared repository. Key points include:

- **Automated Builds and Tests:** Triggered when code is pushed to a new branch, ensuring new changes don’t break existing functionality.
- **Immediate Feedback:** Developers receive quick feedback, allowing for early issue resolution.
- **Code Review:** After testing, code can be reviewed and merged into the main branch, ensuring stable releases.

### CD (Continuous Deployment)

Continuous Deployment (CD) automates the deployment of applications to production whenever changes pass automated tests. Key aspects include:

- **Automated Pipelines:** Code changes are automatically built, tested, and deployed.
- **Faster Releases:** Reduces time to market for new features and fixes.
- **Confidence in Releases:** Thorough testing minimizes the risk of faulty code in production.

### Docker Orchestration

Docker orchestration automates the management of containerized applications. Benefits include:

- **Simplified Deployment:** Automates server creation and container deployment.
- **Scaling and Load Balancing:** Automatically scales applications based on demand and distributes loads.
- **Error Management:** Handles container failures and updates seamlessly.

### Docker Swarm

Docker Swarm is Docker’s native clustering and orchestration tool, managing a cluster of Docker engines as a single system. Key components include:

- **Nodes:**
  - **Manager Node:** Manages the Swarm cluster and schedules tasks.
  - **Worker Node:** Executes containers as assigned by manager nodes.
- **Services and Tasks:** Services are long-running tasks, while tasks are instances of containers within a service.
- **Load Balancing:** Distributes requests across services for enhanced reliability.
- **Scaling:** Services can be scaled up or down by adjusting the number of replicas.
