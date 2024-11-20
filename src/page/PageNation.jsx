import React from 'react'

function PageNation({onPageHandler, nowPage, totalPage, onNumberGroupHandler}) {
    const onPageNumHandler = (param) => { // 부모에서 전달받은 props(함수형태)에다가 클릭핸들러함수의 파라미터를 props로 전달받은 콜백함수의 인자로 전달
// console.log(`param = ${param}`);
        onPageHandler(param)        
    }  

    // 페이징그룹안에 있는 페이지를 5개씩 자름
    const pageGroupSize = 5;
    
    // 현재그룹에 대한 인덱스    
    const pageGroupIndex = Math.floor((nowPage-1) / pageGroupSize) // -1은 인덱스가 0부터 시작하니까(페이지는 1부터지만, 인덱스는 0부터 시작이니까)
   
    // 5개씩 쪼개진 페이징그룹에서 첫번째 숫자
    const groupStartNum = pageGroupSize * pageGroupIndex + 1 // pageGroupSize가 0부터 시작하니까 +1을 해줘야함

    // 5개씩 쪼개진 페이징그룹에서 마지막 숫자(ex, totlaPage가 12, groupStartNum이 11, pageGroupSize가 5이면 11+5 = 16 근데, 5개씩쪼개야 해서 15가 나와야하니까 -1)
    const groupLastNum = Math.min(groupStartNum + pageGroupSize -1, totalPage)

    const onNextPage = () => {
        if(nowPage < totalPage) {
            if(nowPage % pageGroupSize === 0) { // (ex, 다음페이지가 '5'일때 '>'을 클릭하면 다음페이징그룹으로 이동해야하니까)
                onNumberGroupHandler(nowPage + 1)
            } else {
                onPageHandler(nowPage + 1)
            }
        }
    }

    const onPrevPage = () => {   
        if(nowPage > 1) {
            if(nowPage % pageGroupSize === 0) { // (ex, 현재페이지가'6'일때 '<'을 클릭하면 이전페이징그룹으로 이동해야하니까)
                onNumberGroupHandler(nowPage - 1)
            } else {
                onPageHandler(nowPage - 1)
            }
        } 
    }

    const onPageGroupNext = () => {        
        if(nowPage < totalPage) {            
            if(nowPage % pageGroupSize === 1) {             
                onNumberGroupHandler(nowPage + 5)
            }
            // 마지막페이징그룹의 첫번째 숫자에 5를 전체페이지의 수보다 크면, +5를 안한다
            if(nowPage + 5 > totalPage) {
                onNumberGroupHandler(totalPage)
            }
        }
    }

    const onPageGroupPrev = () => {
        if(nowPage > 1) {            
            if(nowPage % pageGroupSize === 1) {
                onNumberGroupHandler(nowPage - 5)
            }
            if(nowPage === totalPage) {
                let exceptPrevNum = 0
                if(totalPage % 2 === 0){ // totalPage가 짝수일때
                    exceptPrevNum = Math.floor(totalPage/pageGroupSize)+1
                    onNumberGroupHandler(totalPage-exceptPrevNum)
                } else {
                    exceptPrevNum = Math.floor(totalPage/pageGroupSize)
                    onNumberGroupHandler(totalPage-exceptPrevNum)
                }
            }
            // 첫번째페이지가 1일때에는 -1을 안한다
            if(nowPage === 1){
                onNumberGroupHandler(nowPage)
            }
        }
    }
    return (
    <div className="paging-box">
        <ol>
            <li className="prev"><a href="#" target="_self" onClick={() => onPageGroupPrev()}>&lt;&lt;</a></li>
            <li className="prev"><a href="#" target="_self" onClick={() => onPrevPage()}>&lt;</a></li>
            {                
                Array.from({length:groupLastNum - groupStartNum+1}, (_, index) => { // +1을해주는건 ex, 10 - 6을하면 4인데, 총 5개씩 페이징이 보여져야 하므로
                    // const pageNum = (pageGroupIndex * 5) + index + 1
                    const pageNum = groupStartNum + index
                    // console.log(`pageNum = ${pageNum}`);
                    return <li key={index}><a className={pageNum==nowPage ? 'active':''} href="#" target="_self" onClick={() => onPageNumHandler(pageNum)}>{pageNum}</a></li>
                })               
            }
            <li className="next"><a href="#" target="_self" onClick={() => onNextPage()}>&gt;</a></li>
            <li className="next"><a href="#" target="_self" onClick={() => onPageGroupNext()}>&gt;&gt;</a></li>
        </ol>
    </div>
    )
}

export default PageNation
