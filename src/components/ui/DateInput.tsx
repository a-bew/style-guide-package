import { useState, useEffect, useRef, memo, type RefObject } from "react";
import "./customcalendar.scss";
import DetectOutsideClick from '@/components/ui/wrappers/DetectOutsideClick';
import { padDigit } from '@/utils/functions';
import useCurentTheme from "@/globalHooks/useCurentThem";
import useDropdownPosition from "@/components/ui/wrappers/useDropdownPosition";

interface CustomCalendarProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
  isActive?: boolean;
}

export const CustomCalendar = memo(({ selectedDate, onChange, isActive = true }: CustomCalendarProps)=> {
  const [month, setMonth] = useState(selectedDate.getMonth());
  const [year, setYear] = useState(selectedDate.getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  function handlePreviousMonth() {
    setMonth((prevMonth) => prevMonth - 1);
    if (month === 0) {
      setYear((prevYear) => prevYear);
    }
  }

  function handleNextMonth() {
    setMonth((prevMonth) => prevMonth + 1);
    if (month === 11) {
      setYear((prevYear) => prevYear);
    }
  }

  function handleDateClick(day: number) {
    const newDate = new Date(year, month, day+1);
    onChange(newDate);
  }
  
  const { color } = useCurentTheme();

  return (
    <div className="custom-calendar">
      <div className="header">
        <button onClick={handlePreviousMonth}>&lt;</button>
        <h2 className={"month"}>{`${new Date(year, month).toLocaleDateString("default", {
          month: "long",
          year: "numeric",
        })}`}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="weekdays">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="days">
        {
          [...Array(firstDayOfMonth).fill(null), ...Array(daysInMonth)]?.map((_, index) => {
              const day = index - firstDayOfMonth + 1;
              const empty = day === 0 || day < 0;

              const isSelected = selectedDate.getDate() === (day) && selectedDate.getMonth() === month;
              return (
                        <div
                          key={index}
                          className={`day${isSelected ? " selected" : ""}`}
                          onClick={()=> empty?{}: handleDateClick(day)}
                          style={{ background: isSelected?(isActive? color: '#e2dfdf'): "", color: isSelected?(isActive? '#fff': color): ""}}
                        >
                          {empty? '': padDigit(day)}
                        </div>
                      )
          })

        }
      </div>
    </div>
  );
})

interface DateInputProps {
  name: string;
  value: string;
  onChange: ({name, value}: {name: string, value: string}) => void;
  className?: string;
}

const DateInput = ({name, value, onChange, className }: DateInputProps) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const selectedDate = new Date(value);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    onChange({name, value: event.target.value});
  }

  function handleInputClick() {
    setShowCalendar(true);
  }

  function handleCalendarChange(date: Date) {
    // onChange(date.toISOString().substr(0, 10));
    // setShowCalendar(false);
    const dateString = date.toISOString().substr(0, 10);
    // onChange(dateString);
    onChange({name, value: dateString});

    setShowCalendar(false);

  }

  const handleClick = (event: any) => {
      if (event.target.className === 'calendar-overlay') {
        setShowCalendar(false);
      }
  };

  const ref:any = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showCalendar) {
        document.addEventListener('click', handleClick);
    } else {
        document.removeEventListener('click', handleClick);
    }
    return () => {
        document.removeEventListener('click', handleClick);
    };

  }, [showCalendar]);

  const { dropdownRef, positionStyles:updatePositionStyles } = useDropdownPosition(ref, showCalendar);


  return (
      <div className={"date-input parent"}>
          <input 
            ref={ref}
            value={value} onChange={handleInputChange} onClick={handleInputClick} className = {className} style={{width:'100%'}}  
          />
          {showCalendar && (
            <div className="calendar-overlay" 
              ref = {dropdownRef}
              style={{...updatePositionStyles}}
            >
               <DetectOutsideClick setToggleMenu={setShowCalendar} toggleMenu = {showCalendar}  style={{display: 'inline-block'}}>
                <CustomCalendar selectedDate={selectedDate} onChange={handleCalendarChange}  />
              </DetectOutsideClick>

            </div>
          )}
      </div>
  );
}


export default memo(DateInput);