import { useState, useMemo } from 'react';
import POPULATION_DATA from '../data/nepal-population.json';

export function usePopulation() {
 
  const [data] = useState(POPULATION_DATA);


  const totalNationalPopulation = useMemo(() => {
    return data.reduce((sum, item) => sum + item.population, 0);
  }, [data]);

 
  const averageLiteracyRate = useMemo(() => {
    if (data.length === 0) return 0;
    const combined = data.reduce((sum, item) => sum + item.literacy, 0);
    return (combined / data.length).toFixed(1);
  }, [data]);

 
  return { data, totalNationalPopulation, averageLiteracyRate, isLoading: false };
}