

const data = {};

export const register = ({streamId, observableId, name}) => {
  if (!data[streamId]) {
    data[streamId] = {}
  }

  if (!data[streamId][observableId]) {
    data[streamId][observableId] = {
      streamId,
      observableId,
      name,
      input: [],
      output: []
    }
  }
}

export const before = ({ streamId, observableId }) =>
  (val) => data[streamId][observableId].input.push(val)

export const after = ({ streamId, observableId }) =>
  (val) => data[streamId][observableId].output.push(val)

export const inspect = (streamId) => data[streamId]

export const error = () => {}

export const complete = () => {}
