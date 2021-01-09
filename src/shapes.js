import { reactive, ref } from 'vue'

export const useShapes = (() => {
  let loading = ref(false)
  let shapeId = ref(0)
  const drawnShapes = reactive([])
    const defineShapes = reactive([
        { id: '1', name: 'Circle', dimension: 'Radius' },
        { id: '2', name: 'Square', dimension: 'Length'},
        { id: '3', name: 'Rectangle', dimension: ['Length', 'Height']},
        { id: '4', name: 'Triangle', dimension: 'Length'},

        /*** next version */
        // { id: '5', name: 'Pentagon' },
        // { id: '6', name: 'Hexagon' },
        // { id: '7', name: 'Heptagon' },
        // { id: '8', name: 'Octagon' },
        // { id: '9', name: 'Nonagon' },
        // { id: '10', name: 'Decagon' },
        // { id: '11', name: 'Cylinder' },
        // { id: '12', name: 'Cuboid' },
        // { id: '13', name: 'Cube' },
    ])

    const drawShape = async (selectedShape, length, height) => {
      console.log("selectedShape is "+ selectedShape)
      console.log(`Drawing ${selectedShape} with ${length}...`)
        loading.value = true
        if (selectedShape === 'Circle') {
          return drawCircle(length)
        } else if (selectedShape === 'Square') {
          console.log("SQUAREE")
          return drawSquare(length)
        } else if (selectedShape === 'Rectangle') {
          console.log("RECTANGLE")
          return drawRectangle(length, height)
        } else if (selectedShape === 'Triangle') {
          console.log("TRIANGLE")
          return drawTriangle()
        } else {
          return
        }
    }
    
    const drawCircle = ((radius) => {
      shapeId.value++
      let cy = parseInt(radius) + 10
      let dim = cy * 2
      const circle =
        { value:
            `<svg height="${dim}" width="${dim}">
              <circle cx="${cy}" cy="${cy}" r="${radius}" stroke="green" stroke-width="2" fill="none" />
            </svg>`,
          id: shapeId.value
        }
        drawnShapes.push(circle)
      console.log("SHAPE returned!! "+drawnShapes)
      return drawnShapes
    })

    const drawSquare = ((length) => {
      shapeId.value++
      let dim = parseInt(length) + 10
      const square =
        { value:
          `<svg height="${dim}" width="${dim}" class="flex justify-center items-center">
          <rect x="5" y="5" width="${length}" height="${length}" stroke="green" fill="none" stroke-width="2"/>
            </svg>`,
          id: shapeId.value
        }
        drawnShapes.push(square)
      console.log("SHAPE returned!! "+drawnShapes)
      return drawnShapes
    })

    const drawRectangle = ((length, height) => {
      shapeId.value++
      let dimX = parseInt(length) + 10
      let dimY = parseInt(height) + 10
      const rectangle =
        { value:
          `<svg height="${dimY}" width="${dimX}" class="flex justify-center items-center">
          <rect x="5" y="5" width="${length}" height="${height}" stroke="green" fill="none" stroke-width="2"/>
            </svg>`,
          id: shapeId.value
        }
        drawnShapes.push(rectangle)
      console.log("SHAPE returned!! "+drawnShapes)
      return drawnShapes
    })

    const drawTriangle = (() => {
      shapeId.value++
      const triangle =
        { value:
          `<svg width="120px" height="100px" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
          <polygon points="120,0 240,225 0,225" fill="none" stroke="green" stroke-width="5"/>
        </svg>`,
          id: shapeId.value
        }
        drawnShapes.push(triangle)
      console.log("SHAPE returned!! "+drawnShapes)
      return drawnShapes
    })

    
    return { 
      defineShapes, 
      drawShape, 
      drawCircle, 
      loading, 
      drawnShapes 
    }
  })
  
