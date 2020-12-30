import { Machine, assign, createMachine } from "xstate";

const useShapeState = Machine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        SUBMIT: 'loading',
      }
    },
    circle: {
      on: {
        
      }
    },
    square: {
      on: {
        
      }
    },
    rectangle: {
      on: {
        
      }
    },
    triangle: {
      on: {
        
      }
    },
    
    
  }

})


export { useShapeState }