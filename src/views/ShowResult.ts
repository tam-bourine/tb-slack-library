import { B_FindBookImage, B_UnFindBookImage, B_ResultFirstPage, B_NoOtherPage} from "./blocks/Blocks"
export default({data}:any) => {
    let blockKit:Array<any> = []
    for(let i in data){
        if (data[i].image){
            //画像があった時
            B_FindBookImage({i:i},{name:data[i].name},{place:data[i].place},{image:data[i].image},{blockKit:blockKit})
        }else{
            //画像がない時
            B_UnFindBookImage({i:i},{name:data[i].name},{place:data[i].place},{blockKit:blockKit})
        }
    }
    //ブロック数が20個を超えていたときの処理
    const splitNum:number = 20
    if (blockKit.length>splitNum ){
        let pages = Math.floor(blockKit.length/splitNum)+1
        let postResult:any = []
        let i,j,temparray,chunk = splitNum;
        for (i=0,j=blockKit.length; i<j; i+=chunk) {
            temparray = blockKit.slice(i,i+chunk);
            postResult.push(temparray)
        }
        return B_ResultFirstPage({pages:pages},{postResult:postResult[0]})
    }else {
        return B_NoOtherPage({blockKit:blockKit})
    }
}
