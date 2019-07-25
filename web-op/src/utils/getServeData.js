import request from "./request";

function obj2params(obj) {
  let result = "";
  let item;
  for (item in obj) {
    if ((obj[item] && String(obj[item])) || String(obj[item]) == "false") {
      result += `&${item}=${obj[item]}`;
    }
  }
  if (result) {
    result = result.slice(1);
  }
  return result;
}

export async function getServerByPost(url, data) {
  const resp = await request(url, {
    method: "POST",
    body: data
  });
  return resp;
}
export async function getServerByPut(url, data) {
  const resp = await request(url, {
    method: "PUT",
    body: data
  });
  return resp;
}
export async function getServerByGet(url, data) {
  let resp;
  if (obj2params(data)) {
    resp = await request(`${url}?${obj2params(data)}`,{
      method: "GET",
    });
  } else {
    resp = await request(url,{});
  }
  return resp;
}
export async function getServerBydelete(url, data) {
  const resp = await request(url, {
    method: "DELETE",
    body: data
  });
  return resp;
}
