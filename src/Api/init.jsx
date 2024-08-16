const init = function () {
  console.log("开始init");
  
  // 确保异步操作被执行
  (async () => {
    try {
      const response = await fetch("https://api.wows-numbers.com/personal/rating/expected/json/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error("fetch error when init from api.wows-numbers.com", error);
    }
  })();
  
  console.log("结束init");
};

// 导出 init 函数以便外部调用
export default init;