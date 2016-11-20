import React, {Component} from "react";
import _ from "lodash";
import NectarObstacle from "nectar/NectarObstacle";
import NectarKolibriEgg from "nectar/NectarKolibriEgg";

class NectarNest extends Component {
  constructor(props, context) {
    super(props, context);
    this.start();

    this.handleKey = _.bind(this.handleKey, this);
    this.quit = _.bind(this.quit, this);
    this.restart = _.bind(this.restart, this);
    this.start = _.bind(this.start, this);
    this.gameOver = _.bind(this.gameOver, this);
    this.createObstacle = _.bind(this.createObstacle, this);
    this.increaseSpeed = _.bind(this.increaseSpeed, this);
  }

  restart() {
    this.quit();
    this.start();
  }

  gameOver() {
    let {
        loopCounter,
        bonusPoints
        } = this.state;

    this.quit();

    let currentScore = Math.floor(loopCounter / 100) + bonusPoints;
    let lastScore = sessionStorage.getItem('kolibri-nectar-highscore');

    if (lastScore < currentScore) {
      sessionStorage.setItem('kolibri-nectar-highscore', currentScore);
    }

    this.setState({gameOver: true})
  }

  start() {
    let self = this;
    let idCounter = 0;

    let loopInterval = setInterval(function () {
          self.gameLoop();
        },
        25);

    let createInterval = setInterval(function () {
          self.createObstacle();
        },
        1500);

    let speedInterval = setInterval(function () {
          self.increaseSpeed();
        },
        4000);

    let movingObstacles = [];

    this.maxWidth = 400;
    this.maxHeight = 300;
    this.grassWidth = 10;

    //Cover the ground with grass
    for (let i = 0; i < 60; i++) {
      movingObstacles.push(
          new NectarObstacle(
              "ion-stats-bars",
              "",
              this.maxWidth + (this.grassWidth * i),
              this.maxHeight,
              idCounter++));
    }

    let kolibri = this.createKolibri();

    let state = {
      idCounter,
      loopCounter: 0,
      endTheGame: false,
      initialized: true,
      loopInterval,
      movingObstacles,
      createInterval,
      speedInterval,
      moveDirection: false,
      kolibri,
      speed: 1,
      gameOver: false,
      bonusPoints: 0
    };

    if (!this.state) {
      this.state = state;
    }
    else {
      this.setState(state);
    }

  this.handleKey = _.bind(this.handleKey, this);
  }

  increaseSpeed() {
    let self = this;

    let {
        speed,
        createInterval
        } = this.state;

    speed++;

    //Also create things faster!
    clearInterval(createInterval);

    let newCreateIntervalSpeed = 1500 - (speed * 150);
    if (newCreateIntervalSpeed < 200) {
      newCreateIntervalSpeed = 200;
    }

    createInterval = setInterval(function () {
          self.createObstacle();
        },
        newCreateIntervalSpeed);

    this.setState({speed, createInterval});
  }

  createObstacle() {
    let {
        idCounter,
        movingObstacles,
        speed
        } = this.state;

    let randomNr = Math.floor((Math.random() * 14) + 1);

    switch (randomNr) {
      case 1:
        let house = this.createHouse(idCounter++);
        movingObstacles.push(house);
        break;
      case 2:
        let android = this.createAndroid(idCounter++);
        movingObstacles.push(android);
        break;
      case 3:
        let trash = this.createTrash(idCounter++);
        movingObstacles.push(trash);
        break;
      case 4:
      case 11:
        let plane = this.createPlane(idCounter++);
        movingObstacles.push(plane);
        break;
      case 5:
        let house2 = this.createHouse2(idCounter++);
        movingObstacles.push(house2);
        break;
      case 6:
        let ghost = this.createGhost(idCounter++);
        movingObstacles.push(ghost);
        break;
      case 7:
        let cloud = this.createCloud(idCounter++);
        movingObstacles.push(cloud);
        break;
      case 8:
        let fort = this.createFort(idCounter++);
        movingObstacles.push(fort);
        break;
      case 9:
      case 10:
        let jet = this.createJet(idCounter++);
        movingObstacles.push(jet);
        break;
      case 12:
        let tree = this.createTree(idCounter++);
        movingObstacles.push(tree);
        break;
      case 13:
        let rose = this.createRose(idCounter++);
        movingObstacles.push(rose);
        break;
      case 14:
        let bug = this.createBug(idCounter++);
        movingObstacles.push(bug);
        break;
    }

    this.setState({idCounter, speed});
  }

  createKolibri() {
    return new NectarObstacle("", "kolibri-loader-image-right", 50, 100, "Kolibri");
  }

  createPlanet() {
    let planet = new NectarObstacle("ion-ios-sunny", "", 270, 20, "Planet");
    planet.width = 100;
    planet.color = "white";
    return planet;
  }

  createTrash(idCounter) {
    let trash =
        new NectarObstacle(
            "ion-trash-a",
            "",
            this.maxWidth,
            this.maxHeight - 13,
            idCounter);
    trash.width = 25;
    return trash;
  }

  createCloud(idCounter) {
    let cloud = new NectarObstacle(
        "ion-cloud",
        "",
        this.maxWidth,
        this.maxHeight - 200,
        idCounter);
    cloud.width = 100;
    cloud.color = "gray";
    return cloud;
  }

  createBug(idCounter) {
    let bug = new NectarObstacle(
        "ion-bug",
        "",
        this.maxWidth,
        this.maxHeight - 250,
        idCounter);
    bug.width = 25;
    bug.rotateLeft = true;
    bug.isBonus = true;
    return bug;
  }

  createPlane(idCounter) {
    let randomNr = Math.floor((Math.random() * 10) + 1);

    let plane = new NectarObstacle(
        "ion-android-plane",
        "",
        this.maxWidth,
        this.maxHeight - 330 + (randomNr * 15),
        idCounter);
    plane.width = 50;
    plane.rotateLeft = true;
    plane.fast = true;
    plane.isDangerous = true;
    return plane;
  }

  createJet(idCounter) {
    let randomNr = Math.floor((Math.random() * 10) + 1);

    let plane = new NectarObstacle(
        "ion-jet",
        "",
        this.maxWidth,
        this.maxHeight - 300 + (randomNr * 10),
        idCounter);
    plane.width = 50;
    plane.rotateLeft = true;
    plane.fast = true;
    plane.isDangerous = true;
    return plane;
  }

  createHouse(idCounter) {
    let house =
        new NectarObstacle(
            "ion-ios-home",
            "",
            this.maxWidth,
            this.maxHeight - 95,
            idCounter);
    house.width = 100;
    return house;
  }

  createTree(idCounter) {
    let tree =
        new NectarObstacle(
            "fa fa-tree",
            "",
            this.maxWidth,
            this.maxHeight - 70,
            idCounter);
    tree.width = 70;
    return tree;
  }

  createRose(idCounter) {
    let rose =
        new NectarObstacle(
            "ion-ios-rose",
            "",
            this.maxWidth,
            this.maxHeight - 13,
            idCounter);
    rose.width = 25;
    return rose;
  }

  createHouse2(idCounter) {
    let house =
        new NectarObstacle(
            "ion-android-home",
            "",
            this.maxWidth,
            this.maxHeight - 60,
            idCounter);
    house.width = 70;
    return house;
  }

  createFort(idCounter) {
    let house =
        new NectarObstacle(
            "fa fa-fort-awesome",
            "",
            this.maxWidth - 20,
            this.maxHeight - 170,
            idCounter);
    house.width = 150;
    return house;
  }

  createGhost(idCounter) {
    let ghost =
        new NectarObstacle(
            "ion-social-snapchat",
            "",
            this.maxWidth,
            this.maxHeight - 20,
            idCounter);
    ghost.width = 30;
    return ghost;
  }

  createAndroid(idCounter) {
    let android =
        new NectarObstacle(
            "ion-social-android",
            "",
            this.maxWidth,
            this.maxHeight - 40,
            idCounter);
    android.width = 50;
    return android;
  }

  addBonus() {
    let {bonusPoints} = this.state;
    this.setState({bonusPoints: bonusPoints + 10});
  }

  componentDidMount() {
    window.addEventListener("keydown", this.handleKey);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKey);
  }

  handleKey(e) {
    if (e.keyCode == 82) {
      this.restart();
    }
    else if (e.keyCode == 83) {
      this.setState({moveDirection: "down"})
    }
    else if (e.keyCode == 87) {
      this.setState({moveDirection: "up"});
      e.stopPropagation();
    }
  }

  quit() {
    let {
        loopInterval,
        createInterval,
        speedInterval,
        } = this.state;

    if (loopInterval) {
      clearInterval(loopInterval);
    }
    if (createInterval) {
      clearInterval(createInterval);
    }
    if (speedInterval) {
      clearInterval(speedInterval);
    }
  }

  gameLoop() {
    let {
        movingObstacles,
        loopCounter,
        initialized,
        moveDirection,
        kolibri,
        speed
        } = this.state;

    if (!initialized) {
      return;
    }

    _.each(movingObstacles, (obstacle) => {
      let extraSpeed = 1;

      if (obstacle.fast) {
        extraSpeed = 2;
      }
      obstacle.changePosition((-1 * extraSpeed) - (speed), 0);
    });

    //Move Kolibri
    if (moveDirection == "down" && kolibri.y < 150) {
      kolibri.changePosition(0, 1 + (speed * 1));
    }
    else if (moveDirection == "up" && kolibri.y > 10) {
      kolibri.changePosition(0, -1 - (speed * 1));
    }

    this.setState({loopCounter: loopCounter + 1, kolibri});
    this.collisionDetection(movingObstacles, kolibri);
  }

  collisionDetection(movingObstacles, kolibri) {
    let {
        } = this.state;

    _.each(movingObstacles, (obstacle) => {
      if (!obstacle) {
        return; //A deleted element.
      }
      if (obstacle.x < -200) {//Obstacle out of range.
        //If it is grass, reset the position
        if (obstacle.ionIconName === "ion-stats-bars") {
          obstacle.x = 400;
        }
        else {
          //Else delete the object
          _.remove(movingObstacles, {id: obstacle.id});
        }
      }

      if (obstacle.isDangerous) {
        if (!(
                kolibri.y > obstacle.y + (obstacle.width + 10) ||
                kolibri.x + 20 < obstacle.x ||
                kolibri.y - 0 < obstacle.y ||
                kolibri.x > obstacle.x + obstacle.width

            )) {
          this.gameOver();
        }
      }
      if (obstacle.isBonus) {
        if (!(
                kolibri.y > obstacle.y + (obstacle.width + 10) ||
                kolibri.x + 20 < obstacle.x ||
                kolibri.y - 0 < obstacle.y ||
                kolibri.x > obstacle.x + obstacle.width

            )) {
          this.addBonus();

          _.remove(movingObstacles, {id: obstacle.id}); //Eat!
        }
      }
    });

    this.setState({movingObstacles})
  }

  render() {
    let {
        movingObstacles,
        kolibri,
        gameOver,
        loopCounter,
        bonusPoints
        } = this.state;

    let points = (Math.floor(loopCounter / 100)) + bonusPoints;

    let obstacleJsxMap = _.map(movingObstacles, (obstacle) => {
          return <NectarKolibriEgg
              key={obstacle.id}
              obstacle={obstacle}
              />
        }
    );

    let helpStyle = {
      textAlign: "center",
      position: "relative",
      left: "165px",
      top: "-20px"
    };

    let helpJsx = (
        <div style={helpStyle}>
          <p>Up: w<br/>
            Down: s<br/>
          </p>
        </div>
    );

    let style = {
      overflow: "hidden",
      border: "1px solid",
      height: "315px",
      width: "400px",
      backgroundColor: "lightgray",
      margin: "auto",
      position: "relative",
      top: "20px"
    };

    let backgroundStyle = {
      backgroundColor: "#333333",
      width: "100%",
      height: "360px"
    };

    let planet = this.createPlanet();

    let gameOverStyle = {
      backgroundColor: "white",
      padding: "10px",
      textAlign: "center"
    };

    let quitPopup = gameOver ? (
        <div style={gameOverStyle}>
          <p>Game over</p>

          <p>points: {points}</p>

          <p>high score: {sessionStorage.getItem('kolibri-nectar-highscore')}</p>

          <p>Press "R" to restart</p>
        </div>
    )
        : null;

    let pointsStyle = {
      padding: "10px 5px"
    };

    let pointsJsx = (
        <span style={pointsStyle}>{points}</span>
    );

    return (
        <div style={backgroundStyle}>
          <div className="NectarNest" style={style}>

            <NectarKolibriEgg
                key="Kolibri"
                obstacle={kolibri}
                />

            <NectarKolibriEgg
                key="Planet"
                obstacle={planet}
                />

            {obstacleJsxMap}
            {pointsJsx}

            {helpJsx}
            {quitPopup}
          </div>
        </div>
    )
  }
}

export default NectarNest;