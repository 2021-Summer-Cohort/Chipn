export const accountURL = "https://localhost:44336/api/Account/";
export const loginURL = "https://localhost:44336/api/Account/Login/";
export const gameURL = "https://localhost:44336/api/Game/";
export const accountGameURL = "https://localhost:44336/api/AccountGame/";



export function getAccount(accountId, callback)
{
   fetch(accountURL + accountId)
   .then(response => response.json())
   .then(data => {callback(data)});
}




// export function getAccount(accountId) {
//     return fetch(accountURL + accountId).then(function(response) {
//         return response.json();
//     }).then(function(json) {
//         return json;
//     });
// }

