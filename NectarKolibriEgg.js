import React, {PropTypes, Component} from "react"

class NectarKolibriEgg extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let {
        obstacle
        } = this.props;

    let style = {
      position: "absolute",
      top: obstacle.y,
      left: obstacle.x
    };

    if (obstacle.width) {
      style.fontSize = obstacle.width;
    }

    if (obstacle.rotateLeft) {
      style.msTransform = "rotate(-90deg)";
      /* IE 9 */
      style.WebkitTransform = "rotate(-90deg)";
      /* Chrome, Safari, Opera */
      style.transform = "rotate(-90deg)";
    }

    if (obstacle.turnLeft) {
      style.msTransform = "scaleX(-1)";
      style.WebkitTransform = "scaleX(-1)";
      style.transform = "scaleX(-1)";
    }

    if (obstacle.color) {
      style.color = obstacle.color;
    }

    if (obstacle.ionIconName) {
      return (
          <span style={style}>
            <i className={obstacle.ionIconName}/>
          </span>
      )
    }
    else {
      return (
          <span
              className={obstacle.className}
              style={style}/>

      )
    }
  }
}

NectarKolibriEgg.propTypes = {
  obstacle: PropTypes.object
};

export default NectarKolibriEgg;