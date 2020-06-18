import compact from 'lodash.compact';
import pickBy from 'lodash.pickby';
import displayOrder from "../data/displayOrder.json"
import * as slides from '../data/slides/*.json';
const processData = () => {
  const data = [];
  displayOrder.data.map(e => {
    const id = e.collectionName;
    const pickedFromSlides = pickBy(
      slides,
      e => e.id.toUpperCase() === id.toUpperCase(),
    );
    const objectData = pickedFromSlides[Object.keys(pickedFromSlides)[0]];
    data.push(objectData);
  });
  console.log(compact(data))
  return compact(data);
};

export default processData;
