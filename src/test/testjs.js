const init = async function () {
  console.log("开始init");
  () => {
    fetch("https://api.wows-numbers.com/personal/rating/expected/json/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((data) => {
        console.log("fetch error when init from api.wows-numbers.com", data);
      });
  };
  console.log("结束init");
}

let aaa = await init(); 
console.log('231'+aaa);
