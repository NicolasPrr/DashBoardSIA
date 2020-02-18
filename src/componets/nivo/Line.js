import { ResponsiveLine } from '@nivo/line'
import React from 'react'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = () => (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle'
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)
export default MyResponsiveLine
const data = [
    {
      "id": "japan",
      "color": "hsl(4, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 229
        },
        {
          "x": "helicopter",
          "y": 252
        },
        {
          "x": "boat",
          "y": 136
        },
        {
          "x": "train",
          "y": 262
        },
        {
          "x": "subway",
          "y": 60
        },
        {
          "x": "bus",
          "y": 15
        },
        {
          "x": "car",
          "y": 165
        },
        {
          "x": "moto",
          "y": 299
        },
        {
          "x": "bicycle",
          "y": 258
        },
        {
          "x": "horse",
          "y": 37
        },
        {
          "x": "skateboard",
          "y": 258
        },
        {
          "x": "others",
          "y": 203
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(285, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 229
        },
        {
          "x": "helicopter",
          "y": 127
        },
        {
          "x": "boat",
          "y": 142
        },
        {
          "x": "train",
          "y": 196
        },
        {
          "x": "subway",
          "y": 191
        },
        {
          "x": "bus",
          "y": 249
        },
        {
          "x": "car",
          "y": 266
        },
        {
          "x": "moto",
          "y": 31
        },
        {
          "x": "bicycle",
          "y": 51
        },
        {
          "x": "horse",
          "y": 283
        },
        {
          "x": "skateboard",
          "y": 296
        },
        {
          "x": "others",
          "y": 271
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(341, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 241
        },
        {
          "x": "helicopter",
          "y": 249
        },
        {
          "x": "boat",
          "y": 158
        },
        {
          "x": "train",
          "y": 145
        },
        {
          "x": "subway",
          "y": 81
        },
        {
          "x": "bus",
          "y": 94
        },
        {
          "x": "car",
          "y": 132
        },
        {
          "x": "moto",
          "y": 279
        },
        {
          "x": "bicycle",
          "y": 182
        },
        {
          "x": "horse",
          "y": 81
        },
        {
          "x": "skateboard",
          "y": 207
        },
        {
          "x": "others",
          "y": 169
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(324, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 108
        },
        {
          "x": "helicopter",
          "y": 69
        },
        {
          "x": "boat",
          "y": 33
        },
        {
          "x": "train",
          "y": 144
        },
        {
          "x": "subway",
          "y": 205
        },
        {
          "x": "bus",
          "y": 11
        },
        {
          "x": "car",
          "y": 28
        },
        {
          "x": "moto",
          "y": 285
        },
        {
          "x": "bicycle",
          "y": 250
        },
        {
          "x": "horse",
          "y": 194
        },
        {
          "x": "skateboard",
          "y": 80
        },
        {
          "x": "others",
          "y": 131
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(310, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 74
        },
        {
          "x": "helicopter",
          "y": 268
        },
        {
          "x": "boat",
          "y": 225
        },
        {
          "x": "train",
          "y": 234
        },
        {
          "x": "subway",
          "y": 153
        },
        {
          "x": "bus",
          "y": 38
        },
        {
          "x": "car",
          "y": 15
        },
        {
          "x": "moto",
          "y": 49
        },
        {
          "x": "bicycle",
          "y": 133
        },
        {
          "x": "horse",
          "y": 224
        },
        {
          "x": "skateboard",
          "y": 191
        },
        {
          "x": "others",
          "y": 35
        }
      ]
    }
  ]