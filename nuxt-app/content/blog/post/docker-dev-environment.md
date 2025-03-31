---
title: Development in a docker container
description: "Setting up a development environment in a Docker container to standardize dependencies across multiple devices. Shown using a C++ project, but this technique can also be used for other types of projects."
image: docker-dev-environment-thumbnail.webp
date: 2025-03
status: publish
featured: true
tags:
  - Docker
  - Toolchain
  - C++
---

During the latest installment of the Hackergarten Meetup in Zürich, multiple groups work on contributing to open-source projects. Our group worked on the open-source alternative of Adobe InDesign, called [Scribus](https://gitlab.com/scribus). The project is created with C++ and Qt, which needs many dependencies to compile. To make it easier for people to contribute and get setup quickly with the toolchain, we wanted to setup a development environment with all dependencies using a Docker container. This post documents our findings of this process and serves as a reference for other projects to dockerize their toolchain.

# What are we trying to solve
So the goal of this docker container isn't to package the app or serve it on the internet. The goal is to create a reproducible development environment that does not interfere with the packages available on the host machine. First off, this allows new developers to get setup quickly and start contributing immediately. Secondly, you will not get the dreaded "Well, it works on my machine" when someone's change does not work on your computer. In the end, this should improve the developer experience while contributing to a project.

# Install Docker
First, we need to have Docker installed on our system. There are some unofficial methods of installing docker (like the `docker.io` and `docker-compose` packages), so I therefore recommend to follow the [official installation guide from Docker itself](https://docs.docker.com/engine/install/).

# Building the Docker image
The Dockerfile defines the packages that are available in our development environment. The nice thing about this is that you document your dependencies directly and create a well defined development environment. The Dockerfile is a recipe to build an image, which will be the starting state of your Docker container.

To start, create a file in the root folder of your project, called `Dockerfile`. In this file we start with specifying a base image, here we use the latest `ubuntu` image, which will be pulled from the [docker hub repository](https://hub.docker.com/_/ubuntu). After that we run an `apt update` to get the latest versions of all packages and install the packages we need using `apt install`.
```
FROM ubuntu:24.04

RUN apt update
RUN apt install -y <package_name_1> <package_name_2> ...
```

That is it. We can now build our docker image using `docker build -t "my_cpp_dev_environment" .`. We specify a name for our docker image using the `-t` command.

After the build is finished, we can see our docker image in the list of locally available images using `docker image ls`. We are now ready to run the image.

# Running the Docker image
To run our development environment in a docker container, we simply run `docker run my_cpp_dev_environment`. However, nothing really happens. That is, because a docker container is only alive as long as a program is running inside of it. An easy way to keep the container alive, is by entering a bash session when starting the container. We do this by running `docker run -it my_cpp_dev_environment bash`. We see that our terminal has changed appearance, indicating that we are now in a terminal session inside our container. We are now running the docker container in interactive mode. You can check if your tooling is available, for example for c++, we type `g++ --version` to see if the `g++` command is available.

What you might notice, is that your code is nowhere to be found in the file system of the container. This will be the next step to tackle. Exit the container by typing `exit` in the command line and you will go back to the terminal of your host. Just as a side note: if you type `docker ps -a`, you will see that your container is stopped. However, it is still taking up some resources, so it is best to remove the docker container using `docker remove <id_or_name_of_container>`, where you replace the angled brackets with either the first six characters of the container id or the randomly generated name that the container got. Next times we run our container, we can add the `--rm` flag to the `docker run` command to remove the container directly after we exit it. It is also nice to give your container a specific name using the `--name` flag, followed by a logical name for the container.

Now that we are comfortable with docker, let's get our code available in the development container.

## Get our code in the container
Docker provides a way to share folders between the host and the container. In docker terminology this is called a bind mount. We can mount our project directory and its contents to the container by adding `--mount type=bind,src=./,dst=/workspace` to the run command. This command will map the current folder we are in (`./`) to the `/workspace` folder inside the container. This means we need to call the `docker run` command, when we are in our project directory, otherwise it will not work, so a more robust way might be to specify the `src` using a fixed path, for example `/home/geert/projects/cpp-project`. Change this path to where your project is on your file system.

As a small note, this bind mount command is quite long. It is possible to shorten it by just typing `-v /home/geert/projects/cpp-project:/workspace`, where the path left of the colon is the host path (src) and the right path is the container path (dst). This is nice to shrink our command and does not bring many downsides. The `--mount` flag provides some extra options, which are only needed if you know you need it. So you are safe to use this abbreviated version.

If we now run our command `docker run --rm -it --mount type=bind,src=/home/geert/projects/cpp-project,dst=/workspace my_cpp_dev_environment bash`, we enter the bash shell of the container again and we can move to the `/workspace` directory and we will see our code. We can now compile our code with the tooling that is inside the container as if we were developing on our host machine. So edit your files using your normal editor on your host machine and when you want to compile, go to the container and run the compile commands there.

To not have to change directory when starting your docker container, you can add an extra flag to your run command: `--workdir=/workspace`. This will make sure the bash shell will be in the `/workspace` directory when starting the container. Additionally, you can also specify your workdir in the Dockerfile, which is my preference. Do this by adding `WORKDIR /workspace` below the `FROM` statement in the Dockerfile. Build your container again afterwards to get the changes. By specifying the workdir in the Dockerfile, you won't have to add the `--workdir` flag to you docker run command, which is already getting a bit long.

## Permissions
However, you may quickly notice that your build artefacts can't be run as the owner of those artefacts are root. That is because we are root in the container. We can fix this by using the same user inside the container as outside the container. Add the following flag to your run command to fix this: `--user $(id -u):$(id -g)`. This command gets your user and group id and set the user inside the container to have the same ids.

Compiling your code now inside the docker container will make all the artefacts be able to run by your user.

## Running graphical apps inside docker
If you are developing a graphical app, like Scribus, which uses Qt, you need some extra steps to allow starting the graphical app from the docker container.

For a host using X11, we can pass a socket to the docker container to provide the graphical app a place to write its graphics too. First, on the host we need to add the docker group to the groups that are allowed to write to the Xserver using: `xhost +local:docker`. After that we add two flags to our docker run command: `-e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix`. This passes the `DISPLAY` environment variable from our host to our container and creates a bind mount from the hosts X11 socket to the container.

For a host using Wayland, it is slightly different, but essentially doing similar things. Add these flags to your docker run command instead: `-e XDG_RUNTIME_DIR=/tmp -e WAYLAND_DISPLAY=$WAYLAND_DISPLAY -v $XDG_RUNTIME_DIR/$WAYLAND_DISPLAY:/tmp/$WAYLAND_DISPLAY`.

When you start your container again with these flags added, you will be start your graphical app.

At the end your run command will look something like this:

Non-graphical apps
```sh
docker run --rm -it -v /home/geert/projects/cpp-project:/workspace --user $(id -u):$(id -g) my_cpp_dev_environment bash
```
Graphical apps with X11
```sh
docker run --rm -it -v /home/geert/projects/cpp-project:/workspace --user $(id -u):$(id -g) -e DISPLAY=$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix my_cpp_dev_environment bash
```
Graphical apps with Wayland
```sh
docker run --rm -it -v /home/geert/projects/cpp-project:/workspace --user $(id -u):$(id -g) -e XDG_RUNTIME_DIR=/tmp -e WAYLAND_DISPLAY=$WAYLAND_DISPLAY -v $XDG_RUNTIME_DIR/$WAYLAND_DISPLAY:/tmp/$WAYLAND_DISPLAY my_cpp_dev_environment bash
```

# Microsoft devcontainer
Microsoft created a wrapper for docker to easily create these kinds of development containers. It solves many of the problems we had to solve in the manual version above, like making our code available in the container, user permissions and display passthrough for graphical apps. Microsoft calls this devcontainer and are well integrated with Visual Studio Code.

To start creating a devcontainer, open your project in VSCode and install the Dev containers extension (ms-vscode-remote.remote-containers). Then create a directory in your project called `.devcontainer/` and create a json file in there called `devcontainer.json`. In this file add the following json:

```json
{
  "name": "My cpp dev container",
  "build": {
    "dockerfile": "../Dockerfile"
  },
}
```

This way the dev container will use the Dockerfile in the root of our project that we created before. Save the file and start the devcontainer with the command `Dev Container: Reopen in Container`. (You can run commands in VS Code by pressing Ctrl + Shift + p.) The devcontainer will open and you can develop as normally in VS Code and use the bash terminal of the container to compile and run your code.

Devcontainers also provide many [template images](https://github.com/devcontainers/images/tree/main/src), which can be used as a base for you Dockerfiles, or if the development image is published on something like Docker Hub, then you can also pull this image by changing the `devcontainer.json` to (fill in any `image` that you want to use):
```json
{
  "name": "My Dev Container",
  "image": "mcr.microsoft.com/devcontainers/cpp"
}
```

For more info on dev container look at the [Visual Studio documentation](https://code.visualstudio.com/docs/devcontainers/tutorial).

# Some final things to make life easier

## Build script
If the build steps of your program are always the same, you can save yourself some time to create a script that performs these steps. Then instead of entering the bash shell of your development container, you can start the container with this script. When the build is finished the container will clean itself up again (as long as you use `--rm`), meaning you only have to do call one command to build your project. The interactive mode flags (`-it`) can then me removed from your docker run command.

```sh
docker run --rm -v /home/geert/projects/cpp-project:/workspace --user $(id -u):$(id -g) my_cpp_dev_environment /workspace/build.sh
```

Additionally, you can also run your program directly by the docker run command by replacing the build script with your program. If you want your program to compile and run, you can also combine them in one command using

```sh
docker run --rm -v /home/geert/projects/cpp-project:/workspace --user $(id -u):$(id -g) my_cpp_dev_environment bash -c "/workspace/build.sh && /workspace/program.exe"
```

## Alias for docker run command
The docker run command gets quite long. So you might want to create an alias to not keep typing this command in. You can add a simple bash alias to your `.bashrc` file, or even better, since the alias is specific to your git project, you can create a git alias that is local to your repository.

Here I create a git alias called dr (for docker run) that performs a shell command (indicated by the ! at the begining). It maps the root directory of your git repo to the workspace of your container. The name of the alias can be changed to whatever you like and you can make multiple for different docker commands you might need.

The alias will be stored in `.git/config` of your repository.

```sh
git config --local alias.dr '!docker run --rm -it -v $(git rev-parse --show-toplevel):/workspace --user $(id -u):$(id -g) my_cpp_dev_environment bash'
```


# Interesting discussions
It was a fun and educational evening. Throughout the event, we had some interesting discussions. So I will wrap up this post with few highlights of these discussions.

## Guix/Nix vs Docker
Why use a docker dev container, when you can also define custom shell environments using Guix or Nix? This is a nice discussion and falls down to personal preference and what you are used to. We can achieve a similar development environment with these functional package managers and when you are not so familiar with Docker, it may be not worth it setting up a Docker container. However, an advantage of the Docker approach is that you can reuse your development Dockerfile for your CI/CD pipelines to create builds, run tests and package your software.

## Ubuntu vs Alpine Linux as docker base
There are many base images to use for your Dockerfile. The ubuntu image includes quite a lot of tools, which may make your docker image relatively large. To reduce the size of your docker image, you can use a minimal image like the Alpine Linux image as a base. It is a personal preference whether you want to spent the extra time getting an Alpine Linux image working for your project, as you may need some more dependencies that were standard in Ubuntu, for maybe a slightly leaner docker image. When you are first trying it out, the ubuntu base image is probably the best way to start.

## bind mount vs COPY
Dockerfiles have the COPY command to copy files from the host to the docker image at build time. We can add our source code of our project to the image at build time and then don't have to map a bind mount. An adavantage of this is that we can compile our code during build time, meaning we don't have to type our build commands in the shell of the container. The disadvantage of this approach, however, is that you need to rebuild your docker image each time you change your source code, while a bind mount shares all changes between the host and container. Additionally, you would lose your intermediate artefacts that speedup builds, as they were never copied back to your host. That would mean a large C++ project needs to rebuild all .o files, which can be quite inefficient if you only change one. With large C++ projects sometimes needing multiple minutes or even hours to compile fully, you would waste a lot of time waiting on builds. A Dockerfile does cache its build steps, but it sees a make compile command, as one build step. Therefore if you want to recompile, you would always need to recompile fully. So, a bind mount approach is highly recommended over the COPY approach.

