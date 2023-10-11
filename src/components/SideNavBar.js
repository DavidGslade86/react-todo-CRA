import React, { useEffect } from "react";
import AddNewListForm from './AddNewListForm'
import CustomContextMenu from "./CustomContextMenu";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import styles from './SideNavBar.module.css';
import PropType from 'prop-types';
import { Link } from "react-router-dom";

SideNavBar.propTypes = {
    onAddList: PropType.func.isRequired,
    setActiveList: PropType.func.isRequired,
    setIsLoading: PropType.func.isRequired,
    updateLists: PropType.func.isRequired,
    activeList: PropType.object.isRequired,
    lists: PropType.array.isRequired
}

export default function SideNavBar (props) {

    const {onAddList, lists, setActiveList, isLoading, activeList, updateLists, setIsLoading} = props;

    const [open, setOpen] = React.useState(true);
    const [prevWindowWidth, setPrevWindowWidth] = React.useState(window.innerWidth);
    const [contextPosition, setContextPosition] = React.useState({ key: null, x: null, y: null});

    const handleRightClick = (key, e) => {
        e.preventDefault();
    
        // Check if the clicked key matches the currently opened menu's key
        if (contextPosition.key === key) {
            // If it matches, close the menu
            setContextPosition({ key: null, x: null, y: null });
        } else {
            // If not, open the context menu at the current cursor position for the provided key
            setContextPosition({ key: key, x: e.pageX, y: e.pageY });
        }
    };
    
    const closeMenu = () => {
        setContextPosition({ key: null, x: null, y: null });
    };

    const toggleOpen = () => {
        setOpen(!open);
    }

    useEffect(() => {
        // listens for user 'click' to document
        document.addEventListener('click', closeMenu);
        // Cleanup
        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, []);

    useEffect(()=> {
        
        const handleResize = () => {
            const curWindowWidth = window.innerWidth;
            if (prevWindowWidth >= 940 && window.innerWidth < 940) {
                setOpen(false);
            } else if (prevWindowWidth < 940 && window.innerWidth >= 940) {
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

    const updateTables = async (tableId, updateKey, updateInfo) => {
    
        const updatedTodoData = {
            [updateKey]: updateInfo
        };
    
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
            },
            body: JSON.stringify(updatedTodoData)
        };
    
        const url = `https://api.airtable.com/v0/meta/bases/${process.env.REACT_APP_AIRTABLE_BASE_ID}/tables/${tableId}`;
        
        try {
            const response = await fetch(url, options);
    
            if (!response.ok) {
                const message = `Error has occurred: ${response.status}`;
                throw new Error(message);
            }

            const data = await response.json();
            // make updated list variable based on API call
            const updatedLists = lists.map(list => {
                if (list.id === tableId) {
                    return { ...list, [updateKey]: data.updateKey };
                }
                return list;
            });
        
            updateLists(updatedLists);
        
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleDelete = async (tableId, updateKey, updateInfo) => {
    
        try {
            await updateTables(tableId, updateKey, updateInfo);
            const updatedLists = lists.filter(table => table.id !== tableId);
    
            if (activeList.id === tableId && updatedLists.length > 0) {
                setActiveList(updatedLists[0].id, activeList, false); 
            } 
    
            updateLists(updatedLists);
    
            console.log(`Delete list with id ${tableId}`);
        } catch (error) {
            console.error("Error while updating the tables:", error);
        } finally {
            setIsLoading(false);
            closeMenu();
        }
    };

    return(
        <>
            <div className={open ? styles.sideNav : styles.sideNavClosed}>
                <button className={styles.menuBtn} onClick={toggleOpen}>
                    {open ? <KeyboardDoubleArrowLeftIcon/> : <KeyboardDoubleArrowRightIcon/>}
                </button>
                <div className={open ? styles.navComps : styles.navCompsClosed}>
                {isLoading ? (<p className="side--marg bold">Loading...</p>) :
                    <div>
                        {lists
                            .filter(item => item.description !== "deleted")
                            .map(item => (
                                <Link 
                                    to={`/list/${item.id}`} 
                                    key={item.id} 
                                    className={styles.sideLists} 
                                    onClick={()=>setActiveList(item.id, activeList)}
                                    onContextMenu={(e) => handleRightClick(item.id, e)}
                                >
                                    <span className={styles.navItem}>{item.name}</span>
                                    {contextPosition.key === item.id && (
                                        <CustomContextMenu 
                                            style={{ left: contextPosition.x, top: contextPosition.y }}
                                            onDelete={handleDelete}
                                            listId={item.id}    
                                        />
                                    )}
                                </Link>
                            ))
                        }
                    </div>
                }
                    <AddNewListForm onAddList = {onAddList} />
                </div>
            </div>
        </>
    )
}