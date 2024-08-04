import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useRef, useState } from "react";

// 模拟一个延时加载的过程，用于演示
function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

// 异步加载的自动补全组件
export default function Asynchronous(value) {
  const [InputValue, setInputValue] = useState("");
  const [Player_name_list, set_Player_name_list] = useState([]);
    const [open, setOpen] = React.useState(false);


  // 标识是否正在加载选项数据,open为true时且options为空数组时，为true,其他情况全为false
  const loading = open && Player_name_list.length === 0;

  const onChangeHandler = function (value) {
    console.log("开始fetch");
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
            set_Player_name_list(data.data);
          }
        })
        .catch(() => {
          console.log("fetch error");
        });
    }
  };

  // 控制自动补全组件的打开状态
  // 存储选项数据
  const [options, setOptions] = React.useState([]);

  // 当加载状态发生变化时，根据加载状态更新选项数据
  React.useEffect(() => {
    console.log("loading", loading);
    let active = true;

    if (!loading) {
      return undefined;
    }

    // (async () => {
    //   //   await sleep(1e3); // 演示目的，模拟延时加载

    //   if (active) {
    //     setOptions([...topFilms]);
    //   }
    // })();

    else{
        if (InputValue.length >= 3) {
            onChangeHandler(InputValue);
        }
    }

    return () => {
      active = false;
    };
  }, [loading, InputValue]);

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
        console.log(newInputValue.length)
        if (newInputValue.length >= 3) {
          setInputValue(newInputValue);
        //   onChangeHandler(InputValue);
        }
      }}
      isOptionEqualToValue={(Player_name_list, value) =>
        Player_name_list.nickname === value.title
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
