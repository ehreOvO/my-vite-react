import React from 'react';
import Use_Api from './Api/Use_Api';
import Api_links from './Api/Api_links';
import { useContext } from 'react';
import { Player_id_globle } from "./contents/content";


export default function Wws_me() {

  function Player_name() {

    const [Player_base_data, setPlayer_base_data] = React.useState({});
    const [last_battle_time, setLast_battle_time] = React.useState('未获取的值last_battle_time');
    const [nickname, setNickname] = React.useState('未获取的值nickname');
    const [player_damage, setPlayer_damage] = React.useState('未获取的值player_damage');
    const [player_win_rate, setPlayer_win_rate] = React.useState('未获取的值player_win_rate');
    const [player_battles, setPlayers_battles] = React.useState('未获取的值player_battles');

    const account_id = useContext(Player_id_globle);
    console.log('wwsme---account_id11:', account_id);

    // React.useEffect(() => {
// 不能监控account_id需要改

    const fetchdata = async (account_id) => {
      const result = await Use_Api('asia', Api_links.PATH_ADDRESS.Account.Player_personal_data, {
        account_id: account_id,
        fields: `account_id,created_at,last_battle_time,nickname,statistics.pvp.battles,statistics.pvp.damage_dealt,statistics.pvp.wins`
      })
      console.log('------result:', result[account_id])
      if (result.status === "ok") {
        setPlayer_base_data(result['data'][account_id]);
      }
    }

    fetchdata();

    // }, [account_id])

    React.useEffect(() => {
      if (!Player_base_data.nickname) return;
      console.log('Player_base_data changed:', Player_base_data)

      setNickname(Player_base_data.nickname)
      setLast_battle_time(Player_base_data.last_battle_time)

      const statistics = Player_base_data.statistics
      setPlayers_battles(statistics.pvp.battles)
      setPlayer_damage(Math.floor(statistics.pvp.damage_dealt / statistics.pvp.battles))
      setPlayer_win_rate(Math.floor(statistics.pvp.wins / statistics.pvp.battles * 100) + '%')
    }, [Player_base_data])



    return (
      <>
        <div>
          {typeof (Player_base_data)}
        </div>
        <div>
          {nickname}
        </div>
        <div>
          {account_id}
        </div>
        <div>
          {last_battle_time}
        </div>
        <div>
          {player_damage}
        </div>
        <div>
          {player_battles}
        </div>
        <div>
          {player_win_rate}
        </div>
        <div>
          EOF
        </div>
      </>

    );
  }

  function Player_base() {
    return (
      <div>
        Player_base
      </div>
    );
  }

  function Ship_type_data() {
    return (
      <div>
        Ship_type_data
      </div>
    );
  }

  function Battle_type_data() {
    return (
      <div>
        Battle_type_data
      </div>
    );
  }

  function Highest_score() {
    return (
      <div>
        Highest_score
      </div>
    );
  }

  function Graph_data() {
    return (
      <div>
        Graph_data
      </div>
    );
  }


  return (
    <div>
      <Player_name />
      {/* <Player_base />
      <Ship_type_data />
      <Battle_type_data />
      <Highest_score />
      <Graph_data /> */}
    </div>
  );
}