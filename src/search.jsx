import React, { Fragment, useEffect, useRef, useState, useCallback } from 'react';
import './search.css';


function Search() {
    const player_name_input = useRef(null);
    const player_server = useRef('asia');
    const [search_bar, setSearch_bar] = useState(false);
    const [search_bar_value, setSearch_bar_value] = useState(<li></li>)
    const [player, setplayer] = useState(null);

    const [Player_name_list, set_Player_name_list] = useState([])


    function onFocusHandler() {
        setSearch_bar(true)
        // 显示联想框     
    }

    function onBlurHandler() {
        setSearch_bar(false)
        // 隐藏联想框     

    }


    function onChangeHandler() {
        const url = new URL('https://api.worldofwarships.asia/wows/account/list/');
        url.searchParams.append('application_id', '0a5b831ff6f686e88871c43ffbf9df82');
        url.searchParams.append('search', player_name_input.current.value);
        url.searchParams.append('limit', '10')

        if (player_name_input.current.value.length >= 3) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    set_Player_name_list(data.data)
                })
                .catch(data => {console.log(data);})
        }

    }

    // function select_player(e) {
    //     console.log("i=" + e)
    //     setplayer(e)
    //     // console.log(player)

    // }
    const select_player = useCallback((account_id) => {
        return () => {
            setplayer(account_id);
            console.log('Selected player:', account_id);
            setSearch_bar(false)

        };
    }, []);

    useEffect(() => {
        setSearch_bar_value(
            () => {
                return Player_name_list.map(item =>
                (<li key={item.account_id} className='searchBarList'>
                    <button className='searchBarButton' onClick={select_player(item.account_id)} type='button'>{item.nickname}</button>
                    <span>{item.account_id}</span>
                </li>)
                );
            }
        );

    }, [Player_name_list, select_player]); // 添加 select_player 到依赖数组中



    useEffect(() => {
        console.log('player is ' + player)
    }, [player])

    return (
        <Fragment>
            <input type="text" name="search" placeholder="Search..."
                ref={player_name_input}
                onFocus={(e) => onFocusHandler(e.target.value)}
                onChange={onChangeHandler}
            />
            <select id="servers" name="fruits">
                <option value="asia">亚服</option>
                <option value="eu">欧服</option>
                <option value="na">美服</option>
            </select>
            <div style={{ display: search_bar ? "block" : "none" }}>
                {search_bar_value}
            </div>
        </Fragment>
    )
}


export default Search