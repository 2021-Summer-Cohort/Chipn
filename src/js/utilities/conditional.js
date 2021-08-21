export function isDefined(varToPass)
{
    if(varToPass !== undefined)
        return true;
    return false;
}

export function isNotNull(varToPass)
{
    if(varToPass!==null&&varToPass!==undefined)
        return true;
    return false;
}

export function isNotEmpty(varToPass)
{
    if(varToPass!==null&&varToPass!==undefined&&varToPass!=="")
        return true;
    return false;
}
