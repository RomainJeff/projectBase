# Base project architecture

### Technologies used
- GULP
- JASMINE (for Unit Testing)
- PHANTOMJS
- ECMASCRIPT 6 (compiled with Babel)
- SASS (with COMPASS)


### How to install
Make sure you have both NodeJS (with NPM) and SASS (with COMPASS) installed on your machine.

#### 1. Install phantomjs
```
npm install -g phantomjs
```

#### 2. Install gulp
```
npm install -g gulp
```

#### 3. Pull the template
```
git clone https://github.com/RomainJeff/projectBase.git
```

#### 4. Install dependencies
```
npm install
```

#### 5. Compile the projet
```
gulp prod
```

#### 6. Run the project
```
gulp serve
```
The project will be available at `http://localhost:3000


#### 7. Run the tests
```
gulp tests
```
