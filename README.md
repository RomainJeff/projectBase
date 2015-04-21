# Base project architecture

### Technologies used
- GULP
- JASMINE (for Unit Testing)
- PHANTOMJS
- ECMASCRIPT 6 (compiled with Babel)
- SASS (with COMPASS)


### How to install
Make sure you have both NodeJS (with NPM) and SASS (with COMPASS) installed on your machine.

#### Install phantomjs
```
npm install -g phantomjs
```

#### Install gulp
```
npm install -g gulp
```

#### Pull the template
```
git clone https://github.com/RomainJeff/projectBase.git
```

#### Install dependencies
```
npm install
```

#### Compile the projet
```
gulp prod
```

#### Run the project
```
gulp serve
```
The project will be available at `http://localhost:3000`


#### Run the tests
```
gulp tests
```
