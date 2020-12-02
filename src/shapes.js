import { reactive } from 'vue'

export const useShapes = (() => {

    const defineShapes = reactive([
        { id: '1', name: 'Circle' },
        { id: '2', name: 'Square' },
        { id: '3', name: 'Traingle' },
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

    return { defineShapes }
})