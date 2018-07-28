export const addDataPoint = (data, toAdd) => {
  if (!toAdd) {
  	return false;
  }
  const newData = data.slice(0); // shallow copy so React can detect change in data
  newData.push(toAdd);
  return newData;
};