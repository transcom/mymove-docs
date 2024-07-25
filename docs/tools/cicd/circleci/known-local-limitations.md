# Known Limitations

CircleCI has [known local limitations that can be found detailed within their docs](https://circleci.com/docs/how-to-use-the-circleci-local-cli/#limitations-of-running-jobs-locally). This article is hoped to intercept
developers searching for their issues within the docs and present possible workarounds and links to third-party documentation that can hopefully assist more.

## Local limitations

### Using an executor with more than one image
CircleCI CLI [cannot handle local executors with more than one image](https://circleci.com/docs/how-to-use-the-circleci-local-cli/#executors). Doing so will present you with the following error:

`Error: Unhandled prepare executor error: Error response from daemon: invalid UTS mode: containera4e4804657980605d031801469af669e540d8629ec7a0f4d108ab5434145ff58`

There is a known workaround to utilize a docker-in-docker setup with the deprecated Docker version 20, keeping executors with only a single image and instead nesting additional containers inside of them when needed. A docker network can be utilized to ensure these containers can communicate properly.

For example, if you wanted an executor with 2 images such as `cimg/ruby` and `cimg/postgres`, the workaround is to have one image be the "host" of a docker-in-docker network, and instead of the host container running both images in parallel, it would instead _create_ the second image as a docker container inside of itself. The following is a code sample

```
version: 2.1

references:
  ruby-docker: &ruby-docker cimg/ruby:3.2
  # cimg/postgres would've gone here and placed within the executor
  # but instead we'll create it within a job step

executors:
  ruby_executor:
    docker:
      - image: *ruby-docker
jobs:
  test:
    executor: ruby_executor
  steps:
      - setup_remote_docker:
          version: 20.10.24
      - run:
          name: Start new docker network
          command: sudo docker network create my_docker_network
      - run:
          name: Join the host container on the network
          command: sudo docker network connect my_docker_network $(hostname)
      - run:
          name: Start PostgreSQL remote container
          command: sudo docker run --network my_docker_network --network-alias postgres_db_container --rm -d --name setup_tests_postgres_container -e POSTGRES_PASSWORD=mysecretpassword -e POSTGRES_DB=test_db -v /dev/shm/pgdata:/var/lib/postgresql/data cimg/postgres:12.11 -c 'listen_addresses=*'
      - run:
          name: Get PostgreSQL container IP address
          command: |
            export DB_HOST=$(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' setup_tests_postgres_container)
      - run:
          name: Wait for PostgreSQL to be ready on remote test container
          command: |
            until sudo docker exec setup_tests_postgres_container pg_isready -h ${DB_HOST} -p 5432 -U postgres; do
              echo "Waiting for PostgreSQL on ${DB_HOST}:5432..."
              sleep 2
              # Heads up there's no timeout here in this sample
            done
      - run:
          name: Stop PostgreSQL remote container
          command: sudo docker stop setup_tests_postgres_container
          when: always
      - run:
          name: Disconnect host from docker network
          command: sudo docker network disconnect my_docker_network $(hostname)
          when: always
      - run:
          name: Stop docker network
          command: sudo docker network rm my_docker_network
          when: always
```

If Docker volume mounting and local CircleCI workspace issues are encountered, you can bypass the need for storing files for shared access by sending the files from container to container.
This can be achieved by feeding files between the docker containers through input streams with `docker run -i` allowing the use of standard input for file transfers.

### Running workflows locally
CircleCI CLI [is limited by being unable to run workflows locally](https://circleci.com/docs/how-to-use-the-circleci-local-cli/#limitations-of-running-jobs-locally). It can only run individual jobs.

## Additional details
Please see [this pull request](https://github.com/transcom/trdm-lambda/pull/18) where the issue was first encountered by our organization.