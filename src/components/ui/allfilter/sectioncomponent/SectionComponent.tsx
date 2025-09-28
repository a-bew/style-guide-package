import { Fragment } from 'react';
import uuid from 'react-uuid';

import s from '../allfilterbox.module.scss'
import g from '@/globalStyles/globalStyles.module.scss';

import CheckBoxRadio from '../checkbox/CheckBoxRadio';

interface SectionComponentProps {
  setState: (sortByy: any) => void;
  title?: string;
  type: 'checkbox' | 'radio';
  sortBy: {
    name?: string;
    checked?: boolean;
    selectedOption?:string;
  }[];
  horizontal: boolean;
}

function SectionComponent({setState, title, type, sortBy, horizontal}:SectionComponentProps) {

  const handleIsChecked = (e:any, position:any) => {

    e.preventDefault();

    const sortByy = sortBy?.map((element:any, index:any) => { if (e?.target.value === sortBy[index].name) {
        return {...sortBy[index], checked: !sortBy[index].checked}
      }
      return element;
    });

    setState(sortByy);

  };


  const handleIsRadio = (e:any, position:any) => {

    e.preventDefault();

    const sortByy:any = [...sortBy?.map((element:any, index:any) => {
        return {...sortBy[index], checked: e?.target.value === sortBy[index].name}
    })];

    sortByy[sortByy.length - 1].selectedOption = sortByy[position].name;
    sortByy[sortByy.length - 1].id = sortByy[position].id;
      
    setState(sortByy);

  };


  const columnsNum = 2;
  const lenghtOfList = sortBy.length-1; // 1 is an extra option -> {selectedOption: ""}
  const lastIndex = lenghtOfList - 1;
  const floorTotal = Math.floor(lenghtOfList / columnsNum) * columnsNum;
  const data = sortBy.slice(0, lenghtOfList);

return (
    <div className={s['box-vertical']}>
       {horizontal && <div className={s['horizontal-line']}></div>}

        {title && <div className={s['box-horizontal']}>
                    <div className={` ${g.title}`}>{title}</div>
                </div>}

        {
        data
          ?.slice(0, data.length)
          ?.map((item:any, index:any)=>{
            
                      // Check if this is the last order and there is a remainder when dividing the length of the list by the number of columns
          if (lastIndex === index && (lenghtOfList % columnsNum) > 0) {

            return (<div key = {uuid()} className={`${s['box-horizontal']} ${s['flex-row']}`}>
                {data.slice(floorTotal, lenghtOfList)?.map(({name, checked}:any, index2:any) => (
                  <div key = {uuid()}
                  className={`${s.col} ${type === 'checkbox'? s.checkbox : s.radiobutton}`}>
                    {<CheckBoxRadio 
                      name = { name } 
                      handleIsChecked = {(e:any)=>type === 'checkbox' ? handleIsChecked(e, index): handleIsRadio(e, index)} 
                      isChecked = {checked} 
                      type = {type} 
                    />}
                </div>
                ))}
              </div>
            );

          }

            // % represent reminder

            if ((index + 1) % columnsNum === 0) {
              return (
                <div  key = {uuid()} className={`${s['box-horizontal']} ${s['flex-row']}`}>
                    {data.slice(index - (columnsNum - 1), index + 1)?.map(({name, checked}:any, index2:any) => (
                        <Fragment key={uuid()}>
                          <CheckBoxRadio 
                            name = { name } 
                            handleIsChecked = {(e:any)=>type === 'checkbox' ? handleIsChecked(e, index): handleIsRadio(e, index)} 
                            isChecked = {checked} 
                            type = {type} 
                          />
                    </Fragment>
                    ))}
              </div>

              )
            }

            })
        }

    </div>
  )
}

export default SectionComponent