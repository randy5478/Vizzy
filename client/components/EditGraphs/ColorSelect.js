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
import FormControl from '@material-ui/core/FormControl';


const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit,
    '&:focus': {
      backgroundColor: theme.palette.secondary.light,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      }
    },
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary.light,
  },
  icon: {
    color: theme.palette.common.white
  }
});

const colors = ['Sunshine', 'Forest', 'Blue', 'Berry', 'Tomato']
const hexes = ['#FEE090', '#01665E', '#4575B4', '#C51B7D', '#D73027']
const highlights = ['Gold', 'Orchid', 'Sea Green', 'Light Blue', ]
const highHexes = ['#fee090', '#E9A3C9', '#5ab4ac', '#91BFDB']

// const colorIcons = [
//   <WbSunny className={styles.icon} color={styles.theme.palette.primary.contrastText} />,
//   <Nature />,
//   <WbCloudy />,
//   <LocalFlorist />,
//   <Lens />
// ]
// const highIcons = [
//   <Lens />,
//   <FilterVintage />,
//   <Waves />,
//   <CloudQueue />
// ]

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

    const colorIcons = [
      <WbSunny className={classes.icon} />,
      <Nature className={classes.icon}/>,
      <WbCloudy className={classes.icon}/>,
      <LocalFlorist className={classes.icon}/>,
      <Lens className={classes.icon} />
    ]

    const highIcons = [
      <Lens className={classes.icon}/>,
      <FilterVintage className={classes.icon}/>,
      <Waves className={classes.icon}/>,
      <CloudQueue className={classes.icon}/>
    ]

    let theseColors = this.props.name === 'Color' ? colors : highlights;
    let codes = this.props.name === 'Color' ? hexes : highHexes;
    let icons = this.props.name === 'Color' ? colorIcons : highIcons;
    return (
      <FormControl className={classes.formControl}>
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
              color={classes.chip.backgroundColor}
              value={colors[i]}
            />
          )}
        </div>
    </FormControl>
    )
  }
}

ColorSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ColorSelect)


