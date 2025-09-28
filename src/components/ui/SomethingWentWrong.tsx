import {  Fragment, type MouseEventHandler, type ReactNode } from 'react';
import useCurentTheme from'@/globalHooks/useCurentThem';
import s from './somethingwentwrong.module.scss';
import g from '@/globalStyles/globalStyles.module.scss';

interface Props {
    onClick: MouseEventHandler<HTMLButtonElement>;
    text?: string;
}

const Layout = ({children}: {children?: ReactNode}) =>{
    return <Fragment>
        {children}
    </Fragment>
}

const SomethingWentWrong = ({onClick, text =  'Some went wrong'}: Props)=>{
    const { color } = useCurentTheme();

    return (<Layout>
        <div className={s.container} style = {{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <p>{text}</p>
            <button className={g['medium-button']} onClick={onClick} style = {{ background: color }}>Go Back</button>
        </div>
    </Layout>)
}

export default SomethingWentWrong;