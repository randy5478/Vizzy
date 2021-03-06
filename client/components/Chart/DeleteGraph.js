import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deletingGraph} from '../../store/graph'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    vertical: 'bottom',
    horizontal: 'center'
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  delete: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  }
})

class DeleteGraph extends Component {
  render() {
    const {classes} = this.props

    return (
      <div id="container">
        <main className={classes.main}>
          <CssBaseline />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="secondary"
            className={classes.submit}
            onClick={() => {
              this.props.deletingGraph(this.props.graphId)
              // this.props.delete()
            }}
          >
            Delete <DeleteIcon className={classes.delete} />
          </Button>
        </main>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  graphs: state.graph
})

const mapDispatchToProps = dispatch => ({
  deletingGraph: id => dispatch(deletingGraph(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withStyles(styles)(DeleteGraph)
)

/**
 * PROP TYPES
 */
DeleteGraph.propTypes = {
  classes: PropTypes.object.isRequired
}
