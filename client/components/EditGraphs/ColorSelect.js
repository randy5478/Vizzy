import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';
import LocalFlorist from '@material-ui/icons/LocalFlorist';
import WbSunny from '@material-ui/icons/WbSunny';
import WbCloudy from '@material-ui/icons/WbCloudy';
import Nature from '@material-ui/icons/Nature'
import FilterVintage from '@material-ui/icons/FilterVintage'
import Waves from '@material-ui/icons/Waves'
import Lens from '@material-ui/icons/Lens'
import CloudQueue from '@material-ui/icons/cloudQueue'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
  },
});

const colors = ['Sunshine', 'Forest', 'Blue', 'Berry', 'Tomato']
const hexes = ['#FEE090', '#01665E', '#4575B4', '#C51B7D', '#D73027']
const highlights = ['Orange', 'Orchid', 'Sea Green', 'Light Blue', ]
const highHexes = ['#fee090', '#E9A3C9', '#5ab4ac', '#91BFDB']
const colorIcons = [<WbSunny />, <Nature />, <WbCloudy />, <LocalFlorist />, <Lens />]
const highIcons = [<Lens />, <FilterVintage />, <Waves />, <CloudQueue />]

class ColorSelect extends React.Component {
  constructor() {
    super()
    this.state = {
      color: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, color) {
    this.props.changeStyle(color, this.props.name.toLowerCase())
    this.setState({
      color: color
    });
  };

  render() {
    const {classes} = this.props
    let theseColors = this.props.name === 'Color' ? colors : highlights;
    let codes = this.props.name === 'Color' ? hexes : highHexes;
    let icons = this.props.name === 'Color' ? colorIcons : highIcons;
    return (
        <div>
        <FormLabel>{this.props.name}</FormLabel>
        <div className={classes.root}>
          {theseColors.map((option, i) =>
            <Chip
              onClick={(e) => this.handleChange(e, codes[i])}
              icon={icons[i]}
              key={i}
              label={theseColors[i]}
              clickable
              className={classes.chip}
              color='primary'
              value={colors[i]}
            />
          )}
    </div>
    </div>
    )
  }
}

ColorSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ColorSelect)


