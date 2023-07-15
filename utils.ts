import validator from "validator";

// parses the messageID out of any string
export function parseMessageID(input:string) : string | undefined {
    // console.debug(input)
    if(validator.isNumeric(input))
        return input;
    if(validator.isURL(input))
        return messageLinkToMessageID(input);
    return undefined;
}

// parses a discord message link to a message id
export function messageLinkToMessageID(link:string): undefined | string {
    // console.debug(link)
    //message_id is always last 
    const linkSplit = link.split("/");
    const id = linkSplit[linkSplit.length-1]
    // not a message id if not numeric
    if(!validator.isNumeric(id))
        return undefined;
    return id;
}