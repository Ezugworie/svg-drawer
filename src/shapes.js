import { reactive, ref } from 'vue'

export const useShapes = (() => {
  let loading = ref(false)
  let shapeId = ref(0)
  const drawnShapes = reactive([])
    const defineShapes = reactive([
        { id: '1', name: 'Circle' },
        { id: '2', name: 'Square' },
        { id: '3', name: 'Triangle' },
        { id: '4', name: 'Rectangle' },
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

    const drawShape = ((selectedShape, length, id) => {
      console.log("selectedShape is "+ selectedShape.value)
      console.log(`Drawing ${selectedShape.value} with ${length}...`)
        loading.value = true
        if (selectedShape.value === 'Circle') {
          return drawCircle(length)
        } else if (selectedShape === 'Square') {
          // drawSqaure(length)
        } else {
          return
        }
    })
    
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
    
    return { 
      defineShapes, 
      drawShape, 
      drawCircle, 
      loading, 
      drawnShapes 
    }
  })
  
