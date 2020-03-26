import {B_FindBookImage, B_ResultFirstPage, B_UnFindBookImage, B_ResultFinalPage, B_ResultOtherPage} from "./blocks/Blocks"
export default({data}:any, {key}:any, {page}:any) => {
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
    //ブロックが20個以上あったときの処理
    const splitNum:number = 20
    if (blockKit.length>splitNum ){
        let pages = Math.floor(blockKit.length/splitNum)+1
        let postResult:any = []
        let i,j,temparray,chunk = splitNum;
        for (i=0,j=blockKit.length; i<j; i+=chunk) {
            temparray = blockKit.slice(i,i+chunk);
            postResult.push(temparray)
        }
        //1ページ目の時、次へボタンのみ表示
        if (page === 1){
            return B_ResultFirstPage({pages:pages},{postResult:postResult[0]})
        } else if (page === pages){
            //最終ページの時、戻るボタンのみ表示
            return B_ResultFinalPage({pages:pages},{page:page},{postResult:postResult[page-1]})
        } else {
            //それ以外の遷移処理
            return B_ResultOtherPage({pages:pages},{page:page},{postResult:postResult[page-1]})
        }
    }else {
        return blockKit
    }
}
