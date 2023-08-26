import React, { useEffect } from "react";
import AddNewListForm from './AddNewListForm'
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import styles from './NavBar.module.css';


export default function SideNavBar (props) {

    const {onAddTodo} = props;

    const tasks = [
        {
            id:1,
            title: "My Todo List"
        },
        {
            id:2,
            title: "Home"
        },
        {
            id:3,
            title: "Misc"
        }

    ]

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
                    {tasks.map(item => {
                        return(<div key={item.id} className={styles.sideLists}>
                            <span className={styles.navItem}>{item.title}</span>
                        </div>)
                    })}
                    <AddNewListForm onAddTodo = {onAddTodo} />
                </div>
            </div>
        </>
    )
}