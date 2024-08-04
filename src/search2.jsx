import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

count [selectedPlayer, set_selectedPlayer] = useState({ 'account_id': '', 'nickname': '' });
// 异步加载的自动补全组件
export default function Asynchronous(value) {
  const [InputValue, setInputValue] = useState("");
  const [Player_name_list, set_Player_name_list] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [final_player_info, set_final_player_info] = useState({ 'account_id': '', 'nickname': '' });
  const [fetchIsLoading, setFetchIsLoading] = useState(false);


  // 标识是否正在加载选项数据,open为true时且options为空数组时，为true,其他情况全为false
  const loading = open && fetchIsLoading;
  React.useEffect(() => {
    console.log("loading", loading);
  }, [loading]);

  const onChangeHandler = function (value) {
    console.log("开始fetch");
    setFetchIsLoading(true);
    const url = new URL("https://api.worldofwarships.asia/wows/account/list/");
    url.searchParams.append(
      "application_id",
      "0a5b831ff6f686e88871c43ffbf9df82"
    );
    url.searchParams.append("search", value);
    url.searchParams.append("limit", "10");

    if (value.length >= 3) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            console.log(data.data);
            set_Player_name_list(data.data);
            setFetchIsLoading(false);
          }
        })
        .catch((data) => {
          console.log("fetch error", data);
        });
    }
  };

  React.useEffect(() => {

    if (InputValue.length >= 3) {
      onChangeHandler(InputValue);
    }
    else {
      set_Player_name_list([])
    }

  }, [InputValue])

  React.useEffect(() => {
    console.log("final_player_info", final_player_info);
  }, [final_player_info]);

  // 当组件打开状态发生变化时，根据打开状态清空选项数据
  React.useEffect(() => {
    if (!open) {
      set_Player_name_list([]);
    }
  }, [open]);

  // 渲染异步加载的自动补全组件
  return (
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 200 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, value) => {
        set_final_player_info({ 'account_id': value.account_id, 'nickname': value.nickname })
      }}
      // noOptionsText={() => {
      //   return Player_name_list.length != 0 ? '没有找到该玩家' : '请输入至少3个字符'
      // }} 
      isOptionEqualToValue={(Player_name_list, value) => {
        return Player_name_list.nickname === value.nickname
      }

      }
      getOptionLabel={(Player_name_list) => Player_name_list.nickname}
      options={Player_name_list}
      loading={loading}
      autoHighlight={true}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Player_name"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {/* {params.InputProps.endAdornment} */}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}
