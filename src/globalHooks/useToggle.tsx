import React, { useState } from 'react'

const useToggle = () => {
    const [drawerToggle, setDrawerToggle] = useState(false);

    const drawerStateClick = ()=>{
      setTimeout(()=>{ setDrawerToggle(!drawerToggle)}, 500)
      
    }
  
  return {drawerToggle, drawerStateClick, setDrawerToggle}
}

export default useToggle;