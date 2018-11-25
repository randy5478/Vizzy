import React from 'react'
import PropTypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    width: 270,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleSelect extends React.Component {
  constructor() {
    super()
    this.state = {
      data: ''
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    if(event.target.value !== '0') {
      this.props.changeStyle(event.target.value, 'dataId')
    } else {
      this.props.changeStyle('0', 'dataId')
    }
    this.setState({
      data: event.target.value
    });
  };

  render() {
    const {classes} = this.props
    return (
      <FormControl className={classes.formControl}>
        <FormLabel className={classes.labels} >{this.props.name}</FormLabel>

        <Select
          onChange={(e) => this.handleChange(e)}
          displayEmpty
          value={this.state.data}
          className={classes.selectEmpty}>

          <MenuItem value="" />
          <MenuItem value='0'>Sample Data</MenuItem>

          {this.props.items.map((option) =>
            // if (
            //   this.state.selected !== 'Choose a dataset' &&
            //   !this.props.items.includes(this.state.selected)
            // ) {
            //   this.triggerRefresh()
            // }
              <MenuItem key={option.id} value={option.id} className={classes.menuItem}>
                {option.dataJSON.name}
              </MenuItem>
          )}
        </Select>
    </FormControl>
    )
  }
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimpleSelect)
