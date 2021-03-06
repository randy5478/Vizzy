import React, { Component } from 'react'
import {
  VictoryPie,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel,
  VictoryLegend,
  VictoryChart,
  VictoryAxis
} from 'victory'
import history from '../../history'
import DeleteGraph from './DeleteGraph'
import { download } from '../../utils'
import Download from './Download'
import { conv1dWithBias } from '@tensorflow/tfjs-layers/dist/layers/convolutional'

const data = [
  { x: 'puppy', y: 4 },
  { x: 'cat', y: 2 },
  { x: 'birds', y: 3 },
  { x: 'fish', y: 2 },
  { x: 'frogs', y: 1 }
]

let colorOptions = {
  forest: ['#008f68', '#6DB65B', '#4AAE9B', '#EFBB35'],
  sunshine: ['tomato', 'orange', 'gold', '#f77'],
  sky: ['9FBBCC', '7A9CC6', '80CED7', '9AD1D4']
}

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
    }
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
})

export default class VictoryPieChart extends Component {
  render() {
    let downloadPNG = download.bind(this)
    let { data, x, y, pieColor, pieTransformation, pieLabel } = this.props

    //code to parse and aggregate data that can be consumed for Victory pie chart (i.e. {x:label, y:value})
    let filterData = []
    let dict = {}

    data.forEach(datum => {
      let label = datum[x].toString()
      let value = datum[y]
      filterData.push({ x: label, y: value })
    })

    filterData.forEach(obj => {
      let key = obj.x
      if (!dict[key]) dict[key] = obj.y
      else dict[key] += obj.y
    })

    let parsedData = Object.keys(dict).map(function (key) {
      return { x: key, y: dict[key] }
    })

    let totalValues = 0
    parsedData.forEach(datum => {
      totalValues += datum.y
    })

    //parsing data for legend
    let forLegend = []
    parsedData.forEach(datum => {
      let value = datum.x
      if (x === 'Month') {
        value = value.slice(0, 3)
      }
      forLegend.push({ name: value })
    })

    const date = new Date(this.props.createdAt).toDateString()
    return (
      <div id="container">
        <div className="date">
          {history.location.pathname === '/dashboard' ? (
            <div>{date}</div>
          ) : null}
        </div>

        <div id="chart">
          <VictoryChart
            // theme={VictoryTheme.material}
            style={{ parent: { maxWidth: '100%' } }}
            domainPadding={60}
            width={600}
            height={400}
            padding={{ left: 100, right: 25, top: 35, bottom: 75 }}
          >
            <VictoryLabel
              text={this.props.title}
              style={{
                fontSize: 20,
                textAnchor: 'middle',
                verticalAnchor: 'end',
                fill: '#455A64',
                fontFamily: 'inherit'
              }}
              x={325}
              y={24}
            />

            <VictoryPie
              labelComponent={
                <VictoryTooltip
                  flyoutStyle={{ fill: 'white', stroke: 'lightgrey' }}
                  cornerRadius={+this.props.tooltip}
                />
              }
              data={parsedData}
              labels={d =>
                `${this.props.x} ${d.x}: ${Math.round(
                  d.y / totalValues * 10000
                ) / 100}%`
              }
              // theme={VictoryTheme.material}
              // domainPadding={60}
              // width={600}
              // height={400}
              // padding={{ left: 100, right: 60, top: 35, bottom: 75 }}
              size={7}
              labelRadius={90}
              style={{
                labels: {
                  fill: 'black',
                  fontSize: 12,
                  maxWidth: '100%'
                }
                // parent: { maxWidth: '100%' }
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
              events={[
                {
                  target: 'data',
                  eventHandlers: {
                    onMouseOver: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => ({
                            style: { fill: this.props.highlight }
                          })
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: true })
                        }
                      ]
                    },
                    onMouseOut: () => {
                      return [
                        {
                          target: 'data',
                          mutation: () => { }
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: false })
                        }
                      ]
                    }
                  }
                }
              ]}
              colorScale={pieColor}
              innerRadius={pieTransformation === 'donut' ? 100 : 0}
              cornerRadius={pieTransformation === 'flower' ? 25 : 0}
              padAngle={pieTransformation === 'windmill' ? 10 : 0}
            />
            <VictoryLegend
              x={15}
              y={25}
              title={
                this.props.x.slice(0, 1).toUpperCase() + this.props.x.slice(1)
              }
              rowGutter={{ top: 0, bottom: -5 }}
              centerTitle
              orientation="vertical"
              gutter={20}
              style={{
                border: { stroke: 'black' },
                title: { fontSize: 12 },
                zIndex: 2
              }}
              data={forLegend}
              colorScale={pieColor}
            />
            <VictoryAxis
              style={{
                axis: { stroke: 'none' }
              }}
              tickFormat={() => ''}
            />
          </VictoryChart>
          {history.location.pathname === '/dashboard' ? (
            <div>
              <Download
                downloadPNG={downloadPNG}
                title={this.props.title}
                graphId={this.props.graphId}
              />
              <DeleteGraph
                graphId={this.props.graphId}
                delete={this.props.delete}
              />
            </div>
          ) : null}
        </div>
      </div>
    )
  }
}
