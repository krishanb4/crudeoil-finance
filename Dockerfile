#base image
FROM node

# set working directory
RUN mkdir /usr/src/ors
#copy all files from current directory to docker
COPY . /usr/src/ors

WORKDIR /usr/src/ors

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/ors/node_modules/.bin:$PATH

# install and cache app dependencies
##RUN yarn

# start app
CMD ["npm", "run" ,"start:prod"]