import { useState } from 'react';
import SectionComponent from '../sectioncomponent/SectionComponent';

interface SectionComponentWrapperProps {
  data: {
    submenu: {
      name?: string;
      checked?: boolean;
      selectedOption?:string; 
      id?:string;
    }[];
  };
  title: string;
  type: 'checkbox' | 'radio';
  horizontal: boolean;
}

function SectionComponentWrapper({ data, title, type, horizontal }: SectionComponentWrapperProps) {
  const [sortByState, setSortByState] = useState([...data.submenu, { selectedOption: '', id:'' }]);

  return <SectionComponent setState={setSortByState} title={title} type={type} sortBy={sortByState} horizontal={horizontal} />;
}


export default SectionComponentWrapper;
