export const accountURL = "https://localhost:44336/api/Account/";
export const loginURL = "https://localhost:44336/api/Account/Login/";
export const gameURL = "https://localhost:44336/api/Game/";
export const accountGameURL = "https://localhost:44336/api/AccountGame/";

import {getCookie} from "./cookie";
import {isDefined,isNotEmpty} from "./conditional";


export function getAccount(accountId, callback)
{
    fetch(accountURL + accountId)
    .then(response => response.json())
    .then(data => {callback(data)});
}


// SetChipCount(700);  Overwrites
// ModifyChipCount(-30);  Adds
// UpdateStuff({Email:"email@email",ChipCount:30});

export function setChipCount(newChipCount) // Sets a static value to overwrite existing chip count
{
    let accountId = getCookie("UserId");
    if(isNotEmpty(accountId))
    {
        var RequestBody=null;
        fetch(accountURL+accountId).then(r=>r.json()).then(d=>{
          RequestBody={
            Id:accountId,
            age:d.age,
            chipCount:newChipCount,
            email:d.email,
            password:d.password,
            userName:d.userName
         };
         fetch(accountURL + accountId, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(RequestBody)
         }).then(response => response.text()).then(data => {
            fetch(accountURL + accountId).then(response => response.json()).then(data => {
               console.log(data);
            });
         });
      });
   }
   else
   {

   }
}

export function modifyChipCount(ChipsToChange) // Can be positive or negative
{
   let accountId = getCookie("UserId");
   if(isNotEmpty(accountId))
   {
      var RequestBody=null;
      fetch(accountURL+accountId).then(r=>r.json()).then(d=>{
         RequestBody={
            Id:accountId,
            age:d.age,
            chipCount:d.chipCount+ChipsToChange,
            email:d.email,
            password:d.password,
            userName:d.userName
         };
         fetch(accountURL + accountId, {
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(RequestBody)
         }).then(response => response.text()).then(data => {
            fetch(accountURL + accountId).then(response => response.json()).then(data => {
               console.log(data);
            });
         });
      });
   }
   else
   {

   }
}

export function updateStuff(NewRequestBody)
{
   let accountId = getCookie("UserId");
   if(isNotEmpty(accountId))
   {
      var RequestBody=null;
      fetch(accountURL+accountId).then(r=>r.json()).then(d=>{
         RequestBody={
            Id:((isDefined(NewRequestBody.AccountId))?NewRequestBody.AccountId:accountId),
            age:((isDefined(NewRequestBody.Age))?NewRequestBody.Age:d.age),
            chipCount:((isDefined(NewRequestBody.ChipCount))?NewRequestBody.ChipCount:d.chipCount),
            email:((isDefined(NewRequestBody.Email))?NewRequestBody.Email:d.email), //email@email
            password:((isDefined(NewRequestBody.Password))?NewRequestBody.Password:d.password),
            userName:((isDefined(NewRequestBody.UserName))?NewRequestBody.UserName:d.userName)
         };
         fetch(accountURL + accountId,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(RequestBody)
         }).then(response => response.text()).then(data => {
            fetch(accountURL + accountId).then(response => response.json()).then(data => {
               console.log(data);
            });
         });
      });
   }
   else
   {


   }
}
