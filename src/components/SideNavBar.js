import React, { useEffect } from "react";
import AddNewListForm from './AddNewListForm'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import styles from './SideNavBar.module.css';
import PropType from 'prop-types';
import { Link } from "react-router-dom";


SideNavBar.propTypes = {
    onAddList: PropType.func.isRequired,
    lists: PropType.array.isRequired
}

export default function SideNavBar (props) {

    const {onAddList, lists, setActiveList, isLoading, activeList} = props;

    const [open, setOpen] = React.useState(true);
    const [prevWindowWidth, setPrevWindowWidth] = React.useState(window.innerWidth);

    const toggleOpen = () => {
        setOpen(!open);
    }

    useEffect(()=> {
        
        const handleResize = () => {
            const curWindowWidth = window.innerWidth;
            if (prevWindowWidth >= 600 && window.innerWidth < 600) {
                setOpen(false);
            } else if (prevWindowWidth < 600 && window.innerWidth >= 600) {
                setOpen(true);
            }
            setPrevWindowWidth(curWindowWidth)
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [prevWindowWidth])

    return(
        <>
            <div className={open ? styles.sideNav : styles.sideNavClosed}>
                <button className={styles.menuBtn} onClick={toggleOpen}>
                    {open ? <KeyboardDoubleArrowLeftIcon/> : <KeyboardDoubleArrowRightIcon/>}
                </button>
                <div className={open ? styles.navComps : styles.navCompsClosed}>
                {isLoading ? (<p className="side--marg bold">Loading...</p>) :
                    <div>
                        {lists.map(item => {
                            return(<Link to={`/list/${item.id}`} key={item.id} className={styles.sideLists} onClick={()=>setActiveList(item.id, activeList)}>
                                <span className={styles.navItem}>{item.name}</span>
                            </Link>)
                        })}
                    </div>
                }
                    <AddNewListForm onAddList = {onAddList} />
                </div>
            </div>
        </>
    )
}