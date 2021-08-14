export function IsDefined(VarToPass)
{
   if(VarToPass!==undefined)
      return true;
   return false;
}
export function IsNotNull(VarToPass)
{
   if(VarToPass!==null&&VarToPass!==undefined)
      return true;
   return false;
}
export function IsNotEmpty(VarToPass)
{
   if(VarToPass!==null&&VarToPass!==undefined&&VarToPass!=="")
      return true;
   return false;
}