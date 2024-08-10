import Api_links from "./Api_links"

const Use_Api = async function (servers, pathname, params) {
    const address = Api_links.url_address[servers]

    const url = new URL(address)

    url.pathname = pathname
    url.searchParams.append("application_id", Api_links.application_id)
    if (params.search) { url.searchParams.append("search", params.search) }
    if (params.fields) { url.searchParams.append("fields", params.fields) }
    if (params.language) { url.searchParams.append("language", params.language) }
    if (params.limit) { url.searchParams.append("limit", params.limit) }
    if (params.type) { url.searchParams.append("type", params.type) }
    if (params.account_id) { url.searchParams.append("account_id", params.account_id) }
    if (params.access_token) { url.searchParams.append("access_token", params.access_token) }
    if (params.extra) { url.searchParams.append("extra", params.extra) }
    if (params.dates) { url.searchParams.append("dates", params.dates) }
    if (params.limit) { url.searchParams.append("limit", params.limit) }
    if (params.nation) { url.searchParams.append("nation", params.nation) }
    if (params.page_no) { url.searchParams.append("page_no", params.page_no) }
    if (params.ship_id) { url.searchParams.append("ship_id", params.ship_id) }
    if (params.in_garage) { url.searchParams.append("in_garage", params.in_garage) }
    if (params.season_id) { url.searchParams.append("season_id", params.season_id) }

    console.log('---请求的url是：', url.href)


    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "ok") {
        return data.data;
    } else {
        throw new Error(`API returned an error: ${data.message || 'Unknown error'}`);
    }
    // return url.href
}

export default Use_Api